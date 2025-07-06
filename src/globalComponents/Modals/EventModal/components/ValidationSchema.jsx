import * as yup from "yup";

export const ValidationSchema = yup.object().shape({
  eventName: yup.string().required("Bu xana tələb olunur."),
  visitor: yup.string().required("Bu xana tələb olunur."),
  speaker: yup.string().required("Bu xana tələb olunur."),
  place: yup.string().required("Bu xana tələb olunur."),
  date: yup.string().required("Bu xana tələb olunur."),
  time: yup.string().required("Bu xana tələb olunur."),
});
