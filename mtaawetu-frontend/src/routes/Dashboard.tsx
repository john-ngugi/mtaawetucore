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

const Dashboard: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [totalReports, setTotalReports] = useState(0);
  const [mostCommonGrievance, setMostCommonGrievance] = useState("");
  const [mostCommonComplaint, setMostCommonComplaint] = useState("");
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const storedReports = localStorage.getItem("userReports");

    if (storedReports) {
      const parsedReports: Report[] = JSON.parse(storedReports);
      setReports(parsedReports);
      setTotalReports(parsedReports.length);
      
      const grievanceCounts: { [key: string]: number } = {};
      const complaintCounts: { [key: string]: number } = {};
      let pending = 0;

      parsedReports.forEach((report) => {
        // Count categories of grievance and complaint
        grievanceCounts[report.category_of_grivance] = (grievanceCounts[report.category_of_grivance] || 0) + 1;
        complaintCounts[report.category_of_complaint] = (complaintCounts[report.category_of_complaint] || 0) + 1;
        
        // Count pending grievances
        if (report.status === "Pending") pending++;
      });

      // Find the most common grievance and complaint
      setMostCommonGrievance(
        Object.keys(grievanceCounts).reduce((a, b) => 
          grievanceCounts[a] > grievanceCounts[b] ? a : b
        , "")
      );

      setMostCommonComplaint(
        Object.keys(complaintCounts).reduce((a, b) => 
          complaintCounts[a] > complaintCounts[b] ? a : b
        , "")
      );

      setPendingCount(pending);
    }
  }, []);

  return (
    <div className="bg-gray-900 text-white h-screen overflow-auto md:overflow-hidden">
      <div className="flex items-center p-5">
        <Link to="/" className="text-slate-100 hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-400">Dashboard</span>
      </div>

      <h1 className="text-slate-100 text-5xl font-bold mb-8 ps-5">Dashboard</h1>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-around p-5">
        <div className="bg-green-700 shadow-md rounded-lg p-6 m-2 w-full sm:w-1/5 text-center">
          <h3 className="font-semibold text-lg">Total Reports</h3>
          <p className="text-3xl font-bold">{totalReports}</p>
        </div>
        <div className="bg-orange-700 shadow-md rounded-lg p-6 m-2 w-full sm:w-1/5 text-center">
          <h3 className="font-semibold text-lg">Most Common Grievance</h3>
          <p className="text-xl">{mostCommonGrievance || "N/A"}</p>
        </div>
        <div className="bg-purple-700 shadow-md rounded-lg p-6 m-2 w-full sm:w-1/5 text-center">
          <h3 className="font-semibold text-lg">Most Common Complainant</h3>
          <p className="text-xl">{mostCommonComplaint || "N/A"}</p>
        </div>
        <div className="bg-blue-700 shadow-md rounded-lg p-6 m-2 w-full sm:w-1/5 text-center">
          <h3 className="font-semibold text-lg">Pending Grievances</h3>
          <p className="text-3xl font-bold">{pendingCount}</p>
        </div>
      </div>

      {/* Reports Table */}
      <div className="flex flex-col w-full p-1">
        <div className="bg-gray-700 shadow-md rounded-t-md p-5 flex flex-wrap justify-between ml-5 mr-5">
        <div className="w-full flex flex-wrap justify-between sticky  bg-gray-700 z-10 ml-5 mr-5">
            {/* <h2 className="font-semibold text-sm w-full md:w-1/5">id</h2> */}
            <h2 className="font-semibold text-sm w-full md:w-1/5">Complainant</h2>
            <h2 className="font-semibold text-sm w-full md:w-1/5">Grievance</h2>
            <h2 className="font-semibold text-sm w-full md:w-1/5">Date</h2>
            <h2 className="font-semibold text-sm w-full md:w-1/5">Status</h2>
            <h2 className="font-semibold text-sm w-full md:w-1/5">Description</h2>        
        </div>
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-gray-800 text-white rounded shadow-md mb-2 flex flex-wrap p-5 ml-5 mr-2"
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
    </div>
  );
};

export default Dashboard;
