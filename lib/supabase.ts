import { createClient } from "@supabase/supabase-js"

// In a real app, these would be environment variables
// For demo purposes, we're using placeholder values
const supabaseUrl = "https://your-supabase-url.supabase.co"
const supabaseAnonKey = "your-supabase-anon-key"

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Sample data for demo purposes
export const sampleData = {
  users: [
    { id: 1, email: "admin@medicare.com", role: "admin", name: "Admin User" },
    { id: 2, email: "doctor@medicare.com", role: "doctor", name: "Dr. Smith" },
    { id: 3, email: "reception@medicare.com", role: "reception", name: "Reception Staff" },
  ],
  patients: [
    {
      id: 1,
      name: "John Doe",
      age: 45,
      gender: "Male",
      phone: "+1 (555) 123-4567",
      email: "john.doe@example.com",
      address: "123 Main St, Anytown, CA 12345",
      lastVisit: "2025-05-01",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      age: 32,
      gender: "Female",
      phone: "+1 (555) 234-5678",
      email: "sarah.johnson@example.com",
      address: "456 Oak Ave, Somewhere, CA 12345",
      lastVisit: "2025-04-28",
      status: "Active",
    },
    // More patients...
  ],
  appointments: [
    {
      id: 1,
      patientId: 1,
      doctorId: 1,
      date: "2025-05-11",
      time: "10:00 AM",
      type: "Consultation",
      status: "Confirmed",
    },
    {
      id: 2,
      patientId: 2,
      doctorId: 2,
      date: "2025-05-11",
      time: "11:30 AM",
      type: "Follow-up",
      status: "Confirmed",
    },
    // More appointments...
  ],
  medicines: [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      price: 5.99,
      stock: 120,
      manufacturer: "MediPharm",
      expiryDate: "2026-05-11",
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      category: "Antibiotics",
      price: 12.5,
      stock: 85,
      manufacturer: "HealthCare Pharma",
      expiryDate: "2026-03-15",
    },
    // More medicines...
  ],
  // Add more sample data as needed
}

// Mock functions to simulate database operations
export const fetchPatients = async () => {
  // In a real app, this would be a Supabase query
  // return await supabase.from('patients').select('*')

  // For demo, return sample data
  return { data: sampleData.patients, error: null }
}

export const fetchAppointments = async () => {
  // In a real app, this would be a Supabase query
  // return await supabase.from('appointments').select('*')

  // For demo, return sample data
  return { data: sampleData.appointments, error: null }
}

export const fetchMedicines = async () => {
  // In a real app, this would be a Supabase query
  // return await supabase.from('medicines').select('*')

  // For demo, return sample data
  return { data: sampleData.medicines, error: null }
}

// Add more mock functions as needed
