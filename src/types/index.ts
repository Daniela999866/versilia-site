// src/types/index.ts

export interface Booking {
  id: string;
  check_in: string;
  check_out: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  guests_count: number;
  message?: string;
  total_price: number;
  deposit_paid: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_intent_id?: string;
  stripe_session_id?: string;
  created_at: string;
  updated_at: string;
}

export interface BlockedDate {
  id: string;
  date: string;
  reason?: string;
  created_at: string;
}

export interface Price {
  id: string;
  date_from: string;
  date_to: string;
  price_per_night: number;
  type: 'standard' | 'weekend' | 'peak' | 'low';
  label?: string;
  created_at: string;
}

export interface BookingFormData {
  check_in: string;
  check_out: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  guests_count: number;
  message?: string;
}

export interface PriceCalculation {
  nights: number;
  price_per_night: number;
  subtotal: number;
  cleaning_fee: number;
  total: number;
  deposit: number;
  remaining: number;
  breakdown: { date: string; price: number }[];
}

export interface AvailabilityResponse {
  available: boolean;
  blocked_dates: string[];
  booked_dates: string[];
}

export interface AdminStats {
  total_bookings: number;
  confirmed_bookings: number;
  pending_bookings: number;
  revenue_total: number;
  revenue_month: number;
  occupancy_rate: number;
}
