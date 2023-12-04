import * as yup from 'yup';

export const emailPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email Address is required'),
  password: yup
    .string()
    .min(1, 'Password must contain at least 1 characters.')
    .required('Password is required'),
});
