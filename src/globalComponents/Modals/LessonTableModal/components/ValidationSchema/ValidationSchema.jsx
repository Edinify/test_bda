import * as yup from "yup";

export const ValidationSchema = yup.object().shape({
  group: yup
    .string()
    .min(3, "Mininum 3 hərfdən ibarət olmalıdır.")
    .required("Bu xana tələb olunur."),
  date: yup
    .string()
    .min(3, "Mininum 3 hərfdən ibarət olmalıdır.")
    .required("Bu xana tələb olunur."),
  startTime: yup
    .string()
    .min(3, "Mininum 3 hərfdən ibarət olmalıdır.")
    .required("Bu xana tələb olunur."),
  endTime: yup
    .string()
    .min(3, "Mininum 3 hərfdən ibarət olmalıdır.")
    .required("Bu xana tələb olunur."),
});
