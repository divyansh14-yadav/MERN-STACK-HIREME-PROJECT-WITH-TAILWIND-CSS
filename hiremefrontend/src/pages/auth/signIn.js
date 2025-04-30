import axios from 'axios'
import React, { useState } from 'react'
import authConfig from '../../api/config'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { LoginValidation } from '../../validations/RegisterValidation';
const SignIn = () => {

  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await LoginValidation.validate(
        {
          email,
          password,
        },
        { abortEarly: false }
      );
      const response = await authConfig.post("loginAuth", {
        email: email,
        password,
      })
      if (response.status === 200) {
        // alert("Login Succesfully")
        toast.success("Login Succesfully")
        setEmail("")
        setPassword("")
        navigate("/basicInfo")
      }

      const token = response.data.token

      const authId = response.data.authId

      const firstNameAuth = response.data.firstName

      // const message = response.data.message

      localStorage.setItem("token", JSON.stringify(token))
      localStorage.setItem("authId", JSON.stringify(authId))
      // localStorage.setItem("authId", JSON.stringify(email))
      // localStorage.setItem("message",JSON.stringify(message))
      localStorage.setItem("firstName", JSON.stringify(firstNameAuth))

      console.log(response, "registerResponse");
    } catch (error) {
      if (error.name === "ValidationError") {
        error.errors.forEach((err) => toast.error(err));
        return;
      }
      if (error.response.data.message === "details are not matched") {
        // return alert("details are not matched")
        return toast.error("details are not matched")

      }
    }

  }


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 relative bg-gray-900 text-white">
        <img
          src="https://script.viserlab.com/metalance/assets/images/frontend/register/6638784de34751714976845.jpg"
          className="w-full h-full object-cover absolute inset-0 opacity-70"
          alt="Sign in visual"
        />
        <div className="relative z-10 p-10 space-y-6 mt-50">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Welcome Back! Let’s Dive In & Sign In Now
          </h1>
          <p className="text-sm md:text-base">
            Explore limitless opportunities, flexible work structures, and secure payments – all in one powerful freelance platform.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Logo Design", "Illustration", "Website Development", "Social Media Marketing"].map((item, index) => (
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
                "662f39ad8af6c1714370989.png"
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
            Don’t have an account?
            <Link to="/signUp" className="text-[#f78318] font-medium ml-1">SignUp</Link>
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In <span className="text-[#f78318]">Now</span></h2>
        <p className="text-sm text-gray-500 mb-8">
          Enter a realm of endless possibilities, flexible work options, and secure transactions within our freelance hub.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username / Email <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
              
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password <span className="text-red-500">*</span></label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
              
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="accent-[#f78318]"  />
              Remember Me
            </label>
            <Link to="/forgetPassword" className="text-[#f78318] underline">
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#f78318] hover:bg-orange-600 text-white rounded-md font-semibold transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )

}

export default SignIn