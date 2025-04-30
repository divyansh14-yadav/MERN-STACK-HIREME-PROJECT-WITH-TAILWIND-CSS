import React from 'react'

const Footer = () => {
    return (
        <div>
  <div className="mt-30 border-t border-[#0000001a]">
    <div className="w-[90%] m-auto mt-12 pb-10 flex flex-col xl:flex-row xl:justify-between gap-10">
      {/* Logo & About */}
      <div className="xl:w-[40%] w-full">
        <img
          className="w-[50%]"
          src="https://script.viserlab.com/metalance/assets/images/logo_icon/logo_dark.png"
        />
        <p className="text-start mt-4 w-[90%] text-[#5c5c5c] text-[1rem] font-normal text-justify">
          At MetaLance, we offer a transparent and seamless platform connecting freelancers and buyers, featuring a secure, low-cost payment process.
        </p>
      </div>

      {/* Categories */}
      <div className="xl:w-[15%] w-full text-start">
        <h1 className="text-[1rem] font-semibold text-[#3d3d3d]">Categories</h1>
        <a className="block mt-4 text-[#5c5c5c]" href="">Video & Animation</a>
        <a className="block mt-3 text-[#5c5c5c]" href="">Writing & Translation</a>
        <a className="block mt-3 text-[#5c5c5c]" href="">Digital Marketing</a>
      </div>

      {/* Quick Links */}
      <div className="xl:w-[15%] w-full text-start">
        <h1 className="text-[1rem] font-semibold text-[#3d3d3d]">Quick Links</h1>
        <a className="block mt-4 text-[#5c5c5c]" href="">Sign in</a>
        <a className="block mt-3 text-[#5c5c5c]" href="">Sign Up</a>
        <a className="block mt-3 text-[#5c5c5c]" href="">Blogs</a>
      </div>

      {/* Important Links */}
      <div className="xl:w-[15%] w-full text-start">
        <h1 className="text-[1rem] font-semibold text-[#3d3d3d]">Important Links</h1>
        <a className="block mt-4 text-[#5c5c5c]" href="">Privacy Policy</a>
        <a className="block mt-3 text-[#5c5c5c]" href="">Terms of Service</a>
        <a className="block mt-3 text-[#5c5c5c]" href="">Refund Policy</a>
      </div>

      {/* Subscribe */}
      <div className="xl:w-[25%] w-full text-start">
        <h1 className="text-[1rem] font-semibold text-[#3d3d3d]">Subscribe News</h1>
        <p className="mt-4 w-[90%] text-start text-justify text-[#5c5c5c] text-[1rem] font-normal">
          Stay updated with our latest news and notifications by subscribing to our site.
        </p>
      </div>
    </div>

    <div className="border-t border-[#0000001a]"></div>

    {/* Copyright */}
    <div className="w-[90%] m-auto pb-8">
      <h1 className="mt-8 text-start text-[#5c5c5c] text-[1rem] font-semibold">
        © Copyright 2025 <span className="text-[#f78318]">MetaLance.</span> All Rights Reserved
      </h1>
    </div>
  </div>
</div>

    )
}

export default Footer