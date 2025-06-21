import React, { useState } from "react";
import { Link } from "react-router"; // ✅ Fixed Link import
import { ShipWheelIcon } from "lucide-react";
import useSignUp from "../hooks/useSignUp";

const SignUp = () => {
  const [signupData, setsignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });


  // This is how we did it at first, without using our custom hook
  // const queryClient = useQueryClient();
  // const {
  //   mutate: signupMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: signup,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  // This is how we did it using our custom hook - optimized version
  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* SIGNUP form - left side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary " />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

          {/* error message if any */}

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="w-full space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Create an Account</h2>
              <p>Join Streamify and start your language learning adventure!</p>
            </div>

            {/* Full Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered w-full"
                value={signupData.fullName}
                onChange={(e) =>
                  setsignupData({
                    ...signupData,
                    fullName: e.target.value, // ✅ Correct key
                  })
                }
                required
              />
            </div>

            {/* Email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                value={signupData.email}
                onChange={(e) =>
                  setsignupData({ ...signupData, email: e.target.value })
                }
                required
              />
            </div>

            {/* Password */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered w-full"
                value={signupData.password}
                onChange={(e) =>
                  setsignupData({ ...signupData, password: e.target.value })
                }
                required
              />
              <p className="text-xs opacity-70 mt-2 ml-2">
                Password must be at least 6 characters
              </p>
            </div>

            {/* Checkbox */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  required
                />
                <span className="text-xs leading-tight">
                  I agree to the{" "}
                  <span className="text-primary hover:underline">
                    terms of services
                  </span>{" "}
                  and{" "}
                  <span className="text-primary hover:underline">
                    privacy policy
                  </span>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button className="btn btn-primary w-full" type="submit">
              {isPending ? "Signing Up... " : "Create Account"}
            </button>

            {/* Link to Login */}
            <div className="text-center mt-4 ">
              <p className="text-sm">
                Already have an account?{" "}
                <Link to={"/login"} className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* signup form - right side */}

        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/Video call-bro.png" alt="video call image" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve and language
                skills together{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
