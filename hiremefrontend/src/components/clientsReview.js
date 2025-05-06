import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
const ClientsReview = ({ clientReviews }) => {
  console.log(clientReviews, "client");
  const clientReviewRef = useRef(null);
  const CustomPrevArrow = ({ onClick }) => (
    <button
      className="group absolute top-1/2 xl:left-[-5px] left-[-5px] transform -translate-y-1/2 z-10 text-black bg-white p-2 rounded-full shadow-md hover:bg-[#F78318]"
      onClick={onClick}
    >
      <FaChevronLeft size={14} className="group-hover:text-white" />
    </button>
  );
  const CustomNextArrow = ({ onClick }) => (
    <button
      className="group absolute top-1/2 xl:right-[-5px] right-[-5px] transform -translate-y-1/2 z-10 text-black bg-white p-2 rounded-full shadow-md hover:bg-[#F78318]"
      onClick={onClick}
    >
      <FaChevronRight size={14} className="group-hover:text-white" />
    </button>
  );
  return (
    <div>
      <div className="xl:w-[90%] flex justify-between w-[90%] m-auto xl:mt-20 mt-10">
        <h1 className="text-[#3d3d3d] xl:text-3xl text-2xl font-bold text-start">
          Client's{" "}
          <span className="text-[#f78318] xl:text-3xl text-2xl font-bold">
            Review
          </span>
        </h1>
      </div>
      <div className="w-[90%] m-auto xl:mt-12 mt-5 p-4">
        <Slider
          ref={clientReviewRef}
          speed={500}
          slidesToShow={3}
          slidesToScroll={3}
          prevArrow={<CustomPrevArrow />}
          nextArrow={<CustomNextArrow />}
          className="mx-[-12px]"
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
          {clientReviews &&
            clientReviews.map((reviewItem) =>
              reviewItem.ratings.map((clientReview, index) => (
                <div key={index} className="px-3">
                  <div className="p-6 rounded-lg grid gap-4 border border-[#0000001a] shadow-md text-start h-[280px] bg-white">
                    <div className="flex">
                      {[...Array(5)].map((_, starIndex) => (
                        <FontAwesomeIcon
                          key={starIndex}
                          icon={faStar}
                          className={`mr-1 ${
                            starIndex < clientReview.rating
                              ? "text-[#F78318]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-[#0009] text-[1rem] italic">
                      "{clientReview.review}"
                    </p>
                    <div className="flex items-center mt-4">
                      <div className="h-[50px] w-[50px] rounded-full overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={clientReview.reviewerId?.authProfile}
                          alt="Reviewer"
                        />
                      </div>
                      <div className="ml-3 font-bold text-sm md:text-base">
                        <p>
                          {clientReview.reviewerId?.firstName}{" "}
                          {clientReview.reviewerId?.lastName}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
        </Slider>
      </div>
    </div>
  );
};
export default ClientsReview;
