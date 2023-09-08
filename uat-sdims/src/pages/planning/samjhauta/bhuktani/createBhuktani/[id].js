import React, { useEffect, useState } from "react";
import ViewPage from "../../../../../components/viewPage/ViewPage";
import { useForm } from "react-hook-form";
import AddButton from "../../../../../components/reusableDesign/AddButton";
import { FaPlus } from "react-icons/fa";
import CommonHeaderDesign from "../../../../../components/reusableDesign/CommonHeaderDesign";
import { bhuktaniType } from "../../../../../services/apiServices/planning/bhuktaniType/bhuktaniTypeService";
import { fiscal } from "../../../../../services/apiServices/common/fiscal/fiscalService";
import { bhuktaniTypeForSamjhautaValidateResolver } from "../../../../../utils/validateField";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
const aa = new BikramSambat(new Date()).toBS();
import BikramSambat from "bikram-sambat-js";
import { Checkbox, FormControlLabel } from "@mui/material";
import { createPlanningBhuktani } from "../../../../../services/apiServices/planning/planningSamjhauta/planningSamjhautaService";
const BS = require("bikram-sambat-js");
export default function Index({ clickedIdData }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resover: bhuktaniTypeForSamjhautaValidateResolver,
  });

  const onSubmit = async (data) => {
    data = {
      ...data,
      samjhautaDate : samjhautaDate,
    };
    try {
      const response = await createPlanningBhuktani(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/common/fiscal");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // for bhuktani type
  const [bhuktaniTypeData, setBhuktaniTypeData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await bhuktaniType();
        if (response.status === true) {
          setBhuktaniTypeData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const bhuktaniOptions = bhuktaniTypeData.map((item) => {
    return (
      <option
        value={item.bhuktaniTypeId}
        key={item.bhuktaniTypeId}
        selected={item.bhuktaniTypeId === clickedIdData?.planningBhuktaniId}
      >
        {item.bhuktaniTypeName}
      </option>
    );
  });

  // for previous fiscal year
  const [fiscalData, setFiscalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fiscal();
        if (response.status === true) {
          setFiscalData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const fiscalOptions = fiscalData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.fiscalYearId}
      >
        {item.name}
      </option>
    );
  });

  // for date picker
  const [samjhautaDate, setSamjhautaDate] = useState(aa);
  // for setting the values of start date and end date
  useEffect(() => {
    if (clickedIdData) {
      setDateFrom(clickedIdData.samjhautaDate || aa);
    }
  }, [clickedIdData]);

  return (
    <React.Fragment>
      <CommonHeaderDesign title={"रकम भुक्तानी फारम विवरण"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-[#4189c3] text-center text-2xl py-3 rounded-xl font-bold ">
          व्यक्तिगत विवरण
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">भुक्तानी प्रकार </label>
            <select {...register("planningBhuktaniId")} className="peer">
              <option value={""}>--- भुक्तानी प्रकार चयन गर्नुहोस् ---</option>
              {bhuktaniOptions}
            </select>
            <p> {errors?.planningBhuktaniId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">आर्थिक वर्ष </label>
            <select {...register("fiscalYearId")} className="peer">
              <option value={""}>--- आर्थिक वर्ष चयन गर्नुहोस् ---</option>
              {fiscalOptions}
            </select>
            <p> {errors?.fiscalYearId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("aayojana_Karyakram")}
              placeholder="."
            />
            <label className="label">योजना / कार्यक्रम</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("aayojana_Karyakram")}
              placeholder="."
            />
            <label className="label">वजेट शिर्षक</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("aayojana_Karyakram")}
              placeholder="."
            />
            <label className="label">वजेट शिर्षक नं.</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("nirman_Upabhokta")}
              placeholder="."
            />
            <label className="label">उपभोक्ता समिति</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("adakshyaName")}
              placeholder="."
            />
            <label className="label">अध्यक्षको नाम</label>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              सम्झोेता मिति (BS)
            </label>
            <NepaliDatePicker
              value={samjhautaDate}
              className="peer"
              onChange={(e) => setSamjhautaDate(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
        </div>
        <div className="bg-[#4189c3] text-center text-2xl py-3 rounded-xl font-bold ">
          आयोजनाको विवरण
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("kul_La_Ie")}
              placeholder="."
            />
            <label className="label">कुल ल.ई.</label>
          </div>{" "}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("naPa_Binayajit")}
              placeholder="."
            />
            <label className="label">न.पा.विनियोजित</label>
          </div>{" "}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("running_Bhuktani")}
              placeholder="."
            />
            <label className="label">रनिङ भुक्तानी</label>
          </div>{" "}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("jana_Sahabagita")}
              placeholder="."
            />
            <label className="label">जन सहभागिता</label>
          </div>{" "}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("kantigenci")}
              placeholder="."
            />
            <label className="label">कन्टेन्जेन्सी ( प्रतिशत)</label>
          </div>{" "}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("marmatShmar")}
              placeholder="."
            />
            <label className="label">मर्मत सम्भार ( प्रतिशत)</label>
          </div>{" "}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("peski")}
              placeholder="."
            />
            <label className="label">पेश्की रकम</label>
          </div>{" "}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("farchot_Amount")}
              placeholder="."
            />
            <label className="label">फर्छोेट गर्नुपर्ने पेश्की रकम</label>
          </div>{" "}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("technical_Amount")}
              placeholder="."
            />
            <label className="label">प्राविधिक मूल्याङ्कन</label>
          </div>{" "}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("dhuwani")}
              placeholder="."
            />
            <label className="label">धुवानी ( प्रतिशत)</label>
          </div>{" "}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("royality")}
              placeholder="."
            />
            <label className="label">रोयल्टी ( प्रतिशत)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("agrim_Shulka")}
              placeholder="."
            />
            <label className="label">अग्रिम आय कर ( प्रतिशत)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("parishramik")}
              placeholder="."
            />
            <label className="label">पारिश्रमिक कर ( प्रतिशत)</label>
          </div>{" "}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("bahal_Kar")}
              placeholder="."
            />
            <label className="label">बहाल कर (प्रतिशत)</label>
          </div>{" "}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("katti_Rakam")}
              placeholder="."
            />
            <label className="label">जम्मा कट्टी रकम</label>
          </div>{" "}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("remaining_Bhuktani_Amount")}
              placeholder="."
            />
            <label className="label">भुक्तानी रकम</label>
          </div>
          
          <text className="text-red-600" ><span className="text-xl" >*</span> एक पटक स्विकृत गरिएको भुक्तानी सच्याउन मिल्दैन ।</text>
          <FormControlLabel
            className="pl-4"
            {...register("isBhuktaniApproval")}
            control={
              <Checkbox
                color="primary"
                defaultChecked={clickedIdData?.isBhuktaniApproval}
              />
            }
            label="भुक्तानी स्विकृत गर्नुहोस ?"
          />
        </div>


        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </React.Fragment>
  );
}
