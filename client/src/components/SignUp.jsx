import React from 'react'
import { useFormik } from 'formik';
import { signUpSchema } from '../schemas';
import signup from "../assets/signup.jpg";

const initialValues = {
  name: "",
  email: "",
  phone:"",
  password:"",
  confirm_password:""
}

const SignUp = () => {
 const {values,errors,handleBlur,touched,handleChange,handleSubmit} = useFormik({
    initialValues:initialValues,
    validationSchema:signUpSchema,
    onSubmit:(values,action) => {
       console.log(values)
       action.resetForm()
    }
  })
   
  return (
    // <div className="w-screen h-screen bg-teal-900 flex justify-center items-center">
    //   <div className="bg-white w-2/3 h-2/3 rounded-lg flex flex-col items-center justify-center">
    //     <form onSubmit={handleSubmit}>
    //       <div>
    //         <label htmlFor="name" className="block">
    //           Name
    //         </label>
    //         <input
    //           type="name"
    //           autoComplete="off"
    //           name="name"
    //           id="name"
    //           placeholder="Enter your name"
    //           value={values.name}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //         />
    //         {errors.name && touched.name ? (
    //           <p className="text-red-600">{errors.name}</p>
    //         ) : null}
    //       </div>
    //       <div>
    //         <label htmlFor="email" className="block">
    //           Email
    //         </label>
    //         <input
    //           type="email"
    //           autoComplete="off"
    //           name="email"
    //           id="email"
    //           placeholder="Enter your email"
    //           value={values.email}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //         />
    //         {errors.email && touched.email ? (
    //           <p className="text-red-600">{errors.email}</p>
    //         ) : null}
    //       </div>
    //       <div>
    //         <label htmlFor="phone" className="block">
    //           Phone Number
    //         </label>
    //         <input
    //           type="number"
    //           autoComplete="off"
    //           name="phone"
    //           id="phone"
    //           placeholder="Enter your phone number"
    //           value={values.phone}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //         />
    //         {errors.phone && touched.phone ? (
    //           <p className="text-red-600">{errors.phone}</p>
    //         ) : null}
    //       </div>
    //       <div>
    //         <label htmlFor="password" className="block">
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           autoComplete="off"
    //           name="password"
    //           id="password"
    //           placeholder="Enter password"
    //           value={values.password}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //         />
    //         {errors.password && touched.password ? (
    //           <p className="text-red-600">{errors.password}</p>
    //         ) : null}
    //       </div>
    //       <div>
    //         <label htmlFor="confirm_password" className="block">
    //           Confirm Password
    //         </label>
    //         <input
    //           type="password"
    //           autoComplete="off"
    //           name="confirm_password"
    //           id="confirm_password"
    //           placeholder="Confirm enterd password"
    //           value={values.confirm_password}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //         />
    //         {errors.confirm_password && touched.confirm_password ? (
    //           <p className="text-red-600">{errors.confirm_password}</p>
    //         ) : null}
    //       </div>
    //       <div>
    //         <button type="submit">Register now</button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <div className="w-screen h-screen bg-teal-900 flex items-center relative">
      <p className="text-center font-bold text-2xl bg-red-300 w-3/4 ml-12 md:ml-40 rounded-full absolute top-2 p-3">
        SIGN UP HERE
      </p>
      <div className="bg-white h-10/12 w-4/5 mx-auto rounded-xl">
        <div className="flex h-full w-full">
          <div className="w-full md:w-1/2 flex justify-center items-center bg-blue-400 rounded-xl md:rounded-xl  ">
            <form
              onSubmit={handleSubmit}
              className=" w-full flex flex-col justify-center items-center"
            >
              <div className="md:w-5/12">
                <label htmlFor="name" className="block font-bold text-lg pl-3">
                  Name
                </label>
                <input
                  type="name"
                  autoComplete="off"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border w-full p-1 rounded-lg placeholder:font-semibold"
                />
                {errors.name && touched.name ? (
                  <p className="text-red-600 font-semibold text-center">
                    {errors.name}
                  </p>
                ) : null}
              </div>
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
                  className="border w-full p-1 rounded-lg placeholder:font-semibold"
                />
                {errors.email && touched.email ? (
                  <p className="text-red-600 font-semibold text-center">
                    {errors.email}
                  </p>
                ) : null}
              </div>
              <div className="md:w-5/12">
                <label htmlFor="phone" className="block font-bold text-lg pl-3">
                  Phone
                </label>
                <input
                  type="number"
                  autoComplete="off"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border w-full p-1 rounded-lg placeholder:font-semibold"
                />
                {errors.phone && touched.phone ? (
                  <p className="text-red-600 font-semibold text-center">
                    {errors.phone}
                  </p>
                ) : null}
              </div>
              <div className="md:w-5/12">
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
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border w-full p-1 rounded-lg placeholder:font-semibold"
                />
                {errors.password && touched.password ? (
                  <p className="text-red-600 font-semibold text-center">
                    {errors.password}
                  </p>
                ) : null}
              </div>

              <div className="md:w-5/12">
                <label
                  htmlFor="confirm_password"
                  className="block font-bold text-lg pl-3"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="Confirm your password"
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border w-full p-1 rounded-lg placeholder:font-semibold"
                />
                {errors.confirm_password && touched.confirm_password ? (
                  <p className="text-red-600">{errors.confirm_password}</p>
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
            <img
              src={signup}
              alt="login image"
              className="object-cover h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 

export default SignUp