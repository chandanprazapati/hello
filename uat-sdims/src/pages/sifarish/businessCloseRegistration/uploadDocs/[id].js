import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  businessCloseFileUpload,
  getBusinessCloseFielUpload,
} from "../../../../services/apiServices/sifarish/businessClose/businessClose";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";

export default function UploadDocsId() {
  const router = useRouter();
  const { query } = useRouter();
  const { register, handleSubmit, isSubmitting } = useForm();

  //image for petitioner
  const [loading, setLoading] = useState(true);
  const [imagePreviewsBusinessClose, setImagePreviewsBusinessClose] = useState(
    []
  );
  console.log(imagePreviewsBusinessClose);
  const handleChangeBusinessClose = (e) => {
    const files = e.target.files;
    const previews = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target.result);
        if (previews.length === files.length) {
          setImagePreviewsBusinessClose(previews);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };
  // on submmit
  const onSubmit = async (data) => {
    console.log(data, "data");
    try {
      const formData = new FormData();
      formData.append("Files", data.imagePreviewsBusinessClose);
      formData.append("BewasayaBandaId", query.id);

      //Append Image
      for (let i = 0; i < imagePreviewsBusinessClose.length; i++) {
        const file = data.Files[i];
        formData.append("Files", file);
      }

      const response = await businessCloseFileUpload(formData);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/sifarish/businessCloseRegistration");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // to get the image from the Api
  const [apiData, setApiData] = useState();
  console.log(apiData, "apiData");
  useEffect(() => {
    if (query?.id) {
      let receiptApiData = () => {
        getBusinessCloseFielUpload(query?.id).then((response) => {
          try {
            response.status === true;
            {
              setApiData(response.data);
              setLoading(false);
            }
          } catch (error) {
            console.log(error);
          }
        });
      };
      receiptApiData();
    }
  }, [query?.id]);

  return (
    <>
      <CommonHeaderDesign title={"ब्यवसाय बन्द सिफारिस कागजात अपलोड"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" grid lg:grid-cols-1  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Upload Files</label>
            {/* display Image preview */}
            <div>
              {imagePreviewsBusinessClose.map((preview, index) => (
                <Image
                  key={index}
                  src={preview}
                  alt={`preview ${index}`}
                  width={200}
                  height={200}
                  style={{ maxWidth: "200px" }}
                />
              ))}
            </div>
            <input
              type="file"
              className="border-2  pb-6 border-black px-5 "
              {...register("Files")}
              multiple
              accept="image/*"
              onChange={handleChangeBusinessClose}
            />
          </div>
          {/* Display Image Preview */}
          <div className="image-grid">
            {apiData?.map((items, index) => {
              return (
                <div key={index} className="image-container">
                  <Image
                    src={`http://192.168.1.100:100/${items.filePath}`}
                    alt={`Preview ${index}`}
                    width={200}
                    height={200}
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col pb-1 pt-5">
          <text className="text-lg font-bold">आवश्यक कागजातहरु:</text>
          <div className="flex flex-col leading-8 pl-10  ">
            <text>१. आफ्नो व्यवसायको विस्तृत व्यहोरा सहितको निवेदन पत्र</text>
            <text>२. नागरिकता प्रमाणपत्रको प्रतिलिपि</text>
            <text>
              ३. चालु आ.व. सम्मको व्यवसाय नवीकरण गरेको प्रमाणपत्रको सक्कल
            </text>
            <text>२. घरबहाल सम्झौता पत्रको प्रतिलिपि</text>
            <text>
              २. विदेशीको हकमा परिचय खुल्ने कागजात वा सम्बन्धित दुतावासको पत्र
            </text>
            <text>
              २. आफनै घर भएमा चालु आ.व. सम्मको सम्पत्ति कर तिरेको रसिद
            </text>
          </div>
        </div>
        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
        />
      </form>
    </>
  );
}
