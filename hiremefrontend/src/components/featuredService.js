import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  NavLink,
  useParams,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import authConfig from "../api/config";
import Nav from "./nav";
import CategorySlider from "./category";
import Slider from "react-slick";
import Footer from "./footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import SliderComponent from "./slider";
import Loder from "./loader/loder";

const FeaturedService = () => {
  const [featuredCategoryService, setAllFeaturedCategoryService] = useState([]);
  console.log(featuredCategoryService, "featuredCategoryService");
  // const [dataLoad, setDataLoad] = useState(false)
  const [categoryNameForFilter, setCategoryNameForFilter] = useState([]);
  console.log(categoryNameForFilter, "filter");

  const [ServiceTitle, setServiceTitle] = useState("");
  console.log(ServiceTitle, "titlessearch");

  const [bestRating, setBestRating] = useState();
  const [bestReviewed, setBestReviewed] = useState();
  const [title, setTitle] = useState("");
  const [minRating, setminRating] = useState("");
  console.log(minRating, "ratingsssssssssssssssss");

  const [subCategoryId, setSubcategoryId] = useState("");
  console.log(subCategoryId, "[][][][][][][][][][][][][][");

  const [id, setId] = useState("");

  const [subCategoriesAllData, setSubCategoriesAllData] = useState([]);
  console.log(subCategoriesAllData, "alldataofsubCategories");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); 

  const starts = [1, 2, 3, 4, 5];

  let { categoryId } = useParams();
  let { featureCategoriesName } = useParams();
  const { subcategoryId } = useParams();
  console.log(subcategoryId, "lap");

  const featureServiceRef = useRef(null);

  const subCategoriesRef = useRef(null);

  console.log(featureCategoriesName, "6565656");

  console.log(categoryId, "ssssssssssssssssssssssssssssssssssssssssssssssssss");

  // console.log(subCategoryId, "subsubsubsubsubsubsubsub");

  const navigate = useNavigate();
  const location = useLocation();

  const services = location.state?.services || [];
  console.log(services,"heloservices");
  
  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const savedminRating = queryParams.get("minRating");
  //   console.log(savedminRating, "save");

  //   if (savedminRating) {
  //     setminRating(savedminRating);
  //   }
  // }, [location.search]);

  // useEffect(() => {
  //   if (minRating !== "") {
  //     navigate({
  //       pathname: location.pathname,
  //       search: `?minRating=${minRating}`,
  //     });
  //   }
  // }, [minRating, navigate, location.pathname]);

  useEffect(() => {
    const fetchsubCategoriess = async () => {
      try {
        const queryParams = bestRating
          ? { bestRating }
          : bestReviewed
          ? { bestReviewed }
          : title
          ? { title }
          : minRating
          ? { minRating }
          : {};
        // const response = await axios.get(`${authConfig}/all-featured-categories`);
        const response = await authConfig.get(
          `subcategory-service/${subcategoryId}`,
          {
            params: queryParams,
          }
        );
        if (response.status === 200) {
          setSubCategoriesAllData(response.data.subCategories_Service);
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching sub categories:", error);
      }
    };
    fetchsubCategoriess();
  }, [subcategoryId, bestRating, bestReviewed, title, minRating]);

  useEffect(() => {
    const fetchFeaturedCategories = async () => {
      try {
        // const response = await axios.get(`${authConfig}/all-featured-categories`);
        const response = await authConfig.get("all-featured-categories");
        if (response.status === 200) {
          setCategoryNameForFilter(response.data.featuredCategories);
          setLoading(false)
        }
        handleSearch(response.data.services);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchFeaturedCategories();
  }, []);

  useEffect(() => {
    const fetchFeatureService = async () => {
      window.scrollTo(0, 0);
      try {
        const queryParam = bestRating
          ? { bestRating }
          : bestReviewed
          ? { bestReviewed }
          : title
          ? { title }
          : minRating
          ? { minRating }
          : {};

        // const validMinRating = minRating >= 1 && minRating <= 5 ? minRating : "";

        // const queryParam = bestRating
        //     ? { bestRating }
        //     : bestReviewed
        //         ? { bestReviewed }
        //         : title
        //             ? { title }
        //             : validMinRating
        //                 ? { minRating: validMinRating }
        //                 : {};

        const response = await authConfig.get(
          `all-review-rating/${categoryId}`,
          {
            params: queryParam,
          }
        );

        if (response.status === 200) {
          setAllFeaturedCategoryService(response.data.services);
          setId(
            response.data.services.map((el) => {
              setSubcategoryId(el.sub_categoryId._id);
            })
          );
          setLoading(false)

        } else {
          console.log("Error fetching all blog");
        }
        handleSearch(response.data.services);
      } catch (error) {
        console.error("Error fetching all blog:", error);
      }
    };

    fetchFeatureService();
  }, [categoryId, bestRating, bestReviewed, title, minRating]);

  useEffect(() => {
    setServiceTitle("");
    setTitle("");
  }, [categoryId, featureCategoriesName]);

  const handleSelectChange = (e) => {
    const value = e.target.value;

    if (value === "bestRating") {
      setBestRating(value);
      setBestReviewed(null);
    } else if (value === "mostReviewed") {
      setBestReviewed(value);
      setBestRating(null);
    } else {
      setBestRating(null);
      setBestReviewed(null);
    }
  };

  const handleSearch = (e) => {
    setTitle(e.target.value);
  };

  const handleCheckBox = (e) => {
    if (e.target.value === "all") {
      setminRating("");
    } else {
      setminRating(e.target.value);
    }
  };

  const CustomPrevArrow = ({ onClick }) => (
    <button
      className="group absolute top-1/2 right-[90%] transform -translate-y-1/2 z-10 text-black bg-white p-2 rounded-full shadow-md hover:bg-[#f78318]"
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


  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // if (loading) {
  //   return <Loder />;
  // }
  
  return (
    <div>
      
      <CategorySlider />
      {
        loading ? <Loder/>
        :
        <div className="w-[90%] m-auto xl:mt-28 mt-25">
        <h1 className="text-start xl:text-[2.2rem] text-2xl font-bold text-[#3d3d3d]">
          {featureCategoriesName}
        </h1>
        <div className="border-b-2 mt-8 border-[#0000001a]"></div>
        <div className="mt-6 font-semibold text-[#3d3d3d] xl:flex justify-between item-center text-start block">
           <h1>
           {(() => {
             if (categoryId) {
               return `${(services && services.length > 0 ? services.length : featuredCategoryService?.length || 0)} Services available`;
             } else {
               return `${(services && services.length > 0 ? services.length : subCategoriesAllData?.length || 0)} Services available`;
             }
           })()}
         </h1>
          <div className="flex gap-5 xl:mt-0 mt-5 items-center">
            <p className="text-[1.08rem]">Sort by :</p>
            <select
              onChange={handleSelectChange}
              className="w-[180px] p-2 border-2 border-[#0000001a]"
            >
              <option value="all">All</option>
              <option value="bestRating">Best Ratings</option>
              <option value="mostReviewed">Most Reviewed</option>
            </select>
          </div>
        </div>
        <div className="xl:flex block gap-10 w-[100%] mt-12">
        <div className="w-full md:w-[28%]">
      {/* Toggle Button for mobile */}
      <button
        className="md:hidden w-full bg-[#f78318] text-white py-2 rounded-lg font-semibold mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Filter Card Container */}
      <div className={`${isOpen ? "block" : "hidden"} md:block space-y-6`}>
        {/* Search Section */}
        <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
          <h2 className="text-lg font-semibold text-[#f78318] mb-3 border-b pb-2">Search</h2>
          <input
            type="search"
            placeholder="Search services..."
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f78318]"
            value={ServiceTitle}
            onChange={(e) => setServiceTitle(e.target.value)}
          />
          <button
            onClick={() => setTitle(ServiceTitle)}
            className="mt-4 w-full bg-[#f78318] text-white py-2 rounded-md font-medium hover:bg-[#e87210] transition"
          >
            Search
          </button>
        </div>

        {/* Category Filter */}
        <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
          <h2 className="text-lg font-semibold text-[#f78318] mb-3 border-b pb-2">Categories</h2>
          <div className="space-y-2">
            {categoryNameForFilter.map((category, index) => (
              <NavLink
                key={index}
                to={`/featuredService/${category._id}/${category.featureCategoriesName}`}
                className="block text-sm text-gray-700 hover:text-[#f78318] hover:underline"
              >
                {category.featureCategoriesName}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
          <h2 className="text-lg font-semibold text-[#f78318] mb-3 border-b pb-2">Rating</h2>
          <div className="space-y-3">
            <label className="flex items-center space-x-2 text-sm">
              <input type="checkbox" value="all" onChange={handleCheckBox} />
              <span>All Ratings</span>
            </label>

            {starts?.map((star, index) => (
              <label key={index} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  onChange={handleCheckBox}
                  value={5 - index}
                  checked={minRating == 5 - index}
                />
                <div className="flex">
                  {[...Array(5)].map((_, starIndex) => (
                    <FontAwesomeIcon
                      key={starIndex}
                      icon={faStar}
                      className={`ml-[2px] ${starIndex < 5 - index ? "text-[#f78318]" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>


          
    {categoryId ? (
  <div className="xl:w-[90%] w-full sm:[90%]">
   <div className="w-full m-auto gap-5 xl:grid xl:grid-cols-3 sm:grid sm:grid-cols-2 grid-cols-1">
  {(featuredCategoryService.length > 0 ? featuredCategoryService : services).length > 0 ? (
    (featuredCategoryService.length > 0 ? featuredCategoryService : services).map((item, index) => (
      <div key={index} className="shadow-xl xl:mt-0 mt-10">
        <div>
          <Slider
            prevArrow={<CustomPrevArrow />}
            nextArrow={<CustomNextArrow />}
            ref={featureServiceRef}
            speed={500}
            slidesToShow={1}
          >
            {item?.serviceImage?.url?.map((img, imgIndex) => (
              <img
                key={imgIndex}
                className="rounded-t-[10px] w-full h-[150px]"
                src={img}
                alt="Service"
              />
            ))}
          </Slider>

          <div className="pl-[12px] flex items-center mt-6">
            <div className="h-[40px] w-[48px]">
              <img
                className="w-[70%] h-[30px] rounded-[45px]"
                src={item?.authId?.authProfile}
                alt="Profile"
              />
            </div>
            <Link to={`/userServices/${item?.authId?._id}`}>
              <div className="flex gap-2 pb-3 font-semibold ml-1">
                <p>{item?.authId?.firstName}</p>
                <p>{item?.authId?.lastName}</p>
              </div>
            </Link>
          </div>

          <Link to={`/detailedService/${item._id}`}>
            <h1 className="text-[#212121] text-start font-semibold text-[0.990rem] pl-[12px] mt-[10px]">
              {`${item.title?.substring(0, 50)}...`}
            </h1>
          </Link>

          <div className="flex items-center gap-2 mt-5 border-1 p-2 pl-[12px] border-[#0000001a]">
            <FontAwesomeIcon icon={faStar} style={{ color: "#f78318" }} />
            <div className="flex gap-2">
              <p className="text-[#f78318] font-medium">{item.averageRating}</p>
              <p>{`(${item.totalRatings})`}</p>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="col-span-full flex flex-col items-center justify-center py-10">
      <img
        className="w-[8%] pb-4"
        src="https://script.viserlab.com/metalance/assets/templates/basic//images/empty_list.png"
        alt="No services found"
      />
      <h1 className="mt-3 text-center text-lg text-[#717171] font-semibold">
        No featured services found in this category.
      </h1>
    </div>
  )}
</div>

  </div>
) : subcategoryId ? (
  <div className="xl:w-[72%] w-full">
<div className="w-full m-auto gap-5 xl:grid xl:grid-cols-3 sm:grid sm:grid-cols-2 grid-cols-1">
  {(services.length > 0 ? services : subCategoriesAllData).length > 0 ? (
    (services.length > 0 ? services : subCategoriesAllData).map((item, index) => (
      console.log(item,"ddddddddddddddd"),
      
      <div key={index} className="shadow-xl">
        <div>
          <Slider
            prevArrow={<CustomPrevArrow />}
            nextArrow={<CustomNextArrow />}
            ref={subCategoriesRef}
            speed={500}
            slidesToShow={1}
          >
            {item?.serviceImage?.url?.map((img, imgIndex) => (
              <img
                key={imgIndex}
                className="rounded-t-[10px] w-full h-[150px]"
                src={img}
                alt="Service"
              />
            ))}
          </Slider>

          <div className="pl-[12px] flex items-center mt-6">
            <div className="h-[40px] w-[48px]">
              <img
                className="w-[70%] h-[30px] rounded-[45px]"
                src={item?.authId?.authProfile}
                alt="Profile"
              />
            </div>
            <Link to={`/userServices/${item.authId?._id}`}>
              <div className="flex gap-2 pb-3 font-semibold ml-1">
                <p>{item.authId?.firstName}</p>
                <p>{item.authId?.lastName}</p>
              </div>
            </Link>
          </div>

          <Link to={`/detailedService/${item._id}`}>
            <h1 className="text-[#212121] text-start font-semibold text-[0.990rem] pl-[12px] mt-[10px]">
              {`${item.title?.substring(0, 50)}...`}
            </h1>
          </Link>

          <div className="flex items-center gap-2 mt-5 border-1 p-2 pl-[12px] border-[#0000001a]">
            <FontAwesomeIcon icon={faStar} style={{ color: "#f78318" }} />
            <div className="flex gap-2">
              <p className="text-[#f78318] font-medium">{item.averageRating || 0}</p>
              <p>{`(${item.totalRatings || 0})`}</p>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="col-span-full flex flex-col items-center justify-center py-10">
      <img
        className="w-[8%] pb-4"
        src="https://script.viserlab.com/metalance/assets/templates/basic//images/empty_list.png"
        alt="No services found"
      />
      <h1 className="mt-3 text-center text-lg text-[#717171] font-semibold">
        No services found.
      </h1>
    </div>
  )}
</div>

  </div>
) : null}
        </div>
      </div>
      }
      <Footer />
    </div>
  );
};

export default FeaturedService;
