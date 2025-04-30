import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const FeaturedCategory = (featured) => {
  console.log(featured, "feature456");

  const sliderRef = useRef(null);

  const CustomPrevArrow = ({ onClick }) => (
    <button
      className="group absolute top-[65%] xl:right-[97.5%] right-[92%] transform -translate-y-1/2 z-10 text-black bg-white p-2 rounded-full shadow-md hover:bg-[#f78318]"
      onClick={onClick}
    >
      <FaChevronLeft size={15} className="group-hover:text-white" />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      className="group absolute top-[65%] xl:left-[97.5%] left-[92%] transform -translate-y-1/2 z-10 text-black bg-white p-2 rounded-full shadow-md hover:bg-[#f78318]"
      onClick={onClick}
    >
      <FaChevronRight size={15} className="group-hover:text-white" />
    </button>
  );

  return (
    <div className="xl:w-[90%] w-[90%] m-auto xl:mt-10 mt-10">
      <h1 className="text-[#3d3d3d] xl:text-3xl text-2xl font-bold text-start">
        Featured{" "}
        <span className="text-[#f78318] xl:text-3xl text-2xl font-bold">
          Category
        </span>
      </h1>
      <div>
        <Slider
          nextArrow={<CustomNextArrow />}
          prevArrow={<CustomPrevArrow />}
          ref={sliderRef}
          speed={500}
          slidesToShow={4}
          infinite={false}
          responsive={[
            {
              breakpoint: 1024, // For tablets and below
              settings: {
                slidesToShow: 3, // Show 3 slides
                slidesToScroll: 3, // Scroll 3 slides at once
              },
            },
            {
              breakpoint: 768, // For small screens (mobile)
              settings: {
                slidesToShow: 2, // Show 2 slides
                slidesToScroll: 2, // Scroll 2 slides at once
              },
            },
            {
              breakpoint: 480, // For extra small screens
              settings: {
                slidesToShow: 1, // Show 1 slide
                slidesToScroll: 1, // Scroll 1 slide at once
              },
            },
          ]}
        >
          {featured?.featured?.map((item, index) => (
            <div key={index} className="custom-slide">
              <div className="custom-content">
                <Link
                  to={`/featuredService/${item?._id}/${item?.featureCategoriesName}`}
                >
                  <img
                    className="custom-img"
                    src={`https://hireme-gdlb.onrender.com/${item.feature_category_logo}`}
                  />
                  <p className="custom-text">{item.featureCategoriesName}</p>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FeaturedCategory;
