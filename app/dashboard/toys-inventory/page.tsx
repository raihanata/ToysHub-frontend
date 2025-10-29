"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, Search } from "lucide-react"
import axios from "axios"
import { SERVER_URL } from "@/lib/url"

// Sample inventory data
const initialInventory = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Medicine",
    quantity: 120,
    status: "In Stock",
    supplier: "Pharma Inc.",
    expiry: "2025-12-31",
  },
  {
    id: 2,
    name: "Syringe 5ml",
    category: "Equipment",
    quantity: 50,
    status: "Low Stock",
    supplier: "MedEquip",
    expiry: "2027-01-01",
  },
  {
    id: 3,
    name: "Bandage Roll",
    category: "Supplies",
    quantity: 200,
    status: "In Stock",
    supplier: "HealthSupplies",
    expiry: "2026-06-15",
  },
  {
    id: 4,
    name: "Ibuprofen 200mg",
    category: "Medicine",
    quantity: 0,
    status: "Out of Stock",
    supplier: "Pharma Inc.",
    expiry: "2025-08-20",
  },
]

const statuses = ["all", "In Stock", "Out Of stock"]


//catogory type
interface Category {
  _id: string
  name: string;
  categorydes: string;
}
interface Product {
  _id: string,
  productName: string;
  price: number;
  stockQuantity: number,
  stockStatus: string,
  description: string,
  image: string,
  category: Category
  name: string
}
interface FormDataType {
  category: string
  productName: string
  price: number
  stockQuantity: number
  stockStatus: string
  description: string
  image: string | File  // 👈 allow both string (for existing image) or File (for upload)
}

export default function ToysInventory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [inventory, setInventory] = useState(initialInventory)
  const [dialogCategory, setDialogCategory] = useState("")
  const [dialogStatus, setDialogStatus] = useState("")
//pagination
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const itemsPerPage = 5; 
  
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormDataType>({
    category: '',
    productName: '',
    price: 0,
    stockQuantity: 0,
    stockStatus: 'Out Of stock',
    description: '',
    image: ''
  })

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }


  ///category and status
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [statusOptions, setStatusOptions] = useState<Product[]>([]);
  const [productData, setproductData] = useState<Product[]>([]);
  // Filter inventory based on search, category, and status
  const filteredInventory = productData.filter((item) => {

    const matchesCategory = selectedCategory === "all" || item.category._id === selectedCategory;
    const matchesStatus = selectedStatus === "all" || item.stockStatus === selectedStatus;
    const matchesSearch =
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  })

  //Add new inventory item (
  async function handleAddItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {

      const form = new FormData();
      form.append("productName", formData.productName);
      form.append("category", formData.category);
      form.append("price", formData.price.toString());
      form.append("stockQuantity", formData.stockQuantity.toString());
      form.append("stockStatus", formData.stockStatus);
      form.append("description", formData.description);
      if (formData.image) form.append("image", formData.image); // image file

      const res = await axios.post(`${SERVER_URL}/product/add`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully!");


      fetchProducts();
      setFormData({
        category: '',
        productName: '',
        price: 0,
        stockQuantity: 0,
        stockStatus: 'Out Of stock',
        description: '',
        image: ''
      });
      setIsAddDialogOpen(false);

    } catch (error) {
      console.error(" Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/category/view`);
      console.log("data", response)
      setCategoryData(response.data.data);

    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  //get products
  const fetchProducts = async (page = 1) => {
    try {
      const response = await axios.get(`${SERVER_URL}/product/get`, {
      params: { page, limit: itemsPerPage },
    });
    const { data, totalPages: tp } = response.data;
      console.log("data", response)
      
       setproductData(data);
    setCurrentPage(page);
    setTotalPages(tp);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  async function handleDelete(id: string | undefined) {
    if (!id) {
      console.log('no id for product')
      return
    }

    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await axios.delete(`${SERVER_URL}/product/delete/`,
        {
          params: { id } // <-- send ID in request body
        });
      if (response.status === 200) {
        alert("Product deleted successfully!");
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting Product:", error);
      alert("Failed to delete product");
    }
  }

  //handle updates
  async function handleUpdate(id: string | undefined) {
    if (!id) {
      console.log("no id for product");
      return;
    }

    const productToEdit = productData.find((p) => p._id === id);
    if (!productToEdit) {
      alert("Product not found!");
      return;
    }

    // prefill form data
    setFormData({
      category: productToEdit.category._id,
      productName: productToEdit.productName,
      price: productToEdit.price,
      stockQuantity: productToEdit.stockQuantity,
      stockStatus: productToEdit.stockStatus,
      description: productToEdit.description,
      image: productToEdit.image,
    });

    setCurrentProductId(id);
    setIsUpdateDialogOpen(true);
  }
  //handle update submit

  async function handleUpdateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!currentProductId) {
      alert("No product selected for update!");
      return;
    }

    try {

      const form = new FormData();
      form.append("productName", formData.productName);
      form.append("category", formData.category);
      form.append("price", formData.price.toString());
      form.append("stockQuantity", formData.stockQuantity.toString());
      form.append("stockStatus", formData.stockStatus);
      form.append("description", formData.description);
      if (formData.image && formData.image instanceof File)
        form.append("image", formData.image);


      const response = await axios.patch(`${SERVER_URL}/product/update`, form, {
        params: { id: currentProductId },
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Product updated:", response.data);
      alert("Product updated successfully!");
      fetchProducts();
      setIsUpdateDialogOpen(false);
      setCurrentProductId(null);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  }
//net previous handler
const handlePrevPage = () => {
  if (currentPage > 1) {
    fetchProducts(currentPage - 1);
  }
};

const handleNextPage = () => {
  if (currentPage < totalPages) {
    fetchProducts(currentPage + 1);
  }
};
  // Reset dialog state when dialog closes
  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Product Item</DialogTitle>
              <DialogDescription>Enter the Product details below.</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4" onSubmit={handleAddItem}>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Product Name</Label>
                <Input id="productName" name="productName" placeholder="Prodcut Name" className="col-span-3" required
                  value={formData.productName}
                  onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Price</Label>
                <Input id="price" name="price" placeholder="Price" className="col-span-3" required
                  value={formData.price}
                  onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">Quantity</Label>
                <Input id="stockQuantity" name="stockQuantity" type="number" min="0" placeholder="0" className="col-span-3" required
                  value={formData.stockQuantity}
                  onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="supplier" className="text-right">Description</Label>
                <Input id="description" name="description" placeholder="Description" className="col-span-3" required
                  value={formData.description}
                  onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expiry" className="text-right">Image</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="col-span-3"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setFormData((prev) => ({ ...prev, image: file }));
                  }}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Select value={formData.category} onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))} required>
                  <SelectTrigger id="category" className="col-span-3">
                    <SelectValue placeholder="Select category"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryData.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select value={formData.stockStatus} onValueChange={(value) => {
                  console.log(value, 'value')
                  setFormData((prev) => ({ ...prev, stockStatus: value }))
                }
                } required>
                  <SelectTrigger id="status" className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700" type="submit">
                  Save Item
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* update dialog box */}

        <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Update Product</DialogTitle>
              <DialogDescription>Modify product details and save changes.</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4" onSubmit={handleUpdateSubmit}>
              {/* Same form inputs as Add Product — reuse directly */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="productName" className="text-right">Product Name</Label>
                <Input id="productName" name="productName" className="col-span-3"
                  value={formData.productName}
                  onChange={handleInputChange} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">Price</Label>
                <Input id="price" name="price" className="col-span-3"
                  value={formData.price}
                  onChange={handleInputChange} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stockQuantity" className="text-right">Quantity</Label>
                <Input id="stockQuantity" name="stockQuantity" type="number" className="col-span-3"
                  value={formData.stockQuantity}
                  onChange={handleInputChange} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Input id="description" name="description" className="col-span-3"
                  value={formData.description}
                  onChange={handleInputChange} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">Image</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="col-span-3"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setFormData(prev => ({ ...prev, image: file }));
                  }}
                />

              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Select value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}>
                  <SelectTrigger id="category" className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryData.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select value={formData.stockStatus}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, stockStatus: value }))}>
                  <SelectTrigger id="status" className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsUpdateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700" type="submit">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

      </div>
      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
          <CardDescription>Manage and track your product items.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Prodcut..."
                className="pl-8"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Categories</SelectItem>

                  {categoryData.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>{cat.name }</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>{status === "all" ? "All Statuses" : status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>
          <div className="rounded-md border overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">price</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Quantity</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">description</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Action</th>

                </tr>
              </thead>
              <tbody>
                {filteredInventory.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="h-24 text-center">
                      No inventory items found.
                    </td>
                  </tr>
                ) : (
                  filteredInventory.map((item) => (
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">{item.productName}</td>
                      <td className="p-4 align-middle">{item.price}</td>
                      <td className="p-4 align-middle">{item.stockQuantity}</td>
                      <td className="p-4 align-middle">{item.category.name}</td>
                      <td className="p-4 align-middle">

                        {item.stockStatus}

                      </td>
                      <td className="p-4 align-middle">{item.description}</td>



                      <td className="p-4 align-middle">
                        <Button variant="outline" onClick={() => handleDelete(item?._id)} >
                          {/* <Filter className="h-4 w-4" /> */}
                          DELETE
                        </Button>
                        <Button variant="outline" onClick={() => handleUpdate(item?._id)} >
                          {/* <Filter className="h-4 w-4" /> */}
                          UPDATE
                        </Button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    <div className="flex justify-center items-center gap-2 mt-4">
  <Button
    variant="outline"
    onClick={handlePrevPage}
    disabled={currentPage === 1}
  >
    Prev
  </Button>

  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
    <Button
      key={pageNum}
      variant={pageNum === currentPage ? "default" : "outline"}
      onClick={() => fetchProducts(pageNum)}
    >
      {pageNum}
    </Button>
  ))}

  <Button
    variant="outline"
    onClick={handleNextPage}
    disabled={currentPage === totalPages}
  >
    Next
  </Button>
</div>


    </div>
  )
}