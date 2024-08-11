import { useEffect, useState } from "react";

const UserGreeting = ({ setActiveTab, data }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    if(data){
       if(data.length > 0) {
      setUserName(data[0].name);
      setEmail(data[0].email);
      setUserImage(data[0].imageUrl);
    }
    }
   
  }, [data]);

  return (
    <div
      className="inline-flex items-center ml-5 rounded-full cursor-pointer z-0 "
      onClick={() => {
        setActiveTab("setting");
      }}
    >
      <div className="bg-slate-200 relative h-12 w-12 border rounded-full overflow-hidden hover:bg-[#F29F3D]">
        <img
          className="w-full h-full rounded-full"
          src={
            userImage ? userImage : "/assets/images/UserDefaultSaitStaff.png"
          }
          alt="User Image"
        />
      </div>
      <h1 className="text-lg text-black-600 font-bold mt-2 ml-2">
        Welcome, {userName}!
      </h1>
      {/*<p>Email: {email}</p>*/}
      {/*<p>UID: {uid}</p>*/}
    </div>
  );
};

export default UserGreeting;
