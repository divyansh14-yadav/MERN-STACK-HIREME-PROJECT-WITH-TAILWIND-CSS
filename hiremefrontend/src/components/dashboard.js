import React, { useEffect, useState } from 'react'
import Nav from './nav'
import OtherNav from './otherNav'
import Footer from './footer'
import authConfig from '../api/config'
import { Link, useNavigate } from 'react-router-dom'
import Loder from './loader/loder'

const Dashboard = () => {

    const authId = JSON.parse(localStorage.getItem("authId"))

    const [dashboardData, setDashboardData] = useState({})
    console.log(dashboardData,"dashbord");
      const [loading, setLoading] = useState(true);
    

    const navigate = useNavigate()

    useEffect(() => {
        const fetchdashboardData = async () => {
            //  window.scrollTo(0, 0);
            try {
                const response = await authConfig.get(`deshboard-details/${authId}`);
                if (response.status === 200) {
                    setDashboardData(response.data);
          setLoading(false);

                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };
        fetchdashboardData();
    }, [authId]);

  if (loading) {
    return <Loder />;
  }
  return (
    <div className='bg-[#eef2f8]'>
        <Nav />
        <OtherNav />
        <div>
            <div className='w-[80%] m-auto bg-white text-start rounded-md p-4 mt-15'>
                <h1 className='border-b-1 pb-3 mt-2 text-[1.25rem] text-[#495463] font-bold'>
                    Please Allow / Reset Browser Notification
                </h1>
                <h1 className='mt-5 text-[1em]'>
                    If you want to get push notification then you have to allow notification from your browser
                </h1>
            </div>

            <div className='w-[80%] mt-10 m-auto flex flex-col md:flex-row gap-8 pb-20'>
                <div className="w-full md:w-[50%] bg-gradient-to-r rounded-md p-4 from-orange-800 pb-10 via-orange-800 to-orange-800">
                    <p className='mt-5 text-[1.1rem] font-medium text-start text-white'>Balance</p>
                    <p className='mt-2 text-[40px] text-[#fff] text-start font-bold'>
                        ${dashboardData.totalServices ? dashboardData.totalDepositAmount + ".00" : "hello "}
                    </p>
                    <p className='mt-3 text-[1rem] text-[#fff] text-start'>
                        You are able to use your balance to purchase any gig or you can withdraw the balance as well.
                    </p>
                    <div className='flex gap-5 w-[50%] mt-10 justify-start'>
                        <button type='submit' className='bg-[#12d001] p-1.5 text-white font-medium rounded-[5px] w-[120px] text-[13px] cursor-pointer' onClick={() => navigate("/user/deposit")}>Deposit</button>
                        {/* <button type='submit' className='bg-[#fb4646] p-1.5 text-white font-medium rounded-[5px] w-[120px] text-[13px] cursor-pointer ' onClick={() => navigate("/user/Withdraw")}>Withdraws</button> */}
                    </div>
                </div>

                <div className='flex flex-col md:flex-row gap-6 items-center w-full'>
                    <div className='w-full md:w-[50%]'>
                        <div className='w-full p-11 bg-white text-start rounded-md'>
                            <div className='flex justify-between'>
                                <p className='text-[1.1rem] text-[#495463]'>Total Gigs</p>
                                <Link to="/user/gigs" className='border-1 text-center p-[1.5px] w-18 rounded-sm text-sm text-neutral-400'>View All</Link>
                            </div>
                            <p className='text-[1.3rem] font-bold text-[#495463] mt-2'>
                                {dashboardData.totalServices ? dashboardData.totalServices + " Services" : 0}
                            </p>
                        </div>
                        <div className='mt-6 w-full p-11 bg-white text-start rounded-md'>
                            <div className='flex justify-between'>
                                <p className='text-[1.1rem] text-[#495463]'>Deposits</p>
                            </div>
                            <p className='text-[1.3rem] font-bold text-[#495463] mt-2'>
                                ${dashboardData.totalDepositAmount + ".00"}
                            </p>
                        </div>
                    </div>

                    <div className='w-full md:w-[50%]'>
                        <div className='w-full p-11 bg-white text-start rounded-md'>
                            <div className='flex justify-between'>
                                <p className='text-[1.1rem] text-[#495463]'>Total Projects</p>
                                <Link to="/user/projects" className='border-1 text-center p-[1.5px] w-18 rounded-sm text-sm text-neutral-400'>View All</Link>
                            </div>
                            <p className='text-[1.3rem] font-bold text-[#495463] mt-2'>
                                {dashboardData.totalProjects ? dashboardData.totalProjects + " Projects" : 0}
                            </p>
                        </div>
                        <div className='mt-6 w-full p-11 bg-white text-start rounded-md'>
                        <div className='flex justify-between'>
                                <p className='text-[1.1rem] text-[#495463]'>Total Task</p>
                                <Link to="/user/task" className='border-1 text-center p-[1.5px] w-18 rounded-sm text-sm text-neutral-400'>View All</Link>
                            </div>
                            <p className='text-[1.3rem] font-bold text-[#495463] mt-2'>
                                {dashboardData.totalServices ? dashboardData.totalCreatedTask + " task" : 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className='w-[80%] m-auto bg-white h-70 mt-10 rounded-md'>
                <h1 className='text-start text-[#495463] font-bold text-[1rem] p-4 border-b-1  border-[#0000001a]'>
                    Running Project
                </h1>
            </div> */}
        </div>
        <Footer />
    </div>
)
}

export default Dashboard