import * as Yup from 'yup';

export default Yup.object().shape({
  username: Yup.string()
    .matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/, 'Name must not contain numeric characters.')
    .min(3, 'Name must contain at least 3 characters.')
    .max(50, 'Name must contain a maximum of 50 characters.')
    .required('Name is a required field.'),
  password: Yup.string()
    .min(5, 'Password must contain at least 5 characters.')
    .max(50, 'Password must contain a maximum of 50 characters.')
    .required('Password is a required field.'),
  email: Yup.string()
    .email('Invalid email format.')
});