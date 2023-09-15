import React from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { useForm } from "react-hook-form";

export default function index() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    //   resolver: vivahDartaValidationResolver,
    //   defaultValues: {
    //     id: clickedIdData?.id,
    //     name_Nep: clickedIdData?.clickedIdData?.name_Nep,
    //   },
  });
  const onSubmit = async (data) => {
    console.log(data, "vivahDarta");
    // try {
    //   const response = await insertScholarship(data);
    //   if (response.status === true) {
    //     toast.success(response.message, {
    //       icon: "🚀",
    //       autoClose: 1000,
    //     });
    //     router.push("/sifarish/scholarship");
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <>
      <CommonHeaderDesign title={"विवाह दर्ता सिफारिश"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १. विवाह विवरण
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fatherName_Nep")}
              placeholder="."
            />
            <label className="label">वार्ड</label>
            <p> {errors?.fatherName_Nep?.message}</p>
          </div>
        </div>
      </form>
    </>
  );
}
