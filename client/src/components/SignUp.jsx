import React from 'react'
import { useFormik } from 'formik';
import { signUpSchema } from '../schemas';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {useToast} from '@chakra-ui/react'

const initialValues = {
  name: "",
  email: "",
  // phone:"",
  password:"",
  confirm_password:""
}

const SignUp = () => {
  const navigate = useNavigate()
  const toast = useToast()
 const {values,errors,handleBlur,touched,handleChange,handleSubmit} = useFormik({
    initialValues:initialValues,
    validationSchema:signUpSchema,
    onSubmit:async(values,action) => {
       console.log(values)
       const { data } =await axios.post("http://localhost:4000/signUp", values);
       console.log(data)

       if(data.success){
         toast({
           title: data.message,
           status: "success",
           duration: 5000,
           isClosable: true,
           position: "top",
         });
         //  action.resetForm()
         navigate("/signin");
       }else{
        toast({
          title: data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
       }
    }
  })
   
  return (
    <div className="w-screen h-screen bg-teal-900 flex items-center justify-center relative">
      <div className="bg-teal-700  w-4/5 md:w-2/5 mx-auto rounded-xl rounded-tl-3xl rounded-br-3xl ">
        <div className="flex h-full w-full">
          <div className="w-full flex justify-center items-center rounded-xl md:rounded-xl  ">
            <form
              onSubmit={handleSubmit}
              className=" w-full flex flex-col justify-center items-center"
            >
              <p className="flex items-center justify-center text-center font-bold text-2xl   text-white underline p-3">
                SIGN UP HERE
              </p>
              <div className="md:w-7/12">
                <label
                  htmlFor="name"
                  className="block font-semibold text-lg pl-3 text-white"
                >
                  Enter your name
                </label>
                <input
                  type="name"
                  autoComplete="off"
                  name="name"
                  id="name"
                  placeholder="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border focus:outline-none w-full p-2 rounded-lg placeholder:font-medium"
                />
                {errors.name && touched.name ? (
                  <p className="text-red-300 font-semibold text-center">
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div className="md:w-7/12">
                <label
                  htmlFor="email"
                  className="block font-semibold text-lg pl-3 text-white"
                >
                  Enter your email
                </label>
                <input
                  type="email"
                  autoComplete="off"
                  name="email"
                  id="email"
                  placeholder="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border focus:outline-none w-full p-2 rounded-lg placeholder:font-medium"
                />
                {errors.email && touched.email ? (
                  <p className="text-red-300 font-semibold text-center">
                    {errors.email}
                  </p>
                ) : null}
              </div>
              {/* <div className="md:w-7/12">
                <label
                  htmlFor="phone"
                  className="block font-semibold text-lg pl-3 text-white"
                >
                  Enter your number
                </label>
                <input
                  type="number"
                  autoComplete="off"
                  name="phone"
                  id="phone"
                  placeholder="phone number"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border focus:outline-none w-full p-2 rounded-lg placeholder:font-medium"
                />
                {errors.phone && touched.phone ? (
                  <p className="text-red-300 font-semibold text-center">
                    {errors.phone}
                  </p>
                ) : null}
              </div> */}
              <div className="md:w-7/12">
                <label
                  htmlFor="password"
                  className="block font-semibold text-lg pl-3 text-white"
                >
                  Enter your password
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  name="password"
                  id="password"
                  placeholder="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border focus:outline-none w-full p-2 rounded-lg placeholder:font-medium"
                />
                {errors.password && touched.password ? (
                  <p className="text-red-300 font-semibold text-center">
                    {errors.password}
                  </p>
                ) : null}
              </div>

              <div className="md:w-7/12">
                <label
                  htmlFor="confirm_password"
                  className="block font-semibold text-lg pl-3 text-white"
                >
                  Confirm your password
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="Confirm password"
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border focus:outline-none w-full p-2 rounded-lg placeholder:font-medium"
                />
                {errors.confirm_password && touched.confirm_password ? (
                  <p className="text-red-300 font-semibold text-center">
                    {errors.confirm_password}
                  </p>
                ) : null}
              </div>

              <div className="my-3 bg-teal-800 md:w-7/12 text-center rounded-xl">
                <button
                  type="submit"
                  className=" text-white font-bold p-3 text-lg"
                >
                  Signin
                </button>
              </div>

              <p className="my-10 text-white">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/signin")}
                  className="cursor-pointer"
                >
                  {" "}
                  click to signin
                </span>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 

export default SignUp