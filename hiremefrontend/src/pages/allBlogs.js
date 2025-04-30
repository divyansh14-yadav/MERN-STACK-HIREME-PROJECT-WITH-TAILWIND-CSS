import React, { useEffect, useState } from "react";
import BrandSlider from "../common/brandSlider";
import Nav from "../components/nav";
import Category from "../components/category";
import authConfig from "../api/config";
import Footer from "../components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import DetailBlog from "../components/blogs/detailBlog";
import { Link } from "react-router-dom";
import Loder from "../components/loader/loder";

const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [blogId, setBlogId] = useState("");
  const [loading, setLoading] = useState(true);

  console.log(blogId, "bid");

  console.log(allBlogs, "allBlogssecton");

  useEffect(() => {
    const fetchAllBlog = async () => {
      window.scrollTo(0, 0);
      try {
        const response = await authConfig.get("all_blog_details");
        if (response.status === 200) {
          setAllBlogs(response.data.all_blog);
          setLoading(false);
        } else {
          console.log("Error fetching all blog");
        }
      } catch (error) {
        console.error("Error fetching all blog:", error);
      }
    };

    fetchAllBlog();
  }, []);
    if (loading) {
    return <Loder />;
  }
  return (
    <div>
      <Nav />
      <Category />

      <div className="xl:w-[86.5%] w-full m-auto xl:mt-25 mt-15 xl:grid xl:grid-cols-3 sm:grid sm:grid-cols-2 grid-cols-1 gap-[20px] pb-20">
        {allBlogs?.map((blog, index) => (
          <div
            key={index}
            className="w-full h-[480px] rounded-t-[10px] bg-[#f9f9f9] leading-[1.5] text-start"
          >
            <img
              className="rounded-t-[10px] h-[250px] w-full"
              src={`https://hireme-gdlb.onrender.com//${blog.blog_image}`}
              alt="Blog"
            />

            <div className="flex items-center ml-4">
              <FontAwesomeIcon
                style={{ marginTop: "32px", color: "#f78318" }}
                icon={faCalendarDays}
              />
              <p className="mt-8 text-gray-600 text-sm ml-4">
                {new Date(blog.createdAt)
                  .toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(",", "")}
              </p>
            </div>

            <h1 className="text-[#212121] font-bold text-[20px] mt-2 ml-4">
              {`${blog?.blog_title?.substring(0, 60)}...`}
            </h1>
            <p className="mt-1 ml-4">{`${blog.blog_description.substring(
              0,
              60
            )}...`}</p>
            {/* <button onClick={() => setBlogId(blog._id)} className="text-[#f78318] font-semibold cursor-pointer mt-2 ml-4">Read more</button> */}
            <button onClick={() => setBlogId(blog._id)}>
              <Link
                to={`/blog/${blog._id}`}
                blog={allBlogs}
                className="text-[#f78318] font-semibold cursor-pointer mt-2 ml-4"
              >
                Read more
              </Link>
            </button>
          </div>
        ))}
      </div>

      {blogId ? null : <BrandSlider />}

      <Footer />
    </div>
  );
};

export default AllBlogs;
