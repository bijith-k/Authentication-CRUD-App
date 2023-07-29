import React from 'react'
import { useFormik } from "formik";
import { forgotPasswordSchema } from "../schemas";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useToast } from "@chakra-ui/react";


const initialValues = {
  email: "",
};

const ForgotPassword = () => {
  const navigate = useNavigate()
  const toast = useToast();
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: forgotPasswordSchema,
      onSubmit: async(values, action) => {
        console.log(values);
       const {data} = await axios.post("http://localhost:4000/forgot-password",values)
          if(data.success){
            toast({
              title: data.message,
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          }else{
            toast({
              title: data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          }
        // action.resetForm();
      },
    });

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
                RESET PASSWORD
              </p>
              
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
              

              <div className="my-3 bg-teal-800 md:w-7/12 text-center rounded-xl">
                <button
                  type="submit"
                  className=" text-white font-bold p-3 text-lg"
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword