import React, { useEffect, useState } from "react";
import Nav from "../components/nav";
import OtherNav from "../components/otherNav";
import Footer from "../components/footer";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import authConfig from "../api/config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faL } from "@fortawesome/free-solid-svg-icons";
import FeaturedTaskSubDetails from "./featuredTaskSubDetails";
import { useRef } from "react";
import { CreateTaskValidation } from "../validations/RegisterValidation";
import Loder from "../components/loader/loder";
import axios from "axios";
const CreateTask = () => {
  const [activeStep, setActiveStep] = useState(0);
  console.log(activeStep, "steps1");

  const [activeStepforSubTab, setActiveStepforSubTab] = useState(null);
  console.log(activeStepforSubTab, "steps2");

  const [openModalForCreateTask, setOpenModalForCreateTask] = useState(false);

  const authId = JSON.parse(localStorage.getItem("authId"));

  const [taskTitle, setTaskTitle] = useState("");
  const [task_Skill_Required, setTask_Skill_Required] = useState([]);
  const [location, setLocation] = useState("");
  const [Task_Max_Budget, setTask_Max_Budget] = useState("");
  const [Task_Min_Budget, setTask_Min_Budget] = useState("");
  const [fixed_Task_type, setfixed_Task_type] = useState("Fixed Price Project");
  const [taskDescription, setTaskDescription] = useState("");
  const [task_logo, set_task_logo] = useState("");
  const [task, setAllTask] = useState([]);

  console.log(task, "tasksss");
  const [taskCategory, setTaskCategory] = useState([]);
  console.log(taskCategory, "89899989898");

  const [taskCategoryId, setTaskCategoryId] = useState("");

  console.log(task_logo, "logo");

  const [datedTaskData, setUpdatedTaskData] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(false);

  const [updatedData, setUpdatedData] = useState(false);

  const [taskIdForUpdatedTask, setTaskIdForUpdatedTask] = useState("");
  console.log(taskIdForUpdatedTask, "tupid");

  const [bid, setBid] = useState([]);
  console.log(bid, "bidsetyuii");

  const [receiverBid, setReceiverBid] = useState([]);
  console.log(receiverBid, "receiverBid");
  const [loading, setLoading] = useState(true);

  const headingsForTask = ["As freelancer", "As client"];

  const headingsForSubTask = ["Running Project", "Past/Reject Project"];

  const [taskUpdatedDataShow, setTaskUpdatedDataShow] = useState(false);

  const [asClintRuningProject, setasClintRuningProject] = useState([]);
  console.log(asClintRuningProject, "asclient");

  const [asClintRejectProject, setasClintRejectProject] = useState([]);

  const handleOpenModalForCreateTask = () => {
    
    setOpenModalForCreateTask(true);
    setTaskTitle("")
    setLocation("");
    setTaskDescription("");
    setTask_Max_Budget("");
    setTask_Min_Budget("");
    set_task_logo("");
    setfixed_Task_type("");
    setTask_Skill_Required("");
    setTaskCategoryId("");
    setTaskIdForUpdatedTask("");
    setUploadedFileName("")

  }

  const handleCloseModalForCreateTask = () => setOpenModalForCreateTask(false);

  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await CreateTaskValidation.validate(
        {
          taskTitle,
          task_Skill_Required,
          location,
          taskCategoryId,
          Task_Min_Budget,
          Task_Max_Budget,
          fixed_Task_type,
          taskDescription,
          task_logo,
        },
        { abortEarly: false }
      );
      const formData = new FormData();
      formData.append("taskTitle", taskTitle);
      formData.append("task_Skill_Required", task_Skill_Required);
      formData.append("location", location);
      formData.append("taskCategoryId", taskCategoryId);
      formData.append("Task_Max_Budget", Task_Max_Budget);
      formData.append("Task_Min_Budget", Task_Min_Budget);
      formData.append("fixed_Task_type", fixed_Task_type);
      formData.append("taskDescription", taskDescription);
      formData.append("task_logo", task_logo);

      const response = await authConfig.post(`/createTask/${authId}`, formData);
      console.log(response, "response");

      if (response?.status === 200) {
        toast.success("Task created successfully");
        setOpenModalForCreateTask(false);
        setTaskTitle("");
        setLocation("");
        setTaskDescription("");
        setTask_Max_Budget("");
        setTask_Min_Budget("");
        set_task_logo("");
        setfixed_Task_type("");
        setTask_Skill_Required("");
        setTaskCategoryId("");
        setUpdatedTaskData(false);
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        error.errors.forEach((err) => toast.error(err));
        return;
      }
      if (error?.response?.data.message === "firstly you register") {
        toast.error("You are not loggedIn");
      } else if (error?.response?.data.message === "already have this task") {
        toast.error("You already created this task");
      }
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);

    if (file) {
      set_task_logo(file);
      setUploadedFileName(file.name);
    }
  };

  useEffect(() => {
    const fetchAllTask = async () => {
      // window.scrollTo(0, 0);
      try {
        const response = await authConfig.get(`task-auth-according/${authId}`);
        if (response.status === 200) {
          setAllTask(response.data.yourCreatedTask);
          setUpdatedTaskData(true);
          setUpdatedData(true);
          setLoading(false);
        } else {
          console.log("Error fetching all Task");
        }
      } catch (error) {
        console.error("Error fetching all Task:", error);
      }
    };

    fetchAllTask();
  }, [datedTaskData, updatedData]);

  useEffect(() => {
    const fetchTaskCategory = async () => {
      window.scrollTo(0, 0);
      try {
        const response = await authConfig.get("/show-all-task-category");
        if (response.status === 200) {
          setTaskCategory(response.data.taskCategory);
        } else {
          console.log("Error fetching TaskCategory");
        }
      } catch (error) {
        console.error("Error fetching TaskCategory:", error);
      }
    };

    fetchTaskCategory();
  }, []);

  const handleTaskCategoryChange = (id) => {
    setTaskCategoryId(id);
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
    // setOpenDropdown(true)
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await authConfig.delete(`/delete-task/${id}`);
      if (response.status === 200) {
        toast.success("Task deleted successfully");
        setUpdatedData(false);
        setOpenDropdown(false);
      }
    } catch (error) {
      if (error.response.data.message === "Something error") {
        toast.error("Something error");
      }
    }
  };
  const handleEditClick = (data) => {
    console.log(data, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    setTaskIdForUpdatedTask(data._id);
    setTaskTitle(data?.taskTitle);
    setLocation(data?.location);
    setTaskDescription(data?.taskDescription);
    setTask_Max_Budget(data?.Task_Max_Budget);
    setTask_Min_Budget(data?.Task_Min_Budget);
    set_task_logo(data?.task_logo.url);
    setfixed_Task_type(data?.fixed_Task_type);
    setTask_Skill_Required(data?.task_Skill_Required);
    setTaskCategoryId(data?.taskCategoryId?._id);
    setOpenModalForCreateTask(true);
    
  };

  const handleUpdateTask = async () => {
    try {
      const formData = new FormData();
      formData.append("taskTitle", taskTitle);
      formData.append("task_Skill_Required", task_Skill_Required);
      formData.append("location", location);
      formData.append("Task_Max_Budget", Task_Max_Budget);
      formData.append("Task_Min_Budget", Task_Min_Budget);
      formData.append("fixed_Task_type", fixed_Task_type);
      formData.append("taskDescription", taskDescription);
      formData.append("task_logo", task_logo);
      formData.append("taskCategoryId", taskCategoryId);
      const response = await authConfig.put(
        `/update-task/${taskIdForUpdatedTask}`,
        formData
      );
      if (response.status === 200) {
        toast.success("Task updated suceesfully");
        setUpdatedData(false);
        setOpenDropdown(false);
        setOpenModalForCreateTask(false);
        setTaskTitle("");
        setLocation("");
        setTaskDescription("");
        setTask_Max_Budget("");
        setTask_Min_Budget("");
        set_task_logo("");
        setfixed_Task_type("");
        setTask_Skill_Required("");
        setTaskCategoryId("");
      }
    } catch (error) {
      toast.error("Task update error");
    }
  };

  useEffect(() => {
    const fetchtaskAllAsBid = async () => {
      try {
        const response = await authConfig.get(`all-bid-task-list/${authId}`);
        if (response.status === 200) {
          setBid(response.data.allBidTask);
          // setUpdatedData(true)
          setTaskUpdatedDataShow(false);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    };
    fetchtaskAllAsBid();
  }, [authId, taskUpdatedDataShow]);

  const handleCreateAcceptOrrejectStatus = async (value, id) => {
    try {
      const response = await authConfig.patch(`/updateBidStatus/${id}`, {
        confirmation_bid_user: value,
      });
      console.log(response, "repo");

      if (response.status === 200) {
        if (value === "Accepted") {
          toast.success("You accepted the task");
        } else {
          toast.success("You reject the task");
        }
        setTaskUpdatedDataShow(true);
      }
    } catch (error) {
      toast.error("Project Approved error");
    }
  };

  const filteredtask = bid.filter(
    (project) =>
      project.status === "Alloted" &&
      project.confirmation_bid_user !== "Accepted" &&
      project.confirmation_bid_user !== "Rejected"
  );
  console.log(filteredtask, "ffffgffffff");

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null); // Close dropdown
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchasClintRuningProject = async () => {
      try {
        const response = await authConfig.get(`/running/${authId}`);
        if (response.status === 200) {
          setasClintRuningProject(response.data.runningTask);
          setasClintRejectProject(response.data.rejectedTask);
          console.log(response.data.runningTask, "ppppppp");
        }
      } catch (error) {
        console.error("Error fetching asClintRuningProject", error);
      }
    };

    fetchasClintRuningProject();
  }, [authId]);

  // if (loading) {
  //   return <Loder />;
  // }

  return (
    <div className="bg-[#eef2f8] pb-10">
      
      <OtherNav />
      {loading ? (
        <Loder />
      ) : (
        <>
         <div className="container mx-auto px-4 py-6 w-[90%] md:w-[82%]">
  {/* Top Header Section */}
  <div className="flex sm:flex-row items-center bg-white shadow-xl rounded-t-md mb-6 xl:pb-0 pb-4 overflow-x-auto w-full">
   {/* Navigation Buttons */}
   <div className="flex gap-2 min-w-max p-1">
    {headingsForTask.map((heading, index) => (
     <button
      key={index}
      onClick={() => setActiveStep(index)}
      className={`transition-all duration-300 ease-in-out ${
       activeStep === index ? "text-[#F78318]" : "text-[#4b5563]"
      } font-semibold text-sm sm:text-base md:text-[1rem] p-2 sm:p-3 w-[140px] sm:w-[160px] md:w-[180px] rounded-md cursor-pointer flex items-center justify-center gap-2`}
     >
      {index === 0 && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7m-16 0l-4 4m0 0l4 4m-4-4h14m-2-4h.01M17 16h.01"></path></svg>} {/* Briefcase/User Icon for "As freelancer" */}
      {index === 1 && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h.01m9-4h1m-1 4h.01m3-4h.01m-3 4h.01"></path></svg>} {/* Building/User Group Icon for "As client" */}
      {heading}
     </button>
    ))}
   </div>

   {/* Create Task Button */}
   <div className="ml-auto flex-shrink-0 pr-4">
    {activeStep === 1 && (
     <button
      className="bg-[#F78318] text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-orange-600 transition duration-300 text-sm sm:text-base flex items-center gap-2"
      onClick={handleOpenModalForCreateTask}
     >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> {/* Plus Icon */}
     Create Task
     </button>
    )}
   </div>
  </div>

  {/* Sub Tab Section */}
  <div className="flex flex-row justify-start bg-white rounded-b-md shadow-md mb-8 overflow-x-auto xl:pt-0 pt-[14px] px-4">
   {/* All Projects Button */}
   <button
    onClick={() => setActiveStepforSubTab(null)}
    className={`transition-all duration-300 whitespace-nowrap ${
     activeStepforSubTab === null
      ? "text-[#F78318]"
      : "text-[#4b5563]"
    } font-semibold text-sm sm:text-base md:text-[1rem] p-2 sm:p-3 rounded-md cursor-pointer mr-2 flex items-center justify-center gap-2`}
    style={{ minWidth: "140px" }}
   >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7m-16 0l-4 4m0 0l4 4m-4-4h14m-2-4h.01M17 16h.01"></path></svg> {/* Folder/List Icon */}
    All Projects
   </button>
   {/* Sub Tasks Buttons */}
   {headingsForSubTask.map((heading, index) => (
    <button
     key={index}
     onClick={() => setActiveStepforSubTab(index)}
     className={`transition-all duration-300 whitespace-nowrap ${
      activeStepforSubTab === index
       ? "text-[#F78318]"
       : "text-[#4b5563]"
     } font-semibold text-sm sm:text-base md:text-[1rem] p-2 sm:p-3 rounded-md cursor-pointer mr-2 flex items-center justify-center gap-2`}
     style={{ minWidth: "140px" }}
    >
     {index === 0 && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>} {/* Checkmark/Play Icon for "Running Project" */}
     {index === 1 && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>} {/* Cross/Ban Icon for "Past/Reject Project" */}
     {heading}
    </button>
   ))}
  </div>
 </div>
          <div className="w-[80%] m-auto rounded-md bg-white overflow-x-auto">
            {activeStep === 0 &&
            (activeStepforSubTab === null ||
              activeStepforSubTab === undefined) ? (
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b text-[0.875rem]">
                  <tr>
                    <th className="px-6 py-4">Project Title</th>
                    <th className="px-6 py-4">Bid Description</th>
                    <th className="px-6 py-4">Project Owner</th>
                    <th className="px-6 py-4">Bid Amount</th>
                    <th className="px-6 py-4">Delivery Status</th>
                    <th className="px-6 py-4">Days/hrs</th>
                    <th className="px-6 py-4">Client Status</th>
                    <th className="px-6 py-4">Your Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredtask.length ? (
                    filteredtask.map((bid, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-6 py-4 text-[#F78318] font-semibold">
                          <Link to={`/taskSubDetailed/${bid.taskId?._id}`}>
                            {bid?.taskId?.taskTitle?.substring(0, 80) ||
                              "No Title"}
                            ...
                          </Link>
                        </td>
                        <td className="px-6 py-4 font-semibold">
                          {bid?.description?.substring(0, 80) || "Unknown"}
                        </td>
                        <td className="px-6 py-6 text-[#F78318] font-bold">
                          <Link to={`/userServices/${bid?.TaskCreaterId?._id}`}>
                            {bid?.TaskCreaterId?.firstName || "N/A"}
                          </Link>
                        </td>
                        <td className="px-6 py-4 font-bold">
                          {bid?.minimalRate || "N/A"}
                        </td>
                        <td className="px-6 py-4 font-bold">
                          {bid?.deliveryTime || "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          <p className="p-1.5 w-full text-center font-bold rounded-md">
                            {bid?.deliveryDays}
                          </p>
                        </td>
                        <td className="px-6 py-4 font-bold">
                          {bid?.status || "N/A"}
                        </td>
                        <td className="px-6 py-4 font-bold flex gap-2">
                          <button
                            className="text-[#F78318] cursor-pointer"
                            onClick={() =>
                              handleCreateAcceptOrrejectStatus(
                                "Accepted",
                                bid._id
                              )
                            }
                          >
                            Accepted
                          </button>
                          <button
                            className="text-[#F78318] cursor-pointer"
                            onClick={() =>
                              handleCreateAcceptOrrejectStatus(
                                "Rejected",
                                bid._id
                              )
                            }
                          >
                            Rejected
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center py-10">
                        <img
                          className="w-[9%] m-auto"
                          src="https://script.viserlab.com/metalance/assets/templates/basic/images/empty_list.png"
                          alt="No Projects"
                        />
                        <h1 className="mt-3 text-[#CFCFCF]">
                          No projects found
                        </h1>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : activeStep === 0 && activeStepforSubTab === 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b text-[0.875rem]">
                    <tr>
                      <th className="px-6 py-4">Project Title</th>
                      <th className="px-6 py-4">Bid Description</th>
                      <th className="px-6 py-4">Project Owner</th>
                      <th className="px-6 py-4">Bid Amount</th>
                      <th className="px-6 py-4">Delivery Status</th>
                      <th className="px-6 py-4">Days/hrs</th>
                      <th className="px-6 py-4">Client Status</th>
                      <th className="px-6 py-4">Your Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bid.length ? (
                      bid
                        .filter(
                          (project) =>
                            project.confirmation_bid_user === "Accepted"
                        )
                        .map((bid, index) => (
                          <tr key={index} className="border-b">
                            <td className="px-6 py-4 text-[#F78318] font-semibold">
                              <Link to={`/taskSubDetailed/${bid.taskId?._id}`}>
                                {bid?.taskId?.taskTitle?.substring(0, 80) ||
                                  "No Title"}
                                ...
                              </Link>
                            </td>
                            <td className="px-6 py-4 font-semibold">
                              {bid?.description?.substring(0, 80) || "Unknown"}
                            </td>
                            <td className="px-6 py-6 text-[#F78318] font-bold">
                              <Link
                                to={`/userServices/${bid?.TaskCreaterId?._id}`}
                              >
                                {bid?.TaskCreaterId?.firstName || "N/A"}
                              </Link>
                            </td>
                            <td className="px-6 py-4 font-bold">
                              {bid?.minimalRate || "N/A"}
                            </td>
                            <td className="px-6 py-4 font-bold">
                              {bid?.deliveryTime || "N/A"}
                            </td>
                            <td className="px-6 py-4">
                              <p className="p-1.5 w-full text-center font-bold rounded-md">
                                {bid?.deliveryDays}
                              </p>
                            </td>
                            <td className="px-6 py-4 font-bold">
                              {bid?.status || "N/A"}
                            </td>
                            <td className="px-6 py-4 font-bold">
                              {bid?.confirmation_bid_user}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="text-center py-10">
                          <img
                            className="w-[9%] m-auto"
                            src="https://script.viserlab.com/metalance/assets/templates/basic/images/empty_list.png"
                            alt="No Projects"
                          />
                          <h1 className="mt-3 text-[#CFCFCF]">
                            No projects found
                          </h1>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : activeStep === 0 && activeStepforSubTab === 1 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b text-[0.875rem]">
                      <tr>
                        <th className="px-6 py-4">Project Title</th>
                        <th className="px-6 py-4">Bid Description</th>
                        <th className="px-6 py-4">Project owner</th>
                        <th className="px-6 py-4">Bid Amount</th>
                        <th className="px-6 py-4">Delivery Status</th>
                        <th className="px-6 py-4">Days/hrs</th>
                        <th className="px-6 py-4">Client Status</th>
                        <th className="px-6 py-4">Your Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bid.length ? (
                        bid
                          .filter(
                            (project) =>
                              project.confirmation_bid_user === "Rejected"
                          )
                          .map((bid, index) => (
                            <tr key={index} className="border-b">
                              <td className="px-6 py-4 text-[#F78318] font-semibold">
                                <Link
                                  to={`/taskSubDetailed/${bid.taskId?._id}`}
                                >
                                  {bid?.taskId?.taskTitle?.substring(0, 80) ||
                                    "No Title"}
                                  ...
                                </Link>
                              </td>
                              <td className="px-6 py-4 font-semibold">
                                {bid?.description?.substring(0, 80) ||
                                  "Unknown"}
                              </td>
                              <Link
                                to={`/userServices/${bid?.TaskCreaterId?._id}`}
                              >
                                <td className="px-6 py-6 text-[#F78318] font-bold">
                                  {bid?.TaskCreaterId?.firstName || "N/A"}
                                </td>
                              </Link>
                              <td className="px-6 py-4 font-bold">
                                {bid?.minimalRate || "N/A"}
                              </td>
                              <td className="px-6 py-4 font-bold">
                                {bid?.deliveryTime || "N/A"}
                              </td>
                              <td className="px-6 py-4">
                                <p className="p-1.5 w-full text-center font-bold rounded-md">
                                  {bid?.deliveryDays}
                                </p>
                              </td>
                              <td className="px-6 py-4 font-bold">
                                {bid?.status || "N/A"}
                              </td>

                              <td className="px-6 py-4 font-bold">
                                {bid?.confirmation_bid_user}
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center py-10">
                            <img
                              className="w-[9%] m-auto"
                              src="https://script.viserlab.com/metalance/assets/templates/basic/images/empty_list.png"
                              alt="No Projects"
                            />
                            <h1 className="mt-3 text-[#CFCFCF]">
                              No projects found
                            </h1>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            ) : null}

            {/* {activeStep === 1 &&
          (activeStepforSubTab === null ||
            activeStepforSubTab === undefined) ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b text-[0.875rem]">
                  <tr>
                    <th className="px-6 py-4">Task Title</th>
                    <th className="px-6 py-4">Task Description</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Max Budget</th>
                    <th className="px-6 py-4">Min Budget</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {task.length ? (
                    task.map((task, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-6 py-4 text-[#F78318] font-semibold">
                          <Link to={`/taskSubDetailed/${task._id}`}>
                            {task?.taskTitle?.substring(0, 80) || "No Title"}...
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-[#F78318] font-semibold">
                          <Link to={`/taskSubDetailed/${task._id}`}>
                            {task?.taskDescription.substring(0, 80) ||
                              "Unknown"}
                          </Link>
                        </td>
                        <td className="px-6 py-4 font-bold">
                          {task?.location || "N/A"}
                        </td>
                        <td className="px-6 py-4 font-bold">
                          {task?.Task_Max_Budget || "N/A"}
                        </td>
                        <td className="px-6 py-4 font-bold">
                          {task?.Task_Min_Budget || "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          <p className="bg-[#ffab1a26] text-[#FFAB1A] p-1.5 w-full text-center font-semibold rounded-md">
                            {task?.taskVerify
                              ? "verified"
                              : "not verified" || "Unknown"}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="border-1 w-[55%] h-8 border-[#0000001a] rounded-full">
                            <FontAwesomeIcon
                              className="cursor-pointer px-2.5 py-2"
                              onClick={() => toggleDropdown(index)}
                              icon={faEllipsisVertical}
                            ></FontAwesomeIcon>
                            {openDropdown === index && (
                              <div
                                ref={dropdownRef}
                                className="absolute right-32 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10"
                              >
                                <ul className="py-2 px-2 text-sm text-gray-700">
                                  <li>
                                    <button
                                      onClick={() => handleEditClick(task)}
                                      className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                                    >
                                      Edit
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      onClick={() => handleDeleteTask(task._id)}
                                      className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                                    >
                                      Delete
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-10">
                        <img
                          className="w-[9%] m-auto"
                          src="https://script.viserlab.com/metalance/assets/templates/basic/images/empty_list.png"
                          alt="No Projects"
                        />
                        <h1 className="mt-3 text-[#CFCFCF]">
                          No projects found
                        </h1>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : authId ? (
            activeStep === 1 && activeStepforSubTab === 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b text-[0.875rem]">
                    <tr>
                      <th className="px-6 py-4">Project Title</th>
                      <th className="px-6 py-4">Freelancer</th>
                      <th className="px-6 py-4">Project Owner</th>
                      <th className="px-6 py-4">Bid Amount</th>
                      <th className="px-6 py-4">Delivery Status</th>
                      <th className="px-6 py-4">Days/hrs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                    asClintRuningProject.length ? (
                
                      asClintRuningProject?.map((clientRunning, index) => (
                        console.log(clientRunning,"bidfreelancer"),
                        
                          <tr key={index} className="border-b">
                            <td className="px-6 py-4 text-[#F78318] font-semibold">
                              <Link to={`/taskSubDetailed/${clientRunning.taskId?._id}`}>
                                {clientRunning?.taskId?.taskTitle?.substring(0, 80) ||
                                  "No Title"}
                                ...
                              </Link>
                            </td>
                            <td className="px-6 py-4 font-semibold">
                              {clientRunning?.loginAuthId.firstName || "Unknown"}
                            </td>
                            <td className="px-6 py-6 text-[#F78318] font-bold">
                              <Link
                                to={`/userServices/${clientRunning?.TaskCreaterId?._id}`}
                              >
                                {clientRunning?.TaskCreaterId?.firstName || "N/A"}
                              </Link>
                            </td>
                            <td className="px-6 py-4 font-bold">
                              {clientRunning?.minimalRate || "N/A"}
                            </td>
                            <td className="px-6 py-4 font-bold">
                              {clientRunning?.deliveryTime || "N/A"}
                            </td>
                            <td className="px-6 py-4">
                              <p className="p-1.5 w-full text-center font-bold rounded-md">
                                {clientRunning?.deliveryDays}
                              </p>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="text-center py-10">
                          <img
                            className="w-[9%] m-auto"
                            src="https://script.viserlab.com/metalance/assets/templates/basic/images/empty_list.png"
                            alt="No Projects"
                          />
                          <h1 className="mt-3 text-[#CFCFCF]">
                            No projects found
                          </h1>
                        </td>
                      </tr>
                    )
                    }
                  </tbody>
                </table>
              </div>
            ) : null
          )  : null} */}

            {activeStep === 1 ? (
              activeStepforSubTab === null ||
              activeStepforSubTab === undefined ? (
                // Block 1: Default view (no subtabs selected)
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b text-[0.875rem]">
                      <tr>
                        <th className="px-6 py-4">Task Title</th>
                        <th className="px-6 py-4">Task Description</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Max Budget</th>
                        <th className="px-6 py-4">Min Budget</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {task.length ? (
                        task.map((task, index) => (
                          <tr key={index} className="border-b">
                            <td className="px-6 py-4 text-[#F78318] font-semibold">
                              <Link to={`/taskSubDetailed/${task._id}`}>
                                {task?.taskTitle?.substring(0, 80) ||
                                  "No Title"}
                                ...
                              </Link>
                            </td>
                            <td className="px-6 py-4 text-[#F78318] font-semibold">
                              <Link to={`/taskSubDetailed/${task._id}`}>
                                {task?.taskDescription?.substring(0, 80) ||
                                  "Unknown"}
                              </Link>
                            </td>
                            <td className="px-6 py-4 font-bold">
                              {task?.location || "N/A"}
                            </td>
                            <td className="px-6 py-4 font-bold">
                              {task?.Task_Max_Budget || "N/A"}
                            </td>
                            <td className="px-6 py-4 font-bold">
                              {task?.Task_Min_Budget || "N/A"}
                            </td>
                            <td className="px-6 py-4">
                              <p className="bg-[#ffab1a26] text-[#FFAB1A] p-1.5 w-full text-center font-semibold rounded-md">
                                {task?.taskVerify ? "verified" : "not verified"}
                              </p>
                            </td>
                            <td className="px-6 py-4">
                              <div className="border-1 w-[55%] h-8 border-[#0000001a] rounded-full">
                                <FontAwesomeIcon
                                  className="cursor-pointer px-2.5 py-2"
                                  onClick={() => toggleDropdown(index)}
                                  icon={faEllipsisVertical}
                                />
                                {openDropdown === index && (
                                  <div
                                    ref={dropdownRef}
                                    className="absolute right-32 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10"
                                  >
                                    <ul className="py-2 px-2 text-sm text-gray-700">
                                      <li>
                                        <button
                                          onClick={() => handleEditClick(task)}
                                          className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                                        >
                                          Edit
                                        </button>
                                      </li>
                                      <li>
                                        <button
                                          onClick={() =>
                                            handleDeleteTask(task._id)
                                          }
                                          className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                                        >
                                          Delete
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="text-center py-10">
                            <img
                              className="w-[9%] m-auto"
                              src="https://script.viserlab.com/metalance/assets/templates/basic/images/empty_list.png"
                              alt="No Projects"
                            />
                            <h1 className="mt-3 text-[#CFCFCF]">
                              No projects found
                            </h1>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : Number(activeStepforSubTab) === 0 && authId ? (
                // Block 2: Running projects
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b text-[0.875rem]">
                      <tr>
                        <th className="px-6 py-4">Project Title</th>
                        <th className="px-6 py-4">Freelancer</th>
                        <th className="px-6 py-4">Project Owner</th>
                        <th className="px-6 py-4">Bid Amount</th>
                        <th className="px-6 py-4">Delivery Status</th>
                        <th className="px-6 py-4">Days/hrs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {asClintRuningProject.length ? (
                        asClintRuningProject.map((clientRunning, index) => (
                          <tr key={index} className="border-b">
                            <td className="px-6 py-4 text-[#F78318] font-semibold">
                              <Link
                                to={`/taskSubDetailed/${clientRunning.taskId?._id}`}
                              >
                                {clientRunning?.taskId?.taskTitle?.substring(
                                  0,
                                  80
                                ) || "No Title"}
                                ...
                              </Link>
                            </td>
                            <td className="px-6 py-4 font-semibold">
                              {clientRunning?.loginAuthId?.firstName ||
                                "Unknown"}
                            </td>
                            <td className="px-6 py-6 text-[#F78318] font-bold">
                              <Link
                                to={`/userServices/${clientRunning?.TaskCreaterId?._id}`}
                              >
                                {clientRunning?.TaskCreaterId?.firstName ||
                                  "N/A"}
                              </Link>
                            </td>
                            <td className="px-6 py-4 font-bold">
                              {clientRunning?.minimalRate || "N/A"}
                            </td>
                            <td className="px-6 py-4 font-bold">
                              {clientRunning?.deliveryTime || "N/A"}
                            </td>
                            <td className="px-6 py-4">
                              <p className="p-1.5 w-full text-center font-bold rounded-md">
                                {clientRunning?.deliveryDays}
                              </p>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center py-10">
                            <img
                              className="w-[9%] m-auto"
                              src="https://script.viserlab.com/metalance/assets/templates/basic/images/empty_list.png"
                              alt="No Projects"
                            />
                            <h1 className="mt-3 text-[#CFCFCF]">
                              No projects found
                            </h1>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : Number(activeStepforSubTab) === 1 ? (
                // Block 3: Rejected projects
                <div>
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b text-[0.875rem]">
                        <tr>
                          <th className="px-6 py-4">Project Title</th>
                          <th className="px-6 py-4">Freelancer</th>
                          <th className="px-6 py-4">Project Owner</th>
                          <th className="px-6 py-4">Bid Amount</th>
                          <th className="px-6 py-4">Delivery Status</th>
                          <th className="px-6 py-4">Days/hrs</th>
                        </tr>
                      </thead>
                      <tbody>
                        {asClintRejectProject.length ? (
                          asClintRejectProject?.map(
                            (rejectedtaskclient, index) => (
                              <tr key={index} className="border-b">
                                <td className="px-6 py-4 text-[#F78318] font-semibold">
                                  <Link
                                    to={`/taskSubDetailed/${rejectedtaskclient.taskId?._id}`}
                                  >
                                    {rejectedtaskclient?.taskId?.taskTitle?.substring(
                                      0,
                                      80
                                    ) || "No Title"}
                                    ...
                                  </Link>
                                </td>
                                <td className="px-6 py-4 font-semibold">
                                  {rejectedtaskclient?.description?.substring(
                                    0,
                                    80
                                  ) || "Unknown"}
                                </td>
                                <Link
                                  to={`/userServices/${rejectedtaskclient?.TaskCreaterId?._id}`}
                                >
                                  <td className="px-6 py-6 text-[#F78318] font-bold">
                                    {rejectedtaskclient?.TaskCreaterId
                                      ?.firstName || "N/A"}
                                  </td>
                                </Link>
                                <td className="px-6 py-4 font-bold">
                                  {rejectedtaskclient?.minimalRate || "N/A"}
                                </td>
                                <td className="px-6 py-4 font-bold">
                                  {rejectedtaskclient?.deliveryTime || "N/A"}
                                </td>
                                <td className="px-6 py-4">
                                  <p className="p-1.5 w-full text-center font-bold rounded-md">
                                    {rejectedtaskclient?.deliveryDays}
                                  </p>
                                </td>
                              </tr>
                            )
                          )
                        ) : (
                          <tr>
                            <td colSpan={5} className="text-center py-10">
                              <img
                                className="w-[9%] m-auto"
                                src="https://script.viserlab.com/metalance/assets/templates/basic/images/empty_list.png"
                                alt="No Projects"
                              />
                              <h1 className="mt-3 text-[#CFCFCF]">
                                No projects found
                              </h1>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null
            ) : null}
          </div>
        </>
      )}
      {/* create task pop up */}
      <Dialog
        open={openModalForCreateTask}
        onClose={() => setOpenModalForCreateTask(false)}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 overflow-x-auto bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-7xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base text-[1.8rem] font-bold text-[#495463]"
                    >
                      Post a Task
                    </DialogTitle>
                    <div className="mt-5">
                      <div className="xl:flex block gap-5 items-center">
                        <div className="grid w-full">
                          <label className="text-[#333] xl:text-[18px] text-[15px] font-semibold">
                            Task Name
                          </label>
                          <input
                            className="border-1 border-[#00000021] rounded-[5px] w-full p-3 mt-[4px] outline-none"
                            value={taskTitle}
                            name="title"
                            onChange={(e) => setTaskTitle(e.target.value)}
                            placeholder="Enter Task"
                          />
                        </div>
                        <div className="w-full">
                          <label className="text-[#333] xl:text-[18px] text-[15px] font-semibold">
                            Category
                          </label>
                          <select
                            className="border-1 border-[#00000021] rounded-[5px] w-full p-3 mt-[4px] outline-none"
                            onChange={(e) =>
                              handleTaskCategoryChange(e.target.value)
                            }
                            value={taskCategoryId || ""}
                          >
                            <option value="">Select Category</option>
                            {(taskCategory || []).map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.task_category_title}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="grid w-full">
                          <label className="text-[#333] xl:text-[18px] text-[15px] font-semibold">
                            Location
                          </label>
                          <input
                            className="border-1 border-[#00000021] rounded-[5px] w-full p-3 mt-[4px] outline-none"
                            value={location}
                            name="location"
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter Location"
                          />
                        </div>
                      </div>
                      <div className="xl:flex block gap-5 mt-5">
                        <div className="grid w-full">
                          <label className="text-[#333] xl:text-[18px] text-[15px] font-semibold">
                            What is your estimated budget?
                          </label>
                          <input
                            placeholder="Minimum Budget $"
                            type="number"
                            className="border-1 border-[#00000021] rounded-[5px] w-full p-3 mt-[6px] outline-none"
                            value={Task_Min_Budget}
                            name="Task_Min_Budget"
                            onChange={(e) => setTask_Min_Budget(e.target.value)}
                          />
                        </div>
                        <div className="grid w-full">
                          <label className="text-[#333] xl:text-[18px] text-[15px] font-semibold">
                            {" "}
                          </label>
                          <input
                            placeholder="Maximum Budget $"
                            type="number"
                            className="border-1 border-[#00000021] rounded-[5px] w-full xl:p-[0.1px] p-3 px-3 mt-[8px] outline-none"
                            value={Task_Max_Budget}
                            name="Task_Max_Budget"
                            onChange={(e) => setTask_Max_Budget(e.target.value)}
                          />
                        </div>
                        <div className="grid w-full xl:mt-0 mt-10">
                          <label className="text-[#333] xl:text-[18px] text-[15px] font-semibold">
                            What skills are required?
                          </label>
                          <input
                            placeholder="Add skills"
                            className="border-1 border-[#00000021] rounded-[5px] w-full p-3 mt-[6px] outline-none"
                            value={task_Skill_Required}
                            name="task_Skill_Required"
                            onChange={(e) =>
                              setTask_Skill_Required(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="flex gap-5 mt-5">
                        <div className="xl:flex block gap-5 mt-1">
                          <div className="flex gap-2 items-center">
                            <input
                              type="radio"
                              value="Fixed Price Project"
                              name="fixed_Task_type"
                              checked={
                                fixed_Task_type === "Fixed Price Project"
                              }
                              onChange={(e) =>
                                setfixed_Task_type(e.target.value)
                              }
                            />
                            <label className="text-[#A0A0A0] xl:text-[18px] text-[15px] font-medium">
                              Fixed Price Project
                            </label>
                          </div>
                          <div className="flex gap-2 items-center xl:mt-0 mt-5">
                            <input
                              type="radio"
                              value="Hourly Project"
                              name="fixed_Task_type"
                              checked={fixed_Task_type === "Hourly Project"}
                              onChange={(e) =>
                                setfixed_Task_type(e.target.value)
                              }
                            />
                            <label className="text-[#A0A0A0] xl:text-[18px] text-[15px] font-medium">
                              Hourly Project
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <lable className="text-[#333] xl:text-[18px] text-[15px] font-medium">
                          Describe Your Project
                        </lable>
                        <textarea
                          className="w-full xl:h-50 h-30 border-1 border-[#00000021] p-3 mt-[10px] outline-none rounded-[5px]"
                          value={taskDescription}
                          onChange={(e) => setTaskDescription(e.target.value)}
                          placeholder="Enter Description"
                        ></textarea>
                      </div>
                      <div className="xl:flex block gap-5 items-center">
                        <div>
                          <input
                            id="fileInput"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                          <label
                            htmlFor="fileInput"
                            className="border border-[#F78318] xl:w-50 w-full p-3 mt-8 flex items-center justify-center cursor-pointer rounded-lg"
                          >
                            <p className="text-[#F78318] font-semibold pointer-events-none">
                              Upload Files
                            </p>
                          </label>
                        </div>{" "}
                        {task_logo ? (
                          <img className="w-[5%] mt-8 border-4 border-neutral-200 rounded-md p-2" src={task_logo} alt="" />
                        ) : (
                          <p className="mt-8 text-[#A0A0A0]">
                            Images or documents that might be helpful in
                            describing your project
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-[20px] justify-end mr-6 pb-5">
                {taskIdForUpdatedTask ? (
                <div className="flex justify-center gap-2">
                  <button
                      type="submit"
                      onClick={handleCloseModalForCreateTask}
                      className="border-2 border-[#f78318] text-[1rem] pr-[15px] pl-[15px] xl:w-[50%] w-[50%] p-2 cursor-pointer font-bold text-white bg-[#f78318] rounded-md"
                    >
                      Cancle
                    </button>
                    <button
                    type="submit"
                    onClick={handleUpdateTask}
                    className="border-2 border-[#f78318] text-[1rem] pr-[15px] pl-[15px] xl:w-[50%] w-[50%] p-2 cursor-pointer font-bold text-white bg-[#f78318] rounded-md"
                  >
                    Update
                  </button>
                </div>
                ) : (
                  <div className="flex justify-center gap-2">
                    <button
                      type="submit"
                      onClick={handleCloseModalForCreateTask}
                      className="border-2 border-[#f78318] text-[1rem] pr-[15px] pl-[15px] xl:w-[50%] w-[50%] p-2 cursor-pointer font-bold text-white bg-[#f78318] rounded-md"
                    >
                      Cancle
                    </button>
                    <button
                      type="submit"
                      onClick={handleCreateTask}
                      className="border-2 border-[#f78318] text-[1rem] pr-[15px] pl-[15px]xl:w-[15%] w-[50%] p-2 cursor-pointer font-bold text-white bg-[#f78318] rounded-md"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <Footer />
    </div>
  );
};

export default CreateTask;
