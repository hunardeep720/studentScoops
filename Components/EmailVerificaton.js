import Link from "next/link";
import { useUserAuth } from "@/services/utils";
import { useEffect } from "react";
import { auth } from "@/app/firebase/config";
import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";


export const EmailVerification = () => {
  const admin = require("firebase-admin");
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });

  const {user, verified } = useUserAuth();
  useEffect(() => {
    admin.auth().updateUser(uid, {
      emailVerified: true
    })
    .then((userRecord) => {
      console.log('Successfully updated user', userRecord.toJSON());
    })
    .catch((error) => {
      console.log('Error updating user:', error);
    });
    console.log("email verified? ", verified);
  }, []);

  return (
    <div
      className="min-h-screen py-40"
      style={{ backgroundImage: "linear-gradient(115deg, #dfc42f, #faf7df)" }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-xl overflow-hidden">
          <div
            className="w-full flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: "url(/assets/images/emailconfirmed.jpg)",
            }}
          ></div>
          <div>
            <Link href="/auth/register/enter_information">Continue</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
