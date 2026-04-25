import os
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS

from routes.ai_routes import ai_bp


BASE_DIR = Path(__file__).resolve().parent
ROOT_DIR = BASE_DIR.parent

# Load project-level and backend-level env files for flexible local setup.
load_dotenv(ROOT_DIR / ".env")
load_dotenv(BASE_DIR / ".env")


def create_app():
    app = Flask(__name__)

    allowed_origins = os.getenv("CORS_ORIGINS", "*")
    CORS(app, resources={r"/*": {"origins": [origin.strip() for origin in allowed_origins.split(",")]}})

    app.register_blueprint(ai_bp)

    @app.get("/")
    def index():
        return jsonify({"message": "EaseGov backend is running"})

    @app.get("/health")
    def health():
        return jsonify({"status": "ok"})

    return app


app = create_app()


if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=True)
