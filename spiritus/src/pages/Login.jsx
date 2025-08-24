import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "@/context/AppContext.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import bg3 from "@/assets/assets_frontend/aurora.webp"; // Background image import

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        // Registration request
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/upload-profile-image");
        } else {
          toast.error(data.message);
        }
      } else {
        // Login request
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg3})` }}
    >
      {/* Cross Icon Button at the top-right corner */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-12 right-12 bg-gray-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-500 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <form
        onSubmit={onSubmitHandler}
        className="bg-[#242425] p-8 rounded-3xl shadow-lg w-full max-w-md text-zinc-200"
      >
        <h2 className="text-2xl font-bold mb-4">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="mb-6">
          {state === "Sign Up"
            ? "Sign up to book an appointment"
            : "Log in to book an appointment"}
        </p>
        {message && <p className="text-red-500 mb-4">{message}</p>}

        {state === "Sign Up" && (
          <div className="mb-4">
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="w-full p-2 rounded-lg border border-zinc-300 bg-[#333335] text-zinc-200"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="w-full p-2 rounded-lg border border-zinc-300 bg-[#333335] text-zinc-200"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="w-full p-2 rounded-lg border border-zinc-300 bg-[#333335] text-zinc-200"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mb-4 rounded-full bg-primary text-white font-semibold hover:bg-black"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <p className="text-center">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-primary underline cursor-pointer"
              >
                Login Here
              </span>
            </>
          ) : (
            <>
              Create a new account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-primary underline cursor-pointer"
              >
                Click Here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
