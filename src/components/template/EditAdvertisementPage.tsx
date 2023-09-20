// module
import AdvertisementForm from "@/module/AdvertisementForm";

interface IProps {
  data: any;
}

const EditAdvertisementPage = ({ data }: IProps) => {
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
