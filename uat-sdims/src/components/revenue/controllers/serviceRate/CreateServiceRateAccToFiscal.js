import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaBackward, FaForward, FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../../reusableDesign/CommonHeaderDesign";
import { serviceRateValidationResolver } from "../../../../utils/validateField";
import {  } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "nepali-datepicker-reactjs/dist/index.css";
import {
  getServiceList,
} from "../../../../services/apiServices/revenue/serviceRate/serviceRateService";
import { TextField } from "@mui/material";



const CreateServiceRateAccToFiscal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ resolver: serviceRateValidationResolver });

  const router = useRouter();

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let serviceRateAccToFiscalData = () => {
      getServiceList().then((response) => {
        try {
          response.status === true;
          {
            setApiData(response.data);
            setLoading(false);
          }
        } catch (error) {
          toast.error(response.message, {
            autoClose: 1000,
          });
        }
      });
    };
    serviceRateAccToFiscalData();
  }, [setApiData]);

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        data = {
          ...data,
          fiscalYearId: fiscalId,
          pageNo: page,
          totalPage: totalPage,
          rateList: [tax],
        };

        // try {
        //   insertServiceRate(data).then((response) => {
        //     if (response.status === true) {
        //       toast.success(response.message, {
        //         icon: "🚀",
        //         autoClose: 1000,
        //       });
        //       router.push("/revenue/servicerate");
        //       return;
        //     } else response.status === false;
        //     {
        //       toast.error(response.message, {
        //         icon: "🚀",
        //         autoClose: 1000,
        //       });
        //     }
        //     return;
        //   });
        // } catch (error) {}
        resolve();
      }, 2000);
    });
  };

  // const EditableTable = () => {
  //   const [tableData, setTableData] = useState(filterApiData);
  //   console.log(tableData,"table");

  //   const onChange = (e, serviceId) => {
  //     const { serviceId, ratePerQuantity, taxPercentage, openingBalance } =
  //       e.target;
  //     const editTable = tableData.map((item) =>
  //       item.serviceId === serviceId &&
  //       ratePerQuantity &&
  //       taxPercentage &&
  //       openingBalance
  //         ? {
  //             ...item,
  //             [serviceId]: value,
  //             [ratePerQuantity]: value,
  //             [taxPercentage]: value,
  //             [openingBalance]: value,
  //           }
  //         : item
  //     );
  //     setTableData(editTable);
  //   };
  // };

  // const [ratePerQuantity, setRatePerQuantity] = useState([]);
  // console.log(ratePerQuantity,"rpq");
  // const handleRpq = (e)=>{
  //   setRatePerQuantity(...ratePerQuantity,e.target.value)
  //   }

  // const [tax, setTax] = useState("");

  // const handleTax = (event, row) => {
  //   setTax((prevTax) => ({
  //     ...prevTax,
  //     [row.serviceId]: event.target.value,
  //   }));
  // };

  // const [openingBlc, setOpeningBlc] = useState("");

  // const handleOpeningBalance = (event, row) => {
  //   setOpeningBlc((prevOpeningBlc) => ({
  //     ...prevOpeningBlc,
  //     [row.serviceId]: event.target.value,
  //   }));
  // };

  // to store page no
  const [page, setPage] = useState(1);

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrev = () => {
    setPage(page - 1);
  };

  // for total page
  const totalPage = apiData.totalPage;

  // for fiscal id
  const fiscalId = apiData.fiscalYearId;

  // for serviceid
  const [serviceIdX, setServiceIdX] = useState([]);

  // for ratePerQuantity
  const [rpq, setRpq] = useState([]);

  const handleRpq = (e,row) => {
    const clickedRowRpq ={
      ...rpq,
      [row.id] : e.target.value
    }
    setRpq(clickedRowRpq)
  };
 


  return (
    <>
      <CommonHeaderDesign title={"आम्दानी दर राख्नुहोस"} />
      <div className="grid lg:grid-cols-5  gap-5 px-5 py-4 ">
         <div className="flex gap-4" >
         <label className=" text-blue-900 ">Fiscal Year</label>
          <select className="border-2 border-black p-2" >
            <option>{apiData.fiscalYearName}</option>;
          </select>
         </div>
      </div>
      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          {/* loading text */}
          <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
            Loading...
          </div>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
<TableRow className="bg-[#3e8dc1fd]">
            <TableCell sx={{ fontSize: "20px" }}>सि.न.</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>सेवाको नाम</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>दर प्रति मात्रा</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>दर % </TableCell>
                <TableCell sx={{ fontSize: "20px" }}>सुरुको मौज्दात</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={"bg-gray-100  "}>
             
               {apiData.rateList.map((row, index) => {
                return (
                  <TableRow
                  key={index}
                  className="hover:bg-[#a0cae7fd]"
                >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <select
                        required
                        className="peer p-4 w-full bg-gray-100 "
                        value={row.serviceId}
                      >
                        <option>{row.serviceName}</option>
                      </select>
                    </TableCell>

                    <TableCell>
                      <TextField
                        onChange = {(e)=>handleRpq(e,row)}
                        
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.taxPercentage}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.openingBalance}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
             
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div className=" flex justify-between pt-10  ">
        <div className="flex gap-2">
          Page No. : <div className="text-lg font-bold">{apiData.pageNo}</div>
          out of <div className="text-lg font-bold">{apiData.totalPage}</div>
        </div>

        <div className="flex gap-1 justify-end   ">
          <div className="flex gap-2 bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90%  py-3 shadow-lg rounded-md w-36 justify-center  cursor-pointer ">
            <div className="pt-1">
              <FaBackward />
            </div>
            <button
              type="submit"
              className="text-sm font-extralight "
              onClick={handlePrev}
            >
              {"Prev"}
            </button>
          </div>

          <div className="flex gap-2 bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90%  py-3 shadow-lg rounded-md w-36 justify-center hover:bg-blue-300 cursor-pointer ">
            <div className="pt-1">
              <FaForward />
            </div>
            <button
              type="submit"
              className="text-sm font-extralight "
              onClick={handleNext}
              disabled={apiData.pageNo == apiData.totalPage}
            >
              {"Next"}
            </button>
          </div>

          <div className="flex gap-2 bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90%  py-3 shadow-lg rounded-md w-36 justify-center hover:bg-blue-300 cursor-pointer ">
            <div className="pt-1">
              <FaPlus />
            </div>
            <button
              type="submit"
              className="text-sm font-extralight "
              // disabled={isSubmitting}
              onClick={() => onSubmit()}
            >
              {isSubmitting ? "Submitting..." : "दर सुरक्षित गर्नुहोस्  "}
            </button>
          </div>
        </div>
      </div>
      {/* </form> */}
    </>
  );
};
export default CreateServiceRateAccToFiscal;

// {tableData.map((rowData,index)=>{
//   return(

//     <TableRow key={index} >
//        <TableCell component="th" scope="row">
//         {index + 1}
//       </TableCell>
//         <TableCell >
//         <select

//           required
//           className="peer p-4 w-full bg-gray-100 "
//           value={rowData.serviceId || ""}
//           onChange ={(event)=> setTableData([

//             { ...rowData, serviceId: event.target.value },
//           ])

//           }
//         >
//           <option   >{row.serviceName}</option>
//         </select>
//       </TableCell>

//       <TableCell>
//         <TextField
//           value={rowData.ratePerQuantity || ""}
//           onChange={(event) =>
//             setTableData([
//               { ...rowData, ratePerQuantity: event.target.value },
//           ])
//           }
//         />
//       </TableCell>

//       <TableCell>
//         <TextField
//           value={rowData.taxPercentage || ""}
//           onChange={(event) =>
//             setTableData([
//               { ...rowData, taxPercentage: event.target.value },
//           ])
//           }
//         />
//       </TableCell>

//       <TableCell>
//         <TextField
//           value={rowData.openingBalance || ""}
//           onChange={(event) =>
//             setTableData([
//               { ...rowData, openingBalance: event.target.value },
//           ])
//           }
//         />
//       </TableCell>

//     </TableRow>
//   )
// })}
