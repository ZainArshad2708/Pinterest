import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Simulated Authentication
    if (email.trim() === "" || password.trim() === "") {
      setError("Please fill in both fields.");
      return;
    }

    // Save a "logged in" token to LocalStorage
    localStorage.setItem(
      "pinterest_user",
      JSON.stringify({
        email,
        name: "Zain Arshad",
        isLoggedIn: true,
      }),
    );

    // Redirect to the home page
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e9e9e9]">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <img
            src="/Pinterest.svg.webp"
            alt="Pinterest"
            className="mx-auto h-12 w-12"
          />
          <h1 className="mt-4 text-2xl font-bold">Welcome back</h1>
        </div>

        {/* Show error message if login fails */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#e9e9e9] p-2 outline-none focus:border-[#111111]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#e9e9e9] p-2 outline-none focus:border-[#111111]"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-[#E60023] py-3 font-bold text-white transition hover:bg-[#ad001b]"
          >
            Log in
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#767676]">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold text-[#111111] underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
