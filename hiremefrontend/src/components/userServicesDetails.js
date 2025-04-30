import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import authConfig from "../api/config";
import Nav from "./nav";
import Footer from "./footer";
import CategorySlider from "./category";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const UserServicesDetails = () => {
  const [userDetails, setUserDetails] = useState("");
  console.log(userDetails, "duser");

  const starts = [1, 2, 3, 4, 5];

  const { authId } = useParams();
  const userDetailsRef = useRef();

  const navigate =  useNavigate()

  console.log(authId, "userId");

  useEffect(() => {
    const fetchUserDetails = async () => {
      window.scrollTo(0, 0);
      try {
        const response = await authConfig.get(`auth-service/${authId}`);
        if (response.status === 200) {
          setUserDetails(response.data);
        }
      } catch (error) {
        console.error("Error fetching userDetails:", error);
      }
    };
    fetchUserDetails();
  }, [authId]);

  const CustomPrevArrow = ({ onClick }) => (
    <button
      className="group absolute top-1/2 xl:right-[88%] right-[93%] transform -translate-y-1/2 z-10 text-black bg-white p-2 rounded-full shadow-md hover:bg-[#f78318]"
      onClick={onClick}
    >
      <FaChevronLeft size={10} className="group-hover:text-white" />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      className="group absolute top-1/2 right-[2px] transform -translate-y-1/2 z-10 text-black bg-white p-2 rounded-full shadow-md hover:bg-[#f78318]"
      onClick={onClick}
    >
      <FaChevronRight size={10} className="group-hover:text-white" />
    </button>
  );

  return (
    <div>
      <Nav />
      <CategorySlider />
      <div className="xl:mt-23 mt-10 xl:w-[85%] w-full m-auto xl:flex block justify-between">
        <div className="xl:w-[33%] w-full">
          <div className="border-1 border-[#0000001a] w-[100%] pb-5 rounded-md">
            <div>
              <div className="w-[150px] h-[150px] m-auto pt-15">
                <img
                  className="w-[100%] h-[145px] rounded-full"
                  src={`https://hireback-1.onrender.com//${userDetails?.userDetails?.authId?.authProfile}`}
                />
              </div>
              <div className="mt-18">
                <div className="flex justify-center gap-2 text-[1.3rem] text-[#000000b3] font-bold ml-1">
                  <p>{userDetails?.userDetails?.authId?.firstName}</p>
                  <p>{userDetails?.userDetails?.authId?.lastName}</p>
                </div>
                {/* <p className='text-[#4c4c4c] font-semibold'>{userDetails?.userDetails?.authId?.description}</p> */}
                <p className="text-[#4c4c4c] font-semibold">
                  {" "}
                  {`${userDetails?.userDetails?.authId?.description?.substring(
                    0,
                    20
                  )} ..`}
                </p>

                <div className="flex items-center mt-1 gap-2 justify-center font-normal">
                  {starts.map((star, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={faStar}
                      style={{
                        color:
                          index < userDetails?.totalRatingsSum
                            ? "#f78318"
                            : "#ccc",
                      }}
                    />
                  ))}
                  <p className="font-bold">{userDetails?.totalRatingsSum}</p>
                  <p className="font-bold">{`(${userDetails?.totalReviewCount})`}</p>
                </div>

                <div className="border-1 border-[#0000001a] mt-6 w-[85%] m-auto"></div>
                <div className="p-4 mt-4">
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-start font-semibold text-[#0009]">
                        From
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#000000b3]">
                        {userDetails?.userDetails?.authId?.country}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-start font-semibold text-[#0009]">
                        Member Since
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#000000b3]">
                        {new Date(userDetails?.userDetails?.authId?.createdAt)
                          .toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                          })
                          .replace(",", "")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="border-2 mt-6 p-2.5 bg-[#f78318] font-bold text-[1.05rem] cursor-pointer text-white rounded-xl w-[90%]"
                  onClick={()=>navigate("/user/Messages")}
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>

          <div className="border-1 grid gap-5 p-8 grid-cols-2 items-center border-[#0000001a] w-[100%] mt-10 rounded-md">
            {userDetails?.AuthPortfolio?.map((portFolio, index) => (
              <div className="w-[90%]  m-auto ">
                <img
                  className={index < 2 ? "w-[100%] h-[150px]" : "w-[100%]"}
                  src={`https://hireback-1.onrender.com//${portFolio.portfolioImage}`}
                />
              </div>
            ))}
            <Link
              to={`/authPortfolio/${userDetails?.userDetails?.authId?._id}`}
            >
              <p className="text-[#0667f6] font-semibold hover:underline">
                See Projects{" " + `(${userDetails.num_of_portfolio})`}
              </p>
            </Link>
          </div>

          <div className="border-1 border-[#0000001a] w-[100%] mt-10 rounded-md">
            <h1 className="text-start font-bold text-[#000000b3] ml-5 mt-8">
              Description
            </h1>
            <p className="text-[#000000b3] font-semibold text-justify w-[90%] m-auto mt-4">
              {userDetails?.userDetails?.authId?.description}
            </p>
            <div className="border w-[85%] m-auto border-[#0000001a] mt-6"></div>
            <div className="p-8">
              <p className="text-[#000000b3] text-start font-bold">
                Educations / Certifications
              </p>
              {userDetails?.userDetails?.authId?.Educations.map(
                (education, index) => (
                  <div className="mt-5">
                    <p className="text-[#000000b3] text-start font-semibold ">
                      {education.college_university}
                    </p>
                    <div className="flex">
                      <p className="text-[#0006]">{education.title}</p>
                      <p className="text-[#0006]">{`-${education.year}`}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="xl:w-[65%] sm:w-[65%] w-full">
          <p className="text-start font-bold text-[1.2rem] xl:mt-0 mt-5 xl:ml-0 ml-2">
            {userDetails?.userDetails?.authId?.firstName + " " + "Gigs"}
          </p>

          <div className="w-full m-auto gap-5 xl:grid xl:grid-cols-3 sm:grid sm:grid-cols-2 grid-cols-1 mt-8">
            {userDetails?.services?.map((userCreateServices, index) => (
              <div key={index} className="shadow-xl xl:mt-0 mt-5">
                <div className="">
                  <Slider
                    prevArrow={<CustomPrevArrow />}
                    nextArrow={<CustomNextArrow />}
                    ref={userDetailsRef}
                    speed={500}
                    slidesToShow={1}
                  >
                    {userCreateServices?.serviceImage?.map((imgd, imgIndex) => (
                      <img
                        key={imgIndex}
                        className="rounded-t-[10px] w-full h-[150px]"
                        src={`https://hireback-1.onrender.com//${imgd}`}
                        alt="Service"
                      />
                    ))}
                  </Slider>

                  <div className="pl-[12px] flex items-center mt-6">
                    <div className="h-[40px] w-[48px]">
                      <img
                        className="w-[70%] h-[30px] rounded-[45px]"
                        src={`https://hireback-1.onrender.com//${userDetails.userDetails.authId.authProfile}`}
                      />
                    </div>
                    <Link
                      to={`/userServices/${userDetails.userDetails.authId._id}`}
                    >
                      <div className="flex gap-2 pb-3 font-semibold ml-1">
                        <p className="">
                          {userDetails.userDetails.authId.firstName}
                        </p>
                        <p className="">
                          {userDetails.userDetails.authId.lastName}
                        </p>
                      </div>
                    </Link>
                  </div>
                  {/* <p className="">{userCreateServices.title}</p> */}
                  <Link to={`/detailedService/${userCreateServices._id}`}>
                    <h1 className="text-[#212121] text-start font-semibold text-[0.990rem] pl-[12px] mt-[10px]">
                      {`${userCreateServices.title.substring(0, 50)}...`}
                    </h1>
                  </Link>
                  <div className="flex items-center gap-2 mt-5 border-1 p-2 pl-[12px] border-[#0000001a]">
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#f78318" }}
                    />

                    <div className="flex gap-2">
                      <p className="text-[#f78318] font-medium">
                        {userCreateServices.averageRating}
                      </p>
                      <p>{`(${userCreateServices.totalRatings})`}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 pb-20">
            <div className="bg-white rounded-xl shadow-sm p-5">
              {/* Header */}
              <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between border-b border-gray-200 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Reviews</h1>
                <p className="text-sm font-medium text-gray-600 mt-2 xl:mt-0">
                  Total {userDetails.totalReviewCount} reviews for this seller
                </p>
              </div>

              {/* Reviews List */}
              <div className="space-y-8">
                {userDetails?.services?.map((service, serviceIndex) =>
                  service?.ratings?.map((review, reviewIndex) => (
                    <div
                      key={`${serviceIndex}-${reviewIndex}`}
                      className="border-b border-gray-100 pb-6 flex gap-4"
                    >
                      {/* Avatar */}
                      <div className="min-w-[50px]">
                        <img
                          src={`https://hireback-1.onrender.com//${review?.reviewerId?.authProfile}`}
                          alt="Reviewer Avatar"
                          className="h-12 w-12 rounded-full object-cover border border-gray-200"
                        />
                      </div>

                      {/* Review Content */}
                      <div className="flex-1">
                        {/* Name */}
                        <div className="flex gap-2 items-center font-semibold text-gray-800">
                          <span>{review?.reviewerId?.firstName}</span>
                          <span>{review?.reviewerId?.lastName}</span>
                        </div>

                        {/* Stars and date */}
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          {/* Stars */}
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FontAwesomeIcon
                                key={i}
                                icon={faStar}
                                className={
                                  i < review.rating
                                    ? "text-[#f78318]"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                            <span className="ml-1 font-medium">
                              {review.rating}
                            </span>
                          </div>

                          {/* Divider */}
                          <span className="h-4 w-px bg-gray-300"></span>

                          {/* Time ago */}
                          <span className="font-semibold">
                            {(() => {
                              const createdDate = new Date(review.createdAt);
                              const now = new Date();
                              const monthsAgo =
                                (now.getFullYear() -
                                  createdDate.getFullYear()) *
                                  12 +
                                (now.getMonth() - createdDate.getMonth());
                              return monthsAgo <= 0
                                ? "This month"
                                : `${monthsAgo} month${
                                    monthsAgo > 1 ? "s" : ""
                                  } ago`;
                            })()}
                          </span>
                        </div>

                        {/* Review Text */}
                        <p className="mt-2 text-gray-700 text-sm text-justify">
                          {review.review}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Empty state if no reviews */}
              {userDetails?.totalReviewCount === 0 && (
                <div className="text-center mt-10">
                  <img
                    src="https://script.viserlab.com/metalance/assets/templates/basic//images/empty_list.png"
                    alt="No Reviews"
                    className="w-20 mx-auto opacity-40"
                  />
                  <p className="mt-3 text-gray-400 font-medium">
                    No review found for this gig
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserServicesDetails;
