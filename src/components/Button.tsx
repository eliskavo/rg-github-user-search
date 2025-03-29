import clsx from "clsx";

type ButtonProps = {
  kind?: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export default function Button(buttonProps: ButtonProps) {
  const {
    children,
    className,
    onClick,
    kind = "primary",
    disabled,
  } = buttonProps;

  const baseStyles =
    "flex justify-center items-center gap-2 rounded-[8px] border px-[10px] py-1 transition-all duration-500 cursor-pointer";

  const kindStyles = {
    primary: "bg-orange text-essential-black hover:bg-orange-hover",
    secondary: "hover:text-green-hover border-none bg-essential-black",
  }[kind];

  const disabledStyles = disabled
    ? "opacity-35 text-gray-300 disabled:hover:text-gray-300"
    : "";

  return (
    <button
      type={buttonProps.type}
      disabled={disabled}
      className={clsx(baseStyles, kindStyles, disabledStyles, className)}
      onClick={onClick && ((e) => (e.preventDefault(), onClick()))}
    >
      {children}
    </button>
  );
}
