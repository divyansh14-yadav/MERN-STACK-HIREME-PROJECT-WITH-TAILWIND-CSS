import React, { useState } from 'react'
import Nav from '../../components/nav'
import CategorySlider from '../../components/category'
import authConfig from '../../api/config'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { OtpValidation } from '../../validations/RegisterValidation'

const VerifyOtp = () => {

    const [otp, setOtp] = useState("")

    const navigate = useNavigate()

    const handleForgetResetVerify = async (event) => {
        event.preventDefault()

        try {
            await OtpValidation.validate(
                {
                    otp,
                },
                { abortEarly: false }
            );
            const response = await authConfig.post("verify-otp", {
                otp
            })
            if (response.status === 200) {
                toast.success("OTP verfied sucessfully")
                // alert("OTP verfied sucessfully")
                setOtp("")
                navigate("/resetPassword")
            }
            console.log(response, "forgetResponse");
        } catch (error) {
            if (error.name === "ValidationError") {
                error.errors.forEach((err) => toast.error(err));
                return;
            }
            if (error.response.data.message === "Invalid OTP") {
                // return alert("Invalid OTP")
                toast.error("Invalid OTP")
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
                  Verify Email Address
                </h1>
      
                <p className="text-gray-600 text-center mb-8 text-sm">
                  A 6 digit verification code sent to your email address: [***]
                </p>
      
                <form onSubmit={handleForgetResetVerify} className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-medium">
                      Verification Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      autoComplete="off"
                      className="appearance-none rounded-md border border-gray-300 px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#f78318] focus:border-[#f78318]"
                      placeholder="Enter your 6-digit code"
                      required
                    />
                  </div>
      
                  <button
                    type="submit"
                    className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#f78318] hover:bg-[#e97307] font-semibold transition duration-200"
                  >
                    Submit
                  </button>
      
                  <p className="text-center text-gray-500 text-sm mt-6">
                    Please check including your Junk/Spam folder. If not found,&nbsp;
                    <a href="/forgetPassword" className="text-[#f78318] hover:underline">
                      Try to send again
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
      
}

export default VerifyOtp