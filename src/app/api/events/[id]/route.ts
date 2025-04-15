// src/app/api/events/[id]/route.ts
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const event = await db.event.findUnique({
    where: { id: params.id },
    include: { organizer: true },
  });

  if (!event) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({
    event: {
      id: event.id,
      name: event.name,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      status: event.status,
      organizerName: event.organizer?.name || 'Unknown',
    },
  });
}