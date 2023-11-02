"use client";

import { FC, useEffect, useState } from "react";

// modules
import DashboardPagesTitle from "@/module/DashboardPagesTitle";
import FormInputs from "@/module/FormInputs";
import RadioList from "@/module/RadioList";
import TextList from "@/module/TextList";
import CustomDatePicker from "@/module/CustomDatePicker";

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
  const [isPending, setIsPending] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [adType, setAdType] = useState<string>("");
  const [welfareAmenities, setWelfareAmenities] = useState<string[]>([]);
  const [rules, setRules] = useState<string[]>([]);
  const [constructionDate, setConstructionDate] = useState<Date | null>(
    new Date()
  );
  const [tagTitle, setTagTitle] = useState<string>("");
  const [tagDescription, setTagDescription] = useState<string>("");
  const [author, setauthor] = useState<string>("");

  useEffect(() => {
    if (adData) {
      setTitle(adData.title);
      setDescription(adData.description);
      setAddress(adData.address);
      setPhone(adData.phone);
      setPrice(adData.price.toString());
      setCompanyName(adData.companyName);
      setCategory(adData.category);
      setAdType(adData.adType);
      setWelfareAmenities(adData.welfareAmenities);
      setRules(adData.rules);
      setConstructionDate(new Date(adData.constructionDate));
      setTagTitle(adData.tagTitle);
      setTagDescription(adData.tagDescription);
      setauthor(adData.author);
    }
  }, [adData]);

  const submitHandler = async () => {
    const emptyErr = validation(
      [
        title,
        description,
        address,
        phone,
        price,
        companyName,
        category,
        adType,
      ],
      "NOT_EMPTY"
    );

    if (emptyErr || !constructionDate || !(constructionDate instanceof Date)) {
      return notify(
        emptyErr || "Invalid data! Please enter date by correct format.",
        "error"
      );
    }
    setIsPending(true);
    const res = await fetch("/api/profile", {
      method: apiMethod,
      body: JSON.stringify({
        _id: adData ? adData._id : null,
        title,
        description,
        address,
        phone,
        price: +rsp(price),
        companyName,
        category,
        adType,
        welfareAmenities,
        rules,
        constructionDate,
        tagTitle,
        tagDescription,
        author,
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
        setTitle("");
        setDescription("");
        setAddress("");
        setPhone("");
        setPrice("");
        setCompanyName("");
        setCategory("");
        setAdType("");
        setWelfareAmenities([]);
        setRules([]);
        setConstructionDate(new Date());
        setTagTitle("");
        setTagDescription("");
        setauthor("");
      }
      window.location.reload();
    }
  };

  return (
    <div className="w-[80%] h-full mx-auto flex flex-col items-center gap-10 mb-20">
      <DashboardPagesTitle title={pageTitle} />
      <FormInputs
        formClass="w-full flex flex-col items-center gap-5"
        inputList={[
          { value: title, setValue: setTitle, inputLabel: "Title" },
          {
            value: description,
            setValue: setDescription,
            inputLabel: "Description",
            type: "textArea",
          },
          { value: address, setValue: setAddress, inputLabel: "Address" },
          { value: phone, setValue: setPhone, inputLabel: "Phone Number" },
          {
            value: price,
            setValue: setPrice,
            inputLabel: "Price ($)",
            type: "number",
          },
          {
            value: companyName,
            setValue: setCompanyName,
            inputLabel: "Company Name",
          },
        ]}
      />
      <RadioList
        radioTitle="Category"
        selected={category}
        setSelected={setCategory}
        className="w-full flex flex-col md:flex-row items-start md:items-center justify-center gap-4"
        valueList={[
          { value: "villa", title: "Villa" },
          { value: "apartment", title: "Apartment" },
          { value: "shop", title: "Shop" },
          { value: "office", title: "Office" },
        ]}
      />
      <RadioList
        radioTitle="Type"
        selected={adType}
        setSelected={setAdType}
        className="w-full flex flex-col md:flex-row items-start md:items-center justify-center gap-4"
        valueList={[
          { value: "sale", title: "Sale" },
          { value: "rent", title: "Rent" },
          { value: "fullMortgage", title: "Full Mortgage" },
        ]}
      />
      <TextList
        listTitle="Welfare Amenities"
        itemList={welfareAmenities}
        setItemList={setWelfareAmenities}
      />
      <TextList listTitle="Rules" itemList={rules} setItemList={setRules} />
      <CustomDatePicker
        value={constructionDate}
        setValue={setConstructionDate}
      />
      <div className="w-full relative">
        <hr className="w-full" />
        <span className="font-semibold text-sm text-gray-300 bg-white px-3 w-32 text-center absolute -top-2.5 left-1/2 -ml-16">
          FOR SEO
        </span>
      </div>
      <FormInputs
        formClass="w-full flex flex-col items-center gap-5"
        inputList={[
          {
            value: tagTitle,
            setValue: setTagTitle,
            inputLabel: "Tag Title",
            placeholder: "Optional",
          },
          {
            value: tagDescription,
            setValue: setTagDescription,
            inputLabel: "Tag Description",
            placeholder: "Optional",
            type: "textArea",
          },
          {
            value: author,
            setValue: setauthor,
            inputLabel: "Author",
            placeholder: "Optional",
          },
        ]}
      />
      <Button
        className="bg-black w-1/2 text-white py-1.5 rounded-md"
        isPending={isPending}
        onButtonClick={submitHandler}
      >
        {buttonTitle}
      </Button>
    </div>
  );
};

export default AdvertisementForm;
