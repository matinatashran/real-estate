import { FieldError } from "react-hook-form";

// utils
import { notify } from "@/utils/notify";

const errorHandler = (error: FieldError) => {
  notify(Object.values(error)[0]["message"], "error");
};

export default errorHandler;
