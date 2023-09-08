import React, { useEffect, useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  getBasobasFile,
  insertBasobasFile,
} from "../../../../services/apiServices/sifarish/sthaiAsthaiBasobas/sthaiAsthaiBasobasService";
import { toast } from "react-toastify";
import Image from "next/image";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { FaPlus } from "react-icons/fa";

export default function UploadFile() {
  const router = useRouter();
  const { query } = useRouter();
  console.log(query.id, "query.id");
  const { register, handleSubmit, isSubmitting } = useForm();

  // image for petitioner
  const [loading, setLoading] = useState(true);
  const [imagePreviews, setImagePreviews] = useState([]);
  console.log(imagePreviews, "img");

  const handleFileChangeCharkilla = (e) => {
    const files = e.target.files;
    const previews = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target.result);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const onSubmit = async (data) => {
    console.log(data, "basobas data");
    try {
      const formData = new FormData();
      formData.append("Files", data.imagePreviews);
      formData.append("BasobasId", query.id);

      //Append Image
      for (let i = 0; i < imagePreviews.length; i++) {
        const file = data.Files[i];
        formData.append("Files", file);
      }

      const response = await insertBasobasFile(formData);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/sifarish/sthaiAasthaiBasobas");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // To get the image from the API

  const [apiData, setApiData] = useState();
  console.log(apiData, "apiData");
  useEffect(() => {
    if (query?.id) {
      let receiptApiData = () => {
        getBasobasFile(query?.id).then((response) => {
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
      <CommonHeaderDesign
        title={"अस्थाई/स्थायी बसोबास सिफारिस को कागजात अपलोड"}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" grid lg:grid-cols-1  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Upload Files</label>
            {/* display Image preview */}
            <div>
              {imagePreviews.map((preview, index) => (
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
              onChange={handleFileChangeCharkilla}
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
          <text className="text-lg font-bold">अस्थाई बसोबास सिफारिस:</text>
          <div className="flex flex-col leading-8 pl-10  ">
            <text>
              १. निवेदन पत्र र नागरिकता प्रमाण पत्रको प्रतिलिपि र बसोबास गर्ने
              घर नम्बर, टोल, र बाटोको नाम खुलेको कागजात
            </text>
            <text>
              २. वहालमा बसेको भए घरधनीको सनाखत मुचुल्का र निजको नागरिकता प्रमाण
              पत्रको प्रतिलिपि
            </text>
            <text>३. कर्मचारीको हकमा हाल कार्यरत रहेको कार्यालयको पत्र</text>
            <text>४. घरबहाल कर तिरेका रसिद</text>
            <text>५. घरबहालको सम्झौता पत्र मासिक बिस हजार माथि भएमा ।</text>
          </div>
          <text className="text-lg font-bold">स्थायी बसोबास सिफारिस:</text>
          <div className="flex flex-col leading-8 pl-10  ">
            <text>१. निवेदन पत्र र नागरिकता प्रमाण पत्रको प्रतिलिपि</text>
            <text>
              २. बसाँईसराईको हकमा बसाई सराई दर्ता प्रमाण पत्रको प्रतिलिपि
            </text>
            <text>
              ३. चालु आ. व. सम्मको सम्पत्ति कर तिरेको रसिदको प्रतिलिपि
            </text>
            <text>४. जग्गाधनी प्रमाणपत्रको प्रतिलिपि</text>
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
