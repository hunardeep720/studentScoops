import { db, storage } from "@/app/firebase/config";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  doc,
  orderBy,
} from "firebase/firestore";
import { getDownloadURL, ref, listAll } from "firebase/storage";

//<<<-----------------------------------------------------------------Sait-staff------------------------------------------------------------------>>>>

//--------------------------------------------------------Sait-staff for sait-staff home page---------------------------------------------------------

//get sait data for user profile
export async function getSaitDataByUser(uid) {
  try {
    const q = query(collection(db, "saitStaff"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    const saitItems = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return saitItems;
  } catch (error) {
    console.error("Error getting sait information: ", error);
    return { status: false };
  }
}

// get sait data for sait staff home page
export function getSaitData(onChange) {
  try {
    const saitCollection = collection(db, "saitStaff");
    onSnapshot(saitCollection, (saitItems) => {
      const saitStaff = saitItems.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      onChange(saitStaff);
    });
  } catch (error) {
    console.error("Error getting sait information: ", error);
    onChange([]);
  }
}

//----------------------------------------------------get students data for sait staff home page-----------------------------------------------------

//get all students data
export function getStudentData(onChange) {
  try {
    const studentCollection = query(collection(db, "students"));
    onSnapshot(studentCollection, (students) => {
      const studentData = students.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      onChange(studentData);
    });
  } catch (error) {
    console.error("Error getting student information: ", error);
    onChange([]);
  }
}

//----------------------------------------------------get restaurant data for sait staff home page-----------------------------------------------------

//getting restaurant data for sait staff home page

export function getRestaurantData(onChange) {
  try {
    const restaurantCollection = query(collection(db, "restaurants"));
    onSnapshot(restaurantCollection, (restaurants) => {
      const restaurantData = restaurants.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      onChange(restaurantData);
    });
  } catch (error) {
    console.error("Error getting restaurant information: ", error);
    onChange([]);
  }
}

//<<<-----------------------------------------------------------------Restaurant------------------------------------------------------------------>>>>

// get restaurant data for user as restaurant

export function getRestaurantDataByOwner(onChange, user) {
  try {
    const restaurantCollection = query(
      collection(db, "restaurants"),
      where("uid", "==", user)
    );
    onSnapshot(restaurantCollection, (restaurants) => {
      const restaurantData = restaurants.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      onChange(restaurantData);
    });
  } catch (error) {
    console.error("Error getting restaurant information: ", error);
    onChange([]);
  }
}

// get restaurant menu data for restaurant

export async function getRestaurantMenuByOwner(onChange, user) {
  console.log("user: ", user);
  const restaurantCollection = await getDocs(
    query(collection(db, "restaurants"), where("uid", "==", user))
  );
  if (!restaurantCollection) {
    console.log("No user data found");
    return;
  }
  console.log("restaurantCollection: ", restaurantCollection);
  const id = restaurantCollection.docs[0].id;
  try {
    const restaurantCollection = query(
      collection(db, "restaurants", id, "menu"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(restaurantCollection, (menuSnapshot) => {
      const menuItems = menuSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      onChange(menuItems);
    });
  } catch (error) {
    console.error("Error getting restaurant information: ", error);
    onChange([]);
  }
}

//get order menu data for restaurants
export function getOrderMenuByOwner(onChange, user) {
  try {
    const restaurantCollection = query(
      collection(db, "restaurants", user, "menu"),
      where("status", "==", false)
    );
    onSnapshot(restaurantCollection, (restaurants) => {
      const restaurantData = restaurants.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      onChange(restaurantData);
    });
  } catch (error) {
    console.error("Error getting restaurant information: ", error);
    onChange([]);
  }
}

//for login purpose only for restaurant
export async function getRestaurantDataForLogin(user) {
  try {
    const q = query(collection(db, "restaurants"), where("uid", "==", user));
    const querySnapshot = await getDocs(q);
    const studentItems = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return studentItems;
  } catch (error) {
    console.error("Error while fetching all students information:", error);
    return [];
  }
}

//get restaurant menu as history for restaurant
export function getRestaurantMenuHistoryByOwner(onChange, restaurantDocId) {
  try{
    const restaurantCollection = query(collection(db, "restaurants", restaurantDocId, "history"), orderBy("pickupAt", "desc"));
    onSnapshot(restaurantCollection, (restaurants) => {
      const restaurantData = restaurants.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      onChange(restaurantData);
    });
  }catch(error){
    console.error("Error getting restaurant information: ", error);
    onChange([]);
  }
}

// // get restaurant data for user as restaurant
export async function getRestaurantInformationByUser(user) {
  try {
    const q = query(
      collection(db, "restaurants"),
      where("uid", "==", user),
      where("active", "==", true)
    );
    const querySnapshot = await getDocs(q);
    const userItems = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return userItems;
  } catch (error) {
    console.error("Error getting user information: ", error);
    return false;
  }
}

//<<<-----------------------------------------------------------------Students------------------------------------------------------------------>>>>

// get restaurant details for students
export function getRestaurantDataByStudents(onChange) {
  try {
    const restaurantCollection = query(collection(db, "restaurants"));
    onSnapshot(restaurantCollection, (restaurants) => {
      const restaurantData = restaurants.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      onChange(restaurantData);
    });
  } catch (error) {
    console.error("Error getting restaurant information: ", error);
    onChange([]);
  }
}

//get student confirm order data for students
export function getStudentConfirmOrderData(onChange, id) {
  try {
    const studentCollection = query(
      collection(db, "students", id, "menu"),
      orderBy("addedAt", "desc")
    );
    onSnapshot(studentCollection, (snapshot) => {
      const menuItems = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((item) => item.status == "Sold"); // Filter out sold items
      console.log("menuItems", menuItems);
      onChange(menuItems);
    });
  } catch (error) {
    console.error("Error getting student information: ", error);
    onChange([]);
  }
}

// get restaurant details for students
export function getRestaurantDataForCheckoutByStudents(onChange, id) {
  try {
    const restaurantCollection = query(
      collection(db, "restaurants"),
      where("uid", "==", id)
    );
    onSnapshot(restaurantCollection, (restaurants) => {
      const restaurantData = restaurants.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      onChange(restaurantData);
    });
  } catch (error) {
    console.error("Error getting restaurant information: ", error);
    onChange([]);
  }
}

//fetch restaurant menu for students
export function getRestaurantMenuByStudents(onChange, id) {
  try {
    // Reference to the menu collection within the restaurant document
    const menuCollectionRef = query(collection(db, "restaurants", id, "menu"));

    // Set up a real-time listener on the menu collection
    onSnapshot(menuCollectionRef, (snapshot) => {
      const menuItems = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      onChange(menuItems);
    });
  } catch (error) {
    console.error("Error getting restaurant information: ", error);
    onChange([]);
  }
}

//get student data for students as user
export function getStudentDataByStudents(onChange, uid) {
  try {
    // Reference to the menu collection within the restaurant document
    const menuCollectionRef = query(
      collection(db, "students"),
      where("uid", "==", uid)
    );

    // Set up a real-time listener on the menu collection
    onSnapshot(menuCollectionRef, (snapshot) => {
      const menuItems = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      onChange(menuItems);
    });
  } catch (error) {
    console.error("Error getting student information: ", error);
    onChange([]);
  }
}

//get cart menu for students
export function getStudentMenuByStudents(onChange, id) {
  try {
    // Reference to the menu collection within the student document
    const menuCollectionRef = query(
      collection(db, "students", id, "menu"),
      orderBy("addedAt", "desc")
    );

    // Set up a real-time listener on the menu collection
    onSnapshot(menuCollectionRef, (snapshot) => {
      const menuItems = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((item) => item.status !== "Sold"); // Filter out sold items
      onChange(menuItems);
    });
  } catch (error) {
    console.error("Error getting menu information: ", error);
    onChange([]);
  }
}
//get menu from restaurant for students
export function getCheckoutMenuByStudents(onChange, id, menuId) {
  try {
    // Reference to the menu collection within the restaurant document
    const menuCollectionRef = query(
      collection(db, "restaurants", id, "menu", menuId)
    );

    // Set up a real-time listener on the menu collection
    onSnapshot(menuCollectionRef, (snapshot) => {
      const menuItems = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      onChange(menuItems);
    });
  } catch (error) {
    console.error("Error getting restaurant information: ", error);
    onChange([]);
  }
}

//get student menu history for students
export function getStudentMenuHistory(onChange,studentDocId){
  try{
    const studentCollection = query(collection(db, "students", studentDocId, "history"));
    onSnapshot(studentCollection, (snapshot) => {
      const menuItems = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      onChange(menuItems);
    });
  }catch(error){
    console.error("Error getting student information: ", error);
    onChange([]);
  }
}

export async function getStudentInformation(userId) {
  try {
    const colRef = collection(
      (db, "students", userId),
      where("active", "==", true)
    );
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      snapshot.forEach((doc) => {});
    });
    return unsubscribe();
  } catch (error) {
    console.error("Error getting user information: ", error);
    return [];
  }
}

export async function getAllStudentsInformation() {
  try {
    const q = query(collection(db, "students"), where("active", "==", true));
    const querySnapshot = await getDocs(q);
    const studentItems = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return studentItems;
  } catch (error) {
    console.error("Error while fetching all students information:", error);
    return [];
  }
}
//get restaurant data for sait staff
export async function getRestaurantInformation() {
  try {
    const q = query(collection(db, "restaurants"), where("active", "==", true));
    const querySnapshot = await getDocs(q);
    const userItems = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return userItems;
  } catch (error) {
    console.error("Error getting user information: ", error);
    return [];
  }
}

export async function getMenuInformation(userId) {
  try {
    const q = query(
      collection(db, "restaurant_menu"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc") // Add this line
    );
    const querySnapshot = await getDocs(q);
    const userItems = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return userItems;
  } catch (error) {
    return [];
  }
}

 export async function getStudentEmailWithStatus() {
   try {
     const q = query(
       collection(db, "student_email"),
      where("active", "==", true)
     );
     const querySnapshot = await getDocs(q);
    const userItems = querySnapshot.docs.map((doc) => doc.data().studentEmail);
     return userItems;
   } catch (err) {
     console.log("error while getting student email information ", err);
     return [];
  }
 }

export async function getRestaurantLogos() {
  const storageRef = ref(storage, "restaurant_logo/");
  const result = await listAll(storageRef);
  const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
  const urls = await Promise.all(urlPromises);
  return urls;
}
