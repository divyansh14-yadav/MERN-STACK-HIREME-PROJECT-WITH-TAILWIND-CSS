import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import authConfig from "../api/config";
import { Link } from "react-router-dom";

const PopularServices = () => {
  const [popular_service, setPopular_service] = useState([]);
  console.log(popular_service, "popservice");

  const sliderRef = useRef(null);

  //  bg-black bg-gradient-to-b from-black/60 to-transparent
  useEffect(() => {
    const fetchFeaturedCategories = async () => {
      try {
        // const response = await axios.get(`${authConfig}/all-featured-categories`);
        const response = await authConfig.get("fetch-home-details");
        if (response.status === 200) {
          setPopular_service(response.data.popularService);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchFeaturedCategories();
  }, []);

  const CustomPrevArrow = ({ onClick }) => (
    <button
      className="group absolute top-1/2 xl:right-[97.5%] right-[92%] transform -translate-y-1/2 z-10 text-black bg-white p-2 rounded-full shadow-md hover:bg-[#f78318]"
      onClick={onClick}
    >
      <FaChevronLeft size={15} className="group-hover:text-white" />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      className="group absolute top-1/2 xl:left-[97.5%] left-[92%] transform -translate-y-1/2 z-10 text-black bg-white p-2 rounded-full shadow-md hover:bg-[#f78318]"
      onClick={onClick}
    >
      <FaChevronRight size={15} className="group-hover:text-white" />
    </button>
  );

  return (
    <div>
      <div className="xl:w-[90%] w-[90%] m-auto xl:mt-20 mt-10">
        <h1 className="text-[#3d3d3d] xl:text-3xl text-2xl font-bold text-start">
          Popular{" "}
          <span className="text-[#f78318] xl:text-3xl text-2xl font-bold">
            Services
          </span>
        </h1>
        <div>
          <Slider
            nextArrow={<CustomNextArrow />}
            prevArrow={<CustomPrevArrow />}
            ref={sliderRef}
            speed={500}
            slidesToShow={5}
            infinite={false}
            responsive={[
              {
                breakpoint: 1024, // For tablets and below
                settings: {
                  slidesToShow: 5, // Show 3 slides
                  slidesToScroll: 3, // Scroll 3 slides at once
                },
              },
              {
                breakpoint: 768, // For small screens (mobile)
                settings: {
                  slidesToShow: 3, // Show 2 slides
                  slidesToScroll: 2, // Scroll 2 slides at once
                },
              },
              {
                breakpoint: 480, // For extra small screens
                settings: {
                  slidesToShow: 2, // Show 1 slide
                  slidesToScroll: 1, // Scroll 1 slide at once
                },
              },
            ]}
          >
            {popular_service?.map((item, index) => (
              <div key={index} className="relative">
                {/* Image Container */}
                <Link
                  to={`/featuredService/${item?._id}/${item?.featureCategoriesName}`}
                >
                  <div className="relative xl:mt-12 mt-2 p-3">
                    <img
                      className="w-full m-auto"
                      src={`https://hireme-gdlb.onrender.com/${item.feature_category_image}`}
                      alt={item.featureCategoriesName}
                    />
                    <div className="absolute top-[258px] w-[90%] m-auto h-[20%] inset-0 bg-gradient-to-t from-black/100 via-black/60 to-transparent"></div>
                  </div>

                  {/* Text */}
                  <p className="text-[#ffffff] text-[1.1rem] mt-5 font-bold relative bottom-[80px] text-center">
                    {item.featureCategoriesName}
                  </p>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default PopularServices;
