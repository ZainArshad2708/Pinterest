import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi, setToken } from "../lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (email.trim() === "" || password.trim() === "") {
      setError("Please fill in both fields.");
      return;
    }
    try {
      const { user, token } = await authApi.login({ email, password });
      setToken(token);
      localStorage.setItem("pinterest_user", JSON.stringify(user));
      navigate("/", { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e9e9e9] p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl md:p-8">
        <div className="mb-6 text-center">
          <img
            src="/Pinterest.svg.webp"
            alt="Pinterest"
            className="mx-auto h-10 w-10 md:h-12 md:w-12"
          />
          <h1 className="mt-3 text-xl font-bold md:mt-4 md:text-2xl">
            Welcome back
          </h1>
        </div>
        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-2 text-center text-xs text-red-600 md:p-3 md:text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium md:text-sm">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#e9e9e9] p-2 text-sm outline-none focus:border-[#111111] md:p-2.5"
            />
          </div>
          <div>
            <label className="block text-xs font-medium md:text-sm">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#e9e9e9] p-2 text-sm outline-none focus:border-[#111111] md:p-2.5"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-[#E60023] py-2.5 text-sm font-bold text-white transition hover:bg-[#ad001b] md:py-3 md:text-base"
          >
            Log in
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-[#767676] md:text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold text-[#111111] underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
