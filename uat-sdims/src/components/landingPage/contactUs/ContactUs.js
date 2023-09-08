import React from "react";
import { FaMailBulk, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
const ContactUs = () => {
  return (
    <div className=" py-10 bg-slate-300 flex justify-center items-center ">
      <div className="container p-12 bg-gray-100 rounded-xl">
        <h1 className="text-4xl uppercase font-bold from-current mb-8 text-center italic ">
        सम्पर्क
        </h1>

        {/* <!-- Box-1 --> */}
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
          <div className="bg-white">
            <div>
              <div className="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                <div className="text-center flex justify-center py-5 text-blue-100 ">
                  <FaMapMarkerAlt size={40} />
                </div>
                <div className="text-2xl text-center pb-10 font-bold text-blue-100">
                फिदिम नगरपालिका
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Box-2 --> */}
          <div className="bg-white">
            <div>
              <div className="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                <div className="text-center flex justify-center py-5 text-blue-100 ">
                  <FaMailBulk size={40} />
                </div>
                <div className="lg:text-2xl text-xl lg:text-center pb-10 font-bold text-blue-100">
                phidim.municipality@gmail.com
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Box-3 --> */}
          <div className="bg-white">
            <div>
              <div className="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                <div className="text-center flex justify-center py-5 text-blue-100 ">
                  <FaPhoneAlt size={40} />
                </div>
                <div className="text-2xl text-center pb-10 font-bold text-blue-100">
                  <span>
                    <a href="tel: 024-522107"> 024-522107 </a>{" "}
                  </span>{" "}
                  <span>
                    {" "}
                    <a href="tel:+977- 9841197506 "> +977- 9841197506 </a>{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
