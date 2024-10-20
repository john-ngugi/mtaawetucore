import { ReactNode } from "react";

interface LoadingProps {
  children?: ReactNode; // Accept children as a prop
}

const Loading = ({ children }: LoadingProps) => {
  return (
    <div className="bg-gray-900 loader absolute inset-0 flex flex-col justify-center items-center h-dvh">
      <div className="relative flex items-center">
        {/* First bar */}
        <div className="bg-blue-600 w-[13.6px] h-[32px] absolute left-[-19.992px] animate-bounce-individual delay-[0ms]"></div>
        {/* Second (center) bar */}
        <div className="bg-blue-600 w-[13.6px] h-[32px] animate-bounce-individual delay-[160ms]"></div>
        {/* Third bar */}
        <div className="bg-blue-600 w-[13.6px] h-[32px] absolute left-[19.992px] animate-bounce-individual delay-[320ms]"></div>
      </div>
      {/* Display the children prop content */}
      <div className="text-white mt-4 font-bold">{children}</div>
    </div>
  );
};

export default Loading;
