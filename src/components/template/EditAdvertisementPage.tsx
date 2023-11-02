import { FC } from "react";

// module
import AdvertisementForm from "@/module/AdvertisementForm";

interface IProps {
  data: any;
}

const EditAdvertisementPage: FC<IProps> = ({ data }) => {
  return (
    <AdvertisementForm
      apiMethod="PATCH"
      pageTitle="Edit Your Advertisement"
      buttonTitle="Save Changes"
      adData={data}
    />
  );
};

export default EditAdvertisementPage;
