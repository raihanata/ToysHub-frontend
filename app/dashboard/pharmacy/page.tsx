"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, Trash2, Plus, Minus } from "lucide-react"

// Sample medicine data
const medicines = [
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
  {
    id: 3,
    name: "Ibuprofen 400mg",
    category: "Pain Relief",
    price: 7.25,
    stock: 95,
    manufacturer: "MediPharm",
    expiryDate: "2026-06-20",
  },
  {
    id: 4,
    name: "Omeprazole 20mg",
    category: "Gastrointestinal",
    price: 15.75,
    stock: 60,
    manufacturer: "HealthCare Pharma",
    expiryDate: "2026-04-10",
  },
  {
    id: 5,
    name: "Cetirizine 10mg",
    category: "Allergy",
    price: 8.99,
    stock: 110,
    manufacturer: "AllCure Labs",
    expiryDate: "2026-07-05",
  },
  {
    id: 6,
    name: "Metformin 500mg",
    category: "Diabetes",
    price: 14.5,
    stock: 75,
    manufacturer: "MediPharm",
    expiryDate: "2026-05-25",
  },
  {
    id: 7,
    name: "Atorvastatin 10mg",
    category: "Cardiovascular",
    price: 18.25,
    stock: 65,
    manufacturer: "HealthCare Pharma",
    expiryDate: "2026-04-30",
  },
  {
    id: 8,
    name: "Loratadine 10mg",
    category: "Allergy",
    price: 9.75,
    stock: 100,
    manufacturer: "AllCure Labs",
    expiryDate: "2026-06-15",
  },
]

// Sample patients for billing
const patients = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Sarah Johnson" },
  { id: 3, name: "Mike Williams" },
  { id: 4, name: "Emily Davis" },
  { id: 5, name: "Robert Miller" },
]

export default function PharmacyPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [cart, setCart] = useState<Array<{ medicine: (typeof medicines)[0]; quantity: number }>>([])
  const [selectedPatient, setSelectedPatient] = useState<string | undefined>(undefined)

  // Filter medicines based on search query and category
  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory ? medicine.category === selectedCategory : true

    return matchesSearch && matchesCategory
  })

  // Get unique categories for filter
  const categories = [...new Set(medicines.map((medicine) => medicine.category))]

  // Add medicine to cart
  const addToCart = (medicine: (typeof medicines)[0]) => {
    const existingItem = cart.find((item) => item.medicine.id === medicine.id)

    if (existingItem) {
      setCart(cart.map((item) => (item.medicine.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { medicine, quantity: 1 }])
    }
  }

  // Remove medicine from cart
  const removeFromCart = (medicineId: number) => {
    setCart(cart.filter((item) => item.medicine.id !== medicineId))
  }

  // Update quantity in cart
  const updateQuantity = (medicineId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(medicineId)
      return
    }

    setCart(cart.map((item) => (item.medicine.id === medicineId ? { ...item, quantity: newQuantity } : item)))
  }

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + item.medicine.price * item.quantity, 0)

  // Calculate tax (10%)
  const tax = subtotal * 0.1

  // Calculate total
  const total = subtotal + tax

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Pharmacy</h2>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <ShoppingCart className="mr-2 h-4 w-4" />
          {cart.length > 0 && `(${cart.length})`} View Cart
        </Button>
      </div>
      <Tabs defaultValue="billing" className="space-y-4">
        <TabsList>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        <TabsContent value="billing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search medicines..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredMedicines.map((medicine) => (
                  <Card key={medicine.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{medicine.name}</CardTitle>
                      <CardDescription>{medicine.manufacturer}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between">
                        <Badge variant="outline">{medicine.category}</Badge>
                        <span className="font-medium">${medicine.price.toFixed(2)}</span>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        Stock: {medicine.stock} • Expires: {new Date(medicine.expiryDate).toLocaleDateString()}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full bg-teal-600 hover:bg-teal-700"
                        onClick={() => addToCart(medicine)}
                        disabled={medicine.stock <= 0}
                      >
                        Add to Bill
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Current Bill</CardTitle>
                  <CardDescription>
                    {cart.length} {cart.length === 1 ? "item" : "items"} in bill
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient">Patient</Label>
                    <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                      <SelectTrigger id="patient">
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id.toString()}>
                            {patient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="rounded-md border">
                    {cart.length === 0 ? (
                      <div className="flex h-[200px] items-center justify-center p-4 text-center">
                        <div>
                          <ShoppingCart className="mx-auto h-8 w-8 text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">No items in bill</p>
                        </div>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {cart.map((item) => (
                          <div key={item.medicine.id} className="flex items-center justify-between p-4">
                            <div className="flex-1">
                              <div className="font-medium">{item.medicine.name}</div>
                              <div className="text-sm text-muted-foreground">
                                ${item.medicine.price.toFixed(2)} each
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.medicine.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.medicine.id, item.quantity + 1)}
                                disabled={item.quantity >= item.medicine.stock}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => removeFromCart(item.medicine.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 rounded-md border p-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button
                    className="w-full bg-teal-600 hover:bg-teal-700"
                    disabled={cart.length === 0 || !selectedPatient}
                  >
                    Generate Bill
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setCart([])}>
                    Clear Bill
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medicine Inventory</CardTitle>
              <CardDescription>Manage your pharmacy inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Price</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Stock</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Manufacturer</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Expiry Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicines.map((medicine) => (
                        <tr
                          key={medicine.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle font-medium">{medicine.name}</td>
                          <td className="p-4 align-middle">{medicine.category}</td>
                          <td className="p-4 align-middle">${medicine.price.toFixed(2)}</td>
                          <td className="p-4 align-middle">
                            <span className={medicine.stock < 20 ? "text-red-500 font-medium" : ""}>
                              {medicine.stock}
                            </span>
                          </td>
                          <td className="p-4 align-middle">{medicine.manufacturer}</td>
                          <td className="p-4 align-middle">{new Date(medicine.expiryDate).toLocaleDateString()}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm">
                                Restock
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
