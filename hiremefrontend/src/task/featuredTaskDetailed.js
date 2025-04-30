import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import Footer from "../components/footer";
import Nav from "../components/nav";
import CategorySlider from "../components/category";
import authConfig from "../api/config";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";
import Loder from "../components/loader/loder";
import { IoFilter } from "react-icons/io5";

const FeaturedTaskDetailed = () => {
  const [allFeaturedTask, setAllFeaturedTask] = useState([]);
  console.log(allFeaturedTask, "taskallfeatured");

  const [allTaskAccordingCategory, setAllTaskAccordingCategory] = useState([]);
  console.log(allTaskAccordingCategory, "setAllTaskAccordingCategory");

  const [taskTitle, setTaskTitle] = useState("");
  const [task_Skill_Required, set_Skill_Required] = useState("");
  // const [taskType, setTaskType] = useState("")
  const [tags, setTags] = useState("");
  const [location, setLocation] = useState("");

  const [searcData, setSearcData] = useState([]);
  console.log(searcData, "hellesearch");

  const [newest, setNewest] = useState("");
  console.log(newest, "new");

  const [oldest, setOldest] = useState("");
  console.log(oldest, "old");
  const [showFilter, setShowFilter] = useState(false);
  // console.log(taskType, "fulltime");

  const taskId = useParams();
  console.log(taskId.taskId, "taskid");
  const [loading, setLoading] = useState(true);

  const authId = JSON.parse(localStorage.getItem("authId"));

  useEffect(() => {
    const fetchFeatureService = async () => {
      window.scrollTo(0, 0);
      try {
        const queryParam = {};
        if (taskTitle) queryParam.taskTitle = taskTitle;
        if (task_Skill_Required)
          queryParam.task_Skill_Required = task_Skill_Required;
        if (tags) queryParam.tags = tags;
        if (location) queryParam.location = location;
        if (newest) queryParam.newest = newest;
        if (oldest) queryParam.oldest = oldest;

        const response = await authConfig.get("/searchTask", {
          params: queryParam,
        });

        if (response.status === 200) {
          setSearcData(response.data.tasks);
        } else {
          console.log("Error fetching search data");
        }
      } catch (error) {
        console.error("Error fetching search data:", error);
      }
    };

    fetchFeatureService();
  }, [
    taskTitle,
    task_Skill_Required,
    tags,
    // taskType,
    location,
    newest,
    oldest,
    // taskType,
  ]);

  useEffect(() => {
    const fetchAllFeaturedTask = async () => {
      window.scrollTo(0, 0);
      try {
        const response = await authConfig.get("show-all-task-category");
        if (response.status === 200) {
          setAllFeaturedTask(response.data.taskCategory);
          setLoading(false);
        } else {
          console.log("Error fetching all FeaturedTask");
        }
      } catch (error) {
        console.error("Error fetching all FeaturedTask:", error);
      }
    };

    fetchAllFeaturedTask();
  }, []);

  useEffect(() => {
    const fetchAllFeaturedTask = async () => {
      window.scrollTo(0, 0);
      try {
        const response = await authConfig.get(
          `task-category-basis/${taskId.taskId}`
        );
        if (response.status === 200) {
          setAllTaskAccordingCategory(response.data.task_category_basis);
          setLoading(false);
        } else {
          console.log("Error fetching all FeaturedTask");
        }
      } catch (error) {
        console.error("Error fetching all FeaturedTask:", error);
      }
    };

    fetchAllFeaturedTask();
  }, [taskId]);

  const handleSelectChange = (e) => {
    const value = e.target.value;

    if (value === "newest") {
      setNewest(value);
      setOldest(null);
    } else if (value === "oldest") {
      setOldest(value);
      setNewest(null);
    } else {
      setNewest(null);
      setOldest(null);
    }
  };
  if (loading) {
    return <Loder />;
  }
  //   return (
  //       <div>
  //           <Nav taskId={taskId}/>
  //           <CategorySlider />
  //           <div className='w-[90%] m-auto mt-28'>

  //               <div className='flex gap-10 w-[100%] mt-12'>
  //                   <div className='w-[28%] shadow rounded-t'>
  //                       <div className='border-1 border-[#0000001a] rounded-t-[10px] text-[#333] text-start p-5'>
  //                           <div>
  //                               <h1 className="text-[20px] font-semibold">Location</h1>
  //                               <div className="border-1 border-[#0000001f] p-2 w-60 rounded-md shadow mt-3 flex items-center">
  //                                   <input
  //                                       type="search"
  //                                       placeholder="Location"
  //                                       className="w-full outline-none"
  //                                       value={location}
  //                                       onChange={(e) => setLocation(e.target.value)}
  //                                   />
  //                                   {/* <FontAwesomeIcon icon={faMagnifyingGlassLocation} size='1x' className="ml-2 text-gray-500 cursor-pointer" /> */}
  //                               </div>
  //                           </div>
  //                           <div className='mt-3'>
  //                               <h1 className='text-[20px] font-semibold mt-6'>KeyWords</h1>
  //                               <input type='search' placeholder='e.g. task title' className='border-1 border-[#0000001f] p-2 w-60 rounded-md shadow mt-3 outline-none' value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
  //                           </div>
  //                           <div className='mt-6'>
  //                               <h1 className='text-[20px] font-semibold'>Category</h1>
  //                               {
  //                                   allFeaturedTask.map((allFeaturedTasks, index) => (

  //                                       <div className='mt-3'>
  //                                           <Link key={index} to={`/featuredTaskDetailed/${allFeaturedTasks._id}`}>
  //                                               {allFeaturedTasks.task_category_title}
  //                                           </Link>
  //                                       </div>
  //                                   ))
  //                               }

  //                           </div>
  //                           {/* <div className='mt-6'>
  //                               <h1 className='text-[20px] font-semibold'>Job Type</h1> */}
  //                               {/* <div className='mt-2'>
  //                                   <label className="relative inline-flex items-center cursor-pointer mt-3">
  //                                       <div className='flex gap-5 text-[1.1rem]'>
  //                                           <input type="text" className="sr-only peer" value={taskType} onChange={(e) => setTaskType(e.target.value)} />
  //                                           <div className="w-15 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:bg-orange-500 transition duration-300 ease-in-out"></div>
  //                                           <div className="absolute left-1 top-1 w-5 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-8 transition duration-300 ease-in-out"></div>
  //                                           <p>Full Time</p>
  //                                       </div>
  //                                   </label>
  //                               </div> */}
  //                               {/* <div>
  //                                   <label className="relative inline-flex items-center cursor-pointer mt-3">
  //                                       <div className='flex gap-5 text-[1.1rem]'>
  //                                           <input type="checkbox" className="sr-only peer" checked={partTime} onChange={(e) => setPartTime(e.target.value)} />
  //                                           <div className="w-15 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:bg-orange-500 transition duration-300 ease-in-out"></div>
  //                                           <div className="absolute left-1 top-1 w-5 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-8 transition duration-300 ease-in-out"></div>
  //                                           <p>Part Time</p>
  //                                       </div>
  //                                   </label>
  //                               </div>
  //                               <div>
  //                                   <label className="relative inline-flex items-center cursor-pointer mt-3">
  //                                       <div className='flex gap-5 text-[1.1rem]'>
  //                                           <input type="checkbox" className="sr-only peer" checked={internship} onChange={(e) => setInternship(e.target.value)} />
  //                                           <div className="w-15 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:bg-orange-500 transition duration-300 ease-in-out"></div>
  //                                           <div className="absolute left-1 top-1 w-5 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-8 transition duration-300 ease-in-out"></div>
  //                                           <p>Internship</p>
  //                                       </div>
  //                                   </label>
  //                               </div>
  //                               <div>
  //                                   <label className="relative inline-flex items-center cursor-pointer mt-3">
  //                                       <div className='flex gap-5 text-[1.1rem]'>
  //                                           <input type="checkbox" className="sr-only peer" checked={temporary} onChange={(e) => setTemporary(e.target.value)} />
  //                                           <div className="w-15 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:bg-orange-500 transition duration-300 ease-in-out"></div>
  //                                           <div className="absolute left-1 top-1 w-5 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-8 transition duration-300 ease-in-out"></div>
  //                                           <p>Temporary</p>
  //                                       </div>
  //                                   </label>
  //                               </div>
  //                               <div>
  //                                   <label className="relative inline-flex items-center cursor-pointer mt-3">
  //                                       <div className='flex gap-5 text-[1.1rem]'>
  //                                           <input type="checkbox" className="sr-only peer" checked={freelance} onChange={(e) => setFreelance(e.target.value)} />
  //                                           <div className="w-15 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:bg-orange-500 transition duration-300 ease-in-out"></div>
  //                                           <div className="absolute left-1 top-1 w-5 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-8 transition duration-300 ease-in-out"></div>
  //                                           <p>Freelance</p>
  //                                       </div>
  //                                   </label>
  //                               </div> */}
  //                           {/* </div> */}
  //                           <div className='mt-6'>
  //                               <h1 className='text-[20px] font-semibold'>Tags</h1>
  //                               <input type='search' placeholder='Tags' className='border-1 border-[#0000001f] outline-none p-2 w-60 rounded-md shadow mt-3' value={tags} onChange={(e) => setTags(e.target.value)} />
  //                           </div>
  //                       </div>

  //                   </div>

  //                   <div className='w-[90%]'>
  //                       <div className='flex justify-between'>
  //                           <div>
  //                               <h1 className='text-start text-[1.3rem] text-[#666] font-semibold pb-4'>Search Results</h1>

  //                           </div>
  //                           <div className='flex gap-3 items-center'>
  //                               <p className='text-start'>Sort by :</p>
  //                               <div>
  //                                   <select onChange={handleSelectChange} className='w-[180px] p-2 border-2 border-[#0000001a]'>
  //                                       <option value="all">Relevance</option>
  //                                       <option value="newest">Newest</option>
  //                                       <option value="oldest">Oldest</option>
  //                                   </select>
  //                               </div>
  //                           </div>
  //                       </div>

  //                       <div className='w-full mt-10 m-auto gap-5 grid grid-cols-1 shadow-sm'>

  //                           {

  //                               location || taskTitle || tags || newest || oldest ?
  //                                   searcData.length ?
  //                                       searcData.map((serach, index) => (
  //                                           <div key={index} className="">
  //                                               {/* <div className="flex gap-5 w-full p-10 justify-between"> */}
  //                                               <div className={`${index % 2 === 0 ? "bg-[#f9f9f9]" : ""} flex gap-5 w-full p-10 justify-between shadow-sm`}>

  //                                                   <div className='flex gap-8'>
  //                                                       <div>
  //                                                           <img className="rounded-md w-[70px] h-[60px] shadow-sm" src={`https://hireme-gdlb.onrender.com//${serach.task_logo}`} alt="Service" />
  //                                                       </div>
  //                                                       <div className='text-start'>
  //                                                           <p className='font-semibold text-[1.1rem]'>{serach?.taskTitle}</p>
  //                                                           <div className='flex gap-5 text-[#777] text-[0.875rem] mt-1'>
  //                                                               <p>{serach.taskCategoryId?.task_category_title}</p>
  //                                                               <p>{serach?.location}</p>
  //                                                               <p>{serach?.taskType}</p>
  //                                                               <p className='font-semibold'>
  //                                                                   {(() => {
  //                                                                       const createdDate = new Date(serach?.createdAt);
  //                                                                       const currentDate = new Date();

  //                                                                       const yearDiff = currentDate.getFullYear() - createdDate.getFullYear();
  //                                                                       const monthDiff = currentDate.getMonth() - createdDate.getMonth();

  //                                                                       const totalMonthsAgo = yearDiff * 12 + monthDiff;

  //                                                                       return totalMonthsAgo === 0 ? "This month" : `${totalMonthsAgo} months ago`;
  //                                                                   })()}
  //                                                               </p>
  //                                                           </div>
  //                                                       </div>
  //                                                   </div>
  //                                                   <div>
  //                                                       <Link to={`/taskSubDetailed/${serach._id}`}>
  //                                                       {
  //                                                           serach.authId._id === authId ? <button type='submit' className='cursor-pointer bg-[#f78318] text-white font-semibold p-2 w-[105px] rounded-sm'>View</button> :
  //                                                           <button type='submit' className='cursor-pointer bg-[#f78318] text-white font-semibold p-2 w-[105px] rounded-sm'>Apply Now</button>

  //                                                       }
  //                                                       </Link>
  //                                                   </div>
  //                                               </div>

  //                                           </div>
  //                                       )) : <div className='pb-7'>
  //                                           <img className="w-[9%] pt-10  m-auto" src='https://script.viserlab.com/metalance/assets/templates/basic//images/empty_list.png' />
  //                                           <h1 className='mt-3 text-[#cfcfcf]'>Project not found</h1>
  //                                       </div>

  //                                   : allTaskAccordingCategory.length ?
  //                                       allTaskAccordingCategory?.map((allTaskAccordingCategory, index) => (

  //                                           <div key={index} className="">
  //                                               {/* <div className="flex gap-5 w-full p-10 justify-between"> */}
  //                                               <div className={`${index % 2 === 0 ? "bg-[#f9f9f9]" : ""} flex gap-5 w-full p-10 justify-between shadow-sm`}>

  //                                                   <div className='flex gap-8'>
  //                                                       <div>
  //                                                           <img className="rounded-md w-[70px] h-[60px] shadow-sm" src={`https://hireme-gdlb.onrender.com//${allTaskAccordingCategory.task_logo}`} alt="Service" />
  //                                                       </div>
  //                                                       <div className='text-start'>
  //                                                           <p className='font-semibold text-[1.1rem]'>{allTaskAccordingCategory.taskTitle}</p>
  //                                                           <div className='flex gap-5 text-[#777] text-[0.875rem] mt-1'>
  //                                                               <p>{allTaskAccordingCategory.taskCategoryId.task_category_title}</p>
  //                                                               <p>{allTaskAccordingCategory.location}</p>
  //                                                               <p>{allTaskAccordingCategory.taskType}</p>
  //                                                               <p className='font-semibold'>
  //                                                                   {(() => {
  //                                                                       const createdDate = new Date(allTaskAccordingCategory.createdAt);
  //                                                                       const currentDate = new Date();

  //                                                                       const yearDiff = currentDate.getFullYear() - createdDate.getFullYear();
  //                                                                       const monthDiff = currentDate.getMonth() - createdDate.getMonth();

  //                                                                       const totalMonthsAgo = yearDiff * 12 + monthDiff;

  //                                                                       return totalMonthsAgo === 0 ? "This month" : `${totalMonthsAgo} months ago`;
  //                                                                   })()}
  //                                                               </p>
  //                                                           </div>
  //                                                       </div>
  //                                                   </div>
  //                                                   <div>
  //                                                       <Link to={`/taskSubDetailed/${allTaskAccordingCategory._id}`}>
  //                                                       {
  //                                                           allTaskAccordingCategory.authId._id === authId ? <button type='submit' className='cursor-pointer bg-[#f78318] text-white font-semibold p-2 w-[105px] rounded-sm'>View</button> :
  //                                                           <button type='submit' className='cursor-pointer bg-[#f78318] text-white font-semibold p-2 w-[105px] rounded-sm'>Apply Now</button>

  //                                                       }
  //                                                       </Link>
  //                                                   </div>
  //                                               </div>

  //                                           </div>
  //                                       )) : <div className='pb-7'>
  //                                           <img className="w-[9%] pt-10  m-auto" src='https://script.viserlab.com/metalance/assets/templates/basic//images/empty_list.png' />
  //                                           <h1 className='mt-3 text-[#cfcfcf]'>Project not found</h1>
  //                                       </div>
  //                           }
  //                       </div>
  //                   </div>
  //               </div>
  //           </div>
  //           <Footer />
  //       </div>
  //   )

  return (
    <div>
      <Nav taskId={taskId} />
      <CategorySlider />

      <div className="w-[90%] mx-auto xl:mt-28 mt-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <div className="w-full xl:w-[23%]">
            {/* Toggle Button for Mobile */}
            <div className="lg:hidden flex justify-center mb-4">
              <button
                className="flex items-center gap-2 text-white bg-[#f78318] px-4 py-2 rounded-md shadow md:hidden"
                onClick={() => setShowFilter(!showFilter)}
              >
                <IoFilter size={20} />
                Filters
              </button>
            </div>

            {/* Sidebar Filter Panel */}
            <div
              className={`bg-white rounded-xl shadow p-5 mt-5 md:mt-0 w-full xl:w-full md:w-[28%] ${
                showFilter ? "block" : "hidden"
              } md:block`}
            >
              {/* Location */}
              <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-800">
                  Location
                </h1>
                <div className="mt-3 flex items-center border border-gray-200 rounded-md shadow-sm px-3">
                  <input
                    type="search"
                    placeholder="Search location"
                    className="w-full py-2 outline-none"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              {/* Keywords */}
              <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-800">
                  Keywords
                </h1>
                <input
                  type="search"
                  placeholder="e.g. Task title"
                  className="mt-3 w-full p-2 border border-gray-200 rounded-md shadow-sm outline-none"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
              </div>

              {/* Category */}
              <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-800">
                  Category
                </h1>
                <div className="mt-4 space-y-2">
                  {allFeaturedTask.map((item, index) => (
                    <Link
                      key={index}
                      to={`/featuredTaskDetailed/${item._id}`}
                      className="block text-sm text-[#f78318] hover:underline"
                    >
                      {item.task_category_title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h1 className="text-xl font-semibold text-gray-800">Tags</h1>
                <input
                  type="search"
                  placeholder="Search tags"
                  className="mt-3 w-full p-2 border border-gray-200 rounded-md shadow-sm outline-none"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <h1 className="text-lg font-semibold text-gray-700 mb-3 md:mb-0">
                Search Results
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">Sort by:</p>
                <select
                  onChange={handleSelectChange}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="all">Relevance</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>

            {/* Result Cards */}
            <div className="mt-6 space-y-5border-2">
              {(location || taskTitle || tags || newest || oldest
                ? searcData
                : allTaskAccordingCategory
              ).length > 0 ? (
                (location || taskTitle || tags || newest || oldest
                  ? searcData
                  : allTaskAccordingCategory
                ).map((task, index) => (
                  <div
                    key={index}
                    className={`xl:p-10 p-6 rounded-xl xl:mt-8 mt-8 shadow-md transition duration-300 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
                      <div className="flex gap-5 items-start">
                        <img
                          src={`https://hireme-gdlb.onrender.com//${task.task_logo}`}
                          alt="Task"
                          className="w-16 h-14 rounded-md shadow"
                        />
                        <div>
                          <h2 className="font-semibold text-lg text-start text-gray-800">
                            {task.taskTitle}
                          </h2>
                          <div className="text-sm text-gray-500 flex flex-wrap gap-4 mt-2">
                            <span>
                              {task.taskCategoryId?.task_category_title}
                            </span>
                            <span>{task.location}</span>
                            <span>{task.taskType}</span>
                            <span className="font-medium text-gray-600">
                              {(() => {
                                const createdDate = new Date(task.createdAt);
                                const currentDate = new Date();
                                const yearDiff =
                                  currentDate.getFullYear() -
                                  createdDate.getFullYear();
                                const monthDiff =
                                  currentDate.getMonth() -
                                  createdDate.getMonth();
                                const totalMonthsAgo =
                                  yearDiff * 12 + monthDiff;
                                return totalMonthsAgo === 0
                                  ? "This month"
                                  : `${totalMonthsAgo} months ago`;
                              })()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link to={`/taskSubDetailed/${task._id}`}>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md font-semibold transition duration-200">
                          {task.authId._id === authId ? "View" : "Apply Now"}
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center mt-10">
                  <img
                    src="https://script.viserlab.com/metalance/assets/templates/basic//images/empty_list.png"
                    className="w-20 mx-auto"
                    alt="No data"
                  />
                  <p className="text-gray-400 mt-2">Project not found</p>
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

export default FeaturedTaskDetailed;
