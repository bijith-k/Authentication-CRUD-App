import React from 'react'
import { useFormik } from 'formik';
import { signUpSchema } from '../schemas';

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
    <div className="w-screen h-screen bg-teal-900 flex justify-center items-center">
      <div className="bg-white w-2/3 h-2/3 rounded-lg flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block">
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
            />
            {errors.name && touched.name ? (
              <p className="text-red-600">{errors.name}</p>
            ) : null}
          </div>
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
            <label htmlFor="phone" className="block">
              Phone Number
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
            />
            {errors.phone && touched.phone ? (
              <p className="text-red-600">{errors.phone}</p>
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
            <label htmlFor="confirm_password" className="block">
              Confirm Password
            </label>
            <input
              type="password"
              autoComplete="off"
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm enterd password"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirm_password && touched.confirm_password ? (
              <p className="text-red-600">{errors.confirm_password}</p>
            ) : null}
          </div>
          <div>
            <button type="submit">Register now</button>
          </div>
        </form>
      </div>
    </div>
  );
} 

export default SignUp