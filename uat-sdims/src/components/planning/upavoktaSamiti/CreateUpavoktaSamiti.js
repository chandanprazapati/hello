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
import { createUpabhoktaSamiti } from "../../../services/apiServices/planning/upabhoktaSamiti/upabhoktaSamitiService";
import { post } from "../../../services/apiServices/common/post/postService";
const aa = new BikramSambat(new Date()).toBS();

const CreateUpavoktaSamiti = ({ clickedIdData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      upabhoktaSamitiDetailId: clickedIdData?.upabhoktaSamitiDetailId,
      dartaNo: clickedIdData?.dartaNo,
      name: clickedIdData?.name,
      beneficiaries_Attendance: clickedIdData?.beneficiaries_Attendance,
      beneficiaries_Absent: clickedIdData?.beneficiaries_Absent,
      female_Present: clickedIdData?.female_Present,
      anugamanMember: clickedIdData?.anugamanMember,
    },
  });

  const router = useRouter();

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
          nepaliSamitiEstdDate: gathanMiti,
          samitiDate: upasthitiMiti,
          nibedanMiti: nibedanMiti,
          samitiMemberDetaillist: samitiMembers,
        };
        try {
          createUpabhoktaSamiti(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push("/planning/upabhoktasamiti");
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

  // to set the incoming value to the respective fields
  useEffect(() => {
    if (!clickedIdData) return;
    setSamitiMembers(clickedIdData?.samitiMemberDetaillist || []);
    setGathanMiti(clickedIdData?.nepaliSamitiEstdDate || aa);
    setUpasthitiMiti(clickedIdData?.samitiDate || aa);
    setNibedanMiti(clickedIdData?.nibedanMiti || aa);
  }, [clickedIdData]);

  // for mutliple form

  const handleAddForm = () => {
    setSamitiMembers([
      ...samitiMembers,
      {
        padaId: "",
        memberName: "",
        phoneNo: "",
        age: "",
        address: "",
        fatherName: "",
        imagePath: "",
        grandFatherName: "",
        // dob: "",
      },
    ]);
  };

  const [samitiMembers, setSamitiMembers] = useState([
    {
      padaId: "",
      memberName: "",
      phoneNo: "",
      age: "",
      address: "",
      fatherName: "",
      imagePath: "",
      grandFatherName: "",
      // dob: "",
    },
  ]);

  const handleDeleteForm = (index) => {
    const list = [...samitiMembers];
    list.splice(index, 1);
    setSamitiMembers(list);
  };

  const [postIdApi, setPostIdApi] = useState([]);

  const handlePadaChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...samitiMembers];
    list[index][name] = value;
    setSamitiMembers(list);
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
    const list = [...samitiMembers];
    list[index][name] = value;
    setSamitiMembers(list);
  };

  const handleContact = (e, index) => {
    const { name, value } = e.target;
    const list = [...samitiMembers];
    list[index][name] = value;
    setSamitiMembers(list);
  };

  const handleAge = (e, index) => {
    const { name, value } = e.target;
    const list = [...samitiMembers];
    list[index][name] = value;
    setSamitiMembers(list);
  };

  const handleFather = (e, index) => {
    const { name, value } = e.target;
    const list = [...samitiMembers];
    list[index][name] = value;
    setSamitiMembers(list);
  };

  const handleAddress = (e, index) => {
    const { name, value } = e.target;
    const list = [...samitiMembers];
    list[index][name] = value;
    setSamitiMembers(list);
  };

  const handleGrandFather = (e, index) => {
    const { name, value } = e.target;
    const list = [...samitiMembers];
    list[index][name] = value;
    setSamitiMembers(list);
  };

  const handleCitizenshipPhoto = (e, index) => {
    const { name, value } = e.target;
    const list = [...samitiMembers];
    list[index][name] = value;
    setSamitiMembers(list);
  };

  // const handleBirthDate = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...samitiMembers];
  //   list[index][name] = value;
  //   setSamitiMembers(list);
  // };

  return (
    <>
      <CommonHeaderDesign title={"उपभोक्ता समिति राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% text-center text-2xl py-3 rounded-xl font-bold ">
          उपभोक्ता समिति /गैर सरकारी संस्था /समुदायमा आधारीत संस्था सम्बन्धि
          विवरण :
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("dartaNo")}
              placeholder="."
            />
            <label className="label">उपभोक्ता दर्ता न :</label>
            <p> {errors?.budgetSubTypeName?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("name")}
              placeholder="."
            />
            <label className="label">उपभोक्ता समितिको नाम</label>
            <p> {errors?.name?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              समिति गठन भएको मिति(BS)
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
              समिति गठन गर्दा उपस्थित लाभान्वितको संख्या
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
              आयोजना स्थलमा जनप्रतिनिधि/कर्मचारीको उपस्थिति मिति (BS)
            </label>

            <NepaliDatePicker
              value={upasthitiMiti}
              className="peer"
              onChange={handelUpasthitiMiti}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
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
          <div className="  text-2xl font-bold">२. उपभोक्ता समितिको विवरण</div>

          <div
            className="bg-red-500 px-2 py-3 rounded shadow-lg cursor-pointer "
            onClick={handleAddForm}
          >
            Add New Form
          </div>
        </div>

        {samitiMembers.map((singleSamiti, index) => (
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
                name="memberName"
                value={singleSamiti.memberName}
                onChange={(e) => handleNameChage(e, index)}
                placeholder="."
              />
              <label className="label">नाम</label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                className="peer"
                name="phoneNo"
                value={singleSamiti.phoneNo}
                onChange={(e) => handleContact(e, index)}
                placeholder="."
              />
              <label className="label">सम्पर्क नम्बर</label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                className="peer"
                name="age"
                value={singleSamiti.age}
                onChange={(e) => handleAge(e, index)}
                placeholder="."
              />
              <label className="label">उमेर</label>
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
            {/* <div className="relative  w-full mb-6 group">
              <label
                htmlFor=""
                className=" absolute text-[10px] text-blue-900 -top-[15%]"
              >
                जन्म मिति(BS)
              </label>

              <NepaliDatePicker
              type="string"
                name="dob"
                value={singleSamiti.dob}
                className="peer"
                onChange={(e) => handleBirthDate(e, index)}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
            </div> */}
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="string"
                className="peer"
                name="fatherName"
                value={singleSamiti.fatherName}
                onChange={(e) => handleFather(e, index)}
                placeholder="."
              />
              <label className="label">बाबुको नाम</label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="string"
                className="peer"
                name="grandFatherName"
                value={singleSamiti.grandFatherName}
                onChange={(e) => handleGrandFather(e, index)}
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
                onChange={(e) => handleCitizenshipPhoto(e, index)}
                placeholder="."
              />
              <label className="label">नागरिकता फोटोकपी </label>
            </div>
            {samitiMembers.length > 1 && (
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

export default CreateUpavoktaSamiti;
