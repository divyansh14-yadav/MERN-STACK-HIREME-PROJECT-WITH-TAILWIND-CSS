import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const FeatureGigs = (featureGig) => {
  console.log(featureGig, "gpop");

  const FeatureGigsRef = useRef(null);

  const CustomPrevArrow = ({ onClick }) => (
    <button
      className="group absolute top-1/2 transform -translate-y-1/2 z-10 text-black bg-white p-2 rounded-full shadow-md hover:bg-[#f78318]"
      onClick={onClick}
    >
      <FaChevronLeft size={10} className="group-hover:text-white" />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      className="group absolute top-1/2 right-[0px] transform -translate-y-1/2 z-10 text-black bg-white p-2 rounded-full shadow-md hover:bg-[#f78318]"
      onClick={onClick}
    >
      <FaChevronRight size={10} className="group-hover:text-white" />
    </button>
  );

  return (
    <div>
      <div className="xl:w-[90%] w-[90%] m-auto xl:mt-10 mt-5">
        <h1 className="text-[#3d3d3d] xl:text-3xl text-2xl font-bold text-start">
          Featured{" "}
          <span className="text-[#f78318] xl:text-3xl text-2xl font-bold">
            Gigs
          </span>
        </h1>
      </div>
      <div>
        <div className="w-[88%] m-auto xl:mt-12 mt-2 xl:grid lg:grid lg:grid-cols-4 xl:grid-cols-4 sm:grid sm:grid-cols-2 grid-cols-1 gap-[20px]">
          {featureGig?.featureGig?.map((gigs, index) => (
            <div
              key={index}
              className="w-full h-[333px] pb-3 mt-10 xl:mt-0  rounded-t-[10px] border-1 border-[#0000001a] leading-[1.5] shadow-md text-start"
            >
              {/* Slider for service images */}
              <Slider
                prevArrow={<CustomPrevArrow />}
                nextArrow={<CustomNextArrow />}
                ref={FeatureGigsRef}
                speed={500}
                slidesToShow={1}
              >
                {gigs?.serviceImage?.url?.map((imgd, imgIndex) => (
                  <img
                    key={imgIndex}
                    className="rounded-t-[10px] w-full h-[150px]"
                    src={imgd}
                    alt="Service"
                  />
                ))}
              </Slider>

              <div className="pl-[12px] flex items-center mt-8">
                <div className="h-[40px] w-[48px]">
                  <img
                    className="w-[70%] h-[30px] rounded-[45px]"
                    src={gigs.authId.authProfile}
                  />
                </div>
                <Link to={`/userServices/${gigs.authId._id}`}>
                  <div className="flex gap-2 pb-3 font-semibold ml-1">
                    <p className="">{gigs.authId.firstName}</p>
                    <p className="">{gigs.authId.lastName}</p>
                  </div>
                </Link>
              </div>
              <Link to={`/detailedService/${gigs._id}`}>
                <h1 className="text-[#212121] font-semibold text-[1rem] pl-[12px] mt-[10px]">
                  {gigs.title}
                </h1>
              </Link>
              <p className="mt-[10px] pl-[12px]">{gigs.blog_description}</p>
              <div className="flex justify-between items-center border-1 border-[#0000001a]">
                <div className="flex items-center gap-2  p-2 pl-[12px] ">
                  <FontAwesomeIcon icon={faStar} style={{ color: "#f78318" }} />
                  <p className="text-[#f78318] font-medium">
                    {gigs.averageRating}
                  </p>
                  <p>{`(${gigs.totalRatings})`}</p>
                </div>
                <div className="px-3">
                  <p className="font-bold">
                    {"From" + " " + " $ " + gigs.Basic_price[0].b_price + ".00"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureGigs;
