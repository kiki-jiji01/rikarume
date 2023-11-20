import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

export const fetchUserInfoByPostId = async (id) => {
  console.log(id);
  const docRef = doc(db, "User", id);
  const userInfo = (await getDoc(docRef)).data();
  console.log(userInfo);
  return userInfo;
};
