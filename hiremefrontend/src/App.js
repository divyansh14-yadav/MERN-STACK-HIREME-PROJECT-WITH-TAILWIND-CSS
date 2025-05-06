import logo from './logo.svg';
import './App.css';
import '../src/output.css'
import { Route, Routes } from "react-router-dom";
import Home from './pages/home';
import Blog from './pages/blog';
import Contact from './pages/contact';
import SignUp from './pages/auth/signUp';
import SignIn from './pages/auth/signIn';
import SignUpProfile from './pages/auth/signUpProfile';
import Nav from './components/nav';
import AllBlogs from './pages/allBlogs';
import DetailBlog from './components/blogs/detailBlog';
import ForgetResetPassword from './pages/auth/forgetResetPassword';
import VerifyOtp from './pages/auth/verifyOtp';
import ResetPassword from './pages/auth/passwordReset';
import FeaturedService from './components/featuredService';
import DetaildService from './components/detaildService';
import UserServicesDetails from './components/userServicesDetails';
import AuthPortfolio from './components/AuthPortfolio';
import AuthportfolioDetailed from './components/authportfolioDetailed';
import BasicInfo from './components/profileSetting/basicInfo';
import ClientsReview from './components/clientsReview';
import Dashboard from './components/dashboard';
import Gigs from './components/gigs';
import AuthProjects from './components/authProjects';
import AuthProjectDetails from './components/authProjectDetails';
import CategorySlider from './components/category';
import SliderComponent from './components/slider';
import FeaturedTaskDetailed from './task/featuredTaskDetailed';
import FeaturedTaskSubDetails from './task/featuredTaskSubDetails';
import { toast, ToastContainer } from 'react-toastify';
import CreateTask from './task/createTask';
import PaymentSucess from './components/paymentSucess';
import PaymentTransaction from './components/payments/paymentTransaction';
import PaymentDeposit from './components/payments/paymentDeposit';
import PaymentWithdraws from './components/payments/paymentWithdraws';
import { useEffect, useState } from 'react';
import Chat from './components/user chat/chat';
import ChatDashboard from './components/user chat/chatDashboard';
import { io } from "socket.io-client";
import { messaging, getToken, onMessage } from "./firebase";
import axios from "axios";
import authConfig from './api/config';

const socket = io("http://192.168.1.2:8000/api/v1");
function App() {
  const [profileImage, setProfileImage] = useState("");
  console.log(profileImage,"cloudimageprofile");
  
  // for socket io
  useEffect(() => {
    const authId = JSON.parse(localStorage.getItem("authId"));
    if (authId) {
      socket.emit("join", authId); // ✅ Auto join on app load
    }
  }, []);

  return (
    <div className="App">
      {/* <Nav/> */}

      <Routes>

        <Route element={<Nav profileImage={profileImage}/>}> 
        <Route path='/' element={<Home />}></Route>
        {/* <Route path='/blog' element={<Blog/>}></Route> */}
        <Route path='/blog' element={<AllBlogs />}></Route>
        <Route path='/blog/:blogId' element={<DetailBlog />} />
        <Route path='/contact' element={<Contact />}></Route>
        {/* <Route path='/signUp' element={<SignUp />}></Route>
        <Route path='/signIn' element={<SignIn />}></Route> */}
        <Route path='/s' element={<SignUpProfile />}></Route>
        <Route path='/forgetPassword/' element={<ForgetResetPassword />}></Route>
        <Route path='/verifyOtp' element={<VerifyOtp />}></Route>
        <Route path='/resetPassword' element={<ResetPassword />}></Route>
        <Route path='/featuredService/:categoryId/:featureCategoriesName' element={<FeaturedService />}></Route>
        <Route path='/featuredService/sub/:subcategoryId/:featureCategoriesName' element={<FeaturedService />} />
        <Route path='/detailedService/:serviceId' element={<DetaildService />}></Route>
        <Route path='/userServices/:authId' element={<UserServicesDetails />}></Route>
        <Route path='/authPortfolio/:authId' element={<AuthPortfolio />}></Route>
        <Route path='/detailedPortfolio/:portfolioId/:authId' element={<AuthportfolioDetailed />}></Route>
        <Route path='/basicInfo' element={<BasicInfo setProfileImage={setProfileImage} />}></Route>
        <Route path='/user/dashboard' element={<Dashboard />}></Route>
        <Route path='/user/gigs' element={<Gigs />}></Route>
        <Route path='/user/projects' element={<AuthProjects />}></Route>
        <Route path='/user/projects/projectDetails/:projectId/:serviceAuthId' element={<AuthProjectDetails />}></Route>
        <Route path='/featuredTaskDetailed/:taskId' element={<FeaturedTaskDetailed />}></Route>
        <Route path='/taskSubDetailed/:featureTaskId' element={<FeaturedTaskSubDetails />}></Route>
        <Route path='/user/task' element={<CreateTask />}></Route>
        <Route path='http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}' element={<PaymentSucess />}></Route>
        <Route path='/user/deposit' element={<PaymentDeposit />}></Route>
        <Route path='/user/Withdraw' element={<PaymentWithdraws />}></Route>
        <Route path='/user/transaction' element={<PaymentTransaction />}></Route>
        <Route path='/user/Messages' element={<ChatDashboard />}></Route>
        {/* <Route path="/chat/:userId/:receiverId" element={<Chat />} /> */}
        </Route>
        <Route path='/signUp' element={<SignUp />}></Route>
        <Route path='/signIn' element={<SignIn />}></Route>
      </Routes>
      <ToastContainer></ToastContainer>

    </div>
  );
}

export default App;







