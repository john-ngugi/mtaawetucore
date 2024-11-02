import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginComponent from "./routes/Login";
import LandingPage from "./routes/LandingPage";
import ReportsPage from "./routes/Reports";
import Dashboard from "./routes/Dashboard";
import { AuthProvider } from "./context/useAuth";
import PrivateRoute from "./components/private_route";
import LoadingPage from "./routes/LoadingPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading process (e.g., fetching data, initializing auth)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 2 seconds (or after data fetch)
    }, 2000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // Show loading page while the app is loading
    return <LoadingPage />;
  }

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route
            path="/Reports"
            element={
              <PrivateRoute>
                <ReportsPage />
              </PrivateRoute>
            }
          ></Route>
                    <Route
            path="/Dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <LandingPage />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
