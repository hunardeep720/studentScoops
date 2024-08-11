"use client";
import { useState } from "react";
import { useUserAuth } from "@/services/utils";
import { useRouter } from "next/navigation";
import { addRestaurantMenu } from "@/services/PostRequest/postRequest";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";

const Page = () => {
  const { user } = useUserAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageerr, setImageerr] = useState("");
  const [image, setImage] = useState([]);
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async () => {
    if (quantity < 1 || quantity > 50) {
      return;
    }
    if (price < 0) {
      return;
    }
    if (!image || image.length === 0) {
      setImageerr("Please upload an image.");
      return;
    }
    setImageerr("");
    if (
      !image[0].name.endsWith(".jpg") &&
      !image[0].name.endsWith(".jpeg") &&
      !image[0].name.endsWith(".png")
    ) {
      setImageerr(
        "Please ensure you upload a valid image format, such as JPEG, JPG, or PNG."
      );
      return;
    }
    await addRestaurantMenu(
      user,
      name,
      price,
      description,
      image[0],
      quantity
    ).then(() => {
      router.push("/restraunt/home");
    });
  };

  return (
    <section className="w-full py-5 md:py-10">
      <div className="container px-4 md:px-6 max-w-2xl mx-auto">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              Add Menu Item
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Fill out the form below to add a new item to your menu.
            </p>
          </div>
          <Card onSubmit={handleSubmit}>
            <CardContent className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter item name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  required
                  value={quantity}
                  max={50}
                  min={1}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <p className="talic text-red-400 text-sm">
                  Quantity must be between 1 and 49, inclusive.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter item description"
                  className="min-h-[100px]"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  required
                  onChange={(e) => e && setImage(Array.from(e.target.files))}
                />
              </div>
              {imageerr && (
                <div className="text-red-500 text-sm col-span-full">
                  {imageerr}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} className="ml-auto bg-primary">
                Add Item
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Page;
