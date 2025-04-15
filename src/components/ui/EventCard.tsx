'use client';

import Link from 'next/link';
import { Calendar } from 'lucide-react';

export const EventCard = ({ event }: { event: any }) => {
  const formatEventTimeRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
  
    if (!isFinite(startDate.getTime()) || !isFinite(endDate.getTime())) {
      return 'Invalid time';
    }
  
    const weekdayFormatter = new Intl.DateTimeFormat(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  
    const timeFormatter = new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    });
  
    const shortTimeFormatter = new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  
    const weekdayPart = weekdayFormatter.format(startDate);
    const startTime = shortTimeFormatter.format(startDate);
    const endTime = timeFormatter.format(endDate);
  
    return `${weekdayPart} · ${startTime} – ${endTime}`;
  };

  return (
    <div className="p-4 rounded border shadow-sm bg-white space-y-2">
      <Link
        href={`/events/${event.id}`}
        className="text-lg font-semibold text-gray-800 hover:underline"
      >
        {event.name}
      </Link>

      <div className="flex items-center text-sm text-gray-600 gap-2">
        <Calendar className="w-4 h-4 text-gray-500" />
        {formatEventTimeRange(event.startDate, event.endDate)}
      </div>

      <span className="inline-block text-xs px-2 py-1 rounded bg-gray-200 text-gray-700 mt-1">
        {event.status}
      </span>
    </div>
  );
};