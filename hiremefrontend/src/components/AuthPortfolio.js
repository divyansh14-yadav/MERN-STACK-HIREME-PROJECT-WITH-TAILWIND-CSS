import React, { useEffect, useState } from 'react'
import Nav from './nav'
import CategorySlider from './category'
import Footer from './footer'
import { Link, useParams } from 'react-router-dom'
import authConfig from '../api/config'
import Loder from './loader/loder'

const AuthPortfolio = () => {

    const [userPortfolio, setUserPortfolio] = useState([])
    console.log(userPortfolio, "pppportfoilio");

  const [loading, setLoading] = useState(true);

    const { authId } = useParams()
    console.log(authId, "portfolioAuthId");

    useEffect(() => {
        const fetchUserPortfolio = async () => {
             window.scrollTo(0, 0);
            try {
                const response = await authConfig.get(`foundPortfolio/${authId}`);
                if (response.status === 200) {
                    setUserPortfolio(response.data);
          setLoading(false);

                }
            } catch (error) {
                console.error("Error fetching userPortfolio:", error);
            }
        };
        fetchUserPortfolio();
    }, [authId]);

      if (loading) {
    return <Loder />;
  }

    return (
        <div>
            <Nav />
            <CategorySlider />
            <div className='xl:mt-25 mt-10'>
                <div className='xl:flex block gap-10 justify-around text-start items-center bg-[#f7831804] p-6'>
                    <div className='text-[#f78418]'>
                        <Link to={`/userServices/${authId}`}>
                            <p>Back to profile</p>
                        </Link>

                    </div>
                    <div>
                        <div className='flex gap-5 item xl:mt-0 mt-8'>
                            <img className='w-[8%] rounded-full' src={`https://hireme-gdlb.onrender.com//${userPortfolio?.authDetails?.authId?.authProfile ? userPortfolio.authDetails?.authId?.authProfile : null}`} />
                            <Link  to={`/userServices/${authId}`}>
                                <div className='flex gap-1 underline font-semibold'>
                                    <p>{userPortfolio?.authDetails?.authId?.firstName}</p>
                                    <p>{userPortfolio?.authDetails?.authId?.lastName + " " + "profile"}</p>
                                </div>
                            </Link>

                        </div>

                    </div>
                </div>
                <div className='xl:grid xl:grid-cols-3 sm:grid sm:grid-cols-2 grid grid-cols-1 gap-10 w-[90%] m-auto mt-10'>
                    {
                        userPortfolio?.portfolio?.map((allPortfolio, index) => (
                            <Link to={`/detailedPortfolio/${allPortfolio._id}/${authId}`}>
                                <div className='border-1 border-[#0000001a] pb-4 rounded-md'>
                                    <p className='text-start font-bold mt-4 ml-4'>{allPortfolio.folioTitle}</p>
                                    <img className='w-[90%] mt-6 m-auto rounded-xl' src={`https://hireme-gdlb.onrender.com//${allPortfolio.portfolioImage}`} />
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AuthPortfolio