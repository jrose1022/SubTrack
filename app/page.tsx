import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat text-center"
      style={{
        backgroundImage: "url('/backgroundAuth.jpg')",
        backgroundColor: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(2px)', // frosted glass effect
      }}
    >
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 max-w-md w-full">
                <Image src="/subTrackLogo.png" alt="SubTrack Logo" className="mx-auto mb-4" width={100} height={100} />
                <h1 className="text-2xl font-semibold text-gray-900">Welcome to Subtrack</h1>
                <p className="mt-3 text-sm text-gray-700">
                    Please sign up or log in to continue.
                </p>
                <div className="mt-6 flex justify-center gap-4">
                    <Link
                        href="/Login"
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700"
                    >
                        Log In
                    </Link>
                    <Link
                        href="/SignUp"
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-green-700"
                    >
                        Sign Up
                    </Link>
                </div>
        </div>
    </div>

  );
}
