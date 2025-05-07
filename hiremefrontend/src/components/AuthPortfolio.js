import React, { useEffect, useState } from "react";
import Nav from "./nav";
import CategorySlider from "./category";
import Footer from "./footer";
import { Link, useParams } from "react-router-dom";
import authConfig from "../api/config";
import Loder from "./loader/loder";

const AuthPortfolio = () => {
  const [userPortfolio, setUserPortfolio] = useState([]);
  console.log(userPortfolio, "pppportfoilio");

  const [loading, setLoading] = useState(true);

  const { authId } = useParams();
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

  return (
    <div>
      <CategorySlider />
      {loading ? (
        <Loder />
      ) : (
        <div className="xl:mt-25 mt-18">
     <div className="bg-[#f7831804] p-6 rounded-2xl shadow-md xl:w-[90%] w-full m-auto">
  <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
    
    {/* Back to Profile */}
    <div className="text-[#f78418] text-lg font-medium hover:underline transition duration-300">
      <Link to={`/userServices/${authId}`}>
        <p>← Back to Profile</p>
      </Link>
    </div>

    {/* User Info */}
    <div className="flex items-center gap-4">
      <img
        className="w-12 h-12 rounded-full object-cover border-2 border-[#f78418]"
        src={
          userPortfolio?.authDetails?.authId?.authProfile
            ? userPortfolio.authDetails?.authId?.authProfile
            : "/default-avatar.png" // fallback avatar
        }
        alt="User Avatar"
      />
      <Link to={`/userServices/${authId}`}>
        <div className="flex gap-2 items-center hover:underline transition duration-300 text-base font-semibold text-gray-800">
          <p>{userPortfolio?.authDetails?.authId?.firstName || "First"}</p>
          <p>{userPortfolio?.authDetails?.authId?.lastName || "Last"}</p>
        </div>
      </Link>
    </div>
    
  </div>
</div>

          <div className="xl:grid xl:grid-cols-3 sm:grid sm:grid-cols-2 grid grid-cols-1 gap-10 w-[90%] m-auto mt-10">
            {userPortfolio?.portfolio?.map((allPortfolio, index) => (
              <Link to={`/detailedPortfolio/${allPortfolio._id}/${authId}`}>
                <div className="border-1 border-[#0000001a] pb-4 rounded-md">
                  <p className="text-start font-bold mt-4 ml-4">
                    {allPortfolio.folioTitle}
                  </p>
                  <img
                    className="w-[90%] mt-6 m-auto rounded-xl"
                    src={
                      typeof allPortfolio.portfolioImage === "object"
                        ? allPortfolio.portfolioImage.url
                        : allPortfolio.portfolioImage
                    }
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AuthPortfolio;
