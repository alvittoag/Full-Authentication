"use cleint";

type Props = {
  type: "text" | "email" | "password" | "number" | "file";
  name: string;
  placeholder?: string;
  value?: string;
  disable?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input(props: Props) {
  const { type, name, placeholder, value, disable, onChange } = props;

  return (
    <input
      type={type}
      name={name}
      disabled={disable}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border border-gray-400 rounded-md py-2 pl-2 pr-20 focus:outline-none disabled:bg-gray-200 disabled:cursor-not-allowed"
    />
  );
}
