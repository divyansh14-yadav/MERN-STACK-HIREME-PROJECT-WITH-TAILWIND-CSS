import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import authConfig from '../api/config';
import Nav from './nav';
import CategorySlider from './category';
import Footer from './footer';

const AuthportfolioDetailed = () => {

    const [userportfolioDetails, setUserPortfolioDetails] = useState({})
    console.log(userportfolioDetails, "22222userportfolioDetails");

    const [selectedFolio, setSelectedFolio] = useState(null)
    console.log(selectedFolio, "selefolofio");

    const { portfolioId } = useParams()
    const { authId } = useParams()
    console.log(authId, "portfolioAuthId");
    console.log(portfolioId, "detail folio");

    useEffect(() => {
        const fetchUserPortfolioDetails = async () => {
            window.scrollTo(0, 0);
            try {
                const response = await authConfig.get(`singleFolio/${portfolioId}/${authId}`);
                if (response.status === 200) {
                    setUserPortfolioDetails(response.data);
                }
            } catch (error) {
                console.error("Error fetching userPortfolioDetails:", error);
            }
        };
        fetchUserPortfolioDetails();
    }, [portfolioId]);



    return (
        <div>
            <Nav />
            <CategorySlider />
            <div className='xl:mt-18 mt-10'>
                <div className='flex gap-5 ml-20 mt-30 items-center'>
                    <img className='xl:w-[4%] w-[15%] xl:h-13 h-10 rounded-full' src={`https://hireme-gdlb.onrender.com//${userportfolioDetails?.single_portfolio?.authId?.authProfile}`} />
                    <div className='flex gap-1 font-semibold'>
                        <Link to={`/userServices/${authId}`}>
                            <div className='flex'>
                                <p className='underline'>{userportfolioDetails?.single_portfolio?.authId?.firstName}</p>
                                <p className='underline ml-1'>{userportfolioDetails?.single_portfolio?.authId?.lastName + " " + ""}</p>
                            </div>
                        </Link>
                        <p>Portfolio</p>
                    </div>
                </div>
                <div className='xl:w-[85%] w-full mt-10 m-auto xl:flex block justify-between gap-10'>
                    <div className='xl:w-[65%] w-full pb-10 border-1 border-[#0000001a] rounded-xl'>
                        <div className='border-13 border-white rounded-xl'>
                            <img className='rounded-md' src={`https://hireme-gdlb.onrender.com//${selectedFolio ? selectedFolio?.portfolioImage : userportfolioDetails?.single_portfolio?.portfolioImage}`} />
                            <h1 className='mt-4 text-[1.2rem] text-start font-bold p-3'>{selectedFolio ? selectedFolio?.folioTitle : userportfolioDetails?.single_portfolio?.folioTitle}</h1>
                            <p className='text-start text-[0.875rem] text-justify ml-3 text-[#626468]'>{selectedFolio ? selectedFolio?.description : userportfolioDetails?.single_portfolio?.description}</p>
                        </div>
                    </div>
                    <div className='xl:w-[35%] w-full xl:mt-0 mt-10 border-1 border-[#0000001a] rounded-xl'>
                        <h1 className='text-start font-bold p-5 text-[1.2rem]'>More Portfolios</h1>
                        {
                            userportfolioDetails?.realtedPortFolio
                                ?.filter(allPortfolio => allPortfolio._id !== (selectedFolio ? selectedFolio._id : null))
                                .map((allPortfolio, index) => (
                                    <div className='p-2 border-b-1 border-[#0000001a] pb-7 w-[80%] m-auto '>
                                        <div className='flex items-center gap-7 mt-4'>
                                            <img className='w-[27%] rounded-md' src={`https://hireme-gdlb.onrender.com//${allPortfolio.portfolioImage}`} />
                                            <p onClick={() => setSelectedFolio(allPortfolio)} className='text-start font-semibold text-[#3d3d3d] hover:text-[#f78318] cursor-pointer'>{allPortfolio.folioTitle}</p>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AuthportfolioDetailed