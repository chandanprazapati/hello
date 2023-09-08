import React, { useEffect, useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";
import "nepali-datepicker-reactjs/dist/index.css";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
import { FaMinus, FaPlus } from "react-icons/fa";
import AddButton from "../../../../components/reusableDesign/AddButton";
const aa = new BikramSambat(new Date()).toBS();

export default function createElectricityConnect(clickedIdData) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: awabihawitValidationResolver,
    // defaultValues: {
    //   id: clickedIdData?.id,
    //   fullName_Nepali: clickedIdData?.fullName_Nepali,
    //   fullName_English: clickedIdData?.fullName_English,
    // },
  });
  const onSubmit = async (data) => {
    // try {
    //   const response = await insertAwabihawit(data);
    //   if (response.status === true) {
    //     toast.success(response.message, {
    //       icon: "🚀",
    //       autoClose: 1000,
    //     });
    //     router.push("/sifarish/awabihawit");
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };
  //for dynamic form
  const [prevElectricConnected, setPrevElectricConnected] = useState([
    {
      kilowat: "",
      jadanHune: "",
      sankhya: "",
      wat: "",
      totalWat: "",
    },
  ]);
  const handleAddPrevElectricConnected = () => {
    setPrevElectricConnected([
      ...prevElectricConnected,
      {
        kilowat: "",
        jadanHune: "",
        sankhya: "",
        wat: "",
        totalWat: "",
      },
    ]);
  };

  const handleChangeKilowat = (e, index) => {
    const { name, value } = e.target;
    const list = [...prevElectricConnected];
    list[index][name] = value;
    setPrevElectricConnected(list);
  };
  const handleChangeJadanHune = (e, index) => {
    const { name, value } = e.target;
    const list = [...prevElectricConnected];
    list[index][name] = value;
    setPrevElectricConnected(list);
  };
  const handleChangeSankhya = (e, index) => {
    const { name, value } = e.target;
    const list = [...prevElectricConnected];
    list[index][name] = value;
    setPrevElectricConnected(list);
  };
  const handleChangeWat = (e, index) => {
    const { name, value } = e.target;
    const list = [...prevElectricConnected];
    list[index][name] = value;
    setPrevElectricConnected(list);
  };
  const handleChangeTotalWat = (e, index) => {
    const { name, value } = e.target;
    const list = [...prevElectricConnected];
    list[index][name] = value;
    setPrevElectricConnected(list);
  };
  const handleDeletePrevElectricConnection = (index) => {
    const list = [...prevElectricConnected];
    list.splice(index, 1);
    setPrevElectricConnected(list);
  };

  //for date picker
  const [date, setDate] = useState(aa);
  useEffect(() => {
    if (clickedIdData) {
      setDate(clickedIdData?.date || aa);
    }
  }, [clickedIdData]);

  const watchAllFields = watch();

  return (
    <>
      <CommonHeaderDesign title={"बिजुली जडान सिफारिस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १. व्यक्तिगत विवरण
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">
              नाम(Nep)
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">नाम(Eng)</label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">
              नागरिकता नं.
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              {" "}
              नागरिकता जारी जिल्ला
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("nagriktaJariJillaId")}
              className="peer requiredField"
            >
              <option value={""}>--- नागरिकता जिल्ला छान्नुहोस् ---</option>
              {/* {nagritaDistrictOptions} */}
            </select>
            <p> {errors?.nagriktaJariJillaId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">
              पेशा वा संस्थाको किसिम
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">
              बाबु/पतिको नाम
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">बाबु/पतिको नाम(Eng)</label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">
              बाजे/ससुराको नाम
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">बाजे/ससुराको नाम(Eng)</label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">
              घर धनीको नाम
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">घर धनीको नाम(Eng)</label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              बिजुली उपयोगीताको किसिम
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("nagriktaJariJillaId")}
              className="peer requiredField"
            >
              <option value={""}>
                --- बिजुली उपयोगीताको किसिम छान्नुहोस् ---
              </option>
              {/* {nagritaDistrictOptions} */}
            </select>
            <p> {errors?.nagriktaJariJillaId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              आवश्यकताको किसिम
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("nagriktaJariJillaId")}
              className="peer requiredField"
            >
              <option value={""}>--- आवश्यकताको किसिम छान्नुहोस् ---</option>
              {/* {nagritaDistrictOptions} */}
            </select>
            <p> {errors?.nagriktaJariJillaId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              विजुलीको किसिम
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("nagriktaJariJillaId")}
              className="peer requiredField"
            >
              <option value={""}>--- विजुलीको किसिम छान्नुहोस् ---</option>
              {/* {nagritaDistrictOptions} */}
            </select>
            <p> {errors?.nagriktaJariJillaId?.message}</p>
          </div>
        </div>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          २. विजुली जडान गर्ने संस्थाको पूरा ठेगाना
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">
              घर नं
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">
              टोल
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">
              वडा नं
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              {" "}
              प्रदेश
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("nagriktaJariJillaId")}
              className="peer requiredField"
            >
              <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
              {/* {nagritaDistrictOptions} */}
            </select>
            <p> {errors?.nagriktaJariJillaId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              {" "}
              जिल्ला <span className="requiredField">*</span>
            </label>
            <select
              {...register("nagriktaJariJillaId")}
              className="peer requiredField"
            >
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {/* {nagritaDistrictOptions} */}
            </select>
            <p> {errors?.nagriktaJariJillaId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              {" "}
              गा.पा./न.पा. <span className="requiredField">*</span>
            </label>
            <select
              {...register("nagriktaJariJillaId")}
              className="peer requiredField"
            >
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {/* {nagritaDistrictOptions} */}
            </select>
            <p> {errors?.nagriktaJariJillaId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">
              मोबाइल नं
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">फोन नं</label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">इमेल</label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">प्राविधिकको नाम</label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">प्राविधिकको नाम (Eng)</label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              {" "}
              घरको बनोट
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("nagriktaJariJillaId")}
              className="peer requiredField"
            >
              <option value={""}>--- घरको बनोट छान्नुहोस् ---</option>
              {/* {nagritaDistrictOptions} */}
            </select>
            <p> {errors?.nagriktaJariJillaId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">तल्ला</label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">
              जम्मा कोठा संख्या
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
        </div>
        <div className=" pt-4 border border-black border-dashed border-t-0 ">
          <FormControlLabel
            className="pl-4"
            {...register("isActive")}
            control={
              <Checkbox
                color="primary"
                defaultChecked={clickedIdData?.isActive}
              />
            }
            label="उल्लेखित ठाउँमा पहिलेदेखिनै बत्ति भए सो को विवरण"
          />
          {watchAllFields?.isActive && (
            <>
              <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
                ३. विजुली अघिल्लो जडान गर्ने संस्थाको पूरा ठेगाना
              </div>
              <div className="grid lg:grid-cols-4 shadow-2xl bg-gray-100 gap-5 px-5 pt-6 ">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer  "
                    {...register("registeredNikayeName_Np")}
                    placeholder="."
                  />
                  <label className="label">ग्राहक नं</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer  "
                    {...register("registeredNikayeName_Np")}
                    placeholder="."
                  />
                  <label className="label">पहिले ग्राहको नाम</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer  "
                    {...register("registeredNikayeName_Np")}
                    placeholder="."
                  />
                  <label className="label">पहिले ग्राहको नाम(Eng)</label>
                </div>
                <div className="relative  w-full mb-6 group">
                  <label
                    htmlFor=""
                    className=" absolute text-[10px] text-blue-900 -top-[15%]"
                  >
                    पहिले जडान भएको मिति(BS)
                  </label>
                  <NepaliDatePicker
                    value={date}
                    className="peer"
                    onChange={(e) => setDate(e)}
                    options={{ calenderLocale: "ne", valueLocale: "en" }}
                  />
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer  "
                    {...register("registeredNikayeName_Np")}
                    placeholder="."
                  />
                  <label className="label">पहिले जडान ठेगाना</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer  "
                    {...register("registeredNikayeName_Np")}
                    placeholder="."
                  />
                  <label className="label">पहिले जडान ठेगाना(Eng)</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer  "
                    {...register("registeredNikayeName_Np")}
                    placeholder="."
                  />
                  <label className="label">बाबु/पतिको नाम</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer  "
                    {...register("registeredNikayeName_Np")}
                    placeholder="."
                  />
                  <label className="label">बाबु/पतिको नाम(Eng)</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer  "
                    {...register("registeredNikayeName_Np")}
                    placeholder="."
                  />
                  <label className="label">घरबेटीको नाम</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer  "
                    {...register("registeredNikayeName_Np")}
                    placeholder="."
                  />
                  <label className="label">घरबेटीको नाम(Eng)</label>
                </div>
              </div>
            </>
          )}
        </div>
        <div className=" bg-[#5197d1] py-3 rounded-xl flex justify-between px-4  ">
          <text className="text-xl pt-2 font-bold text-white">
            ४. जडान विवरण
          </text>

          <div
            className="bg-green-300 hover:bg-green-500 px-6 py-3 rounded shadow-lg cursor-pointer "
            onClick={handleAddPrevElectricConnected}
          >
            <div className="flex  gap-2 ">
              <FaPlus size={20} />
              <text>थप्नुहोस्</text>
            </div>
          </div>
        </div>
        <div className="text-lg font-bold pr-4 py-4 flex justify-between ">
          <div className=" ">किलो वाट</div>
          <div className=" ">जडान हुने सामान</div>
          <div className=" ">संख्या</div>
          <div className=" ">वाट</div>
          <div className=" ">जम्मा वाट</div>
          <div className=" ">कार्य </div>
        </div>
        {prevElectricConnected?.map((item, index) => {
          return (
            <div
              key={index}
              className="grid lg:grid-cols-5 gap-1 py-4 border border-black border-dashed shadow-2xl bg-gray-100 px-1"
            >
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-32 "
                name="kilowat"
                value={item.kilowat}
                onChange={(e) => handleChangeKilowat(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-32 "
                name="jadanHune"
                value={item.jadanHune}
                onChange={(e) => handleChangeJadanHune(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-32 "
                name="sankhya"
                value={item.sankhya}
                onChange={(e) => handleChangeSankhya(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-32 "
                name="wat"
                value={item.wat}
                onChange={(e) => handleChangeWat(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300 mr-8 rounded-lg w-32 "
                name="totalWat"
                value={item.totalWat}
                onChange={(e) => handleChangeTotalWat(e, index)}
                placeholder="."
              />
              <div>
                {prevElectricConnected.length > 1 && (
                  <div className=" justify-end ">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded py-2 "
                      onClick={() => handleDeletePrevElectricConnection(index)}
                    >
                      <FaMinus />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </>
  );
}
