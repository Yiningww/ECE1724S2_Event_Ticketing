// src/app/dashboard/organizer/[userId]/page.tsx
'use client';

import { OrganizerShell } from '@/components/layout/OrganizerShell';
import { StatCard } from '@/components/ui/StatCard';
import { StepCard } from '@/components/ui/StepCard';
import { EventCard } from '@/components/ui/EventCard';
import {
  ShoppingCart,
  Users,
  CreditCard,
  Wallet,
  Eye,
  FileCheck,
} from 'lucide-react';

export default function OrganizerDashboard() {
  return (
    <OrganizerShell>
      <h1 className="text-3xl font-bold mb-6">Welcome back, Yiren 👋</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard icon={ShoppingCart} label="Products sold" value="0" />
        <StatCard icon={Users} label="Attendees" value="0" color="bg-pink-100" />
        <StatCard icon={CreditCard} label="Refunded" value="CA$0.00" color="bg-cyan-100" />
        <StatCard icon={Wallet} label="Gross sales" value="CA$0.00" />
        <StatCard icon={Eye} label="Page views" value="0" />
        <StatCard icon={FileCheck} label="Completed orders" value="0" />
      </div>

      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h2 className="text-lg font-semibold mb-4">🚀 Get your event ready</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StepCard
            title="Make your event live"
            description="Your event must be live before you can sell tickets."
            actionLabel="Publish Event"
          />
          <StepCard
            title="Connect payment processing"
            description="Link your Stripe account to receive funds."
            actionLabel="Connect to Stripe"
          />
        </div>
      </div>

      <div className="mt-10 space-y-4">
        <EventCard
          event={{
            id: '1',
            name: 'AI Summit 2025',
            startDate: '2025-05-20T10:00:00Z',
            endDate: '2025-05-20T12:00:00Z',
            status: 'Draft',
          }}
        />
        <EventCard
          event={{
            id: '2',
            name: 'Startup Expo',
            startDate: '2025-06-10T10:00:00Z',
            endDate: '2025-06-10T15:00:00Z',
            status: 'Live',
          }}
        />
      </div>
    </OrganizerShell>
  );
}