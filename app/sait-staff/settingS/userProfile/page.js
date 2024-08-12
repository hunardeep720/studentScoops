/**
 * v0 by Vercel.
 * @see https://v0.dev/t/SnDrbEvPfnn
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { formatPhoneNumber } from "@/Constant/formated";
import { db } from "@/app/firebase/config";
import { updateDoc, doc } from "firebase/firestore";
import { CgArrowsExchange } from "react-icons/cg";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
  listAll,
  deleteObject,
} from "firebase/storage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineRemove } from "react-icons/md";

export default function UserProfile(data, getUserData) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const fileInpt = useRef(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (data && data[0]) {
      setName(data[0].name);
      setEmail(data[0].email);
      setPhoneNumber(data[0].phoneNumber);
      setAddress(data[0].address);
      setRole(data[0].role);
      setImageUrl(data[0].imageUrl);
      setUploading(false);
    }
  }, [data]);

  useEffect(() => {
    if (!data[0].imageUrl || data[0].imageUrl === null) {
      setImageUrl("/assets/images/UserDefaultSaitStaff.png");
    } else {
      setImageUrl(data[0].imageUrl);
    }
  }, [imageUrl]);

  const handleDivClick = () => {
    fileInpt.current.click();
  };

  async function uploadImage(image) {
    try {
      const storage = getStorage();
      const folderRef = ref(storage, `Saitstaff/${data[0].uid}`);

      const deleteFolder = async (folderRef) => {
        const res = await listAll(folderRef);
        for (const itemRef of res.items) {
          await deleteObject(itemRef);
        }

        for (const subfolderRef of res.prefixes) {
          await deleteFolder(subfolderRef);
        }
      };

      await deleteFolder(folderRef).then(() => {
        const storageRef = ref(
          storage,
          `Saitstaff/${data[0].uid}/${image.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const fileProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${fileProgress}% done`);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.error("Upload failed", error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            try {
              // Query to find the restaurant document with the matching userId
              const docRef = doc(db, "saitStaff", data[0].id);
              await updateDoc(docRef, {
                imageUrl: downloadURL,
              }).then(() => {
                alert("Image uploaded successfully");
                getUserData();
              });
            } catch (error) {
              console.error("Error writing document: ", error);
            }
          }
        );
      });
    } catch (err) {
      (error) => {
        console.error("Upload failed", error);
      };
    }
  }

  async function removeImage() {
    try {
      const storage = getStorage();
      const folderRef = ref(storage, `Saitstaff/${data[0].uid}`);

      const deleteFolder = async (folderRef) => {
        const res = await listAll(folderRef);
        for (const itemRef of res.items) {
          await deleteObject(itemRef);
        }

        for (const subfolderRef of res.prefixes) {
          await deleteFolder(subfolderRef);
        }
      };

      await deleteFolder(folderRef).then(async () => {
        try {
          // Query to find the restaurant document with the matching userId
          const docRef = doc(db, "saitStaff", data[0].id);
          await updateDoc(docRef, {
            imageUrl: null,
          }).then(() => {
            alert("Image uploaded successfully");
            getUserData();
          });
        } catch (error) {
          console.error("Error writing document: ", error);
        }
      });
    } catch (err) {
      (error) => {
        console.error("Upload failed", error);
      };
    }
  }

  const validExtensions = [
    ".png",
    ".jpeg",
    ".jpg",
    ".gif",
    ".bmp",
    ".tiff",
    ".tif",
    ".svg",
    ".webp",
    ".ico",
    ".heif",
    ".heic",
    ".raw",
  ];
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (
        validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
      ) {
        setUploading(true);
        uploadImage(file);
      } else {
        console.log("Invalid file format");
      }
    } else {
      return;
    }
  };

  async function updateProfile(e) {
    e.preventDefault();
    try {
      const docRef = doc(db, "saitStaff", data[0].id);
      await updateDoc(docRef, {
        name: name,
        phoneNumber: phoneNumber,
        address: address,
      }).then(() => {
        alert("Profile updated successfully");
        getUserData();
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    // Changes to be made here
    <>
      {data && data[0] ? (
        <div className="mx-full max-w-md">
          <div className="mx-auto grid items-center justify-center w-[200%]">
            <div
              className="mx-auto rounded-full bg-cover bg-center w-96 h-96 cursor-pointer relative"
              style={{ backgroundImage: `url(${imageUrl})` }}
            >
              <div className="h-full w-full">
                <div className={uploading ? "animate-spin" : null}>
                  <input
                    type="file"
                    ref={fileInpt}
                    onChange={(e) => handleFileChange(e)}
                    className="hidden"
                  />
                  <div
                    className={
                      uploading
                        ? "group rounded-full w-96 h-96 hover:bg-black/30 bg-black/50 grid items-center justify-center text-center cursor-pointer"
                        : "group rounded-full w-96 h-96 hover:bg-black/30 grid items-center justify-center text-center cursor-pointer"
                    }
                  >
                    {uploading ? (
                      <AiOutlineLoading3Quarters className="group-hover:block text-8xl z-20 text-white" />
                    ) : (
                      <div className="flex">
                        <CgArrowsExchange
                          onClick={handleDivClick}
                          className="hidden group-hover:block text-8xl z-20 text-white"
                        />
                        <MdOutlineRemove
                          onClick={() => {
                            setUploading(true);
                            removeImage();
                          }}
                          className="hidden group-hover:block text-8xl z-20 text-white"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold mx-auto my-10">{data[0].name}</h1>
          </div>
          <Card className="w-[200%]">
            <CardContent className="grid grid-cols-2 gap-5 mt-6">
              <div className="space-y-2">
                <Label htmlFor="password">Name</Label>
                <div className="relative">
                  <Input
                    id="password"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    value={email}
                    readOnly={true}
                    className="cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <div className="relative">
                  <Input
                    id="phoneNumber"
                    maxLength={14}
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(formatPhoneNumber(e.target.value));
                    }}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <div className="relative">
                  <Input
                    id="role"
                    value={role}
                    readOnly={true}
                    className="cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="space-y-2 col-span-full">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-green-600"
                onClick={(e) => {
                  updateProfile(e);
                }}
              >
                Update Profile
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center text-3xl font-bold animate-pulse">
          {" "}
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

function EyeOffIcon(props) {
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
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}
