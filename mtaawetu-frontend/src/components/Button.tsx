interface props {
  onClick: () => void;
  text: string;
}

function Btn({ onClick, text }: props) {
  return (
    <button
      className="rounded-md  bg-green-600 px-1 py-1 font-semibold text-white shadow-md h-full hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Btn;
