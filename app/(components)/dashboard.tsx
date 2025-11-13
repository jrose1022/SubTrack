'use client';

import { Home, House, Car, Settings, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Dashboard() {
    return (
        <div className="h-[95vh] w-full sm:w-64 bg-white shadow-lg flex flex-col justify-between 
        p-4 sm:p-6 rounded-2xl m-2 sm:m-4 hover:shadow-xl shadow-gray-700 transition-shadow duration-00">
            {/* Logo section */}
            <div>
                <div className="flex flex-col items-center mb-6 sm:mb-10">
                    <Image src="/subTrackLogo.png" alt="SubTrack Logo" width={50} height={50} />
                    <h1 className="font-semibold mt-2 text-gray-900">SubTrack</h1>
                </div>

                {/* Navigation links */}
                <nav className="flex flex-col space-y-4 sm:space-y-6">
                    <Link href="/home" className="flex items-center space-x-3 text-gray-800 hover:text-black">
                        <Home size={20} />
                        <span className="font-medium hidden sm:inline">Dashboard</span>
                    </Link>

                    <Link href="/household" className="flex items-center space-x-3 text-gray-800 hover:text-black">
                        <House size={20} />
                        <span className="font-medium hidden sm:inline">Household</span>
                    </Link>

                    <Link href="/parking" className="flex items-center space-x-3 text-gray-800 hover:text-black">
                        <Car size={20} />
                        <span className="font-medium hidden sm:inline">Parking</span>
                    </Link>
                </nav>
            </div>

            {/* Bottom links */}
            <div className="flex flex-col space-y-3 sm:space-y-4">
                <Link href="/settings" className="flex items-center space-x-3 text-gray-800 hover:text-black">
                    <Settings size={20} />
                    <span className="font-medium hidden sm:inline">Settings</span>
                </Link>

               
                    <Link href="/"className="flex items-center space-x-3 text-gray-800 hover:text-red-600" >
                    <LogOut size={20} />
                    <span className="font-medium hidden sm:inline">Log out</span>
                    </Link>
                
            </div>
        </div>
    );
}
    