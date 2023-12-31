// module
import AdvertisementForm from "@/module/form/AdvertisementForm";

const AddAdvertisementPage = () => {
  return (
    <AdvertisementForm
      apiMethod="POST"
      pageTitle="Add Your Advertisement"
      buttonTitle="Submit"
    />
  );
};

export default AddAdvertisementPage;
