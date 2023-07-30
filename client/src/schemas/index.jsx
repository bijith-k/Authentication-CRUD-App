import * as Yup from 'yup'


export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  // phone: Yup.string().matches(/^\d{10}$/, "Invalid phone number").required("Please enter your phone number"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirm_password: Yup.string()
    .required("Please enter your password")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const signInSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
});


export const resetPasswordSchema = Yup.object({
  password: Yup.string().min(6).required("Please enter your new password"),
  confirm_password: Yup.string()
    .required("Please enter your new password")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});


export const notesSchema = Yup.object({
  title: Yup.string().required("Please enter the title"),
  content: Yup.string().required("Please add the content")
});