import React, { useEffect, useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { useForm } from "react-hook-form";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  getAwabihawitFiles,
  insertAwabihawitFiles,
} from "../../../../services/apiServices/sifarish/awabiwahit/awabiwahitService";
import { toast } from "react-toastify";
import { imageUrl } from "../../../../services/apiHelpers";
export default function Details() {
  const router = useRouter();
  const { query } = useRouter();
  console.log(query.id, "query.id");
  const { register, handleSubmit, isSubmitting } = useForm();

  //   images for petitioner
  const [imagePreviewsAwabihawit, setImagePreviewsAwabihawit] = useState([]);
  const handleFileChangeAwabihawit = (e) => {
    const files = e.target.files;
    const previews = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target.result);
        if (previews.length === files.length) {
          setImagePreviewsAwabihawit(previews);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const onSubmit = async (data) => {
    console.log(data, "data");

    try {
      const formData = new FormData();
      formData.append("Files", data.imagePreviewsAwabihawit);
      formData.append("AabiwahitId", query.id);

      // Append image files directly (not previews)
      for (let i = 0; i < imagePreviewsAwabihawit.length; i++) {
        const file = data.Files[i]; // Get the File object from input element
        formData.append("Files", file);
      }

      console.log(formData, "formData");

      const response = await insertAwabihawitFiles(formData);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/sifarish/awabihawit");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // to get the images from the api

  const [apiData, setApiData] = useState();
  console.log(apiData, "apiData");

  useEffect(() => {
    if (query?.id) {
      let receiptApiData = () => {
        getAwabihawitFiles(query?.id).then((response) => {
          try {
            response.status === true;
            {
              setApiData(response.data);
              setLoading(false);
            }
          } catch (error) {
            // toast.success(response.message, {
            //   autoClose: 1000,
            // });
          }
        });
      };
      receiptApiData();
    }
  }, [query?.id]);

  return (
    <div>
      <CommonHeaderDesign title={"अविवाहित सिफारिस कागजात अप्लोअड"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-1  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Upload File</label>

            {/* Display image previews */}
            <div className="flex gap-2 ">
              {imagePreviewsAwabihawit.map((preview, index) => (
                <Image
                  key={index}
                  src={preview}
                  alt={`Preview ${index}`}
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
              multiple // Enable multiple file selection
              accept="image/*" // Specify that only image files are allowed
              onChange={handleFileChangeAwabihawit}
            />
          </div>

          {/* Display image previews */}
          <div className="image-grid">
            {apiData?.map((items, index) => (
              <div key={index} className="image-container">
                <Image
                  src={`http://192.168.1.100:100/${items.filePath}`}
                  alt={`Preview ${index}`}
                  width={200}
                  height={200}
                  style={{ maxWidth: "100%" }}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col pb-1">
            <text className="text-lg font-bold">आवश्यक कागजातहरु:</text>
            <div className="flex flex-col leading-8 pl-10  ">
              <text>१. निवेदन र नागरिकता प्रमाणपत्रको प्रतिलिपि</text>
              <text>
                २. संरक्षक वा अभिभावकले कार्यालयको रोहबरमा गरेको सनाखत पत्र
              </text>
              <text>३. चालु आ. व. सम्मको सम्पत्ति कर तिरेको रसिद</text>
              <text>
                ४. बिदेशमा रहेकाको हकमा विदेशस्थित नेपाली नियोगबाट आएको सिफारिस
              </text>
            </div>
          </div>
        </div>

        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}
