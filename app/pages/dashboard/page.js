"use client"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import useEventHooks from "@/hooks/useEventHooks"
import useTicketHook from "@/hooks/useTicketHook"
import { Loader2, AlertCircle } from "lucide-react"
import axios from "@/services/axios"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const PaymentForm = ({ clientSecret, onSuccess, onError }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setIsProcessing(true)

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/pages/payment`,
        },
      })

      if (error) {
        onError(error.message)
      } else {
        onSuccess()
      }
    } catch (err) {
      onError("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6 bg-slate-800 p-6 rounded-lg">
      <PaymentElement className="mb-6 text-white" />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:opacity-90 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center text-lg font-semibold shadow-md"
      >
        {isProcessing ? (
          <>
            <Loader2 className="animate-spin mr-3" size={24} />
            Processing...
          </>
        ) : (
          "Pay Now"
        )}
      </button>
    </form>
  )
}

const EventCard = ({ event, tickets, onBook }) => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [quantity, setQuantity] = useState(1)

  const eventTickets = tickets?.events?.find((t) => t.eventDetails.id === event.id)?.ticketCategories

  return (
    <div className="bg-slate-800 text-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
      <div className="relative overflow-hidden">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.name}
          className="w-full h-64 object-cover object-center transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <h2 className="absolute bottom-4 left-4 text-3xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {event.name}
        </h2>
      </div>
      <div className="p-6 space-y-4">
        <p className="text-slate-300 line-clamp-2">{event.description}</p>
        <div className="space-y-2 text-sm">
          {[
            { label: 'Date', value: event.date },
            { label: 'Time', value: `${event.start_time} - ${event.end_time}` },
            { label: 'Location', value: event.location }
          ].map(({ label, value }) => (
            <p key={label} className="flex items-center">
              <span className="font-semibold mr-2">{label}:</span> {value}
            </p>
          ))}
        </div>
        
        <div className="space-y-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          >
            <option value="" className="bg-slate-800">Select Ticket Category</option>
            {eventTickets?.map((ticket, index) => (
              <option 
                key={index} 
                value={ticket.category} 
                className="bg-slate-800"
              >
                {ticket.category} - ₹{ticket.price} (Available: {ticket.availableTickets})
              </option>
            ))}
          </select>
          
          <input
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
            className="w-full p-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            placeholder="Quantity"
          />
          
          <button
            onClick={() => onBook(event, selectedCategory, quantity)}
            disabled={!selectedCategory || quantity <= 0}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 ease-in-out font-semibold transform hover:-translate-y-1 hover:shadow-lg"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

const TicketBooking = () => {
  const events = useSelector((state) => state.eventSlice?.events)
  const tickets = useSelector((state) => state.ticketSlice?.tickets)
  const { fetchEvents } = useEventHooks()
  const { fetchTickets } = useTicketHook()
  
  const [clientSecret, setClientSecret] = useState(null)
  const [paymentError, setPaymentError] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchEvents()
    fetchTickets()
  }, [])

  const handleBookTicket = async (event, category, quantity) => {
    if (!event || !category || quantity <= 0) {
      alert("Please select all required fields")
      return
    }

    setIsLoading(true)
    setPaymentError(null)

    try {
      const response = await axios.post("https://event-mangement-backend-sj7x.onrender.com/api/payment/create-intent", {
        eventName: event.name,
        category,
        quantity,
      })

      if (response.data?.clientSecret) {
        setClientSecret(response.data.clientSecret)
        setShowPaymentModal(true)
      } else {
        throw new Error("No client secret received")
      }
    } catch (error) {
      console.error("Payment creation error:", error)
      const errorMessage = error.response?.data?.message 
        || (error.response?.status === 401 
          ? "Please log in to book tickets" 
          : "Unable to connect to payment service")
      setPaymentError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Book Your Event Tickets
        </h1>

        {paymentError && (
          <div className="flex items-center justify-center mb-8">
            <div className="bg-red-600/20 border border-red-500 text-red-300 p-4 rounded-lg flex items-center">
              <AlertCircle className="mr-3" />
              {paymentError}
            </div>
          </div>
        )}

        {showPaymentModal && clientSecret && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 rounded-xl p-8 w-full max-w-md shadow-2xl border border-slate-700">
              <h2 className="text-2xl font-bold mb-6 text-white">Complete Payment</h2>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm
                  clientSecret={clientSecret}
                  onSuccess={() => setShowPaymentModal(false)}
                  onError={(error) => setPaymentError(error)}
                />
              </Elements>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="mt-6 text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(events) && events.length > 0 ? (
            events.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                tickets={tickets} 
                onBook={handleBookTicket} 
              />
            ))
          ) : (
            <div className="col-span-full text-center">
              <p className="text-slate-400 text-lg">No events available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TicketBooking