import * as yup from "yup";

export const ValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(3, "Mininum 3 hərfdən ibarət olmalıdır.")
    .required("Bu xana tələb olunur."),
  fin: yup
    .string()
    .min(3, "Mininum 3 hərfdən ibarət olmalıdır.")
    .required("Bu xana tələb olunur."),
  birthday: yup.string().required("Bu xana tələb olunur."),
  email: yup
    .string()
    .email("Emaili doğru daxil edin.")
    .required("Bu xana tələb olunur."),
  phone: yup.string().required("Bu xana tələb olunur."),
  position: yup.string().required("Bu xana tələb olunur."),
  password: yup
    .string()
    .min(6, "Şifrə minimum 6 hərfdən ibarət olmalıdır.")
    .required("Bu xana tələb olunur."),
});
