import React, { useState } from 'react'
import CategorySlider from '../../components/category'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import authConfig from '../../api/config'
import { toast } from "react-toastify";
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import { RegisterProfileValidation } from '../../validations/RegisterValidation'

const SignUpProfile = (data) => {
    const [firstName, setFirstName] = useState("")
    const [country, setCountry] = useState("")
    const [mobile_number, setMobile] = useState("")
    const [address, setAddress] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [zip_code, setZipCode] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await RegisterProfileValidation.validate({
                firstName,
                country,
                mobile_number,
                address,
                state,
                city,
                zip_code
            },{ abortEarly: false })
            const response = await authConfig.post("registerAuth", {
                firstName,
                country,
                mobile_number,
                address,
                state,
                city,
                zip_code,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                confirm_password: data.confirm_password
            })
            if (response.status === 200) {
                // alert("Register Succesfully")
                toast.success("Register Succesfully")

                setFirstName("")
                setCountry("")
                setMobile("")
                setAddress("")
                setState("")
                setCity("")
                setZipCode("")
                navigate("/signIn")
            }
            console.log(response, "registerResponse");
        } catch (error) {
            if (error.name === "ValidationError") {
                error.errors.forEach((err) => toast.error(err));
                return;
            }
            if (error.response.data.message === "please correct your firstName") {
                // return alert("please correct your firstName")
                return toast.warn("First name is invalid")
            }
        }

    }

    return (
        <div className="min-h-screen flex flex-col">
          <Nav />
          <CategorySlider />
      
          <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl space-y-8">
              <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  Complete your Profile
                </h1>
      
                {/* Username */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 font-medium">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="appearance-none rounded-md border border-gray-300 px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#f78318] focus:border-[#f78318]"
                    placeholder="Enter username"
                    required
                  />
                </div>
      
                {/* Country and Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-medium">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="appearance-none rounded-md border border-gray-300 px-4 py-3 w-full text-gray-900 focus:outline-none focus:ring-[#f78318] focus:border-[#f78318]"
                      placeholder="Enter country"
                      required
                    />
                  </div>
      
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-medium">
                      Mobile <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={mobile_number}
                      onChange={(e) => setMobile(e.target.value)}
                      className="appearance-none rounded-md border border-gray-300 px-4 py-3 w-full text-gray-900 focus:outline-none focus:ring-[#f78318] focus:border-[#f78318]"
                      placeholder="Enter mobile number"
                      required
                    />
                  </div>
                </div>
      
                {/* Address and State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-medium">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="appearance-none rounded-md border border-gray-300 px-4 py-3 w-full text-gray-900 focus:outline-none focus:ring-[#f78318] focus:border-[#f78318]"
                      placeholder="Enter address"
                      required
                    />
                  </div>
      
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-medium">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="appearance-none rounded-md border border-gray-300 px-4 py-3 w-full text-gray-900 focus:outline-none focus:ring-[#f78318] focus:border-[#f78318]"
                      placeholder="Enter state"
                      required
                    />
                  </div>
                </div>
      
                {/* Zip Code and City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-medium">
                      Zip Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={zip_code}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="appearance-none rounded-md border border-gray-300 px-4 py-3 w-full text-gray-900 focus:outline-none focus:ring-[#f78318] focus:border-[#f78318]"
                      placeholder="Enter zip code"
                      required
                    />
                  </div>
      
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-medium">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="appearance-none rounded-md border border-gray-300 px-4 py-3 w-full text-gray-900 focus:outline-none focus:ring-[#f78318] focus:border-[#f78318]"
                      placeholder="Enter city"
                      required
                    />
                  </div>
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
      
          <Footer />
        </div>
      );
      
}

export default SignUpProfile