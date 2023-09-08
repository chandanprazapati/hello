import React, { useEffect, useRef, useState } from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { useForm } from "react-hook-form";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { likhitZawaf } from "../../../../services/apiServices/legalCase/legalCaseService";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function LikhitZawafById({ clickedIdData }) {
  const router = useRouter();
  const { query } = useRouter();
  const titleRef = useRef(null);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    data = {
      ...data,
      caseId: query.id,
      replyForCaseViewModelList: replyForCaseViewModelList,
    };

    try {
      const response = await likhitZawaf(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/legalCase/caseDetail");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //   for dynamic form petitioner
  const [replyForCaseViewModelList, setReplyForCaseViewModelList] = useState([
    {
      replyPointsName: "",
    },
  ]);

  const handleAddReplyForCaseViewModelList = () => {
    setReplyForCaseViewModelList([
      ...replyForCaseViewModelList,
      {
        replyPointsName: "",
      },
    ]);
  };

  const handleDeleteReplyForCaseViewModelList = (index) => {
    const list = [...replyForCaseViewModelList];
    list.splice(index, 1);
    setReplyForCaseViewModelList(list);
  };

  const handleReplyPointsNameChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...replyForCaseViewModelList];
    list[index][name] = value;
    setReplyForCaseViewModelList(list);
  };

  return (
    <div>
      <SeoOptimization title={"लिखित जवाफ"} />
      <CommonHeaderDesign title={"लिखित जवाफ वुँदाहरुमा थप्नुहोस  "} />
      <form onSubmit={handleSubmit(onSubmit)} ref={titleRef}>
        <div className=" bg-[#5197d1] py-3 rounded-xl flex justify-between px-4  ">
          <text className="text-xl pt-2 font-bold">लिखित जवाफहरु</text>

          <div
            className="bg-green-300 hover:bg-green-500 px-6 py-3 rounded shadow-lg cursor-pointer "
            onClick={handleAddReplyForCaseViewModelList}
          >
            <div className="flex  gap-2 ">
              <FaPlus size={20} />
              <text>थप्नुहोस्</text>
            </div>
          </div>
        </div>

        {replyForCaseViewModelList.map((detail, index) => {
          return (
            <div
              key={index}
              className="grid lg:grid-cols-3 px-10 gap-1 py-4 border border-black border-dashed shadow-2xl bg-gray-100  "
            >
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg  "
                name="replyPointsName"
                value={detail.replyPointsName}
                onChange={(e) => handleReplyPointsNameChange(e, index)}
                placeholder="."
              />

              <div className="py-2">
                {replyForCaseViewModelList.length > 1 && (
                  <div className="flex justify-center   ">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded py-2 "
                      onClick={() =>
                        handleDeleteReplyForCaseViewModelList(index)
                      }
                    >
                      <FaTrashAlt size={20} />
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
    </div>
  );
}
