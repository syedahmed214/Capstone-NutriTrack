import * as yup from 'yup';

export const registerSchemaYup = yup.object().shape({
  fname: yup.string().required('First name is required'),
  lname: yup.string().required('Last name is required'),
  email: yup.string().email('Email must be valid').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  isChecked: yup.bool().oneOf([true], 'You must accept the terms and conditions')
});
