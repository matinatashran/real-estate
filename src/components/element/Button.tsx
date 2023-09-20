import { MouseEventHandler, ReactNode } from "react";
import { ThreeDots } from "react-loader-spinner";

interface Iprops {
  isPending?: boolean;
  className?: string;
  children: ReactNode;
  onButtonClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ isPending, children, className, onButtonClick }: Iprops) => {
  return (
    <button
      disabled={isPending}
      onClick={onButtonClick}
      className={`hover:opacity-70 max-h-[40px] transition duration-300 cursor-pointer flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {!isPending && children}
      <ThreeDots width="40" radius="9" color="#ffffff" visible={isPending} />
    </button>
  );
};

export default Button;
