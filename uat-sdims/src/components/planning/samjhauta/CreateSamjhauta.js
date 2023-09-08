import Image from "next/image";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createPlanningSamjhauta } from "../../../services/apiServices/planning/planningSamjhauta/planningSamjhautaService";
import { budgetSource } from "../../../services/apiServices/planning/budgetSource/budgetSourceService";
import React, { useEffect, useMemo, useState } from "react";
import { fiscal } from "../../../services/apiServices/common/fiscal/fiscalService";
import { yojana } from "../../../services/apiServices/planning/yojana/yojanaService";
import { ward } from "../../../services/apiServices/common/ward/wardService";
import { upaChetra } from "../../../services/apiServices/planning/upaChetra/upaChetraService";
import { chetra } from "../../../services/apiServices/planning/chetra/chetraService";
import { upaChetraDetail } from "../../../services/apiServices/planning/upaChetraDetail/upachetraDetailService";
import { workType } from "../../../services/apiServices/planning/workType/workTypeService";
import { upabhoktaSamiti } from "../../../services/apiServices/planning/upabhoktaSamiti/upabhoktaSamitiService";
import { karKatti } from "../../../services/apiServices/planning/karKatti/karKattiService";
import {
  Checkbox,
  FormControlLabel,
  TextareaAutosize,
} from "@material-ui/core";
import { sartaSetup } from "../../../services/apiServices/planning/sartaSetup/sartaSetupService";
import { post } from "../../../services/apiServices/common/post/postService";
import { employee } from "../../../services/apiServices/employee/employeesetup/employeeService";
import { tolBikashSanstha } from "../../../services/apiServices/planning/tolBikashSanstha/tolBikashSansthaService";
import AddButton from "../../reusableDesign/AddButton";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { office } from "../../../services/apiServices/common/office/officeService";
const BS = require("bikram-sambat-js");
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CreateSamjhauta = ({ clickedIdData }) => {
  const aa = new BikramSambat(new Date()).toBS();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        data = {
          ...data,
          budgetSourceId: budgetSourceValue,
          yojanaId: yojanaNameValue,
          upaChetraId: upaChetraId,
          upaChetraDetailId: upaChetraDetailValue,
          chettraId: chetraValue,
          total_Amount_Source: totalCost,
          workTypeId: workTypeId,
          samitiDetailId: upabhoktaId,
          project_Start_Date: yojanaStartMiti,
          project_End_Date: yojanaEndMiti,
          project_estimated_Amount: projectCost,
          marmatSambhar_Amount: marmatSambharAmount,
          contegency_Amount: contigencyAmount,
          nepal_Government: nepalSarkar,
          municipality: nagarpalika,
          state: province,
          ngO_INGO: sanstha,
          community_Org: samudaya,
          foreign_Org: bidesh,
          public_Community: upabhokta,
          loan_Grant: shramdan,
          other_Source: anya,
          sartaSetupId: sartaId,
          municipality_Manjuri_Date: samjhautaMiti,
          sifarisGarnePadId: sifarishPostId,
          swikritGarnePadId: swikritiPostId,
          pravidhikEmployeePadId: prawadhikPostId,
          rujuGarnePadId: rujuPostId,
          sifarisGarneId: employeeSifarishId,
          swikritGarneId: employeeSwikritiId,
          pravidhikEmployeeId: employeePrawadhikId,
          rujuGarneId: employeeRujuId,
          samjhauta_Acceptance: checked,
          tolBikashSansthaId: tolBikashId,

          planningSamjhautaKistaFirstDetailsList: {
            payment_Date: firstKistaDate,
            kista_Rakam: firstKistaAmount,
            nirmarn_Samagri: firstKistaMaterial,
            remarks: firstKistaRemarks,
          },
          planningSamjhautaKistaSecondDetailsList: {
            payment_Date: secondKistaDate,
            kista_Rakam: secondKistaAmount,
            nirmarn_Samagri: secondKistaMaterial,
            remarks: secondKistaRemarks,
          },
          planningSamjhautaKistaThirdDetailsList: {
            payment_Date: thirdKistaDate,
            kista_Rakam: thirdKistaAmount,
            nirmarn_Samagri: thirdKistaMaterial,
            remarks: thirdKistaRemarks,
          },
        };
        try {
          createPlanningSamjhauta(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push("/planning/samjhauta");
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

  // to set the office data
  const [apiDataOffice, setApiDataOffice] = useState([]);

  useEffect(() => {
    const fetchedData = () => {
      office().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiDataOffice(data);
          }
        } catch (error) {
          toast.error(message, {
            autoClose: 1000,
          });
        }
      });
    };
    fetchedData();
  }, [setApiDataOffice]);

  // for fiscalYearId
  const [fiscalApiData, setFiscalApiData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await fiscal();
        if (status) {
          setFiscalApiData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const filteredData = useMemo(
    () => fiscalApiData.filter((item) => item.isActive === true),
    [fiscalApiData]
  );

  const fiscalYearOptions = filteredData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.isActive === true ? true : false}
      >
        {item.name}
      </option>
    );
  });

  //   for budgetsourceId
  const [budgetSourceId, setBudgetSourceId] = useState([]);
  const [budgetSourceValue, setBudgetSourceValue] = useState("");

  const handleBudgetSource = (e) => {
    setBudgetSourceValue(e.target.value);
  };
  useEffect(() => {
    let budgetSourceApiData = () => {
      budgetSource(0).then((response) => {
        try {
          response.status === true;
          {
            setBudgetSourceId(response.data);
          }
        } catch (error) {}
      });
    };

    budgetSourceApiData();
  }, []);

  // for yojanaNameId
  const [yojanaNameId, setYojanaNameId] = useState([]);
  const [yojanaNameValue, setYojanaNameValue] = useState("");

  const handleYojanaName = (e) => {
    setYojanaNameValue(e.target.value);
  };
  useEffect(() => {
    let yojanaNameApiData = () => {
      yojana().then((response) => {
        try {
          response.status === true;

          {
            setYojanaNameId(response.data);
          }
        } catch (error) {}
      });
    };

    yojanaNameApiData();
  }, []);

  const wardValueAccToYojana = useMemo(
    () =>
      yojanaNameId.find(
        (item) => item?.yojanaSetupId === parseInt(yojanaNameValue)
      ),
    [yojanaNameId, yojanaNameValue]
  );

  console.log(wardValueAccToYojana,"waccacccccc");

  // const selectedUpabhoktaSamiti = useMemo(
  //   () => upabhoktaApi.find((item) => item.upabhoktaSamitiDetailId === parseInt(upabhoktaId)),
  //   [ upabhoktaId, upabhoktaApi]
  // );

  // for project cost
  const projectCostFilter = yojanaNameId.find(
    (item) => item?.yojanaSetupId === parseInt(yojanaNameValue)
  );

  const projectCost = projectCostFilter?.estimatedAmount;

  // for ward
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await ward();
        if (status) {
          setApiData(data);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  const options = apiData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={wardValueAccToYojana?.wardId}
      >
        {item.name}
      </option>
    );
  });

  // for upaChetra
  const [upaChetraId, setUpaChetraId] = useState(null);
  const [upaChetraApiData, setUpaChetraApiData] = useState([]);

  const handleUpaChetra = (e) => {
    setUpaChetraId(e.target.value);
  };

  useEffect(() => {
    let upaChetraApiDataX = () => {
      upaChetra().then((response) => {
        try {
          response.status === true;
          {
            setUpaChetraApiData(response.data);
          }
        } catch (error) {}
      });
    };
    upaChetraApiDataX();
  }, [setUpaChetraApiData]);

  // for Chetra
  const [chetraId, setChetraId] = useState([]);
  const [chetraValue, setChetraValue] = useState("");

  const handleChetraId = (e) => {
    setChetraValue(e.target.value);
  };
  useEffect(() => {
    let chetraApiData = () => {
      chetra().then((response) => {
        try {
          response.status === true;

          {
            setChetraId(response.data);
          }
        } catch (error) {}
      });
    };

    chetraApiData();
  }, []);

  // for upachetra detail

  const [upaChetraDetailId, setUpaChetraDetailId] = useState([]);
  const [upaChetraDetailValue, setUpaChetraDetailValue] = useState("");

  const handleUpaChetraDetail = (e) => {
    setUpaChetraDetailValue(e.target.value);
  };
  useEffect(() => {
    let upaChetraDetailApiData = () => {
      upaChetraDetail().then((response) => {
        try {
          response.status === true;

          {
            setUpaChetraDetailId(response.data);
          }
        } catch (error) {}
      });
    };

    upaChetraDetailApiData();
  }, []);

  // for kamko kisim
  const [workTypeApi, setWorkTypeApi] = useState([]);
  const [workTypeId, setWorkTypeId] = useState("");

  const handleWorkType = (e) => {
    setWorkTypeId(e.target.value);
  };

  useEffect(() => {
    let workTypeApiData = () => {
      workType().then((response) => {
        try {
          response.status === true;

          {
            setWorkTypeApi(response.data);
          }
        } catch (error) {}
      });
    };

    workTypeApiData();
  }, []);

  // for upabhokta samiti
  const [upabhoktaApi, setUpabhoktaApi] = useState([]);
  const [upabhoktaId, setUpabhoktaId] = useState("");

  const handleUpabhokta = (e) => {
    setUpabhoktaId(e.target.value);
  };

  useEffect(() => {
    let upaBhoktaApiData = () => {
      upabhoktaSamiti().then((response) => {
        try {
          response.status === true;

          {
            setUpabhoktaApi(response.data);
          }
        } catch (error) {}
      });
    };

    upaBhoktaApiData();
  }, []);

  // to filter the selected upabhoktasamiti

  const selectedUpabhoktaSamiti = useMemo(
    () =>
      upabhoktaApi.find(
        (item) => item.upabhoktaSamitiDetailId === parseInt(upabhoktaId)
      ),
    [upabhoktaId, upabhoktaApi]
  );

  console.log(selectedUpabhoktaSamiti, "selectedUpabhoktaSamiti");

  // fot tolBikash
  const [tolBikashApi, setTolBikashApi] = useState([]);
  const [tolBikashId, setTolBikashId] = useState("");

  useEffect(() => {
    let tolBikashApiData = () => {
      tolBikashSanstha().then((response) => {
        try {
          response.status === true;
          {
            setTolBikashApi(response.data);
          }
        } catch (error) {}
      });
    };

    tolBikashApiData();
  }, []);

  // for kar katti
  const [karKattiApi, setKarKattiApi] = useState([]);

  useEffect(() => {
    let karKattiApiData = () => {
      karKatti().then((response) => {
        try {
          response.status === true;
          {
            setKarKattiApi(response.data);
          }
        } catch (error) {}
      });
    };
    karKattiApiData();
  }, []);

  // contigency
  let contigencyFilter = karKattiApi.find((item) => item.contigency);

  let contigency = contigencyFilter?.contigency;

  let contigencyAmount = (contigency * projectCost) / 100;

  // marmatSambhar
  let marmatSambharFilter = karKattiApi.find((item) => item.marmatSambhar);
  let marmatSambhar = marmatSambharFilter?.marmatSambhar;
  let marmatSambharAmount = (marmatSambhar * projectCost) / 100;

  // for projecct start date
  const [yojanaStartMiti, setYojanaStartMiti] = useState(aa);
  const handelStartMiti = (e) => {
    setYojanaStartMiti(e);
  };

  // for project end date
  const [yojanaEndMiti, setYojanaEndMiti] = useState(aa);
  const handelEndMiti = (e) => {
    setYojanaEndMiti(e);
  };

  // for1st kista
  const [firstKistaDate, setFirstKistaDate] = useState(aa);
  const handelFirstKistaDate = (e) => {
    setFirstKistaDate(e);
  };
  const [firstKistaAmount, setFirstKistaAmount] = useState("");
  const [firstKistaMaterial, setFirstKistaMaterial] = useState("");
  const [firstKistaRemarks, setFirstKistaRemarks] = useState("");

  // for 2nd kista
  const [secondKistaDate, setSecondKistaDate] = useState(aa);
  const handelSecondKistaDate = (e) => {
    setSecondKistaDate(e);
  };
  const [secondKistaAmount, setSecondKistaAmount] = useState("");
  const [secondKistaMaterial, setSecondKistaMaterial] = useState("");
  const [secondKistaRemarks, setSecondKistaRemarks] = useState("");

  // for 3rd kista
  const [thirdKistaDate, setThirdKistaDate] = useState(aa);
  const handelThirdKistaDate = (e) => {
    setThirdKistaDate(e);
  };
  const [thirdKistaAmount, setThirdKistaAmount] = useState("");
  const [thirdKistaMaterial, setThirdKistaMaterial] = useState("");
  const [thirdKistaRemarks, setThirdKistaRemarks] = useState("");

  // for samjhauta
  const [samjhautaMiti, setSamjhautaMiti] = useState(aa);
  const handelSamjhautaMiti = (e) => {
    setSamjhautaMiti(e);
  };

  const [sartaApi, setSartaApi] = useState([]);
  const [sartaId, setSartaId] = useState("");

  const handleSarta = (e) => {
    setSartaId(e.target.value);
  };

  useEffect(() => {
    let sartaApiData = () => {
      sartaSetup().then((response) => {
        try {
          response.status === true;

          {
            setSartaApi(response.data);
          }
        } catch (error) {}
      });
    };

    sartaApiData();
  }, []);

  // for post

  const [postApi, setPostApi] = useState([]);
  const [sifarishPostId, setSifarishPostId] = useState("");
  const [swikritiPostId, setSwikritiPostId] = useState("");
  const [prawadhikPostId, setPrawadhikPostId] = useState("");
  const [rujuPostId, setRujuPostId] = useState("");

  const handleSifarishPost = (e) => {
    setSifarishPostId(e.target.value);
  };

  const handleSwikritiPost = (e) => {
    setSwikritiPostId(e.target.value);
  };

  const handlePrawadhikPost = (e) => {
    setPrawadhikPostId(e.target.value);
  };

  const handleRujuPost = (e) => {
    setRujuPostId(e.target.value);
  };

  useEffect(() => {
    let postApiData = () => {
      post().then((response) => {
        try {
          response.status === true;
          {
            setPostApi(response.data);
          }
        } catch (error) {}
      });
    };
    postApiData();
  }, []);

  // for employee
  const [employeeApi, setEmployeeApi] = useState([]);
  const [employeeSifarishId, setEmployeeSifarishId] = useState("");
  const [employeeSwikritiId, setEmployeeSwikritiId] = useState("");
  const [employeePrawadhikId, setEmployeePrawadhikId] = useState("");
  const [employeeRujuId, setEmployeeRujuId] = useState("");

  useEffect(() => {
    let employeeApiData = () => {
      employee().then((response) => {
        try {
          response.status === true;
          {
            setEmployeeApi(response.data);
          }
        } catch (error) {}
      });
    };
    employeeApiData();
  }, []);

  // for amount contribution
  const [nepalSarkar, setNepalSarkar] = useState(0);
  const [nagarpalika, setNagarpalika] = useState(0);
  const [province, setProvince] = useState(0);
  const [sanstha, setSanstha] = useState(0);
  const [samudaya, setSamudaya] = useState(0);
  const [bidesh, setBidesh] = useState(0);
  const [upabhokta, setUpabhokta] = useState(0);
  const [shramdan, setShramdan] = useState(0);
  const [anya, setAnya] = useState(0);

  const totalCost =
    parseInt(nepalSarkar) +
    parseInt(nagarpalika) +
    parseInt(province) +
    parseInt(sanstha) +
    parseInt(samudaya) +
    parseInt(bidesh) +
    parseInt(upabhokta) +
    parseInt(shramdan) +
    parseInt(anya);

  // for checked data
  const [checked, setChecked] = useState(false);
  const handleCheckbox = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <br />
      <hr className="border-2 border-black" />
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-[#4189c3] text-center text-2xl py-3 rounded-xl font-bold ">
          योजना सम्झौता फारम विवरण
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              आर्थिक वर्ष <span className="requiredField">*</span>
            </label>
            <select
              {...register("fiscalYearId")}
              className="peer requiredField"
            >
              <option value={""}> ---- आर्थिक वर्ष छान्नुहोस् ----</option>
              {fiscalYearOptions}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">बजेट स्रोत</label>
            <select
              onChange={handleBudgetSource}
              value={budgetSourceValue}
              className="peer"
              required
            >
              <option value={""} selected disabled>
                ---- बजेट स्रोत छान्नुहोस् ----
              </option>

              {budgetSourceId.map((items, index) => {
                return (
                  <option key={index} value={items?.budgetSourceId}>
                    {items.budgetSourceName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("serialNo")}
              placeholder="."
            />
            <label className="label">सम्झौता न.</label>
            <p> {errors?.serialNo?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("kharchaSirshakNo")}
              placeholder="."
            />
            <label className="label">खर्च शिर्षक नं. :</label>
            <p> {errors?.kharchaSirshakNo?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("kharchaSirshak")}
              placeholder="."
            />
            <label className="label">बजेट सङ्केत न. :</label>
            <p> {errors?.kharchaSirshak?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("planningSanketNo")}
              placeholder="."
            />
            <label className="label">योजना सी.न. :</label>
            <p> {errors?.planningSanketNo?.message}</p>
          </div>
        </div>
        <br />
        <div className="bg-[#4189c3] text-center text-2xl py-3 rounded-xl font-bold ">
          त्रियुगा नगरपालिका कार्यालय र उपभोक्ता समिति बीचको सम्झौता अनुसूची
          ..... सँग सम्बन्धित
        </div>
        <div className="grid lg:grid-cols-4 items-center justify-center gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("samjhauta_Org_Name")}
              value={selectedUpabhoktaSamiti?.name}
              placeholder="."
            />
            <label className="label">सम्झौता गर्ने संस्थाको नामः</label>
            <p> {errors?.samjhauta_Org_Name?.message}</p>
          </div>
        </div>
        <br />
        <div className="bg-[#4189c3] text-center text-2xl py-3 rounded-xl font-bold ">
          १. सम्झौता गर्ने पक्ष र आयोजना
        </div>
        <br />
        <div className="bg-[#4189c3]  px-1 text-2xl py-3 rounded-xl font-bold ">
          (क) उपभोक्ता समिति /समुदायमा आधारीत संस्था /गैर सरकारी संस्थाको विवरण
          : सम्झौता गर्ने संस्थाको प्रतिनिधीको
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("representativeName")}
              placeholder="."
            />
            <label className="label">नामः</label>
            <p> {errors?.representativeName?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("representativeDesignition")}
              placeholder="."
            />
            <label className="label">पदः</label>
            <p> {errors?.representativeDesignition?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("representativeAddress")}
              placeholder="."
            />
            <label className="label">ठेगानाः</label>
            <p> {errors?.representativeAddress?.message}</p>
          </div>
        </div>
        <br />
        <div className="bg-[#4189c3]  px-1 text-2xl py-3 rounded-xl font-bold ">
          (ख) आयोजनाको विवरण
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">योजनाको नाम</label>
            <select
              onChange={handleYojanaName}
              value={yojanaNameValue}
              className="peer"
              required
            >
              <option value={""} selected disabled>
                ---- योजनाको नाम छान्नुहोस् ----
              </option>

              {yojanaNameId.map((items, index) => {
                return (
                  <option key={index} value={items?.yojanaSetupId}>
                    {items.yojanaName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("project_Place")}
              placeholder="."
            />
            <label className="label">स्थान : </label>
            <p> {errors?.project_Place?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("project_Objective")}
              placeholder="."
            />
            <label className="label">उदेश्य : </label>
            <p> {errors?.project_Objective?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              वार्ड
              <span className="requiredField">*</span>
            </label>
            <select {...register("wardId")} className="peer requiredField">
              <option value={""}>---- वार्ड छानुहोस -----</option>
              {options}
            </select>
            <p> {errors?.wardId?.message}</p>
          </div>
        </div>
        <br />
        <div className="bg-[#4189c3]  px-1 text-2xl py-3 rounded-xl font-bold ">
          (ग) आयोजनाको लागत अनुमानबाट भर्ने आयोजनाको प्राबिधिक विवरण
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">क्षेत्रको नाम</label>
            <select
              onChange={handleChetraId}
              value={chetraValue}
              className="peer"
              required
            >
              <option value={""} selected disabled>
                ---- क्षेत्रको नाम छान्नुहोस् ----
              </option>

              {chetraId.map((items, index) => {
                return (
                  <option key={index} value={items?.chettraId}>
                    {items.chettraName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">उप क्षेत्रको नाम</label>
            <select
              onChange={handleUpaChetra}
              value={upaChetraId}
              className="peer"
              required
            >
              <option value={""} selected disabled>
                ---- उप क्षेत्रको नाम छान्नुहोस् ----
              </option>

              {upaChetraApiData.map((items, index) => {
                return (
                  <option key={index} value={items?.upaChettraId}>
                    {items.upaChettra}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              उप क्षेत्रको विवरण नाम
            </label>
            <select
              onChange={handleUpaChetraDetail}
              value={upaChetraDetailValue}
              className="peer"
              required
            >
              <option value={""} selected disabled>
                ---- उप क्षेत्रको विवरण नाम छान्नुहोस् ----
              </option>

              {upaChetraDetailId.map((items, index) => {
                return (
                  <option key={index} value={items?.upaChetraDetailId}>
                    {items.detail}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("ekai")}
              placeholder="."
            />
            <label className="label">इकाई</label>
            <p> {errors?.ekai?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("pariman")}
              placeholder="."
            />
            <label className="label">परिमाण</label>
            <p> {errors?.pariman?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">कामको किसिम</label>
            <select
              onChange={handleWorkType}
              value={workTypeId}
              className="peer"
              required
            >
              <option value={""} selected disabled>
                ---- कामको किसिम छान्नुहोस् ----
              </option>

              {workTypeApi.map((items, index) => {
                return (
                  <option key={index} value={items?.workTypeId}>
                    {items?.workTypeName}
                  </option>
                );
              })}
            </select>
          </div>

          {workTypeId === "" ? (
            ""
          ) : workTypeId === "2" ? (
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">
                टोल बिकाश समितिको नाम
              </label>
              <select
                onChange={(e) => setTolBikashId(e.target.value)}
                value={tolBikashId}
                className="peer"
              >
                <option value={null} selected disabled>
                  ---- टोल बिकाश समितिको नाम छान्नुहोस् ----
                </option>

                {tolBikashApi.map((items, index) => {
                  return (
                    <option key={index} value={items?.tolBikashSansthaId}>
                      {items?.tolBikashSansthaName}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : (
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">
                उपभोक्ता समितिको नाम
              </label>
              <select
                onChange={handleUpabhokta}
                value={upabhoktaId}
                className="peer"
                required
              >
                <option value={null} selected disabled>
                  ---- उपभोक्ता समितिको नाम छान्नुहोस् ----
                </option>

                {upabhoktaApi.map((items, index) => {
                  return (
                    <option key={index} value={items?.upabhoktaSamitiDetailId}>
                      {items?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("project_Acceptance_By")}
              placeholder="."
            />
            <label className="label">आयोजना स्वीकृत गर्ने निकाय </label>
            <p> {errors?.project_Acceptance_By?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              आयोजना सुरु मिति (BS)
            </label>

            <NepaliDatePicker
              value={yojanaStartMiti}
              className="peer"
              onChange={handelStartMiti}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              आयोजना सम्पन्न मिति (BS)
            </label>

            <NepaliDatePicker
              value={yojanaEndMiti}
              className="peer"
              onChange={handelEndMiti}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
        </div>
        {/* <div className="bg-[#4189c3]  px-1 text-2xl py-3 rounded-xl font-bold items-center flex justify-center ">
          (*) सम्झौता गर्ने समितिको नाम
        </div> */}
        {/* <div className="grid lg:grid-cols-4  gap-5 px-10 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">उपभोक्ता समितिको नाम</label>
            <select
              onChange={(e) => setUpabhoktaSamitiId(e.target.value)}
              value={upabhoktaSamitiId}
              className="peer"
            >
              <option value={""} selected disabled>
                ---- उपभोक्ता समितिको नाम छान्नुहोस् ----
              </option>

              {upabhoktaApi.map((items, index) => {
                return (
                  <option key={index} value={items?.upabhoktaSamitiDetailId}>
                    {items?.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              टोल बिकाश समितिको नाम
            </label>
            <select
              onChange={(e) => setTolBikashId(e.target.value)}
              value={tolBikashId}
              className="peer"
            >
              <option value={""} selected disabled>
                ---- टोल बिकाश समितिको नाम छान्नुहोस् ----
              </option>

              {tolBikashApi.map((items, index) => {
                return (
                  <option key={index} value={items?.tolBikashSansthaId}>
                    {items?.tolBikashSansthaName}
                  </option>
                );
              })}
            </select>
          </div>
        </div> */}
        <div className="bg-[#4189c3]  px-1 text-2xl py-3 rounded-xl font-bold ">
          (घ) विनियोजित रकम
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              value={projectCost}
              placeholder="."
            />
            <label className="label">विनियोजित रकम रु </label>
          </div>

          {/* <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              value={contigencyAmount ? contigencyAmount : ""}
              placeholder="."
            />
            <label className="label">कन्टेन्जेंसी ({contigency} % )रुः</label>
          </div> */}
        </div>
        <div className="bg-[#4189c3]  px-1 text-2xl py-3 rounded-xl font-bold ">
          (ङ) लागत व्यहोर्ने श्रोतहरु
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              placeholder="."
              onChange={(e) => setNepalSarkar(e.target.value)}
            />
            <label className="label">नेपाल सरकार रु </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              placeholder="."
              onChange={(e) => setNagarpalika(e.target.value)}
            />
            <label className="label">नगरपालिका / गाउँपालिका वाट रु </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              placeholder="."
              onChange={(e) => setProvince(e.target.value)}
            />
            <label className="label"> प्रदेश रु </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              placeholder="."
              onChange={(e) => setSanstha(e.target.value)}
            />
            <label className="label"> गेेर सरकारी संघ संस्थाबाट रु </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              placeholder="."
              onChange={(e) => setSamudaya(e.target.value)}
            />
            <label className="label"> समुदायमा आधारित संस्थाबाट रु </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              placeholder="."
              onChange={(e) => setBidesh(e.target.value)}
            />
            <label className="label"> विदेशी दातृ संघ संस्थाबाट रु </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              placeholder="."
              onChange={(e) => setUpabhokta(e.target.value)}
            />
            <label className="label"> उपभोक्ता समितिवाट रु </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              placeholder="."
              onChange={(e) => {
                setShramdan(e.target.value);
              }}
            />
            <label className="label"> श्रमदान वाट रु </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              placeholder="."
              onChange={(e) => setAnya(e.target.value)}
            />
            <label className="label"> अन्यवाट रु </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer text-red-500 font-bold text-xl "
              placeholder="."
              value={totalCost}
            />
            <label className="label"> लागत अनुमान जम्मा रु:</label>
          </div>
        </div>
        <div className="bg-[#4189c3] text-center text-2xl py-3 rounded-xl font-bold ">
          २. आयोजनावाट लाभान्वित हुने (प्रतिशतमा):
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("total_House")}
              placeholder="."
            />
            <label className="label"> घर संख्याः</label>
            <p> {errors?.total_House?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("total_Female")}
              placeholder="."
            />
            <label className="label"> महिला संख्याः</label>
            <p> {errors?.total_Female?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("total_Male")}
              placeholder="."
            />
            <label className="label"> पुरुष संख्याः</label>
            <p> {errors?.total_Male?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("community")}
              placeholder="."
            />
            <label className="label"> सामुदाय </label>
            <p> {errors?.community?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("other")}
              placeholder="."
            />
            <label className="label">
              {" "}
              अन्य समुदायमा आधारीत / गेेर सरकारी संस्थाः{" "}
            </label>
            <p> {errors?.other?.message}</p>
          </div>
        </div>
        <div className="bg-[#4189c3] text-center text-2xl py-3 rounded-xl font-bold ">
          ३. उपभोक्ता समिति समिदायमा आधारित संस्था गैर सरकारी संस्थाले प्राप्त
          गर्ने किस्ता विवरणः
        </div>
        <div className="grid lg:grid-cols-3  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              value={projectCost}
              placeholder="."
            />
            <label className="label">प्राप्त गर्ने अनुदान</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              value={contigencyAmount ? contigencyAmount : ""}
              placeholder="."
            />
            <label className="label">
              कन्टिजेनसी वापत कट्टिहुने रकम ({contigency} % )
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              value={marmatSambharAmount ? marmatSambharAmount : ""}
              placeholder="."
            />
            <label className="label">
              मर्मत सम्भार कोष वापत कट्टिहुने रकम ({marmatSambhar} % )
            </label>
          </div>
        </div>
        <div className="bg-[#4189c3] text-center text-2xl py-3 rounded-xl font-bold ">
          ४. किस्ता विवरणः
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-4 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div>
            <text className="text-xl font-bold ">किस्ता क्रम</text>
          </div>
          <div>
            <text className="text-xl font-bold ">मिति</text>
          </div>
          <div>
            <text className="text-xl font-bold ">किस्ता रकम</text>
          </div>
          <div>
            <text className="text-xl font-bold ">निर्माण सामाग्री</text>
          </div>
          <div>
            <text className="text-xl font-bold ">कैफियत</text>
          </div>

          <div>
            <text className=" font-medium ">पहिलो किस्ता</text>
          </div>

          <div className="relative  w-full mb-6 group">
            <NepaliDatePicker
              value={firstKistaDate}
              className="peer"
              onChange={handelFirstKistaDate}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              onChange={(e) => setFirstKistaAmount(e.target.value)}
              placeholder="---- पहिलो किस्ता रकम थप्नुहोस् ----"
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              onChange={(e) => setFirstKistaMaterial(e.target.value)}
              placeholder="---- पहिलो निर्माण सामाग्री थप्नुहोस् ----"
            />
          </div>

          <TextareaAutosize
            type="string"
            className="border-2 w-full pb-6 border-black"
            onChange={(e) => setFirstKistaRemarks(e.target.value)}
            placeholder="write something here......"
          />
          <div>
            <text className=" font-medium ">दोश्रो किस्ता</text>
          </div>

          <div className="relative  w-full mb-6 group">
            <NepaliDatePicker
              value={secondKistaDate}
              className="peer"
              onChange={handelSecondKistaDate}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              onChange={(e) => setSecondKistaAmount(e.target.value)}
              placeholder="---- दोश्रो  किस्ता रकम थप्नुहोस ----"
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              onChange={(e) => setSecondKistaMaterial(e.target.value)}
              placeholder="---- दोश्रो निर्माण सामाग्री थप्नुहोस ----"
            />
          </div>

          <TextareaAutosize
            type="string"
            className="border-2 w-full pb-6 border-black"
            placeholder="write something here......"
            onChange={(e) => setSecondKistaRemarks(e.target.value)}
          />
          <div>
            <text className=" font-medium ">तेश्रो किस्ता</text>
          </div>

          <div className="relative  w-full mb-6 group">
            <NepaliDatePicker
              value={thirdKistaDate}
              className="peer"
              onChange={handelThirdKistaDate}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              onChange={(e) => setThirdKistaAmount(e.target.value)}
              placeholder="---- तेश्रो  किस्ता रकम थप्नुहोस ----"
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              onChange={(e) => setThirdKistaMaterial(e.target.value)}
              placeholder=" ---- तेश्रो निर्माण सामाग्री थप्नुहोस ----"
            />
            <p> {errors?.total_House?.message}</p>
          </div>

          <TextareaAutosize
            type="string"
            className="border-2 w-full pb-6 border-black"
            onChange={(e) => setThirdKistaRemarks(e.target.value)}
            placeholder="write something here......"
          />
        </div>
        <div className="bg-[#4189c3] text-center text-2xl py-3 rounded-xl font-bold ">
          ४. सम्झौताका विवरणः
        </div>
        <div className=" border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10  ">
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">सम्झौताका सर्त</label>
              <select
                onChange={handleSarta}
                value={sartaId}
                className="peer"
                required
              >
                <option value={""} selected disabled>
                  ---- सम्झौताका सर्त छान्नुहोस् ----
                </option>

                {sartaApi.map((items, index) => {
                  return (
                    <option key={index} value={items?.sartaSetupId}>
                      {items?.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="relative  w-full mb-6 group">
              <label
                htmlFor=""
                className=" absolute text-[10px] text-blue-900 -top-[15%]"
              >
                सम्झौता मिति (BS)
              </label>

              <NepaliDatePicker
                value={samjhautaMiti}
                className="peer"
                onChange={handelSamjhautaMiti}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-6  gap-5 px-5  ">
            <div></div>
            <div>
              <text className=" text-xl font-bold ">
                सम्झौता गर्ने (उपभोक्ता समितिको ){" "}
              </text>
            </div>
            <div>
              <text className=" text-xl font-bold ">
                सिफारिस गर्ने (फिदिम नगरपालिका तर्फवाट){" "}
              </text>
            </div>
            <div>
              <text className=" text-xl font-bold ">
                स्वीकृत गर्ने (फिदिम नगरपालिका तर्फवाट){" "}
              </text>
            </div>
            <div>
              <text className=" text-xl font-bold ">
                प्राविधिक गर्ने (फिदिम नगरपालिका तर्फवाट){" "}
              </text>
            </div>
            <div>
              <text className=" text-xl font-bold ">
                रुजु गर्ने (फिदिम नगरपालिका तर्फवाट){" "}
              </text>
            </div>

            <div>
              <text className=" text-2xl font-bold  flex justify-center ">
                पद :
              </text>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="string"
                className="peer"
                {...register("municipality_Rep_Post")}
                placeholder="ससम्झौता गर्ने पद थप्नुहोस्"
              />
              <p> {errors?.municipality_Rep_Post?.message}</p>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <select
                onChange={handleSifarishPost}
                value={sifarishPostId}
                className="peer"
                required
              >
                <option value={""} selected disabled>
                  ---- सिफारिस गर्ने पद छान्नुहोस् ----
                </option>

                {postApi.map((items, index) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <select
                onChange={handleSwikritiPost}
                value={swikritiPostId}
                className="peer"
                required
              >
                <option value={""} selected disabled>
                  ---- स्वीकृत गर्ने पद छान्नुहोस् ----
                </option>

                {postApi.map((items, index) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <select
                onChange={handlePrawadhikPost}
                value={prawadhikPostId}
                className="peer"
                required
              >
                <option value={""} selected disabled>
                  ---- प्राविधिक गर्ने पद छान्नुहोस् ----
                </option>

                {postApi.map((items, index) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <select
                onChange={handleRujuPost}
                value={rujuPostId}
                className="peer"
                required
              >
                <option value={""} selected disabled>
                  ---- रुजु गर्ने पद छान्नुहोस् ----
                </option>

                {postApi.map((items, index) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <text className=" text-2xl font-bold  flex justify-center ">
                नाम :
              </text>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="string"
                className="peer"
                {...register("municipality_Rep_Name")}
                placeholder="ससम्झौता गर्ने नाम थप्नुहोस्"
              />
              <p> {errors?.municipality_Rep_Name?.message}</p>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <select
                onChange={(e) => setEmployeeSifarishId(e.target.value)}
                value={employeeSifarishId}
                className="peer"
                required
              >
                <option value={""} selected disabled>
                  ---- सिफारिस गर्ने नाम छान्नुहोस् ----
                </option>

                {employeeApi.map((items, index) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items.firstName} {items.middleName} {items.lastName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <select
                onChange={(e) => setEmployeeSwikritiId(e.target.value)}
                value={employeeSwikritiId}
                className="peer"
                required
              >
                <option value={""} selected disabled>
                  ---- स्वीकृत गर्ने नाम छान्नुहोस् ----
                </option>

                {employeeApi.map((items, index) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items.firstName} {items.middleName} {items.lastName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <select
                onChange={(e) => setEmployeePrawadhikId(e.target.value)}
                value={employeePrawadhikId}
                className="peer"
                required
              >
                <option value={""} selected disabled>
                  ---- प्राविधिक गर्ने नाम छान्नुहोस् ----
                </option>

                {employeeApi.map((items, index) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items.firstName} {items.middleName} {items.lastName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <select
                onChange={(e) => setEmployeeRujuId(e.target.value)}
                value={employeeRujuId}
                className="peer"
                required
              >
                <option value={""} selected disabled>
                  ---- रुजु गर्ने नाम छान्नुहोस् ----
                </option>

                {employeeApi.map((items, index) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items.firstName} {items.middleName} {items.lastName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <text className=" text-2xl font-bold  flex justify-center ">
                सही :
              </text>
            </div>

            <div>-----------------------------</div>

            <div>-----------------------------</div>

            <div>-----------------------------</div>

            <div>-----------------------------</div>

            <div>-----------------------------</div>
          </div>

          {/* <FormControlLabel
            className=" text-blue-800"
            onChange={handleCheckbox}
            control={<Checkbox value={checked} color="primary" />}
            label="सम्झौता स्विकृत गर्नुहोस ?"
          /> */}

          {/* <FormControlLabel
                    onChange={handleCheckbox}
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  /> */}
        </div>

        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default CreateSamjhauta;
