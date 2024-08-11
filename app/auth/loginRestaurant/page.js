"use client";
import { Fragment, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import Modal from "@/Components/Modal";
import { BiSolidCommentError } from "react-icons/bi";
import { getRestaurantDataForLogin } from "@/services/GetRequest/getRequest";
import Loading from "@/app/loading";
import ContactUs from "@/Components/ContactUs";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential) {
          const user = userCredential.user;
          console.log("user: ", user);
          return user.uid;
        }
      })
      .then(async (uid) => {
        console.log("uid: ", uid);
        if (!uid) {
          setLoginError("Please try again");
          setLoading(false);
          return;
        }
        const login = await getRestaurantDataForLogin(uid);
        console.log("login: ", login);
        if (login.length <= 0) {
          setLoginError("You are not authorized to access this website.");
          return;
        }
        sessionStorage.setItem("user", true);
        router.push("/restraunt");
        setLoginError("");
        setEmail("");
        setPassword("");
        //setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setLoginError("Invalid email or password");
        console.log(err);
      });
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();

    // Check the email domain format
    if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid email address");
      return;
    } else {
      setEmailError(""); // Clear any previous error
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Email sent.
        setShowModal(false);
        router.push("sign-in/afterResetPassword");
      })
      .catch((err) => {
        console.log(err);
        setEmailError("Failed to send password reset email"); // Display a generic error message
      });
  };

  if (loading) {
    return <Loading />; // Render the Loading component when loading
  }

  return (
    <div
      className="min-h-screen py-40"
      style={{
        backgroundImage: "url(/assets/images/restCover.jpg)",
        backgroundSize: "cover", // Adjusts the size of the background image
        backgroundPosition: "center", // Centers the background image
        backgroundRepeat: "no-repeat", // Prevents the background image from repeating
      }}
    >
      <Fragment>
        <div className=" mx-auto absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-7/12 bg-white rounded-xl mx-auto shadow-xl overflow-hidden">
            <div
              className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: "url(/assets/images/restLogin.jpg)" }}
            ></div>
            <div className="w-full lg:w-1/2 py-16 px-12 text-black">
              <h2 className="text-3xl mb-4 text-black">Login</h2>
              <p className="mb-4">Welcome back!</p>
              <div className="mt-5">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-400 py-1 px-2 w-full rounded-md"
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-400 py-1 px-2 w-full rounded-md"
                />
              </div>
              <div>
                {loginError && (
                  <div className="text-red-500 text-sm mb-4 flex">
                    <BiSolidCommentError className="mt-1 mr-2" />
                    {loginError}
                  </div>
                )}
              </div>
              <div className="mt-5">
                <p
                  className="text-yellow-500 cursor-pointer"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Forget Password?
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleSignIn}
                  className="w-full bg-yellow-500 py-3 text-center text-white mt-3 rounded-md"
                >
                  Sign In
                </button>
                <div className="mt-3">
                  <span className="flex text-black">
                    <p>You Have an issue to Sign In?</p>
                    <button
                      onClick={() => {
                        setShowModal(true);
                      }}
                      className="text-yellow-500 font-semibold ml-2"
                    >
                      Contact Us
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isVisible={showModal}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <div>
            <p className="text-3xl mb-4 text-black">Reset Password🔒</p>
            <p className="py-3">
              We will send you an email with instructions on how to reset your
              password.
            </p>
            <div>
              <form onSubmit={handleForgotPassword}>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-gray-400 py-1 px-2 w-full rounded-md"
                  />
                  {emailError && (
                    <div className="text-red-500 text-sm mb-4 flex">
                      <BiSolidCommentError className="mt-1 mr-2" />
                      {emailError}
                    </div>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 py-3 text-center text-white mt-3 rounded-md"
                  >
                    Email Me
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <ContactUs setShow={() => setShowModal(false)} />
        </Modal>
      </Fragment>
    </div>
  );
};

export default SignIn;