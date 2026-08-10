import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e9e9e9]">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <img src="/logo.svg" alt="Pinterest" className="mx-auto h-10 w-10" />
          <h1 className="mt-4 text-2xl font-bold">Welcome back</h1>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" className="mt-1 w-full rounded-lg border border-[#e9e9e9] p-2 outline-none focus:border-[#111111]" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input type="password" className="mt-1 w-full rounded-lg border border-[#e9e9e9] p-2 outline-none focus:border-[#111111]" />
          </div>
          <button className="w-full rounded-full bg-[#E60023] py-3 font-bold text-white transition hover:bg-[#ad001b]">Log in</button>
        </form>
        <p className="mt-4 text-center text-sm text-[#767676]">
          Don't have an account? <Link to="/register" className="font-bold text-[#111111] underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}