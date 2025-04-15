"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Gauge,
  BarChart,
  Settings,
  Ticket,
  Users,
  Receipt,
  HelpCircle,
  Percent,
  MessageSquare,
  Users2,
  QrCode,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const role = session?.user?.role?.toLowerCase(); // 'organizer' / 'staff' / 'attendee'
  const userId = session?.user?.id;

  // 动态构建 dashboard URL
  const dashboardHref =
    role && userId ? `/dashboard/${role}/${userId}` : "/dashboard";

  const navItems = [
    { name: "Dashboard", href: dashboardHref, icon: Gauge },
    { name: "Reports", href: "/reports", icon: BarChart },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Events", href: "/events", icon: Ticket },
    { name: "Attendees", href: "/attendees", icon: Users },
    { name: "Orders", href: "/orders", icon: Receipt },
    { name: "Questions", href: "/questions", icon: HelpCircle },
    { name: "Promo Codes", href: "/promos", icon: Percent },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Capacity", href: "/capacity", icon: Users2 },
    { name: "Check-In Lists", href: "/checkin", icon: QrCode },
  ];

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-purple-800 to-purple-900 text-white flex flex-col justify-between shadow-md">
      <div>
        <div className="p-6 text-xl font-bold tracking-wide">🎟 ticket events</div>
        <p className="px-6 pt-2 text-xs text-purple-200 uppercase tracking-wider mb-2">
          Manage
        </p>
        <nav className="px-4 space-y-1">
          {navItems.map(({ name, href, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={name}
                href={href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-white text-purple-800 shadow"
                    : "text-purple-100 hover:bg-purple-700 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-purple-700 text-sm text-purple-300">
        Logged in as <span className="font-semibold">{session?.user?.role || "User"}</span>
      </div>
    </aside>
  );
}