import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { useEffect, useState } from "react";


// １、利用しているコンポーネントが再レンダー
// ２、useFetchUserが再発火
// ３、userがまずundefinedで返される。
// ４、useEffectが発火する。
//    onAuthStateChangedのコールバックが発火する。
// ５、setUserが発火し、useFetchUserが再レンダー
// ６、userがオブジェクトで返される。
// ７、useEffectが発火する。
//    onAuthStateChangedのコールバックが発火する。
//    setUserが発火し、useFetchUserが再レンダー
//    userがオブジェクトで返される。

const useFetchUser = () => {
    const [user,setUser] = useState();
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          console.log("setUser")
          setUser(user);
          // ...
        } else {
          return;
          // User is signed out
          // ...
        }
      });
    },[user])
    console.log(user);
    return user;
}

export default useFetchUser;