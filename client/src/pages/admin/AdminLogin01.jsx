import { ShieldCheck } from "lucide-react";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const AdminLogin01 = () => {
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("Admin login success (connect to backend)")
        }, 1000)
        setIsAdmin(true);
      }
      if(isAdmin && !loading) return <Navigate to="/admin/dashboard" />
    
    
  return (
    <div className="min-h-screen border flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <div className="border border-white/20 w-full max-w-md bg-white/15 backdrop-blur-xl rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex flex-col mb-6 items-center">
          <ShieldCheck size={48} />
          <h1>Admin Acces</h1>
          <p>Enter secret key to continue</p>
        </div>
        <form action="" onSubmit={handleLogin}>
            <div>
                <input type="text" 
                disabled={loading}
                className="border border-white/30 w-full rounded-xl bg-white/20 px-4 py-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 mb-6"
                />
                <button type="submit"
                className="w-full bg-white rounded-xl py-3 text-black font-semibold hover:bg-opacity-90 transition disabled:opacity-60"
                >{loading ? "Verifying..." : "Login"}</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin01;
