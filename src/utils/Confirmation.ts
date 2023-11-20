import Swal from "sweetalert2";

type ConfirmationType = "DELETE" | "CONFIRM";

export const confirmation = async (text: string, type: ConfirmationType) => {
  const result = await Swal.fire({
    text: text,
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#c9c9c9",
    confirmButtonColor: type === "DELETE" ? "#ff0000" : "#000000",
    cancelButtonText: "Cancel",
    confirmButtonText: type === "DELETE" ? "Delete" : "Confirm",
    customClass: {
      popup: "!text-sm",
    },
  });

  return result.isConfirmed;
};
