import { useEffect, useState } from "react";
import { collection, db, getDocs } from "../firebase-config";

export const useFetchCategory = () => {
  const [categoryData, setCategoryData] = useState([]);

  const fetchData = () => {
    const docsRef = collection(db, "Category");
    getDocs(docsRef).then((r) => {
      const categories = r.docs.map((v) => {
        console.log(v.data());
        return v.data();
      });
      setCategoryData(categories);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return categoryData;
};
