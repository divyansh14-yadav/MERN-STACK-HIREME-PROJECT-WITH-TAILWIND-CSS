import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import authConfig from "../api/config";
import Nav from "./nav";
import CategorySlider from "./category";
import Footer from "./footer";
import Loder from "../components/loader/loder"

const AuthportfolioDetailed = () => {
  const [userportfolioDetails, setUserPortfolioDetails] = useState({});
  console.log(userportfolioDetails, "22222userportfolioDetails");

  const [selectedFolio, setSelectedFolio] = useState(null);
  console.log(selectedFolio, "selefolofio");

  const [loading, setLoading] = useState(true);

  const { portfolioId } = useParams();
  const { authId } = useParams();
  console.log(authId, "portfolioAuthId");
  console.log(portfolioId, "detail folio");

  useEffect(() => {
    const fetchUserPortfolioDetails = async () => {
      window.scrollTo(0, 0);
      try {
        const response = await authConfig.get(
          `singleFolio/${portfolioId}/${authId}`
        );
        if (response.status === 200) {
          setUserPortfolioDetails(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching userPortfolioDetails:", error);
      }
    };
    fetchUserPortfolioDetails();
  }, [portfolioId]);

  return (
    <div>
      <CategorySlider />

      {/* User Info Section */}
   {
    loading ? <Loder/>:   <div className="mt-10 xl:mt-25 px-4 xl:px-20">
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-4 items-center">
      <img
        className="w-14 h-14 xl:w-12 xl:h-12 rounded-full object-cover border-2 border-[#f78318]"
        src={userportfolioDetails?.single_portfolio?.authId?.authProfile}
        alt="User Profile"
      />
      <div className="flex flex-wrap items-center gap-2 font-semibold text-lg text-[#333]">
        <Link to={`/userServices/${authId}`}>
          <div className="flex items-center gap-1 underline hover:text-[#f78318] transition">
            <p>
              {userportfolioDetails?.single_portfolio?.authId?.firstName}
            </p>
            <p>
              {userportfolioDetails?.single_portfolio?.authId?.lastName}
            </p>
          </div>
        </Link>
        <p className="text-[#888]">| Portfolio</p>
      </div>
    </div>

    {/* Portfolio Content Section */}
    <div className="mt-10 flex flex-col xl:flex-row gap-10">
      {/* Selected Portfolio */}
      <div className="xl:w-[65%] w-full border border-[#e5e5e5] rounded-xl shadow-sm p-4">
        <img
          className="rounded-md w-full max-h-[400px] object-cover"
          src={
            selectedFolio
              ? typeof selectedFolio.portfolioImage === "object"
                ? selectedFolio.portfolioImage.url
                : selectedFolio.portfolioImage
              : typeof userportfolioDetails?.single_portfolio
                  ?.portfolioImage === "object"
              ? userportfolioDetails.single_portfolio.portfolioImage.url
              : userportfolioDetails?.single_portfolio?.portfolioImage
          }
          alt="Portfolio"
        />
        <h1 className="mt-5 text-xl font-bold text-start px-2">
          {selectedFolio
            ? selectedFolio?.folioTitle
            : userportfolioDetails?.single_portfolio?.folioTitle}
        </h1>
        <p className="mt-3 text-justify text-sm text-[#626468] px-2">
          {selectedFolio
            ? selectedFolio?.description
            : userportfolioDetails?.single_portfolio?.description}
        </p>
      </div>

      {/* More Portfolios */}
      <div className="xl:w-[35%] w-full border border-[#e5e5e5] rounded-xl shadow-sm p-4">
        <h1 className="text-lg font-bold mb-4">More Portfolios</h1>
        {userportfolioDetails?.realtedPortFolio
          ?.filter(
            (allPortfolio) =>
              allPortfolio._id !==
              (selectedFolio ? selectedFolio._id : null)
          )
          .map((allPortfolio, index) => (
            <div
              key={index}
              className="p-2 border-b border-[#f0f0f0] last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <img
                  className="w-20 h-16 object-cover rounded-md"
                  src={
                    typeof allPortfolio.portfolioImage === "object"
                      ? allPortfolio.portfolioImage.url
                      : allPortfolio.portfolioImage
                  }
                  alt="Portfolio"
                />
                <p
                  onClick={() => setSelectedFolio(allPortfolio)}
                  className="text-start font-semibold text-[#3d3d3d] hover:text-[#f78318] cursor-pointer transition"
                >
                  {allPortfolio.folioTitle}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
   }

      <Footer />
    </div>
  );
};

export default AuthportfolioDetailed;
