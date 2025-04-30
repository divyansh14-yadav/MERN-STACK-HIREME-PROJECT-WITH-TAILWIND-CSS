import React, { useState } from 'react'
import Nav from '../../components/nav'
import CategorySlider from '../../components/category'
import authConfig from '../../api/config'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { forgetPasswordValidation } from '../../validations/RegisterValidation'

const ResetPassword = () => {
    const [email, setEmail] = useState("")

    const navigate = useNavigate()


    const handleForgetResetSendMail = async (event) => {
        event.preventDefault()

        try {
             await forgetPasswordValidation.validate(
                    {
                      email,
                    },
                    { abortEarly: false }
                  );
            const response = await authConfig.post("forget-password", {
                email
            })
            if (response.status === 200) {
                // alert("OTP send to your email")
                toast.success("OTP send to your email")
                setEmail("")
                navigate("/verifyOtp")
            }
            console.log(response, "forgetResponse");
        } catch (error) {
            if (error.name === "ValidationError") {
                    error.errors.forEach((err) => toast.error(err));
                    return;
                  }
            if (error.response.data.message === "User not found") {
                // return alert("User not found")
                toast.error("User not found")
            }
            else if (error.response.data.message === "Failed to send OTP") {
                // alert("Failed to send OTP")
                toast.error("Failed to send OTP")
            }
        }

    }

    return (
        <div className="min-h-screen flex flex-col">
          <Nav />
          <CategorySlider />
      
          <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div className="bg-white shadow-md rounded-2xl p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  Account Recovery
                </h1>
      
                <p className="text-gray-600 text-center mb-8 text-sm">
                  To recover your account, please provide your email or username to find your account.
                </p>
      
                <form onSubmit={handleForgetResetSendMail} className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-medium text-start">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none rounded-md border border-gray-300 px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#f78318] focus:border-[#f78318]"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
      
                  <button
                    type="submit"
                    className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#f78318] hover:bg-[#e97307] font-semibold transition duration-200"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
      
}

export default ResetPassword