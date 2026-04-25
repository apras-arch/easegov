import { Landmark, Lock } from "lucide-react";

function Footer() {
  return (
    <footer className="relative mx-auto mb-4 mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between rounded-2xl border border-cyan-400/20 bg-slate-950/70 px-4 py-3 shadow-lg shadow-blue-950/30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-300/30 bg-slate-900/80 text-cyan-200">
            <Landmark size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-100">
              Empowering citizens. Simplifying governance.
            </p>
            <p className="text-xs text-slate-300">Built for India • Secure • Reliable • Private</p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-emerald-300 sm:flex">
          <Lock size={14} />
          <span className="text-xs font-semibold">Protected</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
