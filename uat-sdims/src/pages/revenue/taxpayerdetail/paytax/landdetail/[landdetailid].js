import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import CommonHeaderDesign from "../../../../../components/reusableDesign/CommonHeaderDesign";
import SeoOptimization from "../../../../../components/reusableDesign/SeoOptimzation";
import ViewPage from "../../../../../components/viewPage/ViewPage";
import { fiscal } from "../../../../../services/apiServices/common/fiscal/fiscalService";
import { oldVdc } from "../../../../../services/apiServices/common/oldVdc/oldVdcService";
import { ward } from "../../../../../services/apiServices/common/ward/wardService";
import { taxCategory } from "../../../../../services/apiServices/revenue/taxCategory/taxCategoryService";
import { landDetialValidationResolver } from "../../../../../utils/validateField";
import { taxSubCategory } from "../../../../../services/apiServices/revenue/taxSubCategory/taxSubCategoryServices";
import {
  Checkbox,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  createMultiplelandDetail,
  getTaxRateNames,
} from "../../../../../services/apiServices/revenue/landDetail/landDetailService";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import AddButton from "../../../../../components/reusableDesign/AddButton";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const Index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ resolver: landDetialValidationResolver });

  const router = useRouter();
  const userId = router?.query?.landdetailid;

  // form mUltiple step
  const [formDataArray, setFormDataArray] = useState([
    {
      kittaNo: "",
      naksaNo: "",
      wardId: "",
      oldVdcId: "",
      oldWardNo: "",
      taxStartFiscalYearId: "",
      taxCategoryId: "",
      taxSubCategoryId: "",
      taxRateNameId: "",
      isSangyukta: "",
      sangyuktaCitizeNo: "",
      sangyuktaName: "",
      chooseLand: "",
      taxPayerId: "",
      totalRopani: "",
      evaRopani: "",
      totalAana: "",
      evaAana: "",
      totalPaisa: "",
      evaPaisa: "",
      totalDam: "",
      evaDam: "",
      totalRopaniSquareMiter: "",
      evaRopaniSquareMiter: "",
      totalBigaha: "",
      totalKattha: "",
      totalDhur: "",
      totalKanwai: "",
      totalKanwa: "",
      totalBigaSquareMiter: "",
      evaBigaha: "",
      evaKattha: "",
      evaDhur: "",
      evaKanwa: "",
      evaKanwai: "",
      evaBigaSquareMiter: "",
    },
  ]);
  const handleAddForm = () => {
    setFormDataArray([
      ...formDataArray,
      {
        kittaNo: "",
        naksaNo: "",
        wardId: "",
        oldVdcId: "",
        oldWardNo: "",
        taxStartFiscalYearId: "",
        taxCategoryId: "",
        taxSubCategoryId: "",
        taxRateNameId: "",
        isSangyukta: "",
        sangyuktaCitizeNo: "",
        sangyuktaName: "",
        chooseLand: "",
        taxPayerId: "",
        totalRopani: "",
        evaRopani: "",
        totalAana: "",
        evaAana: "",
        totalPaisa: "",
        evaPaisa: "",
        totalDam: "",
        evaDam: "",
        totalRopaniSquareMiter: "",
        evaRopaniSquareMiter: "",
        totalBigaha: "",
        totalKattha: "",
        totalDhur: "",
        totalKanwai: "",
        totalKanwa: "",
        totalBigaSquareMiter: "",
        evaBigaha: "",
        evaKattha: "",
        evaDhur: "",
        evaKanwa: "",
        evaKanwai: "",
        evaBigaSquareMiter: "",
      },
    ]);
  };
  const handleDeleteForm = (index) => {
    const newFormDataArray = [...formDataArray];
    newFormDataArray.splice(index, 1);
    setFormDataArray(newFormDataArray);
  };

  const onSubmit = (data) => {
    // const updatedFormDataArray = formDataArray.map((formData, index) => {
    //   return {
    //     kittaNo: data.kittaNo[index],
    //     naksaNo: data.naksaNo[index],
    //     wardId: data.wardId[index],
    //     oldVdcId: data.oldVdcId[index],
    //     oldWardNo: data.oldWardNo[index],
    //     taxStartFiscalYearId: data.taxStartFiscalYearId[index],
    //     taxCategoryId: data.taxCategoryId[index],
    //     taxSubCategoryId: data.taxSubCategoryId[index],
    //     taxRateNameId: data.taxRateNameId[index],
    //     isSangyukta: data.isSangyukta[index],
    //     sangyuktaCitizeNo: data.sangyuktaCitizeNo[index],
    //     sangyuktaName: data.sangyuktaName[index],
    //     chooseLand: data.chooseLand[index],
    //     taxPayerId: data.taxPayerId[index],
    //     totalRopani: data.totalRopani[index],
    //     evaRopani: data.evaRopani[index],
    //     totalAana: data.totalAana[index],
    //     evaAana: data.evaAana[index],
    //     totalPaisa: data.totalPaisa[index],
    //     evaPaisa: data.evaPaisa[index],
    //     totalDam: data.totalDam[index],
    //     evaDam: data.evaDam[index],
    //     totalRopaniSquareMiter: data.totalRopaniSquareMiter[index],
    //     evaRopaniSquareMiter: data.evaRopaniSquareMiter[index],
    //     totalBigaha: data.totalBigaha[index],
    //     totalKattha: data.totalKattha[index],
    //     totalDhur: data.totalDhur[index],
    //     totalKanwai: data.totalKanwai[index],
    //     totalKanwa: data.totalKanwa[index],
    //     totalBigaSquareMiter: data.totalBigaSquareMiter[index],
    //     evaBigaha: data.evaBigaha[index],
    //     evaKattha: data.evaKattha[index],
    //     evaDhur: data.evaDhur[index],
    //     evaKanwa: data.evaKanwa[index],
    //     evaKanwai: data.evaKanwai[index],
    //     evaBigaSquareMiter: data.evaBigaSquareMiter[index],
    //   };
    // });
    // setFormDataArray(updatedFormDataArray);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (wardValue === 0) {
          setWardMsg(<p>This field is required</p>);
        } else if (fiscalValue === 0) {
          setFiscalMsg(<p>This field is required</p>);
        } else if (taxCategoryValue === 0) {
          setTaxCategoryMsg(<p>This field is required</p>);
        } else if (taxSubCategoryValue === 0) {
          setTaxSubCategoryMsg(<p>This field is required</p>);
        } else if (indexTaxRateValue === 0) {
          setIndexTaxRateMsg(<p>This field is required</p>);
        } else {
          data = [
            {
              ...data,
              wardId: wardValue,
              oldVdcId: oldVdcValue,
              taxStartFiscalYearId: fiscalValue,
              taxCategoryId: taxCategoryValue,
              taxRateNameId: indexTaxRateValue,
              isSangyukta: checked,
              chooseLand: mapanValue,
              taxPayerId: userId,
              taxSubCategoryId: taxSubCategoryValue,
              totalRopani: totalRopani,
              evaRopani: evaRopani,
              totalAana: totalAana,
              evaAana: evaAana,
              totalPaisa: totalPaisa,
              evaPaisa: evaPaisa,
              totalDam: totalDam,
              evaDam: evaDam,
              totalRopaniSquareMiter: totalRopaniSquareMiter,
              evaRopaniSquareMiter: evaRopaniSquareMiter,
              totalBigaha: totalBigaha,
              totalKattha: totalKattha,
              totalDhur: totalDhur,
              totalKanwai: 0,
              totalKanwa: 0,
              totalBigaSquareMiter: totalBigaSquareMiter,
              evaBigaha: evaBigaha,
              evaKattha: evaKattha,
              evaDhur: evaDhur,
              evaKanwa: 0,
              evaKanwai: 0,
              evaBigaSquareMiter: evaBigaSquareMiter,
            },
          ];

          try {
            createMultiplelandDetail(data).then((response) => {
              if (response.status === true) {
                toast.success(response.message, {
                  icon: "🚀",
                  autoClose: 1000,
                });
                router.push(`/revenue/taxpayerdetail/paytax/${userId}`);
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
        }
        resolve();
      }, 2000);
    });
  };

  // for ward
  const [wardId, setWardId] = useState([0]);
  const [wardValue, setWardValue] = useState(0);
  const [wardMsg, setWardMsg] = useState("");

  const handleWard = (e) => {
    setWardValue(e.target.value);
  };
  useEffect(() => {
    let getWardById = () => {
      ward(0).then((response) => {
        try {
          response.status === true;
          {
            setWardId(response.data);
          }
        } catch (error) {}
      });
    };
    getWardById();
  }, []);

  //   forl old vdc
  const [oldVdcId, setOldVdcId] = useState([0]);
  const [oldVdcValue, setOldVdcValue] = useState(0);

  const handleOldVdc = (e) => {
    setOldVdcValue(e.target.value);
  };
  useEffect(() => {
    let getOldVdcById = () => {
      oldVdc(0).then((response) => {
        try {
          response.status === true;
          {
            setOldVdcId(response.data);
          }
        } catch (error) {}
      });
    };
    getOldVdcById();
  }, []);

  //   for FISCAL
  const [fiscalId, setFiscalId] = useState([0]);
  const [fiscalValue, setFiscalValue] = useState(0);
  const [fiscalMsg, setFiscalMsg] = useState("");

  const handleFiscal = (e) => {
    setFiscalValue(e.target.value);
  };
  useEffect(() => {
    let getFiscalById = () => {
      fiscal(0).then((response) => {
        try {
          response.status === true;
          {
            setFiscalId(response.data);
          }
        } catch (error) {}
      });
    };
    getFiscalById();
  }, []);

  //   for tax category
  const [taxCategoryId, setTaxCategoryId] = useState([0]);
  const [taxCategoryValue, setTaxCategoryValue] = useState(0);
  const [taxCategoryMsg, setTaxCategoryMsg] = useState("");

  const handleTaxCategory = (e) => {
    setTaxCategoryValue(e.target.value);
  };
  useEffect(() => {
    let getTaxCategoryById = () => {
      taxCategory(0).then((response) => {
        try {
          response.status === true;
          {
            setTaxCategoryId(response.data);
          }
        } catch (error) {}
      });
    };
    getTaxCategoryById();
  }, []);

  //   for tax sub category
  const [taxSubCategoryId, setTaxSubCategoryId] = useState([0]);
  const [taxSubCategoryValue, setTaxSubCategoryValue] = useState(0);
  const [taxSubCategoryMsg, setTaxSubCategoryMsg] = useState("");

  const handleTaxSubCategory = (e) => {
    setTaxSubCategoryValue(e.target.value);
  };
  useEffect(() => {
    let getTaxSubCategoryById = () => {
      if (taxCategoryValue !== 0) {
        taxSubCategory(taxCategoryValue).then((response) => {
          try {
            response.status === true;
            {
              setTaxSubCategoryId(response.data);
            }
          } catch (error) {}
        });
      }
    };
    getTaxSubCategoryById();
  }, [taxCategoryValue]);

  //   for index tax rate
  const [indexTaxRateId, setIndexTaxRateId] = useState([0]);
  const [indexTaxRateValue, setIndexTaxRateValue] = useState(0);
  const [indexTaxRateMsg, setIndexTaxRateMsg] = useState("");

  const handleIndexTaxRate = (e) => {
    setIndexTaxRateValue(e.target.value);
  };
  useEffect(() => {
    let getIndexTaxRateById = () => {
      getTaxRateNames(taxSubCategoryValue, fiscalValue).then((response) => {
        try {
          response.status === true;
          {
            setIndexTaxRateId(response.data);
          }
        } catch (error) {}
      });
    };
    getIndexTaxRateById();
  }, [taxSubCategoryValue, fiscalValue]);

  // state to check remember me & function
  const [checked, setChecked] = useState(false);
  const handleCheckbox = () => {
    setChecked(!checked);
  };

  //   for mapan
  const [mapanValue, setMapanValue] = useState(0);
  const handleMapan = (e) => {
    setMapanValue(e.target.value);
  };
  // for Ropani
  const [totalRopani, setTotalRopani] = useState(0);
  const [evaRopani, setEvaRopani] = useState(0);

  const handleRopani = (e) => {
    setTotalRopani(e.target.value);
  };

  const handleEvaRopani = (e) => {
    setEvaRopani(e.target.value);
  };
  // for ana
  const [totalAana, setTotalAana] = useState(0);
  const [evaAana, setEvaAana] = useState(0);
  const handleAna = (e) => {
    setTotalAana(e.target.value);
  };

  const handleEvaAna = (e) => {
    setEvaAana(e.target.value);
  };

  // for paisa
  const [totalPaisa, setTotalPaisa] = useState(0);
  const [evaPaisa, setEvaPaisa] = useState(0);
  const handlePaisa = (e) => {
    setTotalPaisa(e.target.value);
  };

  const handleEvaPaisa = (e) => {
    setEvaPaisa(e.target.value);
  };

  // for dham
  const [totalDam, setTotalDam] = useState(0);
  const [evaDam, setEvaDam] = useState(0);
  const handleDham = (e) => {
    setTotalDam(e.target.value);
  };

  const handleEvaDam = (e) => {
    setEvaDam(e.target.value);
  };

  //  for sq mtr
  let totalRopaniSquareMiter =
    totalRopani * 508.737047 +
    totalAana * 31.79606544 +
    totalPaisa * 7.94901636 +
    totalDam * 1.98725409;
  let evaRopaniSquareMiter =
    evaRopani * 508.737047 +
    evaAana * 31.79606544 +
    evaPaisa * 7.94901636 +
    evaDam * 1.98725409;
  // bigha
  const [totalBigaha, setTotalBigaha] = useState(0);
  const [evaBigaha, setEvaBigaha] = useState(0);
  const handleBigha = (e) => {
    setTotalBigaha(e.target.value);
  };
  const handleEvaBigha = (e) => {
    setEvaBigaha(e.target.value);
  };

  // kathha
  const [totalKattha, setTotalKattha] = useState(0);
  const [evaKattha, setEvaKattha] = useState(0);

  const handleKatha = (e) => {
    setTotalKattha(e.target.value);
  };

  const handleEvaKathha = (e) => {
    setEvaKattha(e.target.value);
  };

  // dhur
  const [totalDhur, setTotalDhur] = useState(0);
  const [evaDhur, setEvaDhur] = useState(0);
  const handleDhur = (e) => {
    setTotalDhur(e.target.value);
  };
  const handleEvaDhur = (e) => {
    setEvaDhur(e.target.value);
  };

  // for sq mttr
  let totalBigaSquareMiter =
    totalBigaha * 6772.631616 +
    totalKattha * 338.6315808 +
    totalDhur * 16.93157904;
  let evaBigaSquareMiter =
    evaBigaha * 6772.631616 + evaKattha * 338.6315808 + evaDhur * 16.93157904;

  return (
    <React.Fragment>
      <SeoOptimization title={"Land Detail"} />
      <CommonHeaderDesign title={"मालपोतको विवरण राख्नुहोस"} />
      <div className="flex justify-end">
        <button
          className="bg-red-500 px-2 py-3 rounded shadow-lg  "
          onClick={handleAddForm}
        >
          Add New Form
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formDataArray.map((formData, index) => {
          return (
            <div key={index}>
              <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 ">
                
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer"
                    {...register("kittaNo")}
                    placeholder="."
                  />
                  <label className="label">कित्ता नं</label>
                  <p> {errors?.kittaNo?.message}</p>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer"
                    {...register("naksaNo")}
                    placeholder="."
                  />
                  <label className="label">नक्सा नं</label>
                  <p> {errors?.naksaNo?.message}</p>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <label className="label text-blue-900 ">वडा न</label>
                  <select
                    onChange={handleWard}
                    value={wardValue}
                    className="peer"
                  >
                    <option value={0} disabled>
                      Select the Ward
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
                  <label className="label text-blue-900 ">
                    साविकको गा.बि.स
                  </label>
                  <select
                    onChange={handleOldVdc}
                    value={oldVdcValue}
                    className="peer"
                  >
                    <option value={0} disabled>
                      Select the Old Vdc
                    </option>

                    {oldVdcId.map((items, index) => {
                      return (
                        <option key={index} value={items?.id}>
                          {items.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="number"
                    className="peer"
                    {...register("oldWardNo")}
                    placeholder="."
                  />
                  <label className="label">साविकको वडा न</label>
                  <p> {errors?.oldWardNo?.message}</p>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <label className="label text-blue-900 ">
                    कर सुरु आर्थिक वर्ष
                  </label>
                  <select
                    onChange={handleFiscal}
                    value={fiscalValue}
                    className="peer"
                  >
                    <option value={0} disabled>
                      Select the fiscal year
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
                  <label className="label text-blue-900 ">
                    कमुल्याङ्कन समूह
                  </label>
                  <select
                    onChange={handleTaxCategory}
                    value={taxCategoryValue}
                    className="peer"
                  >
                    <option value={0} disabled>
                      Select the Tax Category
                    </option>

                    {taxCategoryId.map((items, index) => {
                      return (
                        <option key={index} value={items?.id}>
                          {items.name}
                        </option>
                      );
                    })}
                  </select>
                  {taxCategoryMsg}
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <label className="label text-blue-900 ">
                    मुल्याङ्कन उपसमूह
                  </label>
                  <select
                    onChange={handleTaxSubCategory}
                    value={taxSubCategoryValue}
                    className="peer"
                  >
                    {taxCategoryValue === 0 ? (
                      <>
                        <option value={0} disabled selected>
                          Select First Tax Category
                        </option>
                      </>
                    ) : (
                      <option value={0} disabled selected>
                        Select the Tax Sub Category
                      </option>
                    )}

                    {taxSubCategoryId.map((items, index) => {
                      return (
                        <option key={index} value={items?.id}>
                          {items.name}
                        </option>
                      );
                    })}
                  </select>
                  {taxSubCategoryMsg}
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <label className="label text-blue-900 ">दर रेट</label>
                  <select
                    onChange={handleIndexTaxRate}
                    value={indexTaxRateValue}
                    className="peer"
                  >
                    {fiscalValue === 0 ? (
                      <>
                        <option value={0} disabled>
                          Select the Fiscal Year First
                        </option>
                      </>
                    ) : (
                      <>
                        <option value={0} disabled>
                          Select the Tax Rate
                        </option>
                      </>
                    )}

                    {indexTaxRateId?.map((items, index) => {
                      return (
                        <option key={index} value={items?.id}>
                          {items.name}
                        </option>
                      );
                    })}
                  </select>
                  {indexTaxRateMsg}
                </div>
              </div>
              <FormControlLabel
                className="pl-4"
                onChange={handleCheckbox}
                control={<Checkbox value="remember" color="primary" />}
                label="संग्युक्त"
              />
              {checked ? (
                <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 ">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="string"
                      className="peer"
                      {...register("sangyuktaName")}
                      placeholder="."
                    />
                    <label className="label">पुरा नाम</label>
                    <p> {errors?.sangyuktaName?.message}</p>
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="number"
                      className="peer"
                      {...register("sangyuktaCitizeNo")}
                      placeholder="."
                    />
                    <label className="label">नागरिकता नं</label>
                    <p> {errors?.sangyuktaCitizeNo?.message}</p>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% text-center text-2xl py-3 rounded-xl font-bold ">
                जग्गाको जम्मा क्षेत्रफल : जग्गा मापन एकाइ [रोपनी-आना-पैसा-दाम]
              </div>

              <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 ">
                <div className="relative z-0 w-full mb-6 group">
                  <label className="label text-blue-900 ">मापन एकाइ</label>
                  <select
                    onChange={handleMapan}
                    value={mapanValue}
                    className="peer"
                    required
                  >
                    <option disabled selected value={0}>
                      Select the मापन एकाइ
                    </option>
                    <option value={1}>Ropani-ana-paisa-dam</option>
                    <option value={2}>Bigha-katha-dhur</option>
                  </select>
                </div>
              </div>

              {mapanValue == 1 ? (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>रोपनी</StyledTableCell>
                        <StyledTableCell>आना</StyledTableCell>
                        <StyledTableCell>पैसा</StyledTableCell>
                        <StyledTableCell>दाम</StyledTableCell>
                        <StyledTableCell>वर्ग मिटर</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell>कुल क्षेत्रफल</StyledTableCell>
                        <StyledTableCell>
                          <TextField
                            type="number"
                            onChange={handleRopani}
                            value={totalRopani}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <TextField
                            type={"number"}
                            onChange={handleAna}
                            value={totalAana}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <TextField
                            type={"number"}
                            onChange={handlePaisa}
                            value={totalPaisa}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <TextField
                            type={"number"}
                            onChange={handleDham}
                            value={totalDam}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <TextField value={totalRopaniSquareMiter} />
                        </StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow>
                        <StyledTableCell>मूल्यांकन हुने</StyledTableCell>
                        <StyledTableCell>
                          <TextField
                            type={"number"}
                            onChange={handleEvaRopani}
                            value={evaRopani}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <TextField
                            type={"number"}
                            onChange={handleEvaAna}
                            value={evaAana}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <TextField
                            type={"number"}
                            onChange={handleEvaPaisa}
                            value={evaPaisa}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <TextField
                            type={"number"}
                            onChange={handleEvaDam}
                            value={evaDam}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <TextField value={evaRopaniSquareMiter} />
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : mapanValue == 2 ? (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>बिगाह</StyledTableCell>
                        <StyledTableCell> कट्ठा</StyledTableCell>
                        <StyledTableCell> धुर</StyledTableCell>
                        <StyledTableCell> वर्ग मिटर</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell>कुल क्षेत्रफल</StyledTableCell>
                        <StyledTableCell>
                          <TextField
                            type={"number"}
                            onChange={handleBigha}
                            value={totalBigaha}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <TextField
                            type={"number"}
                            onChange={handleKatha}
                            value={totalKattha}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <TextField
                            type={"number"}
                            onChange={handleDhur}
                            value={totalDhur}
                          />
                        </StyledTableCell>

                        <StyledTableCell>
                          <TextField value={totalBigaSquareMiter} />
                        </StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow>
                        <StyledTableCell>मूल्यांकन हुने</StyledTableCell>
                        <StyledTableCell>
                          <TextField
                            type={"number"}
                            onChange={handleEvaBigha}
                            value={evaBigaha}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <TextField
                            type={"number"}
                            onChange={handleEvaKathha}
                            value={evaKattha}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <TextField
                            type={"number"}
                            onChange={handleEvaDhur}
                            value={evaDhur}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <TextField value={evaBigaSquareMiter} />
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                ""
              )}
              {formDataArray.length > 1 &&  <div className="flex justify-end pt-2" >
                <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
                onClick={() => handleDeleteForm(index)}
              >
                Delete Form
              </button>
              </div> }
             
            <hr className=" h-1 my-4 bg-gray-900 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

            </div>
          );
        })}
        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </React.Fragment>
  );
};

export default Index;


// ["a","b","c", "d"]

// ["a"]
// ["a","b"]
// ["a","b","c"]
// ["a","b","c","d"]
// [].map((item, index)=>{
//   return(
//     <FormComponent
//     key = {index}
//     />
//   )
// })




// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { FaPlus } from "react-icons/fa";
// import CommonHeaderDesign from "../../../../../components/reusableDesign/CommonHeaderDesign";
// import SeoOptimization from "../../../../../components/reusableDesign/SeoOptimzation";
// import ViewPage from "../../../../../components/viewPage/ViewPage";
// import { fiscal } from "../../../../../services/apiServices/common/fiscal/fiscalService";
// import { oldVdc } from "../../../../../services/apiServices/common/oldVdc/oldVdcService";
// import { ward } from "../../../../../services/apiServices/common/ward/wardService";
// import { taxCategory } from "../../../../../services/apiServices/revenue/taxCategory/taxCategoryService";
// import { landDetialValidationResolver } from "../../../../../utils/validateField";
// import { taxSubCategory } from "../../../../../services/apiServices/revenue/taxSubCategory/taxSubCategoryServices";
// import { indexTaxRate } from "../../../../../services/apiServices/revenue/indextaxrate/indextaxrateservice";
// import {
//   Checkbox,
//   FormControlLabel,
//   Paper,
//   Table,
//   TableBody,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import { createMultiplelandDetail, getTaxRateNames } from "../../../../../services/apiServices/revenue/landDetail/landDetailService";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));
// const Index = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     setValue,
//   } = useForm({ resolver: landDetialValidationResolver });

//   const onSubmit = (data) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         if (wardValue === 0) {
//           setWardMsg(<p>This field is required</p>);
//         } else if (fiscalValue === 0) {
//           setFiscalMsg(<p>This field is required</p>);
//         } else if (taxCategoryValue === 0) {
//           setTaxCategoryMsg(<p>This field is required</p>);
//         } else if (taxSubCategoryValue === 0) {
//           setTaxSubCategoryMsg(<p>This field is required</p>);
//         } else if (indexTaxRateValue === 0) {
//           setIndexTaxRateMsg(<p>This field is required</p>);
//         } else {
//           data = [
//             {
//               ...data,
//               wardId: wardValue,
//               oldVdcId: oldVdcValue,
//               taxStartFiscalYearId: fiscalValue,
//               taxCategoryId: taxCategoryValue,
//               taxRateNameId: indexTaxRateValue,
//               isSangyukta: checked,
//               chooseLand : mapanValue
//             },
//           ];
//           try {
//             createMultiplelandDetail(data).then((response) => {
//               if (response.status === true) {
//                 toast.success(response.message, {
//                   icon: "🚀",
//                   autoClose: 1000,
//                 });
//                 router.push(`/revenue/taxpayerdetail/paytax/${id}`);
//               }
//               return;
//             });
//           } catch (error) {
//             toast.error(error.message);
//           }
//         }
//         resolve();
//       }, 2000);
//     });
//   };

//   // for ward
//   const [wardId, setWardId] = useState([0]);
//   const [wardValue, setWardValue] = useState(0);
//   const [wardMsg, setWardMsg] = useState("");

//   const handleWard = (e) => {
//     setWardValue(e.target.value);
//   };
//   useEffect(() => {
//     let getWardById = () => {
//       ward(0).then((response) => {
//         try {
//           response.status === true;
//           {
//             setWardId(response.data);
//           }
//         } catch (error) {}
//       });
//     };
//     getWardById();
//   }, []);

//   //   forl old vdc
//   const [oldVdcId, setOldVdcId] = useState([0]);
//   const [oldVdcValue, setOldVdcValue] = useState(0);

//   const handleOldVdc = (e) => {
//     setOldVdcValue(e.target.value);
//   };
//   useEffect(() => {
//     let getOldVdcById = () => {
//       oldVdc(0).then((response) => {
//         try {
//           response.status === true;
//           {
//             setOldVdcId(response.data);
//           }
//         } catch (error) {}
//       });
//     };
//     getOldVdcById();
//   }, []);

//   //   for FISCAL
//   const [fiscalId, setFiscalId] = useState([0]);
//   const [fiscalValue, setFiscalValue] = useState(0);
//   const [fiscalMsg, setFiscalMsg] = useState("");

//   const handleFiscal = (e) => {
//     setFiscalValue(e.target.value);
//   };
//   useEffect(() => {
//     let getFiscalById = () => {
//       fiscal(0).then((response) => {
//         try {
//           response.status === true;
//           {
//             setFiscalId(response.data);
//           }
//         } catch (error) {}
//       });
//     };
//     getFiscalById();
//   }, []);

//   //   for tax category
//   const [taxCategoryId, setTaxCategoryId] = useState([0]);
//   const [taxCategoryValue, setTaxCategoryValue] = useState(0);
//   const [taxCategoryMsg, setTaxCategoryMsg] = useState("");

//   const handleTaxCategory = (e) => {
//     setTaxCategoryValue(e.target.value);
//   };
//   useEffect(() => {
//     let getTaxCategoryById = () => {
//       taxCategory(0).then((response) => {
//         try {
//           response.status === true;
//           {
//             setTaxCategoryId(response.data);
//           }
//         } catch (error) {}
//       });
//     };
//     getTaxCategoryById();
//   }, []);

//   //   for tax sub category
//   const [taxSubCategoryId, setTaxSubCategoryId] = useState([0]);
//   const [taxSubCategoryValue, setTaxSubCategoryValue] = useState(0);
//   const [taxSubCategoryMsg, setTaxSubCategoryMsg] = useState("");

//   const handleTaxSubCategory = (e) => {
//     setTaxSubCategoryValue(e.target.value);
//   };
//   useEffect(() => {
//     let getTaxSubCategoryById = () => {
//       if (taxCategoryValue !== 0) {
//         taxSubCategory(taxCategoryValue).then((response) => {
//           try {
//             response.status === true;
//             {
//               setTaxSubCategoryId(response.data);
//             }
//           } catch (error) {}
//         });
//       }
//     };
//     getTaxSubCategoryById();
//   }, [taxCategoryValue]);

//   //   for index tax rate
//   const [indexTaxRateId, setIndexTaxRateId] = useState([0]);
//   console.log(indexTaxRateId,"index");
//   const [indexTaxRateValue, setIndexTaxRateValue] = useState(0);
//   const [indexTaxRateMsg, setIndexTaxRateMsg] = useState("");
  


//   const handleIndexTaxRate = (e) => {
//     setIndexTaxRateValue(e.target.value);

//   };
//   useEffect(() => {
//     let getIndexTaxRateById = () => {
//       if (fiscalValue!== 0) {
//         getTaxRateNames(taxSubCategoryValue,fiscalValue).then((response) => {
//           try {
//             response.status === true;
//             {
//               setIndexTaxRateId(response.data);
//             }
//           } catch (error) {}
//         });
//       }
//     };
//     getIndexTaxRateById();
//   }, [fiscalValue]);

//   // state to check remember me & function
//   const [checked, setChecked] = useState(false);
//   const handleCheckbox = () => {
//     setChecked(!checked);
//   };

//   //   for mapan
//   const [mapanValue, setMapanValue] = useState(0);
//   const handleMapan = (e) => {
//     setMapanValue(e.target.value);
//   };

//   return (
//     <ViewPage>
//       <SeoOptimization title={"Land Detail"} />
//       <CommonHeaderDesign title={"Create Land Detail"} />
//       <div className="flex justify-end">
//         <button className="bg-red-500 px-2 py-3 rounded shadow-lg ">
//           Add New Form
//         </button>
//       </div>



//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 ">
//           <div className="relative z-0 w-full mb-6 group">
//             <input
//               type="string"
//               className="peer"
//               {...register("kittaNo")}
//               placeholder="."
//             />
//             <label className="label">कित्ता नं</label>
//             <p> {errors?.kittaNo?.message}</p>
//           </div>

//           <div className="relative z-0 w-full mb-6 group">
//             <label className="label text-blue-900 ">वडा न</label>
//             <select onChange={handleWard} value={wardValue} className="peer">
//               <option value={0} disabled>
//                 Select the Ward
//               </option>

//               {wardId.map((items, index) => {
//                 return (
//                   <option key={index} value={items?.id}>
//                     {items.name}
//                   </option>
//                 );
//               })}
//             </select>
//             {wardMsg}
//           </div>

//           <div className="relative z-0 w-full mb-6 group">
//             <label className="label text-blue-900 ">साविकको गा.बि.स</label>
//             <select
//               onChange={handleOldVdc}
//               value={oldVdcValue}
//               className="peer"
//             >
//               <option value={0} disabled>
//                 Select the Old Vdc
//               </option>

//               {oldVdcId.map((items, index) => {
//                 return (
//                   <option key={index} value={items?.id}>
//                     {items.name}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>

//           <div className="relative z-0 w-full mb-6 group">
//             <input
//               type="number"
//               className="peer"
//               {...register("oldWardNo")}
//               placeholder="."
//             />
//             <label className="label">साविकको वडा न</label>
//             <p> {errors?.oldWardNo?.message}</p>
//           </div>

//           <div className="relative z-0 w-full mb-6 group">
//             <label className="label text-blue-900 ">कर सुरु आर्थिक वर्ष</label>
//             <select
//               onChange={handleFiscal}
//               value={fiscalValue}
//               className="peer"
//             >
//               <option value={0} disabled>
//                 Select the fiscal year
//               </option>

//               {fiscalId.map((items, index) => {
//                 return (
//                   <option key={index} value={items?.id}>
//                     {items.name}
//                   </option>
//                 );
//               })}
//             </select>
//             {fiscalMsg}
//           </div>

//           <div className="relative z-0 w-full mb-6 group">
//             <label className="label text-blue-900 ">कमुल्याङ्कन समूह</label>
//             <select
//               onChange={handleTaxCategory}
//               value={taxCategoryValue}
//               className="peer"
//             >
//               <option value={0} disabled>
//                 Select the Tax Category
//               </option>

//               {taxCategoryId.map((items, index) => {
//                 return (
//                   <option key={index} value={items?.id}>
//                     {items.name}
//                   </option>
//                 );
//               })}
//             </select>
//             {taxCategoryMsg}
//           </div>

//           <div className="relative z-0 w-full mb-6 group">
//             <label className="label text-blue-900 ">मुल्याङ्कन उपसमूह</label>
//             <select
//               onChange={handleTaxSubCategory}
//               value={taxSubCategoryValue}
//               className="peer"
//             >
//               {taxCategoryValue === 0 ? (
//                 <>
//                   <option value={0} disabled selected>
//                     Select First Tax Category
//                   </option>
//                 </>
//               ) : (
//                 <option value={0} disabled selected>
//                   Select the Tax Sub Category
//                 </option>
//               )}

//               {taxSubCategoryId.map((items, index) => {
//                 return (
//                   <option key={index} value={items?.id}>
//                     {items.name}
//                   </option>
//                 );
//               })}
//             </select>
//             {taxSubCategoryMsg}
//           </div>

//           <div className="relative z-0 w-full mb-6 group">
//             <label className="label text-blue-900 ">दर रेट</label>
//             <select
//               onChange={handleIndexTaxRate}
//               value={indexTaxRateValue}
//               className="peer"
//             >
//               {fiscalValue === 0 ? (
//                 <>
//                   <option value={0} disabled>
//                     Select the Fiscal Year First
//                   </option>
//                 </>
//               ) : (
//                 <>
//                   <option value={0} disabled>
//                     Select the Tax Rate
//                   </option>
//                 </>
//               )}

//               {indexTaxRateId?.map((items, index) => {
//                 return (
//                   <option key={index} value={items?.id}>
//                     {items.name}
//                   </option>
//                 );
//               })}
//             </select>
//             {indexTaxRateMsg}
//           </div>
//         </div>
//         <FormControlLabel
//           className="pl-4"
//           onChange={handleCheckbox}
//           control={<Checkbox value="remember" color="primary" />}
//           label="संग्युक्त"
//         />
//         {checked ? (
//           <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 ">
//             <div className="relative z-0 w-full mb-6 group">
//               <input
//                 type="number"
//                 className="peer"
//                 {...register("sangyuktaName")}
//                 placeholder="."
//               />
//               <label className="label">पुरा नाम</label>
//               <p> {errors?.sangyuktaName?.message}</p>
//             </div>

//             <div className="relative z-0 w-full mb-6 group">
//               <input
//                 type="number"
//                 className="peer"
//                 {...register("sangyuktaCitizeNo")}
//                 placeholder="."
//               />
//               <label className="label">नागरिकता नं</label>
//               <p> {errors?.sangyuktaCitizeNo?.message}</p>
//             </div>
//           </div>
//         ) : (
//           ""
//         )}
//         <div className="bg-green-300 text-center text-2xl py-3 rounded-xl font-bold ">
//           जग्गाको जम्मा क्षेत्रफल : जग्गा मापन एकाइ [रोपनी-आना-पैसा-दाम]
//         </div>

//         <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 ">
//           <div className="relative z-0 w-full mb-6 group">
//             <label className="label text-blue-900 ">मापन एकाइ</label>
//             <select onChange={handleMapan} value={mapanValue} className="peer"   >
//               <option disabled selected value={0}>
//                 Select the मापन एकाइ
//               </option>
//               <option value={1}>Ropani-ana-paisa-dam</option>
//               <option value={2}>Bigha-katha-dhur</option>
//             </select>
//           </div>
//         </div>

//         {mapanValue == 1 ? (
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 700 }} aria-label="customized table">
//               <TableHead>
//                 <TableRow>
//                   <StyledTableCell></StyledTableCell>
//                   <StyledTableCell>रोपनी</StyledTableCell>
//                   <StyledTableCell>आना</StyledTableCell>
//                   <StyledTableCell>पैसा</StyledTableCell>
//                   <StyledTableCell>दाम</StyledTableCell>
//                   <StyledTableCell>वर्ग मिटर</StyledTableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 <StyledTableRow>
//                   <StyledTableCell>कुल क्षेत्रफल</StyledTableCell>
//                   <StyledTableCell>
//                     <TextField type={"number"} {...register("totalRopani")} />
//                     {/* <p> {errors?.name?.message}</p> */}
//                   </StyledTableCell>
//                   <StyledTableCell>
//                     <TextField type={"number"} {...register("totalAana")} />
//                     {/* <p> {errors?.code?.message}</p> */}
//                   </StyledTableCell>
//                   <StyledTableCell>
//                     <TextField type={"number"} {...register("totalPaisa")} />
//                     <p> {errors?.rate?.message}</p>
//                   </StyledTableCell>
//                   <StyledTableCell>
//                     <TextField type={"number"} {...register("totalDam")} />
//                   </StyledTableCell>
//                   <StyledTableCell>
//                     <TextField
//                       type={"number"}
//                       {...register("totalRopaniSquareMiter")}
//                     />
//                   </StyledTableCell>
//                 </StyledTableRow>

//                 <StyledTableRow>
//                   <StyledTableCell>मूल्यांकन हुने</StyledTableCell>
//                   <StyledTableCell>
//                     <TextField type={"number"} {...register("evaRopani")} />
//                     {/* <p> {errors?.name?.message}</p> */}
//                   </StyledTableCell>
//                   <StyledTableCell>
//                     <TextField type={"number"} {...register("evaAana")} />
//                     {/* <p> {errors?.code?.message}</p> */}
//                   </StyledTableCell>
//                   <StyledTableCell>
//                     <TextField type={"number"} {...register("evaPaisa")} />
//                     <p> {errors?.rate?.message}</p>
//                   </StyledTableCell>
//                   <StyledTableCell>
//                     <TextField type={"number"} {...register("evaDam")} />
//                   </StyledTableCell>
//                   <StyledTableCell>
//                     <TextField
//                       type={"number"}
//                       {...register("evaRopaniSquareMiter")}
//                     />
//                   </StyledTableCell>
//                 </StyledTableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : mapanValue == 2 ? (
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 700 }} aria-label="customized table">
//               <TableHead>
//                 <TableRow>
//                   <StyledTableCell></StyledTableCell>
//                   <StyledTableCell>बिगाह</StyledTableCell>
//                   <StyledTableCell>	कट्ठा</StyledTableCell>
//                   <StyledTableCell>	धुर</StyledTableCell>
//                   <StyledTableCell>	वर्ग मिटर</StyledTableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 <StyledTableRow>
//                   <StyledTableCell>कुल क्षेत्रफल</StyledTableCell>
//                   <StyledTableCell>
//                     <TextField type={"number"} {...register("totalBigaha")} />
//                     {/* <p> {errors?.name?.message}</p> */}
//                   </StyledTableCell>
//                   <StyledTableCell>
//                     <TextField type={"number"} {...register("totalKattha")} />
//                     {/* <p> {errors?.code?.message}</p> */}
//                   </StyledTableCell>
//                   <StyledTableCell>
//                     <TextField type={"number"} {...register("totalDhur")} />
//                     <p> {errors?.rate?.message}</p>
//                   </StyledTableCell>

//                   <StyledTableCell>
//                     <TextField
//                       type={"number"}
//                       {...register("totalBigaSquareMiter")}
//                     />
//                   </StyledTableCell>
//                 </StyledTableRow>

//                 <StyledTableRow>
//                   <StyledTableCell>मूल्यांकन हुने</StyledTableCell>
//                   <StyledTableCell>
//                     <TextField type={"number"} {...register("evaBigaha")} />
//                     {/* <p> {errors?.name?.message}</p> */}
//                   </StyledTableCell>
//                   <StyledTableCell>
//                     <TextField type={"number"} {...register("evaKattha")} />
//                     {/* <p> {errors?.code?.message}</p> */}
//                   </StyledTableCell>
//                   <StyledTableCell>
//                     <TextField type={"number"} {...register("evaDhur")} />
//                     <p> {errors?.rate?.message}</p>
//                   </StyledTableCell>
//                   <StyledTableCell>
//                     <TextField
//                       type={"number"}
//                       {...register("evaBigaSquareMiter")}
//                     />
//                   </StyledTableCell>
                  
//                 </StyledTableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           ""
//         )}

//         <div className="flex justify-end ">
//           <div className="flex gap-2 bg-[#89bde1fd]  py-3 shadow-lg rounded-md w-32 justify-center hover:bg-blue-300 cursor-pointer ">
//             <div className="pt-1">
//               <FaPlus />
//             </div>
//             <button
//               type="submit"
//               className="text-sm font-extralight "
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Submitting..." : "Add Land detail"}
//             </button>
//           </div>
//         </div>
//       </form>
//     </ViewPage>
//   );
// };

// export default Index;
