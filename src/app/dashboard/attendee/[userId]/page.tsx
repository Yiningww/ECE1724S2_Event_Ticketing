'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, MapPin, QrCode, ArrowRight, Download, ExternalLink } from 'lucide-react';
import { use } from 'react';
import AttendeeShell from '@/components/layout/AttendeeShell';

// Mock data for tickets (replace with actual API call)
const mockTickets = [
  {
    id: '1',
    eventName: 'Startup Expo 2025',
    date: new Date('2025-06-10T09:00:00'),
    location: 'NYC Expo Center',
    ticketType: 'VIP',
    qrCodeUrl: '/ticket-qr-1.png',
    isOnline: false
  },
  {
    id: '2',
    eventName: 'AI Conference 2025',
    date: new Date('2025-05-20T10:00:00'),
    location: 'Online (Zoom)',
    ticketType: 'Standard',
    qrCodeUrl: '/ticket-qr-2.png',
    isOnline: true,
    joinLink: 'https://zoom.us/j/1234567890'
  }
];

export default function AttendeeDashboard({ params }: { params: { userId: string } }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const userId = unwrappedParams.userId;

  const router = useRouter();
  const { data: session, status } = useSession();
  const [tickets, setTickets] = useState(mockTickets);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  // Check if user is authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // In a real implementation, you would fetch tickets from an API
  useEffect(() => {
    // Fetch tickets for the user
    // Example: fetchTickets(userId).then(data => setTickets(data));
    
    // Using mock data for now
    setTickets(mockTickets);
  }, [userId]);

  // Display loading state while session is loading
  if (status === 'loading') {
    return (
      <AttendeeShell>
        <div className="flex items-center justify-center h-60">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </AttendeeShell>
    );
  }

  const showQrCode = (ticket: any) => {
    setSelectedTicket(ticket);
    setQrDialogOpen(true);
  };

  return (
    <AttendeeShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {session?.user?.name || 'Guest'} 👋
          </h1>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">🎫 Your Tickets</h2>
          
          {tickets.length > 0 ? (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                  <div className="p-4 flex flex-col md:flex-row justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{ticket.eventName}</h3>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>🗓 {format(ticket.date, "MMMM d, h:mm a")}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>📍 {ticket.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 mt-4 md:mt-0">
                      <button 
                        className="flex justify-between items-center px-3 py-1.5 border rounded-md text-sm hover:bg-gray-50"
                        onClick={() => router.push(`/tickets/${ticket.id}`)}
                      >
                        <span>View Ticket</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </button>
                      
                      <button 
                        className="flex justify-between items-center px-3 py-1.5 border rounded-md text-sm hover:bg-gray-50"
                        onClick={() => showQrCode(ticket)}
                      >
                        <span>QR Code</span>
                        <QrCode className="h-4 w-4 ml-2" />
                      </button>
                      
                      {ticket.isOnline ? (
                        <a 
                          href={ticket.joinLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex justify-between items-center px-3 py-1.5 border rounded-md text-sm hover:bg-gray-50"
                        >
                          <span>Join Link</span>
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      ) : (
                        <button 
                          className="flex justify-between items-center px-3 py-1.5 border rounded-md text-sm hover:bg-gray-50"
                          onClick={() => alert('Downloading ticket...')}
                        >
                          <span>Download</span>
                          <Download className="h-4 w-4 ml-2" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border-dashed border-2 rounded-lg p-10 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 text-gray-400 mb-4">🎟️</div>
              <h3 className="text-lg font-medium mb-2">No tickets yet</h3>
              <p className="text-gray-500 max-w-sm mb-6">
                You haven't registered for any events yet. Browse upcoming events and get your tickets today!
              </p>
              <Link href="/events" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                Browse Events
              </Link>
            </div>
          )}
        </div>
        
        {/* QR Code Dialog - In a real app, use a proper dialog component */}
        {qrDialogOpen && selectedTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setQrDialogOpen(false)}>
            <div className="bg-white p-6 rounded-lg max-w-sm w-full" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-semibold mb-4">Ticket QR Code</h3>
              <div className="flex justify-center p-4 bg-gray-50 rounded-md">
                <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                  QR Code Placeholder
                </div>
              </div>
              <p className="text-center text-sm mt-4">{selectedTicket.eventName}</p>
              <p className="text-center text-xs text-gray-500">{format(selectedTicket.date, "MMMM d, h:mm a")}</p>
              <button 
                className="w-full mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                onClick={() => setQrDialogOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </AttendeeShell>
  );
}