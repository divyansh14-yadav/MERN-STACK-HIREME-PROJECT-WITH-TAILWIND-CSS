import React, { useState, useEffect } from "react";
import BrandSlider from "../common/brandSlider";
import { Link, useNavigate, useParams } from "react-router-dom";
import authConfig from "../api/config";
import { toast } from "react-toastify";

const SliderComponent = (featured) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log(featured, "helloslider");

  const [title, setTitle] = useState("");
  const [featuredCategoryService, setAllFeaturedCategoryService] = useState([]);
  console.log(featuredCategoryService, "id123456");

  const navigate = useNavigate();

  const slides = [
    "https://script.viserlab.com/metalance/assets/images/frontend/banner/662f431c314071714373404.png",
    "https://script.viserlab.com/metalance/assets/images/frontend/banner/662f4315b55781714373397.png",
    "https://script.viserlab.com/metalance/assets/images/frontend/banner/662f4322697141714373410.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // isko common banana hai

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await authConfig.get("searchService", {
        params: { title },
      });

      const services = response.data.services;

      const service = services[0];
      const subcategoryId = service.sub_categoryId?._id;
      const subcategoryName =
        service.sub_categoryId?.feature_SubCategories_name;
      const categoryId = service.categoryId?._id;
      const categoryName = service.categoryId?.featureCategoriesName;

      if (subcategoryId) {
        navigate(`/featuredService/sub/${subcategoryId}/${subcategoryName}`, {
          state: { services },
        });
        
      } else if (categoryId) {
        navigate(`/featuredService/${categoryId}/${categoryName}`,{
          state: { services },
        });
      }
    } catch (error) {
      // alert("No services found with the given title.");
      toast.error("No services found with the given title.")
      console.error("Error fetching services:", error);
    }
  };

  return (
    <div className="relative w-full z-auto overflow-x-visible xl:mt-14 mt-15">
      <div className="relative overflow-hidden w-full xl:h-126 h-118">
        {/* Background image slider */}
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2500ms] ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Static Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold w-full text-center">
              Connect with Skilled Freelancers to Elevate{" "}
              <span className="text-[#F78318]">Your Projects</span>
            </h2>
          </div>

          {/* Search Input */}
          <div>
            <form className="xl:w-[100%] w-[55%] mt-5" onSubmit={handleSearch}>
              <div className="relative lg:w-[800px] w-[330px]">
                <input
                  type="search"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-[90%] bg-white p-3 rounded-lg text-black"
                  placeholder="Find the perfect service for your needs..."
                />
                {featured?.featured?.map(
                  (category, index) => (
                    console.log(category, "kajhsgdfsghggggggg"),
                    (
                      <button
                        type="submit"
                        className="text-white bg-[#da6f0c] cursor-pointer rounded-r-lg p-3.5 absolute right-4 lg:right-8.5"
                      >
                        <svg
                          className="w-13 h-5 text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </button>
                    )
                  )
                )}
              </div>
            </form>
          </div>

          {/* Category Links */}
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 justify-center">
            {featured?.featured?.slice(0, 4).map((sub, idx) => (
              <Link
                key={idx}
                to={`/featuredService/${sub._id}/${sub.featureCategoriesName}`}
                className="text-white xl:p-1 p-0 rounded-lg font-semibold bg-[#ffffff1a] border-2 border-[#ffffff1a] hover:bg-red-500"
              >
                {sub.featureCategoriesName}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <BrandSlider />
    </div>
  );
};
export default SliderComponent;
