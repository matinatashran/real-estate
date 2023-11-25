"use client";

import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";

// modules
import DashboardPagesTitle from "@/module/DashboardPagesTitle";

// .
import Form from "./Form";
import RadioList from "./RadioList";
import TextList from "./TextList";
import CustomDatePicker from "./CustomDatePicker";
import errorHandler from "./error";

// element
import Button from "@/element/Button";

// utils
import { notify } from "@/utils/notify";

// validation-schema
import { advertisementSchema } from "@/validation-schema/advertisement";

type FormType = InferType<typeof advertisementSchema>;

type ApiMehtodType = "POST" | "PATCH";
interface IFormProps {
  apiMethod: ApiMehtodType;
  pageTitle: string;
  buttonTitle: string;
  adData?: any;
}

const AdvertisementForm: FC<IFormProps> = ({
  apiMethod,
  pageTitle,
  buttonTitle,
  adData,
}) => {
  const [isPending, setIsPending] = useState<boolean>(false);

  const { handleSubmit, register, setValue, reset, watch, control } =
    useForm<FormType>({ resolver: yupResolver(advertisementSchema) });

  useEffect(() => {
    if (adData) {
      const nameList = Object.keys(advertisementSchema.fields);
      nameList.map((item) => {
        setValue(item, adData[item]);
      });
    }
  }, [adData]);

  const submitHandler = async (fieldData: FormType) => {
    setIsPending(true);
    const res = await fetch("/api/profile", {
      method: apiMethod,
      body: JSON.stringify({
        _id: adData ? adData._id : null,
        ...fieldData,
      }),
      headers: { "Content-Type": "application/json" },
    });
    setIsPending(false);

    const data = await res.json();
    if (data.error) {
      notify(data.error, "error");
    } else {
      notify(data.message, "success");
      if (apiMethod === "POST") {
        reset();
      }
      window.location.reload();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler, errorHandler)}
      className="w-[80%] h-full mx-auto flex flex-col items-center gap-10 mb-20"
    >
      <DashboardPagesTitle title={pageTitle} />
      <Form
        register={register}
        control={control}
        formClass="w-full flex flex-col items-center gap-5"
        fieldList={[
          { name: "title", label: "Title" },
          { name: "description", type: "textArea", label: "Description" },
          { name: "address", label: "Address" },
          { name: "phone", type: "numeric", label: "Phone" },
          { name: "price", type: "numeric", label: "Price", separator: true },
          { name: "companyName", label: "Company Name" },
        ]}
      />
      <TextList
        name="welfareAmenities"
        title="Welfare Amenities"
        control={control}
        register={register}
      />
      <TextList
        name="rules"
        title="Rules"
        control={control}
        register={register}
      />
      <CustomDatePicker name="constructionDate" control={control} />
      <RadioList
        name="category"
        radioTitle="Category"
        register={register}
        watch={watch}
        className="w-full flex flex-col md:flex-row items-start md:items-center justify-center gap-4"
        valueList={[
          { value: "villa", title: "Villa" },
          { value: "apartment", title: "Apartment" },
          { value: "shop", title: "Shop" },
          { value: "office", title: "Office" },
        ]}
      />
      <RadioList
        name="adType"
        radioTitle="Type"
        register={register}
        watch={watch}
        className="w-full flex flex-col md:flex-row items-start md:items-center justify-center gap-4"
        valueList={[
          { value: "sale", title: "Sale" },
          { value: "rent", title: "Rent" },
          { value: "fullMortgage", title: "Full Mortgage" },
        ]}
      />
      <Form
        register={register}
        formClass="w-full flex flex-col items-center gap-5"
        fieldList={[
          { name: "tagTitle", label: "Tag Title", placeholder: "Optional" },
          {
            name: "tagDescription",
            label: "Tag Description",
            placeholder: "Optional",
          },
          { name: "author", label: "Author", placeholder: "Optional" },
        ]}
      />
      <Button
        className="bg-black w-1/2 text-white py-1.5 rounded-md"
        isPending={isPending}
      >
        {buttonTitle}
      </Button>
    </form>
  );
};

export default AdvertisementForm;
