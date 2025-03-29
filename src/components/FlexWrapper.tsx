import clsx from "clsx";

interface FlexWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function FlexWrapper({ children, className }: FlexWrapperProps) {
  return <div className={clsx(`flex gap-12`, className)}>{children}</div>;
}
