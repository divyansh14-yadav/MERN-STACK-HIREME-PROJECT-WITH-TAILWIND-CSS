import React, { useEffect, useState } from "react";
import Nav from "../nav";
import OtherNav from "../otherNav";
import Footer from "../footer";
import authConfig from "../../api/config";
import Loder from "../loader/loder";

const PaymentTransaction = () => {
  const [trancations, setTrancations] = useState([]);
  console.log(trancations, "transactions");

  const authId = JSON.parse(localStorage.getItem("authId"));

  useEffect(() => {
    const fetchTrancations = async () => {
      window.scrollTo(0, 0);
      try {
        const response = await authConfig.get(`/transtion-Details/${authId}`);
        if (response.status === 200) {
          setTrancations(response.data.depositAmount);
        } else {
          console.log("Error fetching transactions");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTrancations();
  }, []);

  //   if (loading) {
  //     return <Loder />;
  //   }
  return (
    <div>
      <div className="bg-[#eef2f8] pb-10">
        
        <OtherNav />
        <div className="w-[80%] m-auto bg-white text-start rounded-md p-4 mt-15">
          <div>
            <h1 className="border-b-1 border-b-neutral-200 pb-3 mt-2 text-[1.25rem] text-[#495463] font-bold">
              Transactions{" "}
            </h1>
          </div>
          <div class="relative mt-5 flex flex-col w-full  overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
            <table class="w-full text-left table-auto min-w-max">
              <thead>
                <tr>
                  <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Task
                    </p>
                  </th>
                  <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Client
                    </p>
                  </th>
                  {/* <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Freelancer
                    </p>
                  </th> */}
                  <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Amount
                    </p>
                  </th>
                  <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Status
                    </p>
                  </th>
                </tr>
              </thead>

              <tbody>
                {trancations.length ? (
                  trancations.map((trancation, index) => (
                    <tr key={index}>
                      <td className="p-4 border-b border-blue-gray-50">
                        {trancation.taskId.taskTitle}
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {trancation.loginAuthId.firstName +
                            " " +
                            trancation.loginAuthId.lastName}
                        </p>
                      </td>
                      {/* <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {trancation.mileCreatorId.firstName +
                            " " +
                            trancation.mileCreatorId.lastName}
                        </p>
                      </td> */}
                      <td className="p-4 border-b border-blue-gray-50">
                        <a
                          href="#"
                          className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                        >
                          {trancation.depositAmountUSD}
                        </a>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        {trancation.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-10 text-center">
                      <Loder />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentTransaction;
