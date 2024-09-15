import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([])
  
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // get-product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      if (data?.success) {
        setProduct(data.product);
        getSimilarProduct(data?.product._id, data?.product.category._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
 // get similar product
 const getSimilarProduct = async (pid, cid) => {
     try {
       const { data } = await axios.get(
         `${import.meta.env.VITE_REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
       );
       setRelatedProducts(data?.products);
     } catch (error) {
       console.error('Error fetching similar products:', error);
     }
   };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">          
            <img
              src={`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              height="400"
              width={"350px"}
            />         
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: ₹{product.price}</h6>
          <h6>Category: {product?.category?.name}</h6>
          <h6>Shipping: {product.shipping ? 'Available' : 'Not Available'}</h6>
          <button className='btn btn-secondary ms-1'>Add to cart</button>
        </div>
      </div>
      <div className="row mx-1">
        <h4 className='mx-2 mt-4'>Similar Products</h4>
        {relatedProducts.length < 1 && (
          <p className='text-center'>No Similar Products found</p>)}
        <div className='d-flex flex-wrap'>
          {relatedProducts?.map(p => (
                <div className="card m-2" style={{width: '18rem'}} key={p._id}>
               <img src={`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-photo/${p._id}`} 
               className="card-img-top" alt={p.name} />
               <div className="card-body">
                 <h5 className="card-title">{p.name}</h5>
                 <p className="card-text">{p.description.substring(0,30)}...</p>
                 <p className="card-text">Rs.{p.price}</p>
                 <button className='btn btn-secondary ms-1'>Add to cart</button>
               </div>
              </div>    
              
            ))}
          </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
