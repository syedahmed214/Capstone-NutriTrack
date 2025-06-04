// src/validation/registerSchemaYup.js
import * as Yup from 'yup';

export const registerSchemaYup = Yup.object().shape({
  fname: Yup.string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .max(30, 'First name cannot exceed 30 characters')
    .required('First name is required'),

  lname: Yup.string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(30, 'Last name cannot exceed 30 characters')
    .required('Last name is required'),

  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
    .required('Password is required'),

  phone: Yup.string()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
    .nullable()
    .notRequired(),

  bio: Yup.string()
    .max(500, 'Bio cannot exceed 500 characters')
    .nullable(),

  position: Yup.string()
    .max(100, 'Position cannot exceed 100 characters')
    .nullable(),

  isChecked: Yup.boolean()
    .oneOf([true], 'You must accept the Terms and Conditions'),
});
