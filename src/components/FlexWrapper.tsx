import clsx from "clsx";

interface FlexWrapperProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function FlexWrapper({ children, className }: FlexWrapperProps) {
  return <div className={clsx(`flex gap-12`, className)}>{children}</div>;
}
