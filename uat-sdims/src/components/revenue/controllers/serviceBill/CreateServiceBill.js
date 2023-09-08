import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CommonHeaderDesign from "../../../reusableDesign/CommonHeaderDesign";
import { serviceBillValidationResolver } from "../../../../utils/validateField";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import { serviceRate } from "../../../../services/apiServices/revenue/serviceRate/serviceRateService";
const BS = require("bikram-sambat-js");
import { createServiceBill } from "../../../../services/apiServices/revenue/service/serviceBill";
export default function CreateServiceBill  ()  {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: serviceBillValidationResolver });

  // for billMiti
  const aa = new BikramSambat(new Date()).toBS();
  const [startNepDate, setStartNepDate] = useState(aa);
  const handelBillMiti = (e) => {
    setStartNepDate(e);
  };

  //   for serviceId
  const [serviceIdApi, setServiceIdApi] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [serviceMsg, setServiceMsg] = useState("");
  const handleService = (e) => {
    setServiceId(e.target.value);
  };
  useEffect(() => {
    let clickedServiceId = () => {
      serviceRate().then((response) => {
        try {
          response.status === true;
          {
            setServiceIdApi(response.data);
          }
        } catch (error) {}
      });
    };

    clickedServiceId();
  }, []);

  const rpqFilter = serviceIdApi.find(
    (item) => item?.serviceId === parseInt(serviceId)
  );

  const rate = rpqFilter?.ratePerQuantity;

  const serviceNameAccToService = rpqFilter?.serviceName;

  // for quantity
  const [quentity, setQuantity] = useState("");
  const [quantityMsg, setQuantityMsg] = useState("");
  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  //  for amount
  let amount = rate * quentity;

  //  for invoice button
  const [arrayData, setArrayData] = useState([]);
  const handleInvoice = (e) => {
    e.preventDefault();

    if (serviceId === "") {
      setServiceMsg(<p>This field is required</p>);
      return;
    } else if (quentity === "") {
      setQuantityMsg(<p>This field is required</p>);
    } else {
      setArrayData([...arrayData, { serviceId, rate, quentity, amount }]);
      setServiceId("");

      setQuantity("");
    }
  };

  // for deleting the clicked row of invoice
  const handleDelete = (index) => {
    const newArray = [...arrayData];
    newArray.splice(index, 1);
    setArrayData(newArray);
  };
  // for subtotal
  const subTotal = arrayData?.reduce((acc, crr) => {
    return acc + crr.amount;
  }, 0);

  // for givenAmount
  const [givenAmount, setGivenAmount] = useState(0);
  const handleGivenAmount = (e) => {
    setGivenAmount(e.target.value);
  };

  // for returnamount
  const returnAmount = givenAmount - subTotal;

  const onSubmit = (data) => {
    data = {
      bankId: null,
      voucherNo: null,
      voucherMiti: null,
      remarks: null,
      billMiti: startNepDate,
      invoiceDate: new Date(BS.BSToAD(startNepDate)),
      ...data,
      extraTaxs: arrayData,
    };
    try {
      createServiceBill(data).then((response) => {
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/revenue/servicebill");
          return;
        } else response.status === false;
        {
          toast.error(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
        }
        return;
      });
    } catch (error) {}
  };

  return (
    <>
      <CommonHeaderDesign title={"आम्दानी रसिद राख्नुहोस "} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" border-black border-[1.5px] border-dashed shadow-2xl bg-gray-100 pl-10 ">
          <div className=" flex  justify-end gap-5 px-5 pt-10   ">
            <div className="relative z-0  mb-6 group  lg:w-1/6  ">
              <label className="label text-blue-900 ">Payement Method</label>
              <select {...register("paymentTypeId")} className="peer">
                <option disabled value={""}>
                  Select The Payment Method
                </option>
                <option selected value={0}>
                  Cash
                </option>
                <option value={1} disabled>
                  Bank
                </option>
              </select>
            </div>

            <div className="relative lg:w-1/6 mb-6 group  ">
              <label
                htmlFor=""
                className=" absolute text-[10px] text-blue-900 -top-[15%]"
              >
                Invoice Bill मिति
              </label>

              <NepaliDatePicker
                value={startNepDate}
                className="peer"
                onChange={handelBillMiti}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-5  gap-5 ">
            <div className="relative z-0 w-full lg:mb-6 group">
              <input
                type="string"
                className="peer"
                {...register("taxPayerName")}
                placeholder="."
              />
              <label className="label">Tax Payer Name</label>
              <p> {errors?.taxPayerName?.message}</p>
            </div>
            <div className="relative z-0 w-full lg:mb-6 group">
              <input
                type="string"
                className="peer"
                {...register("vatPanNo")}
                placeholder="."
              />
              <label className="label">Vat/Pan No.</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="string"
                className="peer"
                {...register("address")}
                placeholder="."
              />
              <label className="label">Address</label>
              <p> {errors?.address?.message}</p>
            </div>
          </div>
        </div>
        <div className="flex pt-5 gap-2  ">
          <form className="justify-end gap-5 px-5 pt-28 w-3/4 grid lg:grid-cols-5 h-1/3  border-black border-[1.5px] border-dashed shadow-2xl bg-gray-100 pl-10 ">
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">Service</label>
              <select onChange={handleService} required className="peer">
                <option value={""} disabled selected>
                  Select The Service
                </option>
                {serviceIdApi.map((items, index) => {
                  return (
                    <option key={index} value={items?.serviceId}>
                      {items.serviceName}
                    </option>
                  );
                })}
              </select>
              {serviceMsg}
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                className="peer"
                placeholder="."
                value={rate}
              />
              <label className="label">Rate</label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                className="peer"
                onChange={handleQuantity}
                value={quentity}
                placeholder="."
              />
              <label className="label">Quantity</label>
              <p> {quantityMsg}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                className="peer"
                value={amount}
                placeholder="."
              />
              <label className="label">Amount</label>
              <p> {errors?.amount?.message}</p>
            </div>
            <div>
              <button
                className="border-2 to-90% border-dotted px-5 bg-[#89bde1fd] py-2 hover:bg-blue-300"
                onClick={handleInvoice}
              >
                राशिद थप्नुहोस्
              </button>
            </div>
          </form>
          {/* form 2 end here */}

          <div className=" w-1/4  border-black border-[1.5px] border-dashed shadow-2xl bg-slate-300 pb-2 ">
            <div>
              <div className="flex justify-center pt-2  text-lg  italic decoration-double underline ">
                Tax Amount Here !!!
              </div>
              <div className="flex lg:gap-10 text-3xl py-2 justify-center ">
                <p className="text-xl">Subtotal Npr. </p>
                <p className="text-xl"> {subTotal} /-</p>
              </div>
              <div className="flex lg:gap-14 text-3xl py-2 justify-center ">
                <p className="text-xl pl-10">Given Npr. </p>
                <input
                  className="w-1/6 text-xl "
                  onChange={handleGivenAmount}
                  value={givenAmount}
                />
              </div>
              <div className="flex lg:gap-10 text-3xl py-2 justify-center ">
                <p className="text-xl">Returnn Npr. </p>
                <p className="text-xl"> {returnAmount} /-</p>
              </div>
            </div>
            {arrayData.length >= 1 ? (
              <div className="pl-24 pt-4  ">
                <div className="flex  bg-[#89bde1fd]   py-3 shadow-lg rounded-md w-36 justify-center hover:bg-blue-300 cursor-pointer  ">
                  <div className="pt-1">
                    <FaPlus />
                  </div>
                  <button
                    type="submit"
                    className="text-sm font-extralight "
                    // disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "आम्दानी रसिद थप्नुहोस्"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="pl-24 pt-4  ">
                <div className="flex gap-2 bg-[#89bde1fd] py-3 shadow-lg rounded-md w-36 justify-center hover:bg-blue-300 cursor-pointer ">
                  <div className="text-sm font-extralight cursor-not-allowed ">
                    {"पहिलो राशिद थप्नुहोस्"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-3/4   ">
          <div className="text-2xl font-bold items-center flex justify-center pt-2 border-black border-2 pb-2 bg-gray-200  ">
            राशिद विवरण
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow className="bg-[#3e8dc1fd]">
                  <TableCell sx={{ fontSize: "20px" }}>S.No</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>Service</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>Rate</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>Quantity</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>Amount</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              {arrayData.map((data, index) => {
                return (
                  <TableBody
                    key={index}
                    className="hover:bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90%"
                  >
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.serviceId}
                      </TableCell>
                      <TableCell>{data.rate}</TableCell>
                      <TableCell>{data.quentity}</TableCell>
                      <TableCell>{data.amount}</TableCell>

                      <TableCell
                        className="pl-7 cursor-pointer hover:text-red-900 "
                        onClick={() => {
                          handleDelete(index);
                        }}
                      >
                        <FaTrash size={20} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            </Table>
          </TableContainer>
        </div>
      </form>
    </>
  );
};

