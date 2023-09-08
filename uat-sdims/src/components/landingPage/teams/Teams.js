import Image from "next/image";
import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa"; 
import pramukh from "../../../../public/assets/pramukh.jpeg";
import upaPramukh from "../../../../public/assets/upaPramukh.jpeg";
import adhikrit from "../../../../public/assets/adhikrit.jpeg";

const Teams = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="min-h-screen bg-slate-300 flex justify-center items-center py-20">
      <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
        <h1 className="text-4xl uppercase font-bold from-current mb-8 text-center italic ">
        कार्यरत् कर्मचारीहरु{" "}
        </h1>
        {showMore?<div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
          <div className="bg-white">
            <div>
              <div className="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                <div>
                  <Image
                    // className="w-full"
                   
                    width={"385"}
                    height={"100"}
                    priority
                    src={pramukh}
                    alt="Papież gigant"
                  />
                  <div className="px-4 py-2">
                    <h1 className="text-xl text-red-500 font-bold">
                    मित्र प्रसाद काफ्ले
                    </h1>
                    <div className="flex space-x-2 mt-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-yellow-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </span>
                      <h3 className="text-lg text-gray-600 font-semibold mb-2">
                      नगर प्रमुख <span  > <a href=" tel:+977 9852623111" >(+977 9852623107)</a> </span>
                      </h3>
                    </div>
                    {/* <p className="text-sm tracking-normal">
                      Częstochowski pomnik Jana Pawła II wyjątkowo interesująco
                      wpisuje się w poprzemysłowy krajobraz tego miasta o
                      mocnych lewicowych, robotniczych i socjalistycznych
                      tradycjach. Powstały w 2013 roku, uchodzi za najwyższego
                      Karola Wojtyłę w Polsce.
                    </p>
                    <button className="mt-12 w-full text-center bg-yellow-400 py-2 rounded-lg">
                      Read more
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Box-2 --> */}
          <div className="bg-white">
            <div>
              <div className="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                <div>
                  <Image
                    // className="w-full"
                    src={upaPramukh}
                    width={385}
                    height={100}
                    priority
                    alt="Papież gigant"
                  />
                  <div className="px-4 py-2">
                    <h1 className="text-xl text-red-500 font-bold ">
                    राधा कृष्ण न्यौपाने
                    </h1>
                    <div className="flex space-x-2 mt-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-yellow-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </span>
                      <h3 className="text-lg text-gray-600 font-semibold mb-2">
                      उप– प्रमुख <span  > <a href=" tel:+977 9852623108" >(+977 9852623108)</a> </span>
                      </h3>
                    </div>
                    {/* <p className="text-sm tracking-normal">
                      Częstochowski pomnik Jana Pawła II wyjątkowo interesująco
                      wpisuje się w poprzemysłowy krajobraz tego miasta o
                      mocnych lewicowych, robotniczych i socjalistycznych
                      tradycjach. Powstały w 2013 roku, uchodzi za najwyższego
                      Karola Wojtyłę w Polsce.
                    </p>
                    <button className="mt-12 w-full text-center bg-yellow-400 py-2 rounded-lg">
                      Read more
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Box-3 --> */}
          <div className="bg-white">
            <div>
              <div className="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                <div>
                  <Image
                    // className="w-full"
                    src={adhikrit}
                    width={255}
                    height={100}
                    priority
                    alt="Papież gigant"   

                  />
                  <div className="px-4 py-2">
                    <h1 className="text-xl text-red-500 font-bold">
                    प्रविनहाङ योङहाङ
                    </h1>
                    <div className="flex space-x-2 mt-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-yellow-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </span>
                      <h3 className="text-lg text-gray-600 font-semibold mb-2">
                       प्रशासकीय अधिकृत <span  > <a href=" tel:+977 9852623107" >(+977 9852623111)</a> </span>

                      </h3>
                    </div>
                    {/* <p className="text-sm tracking-normal">
                      Częstochowski pomnik Jana Pawła II wyjątkowo interesująco
                      wpisuje się w poprzemysłowy krajobraz tego miasta o
                      mocnych lewicowych, robotniczych i socjalistycznych
                      tradycjach. Powstały w 2013 roku, uchodzi za najwyższego
                      Karola Wojtyłę w Polsce.
                    </p>
                    <button className="mt-12 w-full text-center bg-yellow-400 py-2 rounded-lg">
                      Read more
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>


           {/* <!-- Box-4 --> */}
           <div className="bg-white">
            <div>
              <div className="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                <div>
                  <Image
                    // className="w-full"
                   
                    width={"385"}
                    height={"100"}
                    priority
                    src={pramukh}
                    alt="Papież gigant"
                  />
                  <div className="px-4 py-2">
                    <h1 className="text-xl text-red-500 font-bold">
                    मित्र प्रसाद काफ्ले
                    </h1>
                    <div className="flex space-x-2 mt-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-yellow-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </span>
                      <h3 className="text-lg text-gray-600 font-semibold mb-2">
                      नगर प्रमुख <span  > <a href=" tel:+977 9852623111" >(+977 9852623107)</a> </span>
                      </h3>
                    </div>
                    {/* <p className="text-sm tracking-normal">
                      Częstochowski pomnik Jana Pawła II wyjątkowo interesująco
                      wpisuje się w poprzemysłowy krajobraz tego miasta o
                      mocnych lewicowych, robotniczych i socjalistycznych
                      tradycjach. Powstały w 2013 roku, uchodzi za najwyższego
                      Karola Wojtyłę w Polsce.
                    </p>
                    <button className="mt-12 w-full text-center bg-yellow-400 py-2 rounded-lg">
                      Read more
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Box-5 --> */}
          <div className="bg-white">
            <div>
              <div className="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                <div>
                  <Image
                    // className="w-full"
                    src={upaPramukh}
                    width={385}
                    height={100}
                    priority
                    alt="Papież gigant"
                  />
                  <div className="px-4 py-2">
                    <h1 className="text-xl text-red-500 font-bold ">
                    राधा कृष्ण न्यौपाने
                    </h1>
                    <div className="flex space-x-2 mt-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-yellow-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </span>
                      <h3 className="text-lg text-gray-600 font-semibold mb-2">
                      उप– प्रमुख <span  > <a href=" tel:+977 9852623108" >(+977 9852623108)</a> </span>
                      </h3>
                    </div>
                    {/* <p className="text-sm tracking-normal">
                      Częstochowski pomnik Jana Pawła II wyjątkowo interesująco
                      wpisuje się w poprzemysłowy krajobraz tego miasta o
                      mocnych lewicowych, robotniczych i socjalistycznych
                      tradycjach. Powstały w 2013 roku, uchodzi za najwyższego
                      Karola Wojtyłę w Polsce.
                    </p>
                    <button className="mt-12 w-full text-center bg-yellow-400 py-2 rounded-lg">
                      Read more
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* <!-- Box-6 --> */}
          <div className="bg-white">
            <div>
              <div className="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                <div>
                  <Image
                    // className="w-full"
                    src={adhikrit}
                    width={255}
                    height={100}
                    priority
                    alt="Papież gigant"   

                  />
                  <div className="px-4 py-2">
                    <h1 className="text-xl text-red-500 font-bold">
                    प्रविनहाङ योङहाङ
                    </h1>
                    <div className="flex space-x-2 mt-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-yellow-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </span>
                      <h3 className="text-lg text-gray-600 font-semibold mb-2">
                       प्रशासकीय अधिकृत <span  > <a href=" tel:+977 9852623107" >(+977 9852623111)</a> </span>

                      </h3>
                    </div>
                    {/* <p className="text-sm tracking-normal">
                      Częstochowski pomnik Jana Pawła II wyjątkowo interesująco
                      wpisuje się w poprzemysłowy krajobraz tego miasta o
                      mocnych lewicowych, robotniczych i socjalistycznych
                      tradycjach. Powstały w 2013 roku, uchodzi za najwyższego
                      Karola Wojtyłę w Polsce.
                    </p>
                    <button className="mt-12 w-full text-center bg-yellow-400 py-2 rounded-lg">
                      Read more
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>:
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
           <div className="bg-white">
            <div>
              <div className="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                <div>
                  <Image
                    // className="w-full"
                   
                    width={"385"}
                    height={"100"}
                    priority
                    src={pramukh}
                    alt="Papież gigant"
                  />
                  <div className="px-4 py-2">
                    <h1 className="text-xl text-red-500 font-bold">
                    मित्र प्रसाद काफ्ले
                    </h1>
                    <div className="flex space-x-2 mt-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-yellow-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </span>
                      <h3 className="text-lg text-gray-600 font-semibold mb-2">
                      नगर प्रमुख <span  > <a href=" tel:+977 9852623111" >(+977 9852623107)</a> </span>
                      </h3>
                    </div>
                    {/* <p className="text-sm tracking-normal">
                      Częstochowski pomnik Jana Pawła II wyjątkowo interesująco
                      wpisuje się w poprzemysłowy krajobraz tego miasta o
                      mocnych lewicowych, robotniczych i socjalistycznych
                      tradycjach. Powstały w 2013 roku, uchodzi za najwyższego
                      Karola Wojtyłę w Polsce.
                    </p>
                    <button className="mt-12 w-full text-center bg-yellow-400 py-2 rounded-lg">
                      Read more
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Box-2 --> */}
          <div className="bg-white">
            <div>
              <div className="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                <div>
                  <Image
                    // className="w-full"
                    src={upaPramukh}
                    width={385}
                    height={100}
                    priority
                    alt="Papież gigant"
                  />
                  <div className="px-4 py-2">
                    <h1 className="text-xl text-red-500 font-bold ">
                    राधा कृष्ण न्यौपाने
                    </h1>
                    <div className="flex space-x-2 mt-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-yellow-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </span>
                      <h3 className="text-lg text-gray-600 font-semibold mb-2">
                      उप– प्रमुख <span  > <a href=" tel:+977 9852623108" >(+977 9852623108)</a> </span>
                      </h3>
                    </div>
                    {/* <p className="text-sm tracking-normal">
                      Częstochowski pomnik Jana Pawła II wyjątkowo interesująco
                      wpisuje się w poprzemysłowy krajobraz tego miasta o
                      mocnych lewicowych, robotniczych i socjalistycznych
                      tradycjach. Powstały w 2013 roku, uchodzi za najwyższego
                      Karola Wojtyłę w Polsce.
                    </p>
                    <button className="mt-12 w-full text-center bg-yellow-400 py-2 rounded-lg">
                      Read more
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Box-3 --> */}
          <div className="bg-white">
            <div>
              <div className="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                <div>
                  <Image
                    // className="w-full"
                    src={adhikrit}
                    width={255}
                    height={100}
                    priority
                    alt="Papież gigant"   

                  />
                  <div className="px-4 py-2">
                    <h1 className="text-xl text-red-500 font-bold">
                    प्रविनहाङ योङहाङ
                    </h1>
                    <div className="flex space-x-2 mt-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-yellow-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </span>
                      <h3 className="text-lg text-gray-600 font-semibold mb-2">
                       प्रशासकीय अधिकृत <span  > <a href=" tel:+977 9852623107" >(+977 9852623111)</a> </span>

                      </h3>
                    </div>
                    {/* <p className="text-sm tracking-normal">
                      Częstochowski pomnik Jana Pawła II wyjątkowo interesująco
                      wpisuje się w poprzemysłowy krajobraz tego miasta o
                      mocnych lewicowych, robotniczych i socjalistycznych
                      tradycjach. Powstały w 2013 roku, uchodzi za najwyższego
                      Karola Wojtyłę w Polsce.
                    </p>
                    <button className="mt-12 w-full text-center bg-yellow-400 py-2 rounded-lg">
                      Read more
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
       
        <div className="flex justify-end pt-8 ">
        <div
          onClick={() => {
            setShowMore(!showMore);
          }}
          className="flex gap-2 bg-[#89bde1fd]  py-3 shadow-lg rounded-md w-32 justify-center hover:bg-blue-300 cursor-pointer "
        >
          <div className="pt-1">
            {showMore ? <FaArrowUp/> : <FaArrowDown/>}
          </div>

          <button type="submit" className="text-sm font-extralight ">
            {showMore ? "Show Less  " : "Show More"}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Teams;
