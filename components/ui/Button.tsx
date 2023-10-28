type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit";
  outline?: boolean;
  disable?: boolean;
};

export default function Button(props: Props) {
  const { children, onClick, type, outline, disable } = props;

  return (
    <button
      onClick={onClick}
      disabled={disable}
      type={type}
      className={`${
        outline
          ? "border border-gray-600 text-slate-900"
          : "bg-slate-900 text-white"
      }  px-5 py-2 rounded-md disabled:cursor-not-allowed disabled:bg-gray-500 `}
    >
      {children}
    </button>
  );
}
