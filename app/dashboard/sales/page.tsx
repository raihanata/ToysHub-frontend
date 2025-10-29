"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, Search } from "lucide-react"
import axios from "axios"
import { SERVER_URL } from "@/lib/url"
import SaleActions from "@/components/ui/saleActions";
import { Payload } from "recharts/types/component/DefaultLegendContent";


const initialPayments = [
  { id: 1, patient: "John Doe", amount: 120, method: "Credit Card", status: "Completed", date: "2024-06-01" },
  { id: 2, patient: "Sarah Johnson", amount: 80, method: "Cash", status: "Pending", date: "2024-06-02" },
  { id: 3, patient: "Mike Williams", amount: 200, method: "Insurance", status: "Completed", date: "2024-06-03" },
  { id: 4, patient: "Emily Davis", amount: 50, method: "Credit Card", status: "Failed", date: "2024-06-04" },
]

const methods = ["all", "Credit Card", "Cash", "Insurance"]
const statuses = ["all", "Completed", "Pending", "Failed"]


interface OrderItem {
  _id: string
  productName: string
  price: number
  quantity: number
  total: number
}

interface Customer {
  _id: string
  customerName: string
  customerPhone: number

}
interface Amount {
  subtotal: number;
  discount: number;
  tax: number;
  totalAmount: number;
}

interface SalePayload {
  customerId: string;
  employeeId?: string; // from token
  saleDate: Date;
  paymentMethod: "Cash" | "Card" | "UPI";
  products: {
    productId: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  amount: Amount;
}
//
const Sale = () => {

  //
  const token = Cookies.get("auth_token");

  const [employeeId, setEmployeeId] = useState("")
  const [customerId, setCustomerId] = useState("")
  const [customerSearch, setCustomerSearch] = useState("")
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false)
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [newCustomerName, setNewCustomerName] = useState("")
  const [newCustomerPhone, setNewCustomerPhone] = useState("")

  const [productSearch, setProductSearch] = useState("")
  const [showProductDropdown, setShowProductDropdown] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState<OrderItem[]>([])

  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  const [discount, setDiscount] = useState(0)
  const [taxRate, setTaxRate] = useState(10)

  const [saleData, setSaleData] = useState<SalePayload>({
    customerId: "",
    saleDate: new Date(),
    paymentMethod: "Cash",
    products: [],
    amount: {
      subtotal: 0,
      discount: 0,
      tax: 0,
      totalAmount: 0,
    }
  });
  const [salesList, setSalesList] = useState<SalePayload[]>([])
   const [selectedSale, setSelectedSale] = useState<any>(null)
   const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");



  //  Handle search input
  const handleCustomerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomerSearch(value);

    if (value.trim().length > 1) {
      setShowCustomerDropdown(true);
      fetchCustomers(value);
    } else {
      setShowCustomerDropdown(false);
      setCustomers([]);
    }
  };
