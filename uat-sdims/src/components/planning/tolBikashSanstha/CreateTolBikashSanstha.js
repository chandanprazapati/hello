import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
import { post } from "../../../services/apiServices/common/post/postService";
import { createTolBikashSanstha } from "../../../services/apiServices/planning/tolBikashSanstha/tolBikashSansthaService";
const CreateTolBikashSanstha = ({ clickedIdData }) => {
  console.log(clickedIdData, "clickedIdData");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
   
  } = useForm(
    {
      defaultValues:{
        tolBikashSansthaId : clickedIdData?.tolBikashSansthaId,
        dartaNo : clickedIdData?.dartaNo,
        tolBikashSansthaName : clickedIdData?.tolBikashSansthaName,
        beneficiaries_Attendance : clickedIdData?.beneficiaries_Attendance,
        beneficiaries_Absent : clickedIdData?.beneficiaries_Absent,
        female_Present : clickedIdData?.female_Present,
        anugamanMember : clickedIdData?.anugamanMember,


      }
    }
  );

  // to set the incoming value to the respective fields
  useEffect(() => {
    if (!clickedIdData) return;
    setTolBikashMembers (clickedIdData?.tolBikashSansthaMemberList);
    setGathanMiti (clickedIdData?.tolSamitiEstdDate);
    setUpasthitiMiti (clickedIdData?.upastithiDate);
    setNibedanMiti (clickedIdData?.nibedanMiti);
  }, [clickedIdData]);

  const router = useRouter();

  const aa = new BikramSambat(new Date()).toBS();

  const [gathanMiti, setGathanMiti] = useState(aa);
  const handelGathanMiti = (e) => {
    setGathanMiti(e);
  };

  const [upasthitiMiti, setUpasthitiMiti] = useState(aa);
  const handelUpasthitiMiti = (e) => {
    setUpasthitiMiti(e);
  };

  const [nibedanMiti, setNibedanMiti] = useState(aa);

  const handelNibedanMiti = (e) => {
    setNibedanMiti(e);
  };

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        data = {
          ...data,
          tolSamitiEstdDate: gathanMiti,
          upastithiDate: upasthitiMiti,
          nibedanMiti: nibedanMiti,
          tolBikashSansthaMemberList: tolBikashMembers,
        };
        try {
          createTolBikashSanstha(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push("/planning/tolbikashsanstha");
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

  // for mutliple form

  const handleAddForm = () => {
    setTolBikashMembers([
      ...tolBikashMembers,
      {
        padaId: "",
        name: "",
        address: "",
        phoneNumber: "",
        nagariktaNumber: "",
        grandFatherName: "",
        fatherName: "",
        imagePath: "",
      },
    ]);
  };

  const [tolBikashMembers, setTolBikashMembers] = useState([
    {
      padaId: "",
      name: "",
      address: "",
      phoneNumber: "",
      nagariktaNumber: "",
      grandFatherName: "",
      fatherName: "",
      imagePath: "",
    },
  ]);

  const handleDeleteForm = (index) => {
    const list = [...tolBikashMembers];
    list.splice(index, 1);
    setTolBikashMembers(list);
  };

  const [postIdApi, setPostIdApi] = useState([]);

  const handlePadaChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...tolBikashMembers];
    list[index][name] = value;
    setTolBikashMembers(list);
  };

  useEffect(() => {
    let postIdFromApi = () => {
      post().then((response) => {
        try {
          response.status === true;
          {
            setPostIdApi(response.data);
          }
        } catch (error) {}
      });
    };
    postIdFromApi();
  }, []);

  const handleNameChage = (e, index) => {
    const { name, value } = e.target;
    const list = [...tolBikashMembers];
    list[index][name] = value;
    setTolBikashMembers(list);
  };

  const handleAddress = (e, index) => {
    const { name, value } = e.target;
    const list = [...tolBikashMembers];
    list[index][name] = value;
    setTolBikashMembers(list);
  };

  const handlePhoneNumber = (e, index) => {
    const { name, value } = e.target;
    const list = [...tolBikashMembers];
    list[index][name] = value;
    setTolBikashMembers(list);
  };

  const handleNagritaNumbers = (e, index) => {
    const { name, value } = e.target;
    const list = [...tolBikashMembers];
    list[index][name] = value;
    setTolBikashMembers(list);
  };

  const handleFatherName = (e, index) => {
    const { name, value } = e.target;
    const list = [...tolBikashMembers];
    list[index][name] = value;
    setTolBikashMembers(list);
  };

  const handleGrandFatherName = (e, index) => {
    const { name, value } = e.target;
    const list = [...tolBikashMembers];
    list[index][name] = value;
    setTolBikashMembers(list);
  };

  const handleImagePath = (e, index) => {
    const { name, value } = e.target;
    const list = [...tolBikashMembers];
    list[index][name] = value;
    setTolBikashMembers(list);
  };

  return (
    <>
      <CommonHeaderDesign title={"टोल विकास संस्था समिति राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% text-center text-2xl py-3 rounded-xl font-bold ">
          टोल विकास संस्था समिति सम्बन्धि विवरण :
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("dartaNo")}
              placeholder="."
            />
            <label className="label">समिति दर्ता न </label>
            <p> {errors?.dartaNo?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("tolBikashSansthaName")}
              placeholder="."
            />
            <label className="label">टोल विकास समितिको नाम</label>
            <p> {errors?.tolBikashSansthaName?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              टोल विकास समिति गठन भएको मितिः(BS)
            </label>

            <NepaliDatePicker
              value={gathanMiti}
              className="peer"
              onChange={handelGathanMiti}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("beneficiaries_Attendance")}
              placeholder="."
            />
            <label className="label">
              समिति गठन गर्दा उपस्थित लाभान्वितको संख्याः
            </label>
            <p> {errors?.beneficiaries_Attendance?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("beneficiaries_Absent")}
              placeholder="."
            />
            <label className="label">
              {" "}
              समिति गठन गर्दा अनुपस्थित लाभान्वितको संख्या
            </label>
            <p> {errors?.beneficiaries_Absent?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              आयोजना स्थलमा जनप्रतिनिधि/कर्मचारीको उपस्थिति मिति (BS)
            </label>

            <NepaliDatePicker
              value={upasthitiMiti}
              className="peer"
              onChange={handelUpasthitiMiti}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("female_Present")}
              placeholder="."
            />
            <label className="label">महिला उपस्थित</label>
            <p> {errors?.female_Present?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("anugamanMember")}
              placeholder="."
            />
            <label className="label">अनुगमन समिति संख्या</label>
            <p> {errors?.anugamanMember?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              निवेदन प्राप्त मिति (BS)
            </label>

            <NepaliDatePicker
              value={nibedanMiti}
              className="peer"
              onChange={handelNibedanMiti}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
        </div>
        <br />

        <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% py-3 rounded-xl flex justify-between px-4 ">
          <div className="  text-2xl font-bold">
            २.टोल विकास संस्था समितिको सदस्यहरू
          </div>

          <div
            className="bg-red-500 px-2 py-3 rounded shadow-lg cursor-pointer "
            onClick={handleAddForm}
          >
            Add New Form
          </div>
        </div>

        {tolBikashMembers.map((singleSamiti, index) => (
          <div
            key={index}
            className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  "
          >
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">पद</label>
              <select
                onChange={(e) => handlePadaChange(e, index)}
                className="peer"
                name="padaId"
                value={singleSamiti.padaId}
                required
              >
                <option value={""} disabled selected>
                  --- पोस्ट चयन गर्नुहोस् ---
                </option>
                {postIdApi.map((items, index) => {
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
                type="string"
                className="peer"
                name="name"
                value={singleSamiti.name}
                onChange={(e) => handleNameChage(e, index)}
                placeholder="."
              />
              <label className="label">नाम</label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                className="peer"
                name="phoneNumber"
                value={singleSamiti.phoneNumber}
                onChange={(e) => handlePhoneNumber(e, index)}
                placeholder="."
              />
              <label className="label">सम्पर्क नम्बर</label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="string"
                className="peer"
                name="nagariktaNumber"
                value={singleSamiti.nagariktaNumber}
                onChange={(e) => handleNagritaNumbers(e, index)}
                placeholder="."
              />
              <label className="label">नागरिकता न</label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="string"
                className="peer"
                name="fatherName"
                value={singleSamiti?.fatherName}
                onChange={(e) => handleFatherName(e, index)}
                placeholder="."
              />
              <label className="label">बाबुको नाम</label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="string"
                className="peer"
                name="address"
                value={singleSamiti.address}
                onChange={(e) => handleAddress(e, index)}
                placeholder="."
              />
              <label className="label">ठेगाना</label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="string"
                className="peer"
                name="grandFatherName"
                value={singleSamiti.grandFatherName}
                onChange={(e) => handleGrandFatherName(e, index)}
                placeholder="."
              />
              <label className="label">हजुरबुबाको नाम</label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="file"
                className="peer"
                name="imagePath"
                value={singleSamiti.imagePath}
                onChange={(e) => handleImagePath(e, index)}
                placeholder="."
              />
              <label className="label">नागरिकता फोटोकपी </label>
            </div>
            {tolBikashMembers.length > 1 && (
              <div className="flex justify-end p-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded "
                  onClick={() => handleDeleteForm(index)}
                >
                  Delete Form
                </button>
              </div>
            )}
          </div>
        ))}

        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </>
  );
};

export default CreateTolBikashSanstha;
