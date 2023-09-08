import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../components/viewPage/ViewPage";
import {
  serviceTransaction,
  transcationDetail,
} from "../../../../services/apiServices/revenue/transactionDetail/transactionService";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdCreateNewFolder } from "react-icons/md";
import { useForm } from "react-hook-form";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { serviceRate } from "../../../../services/apiServices/revenue/serviceRate/serviceRateService";
import { FaEye, FaPlus, FaTrash } from "react-icons/fa";
import { discountSchema } from "../../../../services/apiServices/revenue/discountSchema/discountSchemaService";
import { fineSchema } from "../../../../services/apiServices/revenue/fineSchema/fineSchemaService";
import { toast } from "react-toastify";
const BS = require("bikram-sambat-js");

const PayTaxById = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  const router = useRouter();
  const userId = router?.query?.paytaxid;

  //  for invoice button (taxRates)
  const [arrayData, setArrayData] = useState([]);

  const handleInvoice = (e) => {
    e.preventDefault();

    if (id === "") {
      setServiceRateMsg(<p>This field is required</p>);
      return;
    } else if (amount === "") {
      setAmountMsg(<p>This field is required</p>);
    } else {
      setArrayData([...arrayData, { id, amount }]);
      setId("");
      setAmount("");
    }
  };

  //   for serviceRate
  const [serviceRateApi, setServiceRateApi] = useState([]);
  const [id, setId] = useState("");
  const [serviceRateMsg, setServiceRateMsg] = useState("");
  const handleServiceRate = (e) => {
    setId(e.target.value);
  };
  useEffect(() => {
    let clickedServiceRate = () => {
      serviceRate().then((response) => {
        try {
          response.status === true;
          {
            setServiceRateApi(response.data);
          }
        } catch (error) {}
      });
    };

    clickedServiceRate();
  }, []);

  // for amount
  const [amount, setAmount] = useState("");
  const [amountMsg, setAmountMsg] = useState("");
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  // for deleting the clicked row of invoice
  const handleDelete = (index) => {
    const newArray = [...arrayData];
    newArray.splice(index, 1);
    setArrayData(newArray);
  };

  // for givenAmount
  const [givenAmount, setGivenAmount] = useState(10000);
  const handleGivenAmount = (e) => {
    setGivenAmount(e.target.value);
  };

  // for returnamount
  // const returnAmount = givenAmount - subTotal;

  // for billMiti
  const aa = new BikramSambat(new Date()).toBS();
  const [startNepDate, setStartNepDate] = useState(aa);
  const handelBillMiti = (e) => {
    setStartNepDate(e);
  };

  // for transaction detail of owner
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      let transcationDetailApiData = () => {
        transcationDetail(userId).then((response) => {
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
      transcationDetailApiData();
    }
  }, [userId]);

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        data = {
          ...data,
          taxPayerId: userId,
          billMiti: startNepDate,
          inVoiceDate: new Date(BS.BSToAD(startNepDate)),
          extraTaxs: arrayData,
        };
        try {
          serviceTransaction(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              // router.push("/common/counter");
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
        } catch (error) {
          toast.error(error.message);
        }
        resolve();
      }, 2000);
    });
  };

  // state to check remember me & function
  const [isCheaked, setIsChecked] = useState(false);

  // {console.log(
  //   apiData.taxLandDetail?.find((item)=>item.id),"console"
  // )}

  
  const handleCheckbox = (e, row) => {
    const clickedCheckedRow = {
      ...isCheaked,
      [row.id]: e.target.checked,
    };
    setIsChecked(clickedCheckedRow);
  };

  //   for discount
  const [discountIdApi, setDiscountIdApi] = useState([]);
  const [discountId, setDiscountId] = useState("");
  const handleDiscount = (e, row) => {
    const clickedRowDiscount = {
      ...discountId,
      [row.id]: e.target.value,
    };
    setDiscountId(clickedRowDiscount);
  };
  useEffect(() => {
    let clickedDiscountId = () => {
      discountSchema().then((response) => {
        try {
          response.status === true;
          {
            setDiscountIdApi(response.data);
          }
        } catch (error) {}
      });
    };

    clickedDiscountId();
  }, []);

  //   for fine (penalty)
  const [fineIdApi, setFineIdApi] = useState([]);
  const [fineId, setFineId] = useState("");
  const handleFine = (e, row) => {
    const clickedRowFine = {
      ...fineId,
      [row.id]: e.target.value,
    };

    setFineId(clickedRowFine);
  };
  useEffect(() => {
    let clickedFineId = () => {
      fineSchema().then((response) => {
        try {
          response.status === true;
          {
            setFineIdApi(response.data);
          }
        } catch (error) {}
      });
    };

    clickedFineId();
  }, []);

  return (
    <>
    {/* {
    Object.keys(isCheaked)?.map((item) => {
      console.log(item, "item");
      // find from api detial
      const apiDetailItem=  apiData.taxLandDetail?.find((item2)=>{
        return item2.id === parseInt(item)
      })
      console.log(apiDetailItem, "item xxx")
      return(
        <div style = {{color : "red", backgroundColor : "orange" ,marginTop : 100}}>
        Ite : {apiDetailItem.id}
        <br />
        fuck
        Data : {apiDetailItem.kittaNo}
        </div>
      )
    })
  } */}
      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          {/* loading text */}
          <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
            Loading...
          </div>
        </div>
      ) : (
        <React.Fragment>
          <SeoOptimization title={"Tax Payer Detail / Pay Tax"} />
          <br />
          <div className="bg-[#3e8dc1fd] text-white text-center text-2xl py-3 rounded-xl font-bold  ">
            करदाता विवरण सारांश
          </div>
          <div className="flex gap-2 py-6 ">
            <div className="bg-gray-200 shadow-xl rounded-xl w-2/3 flex justify-around text-base py-4 font-bold ">
              <div className="gap-2 flex flex-col">
                <div>करदाताको नाम : {apiData.name}</div>

                <div>सम्पर्क नम्बर :{apiData.contactNo}</div>
                <div>ई–मेल ठेगाना : {apiData.email}</div>
              </div>
              <div className="gap-2 flex flex-col">
                <div>करदाता संकेत नं. : {apiData.code}</div>
                <div>पत्राचार गर्ने ठेगाना : {apiData.address}</div>
                <div>नागरिकता नं. : {apiData.citizenshipNo}</div>
              </div>
            </div>
            <div className="bg-gray-200 shadow-xl rounded-xl w-1/3  text-base py-4 font-bold ">
              <div className="flex flex-col gap-1 pl-10">
                <div>
                  अन्तिम पटक कर तिरेको : {apiData.lastPayDetails?.lastPayeMiti}
                </div>
                <div>मिति : {apiData.lastPayDetails?.lastPayYear}</div>
                <div>
                  सम्पत्ति रकम : {apiData.lastPayDetails?.lastPayAmount}
                </div>
                <div>
                  सेवा शुल्क रकम : {apiData.lastPayDetails?.lastPaySewaAmount}
                </div>
                <div>
                  कुल रकम : {apiData.lastPayDetails?.lastPayTotalAmount}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#5195c2fd] text-center text-2xl py-3 rounded-xl font-bold ">
            {" "}
            {apiData.name} सम्पत्ति विवरण
          </div>
          <br />

          <div className="bg-[#81b7dbfd] pl-10 flex justify-between  py-3 rounded-xl  ">
            <div className="font-bold text-xl ">मालपोतको विवरण</div>
            <div
              className="pr-4 cursor-pointer "
              onClick={() => {
                router.push(
                  `/revenue/taxpayerdetail/paytax/landdetail/${apiData?.taxPayerId}`
                );
              }}
            >
              <MdCreateNewFolder size={30} />
            </div>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow className="bg-[#3e8dc1fd]">
                  <TableCell sx={{ fontSize: "20px" }}>क्र.सं.</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}> नक्सा नं.</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}> आर्थिक बर्ष</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>कित्ता नं.</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>क्षेत्रफल</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>रकम</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apiData.taxLandDetail.map((row, index) => {
                  return (
                    <TableRow key={index} className="hover:bg-gray-300">
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{row.nakasaNo}</TableCell>

                      <TableCell>{row.fiscalYearName}</TableCell>

                      <TableCell>{row.kittaNo}</TableCell>
                      <TableCell>{row.area}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <br />

          <div className="bg-[#81b7dbfd] pl-10 flex justify-between  py-3 rounded-xl  ">
            <div className="font-bold text-xl ">घर/तलाको विवरण</div>
            <div
              className="pr-4 cursor-pointer "
              onClick={() => {
                router.push(
                  `/revenue/taxpayerdetail/paytax/buildingdetail/${apiData?.taxPayerId}`
                );
              }}
            >
              <MdCreateNewFolder size={30} />
            </div>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow className="bg-[#3e8dc1fd]">
                  <TableCell sx={{ fontSize: "20px" }}>क्र.सं.</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}> वडा नं.</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}> आर्थिक बर्ष</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>घर प्रकार</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>रकम</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apiData.taxBuildingDetail.map((row, index) => {
                  return (
                    <TableRow key={index} className="hover:bg-gray-300">
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{row.wardNo}</TableCell>

                      <TableCell>{row.fiscalYearName}</TableCell>

                      <TableCell>{row.gharPrakar}</TableCell>
                      <TableCell>{row.rate}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <br />

          <div className="bg-[#81b7dbfd] pl-10 flex justify-between  py-3 rounded-xl  ">
            <div className="font-bold text-xl ">घरबहाल कर विवरण</div>
            <div
              className="pr-4 cursor-pointer "
              onClick={() => {
                router.push(
                  `/revenue/taxpayerdetail/paytax/houserentdetail/${apiData?.taxPayerId}`
                );
              }}
            >
              <MdCreateNewFolder size={30} />
            </div>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow className="bg-[#3e8dc1fd]">
                  <TableCell sx={{ fontSize: "20px" }}>क्र.सं.</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}> आ.ब.</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>जम्मा घर</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}> जम्मा कोठा</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    {" "}
                    जम्मा कोठा (भाडामा)
                  </TableCell>
                  <TableCell sx={{ fontSize: "20px" }}> भाडा रकम</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}> बक्यौता रकम</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apiData.houseRentList.map((row, index) => {
                  return (
                    <TableRow key={index} className="hover:bg-gray-300">
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{row.fiscalYearName}</TableCell>

                      <TableCell>{row.totalBulding}</TableCell>
                      <TableCell>{row.totalRoom}</TableCell>

                      <TableCell>{row.totalRoomOnRent}</TableCell>
                      <TableCell>{row.yearlyRentAmount}</TableCell>
                      <TableCell>{row.outstandingAmount}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <br />

          <div className="bg-[#81b7dbfd] pl-10 flex justify-between  py-3 rounded-xl  ">
            <div className="font-bold text-xl ">सवारी साधनको विवरण</div>
            <div
              className="pr-4 cursor-pointer "
              onClick={() => {
                router.push(
                  `/revenue/taxpayerdetail/paytax/vehicledetail/${apiData?.taxPayerId}`
                );
              }}
            >
              <MdCreateNewFolder size={30} />
            </div>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow className="bg-[#3e8dc1fd]">
                  <TableCell sx={{ fontSize: "20px" }}>क्र.सं.</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    {" "}
                    सवारी साधनको प्रकार
                  </TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    {" "}
                    सवारी साधनको नं.
                  </TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    मूल्यांकन सूचक
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apiData.vehicleDetailList.map((row, index) => {
                  return (
                    <TableRow key={index} className="hover:bg-gray-300">
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{row.type}</TableCell>

                      <TableCell>{row.regNo}</TableCell>

                      <TableCell>{row.amount}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <br />

          <div className="bg-[#81b7dbfd] pl-10 flex justify-between  py-3 rounded-xl  ">
            <div className="font-bold text-xl ">व्यवसायको विवरण</div>
            <div
              className="pr-4 cursor-pointer "
              onClick={() => {
                router.push(
                  `/revenue/taxpayerdetail/paytax/businessdetail/${apiData?.taxPayerId}`
                );
              }}
            >
              <MdCreateNewFolder size={30} />
            </div>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow className="bg-[#3e8dc1fd]">
                  <TableCell sx={{ fontSize: "20px" }}>क्र.सं.</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}> आर्थिक बर्ष</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    {" "}
                    व्यवसायको नाम
                  </TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    व्यवसायको किसिम
                  </TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    {" "}
                    व्यवसाय रहेको ठेगाना
                  </TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    मूल्यांकन सूचक
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody></TableBody>
            </Table>
          </TableContainer>
          <br />
          <div className="bg-[#81b7dbfd] pl-10  py-3 rounded-xl  ">
            <div className="font-bold text-xl "> कर अशुली</div>
          </div>
          <div
            className="pr-4 cursor-pointer flex bg-[#3e8dc1fd] py-3 gap-2 pl-10 "
            onClick={() => {
              router.push(
                `/revenue/taxpayerdetail/paytax/fulltaxdetails/${userId}`
              );
            }}
          >
            <FaEye size={30} /> कर अभिलेख विवरण हेर्न यहाँ क्लिक गर्नुहोस्
          </div>

          <br />
          <div className="bg-[#3e8dc1fd] pl-10 font-bold text-xl flex justify-center  py-3 rounded-xl   ">
            सम्पत्ति कर विवरण सारांश
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100">
            <div className=" flex  justify-end gap-5 px-5 pt-10  ">
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
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow className="bg-[#3e8dc1fd]">
                    <TableCell sx={{ fontSize: "20px" }}>विवरण</TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>
                      {" "}
                      आर्थिक बर्ष
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>छुट</TableCell>
                    <TableCell sx={{ fontSize: "20px" }}> जरीवाना</TableCell>
                    <TableCell sx={{ fontSize: "20px" }}> जम्मा</TableCell>
                    <TableCell sx={{ fontSize: "20px" }}> छनौट</TableCell>
                  </TableRow>
                </TableHead>

                <div className="  pl-2  py-3 bg-gray-300  ">जग्गा कर विवरण</div>
                <TableBody>
                  {apiData?.taxLandDetail?.map((row, index) => {
                    return (
                      <TableRow
                        key={index}
                        className="hover:bg-gray-200 cursor-pointer"
                      >
                        <TableCell component="th" scope="row">
                          {row.area}
                        </TableCell>
                        <TableCell>{row.fiscalYearName}</TableCell>

                        <TableCell className=" w-1/4 ">
                          <div className="flex  gap-4">
                            <div className=" w-1/3">
                              {/* {console.log(
                                discountIdApi?.find(
                                  (d) => d.id === parseInt(discountId[row.id])
                                ),
                                discountId,
                                row.id,
                                discountId[row.id],
                                "fff"
                              )} */}
                              <TextField
                                value={
                                  discountIdApi?.find(
                                    (d) => d.id === parseInt(discountId[row.id])
                                  )?.discountPercent
                                }
                              />
                            </div>
                            <div className="relative z-0  mb-6 group w-1/3 ">
                              <label className="label text-blue-900 ">
                                छुट
                              </label>
                              <select
                                onChange={(e) => handleDiscount(e, row)}
                                className="peer"
                              >
                                <option value={""} disabled selected>
                                  Select The छुट type
                                </option>
                                {discountIdApi.map((items, index) => {
                                  return (
                                    <>
                                      <option key={index} value={items?.id}>
                                        {items.name}
                                      </option>
                                    </>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className=" w-1/4 ">
                          <div className="flex gap-2">
                            <div className=" w-1/3">
                              <TextField
                                value={
                                  fineIdApi?.find(
                                    (d) => d.id === parseInt(fineId[row.id])
                                  )?.penaltyPercent
                                }
                              />
                            </div>
                            <div className="relative z-0  mb-6 group w-1/3 ">
                              <label className="label text-blue-900 ">
                                जरीवाना
                              </label>
                              <select
                                onChange={(e) => handleFine(e, row)}
                                className="peer"
                              >
                                <option value={""} disabled selected>
                                  Select The जरीवाना Type
                                </option>
                                {fineIdApi.map((items, index) => {
                                  return (
                                    <option key={index} value={items?.id}>
                                      {items.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{row.rate}</TableCell>
                        <TableCell>
                          <div className="flex">
                            <div>
                              <FormControlLabel
                                className="pl-4"
                                onChange={(e) => handleCheckbox(e, row)}
                                required
                                control={
                                  <Checkbox value={isCheaked} color="primary" />
                                }
                              />
                            </div>
                            <div>
                              <button className="border-2 py-2 px-1 border-black bg-red-500">
                                Previous Taxes
                              </button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>

                <div className="  pl-2  py-3 bg-gray-300 ">घरको कर विवरण</div>
                <TableBody>
                  {apiData?.taxBuildingDetail?.map((row, index) => {
                    return (
                      <TableRow
                        key={index}
                        className="hover:bg-gray-200 cursor-pointer"
                      >
                        <TableCell component="th" scope="row">
                          {row.gharNo}
                        </TableCell>
                        <TableCell>{row.fiscalYearName}</TableCell>

                        <TableCell>{row.rate}</TableCell>
                        <TableCell className=" w-1/4 ">
                          <div className="flex  gap-4">
                            <div className=" w-1/3">
                              <TextField
                                value={
                                  discountIdApi?.find(
                                    (d) => d.id === parseInt(discountId[row.id])
                                  )?.discountPercent
                                }
                              />
                            </div>
                            <div className="relative z-0  mb-6 group w-1/3 ">
                              <label className="label text-blue-900 ">
                                छुट
                              </label>
                              <select
                                onChange={(e) => handleDiscount(e, row)}
                                className="peer"
                              >
                                <option value={""} disabled selected>
                                  Select The छुट type
                                </option>
                                {discountIdApi.map((items, index) => {
                                  return (
                                    <>
                                      <option key={index} value={items?.id}>
                                        {items.name}
                                      </option>
                                    </>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className=" w-1/4 ">
                          <div className="flex gap-2">
                            <div className=" w-1/3">
                              <TextField
                                value={
                                  fineIdApi?.find(
                                    (d) => d.id === parseInt(fineId[row.id])
                                  )?.penaltyPercent
                                }
                              />
                            </div>
                            <div className="relative z-0  mb-6 group w-1/3 ">
                              <label className="label text-blue-900 ">
                                जरीवाना
                              </label>
                              <select
                                onChange={(e) => handleFine(e, row)}
                                className="peer"
                              >
                                <option value={""} disabled selected>
                                  Select The जरीवाना Type
                                </option>
                                {fineIdApi.map((items, index) => {
                                  return (
                                    <option key={index} value={items?.id}>
                                      {items.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{row.rate}</TableCell>
                        <TableCell>
                          <div className="flex">
                            <div>
                              <FormControlLabel
                                className="pl-4"
                                onChange={(e) => handleCheckbox(e, row)}
                                required
                                control={
                                  <Checkbox value={isCheaked} color="primary" />
                                }
                              />
                            </div>
                            <div>
                              <button className="border-2 py-2 px-1 border-black bg-red-500">
                                Previous Taxes
                              </button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>

                <div className="  pl-2  py-3 bg-gray-300  ">
                  घर बहालको कर विवरण
                </div>
                <TableBody>
                  {apiData?.houseRentList?.map((row, index) => {
                    return (
                      <TableRow
                        key={index}
                        className="hover:bg-gray-200 cursor-pointer"
                      >
                        <TableCell component="th" scope="row">
                          {row.buildingCodeNo}
                        </TableCell>
                        <TableCell>{row.fiscalYearName}</TableCell>

                        <TableCell>{row.amount}</TableCell>
                        <TableCell className=" w-1/4 ">
                          <div className="flex  gap-4">
                            <div className=" w-1/3">
                              <TextField
                                value={
                                  discountIdApi?.find(
                                    (d) => d.id === parseInt(discountId[row.id])
                                  )?.discountPercent
                                }
                              />
                            </div>
                            <div className="relative z-0  mb-6 group w-1/3 ">
                              <label className="label text-blue-900 ">
                                छुट
                              </label>
                              <select
                                onChange={(e) => handleDiscount(e, row)}
                                className="peer"
                              >
                                <option value={""} disabled selected>
                                  Select The छुट type
                                </option>
                                {discountIdApi.map((items, index) => {
                                  return (
                                    <>
                                      <option key={index} value={items?.id}>
                                        {items.name}
                                      </option>
                                    </>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className=" w-1/4 ">
                          <div className="flex gap-2">
                            <div className=" w-1/3">
                              <TextField
                                value={
                                  fineIdApi?.find(
                                    (d) => d.id === parseInt(fineId[row.id])
                                  )?.penaltyPercent
                                }
                              />
                            </div>
                            <div className="relative z-0  mb-6 group w-1/3 ">
                              <label className="label text-blue-900 ">
                                जरीवाना
                              </label>
                              <select
                                onChange={(e) => handleFine(e, row)}
                                className="peer"
                              >
                                <option value={""} disabled selected>
                                  Select The जरीवाना Type
                                </option>
                                {fineIdApi.map((items, index) => {
                                  return (
                                    <option key={index} value={items?.id}>
                                      {items.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{row.amount}</TableCell>
                        <TableCell>
                          <div className="flex">
                            <div>
                              <FormControlLabel
                                className="pl-4"
                                onChange={(e) => handleCheckbox(e, row)}
                                required
                                control={
                                  <Checkbox value={isCheaked} color="primary" />
                                }
                              />
                            </div>
                            <div>
                              <button className="border-2 py-2 px-1 border-black bg-red-500">
                                Previous Taxes
                              </button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>

                <div className="  pl-2  py-3 bg-gray-300 ">
                  सवारी साधनको कर विवरण
                </div>
                <TableBody>
                  {apiData?.vehicleDetailList?.map((row, index) => {
                    return (
                      <TableRow
                        key={index}
                        className="hover:bg-gray-200 cursor-pointer"
                      >
                        <TableCell component="th" scope="row">
                          {row.type}
                        </TableCell>
                        <TableCell>{row.fiscalYearName}</TableCell>

                        <TableCell>{row.amount}</TableCell>
                        <TableCell className=" w-1/4 ">
                          <div className="flex  gap-4">
                            <div className=" w-1/3">
                              <TextField
                                value={
                                  discountIdApi?.find(
                                    (d) => d.id === parseInt(discountId[row.id])
                                  )?.discountPercent
                                }
                              />
                            </div>
                            <div className="relative z-0  mb-6 group w-1/3 ">
                              <label className="label text-blue-900 ">
                                छुट
                              </label>
                              <select
                                onChange={(e) => handleDiscount(e, row)}
                                className="peer"
                              >
                                <option value={""} disabled selected>
                                  Select The छुट type
                                </option>
                                {discountIdApi.map((items, index) => {
                                  return (
                                    <>
                                      <option key={index} value={items?.id}>
                                        {items.name}
                                      </option>
                                    </>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className=" w-1/4 ">
                          <div className="flex gap-2">
                            <div className=" w-1/3">
                              <TextField
                                value={
                                  fineIdApi?.find(
                                    (d) => d.id === parseInt(fineId[row.id])
                                  )?.penaltyPercent
                                }
                              />
                            </div>
                            <div className="relative z-0  mb-6 group w-1/3 ">
                              <label className="label text-blue-900 ">
                                जरीवाना
                              </label>
                              <select
                                onChange={(e) => handleFine(e, row)}
                                className="peer"
                              >
                                <option value={""} disabled selected>
                                  Select The जरीवाना Type
                                </option>
                                {fineIdApi.map((items, index) => {
                                  return (
                                    <option key={index} value={items?.id}>
                                      {items.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{row.amount}</TableCell>
                        <TableCell>
                          <div className="flex">
                            <div>
                              <FormControlLabel
                                className="pl-4"
                                onChange={(e) => handleCheckbox(e, row)}
                                required
                                control={
                                  <Checkbox value={isCheaked} color="primary" />
                                }
                              />
                            </div>
                            <div>
                              <button className="border-2 py-2 px-1 border-black bg-red-500">
                                Previous Taxes
                              </button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <div className="bg-[#3e8dc1fd] pl-10 font-bold text-xl flex justify-center  py-3 rounded-xl   ">
              अन्य वस्तु तथा सेवा शुल्क कर विवरण
            </div>
            <div className="pt-4">
              <div className=" bg-gray-200 text-2xl font-bold items-center flex justify-center pt-2 border-black border-2 pb-2  ">
                राशिद विवरण
              </div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow className="bg-[#3e8dc1fd]">
                      <TableCell sx={{ fontSize: "20px" }}>S.No</TableCell>
                      <TableCell sx={{ fontSize: "20px" }}>
                        बस्तु/सेवा
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }}>रकम</TableCell>
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
                            {data.id}
                          </TableCell>
                          <TableCell>{data.amount}</TableCell>

                          <TableCell
                            className="pl-7 cursor-pointer hover:text-red-900  "
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
            <div className="flex pt-10 gap-2 ">
              <form className="justify-end gap-5 px-5 py-14 w-3/4 grid lg:grid-cols-5 h-1/3  border-black border-[1.5px] border-dashed shadow-2xl bg-gray-100 pl-10 ">
                <div className="relative  w-full  group">
                  <label className="label text-blue-900 ">Service</label>
                  <select
                    onChange={handleServiceRate}
                    required
                    className="peer"
                  >
                    <option value={""} disabled selected>
                      Select The Service
                    </option>
                    {serviceRateApi.map((items, index) => {
                      return (
                        <>
                          <option key={index} value={items?.serviceId}>
                            {items.serviceName}
                          </option>
                        </>
                      );
                    })}
                  </select>
                  {serviceRateMsg}
                </div>

                <div className="relative z-0 w-full  group">
                  <input
                    type="number"
                    className="peer"
                    onChange={handleAmount}
                    placeholder="."
                  />
                  <label className="label">Amount</label>
                  <p> {amountMsg}</p>
                </div>

                <div>
                  <button
                    className="border-2 bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% border-dotted px-5 bg-gray-300 py-2 hover:bg-blue-100"
                    onClick={handleInvoice}
                  >
                    राशिद थप्नुहोस्
                  </button>
                </div>
              </form>

              <div className=" w-1/4  rounded  border-black border-[1.5px] border-dashed shadow-2xl bg-slate-300 pt-4 ">
                <div>
                  <div className="flex justify-center pt-2  text-lg  italic decoration-double underline ">
                    Tax Amount Here !!!
                  </div>
                  <div className="flex lg:gap-10 text-3xl py-2 justify-center ">
                    <p className="text-xl">जम्मा कर रकम रूः </p>
                    <p className="text-xl"> 8000 /-</p>
                  </div>
                  <div className="flex lg:gap-10 text-3xl py-2 justify-center ">
                    <p className="text-xl">अन्य सेवा शुल्क रूः </p>
                    <p className="text-xl"> 8000 /-</p>
                  </div>
                  <div className="flex lg:gap-10 text-3xl py-2 justify-center ">
                    <p className="text-xl">छुट रकम रूः </p>
                    <p className="text-xl pl-12"> 8000 /-</p>
                  </div>
                  <div className="flex lg:gap-10 text-3xl py-2 justify-center ">
                    <p className="text-xl">जरिवाना रकम रूः </p>
                    <p className="text-xl pl-4 "> 8000 /-</p>
                  </div>
                  <div className="flex lg:gap-10 text-3xl py-2 justify-center ">
                    <p className="text-xl">तिरेको रकम रूः</p>
                    <p className="text-xl pl-8 "> 8000 /-</p>
                  </div>
                  <div className="flex lg:gap-10 text-3xl py-2 justify-center ">
                    <p className="text-xl">कूल जम्मा रूः </p>
                    <p className="text-xl pl-10 "> 8000 /-</p>
                  </div>
                  <div className="flex lg:gap-10 text-3xl py-2 justify-center ">
                    <p className="text-xl">अन्य सेवा शुल्क रूः </p>
                    <p className="text-xl"> 8000 /-</p>
                  </div>
                  <div className="flex lg:gap-14 text-3xl justify-center ">
                    <p className="text-xl pl-10">दिइएको रकम रूः </p>
                    <input
                      className="w-1/3 text-xl "
                      onChange={handleGivenAmount}
                      value={givenAmount}
                      defaultValue={"1000"}
                    />
                  </div>
                  <div className="flex lg:gap-10 text-3xl py-2 justify-center ">
                    <p className="text-xl">फिर्ती रकम रूः </p>
                    <p className="text-xl pl-10"> 8000 /-</p>
                  </div>
                </div>
                {/* {arrayData.length >= 1 ? ( */}
                <div className="pl-24 py-4   ">
                  <div className="flex gap-2 bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90%  py-3 shadow-lg rounded-md w-36 justify-center hover:bg-blue-300 cursor-pointer ">
                    <div className="pt-1">
                      <FaPlus />
                    </div>
                    <button type="submit" className="text-sm font-extralight ">
                      {isSubmitting ? "Submitting..." : "Add Tax Payer"}
                    </button>
                  </div>
                </div>
                {/* ) : (
                  <div className="pl-24 pt-4 pb-10 ">
                    <div className="flex gap-2 bg-[#89bde1fd]  py-3 shadow-lg rounded-md w-32 justify-center hover:bg-blue-300 cursor-pointer ">
                      <div className="text-sm font-extralight cursor-not-allowed ">
                        {"Add Invoice Bill First "}
                      </div>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </form>
        </React.Fragment>
      )}
    </>
  );
};

export default PayTaxById;
