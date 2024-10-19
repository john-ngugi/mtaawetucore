import { useState } from "react";
import KisiiForm from "../components/KisiiForm";
import { make_report } from "../endpoints/api";

interface Props {
  lat: number | null;
  lng: number | null;
  onLocationSelect: (lng: number, lat: number) => void;
  isVisible: boolean;
  onClose: () => void;
}

function BottomSlidePanel({ lat, lng, isVisible, onClose }: Props) {
  const [isPopVisible, setIsPopVisible] = useState(false); // State to manage visibility
  const [categoryOfComplaint, setCategoryOfComplaint] = useState(""); // Complaint category state
  const [categoryOfGrievance, setCategoryOfGrievance] = useState(""); // Grievance category state
  const [grievanceDescription, setGrievanceDescription] = useState(""); // Text area state

  const handleClose = () => {
    setIsPopVisible(false); // Hide the message when the button is clicked
  };
  const handleFormSubmit = async () => {
    if (!lat || !lng) {
      alert("Please select a valid location.");
      return;
    }

    if (!categoryOfComplaint || categoryOfComplaint === "") {
      alert("Please select a category of complaint.");
      return;
    }

    if (!categoryOfGrievance || categoryOfGrievance === "") {
      alert("Please select a category of grievance.");
      return;
    }

    console.log(
      lng,
      lat,
      grievanceDescription,
      categoryOfGrievance,
      categoryOfComplaint
    );

    // Submit the form data
    const submittedForm = await make_report(
      lng,
      lat,
      grievanceDescription,
      categoryOfGrievance,
      categoryOfComplaint
    );

    if (submittedForm) {
      setIsPopVisible(true); // Show success message
    } else {
      alert("Failed to submit the form.");
    }
  };

  return (
    <>
      <div
        className={`w-full md:right-0 rounded-t-lg z-10 fixed bottom-0 md:h-1/2 h-72 bg-gray-900 shadow-lg transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <section className="issues-form-section rounded h-full">
          <div className="w-full h-full p-5">
            <div
              className="flex justify-between items-center"
              id="issues-header"
            >
              <h3 className="title-name text-white text-lg font-semibold">
                Location: {lat} <span className="mr-2">{lng}</span>
              </h3>
              <button
                className="text-center outline pl-2 pr-2 outline-1 rounded outline-gray-400 close-button text-gray-400 hover:text-white hover:bg-green-600"
                onClick={onClose}
                aria-label="Close"
              >
                <span className="close-icon text-2xl text-center">&times;</span>
              </button>
            </div>
            <hr className="my-2" />
            {isPopVisible && (
              <div className="rounded-sm message-info-popup p-1 md:p-3 bg-green-700 flex flex-row justify-between">
                <p className="text-sm text-white md:text-base">
                  Your issues were submitted successfully
                </p>
                <button
                  className="text-center outline p-1 m-1 md:pl-2 md:pr-2 outline-1 rounded outline-white close-button text-white hover:text-white hover:bg-green-600"
                  onClick={handleClose}
                  aria-label="Close"
                >
                  <span className="close-icon md:text-2xl text-center">
                    &times;
                  </span>
                </button>
              </div>
            )}
            <div className="rounded overflow-y-auto h-full bg-gray-900 p-4 shadow-inner">
              <form
                id="popupForm"
                className="flex flex-col text-gray-700 font-semibold"
              >
                <div className="flex flex-col md:justify-around">
                  <KisiiForm
                    options={[
                      "Residents",
                      "Traders",
                      "Project Implementers",
                      "Funding Agencies",
                      "Other Interested Parties",
                    ]}
                    heading="Category of Complaint"
                    onChange={(value: string) => setCategoryOfComplaint(value)} // Capture complaint
                  />
                  <KisiiForm
                    options={[
                      "Service Related",
                      "Project Related",
                      "Enforcement Related",
                      "Revenue Related",
                      "Approval Related",
                    ]}
                    heading="Category of Grievance"
                    onChange={(value: string) => setCategoryOfGrievance(value)} // Capture grievance
                  />
                  <div className="flex flex-col mt-4">
                    <label
                      htmlFor="otherIssues"
                      className="text-white mb-2 font-semibold"
                    >
                      What are the main problems in this neighbourhood?
                    </label>
                    <textarea
                      className="p-3 text-sm w-full rounded h-28 text-gray-600 border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
                      id="otherIssues"
                      rows={3}
                      value={grievanceDescription}
                      onChange={(e) => setGrievanceDescription(e.target.value)} // Capture text
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-center mt-5">
                  <input
                    className="w-full rounded-md px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 transition duration-300 md:w-1/2"
                    type="button"
                    value="Submit"
                    onClick={handleFormSubmit} // Call form submission handler
                  />
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default BottomSlidePanel;
