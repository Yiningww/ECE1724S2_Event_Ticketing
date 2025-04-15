'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Use usePathname instead of useRouter
import Link from 'next/link';
import {
  LayoutDashboard, 
  Calendar, 
  Inbox, 
  Receipt, 
  MessageSquare, 
  User, 
  HelpCircle
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname(); // This is safe to use in app router
  const [mounted, setMounted] = useState(false);
  
  // Only run client-side
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard' },
    { name: 'Events', icon: <Calendar className="w-5 h-5" />, path: '/events' },
    { name: 'Registration', icon: <Inbox className="w-5 h-5" />, path: '/registration' },
    { name: 'Orders & Payments', icon: <Receipt className="w-5 h-5" />, path: '/orders' },
    { name: 'Messages', icon: <MessageSquare className="w-5 h-5" />, path: '/messages' },
    { name: 'Account', icon: <User className="w-5 h-5" />, path: '/account' },
    { name: 'Help Center', icon: <HelpCircle className="w-5 h-5" />, path: '/help' },
  ];

  return (
    <div className="w-64 bg-purple-700 text-white min-h-screen">
      {/* Logo */}
      <div className="flex items-center p-5 border-b border-purple-600">
        <span className="text-xl font-bold">🎟️ ticket events</span>
      </div>
      
      {/* Navigation */}
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navItems.map((item) => {
            // Only check active status if mounted on client
            const isActive = mounted && (
              pathname === item.path || 
              pathname?.startsWith(`${item.path}/`)
            );
            
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`
                  flex items-center px-4 py-3 text-sm rounded-md transition-colors
                  ${isActive 
                    ? 'bg-purple-800 text-white' 
                    : 'text-purple-100 hover:bg-purple-600'
                  }
                `}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      
      {/* User info at bottom */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-purple-600">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-800 flex items-center justify-center text-white">
            A
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Logged in as</p>
            <p className="text-xs">Attendee</p>
          </div>
        </div>
      </div>
    </div>
  );
}