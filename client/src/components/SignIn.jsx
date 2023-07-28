import React from "react";
import { useFormik } from "formik";
import { signInSchema } from "../schemas";

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
        action.resetForm();
      },
    });

  return (
    <div className="w-screen h-screen bg-teal-900 flex justify-center items-center">
      <div className="bg-white w-2/3 h-2/3 rounded-lg flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit}>
          
          <div>
            <label htmlFor="email" className="block">
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
            />
            {errors.email && touched.email ? (
              <p className="text-red-600">{errors.email}</p>
            ) : null}
          </div>
          
          <div>
            <label htmlFor="password" className="block">
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
            />
            {errors.password && touched.password ? (
              <p className="text-red-600">{errors.password}</p>
            ) : null}
          </div>
         
          <div>
            <button type="submit">Signin</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
