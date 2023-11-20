import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, doc, getDoc } from "../firebase-config";
import useFetchUser from "./useFetchUser";

const useFetchUserInfomation = () => {
  const user = useFetchUser();

  console.log(user);
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "User", user.uid);
      getDoc(docRef).then((v) => {
        setUserData(v.data());
      });
    }
  }, [user]);

  return userData;
};

export default useFetchUserInfomation;
