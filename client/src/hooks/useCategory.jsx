import React, { useEffect, useState } from 'react'
import axios from 'axios';
const useCategory = () => {
   const[categories, setCategories] = useState([]);
   
   // get categories
   const getCategories = async () => {
     try {
       const {data} = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/category/get-category`)
       setCategories(data?.category)   
     } catch (error) {
        console.log(error);
     }
   }
   
   useEffect(() => {
       getCategories();
   }, [])
  return categories;
}

export default useCategory
