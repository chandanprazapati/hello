import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
import "react-quill/dist/quill.snow.css";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import dynamic from "next/dynamic";
import { createSarta } from "../../../services/apiServices/planning/sartaSetup/sartaSetupService";
export default function CreateSartaSetup({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
      description: clickedIdData?.containt,
    },
  });

  // to set the incoming value to the respective fields
  useEffect(() => {
    setValue("id", clickedIdData?.id);
    setValue("name", clickedIdData?.name);
    setContaint(clickedIdData?.description);
  }, [clickedIdData, setValue]);

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        data = {
          ...data,
          description: containt,
        };
        try {
          createSarta(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push("/planning/sarta");
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

  const [containt, setContaint] = React.useState("");

  return (
    <React.Fragment>
      <CommonHeaderDesign title={"सम्झौताका शर्त  राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("name")}
              placeholder="."
            />
            <label className="label">
              बोधार्थ नाम (नेपाली)
              <span className="requiredField">*</span>
            </label>
          </div>
        </div>
        <div className="py-4 font-extrabold text-xl ">बोदार्थ विवरण</div>
        <QuillNoSSRWrapper
          theme="snow"
          value={containt}
          onChange={setContaint}
        />

        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </React.Fragment>
  );
}
