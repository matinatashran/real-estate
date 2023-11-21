import { FC, ReactNode } from "react";
import { ThreeDots } from "react-loader-spinner";

interface Iprops {
  isPending?: boolean;
  className?: string;
  children: ReactNode;
}

const Button: FC<Iprops> = ({ isPending, children, className }) => {
  return (
    <button
      type="submit"
      disabled={isPending}
      className={`hover:opacity-70 max-h-[40px] transition duration-300 cursor-pointer flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {!isPending && children}
      <ThreeDots width="40" radius="9" color="#ffffff" visible={isPending} />
    </button>
  );
};

export default Button;
