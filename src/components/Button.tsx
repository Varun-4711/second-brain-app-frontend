import { ReactElement } from "react";

interface PropsType {
  type: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void; // Add an optional onClick handler
}

const defaultButtonStyles = {
  primary: "bg-blue-600 hover:shadow-md hover:shadow-black",
  secondary: "bg-blue-500 hover:shadow-md hover:shadow-black",
};

const otherDefaultButtonStyles =
  "min-w-[10rem] px-4 py-2 rounded-md border border-blue-600 flex items-center justify-center gap-2 text-white font-medium shadow-sm shadow-slate-400 transition-all duration-200";

const Button = (props: PropsType) => {
  return (
    <button
      className={`${defaultButtonStyles[props.type]} ${otherDefaultButtonStyles}`}
      onClick={props.onClick} // Use the passed onClick handler
    >
      {props.startIcon}
      {props.text}
    </button>
  );
};

export default Button;
