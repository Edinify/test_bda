import * as yup from "yup";

export const ValidationSchema = yup.object().shape({
    name: yup.string().required('Bu xana tələb olunur.'),
    orderNumber: yup.number().required('Bu xana tələb olunur.'),
  });