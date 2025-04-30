import React, { useEffect, useRef, useState } from "react";
import Nav from "./nav";
import OtherNav from "./otherNav";
import Footer from "./footer";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Dialog,
} from "@mui/material";
import { Editor } from "primereact/editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import authConfig from "../api/config";
import { useParams } from "react-router-dom";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import {
  step1Validation,
  step2Validation,
  step3Validation,
  step4Validation,
  step5Validation,
} from "../validations/RegisterValidation";
import Loder from "./loader/loder";

const Gigs = () => {
  const steps = [
    "Overview",
    "Pricing",
    "Requirement",
    "FAQ",
    "Gallery",
    "Publish",
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [FAQ, setFAQ] = useState([{ question: "", answer: "" }]);

  console.log(FAQ, "FAQ");

  const [images, setImages] = useState([{ file: null, serviceImage: "" }]);
  // console.log(images, "imagessssss");

  const [createServiceId, setCreateServiceId] = useState("");
  console.log(createServiceId, "idservice");
  const [serviceDetails, setServiceDetails] = useState({});
  console.log(serviceDetails, "service details");

  const [updatedData, setUpdatedData] = useState(false);
  // for overview
  const [title, setTitle] = useState("");
  console.log(title, "title");

  // const [descriptions,setDescriptions] = useState("")
  const [searchTags, setSearchTags] = useState("");

  // for price
  // for basic
  const [Basic_price, setBasic_price] = useState([
    {
      b_Name: "",
      b_description: "",
      b_vector_file: "",
      b_printable_file: "",
      b_mockup: "",
      b_source_file: "",
      b_social_media_kit: "",
      b_number_of_concept: "",
      b_revisions: "",
      b_price: "",
    },
  ]);
  console.log(Basic_price, "bprice");
  const [Standard_price, setStandard_price] = useState([
    {
      s_Name: "",
      s_description: "",
      s_vector_file: "",
      s_printable_file: "",
      s_mockup: "",
      s_source_file: "",
      s_social_media_kit: "",
      s_number_of_concept: "",
      s_revisions: "",
      s_price: "",
    },
  ]);
  console.log(Standard_price, "sprice");

  const [Premium_price, setPremium_price] = useState([
    {
      p_Name: "",
      p_description: "",
      p_vector_file: "",
      p_printable_file: "",
      p_mockup: "",
      p_source_file: "",
      p_social_media_kit: "",
      p_number_of_concept: "",
      p_revisions: "",
      p_price: "",
    },
  ]);

  console.log(Premium_price, "Premium_price");

  const [requirement, setRequirement] = useState("");

  const [valueee, setValueee] = useState("");
  console.log(valueee, "valuesssssssssssss");

  const [UpdateDataone, setUpdatedDataOne] = useState("");
  console.log(UpdateDataone, "5656565656565656565656565656");

  const [openDropdown, setOpenDropdown] = useState(null);

  const [editMode, setEditMode] = useState(false);

  const [serviceDetailsAll, setServiceDetailsAll] = useState([]);
  console.log(serviceDetailsAll, "allservicesdataaaaaaaaaa");

  const quillRefForDescription = useRef(null);

  const quillRefForRequirement = useRef(null);

  const authId = JSON.parse(localStorage.getItem("authId"));

  const serviceStatus = ["Draft", "Publish"];

  const [activeStepForServiceStatus, setActiveStepForServiceStatus] =
    useState(0);

  const [serviceDetailsAllPublic, setServiceDetailsAllPublic] = useState([]);
  console.log(serviceDetailsAllPublic, "public all");

  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  console.log(categoryId, "aman");
  console.log(subCategoryId, "dev");

  const [servicesForEditGigs, SetServicesForEditGigs] = useState({});
  console.log(servicesForEditGigs, "servicesForEditGigs");

  const [publicDatashow, setpublicDataShow] = useState(false);

  const [removedImages, setRemovedImages] = useState([]);

  const [loading, setLoading] = useState(true);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setOpen(false);
    setTitle("");
    setDescription("");
    setSearchTags("");
    setBasic_price([]);
    setStandard_price([]);
    setPremium_price([]);
    setRequirement("");
    setFAQ([{ question: "", answer: "" }]);
    setImages([{ file: null, serviceImage: "" }]);
    // setCreateServiceId("");
    setUpdatedDataOne({});
    setUpdatedData(false);
  };

  const handleTextChangeForDescription = () => {
    if (quillRefForDescription.current) {
      const quillInstance = quillRefForDescription.current.getQuill();
      const plainText = quillInstance.getText();
      setDescription(plainText);
    }
  };

  const handleTextChangeRequirement = () => {
    if (quillRefForRequirement.current) {
      const quillInstance = quillRefForRequirement.current.getQuill();
      const plainText = quillInstance.getText();
      setRequirement(plainText);
    }
  };

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

  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...FAQ];
    updatedFaqs[index][field] = value;
    setFAQ(updatedFaqs);
  };

  const addFaq = () => {
    setFAQ([...FAQ, { question: "", answer: "" }]);
  };

  const removeFaq = (index) => {
    if (index !== 0) {
      setFAQ(FAQ.filter((_, i) => i !== index));
    }
  };
  // const addImage = () => {
  //     // setImages([...images, { file: null, preview: "" }]);
  //     setImages(prev => Array.isArray(prev) ? [...prev, { file: null, serviceImage: "" }] : [{ file: null, serviceImage: "" }]);

  // };

  const addImage = () => {
    setImages((prev) =>
      Array.isArray(prev)
        ? [...prev, { file: null, serviceImage: "" }]
        : [{ file: null, serviceImage: "" }]
    );
  };

  // const removeImage = (index) => {
  //     if (index !== 0) {
  //         setImages(images.filter((_, i) => i !== index));
  //     }
  // };

  const removeImage = (index) => {
    const img = images[index];

    // Agar image ka file nahi hai aur serviceImage hai, toh usse removedImages mein add karo
    if (!img.file && img.serviceImage) {
      setRemovedImages((prev) => [...prev, img.serviceImage]); // Add to removedImages
    }

    // Image ko images array se hata do
    setImages((prev) => {
      const updatedImages = [...prev];
      updatedImages.splice(index, 1); // Remove image at index
      return updatedImages;
    });
  };

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => {
          if (!Array.isArray(prevImages)) prevImages = [];
          const updatedImages = [...prevImages];
          updatedImages[index] = { file, serviceImage: reader.result };
          return updatedImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // useEffect(() => {
  //     if (authId) {
  //         const showService = async () => {
  //             try {
  //                 const response = await authConfig.get(`draft_details/${authId}`);
  //                 if (response.status === 200) {
  //                     setServiceDetails(response.data);
  //                     setCreateServiceId(response.data._id);
  //                     setUpdatedData(false)
  //                 }
  //             } catch (error) {
  //                 console.error("Error fetching detaild services:", error);
  //             }
  //         };

  //         showService();
  //     }
  // }, [authId, updatedData]);

  const fetchDraftDetails = async () => {
    try {
      const response = await authConfig.get(`draft_details/${authId}`);
      if (response.status === 200) {
        setServiceDetails(response.data);
        setCreateServiceId(response.data._id);
        setUpdatedData(false);
      }
    } catch (error) {
      console.error("Error fetching draft details:", error);
    }
  };

  const handlePriceChange = (type, field, value) => {
    if (type === "basic") {
      setBasic_price((prev) =>
        prev.length > 0
          ? prev.map((item, index) =>
              index === 0 ? { ...item, [field]: value } : item
            )
          : [{ [field]: value }]
      );
    } else if (type === "standard") {
      setStandard_price((prev) =>
        prev.length > 0
          ? prev.map((item, index) =>
              index === 0 ? { ...item, [field]: value } : item
            )
          : [{ [field]: value }]
      );
    } else if (type === "premium") {
      setPremium_price((prev) =>
        prev.length > 0
          ? prev.map((item, index) =>
              index === 0 ? { ...item, [field]: value } : item
            )
          : [{ [field]: value }]
      );
    }
  };

  // const handleServiceCreate = async () => {
  //     let schema;

  //     switch (activeStep) {
  //       case 0:
  //         schema = step1Validation;
  //         break;
  //       case 1:
  //         schema = step2Validation;
  //         break;
  //       case 2:
  //         schema = step3Validation;
  //         break;
  //       case 3:
  //         schema = step4Validation;
  //         break;
  //       case 4:
  //         schema = step5Validation;
  //         break;
  //       default:
  //         return true;
  //     }
  //     try {
  //         await schema.validate(
  //             {
  //                 title,
  //                 description,
  //                 categoryId,
  //                 sub_categoryId: subCategoryId,
  //                 searchTags,
  //                 requirement,
  //                 Basic_price,
  //                 Standard_price,
  //                 Premium_price,
  //                 FAQ,
  //                 images,
  //             },
  //             { abortEarly: false } // show all errors
  //         );
  //         const formData = new FormData();
  //         console.log(formData, "formdata1121212");
  //         formData.append("Basic_price", JSON.stringify(Basic_price));
  //         formData.append("Standard_price", JSON.stringify(Standard_price));
  //         formData.append("Premium_price", JSON.stringify(Premium_price));
  //         formData.append("title", title);
  //         formData.append("description", description);
  //         formData.append("categoryId", categoryId);
  //         formData.append("sub_categoryId", subCategoryId);
  //         formData.append("searchTags", searchTags);
  //         formData.append("requirement", requirement);
  //         formData.append("FAQ", JSON.stringify(FAQ))
  //         // Array.isArrayimages?.forEach((image, index) => {
  //         Array.isArray(images) && images.forEach((image, index) => {
  //             if (image.file) {
  //                 return formData.append(`serviceImage`, image.file);
  //             }
  //         });

  //         if (createServiceId) {
  //             const response = await authConfig.put(`update-service-draft/${createServiceId}`, formData);
  //             handleNext();
  //             setUpdatedDataOne(response.data.updatedDraft)
  //             // await fetchDraftDetails();
  //             setUpdatedData(true)
  //             // alert("Data updated successfully!");
  //             if (activeStep === 5) {
  //                 toast.success("service create successfully")
  //             }
  //         }
  //         else {
  //             const formData2 = new FormData()
  //             formData2.append("title", title)
  //             formData2.append("description", description)
  //             formData2.append("categoryId", categoryId);
  //             formData2.append("sub_categoryId", subCategoryId);
  //             formData2.append("searchTags", searchTags)
  //             const response = await authConfig.post(`create-service/${authId}`, formData2, {
  //                 headers: { "Content-Type": "multipart/form-data" },
  //             })
  //             await fetchDraftDetails()
  //             setUpdatedData(true)

  //             // alert("data created")

  //             handleNext()
  //         }
  //     } catch (error) {
  //         if (error.name === "ValidationError") {
  //             error.errors.forEach((err) => toast.error(err));
  //             return;
  //         }
  //         console.error("Error submitting form data:", error);
  //         if (error.response.data.message === "already have this title of service") {
  //             toast.error("Already have this title of service")
  //         }
  //         else if (error.response.data.message === "Not found service") {
  //             toast.error("Not found service")
  //         }
  //     }
  // };

  const handleServiceCreate = async (validate = true) => {
    let schema;

    switch (activeStep) {
      case 0:
        schema = step1Validation;
        break;
      case 1:
        schema = step2Validation;
        break;
      case 2:
        schema = step3Validation;
        break;
      case 3:
        schema = step4Validation;
        break;
      case 4:
        schema = step5Validation;
        break;
      default:
        schema = null;
    }

    try {
      if (validate && schema) {
        await schema.validate(
          {
            title,
            description,
            categoryId,
            sub_categoryId: subCategoryId,
            searchTags,
            requirement,
            Basic_price,
            Standard_price,
            Premium_price,
            FAQ,
          },
          { abortEarly: false }
        );
      }

      // FormData prepare kar rahe hain
      const formData = new FormData();
      formData.append("Basic_price", JSON.stringify(Basic_price));
      formData.append("Standard_price", JSON.stringify(Standard_price));
      formData.append("Premium_price", JSON.stringify(Premium_price));
      formData.append("title", title);
      formData.append("description", description);
      formData.append("categoryId", categoryId);
      formData.append("sub_categoryId", subCategoryId);
      formData.append("searchTags", searchTags);
      formData.append("requirement", requirement);
      formData.append("FAQ", JSON.stringify(FAQ));

      const keptOld = images
        .filter((img) => !img.file && !removedImages.includes(img.serviceImage))
        .map((img) => img.serviceImage);
      keptOld.forEach((name) => formData.append("serviceImage", name));

      // Add the new images that have a file
      images
        .filter((img) => img.file)
        .forEach((img) => formData.append("serviceImage", img.file));

      // Add removed images to FormData
      formData.append("removedImages", JSON.stringify(removedImages));

      if (createServiceId) {
        const response = await authConfig.put(
          `update-service-draft/${createServiceId}`,
          formData
        );
        setUpdatedDataOne(response.data.updatedDraft);
        setUpdatedData(true);
        handleNext();
        if (activeStep === 5)
          toast.success("Service saved as draft successfully!");
      } else {
        const formData2 = new FormData();
        formData2.append("title", title);
        formData2.append("description", description);
        formData2.append("categoryId", categoryId);
        formData2.append("sub_categoryId", subCategoryId);
        formData2.append("searchTags", searchTags);
        const response = await authConfig.post(
          `create-service/${authId}`,
          formData2
        );
        await fetchDraftDetails();
        setUpdatedData(true);
        handleNext();
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        error.errors.forEach((err) => toast.error(err));
        return;
      }

      if (
        error?.response?.data?.message === "already have this title of service"
      ) {
        toast.error("This title already exists");
      } else if (error?.response?.data?.message === "Not found service") {
        toast.error("Service not found");
      } else {
        toast.error("Something went wrong while saving.");
      }
    }
  };

  let data = "public";
  const handlePublicData = async () => {
    const response = await authConfig.put(
      `update-service-public/${createServiceId}`,
      {
        in_pubhish: "public",
      }
    );
    handleNext();
    toast.success("your service has been public");
    setpublicDataShow(true);
  };

  useEffect(() => {
    const showServiceAll = async () => {
      try {
        const response = await authConfig.get(`draft_details_all/${authId}`);
        if (response.status === 200) {
          setServiceDetailsAll(response.data);
          setpublicDataShow(false);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching detaild services:", error);
      }
    };

    showServiceAll();
  }, [updatedData, publicDatashow]);

  useEffect(() => {
    const showServiceAllpublic = async () => {
      try {
        const response = await authConfig.get(`auth-service/${authId}`);
        if (response.status === 200) {
          setServiceDetailsAllPublic(response.data);
          setpublicDataShow(false);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching detaild services all public:", error);
      }
    };

    showServiceAllpublic();
  }, [updatedData, publicDatashow]);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleEditClick = (serviceDetail) => {
    console.log(serviceDetail, "yoho");
    setTitle(serviceDetail?.title);
    setDescription(serviceDetail?.description);
    setSearchTags(serviceDetail?.searchTags);
    setFAQ(
      serviceDetail?.FAQ?.length > 0
        ? serviceDetail.FAQ
        : [{ question: "", answer: "" }]
    );
    setImages(
      serviceDetail?.serviceImage?.map((img) => ({
        file: null,
        serviceImage: img,
      })) || [{ file: null, serviceImage: "" }]
    );
    setCreateServiceId(serviceDetail?._id);
    // Set Prices
    setBasic_price(serviceDetail?.Basic_price || []);
    setStandard_price(serviceDetail?.Standard_price || []);
    setPremium_price(serviceDetail?.Premium_price || []);
    // Set requirement
    setRequirement(serviceDetail?.requirement || "");
    // Set category and subcategory
    const categoryId = serviceDetail?.categoryId?._id;
    setCategoryId(categoryId);
    if (categoryId) {
      fetchSubCategories(categoryId);
    }
    setSubCategoryId(serviceDetail?.sub_categoryId);
    // Other fields
    setEditMode(true);
    setOpen(true);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await authConfig.get("all-featured-categories");
        if (response.status === 200) {
          setCategories(response.data.featuredCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await authConfig.get(
        `found-feature-sub-categories/${categoryId}`
      );
      if (response.status === 200) {
        setSubCategories(response.data.featured_SubCategories);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setCategoryId(selectedCategoryId);
    fetchSubCategories(selectedCategoryId);
  };

  const handleSubCategoryChange = (e) => {
    const selectedSubCategoryId = e.target.value;
    setSubCategoryId(selectedSubCategoryId);
    fetchSubCategories(selectedSubCategoryId);
  };

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
  console.log("Removed Images:", removedImages);
  console.log("Images to be saved:", images);

  if (loading) {
    return <Loder />;
  }

  return (
    <div className="bg-[#eef2f8]">
      <Nav />
      <OtherNav />
      <div className="xl:w-[80%] w-[90%] mt-10 m-auto rounded-md bg-white">
        <div className="xl:flex block justify-between items-center border-b-1 border-[#0000001a] p-4 pb-5">
          {/* <h1 className="text-[1rem] text-[#495463] font-bold">My Gigs</h1> */}
          <div className="flex xl:gap-5 gap-2">
            {serviceStatus?.map((status, index) => (
              <div className="flex gap-2 font-semibold">
                <button
                  onClick={() => setActiveStepForServiceStatus(index)}
                  className={
                    index === 0
                      ? "bg-[#fff3dd] w-[80px] p-1 rounded-md cursor-pointer"
                      : "bg-[#12d00126] w-[100px] p-1 rounded-md cursor-pointer"
                  }
                >
                  {status}
                </button>
              </div>
            ))}
          </div>
          <button
            className="border-2 border-[#f78318] xl:text-[1rem] text-[1rem] xl:p-2 p-1 xl:block flex justify-start xl:mt-0 mt-5 font-bold text-white bg-[#f78318] rounded-md"
            onClick={() => setOpen(true)}
          >
            + Create Gigs
          </button>
        </div>
        {activeStepForServiceStatus === 0 && (
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full text-left text-sm font-light text-surface ">
                    <thead class="border-b border-neutral-200 font-medium ">
                      <tr>
                        <th scope="col" class="px-6 py-4">
                          Service Title
                        </th>
                        <th scope="col" class="px-6 py-4">
                          Service Views
                        </th>
                        <th scope="col" class="px-6 py-4">
                          Category
                        </th>
                        <th scope="col" class="px-6 py-4">
                          Ispublished
                        </th>
                        {/* <th scope="col" class="px-6 py-4">Status</th> */}
                        <th scope="col" class="px-6 py-4">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {serviceDetailsAll.length ? (
                      serviceDetailsAll.map(
                        (serviceDetail, index) => (
                          console.log(serviceDetail, "jsjsjsjsjsjjs"),
                          (
                            <tbody>
                              <tr class="border-b border-neutral-200 transition duration-300 ease-in-out">
                                <div className="flex gap-2 items-center w-[20%]">
                                  <td class="whitespace-nowrap px-6 py-4 font-medium">
                                    {serviceDetail.title}
                                  </td>
                                </div>
                                <td class="whitespace-nowrap px-6 py-4">
                                  <p className="text-[#007bff] bg-[#d9ebff] text-center xl:w-[20%] w-[30%] rounded-full">
                                    0
                                  </p>
                                </td>
                                <td class="whitespace-nowrap px-6 py-4 font-semibold">
                                  {
                                    serviceDetail.categoryId
                                      .featureCategoriesName
                                  }
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                  <p className="bg-[#fff3dd] text-[#ffab1a] p-1 xl:w-[35%] w-full text-center font-semibold rounded-md">
                                    {serviceDetail.in_pubhish}
                                  </p>
                                </td>
                                <div
                                  className="border-2 border-[#0000001a] text-start w-[22%] m-auto rounded-full cursor-pointer"
                                  onClick={() => toggleDropdown(index)}
                                >
                                  <td className="xl:px-3.5 px-1.5 py-1">
                                    <FontAwesomeIcon
                                      className="cursor-pointer text-[#0000001a]"
                                      icon={faEllipsisVertical}
                                    ></FontAwesomeIcon>
                                  </td>
                                </div>
                                {openDropdown === index && (
                                  <div
                                    ref={dropdownRef}
                                    className="absolute xl:right-32 right-20 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10"
                                  >
                                    <ul className="py-2 px-2 text-sm text-gray-700 font-bold">
                                      <li>
                                        <button
                                          onClick={() =>
                                            handleEditClick(serviceDetail)
                                          }
                                          className="px-3 py-1 rounded"
                                        >
                                          Edit
                                        </button>
                                      </li>
                                      <li>
                                        <button
                                          onClick={handlePublicData}
                                          className="block px-3 py-2 w-full text-left hover:bg-gray-100"
                                        >
                                          Publish
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                )}
                              </tr>
                            </tbody>
                          )
                        )
                      )
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-10">
                          <img
                            className="w-[7%] m-auto"
                            src="https://script.viserlab.com/metalance/assets/templates/basic/images/empty_list.png"
                            alt="No Projects"
                          />
                          <h1 className="mt-3 text-[#CFCFCF]">
                            No service found for draft
                          </h1>
                        </td>
                      </tr>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeStepForServiceStatus === 1 && (
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full text-left text-sm font-light text-surface ">
                    <thead class="border-b border-neutral-200 font-medium ">
                      <tr>
                        <th scope="col" class="px-6 py-4">
                          Service Title
                        </th>
                        <th scope="col" class="px-6 py-4">
                          Service Views
                        </th>
                        <th scope="col" class="px-6 py-4">
                          Category
                        </th>
                        <th scope="col" class="px-6 py-4">
                          Ispublished
                        </th>
                        {/* <th scope="col" class="px-6 py-4">Status</th> */}
                        {/* <th scope="col" class="px-6 py-4">Action</th> */}
                      </tr>
                    </thead>
                    {serviceDetailsAllPublic?.services?.length ? (
                      serviceDetailsAllPublic?.services?.map(
                        (serviceDetail, index) => (
                          <tbody>
                            <tr class="border-b border-neutral-200 transition duration-300 ease-in-out ">
                              <div className="flex gap-2 items-center w-[20%]">
                                <td class="whitespace-nowrap px-6 py-4 font-medium">
                                  {serviceDetail.title}
                                </td>
                              </div>
                              <td class="whitespace-nowrap px-6 py-4">
                                <p className="text-[#007bff] bg-[#d9ebff] text-center w-[20%] rounded-full">
                                  0
                                </p>
                              </td>
                              <td class="whitespace-nowrap px-6 py-4 font-semibold">
                                logo design
                              </td>
                              <td class="whitespace-nowrap px-6 py-4">
                                <p className="bg-[#12d00126] text-[#12d001] p-1 w-[35%] text-center font-semibold rounded-md">
                                  {serviceDetail.in_pubhish}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        )
                      )
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-10">
                          <img
                            className="w-[7%] m-auto"
                            src="https://script.viserlab.com/metalance/assets/templates/basic/images/empty_list.png"
                            alt="No Projects"
                          />
                          <h1 className="mt-3 text-[#CFCFCF]">
                            No service found for publish
                          </h1>
                        </td>
                      </tr>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Popup (Dialog) */}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          {/* Stepper Header */}
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              "& .MuiStepLabel-label": {
                fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                fontWeight: 500,
                color: "#495463",
              },
              "& .MuiStepIcon-root.Mui-completed": {
                color: "#f78318",
              },
              "& .MuiStepIcon-root.Mui-active": {
                color: "#f78318",
              },
            }}
          >
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step Content or Completion Message */}
          <Box sx={{ mt: { xs: 3, sm: 4 } }}>
            {activeStep === steps.length ? (
              <div className="text-center py-10">
                <h2 className="text-lg font-semibold text-gray-800">
                  🎉 All steps completed!
                </h2>
                <p className="text-sm text-gray-600 mt-2 mb-6">
                  You've successfully finished creating your service.
                </p>
                <Button
                  onClick={handleReset}
                  variant="contained"
                  sx={{
                    bgcolor: "#f78318",
                    "&:hover": { bgcolor: "#d96c14" },
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                  }}
                >
                  Close
                </Button>
              </div>
            ) : (
              <>
                <Typography sx={{ mb: 1.5 }}></Typography>

                {activeStep === 0 && (
                  <div className="px-2 sm:px-4 py-4 sm:py-6 lg:px-8">
                    <h1 className="text-lg sm:text-xl font-bold text-gray-700 border-b pb-2 sm:pb-4 border-gray-200">
                      Gig Overview
                    </h1>
                    <div className="mt-4 sm:mt-6 grid grid-cols-1 gap-y-4 sm:gap-y-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-x-2 sm:gap-x-4">
                      {/* Gig Title */}
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="gigTitle"
                          className="block text-xs sm:text-sm font-bold text-gray-700"
                        >
                          Gig Title
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="gigTitle"
                            placeholder="I will..."
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-xs sm:text-sm border-gray-300 rounded-md p-2 sm:p-2.5"
                            value={title || ""}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">
                          As your Gig storefront,{" "}
                          <span className="font-semibold">
                            your title is the most important place
                          </span>{" "}
                          to include keywords that buyers would likely use to
                          search for a service like yours.
                        </p>
                      </div>

                      {/* Gig Description */}
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="gigDescription"
                          className="block text-xs sm:text-sm font-bold text-gray-700"
                        >
                          Gig Description
                        </label>
                        <div className="mt-1">
                          <Editor
                            id="gigDescription"
                            onChange={(e) => setDescription(e.target.value)}
                            ref={quillRefForDescription}
                            value={description || ""}
                            headerTemplate={customToolbar}
                            name="description"
                            onTextChange={handleTextChangeForDescription}
                            style={{ height: "120px", fontSize: "14px" }}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      {/* Category */}
                      <div>
                        <label
                          htmlFor="category"
                          className="block text-xs sm:text-sm font-bold text-gray-700"
                        >
                          Category
                        </label>
                        <div className="mt-1">
                          <select
                            id="category"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-xs sm:text-sm border-gray-300 rounded-md p-2 sm:p-2.5"
                            onChange={handleCategoryChange}
                            value={categoryId || ""}
                          >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                              <option
                                key={category._id}
                                value={category._id || ""}
                              >
                                {category.featureCategoriesName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Subcategory */}
                      <div>
                        <label
                          htmlFor="subcategory"
                          className="block text-xs sm:text-sm font-bold text-gray-700"
                        >
                          Subcategory
                        </label>
                        <div className="mt-1">
                          <select
                            id="subcategory"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-xs sm:text-sm border-gray-300 rounded-md p-2 sm:p-2.5"
                            onChange={handleSubCategoryChange}
                            value={subCategoryId || ""}
                            disabled={!categoryId}
                          >
                            <option value="">Select Subcategory</option>
                            {subCategories.map((sub) => (
                              <option key={sub._id} value={sub._id || ""}>
                                {sub.feature_SubCategories_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Search Tags */}
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="searchTags"
                          className="block text-xs sm:text-sm font-bold text-gray-700"
                        >
                          Search Tags
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="searchTags"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-xs sm:text-sm border-gray-300 rounded-md p-2 sm:p-2.5"
                            value={searchTags || ""}
                            onChange={(e) => setSearchTags(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeStep === 1 && (
                  <div className="px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-xl font-bold text-gray-700 border-b pb-4 border-gray-200">
                      Pricing Packages
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      {/* Loop for each package */}
                      {[
                        {
                          label: "Basic",
                          state: Basic_price[0],
                          prefix: "b",
                          type: "basic",
                        },
                        {
                          label: "Standard",
                          state: Standard_price[0],
                          prefix: "s",
                          type: "standard",
                        },
                        {
                          label: "Premium",
                          state: Premium_price[0],
                          prefix: "p",
                          type: "premium",
                        },
                      ].map((pkg) => (
                        <div
                          key={pkg.label}
                          className="bg-white rounded-xl shadow-md border border-gray-200 p-5 flex flex-col gap-4"
                        >
                          <h2 className="text-lg font-bold text-center text-[#f78318]">
                            {pkg.label} Package
                          </h2>

                          {/* Name */}
                          <input
                            type="text"
                            className="p-2 border rounded-md text-sm"
                            placeholder="Package Name"
                            value={pkg.state[`${pkg.prefix}_Name`] || ""}
                            onChange={(e) =>
                              handlePriceChange(
                                pkg.type,
                                `${pkg.prefix}_Name`,
                                e.target.value
                              )
                            }
                          />

                          {/* Description */}
                          <textarea
                            className="p-2 border rounded-md text-sm"
                            rows={3}
                            placeholder="Package Description"
                            value={pkg.state[`${pkg.prefix}_description`] || ""}
                            onChange={(e) =>
                              handlePriceChange(
                                pkg.type,
                                `${pkg.prefix}_description`,
                                e.target.value
                              )
                            }
                          />

                          {/* Price */}
                          <input
                            type="number"
                            className="p-2 border rounded-md text-sm"
                            placeholder="Price ($)"
                            value={pkg.state[`${pkg.prefix}_price`] || ""}
                            onChange={(e) =>
                              handlePriceChange(
                                pkg.type,
                                `${pkg.prefix}_price`,
                                e.target.value
                              )
                            }
                          />

                          {/* Revisions */}
                          <input
                            type="number"
                            className="p-2 border rounded-md text-sm"
                            placeholder="Revisions"
                            value={pkg.state[`${pkg.prefix}_revisions`] || ""}
                            onChange={(e) =>
                              handlePriceChange(
                                pkg.type,
                                `${pkg.prefix}_revisions`,
                                e.target.value
                              )
                            }
                          />

                          {/* Number of Concepts */}
                          <input
                            type="number"
                            className="p-2 border rounded-md text-sm"
                            placeholder="No. of Concepts"
                            value={
                              pkg.state[`${pkg.prefix}_number_of_concept`] || ""
                            }
                            onChange={(e) =>
                              handlePriceChange(
                                pkg.type,
                                `${pkg.prefix}_number_of_concept`,
                                e.target.value
                              )
                            }
                          />

                          {/* Toggles */}
                          {[
                            "vector_file",
                            "printable_file",
                            "mockup",
                            "source_file",
                            "social_media_kit",
                          ].map((feature) => (
                            <div
                              key={feature}
                              className="flex justify-between items-center"
                            >
                              <label className="text-sm capitalize">
                                {feature.replace(/_/g, " ")}
                              </label>
                              <select
                                className="text-sm border rounded-md px-2 py-1"
                                value={
                                  pkg.state[`${pkg.prefix}_${feature}`] || ""
                                }
                                onChange={(e) =>
                                  handlePriceChange(
                                    pkg.type,
                                    `${pkg.prefix}_${feature}`,
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </select>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-xl font-bold text-[#f78318] border-b pb-4 border-gray-200">
                      Service Requirement
                    </h1>

                    <div className="mt-6">
                      <h2 className="text-lg font-semibold text-gray-700">
                        Gather Buyer Requirements
                      </h2>
                      <p className="mt-2 text-sm text-gray-600">
                        Explain clearly what details or assets you need from the
                        buyer to begin work on the order.
                      </p>
                    </div>

                    <div className="mt-6">
                      <label
                        htmlFor="requirement"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        Buyer Requirement{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Editor
                        id="requirement"
                        onChange={(e) => setRequirement(e.target.value)}
                        ref={quillRefForRequirement}
                        value={requirement}
                        headerTemplate={customToolbar}
                        name="requirement"
                        onTextChange={handleTextChangeRequirement}
                        style={{ height: "150px" }}
                        className="shadow-sm focus:ring-[#f78318] focus:border-[#f78318] block w-full sm:text-sm border border-gray-300 rounded-md"
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        Example: "Please upload your logo, brand guidelines, and
                        the color scheme you'd like me to follow."
                      </p>
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-xl font-bold text-[#f78318] border-b pb-4 border-gray-200">
                      Service FAQ
                    </h1>

                    <p className="mt-4 text-sm text-gray-600">
                      Provide common questions and answers buyers might have
                      about your service.
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {FAQ.map((faq, index) => (
                        <div
                          key={index}
                          className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-between"
                        >
                          {/* Question */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Question
                            </label>
                            <input
                              type="text"
                              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-[#f78318] focus:border-[#f78318]"
                              placeholder="e.g. What is included in this service?"
                              value={faq.question}
                              onChange={(e) =>
                                handleFaqChange(
                                  index,
                                  "question",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          {/* Answer */}
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Answer
                            </label>
                            <textarea
                              className="w-full p-2 text-sm border border-gray-300 rounded-md h-24 focus:ring-[#f78318] focus:border-[#f78318]"
                              placeholder="Provide a clear and concise answer"
                              value={faq.answer}
                              onChange={(e) =>
                                handleFaqChange(index, "answer", e.target.value)
                              }
                            />
                          </div>

                          {/* Remove button */}
                          <div className="mt-4">
                            <button
                              type="button"
                              className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-md text-sm font-semibold"
                              onClick={() => removeFaq(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add FAQ button */}
                    <div className="mt-8">
                      <button
                        type="button"
                        onClick={addFaq}
                        className="inline-flex items-center px-4 py-2 border border-[#f78318] text-[#f78318] hover:bg-[#f78318] hover:text-white transition rounded-md text-sm font-semibold"
                      >
                        <svg
                          className="mr-2 h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Add New FAQ
                      </button>
                    </div>
                  </div>
                )}

                {activeStep === 4 && (
                  <div className="px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-xl font-bold text-[#f78318] border-b pb-4 border-gray-200">
                      Service Gallery
                    </h1>

                    <p className="mt-4 text-sm text-gray-600">
                      Upload high-quality images to showcase your service. First
                      image will be your cover.
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Array.isArray(images) &&
                        images.map((image, index) => (
                          <div key={index} className="relative group">
                            <label
                              htmlFor={`fileInput-${index}`}
                              className="block w-full aspect-video rounded-md border-2 border-dashed border-gray-300 cursor-pointer bg-white overflow-hidden relative"
                            >
                              <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                id={`fileInput-${index}`}
                                onChange={(e) => handleImageChange(e, index)}
                                accept="image/*"
                              />
                              {image.serviceImage ? (
                                <img
                                  src={
                                    image.serviceImage.startsWith("data:")
                                      ? image.serviceImage
                                      : `https://hireme-gdlb.onrender.com//${image.serviceImage}`
                                  }
                                  alt={`Preview ${index + 1}`}
                                  className="object-cover w-full h-full rounded-md transition duration-300 group-hover:scale-105"
                                />
                              ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                  <svg
                                    className="w-12 h-12"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 005.656 0L28 20m-28 12h.01"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <p className="mt-2 text-sm">Upload Image</p>
                                </div>
                              )}
                            </label>

                            {index !== 0 && (
                              <button
                                type="button"
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow"
                                onClick={() => removeImage(index)}
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        ))}
                    </div>

                    <div className="mt-8">
                      <button
                        type="button"
                        onClick={addImage}
                        className="inline-flex items-center px-4 py-2 border border-[#f78318] text-[#f78318] hover:bg-[#f78318] hover:text-white transition rounded-md text-sm font-semibold"
                      >
                        <svg
                          className="mr-2 h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Add New Image
                      </button>
                    </div>
                  </div>
                )}

                {activeStep === 5 && (
                  <div className="px-4 py-6 sm:px-6 lg:px-8">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 border-gray-200">
                      <h1 className="text-xl font-bold text-[#f78318]">
                        Final Step: Ready to Publish?
                      </h1>
                      <button
                        onClick={() => handleServiceCreate(false)}
                        className="mt-4 sm:mt-0 px-5 py-2 border-2 border-[#f78318] text-[#f78318] hover:bg-[#f78318] hover:text-white font-semibold text-sm rounded-md transition"
                      >
                        Save as Draft
                      </button>
                    </div>

                    {/* Center Icon */}
                    <div className="flex justify-center mt-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-28 h-28 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L2 22h20L12 2zm0 4.84L18.93 20H5.07L12 6.84zM11 10h2v5h-2v-5zm0 6h2v2h-2v-2z" />
                      </svg>
                    </div>

                    {/* Text & Publish CTA */}
                    <div className="text-center mt-6 max-w-2xl mx-auto">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                        Almost Ready to Launch Your Service!
                      </h2>
                      <p className="mt-3 text-sm sm:text-base text-gray-600">
                        Your service is just one step away from going live. Take
                        a final look and ensure everything looks great. When
                        you're ready, hit the button below to publish.
                      </p>

                      <button
                        onClick={handlePublicData}
                        type="submit"
                        className="mt-6 px-6 py-3 bg-[#f78318] hover:bg-[#d96c14] text-white font-semibold rounded-md text-sm transition"
                      >
                        🚀 Publish Your Service
                      </button>
                    </div>
                  </div>
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: { xs: 4, sm: 6 },
                  }}
                >
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="outlined"
                    sx={{
                      color: "#f78318",
                      borderColor: "#f78318",
                      textTransform: "none",
                      px: 3,
                      "&:hover": {
                        borderColor: "#d96c14",
                        backgroundColor: "#fff3e0",
                      },
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => handleServiceCreate(true)}
                    variant="contained"
                    sx={{
                      bgcolor: "#f78318",
                      textTransform: "none",
                      px: 3,
                      "&:hover": {
                        bgcolor: "#d96c14",
                      },
                    }}
                  >
                    {activeStep === steps.length - 1
                      ? "Finish"
                      : "Save & Continue"}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Dialog>

      <Footer />
    </div>
  );
};
export default Gigs;
