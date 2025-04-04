type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-1000-bg text-essential-white antialiased min-h-screen flex justify-center items-center p-6 pb-10">
      <div className="max-w-5xl w-full">{children}</div>
    </div>
  );
};
