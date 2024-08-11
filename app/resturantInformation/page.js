"use client";
import { useState, useEffect } from "react";
import { useUserAuth } from "@/services/utils";
import { useRouter } from "next/navigation";
import { addRestaurantInformation } from "@/services/PostRequest/postRequest";
import { formatPhoneNumber, formatPostalCode } from "@/Constant/formated";
import { getRestaurantLogos } from "@/services/GetRequest/getRequest";
import Image from "next/image";

const Page = () => {
  const { user } = useUserAuth();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [postalcoderr, setpostalcoderr] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [imageerr, setImageerr] = useState("");
  const [image, setImage] = useState([]);
  const [logo, setlogo] = useState(null);
  const [logoSelected, setLogoSelected] = useState("");

  const router = useRouter();

  const handlePostalCodeChange = (e) => {
    setPostalCode(formatPostalCode(e.target.value));
  };

  useEffect(() => {
    async function getLogos() {
      const data = await getRestaurantLogos();
      setlogo(data);
      console.log("restuarant logos: ", data);
    }
    getLogos();
  }, []);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(formatPhoneNumber(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const unformattedPostalCode = postalCode.replace(/\s/g, "");
    const unformattedPhoneNumber = phoneNumber.replace(/\D/g, "");
    setError("");
    setpostalcoderr("");
    setImageerr("");
    if (!unformattedPostalCode.match(/^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/)) {
      setpostalcoderr("Postal code not valid!");
      return;
    }
    if (!/^\d{10}$/.test(unformattedPhoneNumber)) {
      setError("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }
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

    setError("");
    setpostalcoderr("");
    addRestaurantInformation(
      user,
      name,
      address,
      unformattedPhoneNumber,
      unformattedPostalCode,
      image[0],
      logoSelected
    );
    router.push("/restraunt/inventory");
    console.log(
      name,
      address,
      unformattedPhoneNumber,
      unformattedPostalCode,
      "image name",
      image[0].name
    );
  };

  return (
    <div
      className="min-h-screen py-40"
      style={{
         backgroundImage: "url(/assets/images/salade.jpg)",
         backgroundSize: "cover",
         backgroundPosition: "center",
         backgroundRepeat: "no-repeat"
         }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-xl overflow-hidden">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: "url(/assets/images/restaurant.jpeg)" }}
          ></div>
          <div className="w-full lg:w-1/2 py-16 px-12 text-black">
            <h2 className="text-3xl mb-4 text-black">About your Restaurant</h2>
            <p className="mb-4">Please enter the restaurant details below.</p>
            <form
              className="mt-5 grid grid-cols-2 gap-4"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-400 py-1 px-2 w-full rounded-md"
              />
              <input
                type="text"
                placeholder="Location"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border border-gray-400 py-1 px-2 w-full rounded-md"
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                required
                value={phoneNumber}
                maxLength={14}
                onChange={handlePhoneNumberChange}
                className="border border-gray-400 py-1 px-2 w-full rounded-md"
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <input
                type="text"
                placeholder="Postal Code"
                required
                maxLength={7}
                value={postalCode}
                onChange={handlePostalCodeChange}
                className="border border-gray-400 py-1 px-2 w-full rounded-md"
              />
              {postalcoderr && (
                <div className="text-red-500 text-sm col-span-full">
                  {postalcoderr}
                </div>
              )}
              <p className="col-span-full">Upload Restaurant Image</p>
              <input
                type="file"
                placeholder="Upload Image"
                required
                onChange={(e) => e && setImage(Array.from(e.target.files))}
                className="border border-gray-400 py-1 px-2 w-full rounded-md col-span-full cursor-pointer"
              />
              {imageerr && (
                <div className="text-red-500 text-sm col-span-full">
                  {imageerr}
                </div>
              )}
              <p className="col-span-full">Select logo for restaurant</p>
              {logo == null ? (
                <div>Loading</div>
              ) : (
                <div
                  className="col-span-full w-full grid grid-cols-8 gap-3"
                  required
                >
                  {logo.map((url, index) => (
                    <div
                      key={index}
                      onClick={() => setLogoSelected(url)}
                      className={`p-1 cursor-pointer ${
                        logoSelected === url
                          ? "border-2 border-blue-500"
                          : "hover:border hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={url}
                        alt={`Restaurant Logo ${index + 1}`}
                        width={200}
                        height={200}
                        layout="responsive"
                      />
                    </div>
                  ))}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-yellow-500 py-3 text-center text-white mt-3 rounded-md col-span-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
