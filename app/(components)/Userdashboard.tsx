'use client';

import { Home,MessageCircleQuestion, Settings, LogOut, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '/home', icon: Home, label: 'Dashboard' },
    { href: '/faq', icon: MessageCircleQuestion, label: 'Faqs' },
  ];

  const bottomLinks = [
    { href: '/settings', icon: Settings, label: 'Settings' },
    { href: '/', icon: LogOut, label: 'Log out', isLogout: true },
  ];

  return (
    <>
      {/* MOBILE NAVBAR */}
      <div className="sm:hidden fixed top-0 left-0 right-0 bg-white shadow z-50 flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <Image src="/subTrackLogo.png" alt="Logo" width={40} height={40} />
          <span className="font-semibold text-gray-900">SubTrack</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="sm:hidden fixed top-16 left-0 right-0 bg-white shadow z-40 flex flex-col space-y-4 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center space-x-3 text-gray-800 hover:text-black"
              onClick={() => setMobileOpen(false)}
            >
              <link.icon size={20} />
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
          {bottomLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center space-x-3 ${
                link.isLogout ? 'text-red-600 hover:text-red-700' : 'text-gray-800 hover:text-black'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              <link.icon size={20} />
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <div className="hidden sm:flex h-[95vh] w-64 bg-white shadow-lg flex-col justify-between p-4 rounded-2xl m-4 hover:shadow-xl transition-shadow duration-200">
        {/* Logo & nav */}
        <div>
          <div className="flex flex-col items-center mb-10">
            <Image src="/subTrackLogo.png" alt="SubTrack Logo" width={50} height={50} />
            <h1 className="font-semibold mt-2 text-gray-900">SubTrack</h1>
          </div>

          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center space-x-3 text-gray-800 hover:text-black"
              >
                <link.icon size={20} />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom links */}
        <div className="flex flex-col space-y-4">
          {bottomLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center space-x-3 ${
                link.isLogout ? 'text-red-600 hover:text-red-700' : 'text-gray-800 hover:text-black'
              }`}
            >
              <link.icon size={20} />
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
