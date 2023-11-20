type validationType = "NOT_EMPTY" | "EMAIL" | "PASSWORD";

// Validation
export function validation(
  data: string | string[],
  type: validationType
): string {
  if (type === "NOT_EMPTY") {
    // data must be array
    for (let i = 0; i < data.length; i++) {
      if (!String(data[i]).trim() || data[i] === null)
        return "Invalid data! Please fill each fields.";
    }
  } else if (type === "EMAIL" && typeof data === "string") {
    const emailRgx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRgx.test(data)) return "Email's format incorrect!";
  } else if (type === "PASSWORD") {
    if (data.length < 6) return "Password must be atleast 6 charactors!";
  }
  return "";
}
