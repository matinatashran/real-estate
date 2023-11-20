"use client";

import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// modules
import DashboardPagesTitle from "@/module/DashboardPagesTitle";

// .
import Form from "./Form";
import RadioList from "./RadioList";
import TextList from "./TextList";
import CustomDatePicker from "./CustomDatePicker";

// element
import Button from "@/element/Button";

// utils
import { notify } from "@/utils/notify";
import { validation } from "@/utils/validation";
import { rsp } from "@/utils/replaceNumber";

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
  const { handleSubmit, register, setValue, reset, getValues, watch, control } =
    useForm();
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    if (adData) {
      Object.keys(adData).map((key) => {
        if (!["_id", "__v"].includes(key)) {
          setValue(key, adData[key]);
        }
      });
    }
  }, [adData]);

  const submitHandler = async (fieldData: any) => {
    const emptyErr = validation(
      [
        fieldData.title,
        fieldData.description,
        fieldData.address,
        fieldData.phone,
        fieldData.price,
        fieldData.companyName,
        fieldData.category,
        fieldData.adType,
        fieldData.constructionDate,
      ],
      "NOT_EMPTY"
    );

    if (emptyErr) {
      return notify(emptyErr, "error");
    }

    setIsPending(true);
    const res = await fetch("/api/profile", {
      method: apiMethod,
      body: JSON.stringify({
        _id: adData ? adData._id : null,
        ...getValues(),
        price: +rsp(fieldData.price),
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
    <div className="w-[80%] h-full mx-auto flex flex-col items-center gap-10 mb-20">
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
          { name: "price", type: "numeric", label: "Price", sp: true },
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
        onButtonClick={handleSubmit(submitHandler)}
      >
        {buttonTitle}
      </Button>
    </div>
  );
};

export default AdvertisementForm;
