// src/app/events/[eventId]/page.tsx
import { notFound } from 'next/navigation';

export default async function EventDetailPage({ params }: { params: { eventId: string } }) {
  const res = await fetch(`${process.env.BASE_URL}/api/events/${params.eventId}`, {
    cache: 'no-store',
  });

  if (!res.ok) return notFound();

  const { event } = await res.json();

  return (
    <div className="max-w-3xl mx-auto p-8">
      <p className="text-sm uppercase text-purple-600 font-semibold">{event.organizerName}</p>
      <h1 className="text-3xl font-bold mt-2 mb-4">{event.name}</h1>
      <p className="text-gray-700 mb-4">{event.description}</p>

      <p className="text-sm text-gray-500">
        🗓️ {new Date(event.startDate).toLocaleString()} -{' '}
        {new Date(event.endDate).toLocaleString()}
      </p>
    </div>
  );
}