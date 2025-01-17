import React, { useContext, useEffect, useState } from "react";
import Lottie from "lottie-react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import loginAnimation from "../../assets/Auth/login.json";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [captchaMessage, setCaptchaMessage] = useState("");
  const { signInUser } = useContext(AuthContext);

  const navigate = useNavigate(); // For programmatic navigation
  const location = useLocation(); // Access current location
  const from = location.state?.from?.pathname || "/"; // Determine the redirect path
  console.log("login page location state",location.state);
  // Load the captcha on component mount
  useEffect(() => {
    loadCaptchaEnginge(6); // 6-character captcha
  }, []);

  // Handle Login Form Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signInUser(email, password);
      Swal.fire({
        title: "Successfully Logged In!",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate( from, { replace: true }); // Redirect to the intended page
      console.log("Logged-in user:", result.user);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
      console.error("Login Error:", error);
    }
  };

  // Handle Captcha Validation
  const handleCaptchaValidate = (e) => {
    const captchaValue = e.target.value;

    if (validateCaptcha(captchaValue)) {
      setIsDisabled(false);
      setCaptchaMessage("Captcha Matched ✅");
    } else {
      setIsDisabled(true);
      setCaptchaMessage("Captcha Does Not Match ❌");
    }
  };

  return (
    <>
      {/* Page Title */}
      <Helmet>
        <title>Bistro Boss Restaurant | Login</title>
      </Helmet>

      {/* Login Page */}
      <div className="hero bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 min-h-screen">
        <div className="hero-content flex items-center">
          {/* Animation Section */}
          <div className="w-1/2 hidden lg:block">
            <Lottie animationData={loginAnimation} loop autoPlay />
          </div>

          {/* Login Form Section */}
          <div className="card bg-white shadow-xl rounded-lg p-6 lg:p-8 w-full max-w-md">
            <h1 className="text-4xl font-bold text-center text-indigo-600 mb-4">
              Welcome Back!
            </h1>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered input-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
                  aria-label="Email"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered input-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
                  aria-label="Password"
                  required
                />
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link link-hover text-primary font-semibold"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>

              {/* Captcha Validation */}
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  name="captcha"
                  type="text"
                  onBlur={handleCaptchaValidate}
                  placeholder="Type the captcha above."
                  className="input input-bordered input-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
                  aria-label="Captcha"
                  required
                />

                {/* Captcha Message */}
                {captchaMessage && (
                  <p
                    className={`mt-2 text-sm ${
                      isDisabled ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {captchaMessage}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <input
                  type="submit"
                  disabled={isDisabled}
                  value="Login"
                  className="btn btn-primary hover:bg-primary-focus w-full disabled:opacity-50"
                />
              </div>
            </form>
          <div>
            <SocialLogin></SocialLogin>
          </div>
            {/* Redirect to Sign Up */}
            <p className="text-center mt-4 text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signUp"
                className="text-primary font-semibold link-hover"
              >
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
