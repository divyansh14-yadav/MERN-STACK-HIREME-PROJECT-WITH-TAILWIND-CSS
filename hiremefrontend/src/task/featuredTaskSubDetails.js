import React, { useEffect, useState } from "react";
import Nav from "../components/nav";
import CategorySlider from "../components/category";
import Footer from "../components/footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import authConfig from "../api/config";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinearProgress, Box, Slider, Typography } from "@mui/material";
import { FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import PaymentTransaction from "../components/payments/paymentTransaction";
import { faCircleDown } from "@fortawesome/free-regular-svg-icons";
import uploadImage from "../images/upload.png";
import Loder from "../components/loader/loder";
import { FaInfoCircle, FaHandshake, FaRoad, FaFileAlt } from "react-icons/fa";

const FeaturedTaskSubDetails = () => {
  const [timeValue, setTimeValue] = useState(0);
  const [maxValue, setMaxValue] = useState(31);
  const [taskDetailedinfo, setTaskDeatiledInfo] = useState({});
  console.log(taskDetailedinfo, "taskDetailedinfo");
  const [averageRating, setAverageRating] = useState("");

  const [progress, setProgress] = useState("");
  console.log(progress, "1234");

  const [description, setDescription] = useState("");

  // const [timeValue, setTimeValue] = useState("")
  console.log(timeValue, "time");

  const starts = [1, 2, 3, 4, 5];

  const [daysDropdown, setDaysDrpdown] = useState("");

  const [activeSteps, setActiveSteps] = useState(0);

  const [bid, setBid] = useState([]);
  console.log(bid, "biiid");

  // const [receiverBid, setReceiverBid] = useState([])
  // console.log(receiverBid, "receiverBid");
  const [statuscreatedId, setStatuscreatedId] = useState("");
  console.log(statuscreatedId, "statid");

  // const [bidformshowStatus, setBidformshowStatus] = useState(false)

  const [bidAllotedStatus, setBidAllotedStatus] = useState(false);

  const [createBidId, setCreateBidId] = useState("");

  const [hasUserPlacedBid, setHasUserPlacedBid] = useState(false);
  const [isBidCreated, setIsBidCreated] = useState(false);
  const [confirmationBid, setConfirmationBid] = useState("");
  const [openModalForCreateMileStone, setOpenModalForCreateMileStone] =
    useState(false);
  const [milestoneId, setMileStoneId] = useState("");

  // const [taskId, setTaskId] = useState("")

  const [bidId, setBidId] = useState("");
  console.log(bidId, "bidid");

  const [mileDescription, setMileDescription] = useState("");

  const [mileAmout, setMileAmount] = useState("");

  const [getMilstone, SetGetMilstones] = useState([]);
  console.log(getMilstone, "getMilstone");
  const [mileStoneID, setMileStoneID] = useState("");
  console.log(mileStoneID, "mileid");
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [createdAllFiles, setCreatedAllFiles] = useState([]);
  console.log(createdAllFiles, "filessssssssssssssssssssssss");

  const [updatedMileStoneData, setuUpdatedMileStoneData] = useState(false);
  const [updatedData, setupdatedData] = useState(false);

  // const [rateFormilestone,setRateFoorM]
  const { featureTaskId } = useParams();

  const taskSubDetailsTabHeadingsWithIcons = [
    { label: "Details", icon: FaInfoCircle },
    { label: "Proposals", icon: FaHandshake },
    { label: "Milestones", icon: FaRoad },
    { label: "Files", icon: FaFileAlt },
  ];

  const navigate = useNavigate();

  const authId = JSON.parse(localStorage.getItem("authId"));

  const sessionIds = JSON.parse(localStorage.getItem("session"));

  // const fcmToken = JSON.parse(localStorage.getItem("fcmToken"));
  // console.log(fcmToken, "devfcm");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaskDetailedinfo = async () => {
      // window.scrollTo(0, 0);
      try {
        const response = await authConfig.get(`/singleTask/${featureTaskId}`);
        if (response.status === 200) {
          setTaskDeatiledInfo(response.data.singleTask);
          setAverageRating(response.data.averageRating);
          setLoading(false);
        } else {
          console.log("Error fetching taskDetailedinfo");
        }
      } catch (error) {
        console.error("Error fetching taskDetailedinfo:", error);
      }
    };

    fetchTaskDetailedinfo();
  }, []);

  const handleSliderChange = (event, newValue) => {
    setProgress(newValue);
  };
  // useEffect(() => {
  //   if (taskDetailedinfo.Task_Min_Budget) {
  //     setProgress(taskDetailedinfo.Task_Min_Budget);
  //   }
  // }, [taskDetailedinfo]);

  const handleBidTimeChanges = (value) => {
    setDaysDrpdown(value);
    if (value === "Days") {
      setMaxValue(31);
    } else if (value === "Hours") {
      setMaxValue(12);
    }
    setTimeValue(0);
  };

  const handleIncrement = () => {
    if (timeValue < maxValue) {
      setTimeValue(timeValue + 1);
    }
  };

  const handleDecrement = () => {
    if (timeValue > 0) {
      setTimeValue(timeValue - 1);
    }
  };

  const handleCreateBid = async () => {
    window.scrollTo(0, 0);
    try {
      const response = await authConfig.post(
        `/createBid/${authId}/${taskDetailedinfo._id}`,
        {
          description,
          minimalRate: progress,
          deliveryTime: timeValue,
          deliveryDays: daysDropdown,
        }
      );
      console.log(response, "bres");

      if (response.status === 200) {
        toast.success("Bid created successfully");
        setDescription("");
        setTimeValue(0);
        setMaxValue(0);
        // setBidCreatd
        setIsBidCreated(true);
        setCreateBidId(response.data.bidplace._id);
        if (taskDetailedinfo.Task_Min_Budget) {
          setProgress(taskDetailedinfo.Task_Min_Budget);
        }
        // setProgress()
      }
      // navigate("/user/task")
    } catch (error) {
      toast.error("error createing bid");
    }
  };
  // useEffect(() => {
  //   const fetchtaskAllAsBid = async () => {
  //     try {
  //       const response = await authConfig.get(`all-bid-task/${authId}/${taskDetailedinfo._id}`);
  //       if (response.status === 200) {
  //         setBid(response.data.allBidTask);
  //         // setUpdatedData(true)
  //         setBidAllotedStatus(false)

  //       }
  //     } catch (error) {

  //       console.error("Error fetching bids:", error);
  //     }
  //   };
  //   fetchtaskAllAsBid();
  // }, [authId, taskDetailedinfo._id, bidAllotedStatus]);

  useEffect(() => {
    const fetchTaskAllAsBid = async () => {
      try {
        const response = await authConfig.get(
          `all-bid-task/${authId}/${taskDetailedinfo._id}`
        );
        if (response.status === 200) {
          setBid(response.data.allBidTask);
          const userBid = response.data.allBidTask.find(
            (bid) => bid.loginAuthId._id === authId
          );
          setHasUserPlacedBid(!!userBid);
          const confirmBid = response.data.allBidTask.find(
            (bid) => bid.confirmation_bid_user === "Accepted"
          );
          console.log(
            confirmBid,
            "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
          );

          setConfirmationBid(confirmBid);
          const userBidId = response.data.allBidTask.find((bidId) => bidId._id);
          console.log(userBid, "12id");

          setBidId(userBidId._id);

          setIsBidCreated(false);
          setBidAllotedStatus(false);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    };
    fetchTaskAllAsBid();
  }, [authId, taskDetailedinfo._id, isBidCreated, bidAllotedStatus]);

  const handleUpdateBidStatus = async (id) => {
    try {
      const response = await authConfig.patch(`/updateBidStatus/${id}`, {
        status: "Alloted",
      });
      console.log(response, "repo");

      setStatuscreatedId(response.data.bidStatus._id);
      if (response.status === 200) {
        toast.success("Project Approved");
        setBidAllotedStatus(true);
      }
    } catch (error) {
      toast.error("Project Approved error");
    }
  };

  const handleCloseOpenModalForCreateMileStone = () =>
    setOpenModalForCreateMileStone(false);

  const handleShowOpenModalForCreateMileStone = () => {
    setOpenModalForCreateMileStone(true);
  };

  const handleCreateMilestones = async () => {
    try {
      const response = await authConfig.post(
        `/create-MileStone/${taskDetailedinfo._id}/${bidId}/${authId}`,
        {
          mileDescription: mileDescription,
          mileAmount: mileAmout,
        }
      );
      if (response.status === 200) {
        toast.success("Milestone created");
        setMileAmount("");
        setMileDescription("");
        handleCloseOpenModalForCreateMileStone();
        setuUpdatedMileStoneData(true);
      }
    } catch (error) {
      if (
        error.response.data.message ===
        "your mileAmount is greater then your bidAmount"
      ) {
        toast.error("Your mile amount is greater than your bidAmount");
      }
    }
  };
  const [sessionId, setSessionId] = useState("");
  console.log(sessionId, "session");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const session_id = queryParams.get("session_id");
    if (session_id) {
      setSessionId(session_id);
      localStorage.setItem("sessionId", JSON.stringify(session_id));
    }
  }, []);

  useEffect(() => {
    const fetchAllMilstones = async () => {
      if (!taskDetailedinfo._id) {
        return;
      }
      try {
        const response = await authConfig.get(
          `/found-milestone-task/${taskDetailedinfo._id}/${authId}`,
          {
            params: {
              session_id: sessionId,
            },
          }
        );
        if (response.status === 200) {
          SetGetMilstones(response.data?.foundMileStone);
          const mileId = response.data.foundMileStone?.find((id) => id._id);
          setMileStoneID(mileId._id);
          setuUpdatedMileStoneData(false);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching milestones:", error);
      }
    };

    fetchAllMilstones();
  }, [taskDetailedinfo._id, updatedMileStoneData]);

  const mileStonePayment = async (id, name) => {
    try {
      const response = await authConfig.put(
        `/add-deposit/${authId}/${id}/${taskDetailedinfo._id}/${bidId}`,
        {
          depositAmountUSD: name,
        }
      );
      console.log(response.data, "1234567");

      if (response.status === 200) {
        // alert("payment")
        toast.success("success");
        window.location.href = response.data.url;
      }
    } catch (error) {
      toast.error("error");
    }
  };

  // const mileStonePaymentInvocice = async (id, sessionId) => {
  //   try {
  //     const response = await authConfig.get(`/invoice/${id}`, {
  //       params: {
  //         session_id: sessionId,
  //       },
  //     });
  //     console.log(response.data, "1234567");

  //     if (response.status === 200) {
  //       // alert("payment")
  //       toast.success("Your invoice is being download");
  //       window.location.href = response.data.invoice;
  //     }
  //   } catch (error) {
  //     toast.error("error");
  //   }
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
    } else {
      setFileName("");
    }
  };
  const createFiles = async () => {
    try {
      const formData = new FormData();

      formData.append("uploadFiles", selectedFile);
      const response = await authConfig.post(
        `/uploadTaskFile/${authId}/${taskDetailedinfo.authId._id}`,
        formData
      );
      console.log(response, "bres");

      if (response.status === 200) {
        toast.success("file created successfully");
        setSelectedFile("");
        setFileName("");
        setupdatedData(true);
      }
    } catch (error) {
      if (error.response.data.message === "please select file") {
        toast.error("Select file");
      } else {
        toast.error("error createing file");
      }
    }
  };

  useEffect(() => {
    const fetchCreatedFiles = async () => {
      try {
        const response = await authConfig.get(
          `/found-upload-files/${authId}/${taskDetailedinfo.authId._id}`
        );
        if (response.status === 200) {
          setCreatedAllFiles(response.data.files);
          setupdatedData(false);
        }
      } catch (error) {
        console.error("Error fetching CreatedAllFiles:", error);
      }
    };

    fetchCreatedFiles();
  }, [taskDetailedinfo._id, authId, updatedData]);

  if (loading) {
    return <Loder />;
  }

  return (
    <div>
      
      <CategorySlider />
      <div>
        <div className="xl:mt-25 mt-7 xl:w-[83%] w-full xl:p-0 p-3 m-auto text-[1.1rem] font-semibold border-b-1 border-neutral-200 pb-5">
          <h1 className="text-start x;:w-[70%] w-full mt-5 xl:text-[1.5rem] text-[1.4rem] font-bold">
            {taskDetailedinfo.taskTitle}
          </h1>
          {/* {
               bid.status === "Alloted" ?
          <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
            <div class="flex">
              <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
              <div>
                
                <p class="font-bold">You allted a prohect</p>
              </div>
            </div> 
          </div>: null
} */}
          <div className="flex mt-5 xl:gap-10 gap-4 w-full overflow-x-auto scrollbar-hide">
            {taskSubDetailsTabHeadingsWithIcons.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveSteps(index)}
                className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-md transition-colors duration-200 flex-shrink-0 ${
                  activeSteps === index
                    ? "text-[#F78318] font-semibold xl:text-[1.1rem] text-base bg-orange-100"
                    : "text-[#888686] font-semibold xl:text-[1.1rem] text-base hover:text-[#F78318]"
                }`}
              >
                <item.icon className="xl:text-lg text-base" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        {activeSteps === 0 && (
          <div>
            <div className="xl:flex block mt-10 gap-8 xl:w-[80%] w-full m-auto">
              <div className="xl:w-[90%] w-[95%] text-start border-1 border-neutral-200 xl:ml-0 ml-2 p-5 rounded-md">
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-5">
                  <h1 className="text-gray-800 text-xl xl:text-2xl font-semibold mb-1 xl:mb-0">
                    Project Description
                  </h1>
                  <div className="flex items-center gap-2 text-base font-medium text-gray-700">
                    <p className="text-black font-bold">
                      ${taskDetailedinfo.Task_Min_Budget} - $
                      {taskDetailedinfo.Task_Max_Budget} USD
                    </p>
                    <span className="text-[0.875rem] bg-[#F78318] text-white py-1 px-2 rounded-full">
                      {taskDetailedinfo.fixed_Task_type}
                    </span>
                  </div>
                </div>

                {/* Project Description Text */}
                <p className="text-gray-600 text-sm xl:text-base text-justify mb-6">
                  {taskDetailedinfo.taskDescription +
                    "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowermentLeverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity"}
                </p>
                <div className="mb-6">
                  <h2 className="text-gray-800 text-lg font-semibold mb-3">
                    Skill Required
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {taskDetailedinfo?.task_Skill_Required?.map(
                      (skills, index) => (
                        <span
                          key={index}
                          className="inline-block bg-yellow-100 text-yellow-600 text-[1rem] font-semibold py-0.5 px-2 rounded-full"
                        >
                          {skills}
                        </span>
                      )
                    )}
                  </div>
                </div>


                {
  // authId === taskDetailedinfo?.authId?._id ? null :
  authId === taskDetailedinfo?.authId?._id || hasUserPlacedBid || confirmationBid ? null : (
    <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#f78318] text-white py-4 px-6">
        <h2 className="font-semibold text-xl">Place Your Bid</h2>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <label htmlFor="bidAmount" className="block text-gray-700 text-sm font-bold mb-2">
            Your Minimal Rate:
          </label>
          <div className="relative rounded-md shadow-sm xl:w-[50%] w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="bidAmount"
              id="bidAmount"
              className="shadow-sm focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder={`Between $${taskDetailedinfo?.Task_Min_Budget} and $${taskDetailedinfo?.Task_Max_Budget}`}
              value={progress}
              // onChange={(e) => {
              //   const value = parseInt(e.target.value, 10);
              //   if (!isNaN(value) && value >= taskDetailedinfo?.Task_Min_Budget && value <= taskDetailedinfo?.Task_Max_Budget) {
              //     handleSliderChange(null, value); // Simulate slider change
              //   } else if (e.target.value === "") {
              //     handleSliderChange(null, ""); // Allow clearing the input
              //   }
              // }}

              onChange={(e)=>setProgress(e.target.value)}
              min={taskDetailedinfo?.Task_Min_Budget}
              max={taskDetailedinfo?.Task_Max_Budget}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <span className="text-gray-500 pr-2">USD</span>
            </div>
          </div>
          {typeof progress === 'number' && (
            <p className="text-gray-500 text-xs mt-1">Your bid: ${progress}</p>
          )}
        </div>

        <div className="mb-4">
          <p className="block text-gray-700 text-sm font-bold mb-2">
            Set your <span className="font-semibold">delivery time</span>:
          </p>
          <div className="flex gap-3">
            <select
              onChange={(e) => handleBidTimeChanges(e.target.value)}
              className="shadow-sm block w-1/2 sm:text-sm p-2 border border-gray-300 rounded-md outline-none"
            >
              <option value="">Select</option>
              <option value="Days">Days</option>
              <option value="Hours">Hours</option>
            </select>
            <div className="relative shadow-sm rounded-md w-1/2 border border-gray-300 outline-none">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <button
                  onClick={handleDecrement}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <input
                type="number"
                className="block w-full p-2 pl-10 pr-10 text-center sm:text-sm border-gray-300 rounded-md"
                value={timeValue}
                onChange={(e) =>
                  setTimeValue(Math.max(0, Math.min(maxValue, Number(e.target.value))))
                }
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  onClick={handleIncrement}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            id="description"
            className="shadow-lg outline-none w-full h-[150px] p-3 sm:text-sm border border-gray-300 rounded-md"
            rows="3"
            placeholder="Explain why you are the best fit for this task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <button
          onClick={handleCreateBid}
          className="w-full bg-[#f78318] text-white font-bold py-3 rounded-md focus:outline-none focus:shadow-outline"
        >
          Place Your Bid
        </button>
      </div>
    </div>
  )
  // : null
}
              </div>

              <div className="xl:w-[35%] w-full xl:mt-0 mt-10">
                <div className="text-start shadow-xl">
                  <div className="bg-[#f0f0f0] flex items-center h-14">
                    <h1 className="font-bold ml-5 text-[#666] text-[1.1rem]">
                      Summary
                    </h1>
                  </div>
                  <div className="p-6 bg-[#f9f9f9]">
                  <div>
                      <p className="font-semibold text-[#333] text-[1.05rem]">
                        Task Owner
                      </p>
                      <p className="text-[#666]">{taskDetailedinfo.authId.firstName}</p>
                    </div>
                    <div className="mt-3">
                      <p className="font-semibold text-[#333] text-[1.05rem]">
                        Location
                      </p>
                      <p className="text-[#666]">{taskDetailedinfo.location}</p>
                    </div>

                    {/* <div className='mt-3'>
          <p className='font-semibold text-[#333] text-[1.05rem]'>Job Type</p>
          <p className='text-[#666]'>{taskDetailedinfo.taskType}</p>
        </div> */}

                    <div className="mt-3">
                      <p className="font-semibold text-[#333] text-[1.05rem]">
                        Budget
                      </p>
                      <div className="flex gap-2">
                        <p className="text-[#666]">
                          {"$" + taskDetailedinfo.Task_Min_Budget}
                        </p>{" "}
                        -
                        <p className="text-[#666]">
                          {"$" + taskDetailedinfo.Task_Max_Budget}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="font-semibold text-[#333] text-[1.05rem]">
                        Date Posted
                      </p>
                      <p className="text-[#666]">
                        {(() => {
                          const createdDate = new Date(
                            taskDetailedinfo.createdAt
                          );
                          const currentDate = new Date();

                          const yearDiff =
                            currentDate.getFullYear() -
                            createdDate.getFullYear();
                          const monthDiff =
                            currentDate.getMonth() - createdDate.getMonth();

                          const totalMonthsAgo = yearDiff * 12 + monthDiff;

                          return totalMonthsAgo === 0
                            ? "This month"
                            : `${totalMonthsAgo} months ago`;
                        })()}
                      </p>
                    </div>
                  </div>
                </div>
{/* 
                {
                  //  authId === taskDetailedinfo?.authId?._id ? null :
                  authId === taskDetailedinfo?.authId?._id ||
                  hasUserPlacedBid ||
                  confirmationBid ? null : (
                    <div className="mt-10 shadow-xl bg-[#f9f9f9]">
                      <div className="bg-[#f0f0f0] flex items-center h-14">
                        <h1 className="font-bold ml-5 text-[#666] text-[1.1rem]">
                          Bid on this task!
                        </h1>
                      </div>
                      <div className="px-5 mt-5">
                        <p className="text-start text-[#666] text-[1.1rem]">
                          Set your
                          <span className="ml-1 font-bold">minimal rate</span>
                        </p>
                        <Typography
                          variant="h4"
                          className="text-start pt-3 m-0"
                          gutterBottom
                        >
                          {"$" + " " + progress}
                        </Typography>
                      </div>
                      <div className="w-full m-0">
                        <Box
                          sx={{
                            width: 300,
                            margin: "6px auto",
                            textAlign: "center",
                          }}
                        >
                          <Slider
                            value={progress}
                            onChange={handleSliderChange}
                            min={taskDetailedinfo.Task_Min_Budget}
                            max={taskDetailedinfo.Task_Max_Budget}
                            aria-labelledby="progress-slider"
                          />
                        </Box>
                      </div>
                      <p className="text-start text-[#666] text-[1.1rem] px-5 py-3">
                        Set you
                        <span className="ml-1 font-bold">delivery time</span>
                      </p>

                      <div className="flex gap-5 w-full justify-center pb-7 mt-3">
                        <select
                          onChange={(e) => handleBidTimeChanges(e.target.value)}
                          className="shadow-md bg-white p-3 w-[40%] rounded outline-none"
                        >
                          <option>select</option>
                          <option value="Days">Days</option>
                          <option value="Hours">Hours</option>
                        </select>
                        <div className="relative shadow-md bg-white p-3 w-[40%] rounded flex items-center justify-between">
                          <button
                            onClick={handleDecrement}
                            className="text-gray-500"
                          >
                            <FaMinus />
                          </button>
                          <input
                            className="text-center outline-none w-full mx-2"
                            value={timeValue}
                            onChange={(e) =>
                              setTimeValue(
                                Math.min(
                                  maxValue,
                                  Math.max(0, Number(e.target.value))
                                )
                              )
                            }
                            type="number"
                          />
                          <button
                            onClick={handleIncrement}
                            className="text-gray-500"
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                      <div className="w-[85%] m-auto">
                        <textarea
                          className="w-full shadow-md bg-white h-25 p-3 outline-none"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Description"
                        ></textarea>
                      </div>
                      <div className="w-full mt-5 pb-5">
                        <button
                          onClick={handleCreateBid}
                          className="w-[85%] bg-[#f78318] text-white p-3 font-semibold rounded-md text-[1.1rem] cursor-pointer"
                        >
                          Place a Bid
                        </button>
                      </div>
                    </div>
                  )
                  // :null
                  // ))

                  //  :null
                } */}
              </div>
            </div>
          </div>
        )}
        {activeSteps === 1 && (
          <div className="mt-10 gap-8 xl:w-[80%] w-full m-auto">
            {bid?.map(
              (proposalTaks, index) => (
                console.log(proposalTaks, "ppppppptask"),
                (
                  <div
                    className={`${
                      index % 2 === 0 ? "bg-[#f9f9f9]" : ""
                    } flex gap-5 w-full xl:p-10 p-4 justify-between shadow-sm`}
                  >
                    <div className="xl:flex block gap-8 w-[80%]">
                      <div className="w-[58px] h-[60px]">
                        <img
                          className="rounded-full xl:w-[220px] w-[60%] xl:h-[60px] h-[60%] object-cover shadow-sm"
                          src={`http://localhost:8000/${proposalTaks?.loginAuthId?.authProfile}`}
                          alt="Service"
                        />
                      </div>
                      <div className="w-full text-start">
                        <div className="flex gap-2 xl:text-[1.3rem] text-[1rem]">
                          <p className="font-semibold">
                            {proposalTaks?.loginAuthId.firstName}
                          </p>
                          <p className="font-semibold">
                            {proposalTaks?.loginAuthId.lastName}
                          </p>
                        </div>
                        <div className="xl:flex block gap-5 text-[#777] text-[1rem] font-semibold mt-1">
                          <p>{proposalTaks?.loginAuthId?.country || "null"}</p>
                          <p className="text-[#666]">
                            {(() => {
                              const createdDate = new Date(
                                proposalTaks.createdAt
                              );
                              const currentDate = new Date();

                              const yearDiff =
                                currentDate.getFullYear() -
                                createdDate.getFullYear();
                              const monthDiff =
                                currentDate.getMonth() - createdDate.getMonth();

                              const totalMonthsAgo = yearDiff * 12 + monthDiff;

                              return totalMonthsAgo === 0
                                ? "This month"
                                : `${totalMonthsAgo} months ago`;
                            })()}
                          </p>
                        </div>
                        <div className="mt-5">
                          <p className="text-justify">
                            {proposalTaks?.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="mt-4">
                        <h1 className="xl:text-[1.1rem] text-[1rem] font-bold">
                          {"$" +
                            proposalTaks.minimalRate +
                            " " +
                            "USD" +
                            " " +
                            "Per Hours"}
                        </h1>
                        <p className="text-[#666] font-bold">
                          {taskDetailedinfo.fixed_Task_type}
                        </p>
                      </div>
                      <div className="mt-5">
                        {proposalTaks.status === "Alloted" ? (
                          <p className="text-[#ffab1a] bg-[#ffab1a26]  p-1.5 rounded-md">
                            Approved
                          </p>
                        ) : bid.find(
                            (bid) => bid.confirmation_bid_user === "Accepted"
                          ) ? null : proposalTaks?.TaskCreaterId?._id ===
                          authId ? (
                          <button
                            onClick={() =>
                              handleUpdateBidStatus(proposalTaks._id)
                            }
                            type="submit"
                            className="cursor-pointer bg-[#f78318] text-white font-semibold p-2 w-[105px] rounded-sm"
                          >
                            Approve
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        )}
        {activeSteps === 2 && (
          <div className="flex mt-10 gap-8 w-[90%] m-auto">
            <div className="w-[90%] m-auto text-start border-1 border-neutral-200 p-5 rounded-md">
              <div className="xl:flex justify-between items-center">
                <h1 className="text-[#333] text-[22px] font-bold">
                  Milestone Payments
                </h1>

                {(taskDetailedinfo?.authId?._id === authId ||
                  bid?.some(
                    (bidItem) =>
                      bidItem.loginAuthId._id === authId &&
                      bidItem.status === "Alloted"
                  )) && (
                  <button
                    className="border-2 cursor-pointer border-[#f78318] xl:text-[1rem] text-[0.875rem] xl:p-2 p-1 xl:mt-0 mt-3 font-bold text-white bg-[#f78318] rounded-md"
                    onClick={handleShowOpenModalForCreateMileStone}
                  >
                    {taskDetailedinfo?.authId?._id === authId
                      ? "Create Milestone"
                      : "Request Milestone"}
                  </button>
                )}
              </div>
              <h1 className="text-[#333] mt-4 text-[18px] font-semibold">
                Created Milestone{" "}
              </h1>
              <div class="relative mt-5 flex flex-col w-full  overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                <table class="w-full text-left table-auto min-w-max">
                  <thead>
                    <tr>
                      <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Date
                        </p>
                      </th>
                      <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Description
                        </p>
                      </th>
                      <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Status
                        </p>
                      </th>
                      <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Amount
                        </p>
                      </th>
                      <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Action
                        </p>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {getMilstone?.map((mile, index) => (
                      <tr>
                        <td class="p-4 border-b border-blue-gray-50">
                          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {new Date(mile.createdAt)
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
                        </td>
                        <td class="p-4 border-b border-blue-gray-50">
                          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {`${mile?.mileDescription?.substring(0, 60)}...`}
                          </p>
                        </td>
                        <td class="p-4 border-b border-blue-gray-50">
                          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {mile.mileStatus}
                          </p>
                        </td>
                        <td class="p-4 border-b border-blue-gray-50">
                          <a
                            href="#"
                            class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                          >
                            {mile.mileAmount}
                          </a>
                        </td>
                        <td class="p-4 border-b border-blue-gray-50">
                          {/* {
                              taskDetailedinfo.authId._id === authId ?
                                mile.mileStatus === "Paid" ? null :
                                  <button className="border-2 cursor-pointer border-[#f78318] text-[1rem] p-1 font-bold text-white bg-[#f78318] rounded-md" onClick={() => mileStonePayment(mile._id, mile.mileAmount)}>Pay</button>

                                : mile.mileStatus === "Paid" ?
                                  <button className="border-2 cursor-pointer border-[#f78318] text-[1rem] p-1 font-bold text-white bg-[#f78318] rounded-md" onClick={() => mileStonePaymentInvocice(mile._id,mile.session_id )}>invoice</button> : null
                            } */}
                          {taskDetailedinfo.authId._id === authId ? (
                            mile.mileStatus === "Released" ? null : (
                              <button
                                className="border-2 cursor-pointer border-[#f78318] text-[1rem] p-1 font-bold text-white bg-[#f78318] rounded-md"
                                onClick={() =>
                                  mileStonePayment(mile._id, mile.mileAmount)
                                }
                              >
                                Pay
                              </button>
                            )
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {activeSteps === 3 && (
          <div className="mt-8 w-full px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Upload Files
              </h2>

              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 sm:p-6 flex flex-col items-center justify-center hover:border-[#f78318] cursor-pointer transition-colors">
                <img
                  className="max-h-16 mb-3 opacity-70"
                  src={uploadImage}
                  alt="Upload Icon"
                />
                <p className="text-gray-600 text-sm sm:text-base mb-1">
                  Drag and drop files here or{" "}
                  <label
                    htmlFor="fileInput"
                    className="text-[#f78318] hover:underline cursor-pointer"
                  >
                    browse
                  </label>
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  (Image should be horizontal, at least 1500 x 500 px)
                </p>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              {fileName && (
                <p className="mt-4 text-sm text-gray-700 text-center">
                  Selected file: <span className="font-medium">{fileName}</span>
                </p>
              )}

              <div className="mt-6 flex justify-center">
                {(taskDetailedinfo?.authId?._id === authId ||
                  bid?.some(
                    (bidItem) =>
                      bidItem.loginAuthId._id === authId &&
                      bidItem.status === "Alloted"
                  )) && (
                  <button
                    className="bg-[#f78318] hover:bg-[#f78318] text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f78318] focus:ring-offset-1 transition-colors"
                    onClick={createFiles}
                  >
                    Upload File
                  </button>
                )}
              </div>

              <div className="mt-8 overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-4">
                        Client
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-4">
                        Freelancer
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-4">
                        File
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-4">
                        Download
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {createdAllFiles?.map((file, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 sm:px-4">
                          {file?.taskCreatorId?.firstName}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 sm:px-4">
                          {file?.loginAuthId?.firstName}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 sm:px-4">
                          {file?.uploadFiles}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-[#f78318] sm:px-4">
                          <a
                            href={`{file.uploadFiles}`}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline flex items-center gap-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12 2.25c-5.384 0-9.75 4.366-9.75 9.75s4.366 9.75 9.75 9.75 9.75-4.366 9.75-9.75S17.384 2.25 12 2.25ZM12.75 14.25a.75.75 0 00-1.5 0V7.88l-2.22 2.22a.75.75 0 001.06 1.06l3-3a.75.75 0 000-1.06l-3-3a.75.75 0 00-1.06 1.06l2.22 2.22h-6.38a.75.75 0 000 1.5h6.38v6.37Z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>Download</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {/* create milestone pop up */}
        <Dialog
          open={openModalForCreateMileStone}
          onClose={() => setOpenModalForCreateMileStone(false)}
          className="relative z-10"
        >
          <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:items-start">
                    <div className="mt-3 text-center sm:mt-0  sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base text-[1.2rem] font-bold text-gray-900"
                      >
                        Confirm Your Milestones!
                      </DialogTitle>
                      <p className="mt-2 font-semibold text-[#5c5c5c]">
                        Description
                      </p>
                      <div className="w-[100%] mt-4">
                        <textarea
                          placeholder="Enter Milestone Description."
                          className="w-full border-1 border-neutral-200 rounded-md h-25 p-2"
                          value={mileDescription}
                          onChange={(e) => setMileDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <p className="mt-2 font-semibold text-[#5c5c5c]">
                        Amount
                      </p>
                      <div className="w-[100%] mt-2">
                        <input
                          type="number"
                          placeholder="Milestone Amount."
                          className="w-full border-1 border-neutral-200 rounded-md p-2"
                          value={mileAmout}
                          onChange={(e) => setMileAmount(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={handleCreateMilestones}
                    className="inline-flex w-full justify-center rounded-md bg-[#f78318] px-3 py-2 text-sm font-semibold text-white cursor-pointer sm:ml-3 sm:w-auto"
                  >
                    Create
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
      <Footer />
    </div>
  );
};

export default FeaturedTaskSubDetails;
