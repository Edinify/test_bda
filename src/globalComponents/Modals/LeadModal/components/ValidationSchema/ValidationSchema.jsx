import * as yup from "yup";

export const ValidationSchema = yup.object().shape({
  count: yup
    .number()
    .typeError("Rəqəm olmalıdır.")
    .required("Bu xana tələb olunur."),
  date: yup.string().required("Bu xana tələb olunur."),
});
