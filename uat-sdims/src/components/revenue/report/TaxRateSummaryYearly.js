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
import { service } from "../../../services/apiServices/revenue/service/serviceService";
import { fiscal } from "../../../services/apiServices/common/fiscal/fiscalService";
import { taxModule } from "../../../services/apiServices/revenue/taxModule/taxModuleService";
const TaxRateSummaryYearly = () => {
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
     if (fiscalValue === "") {
        setFiscalMsg(<p>This field is required</p>);
      }
      else if (taxModuleValue === "") {
        setTaxModuleMsg(<p>This field is required</p>);
      }
      else {
        data = { ...data, FiscalYear: fiscalValue, TaxModule:taxModuleValue};
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

  



     //   for fiscalyearId
  const [fiscalId, setFiscalId] = useState([]);
  const [fiscalValue, setFiscalValue] = useState("");
  const [fiscalMsg, setFiscalMsg] = useState("");

  const handleFiscal = (e) => {
    setFiscalValue(e.target.value);
  };
  useEffect(() => {
    let fiscalYearId = () => {
      fiscal(0).then((response) => {
        try {
          response.status === true;
          {
            setFiscalId(response.data);
          }
        } catch (error) {}
      });
    };

    fiscalYearId();
  }, []);

  //   for taxModuleId
  const [taxModuleId, setTaxModuleId] = useState([]);
  const [taxModuleValue, setTaxModuleValue] = useState("");
  const [taxModuleMsg, setTaxModuleMsg] = useState("");

  const handleTaxModule = (e) => {
    setTaxModuleValue(e.target.value);
  };
  useEffect(() => {
    let taxModuleData = () => {
      taxModule().then((response) => {
        try {
          response.status === true;
          {
            setTaxModuleId(response.data);
          }
        } catch (error) {}
      });
    };

    taxModuleData();
  }, []);
  return (
    <>
      <CommonHeaderDesign title={"वार्षिक कर दर विवरण"} />
      <form onSubmit={handleSubmit(onSubmit)} className="pb-4" >
      <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 border border-black border-dashed ">

      <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">आर्थिक वर्ष </label>
            <select
              onChange={handleFiscal}
              value={fiscalValue}
              className="peer"
            >
              <option value={""} selected disabled>
                Select The आर्थिक वर्ष 
              </option>

              {fiscalId.map((items, index) => {
                return (
                  <option key={index} value={items?.id}>
                    {items.name}
                  </option>
                );
              })}
            </select>
            {fiscalMsg}
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">कर मोडुल </label>
            <select onChange={handleTaxModule} className="peer">
              <option disabled selected value={""}>
                Select The कर मोडुल
              </option>
              {taxModuleId.map((items, index) => {
                return (
                  <option key={index} value={items?.id}>
                    {items.name}
                  </option>
                );
              })}
            </select>
            {taxModuleMsg}
          </div>

          <div >
           <AddButton
              
              icon={<FaPlus />}
              title={isSubmitting ? "Submitting..." : "खोज्नुहोस्"}
              disabled={isSubmitting}
            />
           </div>
         </div>

       
      </form>

      {searchedData.length >= 1 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
<TableRow className="bg-[#3e8dc1fd]">
            <TableCell sx={{ fontSize: "20px" }}>क्र.स.	</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>मुल्यांकन समूह	</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>मुल्यांकन उप-समूह	</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>सूचक विवरण	</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>दर-रेट	</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>दर-रेट नविकरण	</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>प्रति इकाई दर-रेट</TableCell>
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
            <TableCell sx={{ fontSize: "20px" }}>बिल मिति</TableCell>
            <TableCell sx={{ fontSize: "20px" }}>क्र.स.	</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>मुल्यांकन समूह	</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>मुल्यांकन उप-समूह	</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>सूचक विवरण	</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>दर-रेट	</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>दर-रेट नविकरण	</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>प्रति इकाई दर-रेट</TableCell>
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
export default TaxRateSummaryYearly