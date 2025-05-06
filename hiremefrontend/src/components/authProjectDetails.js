import React, { useEffect, useState, version } from "react";
import Nav from "./nav";
import OtherNav from "./otherNav";
import Footer from "./footer";
import { useParams } from "react-router-dom";
import authConfig from "../api/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faCloudArrowUp, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faCircleDown } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useRef } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import Loder from "./loader/loder";

const AuthProjectDetails = () => {
  const projectDetailsHeadings = ["Message", "Files", "Review & Ratings"];
  const [activeStep, setActiveStep] = useState(0);

  const [detailedProject, setDetailedProject] = useState({});
  console.log(detailedProject, "detprojets");

  const [message, setMessage] = useState("");

  const [quoteFileName, setQuoteFileName] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);

  const [status, setStatus] = useState(false);
  const authId = JSON.parse(localStorage.getItem("authId"));

  const { projectId } = useParams();
  console.log(projectId, "serid");

  const { serviceAuthId } = useParams();
  console.log(serviceAuthId, "indetailsserviceauthid");

  const [showDropdown, setShowDropdown] = useState(false);

  const [closeDropdown, setCloseDropdown] = useState(false);

  const [updateStatus, setUpdateStatus] = useState(false);
  const [openModalDeleteMessage, setOpenModalDeleteMessage] = useState(false);
  const [openModalDeleteFile, setOpenModalDeleteFile] = useState(false);

  const [messageId, setMessageId] = useState("");
  console.log(messageId, "mesId");

  const [fileId, setFileId] = useState("");
  console.log(fileId, "fileId");

  const [statusForCreate, setStatusForCreate] = useState(false);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(true);

  const handleCloseModal = () => setOpenModalDeleteMessage(false);
  const handleOpenModal = () => setOpenModalDeleteMessage(true);

  const handleCloseModalForFile = () => setOpenModalDeleteFile(false);
  const handleOpenModalForFile = () => setOpenModalDeleteFile(true);
  useEffect(() => {
    const fetchdetailedProject = async () => {
      // window.scrollTo(0, 0);
      try {
        const response = await authConfig.get(`service-quote/${projectId}`);
        if (response.status === 200) {
          setDetailedProject(response.data.service_quote);
          setStatus(true);
          setStatusForCreate(false);
          setUpdateStatus(true);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching detailedProject:", error);
      }
    };
    fetchdetailedProject();
  }, [projectId, status, updateStatus, closeDropdown, statusForCreate]);

  const handleUpdateProject = async () => {
    try {
      const formData = new FormData();
      formData?.append("message", message);
      selectedFiles?.forEach((file) => {
        formData?.append("quotefileName", file);
      });
      const response = await authConfig.put(
        `updated-quote/${detailedProject._id}/${authId}`,
        formData
      );
      if (response.status === 200) {
        if (message) {
          // alert("send message success")
          setStatus(false);
          setStatusForCreate(true);
        } else {
          if (!selectedFiles) {
            // alert("select the file")
            toast.error("Select first");
          } else {
            // alert("upload file success")
            setStatus(false);
            setStatusForCreate(true);
            // setSelectedFiles("")
          }
        }
        setMessage("");
        setQuoteFileName("");
      } else {
        alert("error sending message");
      }
    } catch (error) {
      alert(error);
    }
  };
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFiles([...e.target.files]);
      setStatus(false);
    }
  };
  const removeFile = (index) => {
    setSelectedFiles(selectedFiles?.filter((_, i) => i !== index));
  };

  const handleDeleteMessage = async () => {
    console.log(messageId, "me");

    try {
      const response = await authConfig.delete(
        `/delete-message/${authId}/${messageId}`
      );
      if (response.status === 200) {
        // alert("Message deleted");
        handleCloseModal();
        toast.success("Message deleted");
        setStatus(false);
      } else {
        // alert("error deleting message");
        toast.error("error deleting message");
      }
    } catch (error) {
      //   alert("error deleting message");
      toast.error("error deleting message");
    }
  };

  const handleDeletefiles = async () => {
    try {
      const response = await authConfig.delete(
        `/delete-upload-file/${authId}/${fileId}`
      );
      if (response.status === 200) {
        // alert("file deleted");
        toast.success("file deleted");
        handleCloseModalForFile();
        setStatus(false);
      } else {
        // alert("error deleting file");
        toast.error("error deleting file");
      }
    } catch (error) {
      // alert("error deleting file");
      toast.error("error deleting file");
    }
  };

  const updateprojectStatus = async (value) => {
    console.log(value, "value");

    try {
      const response = await authConfig.put(
        `/updateproject/${detailedProject._id}`,
        {
          status: value,
        }
      );

      if (response.status === 200) {
        // alert("data updated")
        toast.success(`your order has been ${value}`);
        setCloseDropdown(true);
        setShowDropdown(false);
        setUpdateStatus(false);
      }
    } catch (error) {
      alert("data updated error");
    }
  };
  const handledropdownMenuForStatus = () => {
    setShowDropdown(true);
    setCloseDropdown(false);
  };

  const dropdownRef = useRef(null);
  // for dropdown use
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(null); // Close dropdown
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleReviewandRatings = async () => {
    if (!rating) {
      toast.error("Rating is required");
      return;
    }

    if (!review) {
      toast.error("Review is required");
      return;
    }

    try {
      const response = await authConfig.post(
        `/review-rating/${authId}/${detailedProject.serviceId._id}`,
        {
          rating,
          review,
        }
      );

      if (response.status === 200) {
        toast.success("Your review has been added successfully");
        setRating("");
        setReview("");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return <Loder />;
  }
  return (
    <div className="bg-[#eef2f8]">
      <div>
        
        <OtherNav />
        <div className="xl:w-[80%] w-[90%] mt-10 m-auto rounded-md bg-white pb-7">
          <div>
            <div className="flex justify-between">
              <div className="w-[185px] h-[135px] p-5 pt-8">
                <img
                  className="w-[100%] h-[145px] rounded-full"
                  src={detailedProject?.serviceId?.serviceImage?.url[0]}
                />
              </div>
              {serviceAuthId === authId ? (
                <div className="px-6 py-10">
                  <div className="border-1 w-[80%] h-8 border-[#0000001a] rounded-full">
                    <FontAwesomeIcon
                      className="cursor-pointer mr-2 px-3 py-2"
                      onClick={handledropdownMenuForStatus}
                      icon={faEllipsisVertical}
                    />
                  </div>
                  {detailedProject?.status !== "Accepted" &&
                  detailedProject?.status !== "Rejected" &&
                  detailedProject?.status !== "Reported" &&
                  detailedProject?.status !== "Completed" ? (
                    showDropdown && detailedProject?.status === "Pending" ? (
                      <div ref={dropdownRef}>
                        <div className="absolute right-32 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                          <ul className="py-2 px-2 text-sm text-gray-700">
                            <li>
                              <button
                                onClick={() => updateprojectStatus("Accepted")}
                                className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                              >
                                Accepted
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => updateprojectStatus("Rejected")}
                                className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                              >
                                Rejected
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => updateprojectStatus("Reported")}
                                className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                              >
                                Reported
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => updateprojectStatus("Completed")}
                                className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                              >
                                Completed
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ) : null
                  ) : null}
                </div>
              ) : null}
            </div>
            <div className="text-start p-5 mt-13">
              <h1 className="font-bold text-[#495463] text-[1.25rem]">
                {detailedProject?.serviceId?.title}
              </h1>
              <p className="mt-1">{detailedProject?.order_quotes}</p>
            </div>
            <div className="flex xl:gap-20 gap-10 items-center text-[#495463] text-start xl:p-5 p-5">
              <div className="font-semibold">
                <h1 className="xl:text-[1rem] text-[0.6rem]">Amount</h1>
                <h1 className="xl:text-[1rem] text-[0.6rem] xl:mt-3 mt-2">
                  Deadline
                </h1>
                <h1 className="xl:text-[1rem] text-[0.6rem] xl:mt-3 mt-3">
                  Status
                </h1>
              </div>
              <div className="font-bold">
                <p className="xl:text-[1rem] text-[0.6rem] xl:mt-3 mt-2">
                  $ {detailedProject?.quotePrice}
                </p>
                <p className="xl:text-[1rem] text-[0.6rem] xl:mt-3 mt-2">
                  {detailedProject?.dead_line}
                </p>
                <p className="bg-[#ffab1a26] text-[#ffab1a] xl:mt-2  xl:text-[1rem] text-[0.6rem] xl:p-1.5 p-1 w-[35%] font-semibold rounded-md">
                  {detailedProject?.status}
                </p>
              </div>
            </div>

            <div className="flex xl:gap-10 gap-8 mt-5 p-5">
              {projectDetailsHeadings?.map((headings, index) => (
                <div className={`flex items-center`}>
                  <button
                    className={
                      activeStep === index
                        ? "text-[#f78318] cursor-pointer text-[1.1rem] font-semibold flex items-center gap-2"
                        : "text-[#888686] cursor-pointer text-[1.1rem] font-semibold flex items-center gap-2"
                    }
                    onClick={() => setActiveStep(index)}
                  >
                    {index === 0 && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        ></path>
                      </svg>
                    )}{" "}
                    {/* Chat Bubble Icon for "Message" */}
                    {index === 1 && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        ></path>
                      </svg>
                    )}{" "}
                    {/* Paperclip/File Icon for "Files" */}
                    {index === 2 && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 10h.01M12 10h.01M10 10h.01M17 21v-7a2 2 0 00-2-2H9a2 2 0 00-2 2v7h10zm4-12h-3.464a9 9 0 11-12.972 0H3a2 2 0 00-2 2v2h20v-2a2 2 0 00-2-2z"
                        ></path>
                      </svg>
                    )}{" "}
                    {/* Star/Thumbs Up Icon for "Review & Ratings" */}
                    {headings}
                  </button>
                </div>
              ))}
            </div>
            {activeStep === 0 && (
              <div className="mt-2">
                {serviceAuthId !== authId ? (
                  <div className="relative w-[96%]">
                    <textarea
                      className="border-1 border-neutral-200 h-15 p-3 w-[96%] rounded-md pr-10"
                      placeholder="Write Message ..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      className="absolute bottom-5 rounded-md xl:right-8 right-5 bg-[#f78318] xl:w-[2%] w-[10%] p-2 text-white cursor-pointer"
                      size="1.5x"
                      color="white"
                      onClick={handleUpdateProject}
                    />
                  </div>
                ) : null}

                <div className="mt-3">
                  {detailedProject?.messages?.length ? (
                    detailedProject?.messages?.map(
                      (messages, index) => (
                        console.log(messages, "newme"),
                        (
                          <div className="flex justify-between items-center">
                            <div className="w-full">
                              <div className="flex items-center w-full border-b-1 border-[#0000001a] mt-5 pb-5">
                                <div className="h-[45px] w-[40px] ml-2">
                                  <img
                                    className="w-[100%] h-[40px] rounded-[45px]"
                                    src={`{messages?.messagerId?.authProfile}`}
                                  />
                                </div>

                                <div className="mt-4 ml-4">
                                  <div className="flex gap-2 font-bold ml-3">
                                    <p>{messages?.messagerId?.firstName}</p>
                                    <p>{messages?.messagerId?.lastName}</p>
                                  </div>
                                  <div className="flex mt-2 gap-2 items-center font-normal pb-3">
                                    <span className="border-1 border-[#0000001a] h-5"></span>
                                    <p className="text-gray-600 text-sm p-3 text-start font-bold">
                                      {new Date(messages?.createdAt)
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
                                  <p className="text-start ml-3">
                                    {messages?.message}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="mr-10">
                              {serviceAuthId !== authId ? (
                                <button>
                                  <FontAwesomeIcon
                                    key={index}
                                    onClick={() => {
                                      setMessageId(messages._id);
                                      handleOpenModal();
                                    }}
                                    icon={faTrashCan}
                                    color="red"
                                    className="cursor-pointer"
                                  />
                                </button>
                              ) : null}
                            </div>
                          </div>
                        )
                      )
                    )
                  ) : (
                    <div className="pb-7">
                      <img
                        className="w-[9%] pt-10  m-auto"
                        src="https://script.viserlab.com/metalance/assets/templates/basic//images/empty_list.png"
                      />
                      <h1 className="mt-3 text-[#cfcfcf]">No message found</h1>
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeStep === 1 && (
              <div className="w-full h-full p-4">
                {serviceAuthId !== authId ? (
                  <label className="w-[96%] cursor-pointer bg-white border border-gray-300 text-gray-500 text-center p-18 rounded-md flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                    {/* {selectedFiles?.length === 0 && (<FontAwesomeIcon icon={faCloudArrowUp} size="4x" className="text-gray-500" />)}
                                        {selectedFiles?.length === 0 && (<span>Upload File</span>)} */}
                    <FontAwesomeIcon
                      icon={faCloudArrowUp}
                      size="4x"
                      className="text-gray-500"
                    />
                    <span>Upload File</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      multiple
                      required
                    />

                    <div className="absolute inset-0 flex flex-wrap gap-2 p-2 overflow-auto">
                      {selectedFiles?.map((file, index) => (
                        <div key={index} className="relative w-35 h-32">
                          <img
                            src={URL?.createObjectURL(file)}
                            alt="preview"
                            className="w-full h-full object-cover rounded-md border"
                          />

                          <button
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs z-10"
                            onClick={(e) => {
                              removeFile(index);
                            }}
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </label>
                ) : null}

                {serviceAuthId !== authId ? (
                  <div>
                    <button
                      type="submit"
                      onClick={handleUpdateProject}
                      className="bg-[#f78318] text-white p-2 w-[100px] mt-5 rounded-md font-bold"
                    >
                      Upload
                    </button>
                  </div>
                ) : null}
                <div>
                  <div className="mt-3">
                    {detailedProject?.uploadfiles?.length ? (
                      detailedProject.uploadfiles.map((uploadfile, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <div className="w-full">
                            <div className="flex items-center w-full border-b border-[#0000001a] mt-5 pb-5">
                              <div className="h-[45px] w-[40px] ml-2">
                                <img
                                  className="w-full h-[40px] rounded-full"
                                  src={`{uploadfile?.uploaderId?.authProfile}`}
                                  alt="Uploader Profile"
                                />
                              </div>

                              <div className="mt-4 ml-4">
                                <div className="flex gap-2 font-bold ml-3">
                                  <p>{uploadfile?.uploaderId?.firstName}</p>
                                  <p>{uploadfile?.uploaderId?.lastName}</p>
                                </div>
                                <div className="flex mt-2 gap-2 items-center font-normal pb-3">
                                  <span className="border-1 border-[#0000001a] h-5"></span>
                                  <p className="text-gray-600 text-sm p-3 text-start font-bold">
                                    {new Date(
                                      uploadfile?.createdAt
                                    ).toLocaleString("en-US", {
                                      year: "numeric",
                                      month: "short",
                                      day: "2-digit",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}
                                  </p>
                                </div>

                                {/* <div className="ml-3 flex items-center gap-2">
                                                                            {uploadfile?.quotefileName?.map((file, i) => (
                                                                                <div key={i} className="bg-[#f7831833] p-1.5 rounded-md text-[0.8rem]">
                                                                                    <p className="text-[#f71318]">{file}</p>
                                                                                </div>
                                                                            ))}
                                                                        </div> */}
                                <div className="ml-3 flex flex-wrap items-center gap-3">
                                  {uploadfile?.quotefileName?.map((file, i) => (
                                    <div
                                      key={i}
                                      className="bg-[#f7831833] p-2 rounded-md text-[0.8rem] flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
                                    >
                                      <p className="text-[#f71318] break-all max-w-[200px] sm:max-w-none text-center sm:text-left">
                                        {file}
                                      </p>

                                      <img
                                        className="w-[50px] h-[50px] sm:w-[30px] sm:h-[30px] rounded-md"
                                        src={`{file}`}
                                        alt="Uploaded file"
                                      />

                                      <a
                                        href={`{file}`}
                                        download={file}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#f78318]  px-3 py-1 rounded-md text-sm w-full sm:w-auto text-center"
                                      >
                                        <FontAwesomeIcon
                                          icon={faCircleDown}
                                          size="2x"
                                        />
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {serviceAuthId !== authId ? (
                            <div className="mr-10">
                              <button>
                                <FontAwesomeIcon
                                  key={index}
                                  onClick={() => {
                                    setFileId(uploadfile._id);
                                    handleOpenModalForFile();
                                  }}
                                  icon={faTrashCan}
                                  color="red"
                                  className="cursor-pointer"
                                />
                              </button>
                            </div>
                          ) : null}
                        </div>
                      ))
                    ) : (
                      <div className="pb-7">
                        <img
                          className="w-[9%] pt-10  m-auto"
                          src="https://script.viserlab.com/metalance/assets/templates/basic//images/empty_list.png"
                          alt="No files"
                        />
                        <h1 className="mt-3 text-[#cfcfcf]">No file found</h1>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {activeStep === 2 && (
              <div className="border-t mt-8 pt-8">
                <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Add Review & Ratings
                  </h1>

                  <div className="mb-4">
                    <div className="flex justify-center gap-3 w-full mt-3">
                      {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setRating(starValue)}
                            onMouseEnter={() => setHover(starValue)}
                            onMouseLeave={() => setHover(null)}
                          >
                            <FontAwesomeIcon
                              icon={faStar}
                              className={`text-2xl transition-colors ${
                                (hover || rating) >= starValue
                                  ? "text-[#F78318]"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block font-medium text-gray-700 mb-1">
                      Review
                    </label>
                    <textarea
                      rows="4"
                      placeholder="Write your review..."
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#f78318]"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleReviewandRatings}
                      className="px-5 py-2 rounded-md bg-[#f78318] text-white hover:bg-[#e27000] transition"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* for message delete */}
        <Dialog
          open={openModalDeleteMessage}
          onClose={() => setOpenModalDeleteMessage(false)}
          className="relative z-10"
        >
          <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold text-gray-900"
                      >
                        Delete Message
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete this Message? This
                          action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={handleDeleteMessage}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenModalDeleteMessage(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    No
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
        {/* for file delete */}
        <Dialog
          open={openModalDeleteFile}
          onClose={() => setOpenModalDeleteFile(false)}
          className="relative z-10"
        >
          <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold text-gray-900"
                      >
                        Delete File
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete this File? This action
                          cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={handleDeletefiles}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCloseModalForFile(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    No
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
        <Footer />
      </div>
    </div>
  );
};

export default AuthProjectDetails;
