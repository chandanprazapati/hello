import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFileDownload, FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import { invoiceCancelReasonValidationResolver } from "../../../utils/validateField";
import { createInvoiceCancelReason } from "../../../services/apiServices/revenue/invoiceCancelReason/invoceCancelReasonService";
import AddButton from "../../reusableDesign/AddButton";
import { ward } from "../../../services/apiServices/common/ward/wardService";
const BS = require("bikram-sambat-js");
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import { counter } from "../../../services/apiServices/common/counter/counterService";
import Table from "@mui/material/Table";

import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DownloadButton from "../../reusableDesign/DownloadButton";
import { taxModule } from "../../../services/apiServices/revenue/taxModule/taxModuleService";
const TaxPayerModuleWiseSummary= () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ resolver: invoiceCancelReasonValidationResolver });

 
  const aa = new BikramSambat(new Date()).toBS();

  const [startNepDate, setStartNepDate] = useState(aa);
  const handelNepaliStartDate = (e) => {
    setStartNepDate(e);
  };
  const [endNepDate, setEndNepDate] = useState(aa);
  const handelNepaliEndDate = (e) => {
    setEndNepDate(e);
  };

  const router = useRouter();

  const [searchedData, setSearchedData] = useState("");

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
     if (wardValue === 0) {
        setWardMsg(<p>This field is required</p>);
      }
      else if (counterValue === 0) {
        setCounterMsg(<p>This field is required</p>);
      }
      else {
        data = { ...data, taxModuleId: wardValue, invoiceDateStart: new Date(BS.BSToAD(startNepDate)), invoiceDateEnd:new Date(BS.BSToAD(endNepDate)) , counterId: counterValue };
      }
        try {
          createInvoiceCancelReason(data).then((response) => {
            if (response.status === true) {
        setSearchedData(res.data);

              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push("/revenue/invoicecancel");
            return;
            }
            else response.status === false;
            {
                toast.error(response.message, { icon: "🚀", autoClose: 1000 });
            }
            return
          });
        } catch (error) {
          toast.error(error.message);
        }
        resolve();
      }, 2000);
    });
  };

    //   for taxmodule from common
    const [wardId, setWardId] = useState([0]);
    const [wardValue, setWardValue] = useState(0);
    const [wardMsg, setWardMsg] = useState("");
  
    const handleWard = (e) => {
      setWardValue(e.target.value);
    };
    useEffect(() => {
      let wardIdData = () => {
        taxModule(0).then((response) => {
          try {
            response.status === true;
            {
              setWardId(response.data);
            }
          } catch (error) {}
        });
      };
  
      wardIdData();
    }, []);

     //   for counterId 
     const [counterId, setCounterId] = useState([0]);
     const [counterValue, setCounterValue] = useState(0);
     const [counterMsg, setCounterMsg] = useState("");
   
     const handleCounter = (e) => {
       setCounterValue(e.target.value);
     };
     useEffect(() => {
       let counterIdData = () => {
         counter(0).then((response) => {
           try {
             response.status === true;
             {
               setCounterId(response.data);
             }
           } catch (error) {}
         });
       };
   
       counterIdData();
     }, []);
  return (
    <>
      <CommonHeaderDesign title={"करदाताको कर विवरण"} />
      <form onSubmit={handleSubmit(onSubmit)} className="pb-4" >
      <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 border border-black border-dashed ">

      <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("codeNo")}
              placeholder="."
            />
            <label className="label">करदाताको संकेत नं.</label>
            <p> {errors?.codeNo?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("name")}
              placeholder="."
            />
            <label className="label"> नाम</label>
            <p> {errors?.name?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("citizenshipNo")}
              placeholder="."
            />
            <label className="label">नागरिकता नं</label>

            <p> {errors?.citizenshipNo?.message}</p>
          </div>
       

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">कर मोडुल </label>
            <select onChange={handleWard} value={wardValue} className="peer">
              <option value={0} disabled>
                Select The कर मोडुल 
              </option>

              {wardId.map((items, index) => {
                return (
                  <option key={index} value={items?.id}>
                    {items.name}
                  </option>
                );
              })}
            </select>
            {wardMsg}
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("invoiceNo")}
              placeholder="."
            />
            <label className="label">बिल नं.</label>
            <p> {errors?.invoiceNo?.message}</p>

          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("invoiceNoStart")}
              placeholder="."
            />
            <label className="label">बिल नं. देखि</label>
            <p> {errors?.invoiceNoStart?.message}</p>

          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("invoiceNoEnd")}
              placeholder="."
            />
            <label className="label">बिल नं. सम्म</label>
            <p> {errors?.invoiceNoEnd?.message}</p>

          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              बिल मिति देखि
            </label>

            <NepaliDatePicker
              value={startNepDate}
              className="peer"
              onChange={handelNepaliStartDate}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />

          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              बिल मिति सम्म
            </label>

            <NepaliDatePicker
              value={endNepDate}
              className="peer"
              onChange={handelNepaliEndDate}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />

          </div>

          <div >
           <AddButton
              
              icon={<FaPlus />}
              title={isSubmitting ? "Submitting..." : "खोज्नुहोस्"}
              disabled={isSubmitting}
            />
           </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">संकलन केन्द्र</label>
            <select onChange={handleCounter} value={counterValue} className="peer">
              <option value={0} disabled>
                Select The संकलन केन्द्र
              </option>

              {counterId.map((items, index) => {
                return (
                  <option key={index} value={items?.id}>
                    {items.name}
                  </option>
                );
              })}
            </select>
            {counterMsg}
          </div>
          

           
        </div>

       
      </form>

      {searchedData.length >= 1 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
<TableRow className="bg-[#3e8dc1fd]">
                <TableCell sx={{ fontSize: "20px" }}>करदाताको नाम</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>व्यवसायको नाम</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>नागरिकता नं.</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>कर रकम</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {searchedData.map((row, index) => {
                return (
                  <TableRow
                  key={index}
                  className="hover:bg-[#a0cae7fd]"
                >
                    <TableCell component="th" scope="row">
                      {row.taxPayerName}
                    </TableCell>
                    <TableCell>{row.invoiceNo}</TableCell>

                    <TableCell>{row.address}</TableCell>

                    <TableCell>{row.invoiceMiti}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700  }} aria-label="customized table">
            <TableHead>
<TableRow className="bg-[#3e8dc1fd]">
            <TableCell sx={{ fontSize: "20px" }}>करदाताको नाम</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>व्यवसायको नाम</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>नागरिकता नं.</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>कर रकम</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
            
            </TableBody>
          </Table>
        </TableContainer>
      )}
       <DownloadButton
              
              icon={<FaFileDownload />}
              title={isSubmitting ? "Submitting..." : "डाउनलोड गर्नुहोस् "}
            />
    </>
  );
};
export default TaxPayerModuleWiseSummary