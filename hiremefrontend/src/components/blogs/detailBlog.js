import React, { useEffect, useState } from 'react';
import authConfig from '../../api/config';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import Nav from '../nav';
import CategorySlider from '../category';
import Footer from '../footer';
import Loder from '../loader/loder';

const DetailBlog = () => {

    const [detailBlog, setDetailedBlog] = useState({});
    console.log(detailBlog, "4545554");

    const [selectedBlog, setSelectedBlog] = useState(null);
    console.log(selectedBlog, "898989899");

    const [allBlogs, setAllBlogs] = useState([])
  const [loading, setLoading] = useState(true);

    let { blogId } = useParams();

    useEffect(() => {
        const fetchBlogDetails = async () => {
            window.scrollTo(0, 0);
            try {
                const response = await authConfig.get(`single-blog/${blogId}`);
                if (response.status === 200) {
                    setDetailedBlog(response.data.blog);
          setLoading(false);

                }
            } catch (error) {
                console.error("Error fetching blog details:", error);
            }
        };
        fetchBlogDetails();
    }, [blogId]);


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
        <>
            <Nav />
            <CategorySlider />
            <div className='xl:flex xl:w-[93%] block xl:gap-10 xl:mt-30 mt-10 relative w-full z-auto overflow-x-visible'>
                <div className="w-[100%] xl:ml-25 mt-10 rounded-t-[10px] bg-[#f9f9f9] leading-[1.5] text-start">
                    <img className="rounded-t-[10px] h-[350px] w-full"
                        src={`https://hireback-1.onrender.com//${selectedBlog ? selectedBlog.blog_image : detailBlog.blog_image}`}
                        alt="Blog"
                    />

                    <h1 className="text-[#212121] font-bold text-[25px] mt-10 ml-4">
                        {selectedBlog ? selectedBlog.blog_title : detailBlog.blog_title}
                    </h1>

                    <div className='flex items-center p-4'>
                        <FontAwesomeIcon style={{ marginTop: "7px" }} icon={faCalendarDays} />
                        <p className="mt-2 text-gray-600 text-sm ml-4 font-semibold">
                            {new Date(selectedBlog ? selectedBlog.createdAt : detailBlog.createdAt)
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

                    <p className="mt-1 ml-4">{selectedBlog ? selectedBlog.blog_description : detailBlog.blog_description}</p>
                </div>

                <div className='xl:w-[60%] w-full mt-10 bg-[#f9f9f9] p-4 rounded-md'>
                    <h1 className='text-start font-bold text-[1.3rem]'>Latest Blog</h1>
                    {allBlogs
                        .filter(blog => blog._id !== (selectedBlog ? selectedBlog._id : detailBlog._id))
                        .map((blog) => (
                            <div key={blog._id} className='flex items-center border-b-1 border-[#0000001a] pb-5'>
                                <div className='mt-2 w-[30%]'>
                                    <img className="mt-8 xl:h-[70px] h-[65px] w-[100%] rounded-md"
                                        src={`https://hireback-1.onrender.com//${blog.blog_image}`}
                                        alt="Blog"
                                    />
                                </div>
                                <div className='mt-8'>
                                    <p onClick={() => setSelectedBlog(blog)}
                                        className='cursor-pointer text-start font-semibold text-[0.95rem] ml-2'>
                                        {blog.blog_title}
                                    </p>
                                    <div className='flex gap-2 ml-2'>
                                        <FontAwesomeIcon style={{ marginTop: "8px" }} icon={faCalendarDays} />
                                        <p className='text-start mt-1'>
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
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DetailBlog;
