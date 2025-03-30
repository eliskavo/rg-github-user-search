import clsx from "clsx";

interface WidgetContainerProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function WidgetContainer({ children, className }: WidgetContainerProps) {
  return (
    <div
      className={clsx(
        `mx-auto flex min-h-180 flex-col rounded-[20px] border border-gray-900 bg-gray-950 p-6`,
        className
      )}
    >
      {children}
    </div>
  );
}
