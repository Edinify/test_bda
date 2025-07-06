import * as yup from "yup";

export const validationSchema = (modalData) => {
  const createValidationSchema = yup.object().shape({
    studentPhone: yup
      .string()
      .min(9, "Mininum 9 hərfdən ibarət olmalıdır.")
      .required("Bu xana tələb olunur."),
    contactDate: yup
      .string()
      .min(3, "Mininum 3 hərfdən ibarət olmalıdır.")
      .required("Bu xana tələb olunur."),
    fin: yup
      .string()
      .matches(/^[a-zA-Z0-9]*$/, "Yalnız hərf və rəqəmlərdən ibarət olmalıdır.")
      .min(7, "Mininum 7 simvoldan ibarət olmalıdır."),
  });

  const updateValidationSchema = yup.object().shape({
    studentName: yup
      .string()
      .min(3, "Mininum 3 hərfdən ibarət olmalıdır.")
      .required("Bu xana tələb olunur."),
    fin: yup
      .string()
      .matches(/^[a-zA-Z0-9]*$/, "Yalnız hərf və rəqəmlərdən ibarət olmalıdır.")
      .min(7, "Mininum 7 simvoldan ibarət olmalıdır.")
      .required("Bu xana tələb olunur."),
    studentPhone: yup
      .string()
      .min(9, "Mininum 9 hərfdən ibarət olmalıdır.")
      .required("Bu xana tələb olunur."),
    contactDate: yup
      .string()
      .min(3, "Mininum 3 hərfdən ibarət olmalıdır.")
      .required("Bu xana tələb olunur."),
    constDate: yup
      .string()
      .min(3, "Mininum 3 hərfdən ibarət olmalıdır.")
      .required("Bu xana tələb olunur."),
    constTime: yup
      .string()
      .min(3, "Mininum 3 hərfdən ibarət olmalıdır.")
      .required("Bu xana tələb olunur."),
    course: yup.object().required("Bu xana tələb olunur."),

    ...(modalData.status === "sold"
      ? {
          salesDate: yup
            .string()
            .min(3, "Mininum 3 hərfdən ibarət olmalıdır.")
            .required("Bu xana tələb olunur."),
        }
      : {}),

    ...(modalData?.group === "newGroup"
      ? { group: yup.string().min(3).required("Bu xana tələb olunur.") }
      : { group: yup.object().required("Bu xana tələb olunur.") }),
  });

  return modalData?._id && modalData?.status === "sold"
    ? updateValidationSchema
    : createValidationSchema;
};
