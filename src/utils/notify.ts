import toast from "react-hot-toast";

type ToastType = "error" | "success" | "promise";

export const notify = (text: string, type: ToastType) => {
  if (type === "error") return toast.error(text);
  if (type === "success") return toast.success(text);
};
