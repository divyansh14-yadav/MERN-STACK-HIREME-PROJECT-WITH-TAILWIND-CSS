import React, { useState, useEffect } from "react";
import Nav from "../components/nav";
import Slider from "../components/slider";
import Information from "../components/information";
import FeaturedCategory from "../components/featuredCategory";
import Category from "../components/category";
import Blog from "./blog";
import authConfig from "../api/config";
import PopularServices from "../components/popularServices";
import Footer from "../components/footer";
import FeatureGigs from "../components/featureGigs";
import ClientsReview from "../components/clientsReview";
import FeaturedTask from "../task/featuredTask";
import Loder from "../components/loader/loder";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [blog, setBlogs] = useState([]);
  const [featureGigs, setFeatureGigs] = useState([]);
  const [clientReviews, setClientReview] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authConfig.get("fetch-home-details");
        if (response.status === 200) {
          setFeatured(response.data.feature_categories);
          setBlogs(response.data.latestBlogs);
          setFeatureGigs(response.data.popular_rating_services);
          setClientReview(response.data.clientReviews);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchFeaturedCategories = async () => {
      try {
        const response = await authConfig.get("all-featured-categories");
        if (response.status === 200) {
          setFeatured(response.data.featuredCategories);
        }
      } catch (error) {
        console.error("Error fetching featured categories:", error);
      }
    };

    fetchFeaturedCategories();
  }, []);

  return (
    <div>
      <Nav />
      {loading ? (
        <Loder />
      ) : (
        <>
          <Category />
          <Slider featured={featured} />
          <Information />
          <FeaturedCategory featured={featured} />
          <PopularServices />
           <FeatureGigs featureGig={featureGigs} />
           <FeaturedTask />
             <Blog blog={blog} />
            <ClientsReview clientReviews={clientReviews} />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Home;
