"use client"
import React, { useState } from 'react';
import Header from "./main-component/layout/header/header";
import Footer from "./main-component/layout/footer/footer";
import { motion } from "framer-motion";
import Modal from "@/components/Modal";
import LearnMore from "@/components/LearnMore";
import Reviews from "@/components/reviews";
import ScrollTop from "@/components/ui/scrollTop";
import SlideShow from "@/components/SlideShow"; // Import the new Carousel component
import { useRouter } from "next/navigation";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    function handleClickRegister() {
        router.push("auth/register");
    }

  return (
    <>
      <Header />
      <main className="bg-white max-h-max">
        <div>
          <section className="w-full py-8 md:py-16 lg:py-20">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                  height="550"
                  src="/assets/images/login.jpeg"
                  width="550"
                />
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Scooping Better <span className="text-primary">Deals</span> for Students
                    </h1>
                    <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                      Our student-focused food app connects you with local eateries offering exclusive discounts. Enjoy
                      delicious meals at affordable prices and build a sense of community.
                    </p>
                  </div>
                  <div className="flex flex-col gap-6 min-[400px]:flex-row">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="inline-flex mr-4 h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6c5ce7] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#6c5ce7] dark:text-gray-50 dark:hover:bg-[#6c5ce7]/90 dark:focus-visible:ring-[#6c5ce7]"
                      onClick={handleClickRegister}
                    >
                      Register
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowModal(true)}
                      className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6c5ce7] disabled:pointer-events-none disabled:opacity-50 dark:border-[#6c5ce7] dark:bg-[#1e1e1e] dark:hover:bg-[#2b2b2b] dark:hover:text-gray-50 dark:focus-visible:ring-[#6c5ce7]"
                      href="#"
                    >
                      Learn More
                    </motion.button>
                    <Modal
                      isVisible={showModal}
                      onClose={() => {
                        setShowModal(false);
                      }}
                    >
                      <LearnMore setShow={setShowModal} />
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full h-screen py-12 md:py-24 lg:py-32  items-center justify-center">
            <SlideShow />
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32  mt-6 bg-[#f8f9fa] dark:bg-[#2b2b2b]">
            <Reviews />
          </section>
        </div>
      </main>
      <ScrollTop /> {/* Ensure ScrollTop is outside of the main container */}
      <Footer />
    </>
  );
}
