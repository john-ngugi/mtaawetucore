import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";

interface Props {
  username: string;
}

export default function MyModal({ username }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const modalPreference = localStorage.getItem(`${username}_modal`);
    if (modalPreference === "closed") {
      setIsOpen(false);
    }
  }, [username]);

  function closeModal() {
    setIsOpen(false);
    localStorage.setItem(`${username}_modal`, "closed");
  }

  function openModal() {
    setIsOpen(true);
    localStorage.removeItem(`${username}_modal`);
  }

  return (
    <>
      {/* Button to open the modal manually */}
      <div className="fixed inset-0 flex items-center justify-start h-10 mt-28 mr-52 ml-2">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/40 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none"
        >
          Open Instructions
        </button>
      </div>

      {/* Modal structure */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        {/* The backdrop */}
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        {/* Full-screen container to center the dialog panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 bg-white p-12 rounded-lg shadow-xl">
            <DialogTitle className="text-lg font-bold">
              Welcome to the Issue Reporting Tool
            </DialogTitle>
            <Description>
              Here’s how you can use the map to report issues, find locations,
              and manage your account:
            </Description>
            <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
              <li>
                Click on the map to select a location for reporting an issue.
              </li>
              <li>Use zoom controls or gestures to navigate the map.</li>
              <li>Submit a report using the form that appears.</li>
              <li>
                Check the status of your reports or change settings in the menu.
              </li>
              <li>
                Change the map theme from the <strong>Base Maps</strong> tab.
              </li>
            </ul>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                onClick={closeModal}
              >
                Got it, thanks!
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
