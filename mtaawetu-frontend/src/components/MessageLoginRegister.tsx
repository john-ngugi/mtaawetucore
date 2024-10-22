import { X } from "lucide-react"; // Importing the X icon from lucide-react
import { useState } from "react";

interface messageProps {
  message: string;
}

function Message({ message }: messageProps) {
  const [visible, setVisible] = useState(true); // State to control visibility

  // Handle close button click
  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) return null; // Hide the message when visible is false

  return (
    <div className="flex items-center justify-between w-full bg-red-500 p-5 rounded-md">
      <span>{message}</span>
      <button
        onClick={handleClose}
        className="ml-4 text-white hover:text-gray-200"
        aria-label="Close message"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

export default Message;
