import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { format } from "date-fns";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ticketId = params.id;

    // Get the ticket
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        registration: {
          include: {
            event: true,
            ticketType: true,
          },
        },
      },
    });

    // If ticket not found or doesn't belong to current user
    if (!ticket || ticket.registration.userId !== session.user.id) {
      return new NextResponse("Ticket not found", { status: 404 });
    }

    const { registration } = ticket;
    const { event, ticketType } = registration;

    // For simplicity, we're returning a text-based ticket representation
    // In a real app, you'd generate a PDF using a library like jspdf
    
    // Format the ticket content
    const ticketContent = `
EVENT TICKET
-----------
Event: ${event.title}
Date: ${format(new Date(event.startDate), "MMMM d, yyyy")}
Time: ${format(new Date(event.startDate), "h:mm a")} - ${format(new Date(event.endDate || event.startDate), "h:mm a")}
Location: ${event.location}

Attendee: ${registration.attendeeName}
Email: ${registration.attendeeEmail}
Ticket Type: ${ticketType.name}
Confirmation #: ${registration.confirmationNumber}

This ticket should be presented at the event entrance for admission.
QR Code: ${ticket.qrCodeUrl || "Not available"}
    `;

    const headers = new Headers();
    headers.set("Content-Type", "text/plain");
    headers.set(
      "Content-Disposition",
      `attachment; filename="ticket-${ticketId}.txt"`
    );

    return new NextResponse(ticketContent, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error downloading ticket:", error);
    return new NextResponse("Error downloading ticket", { status: 500 });
  }
}