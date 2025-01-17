import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import bgBanner from "../../assets/others/authentication.png";
import animation from "../../assets/others/authentication2.png";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { createUser, userUpdateProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Passwords do not match!",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;
      console.log(loggedUser); 
      await userUpdateProfile(data.name, data.photoUrl);
      const userInfo ={
        name:data.name,
        email:data.email
      }
      axiosPublic.post('/users',userInfo)
      .then(res =>{
        console.log('user added from database',res.data);
        if(res.data.insertedId){

          Swal.fire({
            title: "Account Created Successfully!",
            icon: "success",
            confirmButtonText: "Ok",
          });
          reset();
          navigate("/");  
        }
      })  
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.error("Error:", err.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss Restaurant | Sign Up</title>
      </Helmet>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bgBanner})` }}
      >
        <div className="flex flex-col md:flex-row items-center">
          {/* Form Container */}
          <div className="card bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
              Create an Account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  {...register("name", {
                    required: "Name is required",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Name can only contain letters and spaces",
                    },
                  })}
                  type="text"
                  placeholder="Enter your full name"
                  className="input input-bordered input-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>

              {/* Photo URL Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Photo URL</span>
                </label>
                <input
                  {...register("photoUrl", {
                    required: "Photo URL is required",
                    pattern: {
                      value:
                        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                      message: "Please enter a valid URL",
                    },
                  })}
                  type="text"
                  placeholder="Enter a valid Photo URL"
                  className="input input-bordered input-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
                  aria-invalid={errors.photoUrl ? "true" : "false"}
                />
                {errors.photoUrl && (
                  <span className="text-red-500">
                    {errors.photoUrl.message}
                  </span>
                )}
              </div>

              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered input-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>

              {/* Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    maxLength: {
                      value: 10,
                      message: "Password must not exceed 10 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                      message:
                        "Password must include one lowercase, one uppercase, one digit, and one special character",
                    },
                  })}
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered input-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Confirm Password</span>
                </label>
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                  })}
                  type="password"
                  placeholder="Confirm your password"
                  className="input input-bordered input-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Sign Up"
                  className="btn btn-primary hover:bg-primary-focus w-full"
                />
              </div>
            </form>
            <div>
              <SocialLogin></SocialLogin>
            </div>
            {/* Additional Info */}
            <p className="text-center mt-4 text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-primary font-semibold link-hover"
              >
                Log in here
              </a>
            </p>
          </div>

          {/* Animation Image */}
          <div className="mt-6 md:mt-0 md:ml-8">
            <img
              src={animation}
              alt="Authentication Illustration"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400x300";
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
