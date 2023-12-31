import React, { useContext } from "react";
import {useNavigate} from 'react-router-dom'
import { useFormik } from "formik";
import { signInSchema } from "../schemas";
import axios from 'axios'
import { useToast } from "@chakra-ui/react";
import UserContext from "../context/UserContext";


const initialValues = {
  email: "",
  password: ""
};

const SignIn = () => {
  const navigate = useNavigate()
  const toast = useToast();
  const { user, updateUser } = useContext(UserContext);
 

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signInSchema,
      onSubmit: async(values, action) => {
        console.log(values);
       const {data} = await axios.post("http://localhost:4000/signIn",values)
       console.log(data,"data")
        if (data.success) {
          toast({
            title: data.message,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          localStorage.setItem("userToken",data.token)
          updateUser(data.userData);
          // action.resetForm();
          navigate("/");
        } else {
          toast({
            title: data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      },
    });

  return (
    <div className="w-screen h-screen bg-teal-900 flex items-center justify-center ">
      <div className="bg-teal-700 min-h-4/5 w-4/5 md:w-2/5 mx-auto rounded-tr-3xl rounded-bl-3xl ">
        <div className="flex h-full w-full">
          <div className="w-full  flex justify-center items-center  rounded-xl md:rounded-xl  ">
            <form
              onSubmit={handleSubmit}
              className=" w-full flex flex-col justify-center items-center"
            >
              <p className="flex items-center justify-center text-center font-bold text-2xl   text-white underline p-3">
                SIGN IN HERE
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
                  className="border focus:outline-none w-full p-3 rounded-lg placeholder:font-medium"
                />
                {errors.email && touched.email ? (
                  <p className="text-red-300 font-semibold text-center">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div className="md:w-7/12 mt-5">
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
                  className="border focus:outline-none w-full p-3 rounded-lg placeholder:font-medium"
                />
                {errors.password && touched.password ? (
                  <p className="text-red-300 font-semibold text-center">
                    {errors.password}
                  </p>
                ) : null}
              </div>

              <div className="mt-5 bg-teal-800 md:w-7/12 text-center rounded-xl">
                <button
                  type="submit"
                  className=" text-white font-bold p-3 text-lg"
                >
                  Signin
                </button>
              </div>
              <p className="mt-10 text-white">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="cursor-pointer"
                >
                  {" "}
                  click to signup
                </span>{" "}
              </p>
              <p className="mb-10 text-white">
                Forgot password?{" "}
                <span
                  onClick={() => navigate("/forgot-password")}
                  className="cursor-pointer"
                >
                  {" "}
                  click to reset
                </span>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
