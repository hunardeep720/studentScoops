"use client"; // Indicates that this component uses client-side features like hooks or context

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import Map from "../map/page"; // Adjust the import path based on your file structure
import Link from "next/link";
import { useAddress } from "@/services/address-context";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/Components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/Components/ui/select";
import {
  getStudentDataByStudents,
  getStudentMenuByStudents,
  getRestaurantDataForCheckoutByStudents,
} from "@/services/GetRequest/getRequest";
import { useUserAuth } from "@/services/utils";
import {
  deleteFoodFromCart,
  placeOrderByStudent,
} from "@/services/PostRequest/postRequest";
import { HiBuildingStorefront } from "react-icons/hi2";

// Main functional component
export default function Component() {
  //only for checking the availability of the items
  const [notAvailable, setNotAvailable] = useState(false);
  const [notAvailableError, setNotAvailableError] = useState("");
  const [notAvailableCount, setNotAvailableCount] = useState(null);

  const { user } = useUserAuth();
  // State to manage the visibility of the cart summary
  const { address, setAddress } = useAddress();
  const router = useRouter();

  const [isCartSummaryOpen, setIsCartSummaryOpen] = useState(false);
  // State to manage the estimated time for pickup
  const [estimatedTime, setEstimatedTime] = useState("");
  const [cartItems, setCartItems] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [taxAmmount, setTaxAmmount] = useState(0);
  const [totalAmmount, setTotalAmmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [formData, setFormData] = useState({ number: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = formatCreditCardNumber(value);
    setFormData({ ...formData, [name]: formattedValue });
  };

  const formatCreditCardNumber = (value) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, "");
    // Add spaces after every 4 digits
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(" ") : "";
  };

  const handleBackToMenu = () => {
    router.push("/student/main");
  };

  // Sample data for the restaurant and addresses

  const [studentAddress, setStudentAddress] = useState("");

  //fetching student data from database
  function fetchStudentData() {
    getStudentDataByStudents((data) => {
      setStudentData(data);
    }, user);
  }

  //fetching student menu data from student database
  function fetchCheckoutStudentData() {
    getStudentMenuByStudents((data) => {
      setCartItems(data);
    }, studentData[0].id);
  }

  //fetching restaurant data from database
  function fetchRestaurantData() {
    getRestaurantDataForCheckoutByStudents((data) => {
      setRestaurantInfo(data);
      console.log(data);
    }, cartItems[0].restaurantUid);
  }

  useEffect(() => {
    if (studentData && studentData != null && studentData.length > 0) {
      fetchCheckoutStudentData();
      setStudentAddress(studentData[0].address);
    }
  }, [studentData]);

  useEffect(() => {
    if (cartItems && cartItems != null && cartItems.length > 0) {
      setNotAvailableCount(cartItems.filter((item) => item.status == false));
      fetchRestaurantData();
      setTaxAmmount(
        parseFloat(
          (
            cartItems.reduce(
              (total, item) => total + parseFloat(item.price),
              0
            ) * 0.05
          ).toFixed(2)
        )
      );
      setSubTotal(
        cartItems.reduce((total, item) => total + parseFloat(item.price), 0)
      );
      setTotalAmmount(
        cartItems.reduce((total, item) => total + parseFloat(item.price), 0) +
          cartItems.reduce((total, item) => total + parseFloat(item.price), 0) *
            0.05
      );
    }
  }, [cartItems]);

  useEffect(() => {
    if (notAvailableCount && notAvailableCount !== null) {
      if (notAvailableCount.length > 0) {
        setNotAvailable(true);
        setNotAvailableError(
          `The following items are not available: ${notAvailableCount
            .map((item) => item.name)
            .join(", ")}. Please remove them from your cart to proceed.`
        );
      }
    }
  }, [notAvailableCount]);

  useEffect(() => {
    if (user) {
      fetchStudentData();
    }
    if (user == false) {
      router.push("/");
    }
  }, [user]);

  // to route page to update profile
  const handleUpdateProfile = () => {
    router.push("/student/main/myprofile");
  };

  // Function to handle changes in the estimated time for pickup
  const handleEstimatedTimeChange = (time) => {
    setEstimatedTime(time);
  };

  // const and variable for the payment
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const clickCheckout = () => {
    //function to elavate the trasaction

    //after transaction is done
    if (notAvailable) {
      alert("Please remove the items which are not available");
      return;
    } else if (cartItems && cartItems != null && cartItems.length > 0) {
      //random order id
      const orderId = Math.floor(1000 + Math.random() * 9000);

      cartItems.map(async (item) => {
        await placeOrderByStudent(
          item.restaurantDocId,
          item.menuDocId,
          studentData[0].id,
          item.id,
          studentData[0].uid,
          item.customerId,
          studentData[0].name,
          studentData[0].lastName,
          orderId
        );
      });

      router.push("/student/main/confirmationPage");
    }
  };

  async function handleRemoveItem(id) {
    await deleteFoodFromCart(studentData[0].id, id).then(() => {
      alert("Item removed from cart");
    });
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 w-full h-screen bg-gray-100">
      {/* Section for pickup details */}
      <div className="flex-1 space-y-6">
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Pickup Details</CardTitle>
          </CardHeader>
          {studentAddress &&
          studentAddress.length > 0 &&
          restaurantInfo &&
          restaurantInfo.length > 0 ? (
            <CardContent className="space-y-4">
              {/* Map component to show the restaurant and student addresses */}
              <div className="w-full h-64 bg-gray-200 rounded-md">
                <Map
                  restaurantAddress={`${restaurantInfo[0].address}, calgary`}
                  studentAddress={studentAddress}
                  onEstimatedTimeChange={handleEstimatedTimeChange}
                />
              </div>
              {/* Display estimated time to reach */}
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Estimated Time to Reach:
                  </p>
                  <p className="font-semibold">
                    {estimatedTime ? `${estimatedTime}` : "Calculating..."}
                  </p>
                </div>
                {/* Button to navigate to Google Maps */}
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${restaurantInfo[0].address}`}
                  target="_blank"
                  className="w-full"
                >
                  <Button className="w-full bg-primary">
                    Navigate to Google Maps
                  </Button>
                </Link>
              </div>
              <div className="flex items-center text-3xl border-2 shadow-xl rounded-lg space-x-3 p-2">
                <div className="flex items-center space-x-3 flex-1">
                  <Avatar className="border-2 shadow-md w-20 h-30">
                    <AvatarImage src={restaurantInfo[0].imageUrl} />
                    <AvatarFallback>PC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">{restaurantInfo[0].name}</p>
                    <p className="text-sm text-muted-foreground">
                      {restaurantInfo[0].address}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mr-10 text-bold text-4xl">
                  <HiBuildingStorefront />
                </div>
              </div>
            </CardContent>
          ) : (
            <div className="w-full h-full grid items-center gap-4">
              <p className="text-3xl font-bold ">
                Please firstly update your profile for getting map functionality
              </p>
              <p>Click given Button to update you personal information</p>
              <Button
                className="bg-primary p-4 font-bold text-center cursor-pointer"
                onClick={() => handleUpdateProfile()}
              >
                Update Profile
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Section for cart summary and payment details */}
      <div className="w-full md:w-96 space-y-6">
        {/* Card displaying restaurant avatar and address */}
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <CreditCardIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="font-semibold text-2xl">Payment</p>
              <div className="flex justify-center items-center">
                <p className="text-sm text-muted-foreground">
                  Add Payment Method
                </p>
              </div>
            </div>
          </div>
          {/* Button to proceed to the payment page */}
          <Button
            className="w-full mt-4 bg-primary"
            onClick={() => setIsDialogOpen(true)}
          >
            Continue to payment
          </Button>
          <div className="flex flex-col items-center justify-center bg-muted/40">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Complete Your Order</DialogTitle>
                  <DialogDescription>
                    Choose your preferred payment method to finalize your order.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={handlePaymentMethodChange}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="card"
                        id="card"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="card"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <CreditCardIcon className="mb-3 h-6 w-6" />
                        Card
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="paypal"
                        id="paypal"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="paypal"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <WalletCardsIcon className="mb-3 h-6 w-6" />
                        PayPal
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="cash"
                        id="cash"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="cash"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <DollarSignIcon className="mb-3 h-6 w-6" />
                        Cash
                      </Label>
                    </div>
                  </RadioGroup>
                  {paymentMethod === "card" && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="First Last"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="number">Card number</label>
                        <input
                          id="number"
                          name="number"
                          placeholder="1234 5678 9012 3456"
                          value={formData.number}
                          onChange={handleInputChange}
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="month">Expires</Label>
                          <Select
                            value={formData.month}
                            onValueChange={(value) =>
                              setFormData((prevFormData) => ({
                                ...prevFormData,
                                month: value,
                              }))
                            }
                          >
                            <SelectTrigger id="month">
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">January</SelectItem>
                              <SelectItem value="2">February</SelectItem>
                              <SelectItem value="3">March</SelectItem>
                              <SelectItem value="4">April</SelectItem>
                              <SelectItem value="5">May</SelectItem>
                              <SelectItem value="6">June</SelectItem>
                              <SelectItem value="7">July</SelectItem>
                              <SelectItem value="8">August</SelectItem>
                              <SelectItem value="9">September</SelectItem>
                              <SelectItem value="10">October</SelectItem>
                              <SelectItem value="11">November</SelectItem>
                              <SelectItem value="12">December</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="year">Year</Label>
                          <Select
                            value={formData.year}
                            onValueChange={(value) =>
                              setFormData((prevFormData) => ({
                                ...prevFormData,
                                year: value,
                              }))
                            }
                          >
                            <SelectTrigger id="year">
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2024">2024</SelectItem>
                              <SelectItem value="2025">2025</SelectItem>
                              <SelectItem value="2026">2026</SelectItem>
                              <SelectItem value="2027">2027</SelectItem>
                              <SelectItem value="2028">2028</SelectItem>
                              <SelectItem value="2029">2029</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input
                            id="cvc"
                            name="cvc"
                            placeholder="CVC"
                            value={formData.cvc}
                            onChange={handleInputChange}
                            maxLength={3}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {paymentMethod === "paypal" && (
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                  {paymentMethod === "cash" && (
                    <div className="grid gap-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button onClick={clickCheckout} className="w-full bg-primary">
                    Continue
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Button onClick={handleBackToMenu} className="w-full mt-4 bg-primary">
            Back to Menu
          </Button>
        </Card>

        {/* Card for displaying the cart summary */}
        {cartItems && cartItems != null ? (
          <>
            <Card className="p-6">
              <div className={notAvailable ? "italic py-2" : "hidden"}>
                {notAvailableError}
              </div>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsCartSummaryOpen(!isCartSummaryOpen)}
              >
                <p className="font-semibold">
                  Cart summary ({cartItems.length} items)
                </p>
                <ChevronDownIcon
                  className={`w-6 h-6 text-muted-foreground transition-transform  text-primary cursor-pointer ${
                    isCartSummaryOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {/* Conditional rendering of cart items based on `isCartSummaryOpen` */}
              {isCartSummaryOpen && (
                <div className="mt-4 space-y-4">
                  {cartItems.map((item) => (
                    <>
                      <div
                        className={
                          item.status
                            ? "hidden"
                            : "flex justify-start items-end m-3 text-black text-xl font-bold z-20"
                        }
                      >
                        <p>Sold</p>
                      </div>
                      <div
                        key={item.id}
                        className={
                          item.status
                            ? "flex items-center gap-4 bg-muted p-4 rounded-md"
                            : "flex items-center gap-4 bg-muted p-4 rounded-md opacity-40 z-0"
                        }
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="rounded-md"
                        />
                        <div className="flex-1">
                          <p className="font-semibold">{item.name}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            ${item.price}
                          </p>
                        </div>
                        {/* Button to remove item from cart */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <TrashIcon className="w-4 h-4 text-primary" />
                        </Button>
                      </div>
                    </>
                  ))}
                </div>
              )}
            </Card>

            {/* Card displaying the order total */}
            <Card className="p-6 rounded-lg shadow-lg">
              <div className="space-y-4">
                <p className="font-semibold text-lg">Order Total</p>
                <div className="border-black-solid border-b-4">
                  <div className="flex justify-between">
                    <p className="text-sm">Subtotal</p>
                    <p className="font-medium">${subTotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">Taxes</p>
                    <p className="font-medium">${taxAmmount.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <p>Total</p>
                  <p>${totalAmmount.toFixed(2)}</p>
                </div>
              </div>
            </Card>
          </>
        ) : (
          <div className="w-full flex justify-center items-center">
            <p className="text-3xl font-bold animate-pulse">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Trash Icon component
function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

// Home Icon component
function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

// Chevron Down Icon component
function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function WalletCardsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
      <path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
