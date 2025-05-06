import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import authConfig from "../api/config";

const FeaturedTask = () => {
  const [allFeaturedTask, setAllFeaturedTask] = useState([]);
  console.log(allFeaturedTask, "taskallfeatured");

  const sliderRefforTask = useRef(null);

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

  useEffect(() => {
    const fetchAllFeaturedTask = async () => {
      window.scrollTo(0, 0);
      try {
        const response = await authConfig.get("show-all-task-category");
        if (response.status === 200) {
          setAllFeaturedTask(response.data.taskCategory);
        } else {
          console.log("Error fetching all FeaturedTask");
        }
      } catch (error) {
        console.error("Error fetching all FeaturedTask:", error);
      }
    };

    fetchAllFeaturedTask();
  }, []);

  return (
    <div>
      <div className="xl:w-[90%] w-[90%] m-auto xl:mt-20 mt-10">
        {/* <div className="flex justify-between mt-8 w-[90%]"> */}
        <h1 className="text-[#3d3d3d] xl:text-3xl text-2xl font-bold text-start">
          Featured{" "}
          <span className="text-[#f78318] xl:text-3xl text-2xl font-bold">
            Task
          </span>
        </h1>
        {/* </div> */}

        <div>
          <Slider
            nextArrow={<CustomNextArrow />}
            prevArrow={<CustomPrevArrow />}
            ref={sliderRefforTask}
            speed={500}
            slidesToShow={4}
            infinite={false}
            responsive={[
              {
                breakpoint: 1024, // Tablets and below
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                },
              },
              {
                breakpoint: 768, // Mobile
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                },
              },
              {
                breakpoint: 480, // Small phones
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {allFeaturedTask?.map((item, index) => (
              <div key={index} className="custom-slide p-2">
                <div className="custom-content text-center bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <Link to={`/featuredTaskDetailed/${item?._id}`}>
                    <img
                      className="custom-img w-full xl:h-[65px] h-[65px] object-contain mx-auto"
                      src={`http://192.168.1.2:8000/${item.taskCategoryLogo}`}
                      alt={item.task_category_title}
                    />
                    <p className="custom-text mt-3 text-base font-semibold text-gray-800">
                      {item.task_category_title}
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTask;
