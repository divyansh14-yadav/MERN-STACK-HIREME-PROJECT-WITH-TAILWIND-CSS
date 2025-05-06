import React, { useState } from 'react';
import Nav from '../components/nav';
import CategorySlider from '../components/category';
import BrandSlider from '../common/brandSlider';
import Footer from '../components/footer';
import authConfig from '../api/config';
import { toast } from 'react-toastify';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons

const Contact = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await authConfig.post('contactUs', {
        firstName,
        email,
        subject,
        message,
      });
      if (response.status === 200) {
        toast.success('Message sent Successfully');
        setFirstName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }
      console.log(response, 'constactUsResponse');
    } catch (error) {
      if (error.response?.data?.message === 'Failed to send mail') {
        toast.error('Failed to send mail');
      } else {
        toast.error('Error sending message');
      }
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      
      <CategorySlider />
      <div className="py-16 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="lg:flex block justify-between gap-8">
            <div className="lg:w-1/2 w-full p-4">
              <h1 className="text-start text-gray-800 font-bold text-2xl lg:text-3xl mb-6">
                Connect with Us
              </h1>
              <p className="w-full lg:w-4/5 mt-4 text-start text-gray-600 leading-relaxed">
                Reach out anytime. We're here to assist you with any questions or concerns.
              </p>
              <form onSubmit={handleSubmit} className="mt-8">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border rounded-md flex justify-start p-3 w-full text-gray-700 font-normal border-gray-300 focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded-md flex justify-start p-3 w-full text-gray-700 font-normal border-gray-300 focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="border rounded-md flex justify-start p-3 w-full text-gray-700 font-normal border-gray-300 focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <textarea
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border rounded-md flex justify-start p-4 w-full text-gray-700 font-normal border-gray-300 focus:outline-none focus:border-orange-500 h-32"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="font-semibold bg-orange-500 cursor-pointer w-full text-white p-3 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div className="lg:w-1/2 w-full p-4 mt-8 lg:mt-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.5824445804983!2d75.89394667429265!3d22.7437563266775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd319c598969%3A0xa4e99d10e653ecb8!2sShanti%20Infosoft%20LLP%20-%20Website%20Design%20And%20Development%20Company!5e0!3m2!1sen!2sin!4v1740677254288!5m2!1sen!2sin"
                className="w-full h-130 rounded-md shadow-md"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="lg:w-4/5 w-full mx-auto mt-16 py-8 border-t border-gray-200">
            <div className="lg:flex block justify-around items-center gap-8">
              <div className="text-center lg:text-start mb-6 lg:mb-0">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-orange-500 text-xl mb-2">
                  <FaPhone />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">Phone</h2>
                  <p className="text-gray-600 hover:text-orange-500 transition-colors">+14844145504</p>
                </div>
              </div>
              <div className="text-center lg:text-start mb-6 lg:mb-0">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-orange-500 text-xl mb-2">
                  <FaEnvelope />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">Email</h2>
                  <p className="text-gray-600 hover:text-orange-500 transition-colors">
                    contact@metalance.com
                  </p>
                </div>
              </div>
              <div className="text-center lg:text-start">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-orange-500 text-xl mb-2">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">Address</h2>
                  <p className="text-gray-600 hover:text-orange-500 transition-colors">13 Vine St, Lowa, USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BrandSlider />
      <Footer />
    </div>
  );
};

export default Contact;