//ac
  //  Select customer
  const selectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCustomerSearch(`${customer.customerName} (${customer.customerPhone})`);
    setCustomers([]); // hide dropdown after select
    setShowCustomerDropdown(false)
  };

  //addn new customer

  const addNewCustomer = async () => {
    if (!newCustomerName.trim() || !newCustomerPhone.trim()) {
      alert("Please enter both name and phone");
      return;
    }

    try {
      const response = await axios.post(`${SERVER_URL}/customer/add`, {
        customerName: newCustomerName,
        customerPhone: newCustomerPhone,
      });

      if (response.data.status) {
        const savedCustomer = response.data.data;

        //  Select the new customer automatically
        setSelectedCustomer(savedCustomer);
        setCustomerSearch(`${savedCustomer.customerName} (${savedCustomer.customerPhone})`);
        setCustomers([]);
        setShowAddCustomer(false);
        setNewCustomerName("");
        setNewCustomerPhone("");

        alert("Customer added successfully!");
      } else {
        alert(response.data.message || "Failed to add customer");
      }
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Error adding new customer. Please try again.");
    }
  };


  // Product search handler
  const handleProductSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProductSearch(value);

    if (value.trim().length > 1) {
      fetchProducts(value);
      setShowProductDropdown(true);
    } else {
      setShowProductDropdown(false);
      setFilteredProducts([]);
    }
  };

  const addProductToOrder = (product: any) => {
    console.log("Selected product:", product);

    setOrderItems((prev) => [
      ...prev,
      {
        _id: product._id,
        productName: product.productName,
        price: Number(product.price) || 0,
        quantity: 1,
        total: Number(product.price) || 0,
      },
    ]);

    setProductSearch("");
    setShowProductDropdown(false);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setOrderItems(
      orderItems.map((item) => (item._id === id ? { ...item, quantity, total: quantity * item.price } : item)),
    )
  }

  const removeItem = (id: string) => {
    setOrderItems(orderItems.filter((item) => item._id !== id))
  }

  // Calculations
  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0)
  const discountAmount = (subtotal * discount) / 100
  const subtotalAfterDiscount = subtotal - discountAmount
  const taxAmount = (subtotalAfterDiscount * taxRate) / 100
  const total = subtotalAfterDiscount + taxAmount


  const handleCancel = () => {
    setEmployeeId("")
    setCustomerId("")
    setCustomerSearch("")
    setSelectedCustomer(null)
    setProductSearch("")
    setOrderItems([])
    setDiscount(0)
    setTaxRate(10)
    setSaleData({
      customerId: "",
      saleDate: new Date(),
      paymentMethod: "Cash",
      products: [],
      amount: { subtotal: 0, discount: 0, tax: 0, totalAmount: 0 },
    });
    setIsAddDialogOpen(false)
  }

  useEffect(() => {
    console.log(orderItems, '--------orders---------')
  }, [orderItems])

  //

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState([]);

  //
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMethod, setSelectedMethod] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [payments, setPayments] = useState(initialPayments)
  const [dialogMethod, setDialogMethod] = useState("")
  const [dialogStatus, setDialogStatus] = useState("")

  //filter
// normalize once
const normalized = searchTerm.trim().toLowerCase();

