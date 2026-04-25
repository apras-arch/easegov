import { useMemo, useState } from "react";
import { FileText, ListChecks, MessageCircle, Mic, Plus, SendHorizontal, Sparkles } from "lucide-react";

import { sendEaseGovRequest } from "../api.js";

const MODES = [
  {
    id: "chat",
    label: "Chat",
    endpoint: "/ask",
    payloadKey: "query",
    icon: MessageCircle,
    description: "Ask a simple question",
  },
  {
    id: "simplify",
    label: "Simplify Document",
    endpoint: "/simplify",
    payloadKey: "text",
    icon: FileText,
    description: "Make official text easier",
  },
  {
    id: "steps",
    label: "Get Steps",
    endpoint: "/steps",
    payloadKey: "process",
    icon: ListChecks,
    description: "Create a clear checklist",
  },
];

function buildKeyword(text) {
  return text
    .trim()
    .split(/\s+/)
    .slice(0, 5)
    .join(" ")
    .replace(/[^\w\s]/g, "")
    .trim();
}

function buildQueryWithHistory(messages, input) {
  if (!messages.length) {
    return input;
  }

  const history = messages
    .slice(-8)
    .map((message) => `${message.role === "user" ? "User" : "Assistant"}: ${message.text}`)
    .join("\n");

  return `Conversation so far:\n${history}\n\nUser's next message:\n${input}`;
}

function EaseAiPage({
  secondaryLanguage,
  languageOptions,
  conversations,
  activeConversationId,
  onSelectConversation,
  onCreateConversation,
  onUpdateConversation,
  onDeleteAllConversations,
  onSecondaryLanguageChange,
}) {
  const [messageInput, setMessageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedModeId, setSelectedModeId] = useState("chat");

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeConversationId) || null,
    [activeConversationId, conversations]
  );
  const selectedMode = useMemo(
    () => MODES.find((mode) => mode.id === selectedModeId) || MODES[0],
    [selectedModeId]
  );

  async function handleSend(event) {
    event.preventDefault();
    const trimmedInput = messageInput.trim();
    if (!trimmedInput || isLoading) {
      return;
    }

    setIsLoading(true);
    setError("");

    const now = new Date();
    const userMessage = {
      id: `${now.getTime()}-user`,
      role: "user",
      text: trimmedInput,
      createdAt: now.toISOString(),
      modeLabel: selectedMode.label,
    };

    let targetConversation = activeConversation;
    if (!targetConversation) {
      const keyword = buildKeyword(trimmedInput) || "New chat";
      targetConversation = {
        id: `chat-${now.getTime()}-${Math.random().toString(16).slice(2)}`,
        keyword,
        secondaryLanguage,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        messages: [],
      };
      onCreateConversation(targetConversation);
    }

    const draftMessages = [...targetConversation.messages, userMessage];
    onUpdateConversation(targetConversation.id, {
      ...targetConversation,
      secondaryLanguage,
      updatedAt: now.toISOString(),
      messages: draftMessages,
    });
    setMessageInput("");

    try {
      const requestInput =
        selectedMode.id === "chat"
          ? buildQueryWithHistory(targetConversation.messages, trimmedInput)
          : trimmedInput;
      const data = await sendEaseGovRequest(selectedMode, requestInput, secondaryLanguage);
      const assistantMessage = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        text: data.response || "",
        createdAt: new Date().toISOString(),
        modeLabel: selectedMode.label,
      };

      onUpdateConversation(targetConversation.id, {
        ...targetConversation,
        secondaryLanguage,
        updatedAt: new Date().toISOString(),
        messages: [...draftMessages, assistantMessage],
      });
    } catch (requestError) {
      setError(requestError.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <section className="easeai-page" aria-label="EaseAi chatbot page">
      <aside className="chat-history-panel fade-in">
        <div className="chat-history-header chatgpt-like-sidebar-header">
          <h2>Saved chats</h2>
        </div>

        <div className="chat-history-actions chatgpt-like-sidebar-actions">
          <button
            type="button"
            className="new-chat-button"
            onClick={onSelectConversation.bind(null, null)}
          >
            New Chat
          </button>
          <button
            type="button"
            className="clear-history-button"
            onClick={onDeleteAllConversations}
            disabled={!conversations.length}
          >
            Clear All
          </button>
        </div>

        <div className="keyword-list chatgpt-like-keyword-list">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              type="button"
              className={`keyword-item ${conversation.id === activeConversationId ? "active" : ""}`}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <span>{conversation.keyword}</span>
              <small>{new Date(conversation.updatedAt).toLocaleString()}</small>
            </button>
          ))}
          {!conversations.length && (
            <div className="dashboard-empty">
              No chats yet. Start a new chat and your keyword history will appear here.
            </div>
          )}
        </div>
      </aside>

      <article className="chat-thread-panel fade-in">
        <div className="chat-thread-header chatgpt-like-thread-header">
          <p className="section-label">Direct chatbot</p>
          <div className="language-select-wrap">
            <label htmlFor="easeai-language" className="language-select-label">
              Language
            </label>
            <select
              id="easeai-language"
              value={secondaryLanguage}
              onChange={(event) => onSecondaryLanguageChange(event.target.value)}
              disabled={isLoading}
            >
              {languageOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="chat-thread chatgpt-like-thread">
          {activeConversation?.messages?.map((message) => (
            <div key={message.id} className={`chat-bubble ${message.role}`}>
              <p className="chat-role">{message.role === "user" ? "You" : "EaseAi"}</p>
              {message.modeLabel && <p className="chat-mode-label">{message.modeLabel}</p>}
              <p>{message.text}</p>
            </div>
          ))}

          {!activeConversation?.messages?.length && (
            <div className="empty-state">What do you want to do today?</div>
          )}

          {error && <div className="error-message">{error}</div>}
        </div>

        <form className="chat-input-form chatgpt-like-composer-wrap" onSubmit={handleSend}>
          <div className="easeai-mode-selector" role="radiogroup" aria-label="Choose EaseAi mode">
            {MODES.map((mode) => {
              const Icon = mode.icon;
              const isSelected = mode.id === selectedModeId;
              return (
                <button
                  key={mode.id}
                  type="button"
                  className={`easeai-mode-button ${isSelected ? "active" : ""}`}
                  onClick={() => setSelectedModeId(mode.id)}
                  disabled={isLoading}
                  aria-checked={isSelected}
                  role="radio"
                >
                  <span className="easeai-mode-icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="easeai-mode-copy">
                    <span>{mode.label}</span>
                    <small>{mode.description}</small>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="chat-compose-shell">
            <button type="button" className="compose-icon-button" aria-label="Attach">
              <Plus size={18} aria-hidden="true" />
            </button>
            <textarea
              value={messageInput}
              onChange={(event) => setMessageInput(event.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Ask anything"
              rows={1}
              disabled={isLoading}
            />
            <button type="button" className="compose-icon-button" aria-label="Voice input">
              <Mic size={18} aria-hidden="true" />
            </button>
            <button className="compose-send-button" type="submit" disabled={isLoading}>
              <Sparkles size={14} aria-hidden="true" />
            </button>
          </div>
          <p className="compose-helptext">
            Press Enter to send • Shift+Enter for new line • Mode: {selectedMode.label}
          </p>
        </form>
      </article>
    </section>
  );
}

export default EaseAiPage;
