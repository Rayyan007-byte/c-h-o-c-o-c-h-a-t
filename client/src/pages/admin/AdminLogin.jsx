import { useState } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [secret, setSecret] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // FRONTEND ONLY (backend yahan connect hoga)
    if (secret.length < 6) {
      setError("Invalid secret key");
      setLoading(false);
      return;
    }

    // TODO: API call
    // await axios.post("/admin/login", { secret })

    setTimeout(() => {
      setLoading(false);
      alert("Admin login success (connect backend)");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      
      {/* Glass Card */}
      <div className="w-full max-w-md backdrop-blur-xl bg-white/15 border border-white/20 rounded-2xl shadow-2xl p-8 text-white">

        <div className="flex flex-col items-center mb-6">
          <ShieldCheck size={48} className="mb-3" />
          <h1 className="text-2xl font-semibold">Admin Access</h1>
          <p className="text-sm opacity-80">
            Enter secret key to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Secret Key"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60"
              required
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-4 top-3 text-white/80"
            >
              {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-300">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>

        <p className="text-xs text-center mt-6 opacity-70">
          Restricted access • Admin only
        </p>
      </div>
    </div>
  );
}
