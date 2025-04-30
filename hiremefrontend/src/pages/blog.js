import React, { useState } from "react";
import "fa-icons";
import { Link } from "react-router-dom";
import DetailBlog from "../components/blogs/detailBlog";

const Blog = ({ blog }) => {
  console.log(blog, "blogspr");
  const [homeblogId, setHomeBlogId] = useState("");
  console.log(homeblogId, "idaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  return (
    <div>
      <div className="xl:w-[90%] flex justify-between w-[90%] m-auto xl:mt-20 mt-10">
        <h1 className="text-[#3d3d3d] xl:text-3xl text-2xl font-bold text-start">
          Our Latest <span className="text-[#f78318] xl:text-3xl text-2xl font-bold">Blog</span>
        </h1>
        <a
          href="/blog"
          className="border-2 border-[#f78318] xl:text-[1rem] text-sm xl:w-[130px] w-[90px] xl:h-[40px] h-[30px] xl:p-[5px] p-[4px] rounded-lg font-bold text-[#f78318] cursor-pointer"
        >
          View More
        </a>
      </div>

      <div className="w-[88%] m-auto xl:mt-12 mt-8 xl:grid xl:grid-cols-3 sm:grid sm:grid-cols-2 grid-cols-1 gap-[20px]">
        {blog?.map((blogs, index) => (
          <div
            key={index}
            className="w-full h-[480px] xl:mt:0 mt-10 rounded-t-[10px] bg-[#f9f9f9] leading-[1.5] text-start"
          >
            <img
              className="rounded-t-[10px] h-[250px] w-full"
              src={`https://hireme-gdlb.onrender.com//${blogs.blog_image}`}
              alt="Blog"
            />

            {/* Date Formatting */}
            <p className="pl-[12px] mt-[20px]">
              {new Date(blogs.createdAt).toLocaleString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>

            {/* <h1 className="text-[#212121] font-bold text text-[20px] pl-[12px] mt-[10px]">{`${blogs.blog_title.substring(0, 60)}...`}</h1> */}
            <Link
              to={`/blog/${blogs._id}`}
              className="text-[#f78318]  cursor-pointer ml-4"
            >
              <h1 className="text-[#212121] font-bold text text-[20px] pl-[12px]">{`${blogs.blog_title.substring(
                0,
                60
              )}...`}</h1>
            </Link>
            <p className="mt-[10px] pl-[12px]">
              {`${blogs.blog_description.substring(0, 60)}...`}
            </p>

            {/* <button onClick={() => setHomeBlogId(blogs._id)} className="pl-[12px] mt-[10px] pb-10 text-[#5c5c5c] hover:text-[#f78318] delay-50 font-semibold cursor-pointer">Read More</button> */}
            <button>
              <Link
                to={`/blog/${blogs._id}`}
                className="text-[#f78318] font-semibold cursor-pointer mt-2 ml-4"
              >
                Read more
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
