import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e9e9e9]">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          {/* ✅ ADDED THE LOGO HERE */}
          <img
            src="/Pinterest.svg.webp"
            alt="Pinterest"
            className="mx-auto h-12 w-12"
          />
          <h1 className="mt-4 text-2xl font-bold">Join Pinterest</h1>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-[#e9e9e9] p-2 outline-none focus:border-[#111111]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border border-[#e9e9e9] p-2 outline-none focus:border-[#111111]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-[#e9e9e9] p-2 outline-none focus:border-[#111111]"
            />
          </div>
          <button className="w-full rounded-full bg-[#E60023] py-3 font-bold text-white transition hover:bg-[#ad001b]">
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#767676]">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-[#111111] underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
