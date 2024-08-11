"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import PersonalInfo from "./enter_information/page";
import RegisterForm from "./register_form/page";
import { getAuth } from "firebase/auth";
import { addStudentInformation } from "@/services/PostRequest/postRequest";

const Register = () => {
  const router = useRouter();
  const auth = getAuth();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [information, setInformation] = useState(null);
  let array = [];

  async function signUp() {
    if (userEmail && userPassword && information) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          userEmail,
          userPassword
        );
        array = information;
        const user = userCredential.user;
        array.uid = user.uid;
        await addStudentInformation(array).then(() => {
          router.push("/student");
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      {showPersonalInfo ? (
        <PersonalInfo
          setShowPersonalInfo={setShowPersonalInfo}
          setInformation={setInformation}
          email={userEmail}
          signUp={signUp}
        />
      ) : (
        <RegisterForm
          setUserEmail={setUserEmail}
          setUserPassword={setUserPassword}
          setShowPersonalInfo={setShowPersonalInfo}
        />
      )}
    </div>
  );
};

export default Register;
