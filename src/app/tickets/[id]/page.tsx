import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, MapPin, QrCode, Download, CheckCircle, ArrowLeft } from "lucide-react";
import { getTicketById } from "@/server/actions/tickets";
import { formatDate, formatTime } from "@/lib/utils";

export default async function TicketPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the ticket from your database
  // Here we're simulating this with mock data
  
  // const ticket = await getTicketById(params.id);
  // if (!ticket) {
  //   notFound();
  // }

  // Mock ticket data for demonstration
  const ticket = {
    id: params.id,
    eventName: params.id === '1' ? 'Startup Expo 2025' : 'AI Conference 2025',
    date: params.id === '1' ? new Date('2025-06-10T09:00:00') : new Date('2025-05-20T10:00:00'),
    location: params.id === '1' ? 'NYC Expo Center' : 'Online (Zoom)',
    ticketType: params.id === '1' ? 'VIP' : 'Standard',
    qrCodeUrl: `/ticket-qr-${params.id}.png`,
    isOnline: params.id !== '1',
    joinLink: params.id !== '1' ? 'https://zoom.us/j/1234567890' : undefined,
    eventId: 'event-123',
    purchaseDate: new Date('2025-01-15T14:30:00'),
    ticketNumber: `TKT-${100000 + parseInt(params.id)}`,
    attendee: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  };

  return (
    <div className="container max-w-4xl py-8">
      <Link href="/dashboard/attendee/1" className="flex items-center text-sm mb-6 hover:underline">
  <ArrowLeft className="h-4 w-4 mr-2" />
  Back to Dashboard
</Link>
      
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">{ticket.eventName}</h1>
          <div className="mt-2 flex items-center text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {formatDate(ticket.date)} at {formatTime(ticket.date)}
            </span>
          </div>
          <div className="mt-1 flex items-center text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{ticket.location}</span>
          </div>
        </div>
        
        <div className="p-6 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h2 className="text-lg font-semibold mb-3">Ticket Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Ticket Type</p>
                <p className="font-medium">{ticket.ticketType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ticket Number</p>
                <p className="font-medium">{ticket.ticketNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Purchased</p>
                <p className="font-medium">{formatDate(ticket.purchaseDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Attendee</p>
                <p className="font-medium">{ticket.attendee.name}</p>
                <p className="text-sm text-gray-500">{ticket.attendee.email}</p>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col space-y-3">
              <button className="flex items-center justify-center px-4 py-2 border rounded-md hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Download Ticket
              </button>
              
              {ticket.isOnline && ticket.joinLink && (
                <a 
                  href={ticket.joinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Join Event
                </a>
              )}
            </div>
          </div>
          
          <div className="md:w-1/2 flex flex-col items-center">
            <div className="bg-gray-50 p-6 rounded-lg w-full flex flex-col items-center">
              <h3 className="text-center mb-4 font-medium">Ticket QR Code</h3>
              <div className="w-48 h-48 bg-white flex items-center justify-center border">
                <QrCode className="w-32 h-32 text-gray-800" />
              </div>
              <p className="mt-4 text-sm text-center text-gray-500">
                Present this QR code at the entrance for check-in
              </p>
            </div>
            
            <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Ticket is valid and ready to use
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}