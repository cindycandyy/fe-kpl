"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/providers/auth-provider"
import { Ticket, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Event } from "@/types"

interface BookingSectionProps {
  eventId: string
}

export function BookingSection({ eventId }: BookingSectionProps) {
  const [event, setEvent] = useState<Event | null>(null)
  const [selectedTicketType, setSelectedTicketType] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockEvent: Event = {
      id: eventId,
      title: "Digital Marketing Masterclass 2024",
      description: "Learn advanced digital marketing strategies",
      type: "seminar",
      date: "2024-02-15T10:00:00Z",
      location: "Jakarta Convention Center",
      image: "/placeholder.svg?height=400&width=600",
      organizer: "Digital Marketing Institute",
      ticketTypes: [
        {
          id: "1",
          name: "Regular",
          price: 250000,
          quota: 100,
          available: 85,
          description: "Standard access to all sessions",
        },
      ],
      maxTicketsPerUser: 1,
      createdAt: "2024-01-01T00:00:00Z",
    }

    setTimeout(() => {
      setEvent(mockEvent)
      setSelectedTicketType(mockEvent.ticketTypes[0]?.id || "")
      setLoading(false)
    }, 1000)
  }, [eventId])

  const selectedTicket = event?.ticketTypes.find((t) => t.id === selectedTicketType)
  const totalPrice = selectedTicket ? selectedTicket.price * quantity : 0

  const handleBooking = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to book tickets.",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }

    if (!selectedTicket) {
      toast({
        title: "Error",
        description: "Please select a ticket type.",
        variant: "destructive",
      })
      return
    }

    setBooking(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Booking Successful!",
        description: `You have successfully booked ${quantity} ticket(s) for ${event?.title}.`,
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setBooking(false)
    }
  }

  if (loading) {
    return (
      <Card className="sticky top-4">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!event) {
    return null
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Ticket className="h-5 w-5 mr-2" />
          Book Tickets
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {event.ticketTypes.length > 1 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Ticket Type</label>
            <Select value={selectedTicketType} onValueChange={setSelectedTicketType}>
              <SelectTrigger>
                <SelectValue placeholder="Select ticket type" />
              </SelectTrigger>
              <SelectContent>
                {event.ticketTypes.map((ticket) => (
                  <SelectItem key={ticket.id} value={ticket.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{ticket.name}</span>
                      <span className="ml-2 text-sm text-gray-500">Rp {ticket.price.toLocaleString("id-ID")}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {selectedTicket && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{selectedTicket.name}</h3>
                <Badge variant="outline">{selectedTicket.available} left</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">{selectedTicket.description}</p>
              <p className="text-lg font-bold text-purple-600">Rp {selectedTicket.price.toLocaleString("id-ID")}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity</label>
              <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: Math.min(event.maxTicketsPerUser, selectedTicket.available) }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1} ticket{i > 0 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total Price</span>
                <span className="text-xl font-bold text-purple-600">Rp {totalPrice.toLocaleString("id-ID")}</span>
              </div>

              {event.maxTicketsPerUser < 5 && (
                <div className="flex items-start space-x-2 p-3 bg-yellow-50 rounded-lg mb-4">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <p className="text-sm text-yellow-800">
                    Maximum {event.maxTicketsPerUser} ticket{event.maxTicketsPerUser > 1 ? "s" : ""} per person for this
                    event.
                  </p>
                </div>
              )}

              <Button className="w-full" onClick={handleBooking} disabled={booking || selectedTicket.available === 0}>
                {booking ? "Processing..." : selectedTicket.available === 0 ? "Sold Out" : "Book Now"}
              </Button>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Tickets are non-refundable</p>
          <p>• Please arrive 30 minutes before the event</p>
          <p>• Bring a valid ID for verification</p>
        </div>
      </CardContent>
    </Card>
  )
}
