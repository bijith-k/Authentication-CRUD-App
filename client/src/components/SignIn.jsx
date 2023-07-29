import React from "react";
import { useFormik } from "formik";
import { signInSchema } from "../schemas";
import login from "../assets/signIn.png";
import axios from 'axios'


const initialValues = {
  email: "",
  password: ""
};

const SignIn = () => {
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signInSchema,
      onSubmit: (values, action) => {
        console.log(values);
       const {data} =  axios.post("http://localhost:4000/signIn",values)
       console.log(data,"data")
        action.resetForm();
      },
    });

  return (
    <div className="w-screen h-screen bg-teal-900 flex items-center relative">
      <p className="text-center font-bold text-2xl bg-red-300 w-3/4 ml-12 md:ml-40 rounded-full absolute top-10 p-3">
        SIGN IN HERE
      </p>
      <div className="bg-white h-4/5 w-4/5 mx-auto rounded-xl">
        <div className="flex h-full w-full">
          <div className="w-full md:w-1/2 flex justify-center items-center bg-blue-400 rounded-xl md:rounded-xl  ">
           
            <form
              onSubmit={handleSubmit}
              className=" w-full flex flex-col justify-center items-center"
            >
              <div className="md:w-5/12">
                <label htmlFor="email" className="block font-bold text-lg pl-3">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="off"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border w-full p-3 rounded-lg placeholder:font-semibold"
                />
                {errors.email && touched.email ? (
                  <p className="text-red-600 font-semibold text-center">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div className="md:w-5/12 mt-5">
                <label
                  htmlFor="password"
                  className="block font-bold text-lg pl-3"
                >
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border w-full p-3 rounded-lg placeholder:font-semibold"
                />
                {errors.password && touched.password ? (
                  <p className="text-red-600">{errors.password}</p>
                ) : null}
              </div>

              <div className="mt-5 bg-teal-800 md:w-5/12 text-center rounded-xl">
                <button
                  type="submit"
                  className=" text-white font-bold p-3 text-lg"
                >
                  Signin
                </button>
              </div>
            </form>
          </div>
          <div className="w-1/2 hidden md:block">
            <img src={login} alt="login image" className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
