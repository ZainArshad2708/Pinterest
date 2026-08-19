import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Account created for:", name, email);
    navigate("/login");
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
            Join Pinterest
          </h1>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-medium md:text-sm">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#e9e9e9] p-2 text-sm outline-none focus:border-[#111111] md:p-2.5"
            />
          </div>
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
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-[#767676] md:text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-[#111111] underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
