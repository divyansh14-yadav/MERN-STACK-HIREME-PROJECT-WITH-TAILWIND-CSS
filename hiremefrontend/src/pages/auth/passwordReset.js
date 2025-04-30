import React, { useState } from 'react'
import Nav from '../../components/nav'
import CategorySlider from '../../components/category'
import authConfig from '../../api/config'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { PasswordResetValidation } from '../../validations/RegisterValidation'

const PasswordReset = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirm_password, setConfirmPassword] = useState("")

    const navigate = useNavigate()


    const handleForgetResetPassword = async (event) => {
        event.preventDefault()

        try {
            await PasswordResetValidation.validate(
                {
                    email,
                    newPassword,
                    confirm_password
                },
                { abortEarly: false }
            );
            const response = await authConfig.post("/reset-password", {
                email,
                newPassword,
                confirm_password
            })
            if (response.status === 200) {
                // alert("Reset password succesfully")
                toast.success("Reset password set succesfully")
                setEmail("")
                setNewPassword("")
                setConfirmPassword("")
                navigate("/signIn")
            }
            console.log(response, "forgetResponse");
        } catch (error) {
            if (error.name === "ValidationError") {
                error.errors.forEach((err) => toast.error(err));
                return;
            }
            if (error.response.data.message === "no details found") {
                // return alert("No details found")
                toast.error("No details found")
            }
            else if (error.response.data.message === "confirm password are not matched") {
                alert("Confirm password are not matched")
                toast.error("Confirm password are not matched")
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
      
                <form onSubmit={handleForgetResetPassword} className="space-y-6">
                  {/* Email Field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-medium">
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
      
                  {/* New Password Field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-medium">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="appearance-none rounded-md border border-gray-300 px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#f78318] focus:border-[#f78318]"
                      placeholder="Enter new password"
                      required
                    />
                  </div>
      
                  {/* Confirm Password Field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-medium">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      value={confirm_password}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="appearance-none rounded-md border border-gray-300 px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#f78318] focus:border-[#f78318]"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
      
                  {/* Submit Button */}
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

export default PasswordReset