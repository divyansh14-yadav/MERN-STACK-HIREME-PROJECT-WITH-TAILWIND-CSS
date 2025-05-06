import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignUpProfile from "./signUpProfile";
import authConfig from "../../api/config";
import Nav from "../../components/nav";
import { toast } from "react-toastify";
import { RegisterValidation } from "../../validations/RegisterValidation";
const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [agreeTerms, setagreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await RegisterValidation.validate(
        {
          firstName,
          lastName,
          email,
          password,
          confirm_password,
          agreeTerms,
        },
        { abortEarly: false }
      );
      const response = await authConfig.post("temp-register", {
        firstName,
        lastName,
        email,
        password,
        confirm_password,
      });
      if (response.status === 200) {
        // alert("Register Succesfully")
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirm_password("");
        setagreeTerms(true);
        navigate("/s", {
          state: { firstName: response.data.tempUser.firstName},
        });
      }
      console.log(response, "registerResponse");
    } catch (error) {
      if (error.name === "ValidationError") {
        error.errors.forEach((err) => toast.error(err));
        return;
      } else if (error.response.data.message === "already have an account") {
        // return alert("already have account")
        return toast.error("Already have an account");
      } else if (
        error.response.data.message === "confirm_password are not matched"
      ) {
        // alert("password not matched")
        return toast.error("confirm_password are not matched");
      }
    }
  };

  <SignUpProfile
    data={{ firstName, lastName, email, password, confirm_password }}
  />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 relative bg-gray-900 text-white">
        <img
          src="https://script.viserlab.com/metalance/assets/images/frontend/register/6638784de34751714976845.jpg"
          className="w-full h-full object-cover absolute inset-0 opacity-70"
          alt="Sign up visual"
        />
        <div className="relative z-10 p-10 space-y-6 mt-50">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Join Now to Start Your Freelance Journey!
          </h1>
          <p className="text-sm md:text-base">
            Craft Your Professional Identity. Showcase Your Skills and Expertise
            to Attract Clients and Opportunities.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              "Logo Design",
              "Illustration",
              "Website Development",
              "Social Media Marketing",
            ].map((item, index) => (
              <a
                key={index}
                href="#"
                className="bg-white/20 px-4 py-1 text-sm rounded-md border border-white/30 hover:bg-red-500 transition"
              >
                {item}
              </a>
            ))}
          </div>
          <marquee direction="right" scrollamount="5" className="pt-6">
            <div className="flex items-center gap-10">
              {[
                "662f399ef03071714370974.png",
                "662f39d272ab81714371026.png",
                "662f39e2d4e771714371042.png",
                "662f39a6a80d91714370982.png",
                "662f39943ae351714370964.png",
                "662f39db6d1a91714371035.png",
                "662f39ad8af6c1714370989.png",
              ].map((img, idx) => (
                <img
                  key={idx}
                  className="h-10"
                  src={`https://script.viserlab.com/metalance/assets/images/frontend/partner/${img}`}
                  alt="partner"
                />
              ))}
            </div>
          </marquee>
        </div>
      </div>

      <div className="w-full md:w-1/2 px-6 md:px-16 py-12 bg-white">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <img
              src="https://script.viserlab.com/metalance/assets/images/logo_icon/logo_dark.png"
              className="w-32"
              alt="Logo"
            />
          </Link>
          <p className="text-sm text-gray-600">
            Already have an account?
            <Link to="/signIn" className="text-[#f78318] font-medium ml-1">
              SignIn
            </Link>
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Sign Up <span className="text-[#f78318]">Now</span>
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Unlock Your Potential and Connect with Endless Freelance
          Possibilities.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={firstName.toLowerCase()}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={lastName.toLowerCase()}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email.toLowerCase()}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={confirm_password}
                onChange={(e) => setConfirm_password(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              value={agreeTerms}
              className="mt-1"
              onChange={(e) => setagreeTerms(true)}
              checked={agreeTerms}
            />
            <p className="text-sm text-gray-600">
              By proceeding, you agree to the{" "}
              <a href="#" className="text-[#f78318]">
                Privacy Policy
              </a>
              ,
              <a href="#" className="text-[#f78318] ml-1">
                Terms of Service
              </a>
              , and
              <a href="#" className="text-[#f78318] ml-1">
                Refund Policy
              </a>
              .
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#f78318] hover:bg-orange-600 text-white rounded-md font-semibold transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
