import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import { invoiceCancelReasonValidationResolver } from "../../../utils/validateField";
import { createInvoiceCancelReason } from "../../../services/apiServices/revenue/invoiceCancelReason/invoceCancelReasonService";
import AddButton from "../../reusableDesign/AddButton";

export default function CreateInvoiceCancelReason  ({ clickedIdData }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: invoiceCancelReasonValidationResolver ,
  defaultValues: {
    id: clickedIdData?.id,
    invoiceModule: clickedIdData?.invoiceModule,
    name: clickedIdData?.name,
    name_Eng: clickedIdData?.name_Eng,
    code: clickedIdData?.code,
  },
   });


  const router = useRouter();

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        data.invoiceModule = parseInt(data.invoiceModule);
        try {
          createInvoiceCancelReason(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push("/revenue/invoiceCancel");
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
  return (
    <>
      <CommonHeaderDesign title={"बिल-रद्द कारण राख्नुहोस "} />
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 border border-black border-dashed ">

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("name")}
              placeholder="."
            />
            <label className="label">Name(नेपाली)</label>
            <p> {errors?.name?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("name_Eng")}
              placeholder="."
            />
            <label className="label">Name(English)</label>

            <p> {errors?.nameEng?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("code")}
              placeholder="."
            />
            <label className="label">Code</label>
            <p> {errors?.code?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              Select the Invoice Module
            </label>
            <select required {...register("invoiceModule")}>
              <option value={""} disabled selected >Select the Invoice Module</option>
              <option value={0}>TaxInvoice</option>
              <option value={1}>ServiceInvoice</option>
            </select>
          </div>
        </div>

        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </>
  );
};
