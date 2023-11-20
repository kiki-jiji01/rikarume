import { collection,  doc,  getDoc, getDocs,  query, where } from "firebase/firestore";
import useFetchUser from "../../hooks/useFetchUser";
import { db } from "../../firebase-config";
import useFetchUserInfomation from "../../hooks/useFetchUserInformation";
import { useEffect, useState } from "react";
// import { caluculateLastLoginTime } from "../../util/date";

const Request = () => {
    const user = useFetchUser();
    const [data,setData] = useState();
    console.log(user)

    const fetchData = async() => {
        const postRef = collection(db, "Post");
        const getOwnPosts = async () => {
            const ownPosts = (await getDocs(postRef)).docs.filter(v => v.data().user_id === user.uid).map((v) => {
                    return (
                        {
                        id:v.id,
                        ...v.data(),
                        }
                    )
            })
            console.log(ownPosts)
            return ownPosts;
        } 
        const ownPosts = await getOwnPosts();
        console.log(ownPosts)
        ownPosts.reduce((acc,current) => {
            
            getDocs(collection(db,"Post",current.id,"ChatRoom"))
            .then((v) => {
                return (
                    //返り値が[Promise]になってしまっているので、Promiseの結果が欲しい。
                    //原因は、docsの各要素が非同期関数の引数として渡っているから。
                    //mapに渡す関数を非同期ではなくする。
                    //returnされた値をプロミスの結果に変換する。
                    v.docs.map((v) => {
                        console.log(v.data(),current.id)
                        const docRef = doc(db, "User", v.id)
                        const messageUserInfo = getDoc(docRef).then((v) => v.data())
                        console.log(messageUserInfo)
                        const messageCollectionRef = collection(db,"Post",current.id,"ChatRoom",v.id,"Messages")
                        const q = query(messageCollectionRef, where("user_id", "!=", user.uid));
                        const messages =  getDocs(q).then(v => v.docs.map(v => v.data()))
                        console.log(messages)
                        return{
                            img:messageUserInfo.userPhotoUrl,
                            text:messages[0]?.text,
                            name:messageUserInfo.userName,
                            // date:caluculateLastLoginTime(messages[0]?.timestamp)
                        }
                    })
                )
            })
            .then((messagesList) => {
                console.log(messagesList)
                setData(
                    [
                        ...acc,
                        {
                            title:current.title,
                            postImg:current.img,
                            price:current.price,
                            category:current.category,
                            // userImg:user.userPhotoUrl,
                            // userName:user.userName,
                            messages:messagesList
                        }
                    ] 
                )
            })
        },[{}])
    }
    
    useEffect(() => {
        if(user){
            fetchData();
        }
    },[user])
    
    console.log(data)
    // [
    //     {   
    //         title:
    //         postImg:
    //         price:
    //         shippingFeePayer:
    //         userImg:
    //         userName:
    //         date:
    //         messages:{
    //             img:
    //             text:
    //             name:
    //             date:
    //         }
    //     },
    //     {},{}
    // ]
//自分がした問い合わせした一覧
    //Post全ドキュメントを配列で取得。
    //そのそれぞれのドキュメントのChatRoomコレクションのなかで自分のuser-idがあるものに絞る。
    // [
    //     {
    //         title:
    //         postImg:
    //         price:
    //         shippingFeePayer:
    //         userImg:
    //         userName:
    //         date:
    //     },
    //     {
    //         title:
    //         postImg:
    //         price:
    //         shippingFeePayer:
    //         userImg:
    //         userName:
    //         date:
    //     }
    // ]
    return(
        <></>
    )
}

export default Request;