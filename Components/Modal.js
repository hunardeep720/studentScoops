import React from "react";
import {motion, AnimatePresence} from "framer-motion";



function Modal({isVisible,onClose, children}) {

    const backdrop ={
        visible:{opacity:1},
        hidden:{opacity:0}
    }
    const handleClose = (e) => {
        if (e.target.id === "wrapper") {
            onClose();
        }
    }
    if (!isVisible) return null;
  return (
    <AnimatePresence>
    <motion.div  className="backdrop"
    variants={backdrop}
    initial="hidden"
    animate="visible"
    exit="hidden"
    >
    <div className="fixed inset-0 bg-black/45 backdrop-blur flex justify-center items-center" id="wrapper" onClick={handleClose}>
      <div className="w-[600px] flex flex-col mx-4">
        <button onClick={()=>{onClose()}} className="text-white text-xl place-self-end">X</button>
        <div className="bg-white p-2 rounded text-black" >{children}</div>
      </div>
    </div>
    </motion.div>
    </AnimatePresence>
  );
}

export default Modal;
