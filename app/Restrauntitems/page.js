/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9sbb0u4VRKU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState, useEffect } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import CartDropdown from "./checkoutCart/page";

export default function RestaurantItems() {
  const menu = [
    {
      section: "Appetizers",
      items: [
        {
          id: "1",
          name: "Bruschetta",
          description: "Toasted bread topped with tomatoes, garlic, and basil",
          price: 7.99,
          image: "https://i.pinimg.com/564x/55/02/f2/5502f20d18006dec855f986e5344951c.jpg",
        },
        {
          id: "2",
          name: "Calamari Fritti",
          description: "Crispy fried calamari with lemon and marinara sauce",
          price: 10.99,
          image: "https://i.pinimg.com/564x/40/b0/d6/40b0d6f85533fd94da7c4febbd5ff4d7.jpg",
        },
        {
          id: "3",
          name: "Meatballs",
          description: "House-made meatballs in a rich tomato sauce",
          price: 8.99,
          image: "https://i.pinimg.com/564x/fb/72/9a/fb729a2cda70abf872480db60eead4d8.jpg",
        },
      ],
    },
    {
      section: "Entrees",
      items: [
        {
          id: "4",
          name: "Chicken Parmesan",
          description: "Breaded chicken breast topped with mozzarella and marinara",
          price: 18.99,
          image: "https://i.pinimg.com/564x/e5/a6/7e/e5a67ebddade4ecfcaefdba789f27209.jpg",
        },
        {
          id: "5",
          name: "Fettuccine Alfredo",
          description: "Fettuccine pasta in a creamy Parmesan sauce",
          price: 16.99,
          image: "https://i.pinimg.com/564x/13/21/7a/13217abce651e33dc2c72a22554de8c9.jpg",
        },
        {
          id: "6",
          name: "Grilled Salmon",
          description: "Fresh salmon fillet grilled and served with lemon dill sauce",
          price: 22.99,
          image: "https://i.pinimg.com/564x/60/d2/4c/60d24c272f386b44a8c23a706f7d52d3.jpg",
        },
      ],
    },
    {
      section: "Desserts",
      items: [
        {
          id: "7",
          name: "Tiramisu",
          description: "Classic Italian dessert with ladyfingers, mascarpone, and espresso",
          price: 8.99,
          image: "https://i.pinimg.com/564x/f5/01/11/f501114356e36d6c7453ddfa7d07f840.jpg",
        },
        {
          id: "8",
          name: "Cannoli",
          description: "Crispy fried pastry shells filled with sweetened ricotta",
          price: 6.99,
          image: "https://i.pinimg.com/564x/2b/46/91/2b469184ae73f53ddd84f81fc8e5eb21.jpg",
        },
        {
          id: "9",
          name: "Gelato",
          description: "Homemade Italian-style ice cream in various flavors",
          price: 5.99,
          image: "https://i.pinimg.com/564x/d4/bd/17/d4bd172915c4b7b03fd7cbed6094b8ed.jpg",
        },
      ],
    },
  ]
  const [cart, setCart] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState(null);
  const [cartCounter, setCartCounter] = useState(0);

  useEffect(() => {
    if (recentlyAdded) {
      const timeout = setTimeout(() => {
        setRecentlyAdded(null);
      }, 3000); // Adjust the timeout duration as needed (e.g., 3000 milliseconds)
      return () => clearTimeout(timeout);
    }
  }, [recentlyAdded]);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // Item already exists in cart, increment quantity
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );setCart(updatedCart);
      setCartCounter(cartCounter + 1);
    } 
      
      else {
      // Item doesn't exist in cart, add it with quantity 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    setRecentlyAdded(item);
    setCartCounter(cartCounter + 1);
  };;

  const removeFromCart = (itemId, quantity = 1) => {
    const existingItem = cart.find((item) => item.id === itemId);
    if (existingItem) {
      if (existingItem.quantity <= quantity) {
        setCart(cart.filter((item) => item.id!== itemId));
      } else {
        setCart(
          cart.map((item) =>
            item.id === itemId? {...item, quantity: item.quantity - quantity } : item
          )
        );
      }
    }
    setCartCounter(cartCounter - 1);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row w-full h-full">
        <div className="flex-1 p-6 md:p-12 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <Link href="/student">
              <Button>Back</Button>
            </Link>
            <h1 className="text-4xl font-bold">Ristorante Italiano</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <StarIcon className="w-5 h-5 fill-primary" />
                <span className="font-bold">4.8</span>
                <span className="text-gray-500">(1,234 reviews)</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPinIcon className="w-5 h-5" />
                <span className="text-gray-500">1.2 mi</span>
              </div>
              <CartDropdown cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} getTotal={getTotal}  />
            </div>
          </div>
          {menu.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{section.section}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-white border border-yellow-700 rounded-lg shadow-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
                        <Button variant="outline" onClick={() => addToCart({ ...item, quantity: 1 })}>
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
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
      <path d="M3 6h18M5 6v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6M10 11v6M14 11v6" />
    </svg>
  );
}
// Finding similar prop function for the trashicon



function MapPinIcon(props) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}



function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
