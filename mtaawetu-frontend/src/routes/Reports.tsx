import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Report {
  id: number;
  grivance_description: string;
  category_of_complaint: string;
  category_of_grivance: string;
  status: string;
  date: Date;
}

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    // Retrieve reports from localStorage
    const storedReports = localStorage.getItem("userReports");

    if (storedReports) {
      setReports(JSON.parse(storedReports));
    }
  }, []);

  return (
    <div className="bg-gray-900 text-white h-screen overflow-auto">
      <div className="flex items-center p-5">
        <Link to="/" className="text-slate-100 hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-400">My Reports</span>
      </div>

      <h1 className="text-slate-100 text-5xl font-bold mb-4 h-1/4 flex flex-col justify-center ps-5">
        My Reports
      </h1>

      <div className="flex flex-col w-screen">
        <div className="bg-gray-700 shadow-md rounded-t-md p-5 flex flex-wrap justify-between ml-5 mr-5">
          <h2 className="font-semibold text-sm w-full md:w-1/5">Complaint</h2>
          <h2 className="font-semibold text-sm w-full md:w-1/5">Grievance</h2>
          <h2 className="font-semibold text-sm w-full md:w-1/5">Date</h2>
          <h2 className="font-semibold text-sm w-full md:w-1/5">Status</h2>
          <h2 className="font-semibold text-sm w-full md:w-1/5">Description</h2>
        </div>

        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-gray-800 text-white rounded shadow-md mb-2 flex flex-wrap p-5 ml-5 mr-5"
          >
            <p className="w-full md:w-1/5">{report.category_of_complaint}</p>
            <p className="w-full md:w-1/5">{report.category_of_grivance}</p>
            <p className="w-full md:w-1/5">
              {new Date(report.date).toLocaleDateString()}
            </p>
            <p
              className={`w-full md:w-1/5 ${
                report.status === "Pending"
                  ? "text-orange-500"
                  : report.status === "Resolved"
                  ? "text-green-500"
                  : "text-white"
              }`}
            >
              {report.status}
            </p>
            <p className="w-full md:w-1/5">{report.grivance_description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
