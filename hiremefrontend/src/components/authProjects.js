import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from './nav';
import OtherNav from './otherNav';
import Footer from './footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import authConfig from '../api/config';
import Loder from "../components/loader/loder";
import { FaClock, FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaArchive } from 'react-icons/fa'; // Import Font Awesome icons

const AuthProjects = () => {
    const headingsForProjects = ["Pending", "Accepted", "Rejected", "Reported", "Completed"];
    const [activeStep, setActiveStep] = useState(0);
    const [sentProjects, setSentProjects] = useState([]);
    const [receivedProjects, setReceivedProjects] = useState([]);
    const authId = JSON.parse(localStorage.getItem("authId"));
    const [updatedData, setUpdatedData] = useState(false);
    const [loading, setLoading] = useState(true);

    const headingIcons = {
        Pending: <FaClock className="w-5 h-5 inline-block mr-1" />,
        Accepted: <FaCheckCircle className="w-5 h-5 inline-block mr-1" />,
        Rejected: <FaTimesCircle className="w-5 h-5 inline-block mr-1" />,
        Reported: <FaExclamationTriangle className="w-5 h-5 inline-block mr-1" />,
        Completed: <FaArchive className="w-5 h-5 inline-block mr-1" />,
    };

    useEffect(() => {
        const fetchAuthProjects = async () => {
            try {
                const response = await authConfig.get(`all-found-projects/${authId}`);
                if (response.status === 200) {
                    setSentProjects(response.data.allProjects);
                    setUpdatedData(true);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching authProjects:", error);
            }
        };
        fetchAuthProjects();
    }, [authId, updatedData]);

    useEffect(() => {
        const fetchReceivedQuotes = async () => {
            try {
                const response = await authConfig.get(`received/${authId}`);
                if (response.status === 200) {
                    setReceivedProjects(response.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching received quotes:", error);
            }
        };
        fetchReceivedQuotes();
    }, [authId]);

    const combinedProjects = [...sentProjects, ...receivedProjects];
    const filteredProjects = combinedProjects.filter(project => project.status.toLowerCase() === headingsForProjects[activeStep].toLowerCase());

    if (loading) {
        return <Loder />;
    }

    const getStatusDetails = (status) => {
        const lowerCaseStatus = status?.toLowerCase();
        switch (lowerCaseStatus) {
            case 'pending':
                return { text: 'Pending', color: 'text-amber-500', bg: 'bg-amber-100', icon: <FaClock className="w-5 h-5 inline-block mr-1" /> };
            case 'accepted':
                return { text: 'Accepted', color: 'text-green-500', bg: 'bg-green-100', icon: <FaCheckCircle className="w-5 h-5 inline-block mr-1" /> };
            case 'rejected':
                return { text: 'Rejected', color: 'text-red-500', bg: 'bg-red-100', icon: <FaTimesCircle className="w-5 h-5 inline-block mr-1" /> };
            case 'reported':
                return { text: 'Reported', color: 'text-indigo-500', bg: 'bg-indigo-100', icon: <FaExclamationTriangle className="w-5 h-5 inline-block mr-1" /> };
            case 'completed':
                return { text: 'Completed', color: 'text-gray-500', bg: 'bg-gray-100', icon: <FaArchive className="w-5 h-5 inline-block mr-1" /> };
            default:
                return { text: 'Unknown', color: 'text-gray-700', bg: 'bg-gray-200', icon: null };
        }
    };

    return (
        <div className='bg-[#f9fafb] py-8'>
            <Nav />
            <OtherNav />
            <div className="w-[95%] mt-6 m-auto rounded-md shadow-md overflow-hidden">
                <div className="flex gap-4 md:gap-6 items-center border-b p-3 md:p-4 pb-3 md:pb-5 font-medium text-[#4b5563] overflow-x-auto bg-white">
                    {headingsForProjects.map((heading, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveStep(index)}
                            className={`whitespace-nowrap text-sm md:text-base cursor-pointer transition-colors duration-200 pb-1.5 flex items-center ${
                                activeStep === index ? "text-[#F78318] border-b-2 border-[#F78318]" : "text-[#4b5563] hover:text-[#F78318]"
                            }`}
                        >
                            {headingIcons[heading]}
                            {heading}
                        </button>
                    ))}
                </div>
                <div className="overflow-x-auto bg-white">
                    <table className="min-w-full text-left text-sm md:text-base font-light">
                        <thead className="border-b bg-[#edf2f7] text-[0.75rem] md:text-[0.875rem] text-[#374151]">
                            <tr>
                                <th className="px-4 py-3 md:px-6 md:py-4 font-semibold">Service Title</th>
                                <th className="px-4 py-3 md:px-6 md:py-4 font-semibold">Buyer / Seller</th>
                                <th className="px-4 py-3 md:px-6 md:py-4 font-semibold">Deadline</th>
                                <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-center">Status</th>
                                <th className="px-4 py-3 md:px-6 md:py-4 text-center font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredProjects.length ? (
                                filteredProjects.map((project, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-[#1e293b]">
                                            <Link to={`/detailedService/${project?.serviceId?._id}`} className="hover:underline text-[#F78318]">
                                                {project?.serviceId?.title?.substring(0, 80) || "No Title"}...
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 md:px-6 md:py-4 text-[#4b5563]">
                                            <Link to={`/userServices/${project?.serviceId?.authId?._id}`} className="hover:underline text-[#F78318]">
                                                {project?.serviceId?.authId?.firstName || "Unknown"}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#374151]">{project.dead_line || "N/A"}</td>
                                        <td className="px-4 py-3 md:px-6 md:py-4 text-center">
                                            {getStatusDetails(project.status).icon}
                                            <span className={`inline-block ${getStatusDetails(project.status).bg} ${getStatusDetails(project.status).color} py-1 px-2 rounded-full text-xs md:text-sm font-semibold`}>
                                                {getStatusDetails(project.status).text}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 md:px-6 md:py-4 text-center">
                                            <div className="rounded-md hover:bg-gray-100 transition-colors duration-200 inline-block">
                                                <Link to={`/user/projects/projectDetails/${project?._id}/${project.serviceAuthId}`} className="p-2 text-neutral-500 hover:text-[#F78318]">
                                                    <FontAwesomeIcon icon={faGreaterThan} className='ml-1 md:ml-2 cursor-pointer text-sm md:text-base' />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className='text-center py-8 md:py-10'>
                                        <img className="w-[15%] md:w-[9%] m-auto opacity-50" src='https://script.viserlab.com/metalance/assets/templates/basic/images/empty_list.png' alt="No Projects" />
                                        <h1 className='mt-3 text-[#6b7280] text-sm md:text-base'>No order found</h1>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AuthProjects;