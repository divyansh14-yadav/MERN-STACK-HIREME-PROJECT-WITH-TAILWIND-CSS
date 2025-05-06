import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import authConfig from "../../api/config";
import Nav from "../nav";
import axios from "axios";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Editor } from "primereact/editor";
import { useLocation, useNavigate } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import OtherNav from "../otherNav";
import Footer from "../footer";
import { toast } from "react-toastify";
import {
  BasicInfoChangePasswordValidation,
  BasicInfoPortfolioValidation,
} from "../../validations/RegisterValidation";
import Loder from "../loader/loder";
import { FaUser, FaGraduationCap, FaImage, FaLock } from "react-icons/fa";

const BasicInfo = ({ setProfileImage }) => {
  const [userDetails, setUserDetails] = useState({});
  console.log(userDetails, "hello");
  localStorage.setItem("image", JSON.stringify(userDetails.authProfile));

  // const [activeTab, setActiveTab] = useState(0);

  const [inputs, setInputs] = useState([""]);

  const [educations, setEducations] = useState([]);
  console.log(educations, "edu");

  const [open, setOpen] = useState(false);

  const [portfolioImage, setPortfolioImage] = useState("");
  console.log(portfolioImage, "portfilr");

  const [folioTitle, setFolioTitle] = useState("");

  const [description, setDescription] = useState("");

  const [folio, setfolio] = useState([]);
  console.log(folio, "portfolio123");
  const [descriptionNew, setDescriptionNew] = useState("");
  console.log(description, "ccccccccccccccccc");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [editPortfolioIndex, setEditPortfolioIndex] = useState(null);
  console.log(editPortfolioIndex, "indexfolio");
  const [isEditMode, setIsEditMode] = useState(false);

  const [openModalDeletePortfolio, setOpenModalDeletePortfolio] =
    useState(false);

  const [updatedPortfolioData, setUpdatedPortfolioData] = useState(false);

  const [deletePortfolioId, setDeleteportfolioId] = useState("");

  const [UpdatedEducationData, setUpdatedEducationData] = useState(false);

  // const [supdatedimages, setUpdatedImages] = useState(false)

  const [updatedImages, setUpdatedImages] = useState(false);
  const [image, setImage] = useState(null);
  console.log(image, "basicimage");

  const [imagePreview, setImagePreview] = useState("");
  const [imagePreviewForPortfolio, setImagePreviewForPortfolio] = useState("");

  const [educationId, setEducationId] = useState("");
  console.log(educationId, "eduId");

  const [loading, setLoading] = useState(true);

  const [folioId, setFolioId] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const customToolbar = (
    <span className="ql-formats">
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <button className="ql-strike"></button>
      <button className="ql-blockquote"></button>
      <button className="ql-code-block"></button>
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
      <button className="ql-script" value="sub"></button>
      <button className="ql-script" value="super"></button>
      <button className="ql-indent" value="-1"></button>
      <button className="ql-indent" value="+1"></button>
      <select className="ql-header">
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="4"></option>
        <option value="5"></option>
        <option value="6"></option>
        <option selected></option>
      </select>
      <select className="ql-color"></select>
      <select className="ql-background"></select>
      <select className="ql-align"></select>
      <button className="ql-clean"></button>
    </span>
  );

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
    // setOpenDropdown(null)
  };

  const handleClose = () => {
    setOpen(false);
    setImagePreviewForPortfolio("");
  };

  const handleShow = (index = null) => {
    setOpen(true);

    if (index !== null && folio[index]) {
      setIsEditMode(true);
      setEditPortfolioIndex(index);

      const portfolioToEdit = folio[index];
      console.log(portfolioToEdit, "editfolio123");

      setFolioId(portfolioToEdit._id);

      const image =
        typeof portfolioToEdit.portfolioImage === "object"
          ? portfolioToEdit.portfolioImage.url
          : portfolioToEdit.portfolioImage || "";

      setPortfolioImage(image);
      setFolioTitle(portfolioToEdit?.folioTitle || "");
      setDescription(portfolioToEdit?.description || "");
      setImagePreviewForPortfolio(image);
    } else {
      setIsEditMode(false);
      setEditPortfolioIndex(null);
      setPortfolioImage("");
      setFolioTitle("");
      setDescription("");
      setImagePreviewForPortfolio("");
    }
  };

  const handleCloseDeletePortfolio = () => setOpenModalDeletePortfolio(false);

  const handleShowDeletePortfolio = (id) => {
    const portfolioDeletedId = id;
    setOpenModalDeletePortfolio(true);
    setDeleteportfolioId(portfolioDeletedId);
  };

  const headingsWithIcons = [
    { label: "Basic Info", icon: FaUser },
    { label: "Educations/Certification", icon: FaGraduationCap },
    { label: "Portfolio", icon: FaImage },
    { label: "Password", icon: FaLock },
  ];

  // tab refresh wala start
  const getTabFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return parseInt(params.get("tab")) || 0;
  };

  const [activeTab, setActiveTab] = useState(getTabFromQuery);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("tab", activeTab);
    navigate({ search: params.toString() }, { replace: true });
  }, [activeTab]);

  // tab refresh wala ends

  const authId = JSON.parse(localStorage.getItem("authId"));

  const quillRef = useRef(null);
  console.log(quillRef, "aaaaaaaaa");

  useEffect(() => {
    if (quillRef?.current) {
      const editor = quillRef?.current?.getEditor();
      const plainText = editor?.getText();
      console.log(plainText, "bbbbbbbbbbbbbbb");
      setDescriptionNew(plainText);
    }
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await authConfig.get(`found-profile/${authId}`);
        if (response.status === 200) {
          setUserDetails(response.data.auth_profile);
          setLoading(false);
        } else {
          console.log("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserDetails();
  }, [authId]);

  const handleUpdateUserData = async (e) => {
    e.preventDefault();
    try {
      const response = await authConfig.put(`update-profile-auth/${authId}`, {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        mobile_number: userDetails.mobile_number,
        address: userDetails.address,
        state: userDetails.state,
        zip_code: userDetails.zip_code,
        city: userDetails.city,
        country: userDetails.country,
        tagline: userDetails.tagline,
        description: userDetails.description,
      });

      if (response.status === 200) {
        // alert("Data updated successfully");
        toast.success("Basic information updated successfully");
        handleBasicInfoImages();
        setUpdatedImages(false);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      if (error.response.data.message === "Auth details not found") {
        toast.error("Details not found");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChangeforBasicInfo = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleFileChangeforportfolio = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPortfolioImage(file);
      setImagePreviewForPortfolio(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (userDetails?.Educations) {
      console.log("useEffect Triggered:", userDetails.Educations);
      setEducations(userDetails.Educations);
    }
  }, [userDetails]);

  const handleBasicInfoImages = async () => {
    // console.log(_id, "id");
    const formData = new FormData();

    formData.append("authProfile", image);
    try {
      const response = await authConfig.patch(
        `updateAuthProfileImage/${authId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setUpdatedImages(true);
        setProfileImage(response.data.updatedUser.authProfile)
      }
    } catch (error) {
      alert("Error basic info images", error);
    }
  };

  // education starts

  useEffect(() => {
    if (userDetails?.Educations) {
      setEducations(userDetails.Educations);
    }
  }, [userDetails]);

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    setEducations((prev) =>
      prev.map((edu, i) => (i === index ? { ...edu, [name]: value } : edu))
    );
  };

  const addInputField = () => {
    const newEducation = { college_university: "", title: "", year: "" };
    setEducations((prev) => [...prev, newEducation]);
  };

  const handleRemoveField = (index) => {
    setEducations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEducationAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await authConfig.put(`update-profile-auth/${authId}`, {
        Educations: educations,
      });
      if (response.status === 200) {
        setEducations(response.data.checkUser.Educations || []);

        toast.success("Education information updated successfully");
      }
    } catch (error) {
      console.error("Error adding education:", error);
      toast.error("There was an error adding the education");
    }
  };
  const handleDeleteEducation = async (id) => {
    try {
      const response = await authConfig.delete(
        `deleteEducation/${authId}/${id}`
      );
      if (response.status === 200) {
        // alert("Education deleted successfully");
        toast.success("Education deleted successfully");

        setEducations((prevEducations) =>
          prevEducations.filter((edu) => edu._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting education:", error);
      // alert("There was an error deleting the education");
    }
  };

  const handleCreatePortFolio = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("portfolioImage", portfolioImage);
      formData.append("folioTitle", folioTitle);
      formData.append("description", description);

      if (isEditMode) {
        const response = await authConfig.put(
          `updatePortfolio/${folio[editPortfolioIndex]._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 200) {
          // alert("Portfolio updated successfully");
          toast.success("Portfolio updated successfully");
          setPortfolioImage("");
          setFolioTitle("");
          setDescription("");
          setUpdatedPortfolioData(false);
          handleClose();
          setOpenDropdown("");
          setLoading(false);
        }
      } else {
        await BasicInfoPortfolioValidation.validate(
          {
            portfolioImage,
            folioTitle,
            description,
          },
          { abortEarly: false }
        );
        const response = await authConfig.post(
          `createPortfolio/${authId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 200) {
          // alert("Portfolio created successfully");
          toast.success("Portfolio added successfully");
          setPortfolioImage("");
          setFolioTitle("");
          setDescription("");
          setUpdatedPortfolioData(false);
          handleClose();
          setLoading(false);
        }
      }

      setOpen(false);
      setUpdatedPortfolioData(false);
    } catch (error) {
      if (error.name === "ValidationError") {
        error.errors.forEach((err) => toast.error(err));
        return;
      }
      console.error("Error creating Portfolio:", error);
      if (error.response.data.message === "Already have this portfolio") {
        toast.error("Already have this portfolio");
      } else if (error.response.data.message === "not found portfolio") {
        toast.error("Not found portfolio");
      }
    }
  };

  const handleTextChange = () => {
    if (quillRef.current) {
      const quillInstance = quillRef.current.getQuill();
      const plainText = quillInstance.getText();
      setDescription(plainText);
    }
  };

  useEffect(() => {
    const fetchCreatedPortFolio = async () => {
      try {
        const response = await authConfig.get(`foundPortfolio/${authId}`);
        if (response.status === 200) {
          setfolio(response.data.portfolio);
          setUpdatedPortfolioData(true);
          setLoading(false);
        } else {
          console.log("Error fetching portfolio");
        }
      } catch (error) {
        console.error("Error fetching all portfolio:", error);
      }
    };

    fetchCreatedPortFolio();
  }, [updatedPortfolioData]);

  const handleDeletePortfolio = async () => {
    // console.log(_id, "id");

    try {
      const response = await authConfig.delete(
        `deletePortfolio/${deletePortfolioId}`
      );
      if (response.status === 200) {
        // alert("Portfolio deleted")
        toast.success("Portfolio deleted successfully");
        if (updatedPortfolioData !== false) setUpdatedPortfolioData(false);
        setOpenDropdown(null);
        handleCloseDeletePortfolio();
      }
    } catch (error) {
      alert("Error delete portfolio:", error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await BasicInfoChangePasswordValidation.validate(
        {
          oldPassword,
          newPassword,
          confirm_password,
        },
        { abortEarly: false }
      );
      const response = await authConfig.post(`change-password/${authId}`, {
        oldPassword,
        newPassword,
        confirm_password,
      });

      if (response.status === 200) {
        // alert("Password change successfully");
        toast.success("Password change successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirm_Password("");
      }
    } catch (error) {
      console.error("Error password change:", error);
      if (error.name === "ValidationError") {
        error.errors.forEach((err) => toast.error(err));
        return;
      }
      if (error.response.data.message === "wrong Current Password") {
        // return alert("wrong Current Password")
        return toast.error("wrong Current Password");
      } else if (
        error.response.data.message === "confirm_password are not matched"
      ) {
        // return alert("confirm_password are not matched")
        return toast.error("confirm_password are not matched");
      } else if (error.response.data.message === "auth not found") {
        // return alert("auth not found")
        return toast.error("auth not found");
      } else {
        alert("Error password change:", error);
      }
    }
  };

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // if (loading) {
  //   return <Loder />;
  // }

  return (
    <div className="bg-[#eef2f8]">
      <OtherNav />

      {loading ? (
        <Loder />
      ) : (
        <div>
          <div className="xl:w-[80%] w-[90%] m-auto bg-white">
            <div className="mt-6">
              <div className="overflow-x-auto bg-white shadow-sm border-b border-gray-200">
                <div className="container mx-auto px-4 lg:px-8 flex items-center justify-start">
                  {headingsWithIcons.map((item, index) => (
                    <div
                      key={index}
                      className={`px-4 py-3 flex-shrink-0 cursor-pointer transition-colors duration-200 flex items-center gap-2 ${
                        activeTab === index
                          ? "border-b-2 border-[#f78318] text-[#f78318] font-semibold"
                          : "text-gray-600 hover:text-[#f78318]"
                      }`}
                      onClick={() => setActiveTab(index)}
                    >
                      <item.icon className="text-lg" />
                      <button className="text-sm sm:text-base font-medium focus:outline-none">
                        {item.label}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white shadow-md rounded-lg">
                {activeTab === 0 && (
                  <div>
                    <h1 className="text-start text-[#000000b3] text-[1.3rem] font-bold border-b border-[#00000021] pb-5 p-5">
                      Profile Setting
                    </h1>
                    <form onSubmit={handleUpdateUserData}>
                      <div className="flex justify-center relative">
                        <input
                          type="file"
                          className="hidden"
                          id="fileInput"
                          onChange={handleFileChangeforBasicInfo}
                          accept="image/*"
                        />
                        <label
                          htmlFor="fileInput"
                          className="border-2 border-[#f78318] w-32 h-32 sm:w-40 sm:h-40 rounded-full mt-8 flex items-center justify-center cursor-pointer"
                          style={{
                            backgroundImage: imagePreview
                              ? `url(${imagePreview})`
                              : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          {!imagePreview && (
                            <img
                              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full pointer-events-none object-cover"
                              src={userDetails.authProfile || ""}
                              alt="Default Profile"
                            />
                          )}
                        </label>
                      </div>

                      <div className="text-start w-[95%] m-auto mt-6">
                        {/* ALL FIELDS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {/* First Name */}
                          <div className="grid">
                            <label className="text-[#000000b3] font-semibold">
                              First Name
                            </label>
                            <input
                              className="border border-[#00000021] rounded-[5px] w-full p-3 mt-[4px]"
                              name="firstName"
                              value={userDetails?.firstName || ""}
                              onChange={handleInputChange}
                            />
                          </div>
                          {/* Last Name */}
                          <div className="grid">
                            <label className="text-[#000000b3] font-semibold">
                              Last Name
                            </label>
                            <input
                              className="border border-[#00000021] rounded-[5px] w-full p-3 mt-[4px]"
                              name="lastName"
                              value={userDetails?.lastName || ""}
                              onChange={handleInputChange}
                            />
                          </div>

                          {/* Email */}
                          <div className="grid">
                            <label className="text-[#000000b3] font-semibold">
                              E-mail Address
                            </label>
                            <input
                              type="email"
                              className="border border-[#00000021] rounded-[5px] w-full p-3 mt-[4px] bg-[#cccccc] font-semibold text-[#495463]"
                              value={userDetails?.email || ""}
                              readOnly
                            />
                          </div>

                          {/* Mobile Number */}
                          <div className="grid">
                            <label className="text-[#000000b3] font-semibold">
                              Mobile Number
                            </label>
                            <input
                              className="border border-[#00000021] rounded-[5px] bg-[#cccccc] font-semibold text-[#495463] w-full p-3 mt-[4px]"
                              value={userDetails?.mobile_number || ""}
                              readOnly
                            />
                          </div>

                          {/* Address */}
                          <div className="grid">
                            <label className="text-[#000000b3] font-semibold">
                              Address
                            </label>
                            <input
                              className="border border-[#00000021] rounded-[5px] w-full p-3 mt-[4px]"
                              name="address"
                              value={userDetails?.address || ""}
                              onChange={handleInputChange}
                            />
                          </div>

                          {/* State */}
                          <div className="grid">
                            <label className="text-[#000000b3] font-semibold">
                              State
                            </label>
                            <input
                              className="border border-[#00000021] rounded-[5px] w-full p-3 mt-[4px]"
                              name="state"
                              value={userDetails?.state || ""}
                              onChange={handleInputChange}
                            />
                          </div>

                          {/* Zip Code */}
                          <div className="grid">
                            <label className="text-[#000000b3] font-semibold">
                              Zip Code
                            </label>
                            <input
                              className="border border-[#00000021] rounded-[5px] w-full p-3 mt-[4px]"
                              name="zip_code"
                              value={userDetails?.zip_code || ""}
                              onChange={handleInputChange}
                            />
                          </div>

                          {/* City */}
                          <div className="grid">
                            <label className="text-[#000000b3] font-semibold">
                              City
                            </label>
                            <input
                              className="border border-[#00000021] rounded-[5px] w-full p-3 mt-[4px]"
                              name="city"
                              value={userDetails?.city || ""}
                              onChange={handleInputChange}
                            />
                          </div>

                          {/* Country */}
                          <div className="grid">
                            <label className="text-[#000000b3] font-semibold">
                              Country
                            </label>
                            <input
                              className="border border-[#00000021] rounded-[5px] w-full p-3 mt-[4px] bg-[#cccccc] font-semibold text-[#495463]"
                              value={userDetails?.country || ""}
                              onChange={handleInputChange}
                              readOnly
                            />
                          </div>
                        </div>

                        {/* Tagline */}
                        <div className="grid mt-5">
                          <label className="text-[#000000b3] font-semibold">
                            Tagline
                          </label>
                          <input
                            className="border border-[#00000021] rounded-[5px] w-full p-3 mt-[4px]"
                            name="tagline"
                            value={userDetails?.tagline || ""}
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* Description */}
                        <div className="grid mt-5">
                          <label className="text-[#000000b3] font-semibold">
                            Description
                          </label>
                          <textarea
                            className="border border-[#00000021] rounded-[5px] w-full p-5 h-[140px] mt-[4px]"
                            value={userDetails?.description || ""}
                            name="description"
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end mt-8">
                          <button className="border-2 border-[#f78318] cursor-pointer bg-[#f78318] text-white font-bold text-[1rem] px-6 py-2 rounded-md hover:bg-[#e0720f] transition">
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
                {activeTab === 1 && (
                  <div className="text-start text-[#5c5c5c] overflow-x-auto">
                    <div className="flex justify-between items-center border-b pb-4 min-w-[700px]">
                      <h1 className="text-[#000000b3] text-[1.3rem] font-semibold">
                        Education
                      </h1>
                      <button
                        className="border-2 border-[#f78318] text-[1rem] xl:p-2 p-1 cursor-pointer font-bold text-white bg-[#f78318] rounded-md"
                        onClick={addInputField}
                      >
                        + Add
                      </button>
                    </div>

                    {educations.length > 0 ? (
                      <div className="min-w-[700px]">
                        {educations.map((edu, index) => (
                          <div
                            key={index}
                            className="flex flex-nowrap justify-start mt-4 gap-4"
                          >
                            <div className="flex flex-col w-[250px]">
                              <label className="text-[#000000b3] font-semibold mb-1">
                                College/University
                              </label>
                              <input
                                type="text"
                                name="college_university"
                                className="border border-[#00000021] rounded-md w-full p-2"
                                value={edu.college_university}
                                onChange={(e) =>
                                  handleEducationChange(index, e)
                                }
                                required
                              />
                            </div>
                            <div className="flex flex-col w-[200px]">
                              <label className="text-[#000000b3] font-semibold mb-1">
                                Title
                              </label>
                              <input
                                type="text"
                                name="title"
                                className="border border-[#00000021] rounded-md w-full p-2"
                                value={edu.title}
                                onChange={(e) =>
                                  handleEducationChange(index, e)
                                }
                                required
                              />
                            </div>
                            <div className="flex flex-col w-[120px]">
                              <label className="text-[#000000b3] font-semibold mb-1">
                                Year
                              </label>
                              <input
                                type="number"
                                name="year"
                                className="border border-[#00000021] rounded-md w-full p-2"
                                value={edu.year}
                                onChange={(e) =>
                                  handleEducationChange(index, e)
                                }
                                required
                              />
                            </div>

                            <div className="flex gap-3 items-center mt-8">
                              <FontAwesomeIcon
                                icon={faXmark}
                                className="border-2 p-1 rounded-full cursor-pointer hover:bg-gray-200 text-red-500"
                                onClick={() => handleDeleteEducation(edu._id)}
                              />
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="border-2 p-1 rounded-full cursor-pointer hover:bg-gray-200 text-green-500"
                                onClick={(e) => {
                                  console.log("Clicked on Index:", index);
                                  console.log(
                                    "Education Object:",
                                    educations[index]
                                  );
                                  handleEducationAdd(e, educations[index]);
                                }}
                              />
                              {!edu._id && (
                                <button
                                  onClick={() => handleRemoveField(index)}
                                  className="text-orange-600 font-bold text-xl cursor-pointer"
                                >
                                  ×
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 min-w-[700px]">
                        <img
                          className="w-24 mx-auto"
                          src="https://script.viserlab.com/metalance/assets/templates/basic/images/empty_list.png"
                          alt="No Education"
                        />
                        <h1 className="mt-3 text-[#CFCFCF]">
                          No Education found
                        </h1>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 2 && (
                  <div className="text-start text-[#5c5c5c] overflow-x-auto">
                    <div className="min-w-[700px]">
                      <div className="flex justify-between items-center border-b pb-6">
                        <h1 className="text-[#000000b3] text-[1.3rem] font-semibold">
                          Portfolios
                        </h1>
                        <button
                          className="border-2 border-[#f78318] cursor-pointer xl:text-[1rem] text-[0.875rem] xl:w-[10%] w-[15%] p-1 font-bold text-white bg-[#f78318] rounded-md"
                          onClick={handleShow}
                        >
                          + Add New
                        </button>
                      </div>

                      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
                        <table className="w-full text-sm text-left text-gray-500 border-neutral-200">
                          <thead className="text-xs text-gray-700 uppercase border-b border-neutral-200">
                            <tr>
                              <th scope="col" className="px-6 py-3">
                                Images
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Title
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Description
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {folio.length > 0 ? (
                              folio.map((allFolio, index) => (
                                <tr
                                  key={index}
                                  className="border-b border-neutral-200"
                                >
                                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    <img
                                      className="w-[50px] h-[50px] rounded-full"
                                      src={
                                        typeof allFolio.portfolioImage ===
                                        "object"
                                          ? allFolio.portfolioImage.url
                                          : allFolio.portfolioImage
                                      }
                                      alt="image"
                                    />
                                  </td>
                                  <td className="px-6 py-4">
                                    {allFolio.folioTitle}
                                  </td>
                                  <td className="px-12 py-8">
                                    <p>{`${allFolio.description.substring(
                                      0,
                                      60
                                    )}...`}</p>
                                  </td>
                                  <td className="px-6 py-4">
                                    <button
                                      className="border w-8 h-8 cursor-pointer border-[#0000001a] rounded-full flex items-center justify-center"
                                      onClick={() => toggleDropdown(index)}
                                    >
                                      <FontAwesomeIcon
                                        className="cursor-pointer"
                                        icon={faEllipsisVertical}
                                      />
                                    </button>
                                    {openDropdown === index && (
                                      <div
                                        ref={dropdownRef}
                                        className="absolute xl:right-32 right-5 xl:mt-2 w-32 bg-white border rounded-lg shadow-lg z-10"
                                      >
                                        <ul className="py-2 px-2 text-sm text-gray-700">
                                          <li>
                                            <button
                                              onClick={() => handleShow(index)}
                                              className="block px-4 py-2 w-full text-left cursor-pointer hover:bg-gray-100"
                                            >
                                              Edit
                                            </button>
                                          </li>
                                          <li>
                                            <button
                                              onClick={() =>
                                                handleShowDeletePortfolio(
                                                  allFolio._id
                                                )
                                              }
                                              className="block px-4 py-2 w-full text-left cursor-pointer hover:bg-gray-100"
                                            >
                                              Delete
                                            </button>
                                          </li>
                                        </ul>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="5" className="text-center py-10">
                                  <img
                                    className="w-[7%] mx-auto"
                                    src="https://script.viserlab.com/metalance/assets/templates/basic/images/empty_list.png"
                                    alt="No Projects"
                                  />
                                  <h1 className="mt-3 text-[#CFCFCF]">
                                    No portfolio found
                                  </h1>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 3 && (
                  <div className="overflow-x-auto">
                    <div className="min-w-[400px]">
                      <h1 className="text-[1.2rem] font-bold text-start text-[#000000b3] border-b pb-8">
                        Change Password
                      </h1>
                      <div className="mt-8 w-full max-w-[500px] mx-auto">
                        <div className="text-start">
                          <label className="text-[#000000b3] font-semibold">
                            Current Password
                          </label>
                          <div>
                            <input
                              type="password"
                              name="current_password"
                              className="border border-[#00000021] rounded-md w-full p-2.5 mt-1"
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="mt-3 text-start">
                          <label className="text-[#000000b3] font-semibold">
                            New Password
                          </label>
                          <div>
                            <input
                              type="password"
                              name="new_password"
                              className="border border-[#00000021] rounded-md w-full p-2.5 mt-1"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="mt-3 text-start">
                          <label className="text-[#000000b3] font-semibold">
                            Confirm Password
                          </label>
                          <div>
                            <input
                              type="password"
                              name="confirm_password"
                              className="border border-[#00000021] rounded-md w-full p-2.5 mt-1"
                              value={confirm_password}
                              onChange={(e) =>
                                setConfirm_Password(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <button
                            className="border-2 cursor-pointer border-[#f78318] text-[1rem] w-full p-2 mt-8 font-bold text-white bg-[#f78318] rounded-md"
                            onClick={handleChangePassword}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-3xl rounded bg-white p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-semibold text-gray-900">
                {isEditMode ? "Update Portfolio" : "Add New Portfolio"}
              </Dialog.Title>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4">
              <div className="flex flex-col items-center">
                <input
                  type="file"
                  className="hidden"
                  id="fileInput"
                  onChange={handleFileChangeforportfolio}
                  accept="image/*"
                />
                <label
                  htmlFor="fileInput"
                  className="border-2 border-[#f78318] w-32 h-32 rounded-full mt-5 flex items-center justify-center cursor-pointer hover:bg-[#f78318]/20 transition duration-300"
                  style={{
                    backgroundImage: imagePreviewForPortfolio
                      ? `url(${imagePreviewForPortfolio})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!imagePreviewForPortfolio && (
                    <p className="text-[#f78318] font-semibold pointer-events-none">
                      Upload Image
                    </p>
                  )}
                </label>
              </div>

              <div className="grid w-full mt-4">
                <label className="text-[#000000b3] font-semibold mb-2">
                  Title
                </label>
                <input
                  className="border border-[#00000021] rounded-md w-full p-2 mt-1"
                  value={folioTitle}
                  name="title"
                  onChange={(e) => setFolioTitle(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className="text-[#000000b3] font-semibold mb-2">
                  Description
                </label>
                <div className="mt-2">
                  <Editor
                    ref={quillRef}
                    value={description}
                    headerTemplate={customToolbar}
                    name="description"
                    onTextChange={handleTextChange}
                    style={{ height: "120px" }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="border-2 border-gray-300 cursor-pointer text-gray-700 px-6 py-2 text-[1rem] font-bold rounded-md hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>

              <button
                type="submit"
                onClick={handleCreatePortFolio}
                className="border-2 border-[#f78318] cursor-pointer bg-[#f78318] text-white px-6 py-2 text-[1rem] font-bold rounded-md hover:bg-[#f78318]/90 transition-all"
              >
                {isEditMode ? "Update" : "Submit"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* for delete portfolio */}

      <Dialog
  open={openModalDeletePortfolio}
  onClose={() => setOpenModalDeletePortfolio(false)}
  className="relative z-50"
>
  <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
  
  <div className="fixed inset-0 flex items-center justify-center p-4">
    <Dialog.Panel className="mx-auto max-w-lg rounded-lg bg-white p-6">
      <div className="sm:flex sm:items-start">
        <div className="mt-3 text-center sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-lg font-bold leading-6 text-gray-900"
          >
            Delete Portfolio
          </Dialog.Title>

          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this portfolio?
              <br />
              This action cannot be undone.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button
          type="button"
          onClick={() => setOpenModalDeletePortfolio(false)}
          className="inline-flex justify-center rounded-md bg-white px-6 py-2 text-sm font-bold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 transition-all"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={() => handleDeletePortfolio(deletePortfolioId)}
          className="inline-flex justify-center rounded-md bg-red-600 px-6 py-2 text-sm font-bold text-white hover:bg-red-500 transition-all"
        >
          Yes, Delete
        </button>
      </div>
    </Dialog.Panel>
  </div>
</Dialog> 

      <Footer />
    </div>
  );
};

export default BasicInfo;
