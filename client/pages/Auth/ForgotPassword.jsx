import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const ForgotPassword = () => {
     const [email, setEmail] = useState("");
     const [newPassword, setNewPassword] = useState("");
     const [answer, setAnswer] = useState("");
   
     const navigate = useNavigate();
     
       // form function
       const handleSubmit = async (e) => {
        e.preventDefault();
        try {
         const res = await axios.post('http://localhost:8080/api/v1/auth/forgot-password', {
        email, 
        newPassword,
        answer,
         });
             if(res && res.data.success){
               toast.success(res.data && res.data.message)


               navigate(location.state ||"/login");
             }else{
               toast.error(res.data.message)
             }
        } catch (error) {
         console.log(error)
         toast.error('Something went wrong')
        }           
     }
   
   
     
  return (
<Layout title={"Forgot Password - Ecommerce App"}>
 <div className="register">
   <div className="container-fluid ps-md-0">
     <div className="row g-0">
       <div className="im d-none d-md-flex col-md-4 col-lg-6 bg-image2" />
       <div className="col-md-8 col-lg-6">
         <div className="login d-flex align-items-center py-5">
           <div className="container">
             <div className="row">
               <div className="col-md-9 col-lg-8 mx-auto">
                 <h3 className="login-heading mb-4 text-uppercase">Reset Password</h3>
                 {/* Sign In Form */}
                 <form onSubmit={handleSubmit}>

                   <div className="form-floating mb-3">
                     <input 
                     type="email" 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="form-control" 
                     // id="floatingInput" 
                     placeholder=""
                     required />
                     <label >Email address</label>
                   </div>
                   <div className="form-floating mb-3">
                     <input 
                     type="text" 
                     value={answer}
                     onChange={(e) => setAnswer(e.target.value)}
                     className="form-control" 
                     // id="floatingInput" 
                     placeholder=""
                     required />
                     <label >Enter your favourite Sports Name</label>
                   </div>
                   <div className="form-floating mb-3">
                     <input 
                     type="password"
                     value={newPassword}
                     onChange={(e) => setNewPassword(e.target.value)} 
                     className="form-control" 
                     // id="floatingPassword" 
                     placeholder="" 
                     required/>
                     <label >New Password</label>
                   </div>

                   <div className="d-grid">
                     <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit">
                         Reset Password
                     </button>

                   </div>
                 </form>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
 
</Layout>
  )
}

export default ForgotPassword