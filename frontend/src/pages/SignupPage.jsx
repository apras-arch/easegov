import { useState } from "react";

function SignupPage() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
  });
  const [saved, setSaved] = useState(false);

  function updateField(field, value) {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    window.localStorage.setItem("easegov_profile", JSON.stringify(profile));
    setSaved(true);
  }

  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Sign Up / Profile</h1>
        <p className="mt-2 text-lg text-slate-600">
          Save your basic profile details to personalize your EaseGov experience.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={profile.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            placeholder="Full name"
            className="rounded-xl border border-slate-300 px-4 py-3 text-base"
          />
          <input
            type="email"
            value={profile.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="Email address"
            className="rounded-xl border border-slate-300 px-4 py-3 text-base"
          />
          <input
            value={profile.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="Phone number"
            className="rounded-xl border border-slate-300 px-4 py-3 text-base"
          />
          <input
            value={profile.city}
            onChange={(event) => updateField("city", event.target.value)}
            placeholder="City"
            className="rounded-xl border border-slate-300 px-4 py-3 text-base"
          />
        </div>

        <button
          type="submit"
          className="mt-5 rounded-xl bg-slate-900 px-5 py-3 text-lg font-semibold text-white"
        >
          Save Profile
        </button>

        {saved && (
          <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-base font-semibold text-emerald-700">
            Profile saved successfully.
          </p>
        )}
      </form>
    </section>
  );
}

export default SignupPage;
