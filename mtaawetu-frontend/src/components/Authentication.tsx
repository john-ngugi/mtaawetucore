import { useState } from "react";

import { useAuth } from "../context/useAuth";

function Authentication() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setusernames] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  // const [message, setmessage] = useState("");
  const [email, setEmail] = useState("");
  const { login_user } = useAuth();
  const { register_user } = useAuth();
  const handleLogin = () => {
    login_user(username, password);
    console.log("clicked");
  };

  const handleRegister = () => {
    register_user(username, password, email, cpassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
        {/* <div className="w-full bg-orange-500 p-5 ">{message}</div> */}
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
                htmlFor="login-email"
                className="block text-sm font-medium text-white"
              >
                Username
              </label>
              <input
                type="email"
                id="login-email"
                className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
                onChange={(e) => setusernames(e.target.value)}
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
                htmlFor="login-email"
                className="block text-sm font-medium text-white"
              >
                Username
              </label>
              <input
                type="email"
                id="login-email"
                className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
                onChange={(e) => setusernames(e.target.value)}
                value={username}
              />
            </div>
            <div>
              <label
                htmlFor="register-email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="register-email"
                className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
            <button
              className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Authentication;

// Usage in App.js

// import Authentication from './Authentication';

// function App() {
//   return (
//     <div className="App">
//       <Authentication />
//     </div>
//   );
// }
