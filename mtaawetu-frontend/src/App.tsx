import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginComponent from "./routes/Login";
import LandingPage from "./routes/LandingPage";
import ReportsPage from "./routes/Reports";
import { AuthProvider } from "./context/useAuth";
import PrivateRoute from "./components/private_route";

function App() {
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
