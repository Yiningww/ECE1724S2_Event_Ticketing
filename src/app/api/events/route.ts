import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const q = searchParams.get('q');
  const page = Number(searchParams.get('page') || 1);
  const pageSize = 10;

  const where = {
    ...(status ? { status } : {}),
    ...(q
      ? {
          name: {
            contains: q,
            mode: 'insensitive',
          },
        }
      : {}),
  };

  const events = await db.event.findMany({
    where,
    orderBy: { startDate: 'asc' },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const total = await db.event.count({ where });

  return NextResponse.json({
    data: events,
    meta: {
      page,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, description, startDate, endDate } = body;

  const event = await db.event.create({
    data: {
      name,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: 'UPCOMING',
    },
  });

  return NextResponse.json({ event });
}