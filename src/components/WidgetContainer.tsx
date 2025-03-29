import clsx from "clsx";

interface WidgetContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function WidgetContainer({
  children,
  className = "",
}: WidgetContainerProps) {
  return (
    <div
      className={clsx(
        `mx-auto flex min-h-180 flex-col justify-between gap-4 rounded-[20px] border border-gray-900 bg-gray-950 p-6`,
        className
      )}
    >
      {children}
    </div>
  );
}
