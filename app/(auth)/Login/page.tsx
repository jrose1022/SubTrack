// app/Login/page.tsx 
import Image from 'next/image';
import Link from 'next/link';

// Main Login component that renders the login page
export default function Login(){
  return (
    // Main container with frosted glass effect
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundColor: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(2px)', // Creates frosted glass effect
      }}
    >
      {/* Login form card with semi-transparent background */}
      <div
        className="rounded-2xl shadow-xl p-10 w-80 text-center"
        style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
      >
        {/* Logo and title section */}
        <div className="mb-4">
          <Image src="/subTrackLogo.png" alt="SubTrack Logo" className="mx-auto mb-0" width={80} height={80} />
          <h1 className="font-bold text-black m-0" style={{ fontFamily: "'Inknut Antiqua', serif" }}>
            SubTrack
          </h1>
        </div>

        {/* Login form */}
        <form className="space-y-4 text-left">
          {/* Login header */}
          <h2 className="font- italic text-black" style={{ fontFamily: "'Inknut Antiqua', serif" }}>Login</h2>
          
          {/* Email input field with icon */}
          <div className="flex items-center bg-white rounded-full px-3 py-2 shadow" >
            <span className="mr-2 text-gray-400">@</span>
            <input
              type="email"
              placeholder="e-mail address"
              className="bg-transparent outline-0 w-full text-gray-400 placeholder-gray-400"
            />
          </div>

          {/* Password input field with icon */}
          <div className="flex items-center bg-white rounded-full px-3 py-2 shadow">
            <span className="mr-2 text-gray-400">@</span>
            <input
              type="password"
              placeholder="password"
              className="bg-transparent outline-0 w-full text-gray-400 placeholder-gray-400"
            />
          </div>

          {/* Forgot password link */}
            <div className="flex justify-between">
            <Link href="/SignUp" className="font- italic text-sm text-gray-700 hover:underline">
              Sign-up
            </Link>
            <Link href="/ForgotPassword" className="font- italic text-sm text-gray-700 hover:underline">
              Forgot Password
            </Link>
            </div>

          {/* Login button */}
          <button
            type="submit"
            className="bg-black text-white rounded-full py-2 px-6 w-full hover:bg-gray-200 hover:text-black transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
