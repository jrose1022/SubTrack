'use client';

import { Home, House, Settings, LogOut, Menu, X, BarChart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      const user = JSON.parse(profile);
      // ✅ Checks if user.is_admin is true
      setIsAdmin(!!user.is_admin);
    }
  }, []);

  // Regular user navigation
  const userNavLinks = [
    { href: '/home', icon: Home, label: 'Dashboard' },
    { href: '/users', icon: House, label: 'Household' },
  ];

  // Admin-only navigation
  const adminNavLinks = [
    { href: '/AdminHomepage', icon: Home, label: 'Admin Dashboard' },
    { href: '/financereport', icon: BarChart, label: 'Finance Reports' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  const bottomLinks = [
    { href: '/', icon: LogOut, label: 'Log out', isLogout: true },
  ];

  const navLinks = isAdmin ? adminNavLinks : userNavLinks;

  return (
    <>
      {/* ✅ MOBILE NAVBAR */}
      <div className="sm:hidden fixed top-0 left-0 right-0 bg-white shadow flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image src="/subTrackLogo.png" alt="Logo" width={40} height={40} />
          <span className="font-semibold text-gray-900">SubTrack</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ✅ MOBILE MENU */}
      {mobileOpen && (
        <div className="sm:hidden fixed top-16 left-0 right-0 bg-white shadow z-40 flex flex-col space-y-4 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center space-x-3 text-gray-900 hover:text-black"
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
              className="flex items-center space-x-3 text-red-600 hover:text-red-700"
              onClick={() => setMobileOpen(false)}
            >
              <link.icon size={20} />
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      )}

      {/* ✅ DESKTOP SIDEBAR */}
      <div className="hidden sm:flex h-[95vh] w-64 bg-white shadow-lg flex-col justify-between p-4 rounded-2xl m-4 hover:shadow-xl transition-shadow duration-200">
        {/* Logo and top links */}
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
                className="flex items-center space-x-3 text-gray-900 hover:text-black"
              >
                <link.icon size={20} />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom logout link */}
        <div className="flex flex-col space-y-4">
          {bottomLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center space-x-3 text-red-600 hover:text-red-700"
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
