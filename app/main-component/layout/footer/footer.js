import React, {useState, useEffect} from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa6';
import Link from "next/link";
import Modal from '@/components/Modal'
import Privacy from '@/components/privacy';

const Footer = () => {

  
    const [year, setYear] = useState(new Date().getFullYear());
    const [showModal, setShowModal] = useState(false);
  
    useEffect(() => {
      setYear(new Date().getFullYear());
    }, []);

  return (
    <div className='pt-[5rem] pb-[3rem] bg-primary'>
      <div className='w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
          gap-[2rem] items-start pb-[2rem] border-b-2 border-white border-opacity-10'>
        {/* footer section 1*/}
        <div>
          <h1 className='text-[24px] text-white mb-[1rem] font-bold uppercase'> STUDENT SCOOPS </h1>
          <p className=' text-[14px] text-white text-opacity-70' >
        Initiative aims to address the challenges faced by students with low income by providing them access to discounted food and grocery items.
          </p>
          {/* social media icons*/}
          <div className='flex items-center space-x-3 mt-[1.5rem]'>
            <div className='w-[2.4rem] h-[2.4rem] bg-blue-600 rounded-full flex items-center
              justify-center flex-col'>
              <FaFacebook className='text-white' />
            </div>
            <div className='w-[2.4rem] h-[2.4rem] bg-sky-400 rounded-full flex items-center
               justify-center flex-col'>
              <FaTwitter className='text-white' />
            </div>
            <div className='w-[2.4rem] h-[2.4rem] bg-red-600 rounded-full flex items-center
               justify-center flex-col'>
              <FaYoutube className='text-white' />
            </div>
            <div className='w-[2.4rem] h-[2.4rem] bg-red-400 rounded-full flex items-center
              justify-center flex-col'>
              <FaInstagram className='text-white' />
            </div>
          </div>
        </div>
        {/* 2nd part of footer*/}
        <div>
          <h1 className=' text-[22px] w-fit text-white font-semibold mb-[1.5rem]' >About US</h1>
          <Link href="https://www.enactussait.org/" legacyBehavior>
            <a target='_blank' rel="noopener noreferrer">
            <p className=' text-[15px] text-white w-fit hover:text-black cursor-pointer text-opacity-80 mb-[0.7rem] ' >Enactus</p>
            </a>
            </Link>
          <p onClick={() => setShowModal(true)}  className=' text-[15px] text-white w-fit hover:text-black cursor-pointer text-opacity-80 mb-[0.7rem] ' >Privacy And Policy</p>
        </div>
                   <Modal
                      isVisible={showModal}
                      onClose={() => {
                        setShowModal(false);
                      }}
                    >
                      <Privacy setShow={setShowModal} />
                    </Modal>

        {/* 3nd part of footer*/}
        <div>
          <h1 className=' text-[22px] w-fit text-white font-semibold mb-[1.5rem]' >Quick Links</h1>
          <Link href="https://www.sait.ca/" legacyBehavior>
            <a target='_blank' rel="noopener noreferrer">
              <p className=' text-[15px] text-white w-fit hover:text-black cursor-pointer text-opacity-80 mb-[0.7rem] ' >SAIT Website</p>
            </a>
          </Link>
          
        </div>
        {/* 4th part of footer*/}
        <div>
          <h1 className=' text-[22px] w-fit text-white font-semibold mb-[1.5rem]' >Get In Touch </h1>

          <p className=' text-[15px] text-white w-fit hover:text-black cursor-pointer text-opacity-80 mb-[0.7rem] ' >+0123456789</p>
          <p className=' text-[15px] text-white w-fit hover:text-black cursor-pointer text-opacity-80 mb-[0.7rem] ' >Example@example.com</p>
          <p className=' text-[15px] text-white w-fit hover:text-black cursor-pointer text-opacity-80 mb-[0.7rem] ' >📍 1301 16 Ave NW,<br></br> Calgary, AB T2M 0L4</p>
        </div>
      </div>
      <h1 className=' mt-[2rem] text-[14px] w-[80%] mx-auto text-white opacity-80'>COPYRIGHT BY STUDENT SCOOPS <span id="year">{year}</span></h1>
    </div>
  )
}

export default Footer
