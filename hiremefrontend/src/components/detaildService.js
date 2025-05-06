import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Nav from "./nav";
import CategorySlider from "./category";
import Footer from "./footer";
import authConfig from "../api/config";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { toast } from "react-toastify";
import { detailedServiceValidation } from "../validations/RegisterValidation";
import { io } from "socket.io-client";
import ChatBox from "../components/user chat/userChat";
import MessageInput from "../components/user chat/message";
import {
  fetchMessages,
  sendMessage,
} from "../components/user chat/messageService";
import UserChat from "../components/user chat/userChat";
import Loder from "./loader/loder";

const socket = io("https://hireback-1.onrender.com//api/v1");

const DetaildService = () => {
  const [serviceDetaildList, setServiceDetaildList] = useState(null);
  console.log(serviceDetaildList, "servicesDtaieled");
  const [activeTab, setActiveTab] = useState(0);
  const [monthDetail, setMonthDetails] = useState("");
  console.log(monthDetail, "aaaaaaaaaaa");

  const [selectedImage, setSelectedImage] = useState(null);
  console.log(selectedImage, "ssssimage");

  const [comparePackages, setComparePackages] = useState();
  console.log(comparePackages, "comparePackages");

  const [activeTabForPackage, setActiveTabForPackage] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);

  const navigate = useNavigate();

  const { serviceId } = useParams();
  console.log(serviceId, "iddddddddddddddddddddddddd");
  const starts = [1, 2, 3, 4, 5];

  const DetaildServiceRef = useRef(null);

  const headings = ["About This Gig", "Requirement", "Packages", "FAQ"];

  const packagesHeading = ["Basic", "Standard", "Premium"];
  const [messageStatus, setMessageStatus] = useState(false);
  const authId = JSON.parse(localStorage.getItem("authId"));
  console.log(authId, "helloauth");

  const [order_quotes, setOrder_Quotes] = useState("");

  const [openModalDeletePortfolio, setOpenModalDeletePortfolio] =
    useState(false);
  const [openModalForChat, setOpenModalForChat] = useState(false);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState("");
  const [packageType, setPackageType] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const handleOpenModalForChat = () => {
    setOpenModalForChat(true);
  };

  const handleCloseModallForChat = () => {
    setOpenModalForChat(false);
  };
  useEffect(() => {
    const detailService = async () => {
      window.scrollTo(0, 0);
      try {
        const response = await authConfig.get(`single-service/${serviceId}`);
        if (response.status === 200) {
          setServiceDetaildList(response?.data.single_service);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching detaild services:", error);
      }
    };
    detailService();
  }, [serviceId]);

  useEffect(() => {
    const comparePackage = async () => {
      try {
        const response = await authConfig.get(
          `comparePackage/${serviceDetaildList._id}`
        );
        if (response.status === 200) {
          setComparePackages(response?.data?.compare_price);
        }
      } catch (error) {
        console.error("Error fetching compare packages details:", error);
      }
    };
    comparePackage();
  }, []);

  const CustomPrevArrow = ({ onClick }) => (
    <button
      className="group absolute xl:left-[10px] left-[0px] top-1/2 transform -translate-y-1/2 z-10 text-black bg-white p-2 rounded-full shadow-md hover:bg-[#f78318]"
      onClick={onClick}
    >
      <FaChevronLeft size={15} className="group-hover:text-white" />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      className="group absolute top-1/2 xl:right-[10px] right-[0px] transform -translate-y-1/2 z-10 text-black bg-white p-2 rounded-full shadow-md hover:bg-[#f78318]"
      onClick={onClick}
    >
      <FaChevronRight size={15} className="group-hover:text-white" />
    </button>
  );

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const minusSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
    </svg>
  );
  const plusSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
    </svg>
  );

  const handleCloseDeletePortfolio = () => setOpenModalDeletePortfolio(false);

  // const handleShowDeletePortfolio = (basic, standard, premium) => {
  //   // console.log(standard.
  //   //   s_price,"pre");
    
  //   setPrice(basic);
  //   setOpenModalDeletePortfolio(true);
  // };


  const handleShowDeletePortfolio = (packageData) => {
    setPrice(packageData);
    if (packageData.b_price) {
      setPackageType("Basic");
    } else if (packageData.s_price) {
      setPackageType("Standard");
    } else if (packageData.p_price) {
      setPackageType("Premium");
    }
    setOpenModalDeletePortfolio(true);
  };

  const handleCreateProjects = async () => {
    try {
      await detailedServiceValidation.validate(
        {
          order_quotes,
        },
        { abortEarly: false }
      );
      const response = await authConfig.post(
        `createProject/${authId}/${serviceId}`,
        {
          order_quotes,
          quotePrice:price?.b_price || price?.s_price || price?.p_price
        }
      );

      if (response.status === 200) {
        // alert("Project created")
        toast.success("Project created");
        navigate("/user/projects");
      } else {
        alert("Something error creating project");
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        error.errors.forEach((err) => toast.error(err));
        return;
      }
      alert("Something error creating project");
    }
  };

  // for chat start

  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");

  // Fetch messages from API on page load
  //   useEffect(() => {
  //     const getMessages = async () => {
  //       const messagesData = await fetchMessages(authId, serviceDetaildList?.authId?._id);
  //       setMessages(messagesData);
  //     };

  //     getMessages();

  //     // Listen for real-time message updates from Socket.IO
  //     socket.on("receive_message", (data) => {
  //       setMessages((prevMessages) => [...prevMessages, data]);
  //     });

  //     return () => {
  //       socket.off("receive_message");
  //     };
  //   }, []);

  useEffect(() => {
    if (!authId || !serviceDetaildList?.authId?._id) return;

    const getMessages = async () => {
      const messagesData = await fetchMessages(
        authId,
        serviceDetaildList.authId._id
      );
      setMessages(messagesData || []);
    };

    getMessages();
    socket.emit("join", authId); // Join the room when user logs in
    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
      setMessageStatus(false);
    });
    return () => socket.off("receive_message");
  }, [authId, serviceDetaildList]);

  // Send a message
  // const handleSendMessage = async (message) => {
  //     const newMessage = { senderId: authId, receiverId: serviceDetaildList.authId._id, content: message };
  //     await sendMessage(authId, serviceDetaildList?.authId?._id, message, { messageStatus: false });
  //     socket.emit("send_message", newMessage); // Emit to Socket.IO
  //     setMessages((prevMessages) => [...prevMessages, newMessage]);
  // };

  const handleSendMessage = async (message) => {
    const newMessage = {
      senderId: authId,
      receiverId: serviceDetaildList.authId._id,
      content: message,
    };

    await sendMessage(authId, serviceDetaildList?.authId?._id, message, {
      messageStatus: false,
    });

    socket.emit("send_message", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    navigate("/user/Messages", { state: { serviceDetaildList } });
  };

  // chat ends

  if (loading) {
    return <Loder />;
  }

  return (
    <div>
      <CategorySlider />

      <div className="bg-[#f9f9f9] xl:mt-15 flex">
        <div className="w-[90%] xl:mt-15 mt-10 xl:flex block m-auto justify-between">
          {serviceDetaildList ? (
            <div className="xl:w-[60%] w-full mt-12">
              <div className="flex items-center gap-3 w-full xl:w-full sm:w-0">
                <Link
                  to={`/featuredService/${serviceDetaildList?.categoryId._id}/${serviceDetaildList?.categoryId?.featureCategoriesName}`}
                >
                  <p className="font-bold text-[#5c5c5c]">
                    {serviceDetaildList?.categoryId?.featureCategoriesName}
                  </p>
                </Link>
                {/* <FontAwesomeIcon icon={faGreaterThan} /> */}
                <FontAwesomeIcon icon={faGreaterThan} />
                <p className="font-bold text-[#f78318]">
                  {
                    serviceDetaildList?.sub_categoryId
                      ?.feature_SubCategories_name
                  }
                </p>
              </div>
              <div>
                <h1 className="text-start mt-6 xl:text-[1.5rem] text-xl xl:w-full w-full font-bold">
                  {serviceDetaildList?.title}
                </h1>
              </div>
              <div className="flex gap-2 mt-8 items-center">
                <div className="h-[50px] w-[60px]">
                  <img
                    className="w-[80%] h-[45px] rounded-[45px]"
                    src={serviceDetaildList?.authId?.authProfile}
                  />
                </div>
                <div>
                  <Link to={`/userServices/${serviceDetaildList?.authId?._id}`}>
                    <div className="flex gap-2 pb-3 font-bold ml-1">
                      <p>{serviceDetaildList?.authId?.firstName}</p>
                      <p>{serviceDetaildList?.authId?.lastName}</p>
                    </div>
                  </Link>
                  <div className="flex gap-2 items-center font-normal">
                    {starts.map((star, index) => (
                      <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        style={{
                          color:
                            index < serviceDetaildList?.averageRating
                              ? "#f78318"
                              : "#ccc",
                        }}
                      />
                    ))}
                    <p>{serviceDetaildList?.averageRating}</p>
                    <p>{`(${serviceDetaildList?.totalRatings})`}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 border-20 border-[#fff] bg-white">
                <Slider
                  prevArrow={<CustomPrevArrow />}
                  nextArrow={<CustomNextArrow />}
                  ref={DetaildServiceRef}
                  speed={500}
                  slidesToShow={1}
                >
                  {serviceDetaildList?.serviceImage?.url?.map(
                    (imgd, imgIndex) => (
                      <img
                        key={imgIndex}
                        className="rounded-t-[10px] w-full xl:h-[380px] h-[230px]"
                        src={selectedImage ? selectedImage : imgd}
                        alt="Service"
                      />
                    )
                  )}
                </Slider>
                <div className="flex gap-5">
                  {serviceDetaildList?.serviceImage?.url?.map(
                    (imgds, imgIndex) => (
                      <img
                        onClick={() => setSelectedImage(imgds)}
                        key={imgIndex}
                        className="rounded-t-[10px] w-[30%] mt-5 pb-5"
                        src={imgds}
                        alt="Service"
                      />
                    )
                  )}
                </div>
              </div>
              <div className="xl:mt-6 mt-10">
                <div className="xl:flex xl:gap-2 grid grid-cols-2 gap-5 xl:pt-3 pt-0 xl:pb-3 pb-0 xl:pl-3 pl-0 bg-white rounded-xl">
                  {headings.map((heading, index) => (
                    <button
                      key={index}
                      className={`xl:px-4 px-4 xl:py-2 py-2 xl:mt-0 mt-3 xl:text-md text-md font-semibold rounded-4xl border-1 border-[#f78318] ${
                        activeTab === index
                          ? "bg-[#f78318] text-white rounded-4xl"
                          : "text-[#f78318]"
                      }`}
                      onClick={() => setActiveTab(index)}
                    >
                      {heading}
                    </button>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
                  {activeTab === 0 && (
                    <p className="text-start text-[#5c5c5c]">
                      {serviceDetaildList?.description || "No data available."}
                    </p>
                  )}
                  {activeTab === 1 && (
                    <p className="text-start text-[#5c5c5c]">
                      {serviceDetaildList?.requirement || "No data available."}
                    </p>
                  )}
                  {activeTab === 2 && (
                    <div className="overflow-auto p-4">
                      <div className="w-full bg-white shadow-md rounded-lg">
                        <table className="min-w-max w-full table-auto text-left text-sm">
                          <thead>
                            <tr className="bg-slate-100 text-slate-600">
                              <th className="p-4 border-b border-slate-300">
                                Package
                              </th>
                              <th className="p-4 border-b border-slate-300">
                                <div>
                                  <p className="font-semibold">
                                    {comparePackages?.basic[0]?.b_Name}
                                  </p>
                                </div>
                              </th>
                              <th className="p-4 border-b border-slate-300">
                                <div>
                                  <p className="font-semibold">
                                    {comparePackages?.standard[0]?.s_Name}
                                  </p>
                                </div>
                              </th>
                              <th className="p-4 border-b border-slate-300">
                                <div>
                                  <p className="font-semibold">
                                    {comparePackages?.premium[0]?.p_Name}
                                  </p>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-slate-700">
                            <tr className="hover:bg-slate-50">
                              <td className="p-4 border-b">Vector file</td>
                              <td className="p-4 border-b">
                                {comparePackages?.basic[0]?.b_vector_file
                                  ? "Yes"
                                  : "No"}
                              </td>
                              <td className="p-4 border-b">
                                {comparePackages?.standard[0]?.s_vector_file
                                  ? "Yes"
                                  : "No"}
                              </td>
                              <td className="p-4 border-b">
                                {comparePackages?.premium[0]?.p_vector_file
                                  ? "Yes"
                                  : "No"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                              <td className="p-4 border-b">Printable file</td>
                              <td className="p-4 border-b">
                                {comparePackages?.basic[0]?.b_printable_file
                                  ? "Yes"
                                  : "No"}
                              </td>
                              <td className="p-4 border-b">
                                {comparePackages?.standard[0]?.s_printable_file
                                  ? "Yes"
                                  : "No"}
                              </td>
                              <td className="p-4 border-b">
                                {comparePackages?.premium[0]
                                  ?.p_description_printable_file
                                  ? "Yes"
                                  : "No"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                              <td className="p-4 border-b">3d mockup</td>
                              <td className="p-4 border-b">
                                {comparePackages?.basic[0]?.b_mockup
                                  ? "Yes"
                                  : "No"}
                              </td>
                              <td className="p-4 border-b">
                                {comparePackages?.standard[0]?.s_mockup
                                  ? "Yes"
                                  : "No"}
                              </td>
                              <td className="p-4 border-b">
                                {comparePackages?.premium[0]?.p_mockup
                                  ? "Yes"
                                  : "No"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                              <td className="p-4 border-b">Source File</td>
                              <td className="p-4 border-b">
                                {comparePackages?.basic[0]?.b_sourceFile
                                  ? "Yes"
                                  : "No"}
                              </td>
                              <td className="p-4 border-b">
                                {comparePackages?.standard[0]?.s_sourceFile
                                  ? "Yes"
                                  : "No"}
                              </td>
                              <td className="p-4 border-b">
                                {comparePackages?.premium[0]?.p_sourceFile
                                  ? "Yes"
                                  : "No"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                              <td className="p-4 border-b">Social Media Kit</td>
                              <td className="p-4 border-b">
                                {comparePackages?.basic[0]?.b_socialKit || "No"}
                              </td>
                              <td className="p-4 border-b">
                                {comparePackages?.standard[0]?.s_socialKit ||
                                  "No"}
                              </td>
                              <td className="p-4 border-b">
                                {comparePackages?.premium[0]?.p_socialKit ||
                                  "No"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                              <td className="p-4 border-b">
                                Number of Concepts
                              </td>
                              <td className="p-4 border-b">
                                {comparePackages?.basic[0]?.b_number_of_concept}
                              </td>
                              <td className="p-4 border-b">
                                {
                                  comparePackages?.standard[0]
                                    ?.s_number_of_concept
                                }
                              </td>
                              <td className="p-4 border-b">
                                {
                                  comparePackages?.premium[0]
                                    ?.p_number_of_concept
                                }
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                              <td className="p-4 border-b">Revisions</td>
                              <td className="p-4 border-b">
                                {comparePackages?.basic[0]?.b_revisions}
                              </td>
                              <td className="p-4 border-b">
                                {comparePackages?.standard[0]?.s_revisions}
                              </td>
                              <td className="p-4 border-b">
                                {comparePackages?.premium[0]?.p_revisions}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50 font-semibold">
                              <td className="p-4 border-b">Total</td>
                              <td className="p-4 border-b">
                                MATIC {comparePackages?.basic[0]?.b_price}
                              </td>
                              <td className="p-4 border-b">
                                MATIC {comparePackages?.standard[0]?.s_price}
                              </td>
                              <td className="p-4 border-b">
                                MATIC {comparePackages?.premium[0]?.p_price}
                              </td>
                            </tr>
                            <tr>
                              <td></td>
                              <td className="p-4">
                                <button
                                  onClick={handleShowDeletePortfolio}
                                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                                >
                                  Request To Order
                                </button>
                              </td>
                              <td className="p-4">
                                <button
                                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                                  onClick={handleShowDeletePortfolio}
                                >
                                  Request To Order
                                </button>
                              </td>
                              <td className="p-4">
                                <button
                                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                                  onClick={handleShowDeletePortfolio}
                                >
                                  Request To Order
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {activeTab === 3 && (
                    <div>
                      {serviceDetaildList?.FAQ?.map((faq, i) => (
                        <div
                          key={i}
                          className="mb-2 p-2 border border-[#0000001a] rounded-md"
                        >
                          <div>
                            <button
                              onClick={() => toggleAccordion(i)}
                              className="w-full flex justify-between items-center p-2 text-slate-800"
                            >
                              <span className="text-[1rem] font-semibold">
                                {faq.question}
                              </span>
                              <span className="text-slate-800 transition-transform duration-300">
                                {openIndex === i ? minusSVG : plusSVG}
                              </span>
                            </button>
                            <div
                              className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
                              style={{
                                maxHeight: openIndex === i ? "500px" : "0",
                              }}
                            >
                              <div className="pb-5 text-md text-start p-2 text-[#000000b3]">
                                {faq.answer}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}

          <div className="xl:w-[30%] w-full">
            <div className="xl:mt-25 mt-10 w-full bg-white shadow-xl rounded-xl">
              <div className="">
                <div className="flex gap-2 justify-between border-[#0000001a] border-r border-b bg-white">
                  {packagesHeading.map((heading, index) => (
                    <div className="w-[30%] m-auto py-2 border-[#0000001a] border-l">
                      <button
                        key={index}
                        className={`px-4 py-2 text-md cursor-pointer font-bold border-[#f78318] ${
                          activeTabForPackage === index
                            ? "text-[#f78318]"
                            : "text-[#f78318]"
                        }`}
                        onClick={() => setActiveTabForPackage(index)}
                      >
                        {heading}
                      </button>
                    </div>
                  ))}
                </div>
                <div>
                  {activeTabForPackage === 0 && (
                    <p className="text-start text-[#5c5c5c]">
                      {serviceDetaildList?.Basic_price?.length ? (
                        serviceDetaildList?.Basic_price?.map(
                          (Basic_price, index) => (
                            <div className="p-4">
                              <div className="flex justify-between mt-5 font-bold">
                                <h1 className="mt">{Basic_price.b_Name}</h1>
                                <p className="text-[1.1rem]">
                                  {"$ " + Basic_price.b_price}
                                </p>
                              </div>
                              <p className="mt-5 text-[0.875rem] font-semibold text-[#00000080]">
                                {Basic_price.b_description}
                              </p>
                              <div className="flex justify-between mt-5">
                                <div className=" font-medium leading-loose text-[#00000080]">
                                  <p>Vector file :</p>
                                  <p>Printable file :</p>
                                  <p>3d mockup :</p>
                                  <p>Source file :</p>
                                  <p>Social media kit :</p>
                                  <p>Number of concepts included :</p>
                                  <p>Revisions :</p>
                                </div>
                                <div className="capitalize leading-loose text-[#f78318] font-medium">
                                  <p>{Basic_price.b_vector_file}</p>
                                  <p>{Basic_price.b_printable_file}</p>
                                  <p>{Basic_price.b_mockup}</p>
                                  <p>{Basic_price.b_source_file}</p>
                                  <p>{Basic_price.b_social_media_kit}</p>
                                  <p>{Basic_price.b_number_of_concept}</p>
                                  <p>{Basic_price.b_revisions}</p>
                                </div>
                              </div>
                              <div>
                                {token &&
                                  authId !== serviceDetaildList.authId._id && (
                                    <>
                                      <button
                                        onClick={() =>
                                          handleShowDeletePortfolio(Basic_price)
                                        }
                                        type="submit"
                                        className="mt-7 font-semibold bg-[#f78318] w-[100%] text-white p-[12px] rounded-[8px] cursor-pointer"
                                      >
                                        Request To Order
                                      </button>
                                      <button
                                        type="submit"
                                        className="mt-5 font-semibold border-1 border-[#212529] bg-white hover:bg-[#212529] hover:text-white w-[100%] text-[#212529] p-[12px] rounded-[8px] cursor-pointer"
                                        onClick={handleOpenModalForChat}
                                      >
                                        Contact Seller
                                      </button>
                                    </>
                                  )}
                              </div>
                              {/* <div>
                                                            <Link className='flex justify-center font-semibold mt-5 text-[#f78318]'>Compare packages</Link>
                                                        </div> */}
                            </div>
                          )
                        )
                      ) : (
                        <div className="pb-7">
                          <img
                            className="w-[9%] pt-10  m-auto"
                            src="https://script.viserlab.com/metalance/assets/templates/basic//images/empty_list.png"
                          />
                          <h1 className="mt-3 text-center text-[#cfcfcf]">
                            No Package found
                          </h1>
                        </div>
                      )}
                    </p>
                  )}

                  {activeTabForPackage === 1 && (
                    <p className="text-start text-[#5c5c5c]">
                      {serviceDetaildList?.Standard_price?.length ? (
                        serviceDetaildList?.Standard_price?.map(
                          (Standard_price, index) => (
                            <div className="p-4">
                              <div className="flex justify-between mt-5 font-bold">
                                <h1 className="mt">{Standard_price.s_Name}</h1>
                                <p className="text-[1.1rem]">
                                  {"$ " + Standard_price.s_price}
                                </p>
                              </div>
                              <p className="mt-5 text-[0.875rem] font-semibold text-[#00000080]">
                                {Standard_price.s_description}
                              </p>
                              <div className="flex justify-between mt-5">
                                <div className=" font-medium leading-loose text-[#00000080]">
                                  <p>Vector file :</p>
                                  <p>Printable file :</p>
                                  <p>3d mockup :</p>
                                  <p>Source file :</p>
                                  <p>Social media kit :</p>
                                  <p>Number of concepts included :</p>
                                  <p>Revisions :</p>
                                </div>
                                <div className="capitalize leading-loose text-[#f78318] font-medium">
                                  <p>{Standard_price.s_vector_file}</p>
                                  <p>{Standard_price.s_printable_file}</p>
                                  <p>{Standard_price.s_mockup}</p>
                                  <p>{Standard_price.s_source_file}</p>
                                  <p>{Standard_price.s_social_media_kit}</p>
                                  <p>{Standard_price.s_number_of_concept}</p>
                                  <p>{Standard_price.s_revisions}</p>
                                </div>
                              </div>
                              {token &&
                                authId !== serviceDetaildList.authId._id && (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleShowDeletePortfolio(
                                          Standard_price
                                        )
                                      }
                                      type="submit"
                                      className="mt-7 font-semibold bg-[#f78318] w-[100%] text-white p-[12px] rounded-[8px] cursor-pointer"
                                    >
                                      Request To Order
                                    </button>
                                    <button
                                      type="submit"
                                      className="mt-5 font-semibold border-1 border-[#212529] bg-white hover:bg-[#212529] hover:text-white w-[100%] text-[#212529] p-[12px] rounded-[8px] cursor-pointer"
                                      onClick={handleOpenModalForChat}
                                    >
                                      Contact Seller
                                    </button>
                                  </>
                                )}
                              {/* <div>
                                                            <Link className='flex justify-center font-semibold mt-5 text-[#f78318]'>Compare packages</Link>
                                                        </div> */}
                            </div>
                          )
                        )
                      ) : (
                        <div className="pb-7">
                          <img
                            className="w-[9%] pt-10  m-auto"
                            src="https://script.viserlab.com/metalance/assets/templates/basic//images/empty_list.png"
                          />
                          <h1 className="mt-3 text-center text-[#cfcfcf]">
                            No Package found
                          </h1>
                        </div>
                      )}
                    </p>
                  )}

                  {activeTabForPackage === 2 && (
                    <p className="text-start text-[#5c5c5c]">
                      {serviceDetaildList?.Premium_price?.length ? (
                        serviceDetaildList?.Premium_price?.map(
                          (Premium_price, index) => (
                            <div className="p-4">
                              <div className="flex justify-between mt-5 font-bold">
                                <h1 className="mt">{Premium_price.p_Name}</h1>
                                <p className="text-[1.1rem]">
                                  {"$ " + Premium_price.p_price}
                                </p>
                              </div>
                              <p className="mt-5 text-[0.875rem] font-semibold text-[#00000080]">
                                {Premium_price.p_description}
                              </p>
                              <div className="flex justify-between mt-5">
                                <div className=" font-medium leading-loose text-[#00000080]">
                                  <p>Vector file :</p>
                                  <p>Printable file :</p>
                                  <p>3d mockup :</p>
                                  <p>Source file :</p>
                                  <p>Social media kit :</p>
                                  <p>Number of concepts included :</p>
                                  <p>Revisions :</p>
                                </div>
                                <div className="capitalize leading-loose text-[#f78318] font-medium">
                                  <p>{Premium_price.p_vector_file}</p>
                                  <p>{Premium_price.p_printable_file}</p>
                                  <p>{Premium_price.p_mockup}</p>
                                  <p>{Premium_price.p_source_file}</p>
                                  <p>{Premium_price.p_social_media_kit}</p>
                                  <p>{Premium_price.p_number_of_concept}</p>
                                  <p>{Premium_price.p_revisions}</p>
                                </div>
                              </div>
                              {token &&
                                authId !== serviceDetaildList.authId._id && (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleShowDeletePortfolio(Premium_price)
                                      }
                                      type="submit"
                                      className="mt-7 font-semibold bg-[#f78318] w-[100%] text-white p-[12px] rounded-[8px] cursor-pointer"
                                    >
                                      Request To Order
                                    </button>
                                    <button
                                      type="submit"
                                      className="mt-5 font-semibold border-1 border-[#212529] bg-white hover:bg-[#212529] hover:text-white w-[100%] text-[#212529] p-[12px] rounded-[8px] cursor-pointer"
                                      onClick={handleOpenModalForChat}
                                    >
                                      Contact Seller
                                    </button>
                                  </>
                                )}
                              {/* <div>
                                                            <Link className='flex justify-center font-semibold mt-5 text-[#f78318]'>Compare packages</Link>
                                                        </div> */}
                            </div>
                          )
                        )
                      ) : (
                        <div className="pb-7">
                          <img
                            className="w-[9%] pt-10  m-auto"
                            src="https://script.viserlab.com/metalance/assets/templates/basic//images/empty_list.png"
                          />
                          <h1 className="mt-3 text-center text-[#cfcfcf]">
                            No Package found
                          </h1>
                        </div>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="xl:mt-15 mt-10 pb-4 w-full bg-white shadow-xl rounded-xl">
              <div>
                <div className="m-auto pt-15 w-[120px]">
                  <img
                    className="w-[100%] h-[110px] rounded-full"
                    src={serviceDetaildList?.authId?.authProfile}
                  />
                </div>
                <div className="mt-20">
                  <div className="flex justify-center gap-2 text-[1.4rem] font-bold ml-1">
                    <p>{serviceDetaildList?.authId?.firstName}</p>
                    <p>{serviceDetaildList?.authId?.lastName}</p>
                  </div>
                  {/* <p className='text-[#5c5c5c] mt-2'>{serviceDetaildList?.authId?.description}</p> */}
                  <p className="text-[#4c4c4c] font-semibold">
                    {" "}
                    {`${serviceDetaildList?.authId?.description?.substring(
                      0,
                      20
                    )} ..`}
                  </p>

                  <div className="flex items-center mt-1 gap-2 justify-center font-normal">
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#f78318" }}
                    />
                    <p className="font-bold">
                      {serviceDetaildList?.totalRatings}
                    </p>
                    <p>{`(${serviceDetaildList?.totalReview + " Reviews"})`}</p>
                  </div>
                </div>
                <div>
                  <Link to={`/userServices/${serviceDetaildList?.authId?._id}`}>
                    <button
                      type="submit"
                      className="border-2 mt-13 p-3 bg-[#f78318] font-bold text-[1.05rem] text-white rounded-xl w-[90%] cursor-pointer"
                    >
                      Contact Me
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f9f9f9]">
        <div className=" pb-20 xl:w-[53.5%] w-full xl:ml-20 bg-[#f9f9f9] ">
          <div className="pt-3 pb-3 pl-3 bg-white rounded-xl">
            <div className="flex items-center justify-between border-b-1 border-[#0000001a] pb-5">
              <h1 className="text-[1.5rem] ml-1 text-[#3d3d3d] font-bold">
                Reviews
              </h1>
              <h1 className="text-[1rem] ml-1 text-[#3d3d3d] mr-4 font-bold">
                Total {serviceDetaildList.totalReview} reviews
              </h1>
            </div>
            <div>
              {serviceDetaildList.ratings.length ? (
                serviceDetaildList.ratings.map(
                  (reviewRating, index) => (
                    console.log(reviewRating, "rr"),
                    (
                      <div className="flex items-center border-b-1 border-[#0000001a] mt-5 pb-5">
                        <div className="h-[50px] w-[80px]">
                          <img
                            className="xl:w-[80%] xl:h-[55px] w-[70%] h-[50px] rounded-[45px]"
                            src={reviewRating?.reviewerId?.authProfile}
                          />
                        </div>

                        <div className="mt-4 ml-4">
                          <div className="flex gap-2 font-bold ml-1">
                            <p>{reviewRating?.reviewerId?.firstName}</p>
                            <p>{reviewRating?.reviewerId?.lastName}</p>
                          </div>
                          <div className="flex mt-2 gap-2 items-center font-normal pb-3">
                            {starts.map((star, index) => (
                              <FontAwesomeIcon
                                key={index}
                                icon={faStar}
                                style={{
                                  color:
                                    index < reviewRating?.rating
                                      ? "#f78318"
                                      : "#ccc",
                                }}
                              />
                            ))}
                            <p>{reviewRating?.rating}</p>

                            <span className="border-1 border-[#0000001a] h-5"></span>
                            <p className="font-semibold">
                              {(() => {
                                const createdDate = new Date(
                                  reviewRating.createdAt
                                );
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
                            </p>
                          </div>
                          <p className="text-start">{reviewRating.review}</p>
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
                  <h1 className="mt-3 text-[#cfcfcf]">
                    No review found for this gig
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* for request to order popup */}
      <Dialog
        open={openModalDeletePortfolio}
        onClose={() => setOpenModalDeletePortfolio(false)}
        className="relative z-50"
      >
        {/* Backdrop with blur effect */}
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
        />

        {/* Dialog container */}
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-lg transition-all sm:my-8 sm:w-full sm:max-w-md">
              {/* Dialog content */}
              <div className="bg-white px-6 py-8 sm:px-8">
                <div className="sm:flex sm:items-start">
                  {/* Warning icon */}
                  {/* Dialog text content */}
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <div className="flex justify-between items-center">
                <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold text-gray-900"
                    >
                      Confirm Your Order!
                    </Dialog.Title>

                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold text-gray-900"
                    >
                     {packageType} Package Order  MATIC {price?.b_price || price?.s_price || price?.p_price}
                    </Dialog.Title>
                </div>
                    <div className="mt-2">
                      <p className="font-semibold text-gray-700">Order Quote</p>
                      <div className="mt-2">
                        <textarea
                          placeholder="Enter order quotes."
                          className="w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-3 text-sm"
                          rows={4}
                          value={order_quotes}
                          onChange={(e) => setOrder_Quotes(e.target.value)}
                        ></textarea>
                      </div>
                      <p className="mt-4 text-gray-500 text-sm">
                        Are you sure you want to proceed with this order? Please
                        double-check your quote.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dialog buttons */}
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:ml-3 sm:w-auto"
                  onClick={handleCreateProjects}
                >
                  Order Now
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:mt-0 sm:w-auto"
                  onClick={handleCloseDeletePortfolio}
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
      {/* chat pop up */}
      {/* Chat Dialog */}
      <Dialog
        open={openModalForChat}
        onClose={handleCloseModallForChat}
        className="relative z-50"
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
        />

        {/* Dialog container */}
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all">
              {/* Dialog header */}
              <div className="px-6 pt-6">
                <Dialog.Title className="text-xl font-bold text-gray-900">
                  Start Chatting
                </Dialog.Title>
              </div>

              {/* Chat content */}
              <div className="px-6 py-4">
                <div className="max-w-3xl mx-auto rounded-4xl p-6 bg-gray-50">
                  {/* Chat header */}
                  <div>
                    <h2 className="text-2xl font-bold mb-6 border-b pb-3">
                      Chat with {serviceDetaildList?.authId?.firstName}
                    </h2>
                  </div>

                  {/* Chat messages */}
                  <UserChat
                    messages={messages}
                    currentUserId={authId}
                    serviceDetaildList={serviceDetaildList}
                  />

                  {/* Message input */}
                  <MessageInput onSendMessage={handleSendMessage} />
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
      <Footer />
    </div>
  );
};

export default DetaildService;
