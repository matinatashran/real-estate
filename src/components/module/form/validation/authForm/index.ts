import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Email must be a valid format!")
    .required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

// ###########################

export const registerSchema = yup.object({
  firstname: yup.string().nullable(),
  lastname: yup.string().nullable(),
  email: yup
    .string()
    .required("Email is required!")
    .email("Email must be valid format!")
    .trim(),
  password: yup
    .string()
    .required("Password is required!")
    .min(6)
    .max(15)
    .trim(),
});

// ###########################

export const changePasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required("Password is required!")
    .min(6)
    .max(15)
    .trim(),
  confirmPassword: yup
    .string()
    .required("Confirm password is required!")
    .oneOf([yup.ref("newPassword")], "Confirm password incorrect!"),
});

// ###########################

export const editUserSchema = yup.object({
  firstname: yup.string().nullable(),
  lastname: yup.string().nullable(),
  email: yup
    .string()
    .required("Email is required!")
    .email("Email must be valid format!")
    .trim(),
});

// ###########################

export const emailFormSchema = yup.object({
  email: yup
    .string()
    .required("Email is required!")
    .email("Email must be valid format!")
    .trim(),
});

export const verifyFormSchema = yup.object({
  verifyCode: yup
    .string()
    .required("Verify code is required!")
    .trim()
    .min(6)
    .max(6),
});
