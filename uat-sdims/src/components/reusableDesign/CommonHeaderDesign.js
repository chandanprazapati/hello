// import React, { useEffect, useRef } from "react";

// const CommonHeaderDesign = ({ title }) => {
//   const titleRef = useRef(null);

//   useEffect(() => {
//     titleRef.current.classList.add("animate-drop");
//   }, []);
//   return (
//     <div className="pt-4" >
//       <div className="   pt-4 px-5 flex flex-col gap-4 bg-gray-300  shadow-2xl f ">
//         <div
//         ref={titleRef}
//         className="text-3xl font-medium italic  py-6  items-center flex justify-center  ">
//           {title}
//         </div>
//         <hr/>
//       </div>
//       <br />
//     </div>
//   );
// };

// export default CommonHeaderDesign;

// import React, { useEffect, useRef } from "react";

// const CommonHeaderDesign = ({ title }) => {
//   const titleRef = useRef(null);

//   useEffect(() => {
//     titleRef.current.classList.add("animate-drop");
//   }, []);

//   return (
//     <div className="pt-4">
//       <div className="pt-4 px-5 flex flex-col gap-4 bg-gray-300 shadow-2xl rounded-lg">
//         <div
//           ref={titleRef}
//           className="text-3xl font-medium italic py-6 items-center flex justify-center"
//           style={{
//             textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
//             color: "#333",
//           }}
//         >
//           {title}
//         </div>
//         <hr />
//       </div>
//       <br />
//     </div>
//   );
// };

// export default CommonHeaderDesign;

import React, { useEffect, useRef } from "react";

const CommonHeaderDesign = ({ title }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.classList.add("animate-drop");
  }, []);

  return (
    <div className="pt-4">
      <div className="pt-4 px-5 flex flex-col gap-4 bg-gray-300 shadow-2xl rounded-lg">
        <div
          ref={titleRef}
          className="text-3xl font-medium italic py-6 items-center flex justify-center"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            color: "#333",
            position: "relative",
          }}
        >
          <div
            className="absolute top-0 w-full h-1 bg-gradient-to-r from-blue-500 to-pink-500"
            style={{ zIndex: -1 }}
          ></div>
          {title}
          <div
            className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-pink-500 to-blue-500"
            style={{ zIndex: -1 }}
          ></div>
        </div>
        <div className="flex justify-center text-gray-500">
          <span className="w-2 h-2 bg-gray-500 rounded-full mx-1"></span>
          <span className="w-2 h-2 bg-gray-500 rounded-full mx-1"></span>
          <span className="w-2 h-2 bg-gray-500 rounded-full mx-1"></span>
        </div>
        <hr />
      </div>
      <br />
    </div>
  );
};

export default CommonHeaderDesign;

// import React, { useEffect, useRef } from "react";

// const CommonHeaderDesign = ({ title }) => {
//   const titleRef = useRef(null);

//   useEffect(() => {
//     titleRef.current.classList.add("animate-drop");
//   }, []);

//   return (
//     <div className="pt-4">
//       <div className="pt-4 px-5 flex flex-col gap-4 bg-gradient-to-b from-gray-300 to-gray-100 shadow-2xl rounded-lg">
//         <div
//           ref={titleRef}
//           className="text-3xl font-medium italic py-6 items-center flex justify-center"
//           style={{
//             textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
//             color: "#333",
//             position: "relative",
//           }}
//         >
//           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-pink-500"></div>
//           {title}
//           <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-blue-500"></div>
//         </div>
//         <hr className="border-t-2 border-gray-200" />
//         <div className="flex justify-center text-gray-500">
//           <span className="w-2 h-2 bg-gray-500 rounded-full mx-1"></span>
//           <span className="w-2 h-2 bg-gray-500 rounded-full mx-1"></span>
//           <span className="w-2 h-2 bg-gray-500 rounded-full mx-1"></span>
//         </div>
//       </div>
//       <br />
//     </div>
//   );
// };

// export default CommonHeaderDesign;
