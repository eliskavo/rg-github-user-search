import Magnifier from "./icons/Magnifier";

type SearchInputProps = {
  onSearch: (value: string) => void;
  placeholder: string;
  value: string;
};

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  onSearch,
  value,
}: SearchInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative flex-grow items-center mb-2 flex gap-2">
      <Magnifier className="absolute left-3 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="bg-essential-black h-10 w-full rounded-[8px] pl-10 text-lg text-gray-400"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};