// filtered list (also respects method/status if you want)
const filteredSales = salesList.filter((sale: any) => {
  const name = (sale?.customerId?.customerName || "").toString().toLowerCase();
  const matchesName = name.includes(normalized);

  const matchesMethod = selectedMethod === "all" || sale.paymentMethod === selectedMethod;
  // if your sale object has `status` use this, otherwise ignore:
  const matchesStatus = selectedStatus === "all" || sale.status === selectedStatus;

  // when searchTerm empty, normalized === "" so includes("") === true -> shows all
  return matchesName && matchesMethod && matchesStatus;
});

  function handleAddPayment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const newPayment = {
      id: payments.length + 1,
      patient: (form.elements.namedItem('patient') as HTMLInputElement).value,
      amount: Number((form.elements.namedItem('amount') as HTMLInputElement).value),
      method: dialogMethod,
      status: dialogStatus,
      date: (form.elements.namedItem('date') as HTMLInputElement).value,
    }
    setPayments([newPayment, ...payments])
    setIsAddDialogOpen(false)
    setDialogMethod("")
    setDialogStatus("")
    form.reset()
  }
  //
  const fetchCustomers = async (query: string) => {
    try {
      const response = await axios.get(`${SERVER_URL}/customer/get`, {
        params: { customerName: customerSearch, customerPhone: customerSearch },
      });
      console.log("data", response)
      if (response.data?.data) {
        setCustomers(response.data.data);
      }
      else {
        setCustomers([]);
      }

    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  const fetchProducts = async (query: string) => {
    try {
      const response = await axios.get(`${SERVER_URL}/product/search`, {
        params: { productName: query },
      });
      console.log("data", response.data.data);

      setFilteredProducts(response.data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setFilteredProducts([]);
    }
  };



  const handleSaveSale = async () => {
    try {

      const token = Cookies.get("auth_token");
      if (!selectedCustomer) {
        alert("Please select a customer before saving the sale.");
        return;
      }

      // Build the amount dynamically
      const amount = {
        subtotal,
        discount: discountAmount,
        tax: taxAmount,
        totalAmount: total,
      };

      // Build products from orderItems
      const products = orderItems.map(item => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      }));

      //  payload
      const payload = {
        customerId: selectedCustomer!._id,
        saleDate: new Date(),
        paymentMethod: saleData.paymentMethod,
        products,
        amount,
      };

      console.log("Sending payload:", payload);


      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/sales/add`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.status) {
        alert("Sale added successfully!");
        console.log(res.data.data);
        handleCancel()
      } else {
        alert("Failed to add sale.");
      }

    } catch (error) {
      console.error(error);
      alert("Error saving sale");
    }
  };

  //fetch sales details
  const fetchsales = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/sales/get`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("data", response)
      setSalesList(response.data.data);

    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  //
  useEffect(() => {
    if (!isAddDialogOpen) {
      setDialogMethod("")
      setDialogStatus("")
      fetchsales()
      setSaleData(prev => ({
        ...prev,
        products: orderItems.map(item => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
        })),
        amount: {
          subtotal,
          discount: discountAmount,
          tax: taxAmount,
          totalAmount: total,
        },
      }));
    }
  }, [isAddDialogOpen, orderItems, subtotal, discountAmount, taxAmount, total])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Sales and Orders</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Sale
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Sale</DialogTitle>
              <DialogDescription>Enter the sales details below.</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4" onSubmit={handleAddPayment}>

              <div className=" bg-gradient-to-br from-slate-50 to-slate-100 p-6">
                <div className="max-w-6xl mx-auto">
                  {/* Header */}
                  <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Invoice Form</h1>
                    <p className="text-slate-600">Create and manage customer orders</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                      <Card className="p-8 shadow-lg">


                        {/* Customer Section */}
                        <div className="mb-8 pb-8 border-b border-slate-200">
                          <label className="block text-sm font-semibold text-slate-700 mb-3">
                            Customer <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="flex gap-2">
                              <div className="flex-1 relative">
                                <Input
                                  type="text"
                                  placeholder="Search by name or phone number"
                                  value={customerSearch}
                                  onChange={handleCustomerSearch}
                                  onFocus={() => customerSearch && setShowCustomerDropdown(true)}
                                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <Search className="absolute right-3 top-2.5 w-5 h-5 text-slate-400" />

                                {/* Customer Dropdown */}
                                {showCustomerDropdown && (
                                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-300 rounded-lg shadow-lg z-10">
                                    {customers.length > 0 ? (
                                      customers.map((customer) => (
                                        <button
                                          key={customer._id}
                                          onClick={() => selectCustomer(customer)}
                                          className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-slate-200 last:border-b-0 transition"
                                        >
                                          <div className="font-medium text-slate-900">{customer.customerName}</div>
                                          <div className="text-sm text-slate-500">{customer.customerPhone}</div>
                                        </button>
                                      ))
                                    ) : (
                                      <div className="p-3 text-sm text-slate-500 text-center">No customers found</div>
                                    )}
                                  </div>
                                )}

                              </div>

                              {/* Add Customer Button */}
                              {!selectedCustomer && (
                                <Button
                                  onClick={() => setShowAddCustomer(!showAddCustomer)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                >
                                  <Plus className="w-4 h-4" />
                                  Add Customer
                                </Button>
                              )}
                            </div>

                            {/* Add Customer Form */}
                            {showAddCustomer && (
                              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h3 className="font-semibold text-slate-900 mb-3">Register New Customer</h3>
                                <div className="space-y-3">
                                  <Input
                                    type="text"
                                    placeholder="Customer Name"
                                    value={newCustomerName}
                                    onChange={(e) => setNewCustomerName(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                                  />
                                  <Input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={newCustomerPhone}
                                    onChange={(e) => setNewCustomerPhone(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                                  />
                                  <div className="flex gap-2">
                                    <Button
                                      onClick={addNewCustomer}
                                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                    >
                                      Save Customer
                                    </Button>
                                    <Button onClick={() => setShowAddCustomer(false)} variant="outline" className="flex-1">
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Selected Customer Display */}
                          {selectedCustomer && (
                            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200 flex justify-between items-center">
                              <div>
                                <div className="font-semibold text-slate-900">{selectedCustomer.name}</div>
                                <div className="text-sm text-slate-600">{selectedCustomer.phone}</div>
                              </div>
                              <button
                                onClick={() => {
                                  setSelectedCustomer(null)
                                  setCustomerSearch("")
                                  setCustomerId("")
                                }}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Product Section */}
                        <div className="mb-8">
                          <label className="block text-sm font-semibold text-slate-700 mb-3">
                            Add Products <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Input
                              type="text"
                              placeholder="Search and add products by name"
                              value={productSearch}
                              onChange={handleProductSearch}
                              onFocus={() => productSearch && setShowProductDropdown(true)}
                              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Search className="absolute right-3 top-2.5 w-5 h-5 text-slate-400" />

                            {/* Product Dropdown */}
                            {showProductDropdown && filteredProducts.length > 0 && (
                              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                {filteredProducts.map((product) => (
                                  <button
                                    type="button"
                                    key={product._id}
                                    onClick={() => addProductToOrder(product)}
                                    className="w-full px-4 py-2 text-left hover:bg-blue-50 border-b last:border-0"
                                  >

                                    <div className="flex justify-between items-center">
                                      <div>
                                        <div className="font-medium">{product.productName}</div>
                                        <div className="text-sm text-gray-500">{product.price}</div>
                                      </div>
                                      <div className="font-semibold">₹{product.total}</div>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            )}

                          </div>
                        </div>

                        {/* Order Items Table */}
                        {orderItems.length > 0 && (
                          <div className="mb-8 overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b-2 border-slate-300">
                                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Product Name</th>
                                  <th className="text-right py-3 px-4 font-semibold text-slate-700">Price</th>
                                  <th className="text-center py-3 px-4 font-semibold text-slate-700">Quantity</th>
                                  <th className="text-right py-3 px-4 font-semibold text-slate-700">Total</th>
                                  <th className="text-center py-3 px-4 font-semibold text-slate-700">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orderItems.map((item) => (
                                  <tr key={item._id} className="border-b border-slate-200 hover:bg-slate-50">
                                    <td className="py-3 px-4 text-slate-900">{item.productName}</td>
                                    <td className="py-3 px-4 text-right text-slate-900">₹{item.price.toFixed(2)}</td>
                                    <td className="py-3 px-4">
                                      <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item._id, Number.parseInt(e.target.value) || 1)}
                                        className="w-16 px-2 py-1 border border-slate-300 rounded text-center"
                                      />
                                    </td>
                                    <td className="py-3 px-4 text-right font-semibold text-slate-900">
                                      ₹{item.total.toFixed(2)}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <button
                                        onClick={() => removeItem(item._id)}
                                        className="text-red-600 hover:text-red-700 transition"
                                      >
                                        <X className="w-5 h-5" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Summary Section */}
                        <div className="space-y-4 mb-8 p-6 bg-slate-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-700 font-medium">Subtotal:</span>
                            <span className="text-slate-900 font-semibold">₹{subtotal.toFixed(2)}</span>
                          </div>

                          <div className="flex justify-between items-center">
                            <label className="text-slate-700 font-medium">Discount (%):</label>
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={discount}
                                onChange={(e) => setDiscount(Number.parseFloat(e.target.value) || 0)}
                                className="w-20 px-2 py-1 border border-slate-300 rounded text-right"
                              />
                              <span className="text-slate-900 font-semibold">-₹{discountAmount.toFixed(2)}</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <label className="text-slate-700 font-medium">Tax (%):</label>
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={taxRate}
                                onChange={(e) => setTaxRate(Number.parseFloat(e.target.value) || 0)}
                                className="w-20 px-2 py-1 border border-slate-300 rounded text-right"
                              />
                              <span className="text-slate-900 font-semibold">+₹{taxAmount.toFixed(2)}</span>
                            </div>



                          </div>
                          <div className="space-y-2 mt-4">
                            <Label htmlFor="paymentMethod">Payment Method</Label>
                            <select
                              id="paymentMethod"
                              value={saleData.paymentMethod}
                              onChange={(e) =>
                                setSaleData((prev) => ({ ...prev, paymentMethod: e.target.value as "Cash" | "Card" | "UPI", }))
                              }
                              className="border rounded-md p-2 w-full"
                            >
                              <option value="Cash">Cash</option>
                              <option value="Card">Card</option>
                              <option value="UPI">UPI</option>
                              <option value="Bank Transfer">Bank Transfer</option>
                            </select>
                          </div>

                          <div className="border-t-2 border-slate-300 pt-4 flex justify-between items-center">
                            <span className="text-lg font-bold text-slate-900">Total Amount:</span>
                            <span className="text-2xl font-bold text-blue-600">₹{total.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                          <Button
                            onClick={handleSaveSale}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
                          >
                            Save Order
                          </Button>
                          <Button
                            onClick={handleCancel}
                            variant="outline"
                            className="flex-1 border-2 border-slate-300 text-slate-700 font-semibold py-3 rounded-lg hover:bg-slate-100 transition bg-transparent"
                          >
                            Cancel
                          </Button>
                        </div>
                      </Card>
                    </div>

                    {/* Summary Sidebar */}
                    {/* <div className="lg:col-span-1">
            <Card className="p-6 shadow-lg sticky top-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Employee ID</p>
                  <p className="font-semibold text-slate-900">{employeeId || "—"}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-1">Customer</p>
                  <p className="font-semibold text-slate-900">{selectedCustomer?.name || "—"}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-1">Items</p>
                  <p className="font-semibold text-slate-900">{orderItems.length}</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal:</span>
                  <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Discount:</span>
                  <span className="font-medium text-red-600">-${discountAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Tax:</span>
                  <span className="font-medium text-slate-900">+${taxAmount.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between">
                  <span className="font-bold text-slate-900">Total:</span>
                  <span className="text-lg font-bold text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div> */}
                  </div>
                </div>
              </div>


            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Sales List</CardTitle>
          <CardDescription>Manage and track your sales.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search sales data by customer ..."
                className="pl-8"
               value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Methods" />
                </SelectTrigger>
                <SelectContent>
                  {methods.map((method) => (
                    <SelectItem key={method} value={method}>{method === "all" ? "All Methods" : method}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>{status === "all" ? "All Statuses" : status}</SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
             
            </div>
          </div>
          <div className="rounded-md border overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">customer</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Method</th>

                  <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Action</th>
                </tr>
              </thead>
            <tbody>
  {filteredSales.length === 0 ? (
    <tr>
      <td colSpan={5} className="h-24 text-center text-gray-500">
        No sales found{searchTerm ? ` for "${searchTerm}"` : ""}.
      </td>
    </tr>
  ) : (
    filteredSales.map((s: any) => (
      <tr key={s._id} className="border-b transition-colors hover:bg-muted/50">
        <td className="p-4 align-middle">{s.customerId?.customerName ?? "Unknown"}</td>
        <td className="p-4 align-middle">₹{s.amount?.totalAmount ?? "-"}</td>
        <td className="p-4 align-middle">{s.paymentMethod ?? "-"}</td>
        <td className="p-4 align-middle">{s.saleDate ? new Date(s.saleDate).toLocaleDateString() : "-"}</td>
        <td className="p-4 align-middle text-center">
          <SaleActions
            sale={s}
            onView={(sale: any) => {
              setSelectedSale(sale);
              setIsInvoiceDialogOpen(true);
            }}
          />
        </td>
      </tr>
    ))
  )}
</tbody>
            </table>
           
    
 {/* 🧾 Sale Details Dialog */}
      <Dialog open={isInvoiceDialogOpen} onOpenChange={setIsInvoiceDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Sale Invoice Details</DialogTitle>
            <DialogDescription>
              View sale information, customer details, and products.
            </DialogDescription>
          </DialogHeader>

          {selectedSale && (
            <div className="space-y-4">
              {/* Customer Info */}
              <div className="border-b pb-3">
                <h2 className="font-semibold text-lg mb-1">Customer Info</h2>
                <p>Name: {selectedSale.customerId?.customerName || "N/A"}</p>
                <p>Date: {new Date(selectedSale.saleDate).toLocaleString()}</p>
                <p>Payment: {selectedSale.paymentMethod}</p>
              </div>

              {/* Products Table */}
              <table className="w-full border-collapse border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Product</th>
                    <th className="p-2 text-right">Qty</th>
                    <th className="p-2 text-right">Price</th>
                    <th className="p-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSale.products?.map((p: any, i: number) => (
                    <tr key={i} className="border-t">
                      <td className="p-2">{p.productId?.productName || "Unknown"}</td>
                      <td className="p-2 text-right">{p.quantity}</td>
                      <td className="p-2 text-right">₹{p.price}</td>
                      <td className="p-2 text-right font-medium">₹{p.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="mt-4 text-right border-t pt-3">
                <p>Subtotal: ₹{selectedSale.amount?.subtotal}</p>
                <p>Discount: ₹{selectedSale.amount?.discount}</p>
                <p>Tax: ₹{selectedSale.amount?.tax}</p>
                <p className="text-lg font-bold text-blue-600">
                  Total: ₹{selectedSale.amount?.totalAmount}
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInvoiceDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Sale