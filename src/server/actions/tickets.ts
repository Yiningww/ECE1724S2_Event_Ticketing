export async function getUserTickets() {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        return { tickets: [] };
      }
  
      // Get all registrations for the current user
      const registrations = await prisma.registration.findMany({
        where: {
          userId: currentUser.id,
          status: { not: REGISTRATION_STATUS.CANCELLED },
        },
        include: {
          event: {
            select: {
              id: true,
              title: true,
              location: true,
              startDate: true,
              endDate: true,
              virtualEventUrl: true,
              imageUrl: true,
            }
          },
          ticketType: true,
          ticket: true,
        },
        orderBy: { 
          event: {
            startDate: 'asc', // Show upcoming events first
          }
        },
      });
  
      return { tickets: registrations };
    } catch (error) {
      console.error('Error fetching user tickets:', error);
      return { tickets: [], error: 'Failed to fetch tickets' };
    }
  }
  
  /**
   * Get a specific ticket by ID
   */
  export async function getTicketById(ticketId: string) {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        return null;
      }
  
      // Get the ticket with related data
      const ticket = await prisma.ticket.findUnique({
        where: { id: ticketId },
        include: {
          registration: {
            include: {
              event: true,
              ticketType: true,
              responses: {
                include: {
                  customField: true
                }
              }
            }
          }
        }
      });
  
      // If ticket not found or doesn't belong to current user
      if (!ticket || ticket.registration.userId !== currentUser.id) {
        return null;
      }
  
      return ticket;
    } catch (error) {
      console.error('Error fetching ticket details:', error);
      return null;
    }
  }