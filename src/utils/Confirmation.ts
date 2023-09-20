import Swal from "sweetalert2";

export const confirmDelete = async (text: string) => {
  const result = await Swal.fire({
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ff0000",
    cancelButtonText: "Cancel",
    confirmButtonText: "Delete",
    customClass: {
      popup: "!text-sm",
    },
  });

  return result.isConfirmed;
};
