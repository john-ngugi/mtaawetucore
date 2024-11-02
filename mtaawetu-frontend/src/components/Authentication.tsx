import { useState, useEffect } from "react";
import Loading from "./Loading";
import { useAuth } from "../context/useAuth";
import Message from "./MessageLoginRegister";

function Authentication() {
  const [isLogin, setIsLogin] = useState(true);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsernames] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [isResident, setIsResident] = useState(false);
  const [communicationMode, setCommunicationMode] = useState("");
  const [ward, setWard] = useState(""); 
  const [isLoading, setLoading] = useState(false);
  const { login_user, register_user, message } = useAuth();
  const [messageBox, setmessageBox] = useState(false); // Controls visibility of message box




  // Effect to show or hide the message box when the message changes
  useEffect(() => {
    if (message) {
      setmessageBox(true); // Show the message box when there's a message
    } else {
      setmessageBox(false); // Hide it when the message is empty
    }
  }, [message]);

  const handleLogin = async () => {
    setLoading(true); // Show loading when login starts
    await login_user(username, password); // Wait for login to finish
    setLoading(false); // Hide loading after login
  };


  const handleRegister = async () => {
    setLoading(true); // Show loading during registration
    await register_user(firstname, lastname, username,phonenumber,password,cpassword,ward,residency,communicationMode);
    setLoading(false); // Hide loading after registration
  };


// Toggle residency and set ward to null if not a resident
const handleCheckboxChange = () => {
  setIsResident((prev) => {
    const newResidencyStatus = !prev;
    if (!newResidencyStatus) {
      setWard("Kiogoro"); // Clear ward if becoming a non-resident
    }
    return newResidencyStatus;
  });
};

// Derived variable for displaying residency status
const residency = isResident ? "Resident" : "Non-resident";
 // Function to conditionally render the ward selection dropdown
const renderWardSelection = () => {
  if (isResident) {
    return (
      <div>
        <label
          htmlFor="ward-selection"
          className="block text-sm font-medium text-white"
        >
          Select Ward
        </label>
        <select
          id="ward-selection"
          className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => setWard(e.target.value)}
          value={ward}
        >
          <option value="">Choose a ward</option>
          <option value="Kisii Central">Kisii Central</option>
          <option value="Kitutu Central">Kitutu Central</option>
          <option value="Bobaracho">Bobaracho</option>
          <option value="Kiogoro">Kiogoro</option>
          <option value="Bogiakumu">Bogiakumu</option>
          <option value="Nyakoe">Nyakoe</option>
          <option value="Nyatieko">Nyatieko</option>
        </select>
      </div>
    );
  }
  return null;
};
  if (isLoading) {
    return <Loading>Ok, you're all set. Granting access...</Loading>; // Show loading component while logging in
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full ml-3 mr-3 md:m-0 max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
        {/* Conditionally render message box */}
        {messageBox && <Message message={message} />}

        {/* Toggle Tabs */}
        <div className="flex justify-around mb-6">
          <button
            className={`py-2 px-4 border-b-2 ${
              isLogin ? "border-blue-500 text-blue-500" : "text-gray-600"
            } focus:outline-none`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`py-2 px-4 border-b-2 ${
              !isLogin ? "border-blue-500 text-blue-500" : "text-gray-600"
            } focus:outline-none`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        {isLogin ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-white">Login</h2>
            <div>
              <label
                htmlFor="login-username"
                className="block text-sm font-medium text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="login-username"
                className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
                onChange={(e) => setUsernames(e.target.value)}
                value={username}
              />
            </div>
            
            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="login-password"
                className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-white"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        ) : (
          // Register Form
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-white">
              Register
            </h2>
            <div>
              <label
                htmlFor="register-first-name"
                className="block text-sm font-medium text-white"
              >
                First Name
              </label>
              <input
                type="text"
                id="register-first-name"
                className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="John"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstname}
              />
            </div>
            <div>
              <label
                htmlFor="register-username"
                className="block text-sm font-medium text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                id="register-last-name"
                className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Doe"
                onChange={(e) => setLastName(e.target.value)}
                value={lastname}
              />
            </div>
            <div>
              <label
                htmlFor="login-username"
                className="block text-sm font-medium text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="login-username"
                className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
                onChange={(e) => setUsernames(e.target.value)}
                value={username}
              />
            </div>
            <div>
              <label
                htmlFor="register-phone-number"
                className="block text-sm font-medium text-white"
              >
                Phone Number
              </label>
              <input
                type="number"
                id="register-phone-number"
                className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="0712345678"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phonenumber}
              />
            </div>
            
            <div>
              <label
                htmlFor="register-password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="register-password"
                className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Create a password"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your password"
                onChange={(e) => setCpassword(e.target.value)}
                value={cpassword}
              />
            </div>
            <div>
      <label className="block text-sm font-medium text-white">
        Resident Status <span className="text-xs text-gray-300">(Check if you are a resident)</span>
      </label>
      <div className="flex items-center mt-2">
        <label className="flex items-center text-white">
          <input
            type="checkbox"
            className="mr-2 text-blue-500 focus:ring-blue-500"
            checked={isResident}
            onChange={handleCheckboxChange}
          />
          Resident
        </label>
      </div>
      <p className="text-xs text-gray-400 mt-1">
        Status: {isResident ? "Resident" : "Non-resident"}
      </p>
    </div>
    {renderWardSelection()}
    <div>
  <label
    htmlFor="communication-mode"
    className="block text-sm font-medium text-white"
  >
    Preferred Mode of Communication
  </label>
  <select
    id="communication-mode"
    className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
    onChange={(e) => setCommunicationMode(e.target.value)}
    value={communicationMode}
  >
    <option value="">Choose an option</option>
    <option value="Call">Call</option>
    <option value="SMS">SMS</option>
    <option value="WhatsApp">WhatsApp</option>
  </select>
</div> 
            <button
              className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        )}
                {/* Acknowledgement */}
        <div className="mt-4 text-xs text-gray-400 text-center">
          By registering, you acknowledge that your data may be collected and stored by the Municipality 
          and used solely for the purpose of improving service delivery.
        </div>
      </div>
    </div>
  );
}

export default Authentication;
