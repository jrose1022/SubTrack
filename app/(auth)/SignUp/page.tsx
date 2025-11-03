// app/Login/page.tsx 
import Image from 'next/image';
import Link from 'next/link';

// Main Login component that renders the login page
export default function SignUp(){
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

        {/* Sign-up form */}
        <form className="space-y-4 text-left">
          {/* Sign-up header */}
          <h2 className="font- italic text-black" style={{ fontFamily: "'Inknut Antiqua', serif" }}>Sign-up</h2>
          
          {/* Username input field with icon */}
          <div className="flex items-center bg-white rounded-full px-3 py-2 shadow" >
            <span className="mr-2 text-gray-400">@</span>
            <input
              type="text"
              placeholder="username"
              className="bg-transparent outline-0 w-full text-gray-400 placeholder-gray-400"
            />
          </div>

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

          {/* Confirm Password input field with icon */}
          <div className="flex items-center bg-white rounded-full px-3 py-2 shadow">
            <span className="mr-2 text-gray-400">@</span>
            <input
              type="password"
              placeholder="confirm password"
              className="bg-transparent outline-0 w-full text-gray-400 placeholder-gray-400"
            />
          </div>

            {/* Login link */}
            <div className="flex justify-end">
            <Link href="/Login" className="font- italic text-sm text-gray-700 hover:underline">
              Already have an account? Login
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
