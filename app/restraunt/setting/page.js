"use client";
import { useState, useEffect } from "react";
import { auth } from "@/app/firebase/config";
import { useUserAuth } from "@/services/utils";
import { useRouter } from "next/navigation";
import { getRestaurantInformationByUser } from "@/services/GetRequest/getRequest";
import { sendPasswordResetEmail } from "firebase/auth";
import { updateRestaurantData, deleteRestaurantUser } from "@/services/PostRequest/postRequest";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Component() {
  const { user } = useUserAuth();
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const route = useRouter();
  useEffect(() => {
    async function gettingUserInformation() {
      const data = await getRestaurantInformationByUser(user);
      setUserData(data);
    }
    if (user) {
      setCurrentUser(auth.currentUser);
      gettingUserInformation();
    }
    if (user == false) {
      route.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (userData) {
      userData.map((information)=>{
        setName(information.name);
        setId(information.id);
        setAddress(information.address);
        setEmail(information.email);
      })
    }
  }, [userData]);

  async function handleUpdateRestaurantData(){
    await updateRestaurantData(id,name,address).then(()=>alert("Update completed!"))
  }


  async function deleteCurrentUser() {
    await deleteRestaurantUser(currentUser,id,user);
  }

  async function passwordChange(){
    await sendPasswordResetEmail(auth,email).then(()=>alert("Email sent successfully"))
  }

  return (
    <div className="container mx-auto ">
      <h1 className="text-3xl font-bold mb-8">Restaurant Settings</h1>
      {userData ? (
        <>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Restaurant Details</CardTitle>
              <CardDescription>
                Update your restaurant name and location.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Restaurant Name</Label>
                  <Input id="name" defaultValue={name} onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    defaultValue={address}
                    onChange={(e)=>{setAddress(e.target.value)}}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUpdateRestaurantData}>Save Changes</Button>
            </CardFooter>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <p>We will send a link to the provided email address to change your password.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={passwordChange}>Send Email</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Delete Account</CardTitle>
              <CardDescription>
                Permanently delete your restaurant account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                This action cannot be undone. Your account and all associated
                data will be permanently removed from our servers.
              </p>
            </CardContent>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. Your account and all
                      associated data will be permanently removed from our
                      servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteCurrentUser()}>
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
          <Dialog open={showPasswordResetModal}>
            <DialogContent className="sm:max-w-[425px]">
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <CircleCheckIcon className="size-12 text-green-500" />
                <p className="text-lg font-medium">Password reset completed!</p>
              </div>
              <DialogFooter>
                <div>
                  <Button
                    type="button"
                    onClick={() => (window.location.href = "/")}
                  >
                    OK
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <div className="w-full text-center grid items-center h-screen">
          <p className="text-3xl font-bold animate-pulse">Loading...</p>
        </div>
      )}
    </div>
  );
}

function CircleCheckIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function EyeIcon(props) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
