import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import authConfig from "../api/config";
import { Link } from "react-router-dom";
import CreateTask from "../task/createTask";
import Loder from "./loader/loder";
console.log(authConfig, "aaaaaaaaaaaa");

const CategorySlider = () => {
  const sliderRef = useRef(null);
  const [featured, setFeatured] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  console.log(hoveredCategory, "hover");

  const [subcategories, setSubcategories] = useState({});

  console.log(subcategories, "categorilist");

  const [categoryId, setCategoryId] = useState(null);
  console.log(categoryId, "cid");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCategories = async () => {
      try {
        // const response = await axios.get(`${authConfig}/all-featured-categories`);
        const response = await authConfig.get("all-featured-categories");
        if (response.status === 200) {
          setFeatured(response.data.featuredCategories);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchFeaturedCategories();
  }, []);

  const fetchSubcategories = async (categoryId) => {
    try {
      // const response = await axios.get(`${authConfig}/found-feature-sub-categories/${categoryId}`);
      const response = await authConfig.get(
        `found-feature-sub-categories/${categoryId}`
      );

      if (response.status === 200) {
        setSubcategories((prev) => ({
          ...prev,
          [categoryId]: response.data.featured_SubCategories,
        }));
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  if (loading) {
    return <Loder />;
  }

  return (
    <div className="absolute xl:ml-15 ml-15 xl:w-[90%] w-[70%] m-auto z-10">
      <div className="">
        <FaChevronLeft
            className="absolute left-[-40px] top-[22.5px] cursor-pointer z-50"
          onClick={() => sliderRef.current.slickPrev()}
        />

        <Slider
          ref={sliderRef}
          speed={500}
          slidesToShow={6}
          infinite={false}
          responsive={[
            {
              breakpoint: 1280, // Large desktops
              settings: {
                slidesToShow: 6,
              },
            },
            {
              breakpoint: 1024, // Medium desktops
              settings: {
                slidesToShow: 5,
              },
            },
            {
              breakpoint: 768, // Tablets
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 640, // Small tablets/large phones
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 480, // Small phones
              settings: {
                slidesToShow: 1,
              },
            },
            {
              breakpoint: 320, // Extra small phones
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
          className="z-0"
        >
          {featured?.map((category) => (
            <div
              key={category._id}
              className="p-2 text-center relative group"
              onMouseEnter={() => {
                setHoveredCategory(category._id);
                fetchSubcategories(category._id);
              }}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link
                to={`/featuredService/${category._id}/${category.featureCategoriesName}`}
                className="block"
              >
                <p className="xl:text-[1rem] text-[1.1rem] xl:font-medium font-semibold text-[#000000b3] cursor-pointer mt-2 md:text-[1rem]">
                  {category.featureCategoriesName}
                </p>
              </Link>

              {hoveredCategory === category._id && (
                <div className="relative left-0 w-full bg-white shadow-lg border-1 border-[#0000001a] rounded-md p-1 mt-3 z-auto">
                  {subcategories[category._id]?.map((sub) => (
                    <div
                      className="p-2 border-b border-[#0000001a] last:border-b-0 hover:bg-gray-100 text-black text-center text-[0.75rem] cursor-pointer md:text-[0.875rem]"
                      key={sub._id}
                    >
                      <Link
                        to={`/featuredService/sub/${sub._id}/${sub.feature_SubCategories_name}`}
                      >
                        {sub.feature_SubCategories_name}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Slider>

        <FaChevronRight
           className="absolute right-[-40px] top-[22.5px] cursor-pointer z-50"
          onClick={() => sliderRef.current.slickNext()}
        />
      </div>
    </div>
  );
};

export default CategorySlider;
