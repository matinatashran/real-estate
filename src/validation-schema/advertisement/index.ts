import * as yup from "yup";

const yp = (name: string) => yup.string().required(`${name} is required!`);

export const advertisementSchema = yup.object({
  title: yp("Title"),
  description: yp("Description"),
  address: yp("Address"),
  phone: yp("Phone"),
  price: yp("price"),
  companyName: yp("Company name"),
  constructionDate: yp("Construction date"),
  welfareAmenities: yup.array(),
  rules: yup.array(),
  category: yp("Category"),
  adType: yp("Ad type"),
  tagTitle: yup.string().nullable(),
  tagDescription: yup.string().nullable(),
  author: yup.string().nullable(),
});

