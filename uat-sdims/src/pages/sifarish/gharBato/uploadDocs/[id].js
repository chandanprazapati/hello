import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  getDocsGharBatoPramanit,
  insertDocsGharBatoPramanit,
} from "../../../../services/apiServices/sifarish/gharBatoPramanit/gharBatoPramanitService";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import Image from "next/image";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { FaPlus } from "react-icons/fa";

export default function DocsUploadGharBato() {
  const router = useRouter();
  const { query } = useRouter();
  console.log(query.id, "query.id");
  const { register, handleSubmit, isSubmitting } = useForm();

  // image for petitioner
  const [loading, setLoading] = useState(true);
  const [imagePreviews, setImagePreviews] = useState([]);
  console.log(imagePreviews, "img");
  const handleFileChangeGHarBato = (e) => {
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
    console.log(data, "dataaa");
    try {
      const formData = new FormData();
      formData.append("Files", data.imagePreviews);
      formData.append("GharBatoId", query.id);

      //Append Image
      for (let i = 0; i < imagePreviews.length; i++) {
        const file = data.Files[i];
        formData.append("Files", file);
      }

      const response = await insertDocsGharBatoPramanit(formData);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/sifarish/gharBato");
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
        getDocsGharBatoPramanit(query?.id).then((response) => {
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
      <CommonHeaderDesign title={"घर बाटो प्रमाणित कागजात अपलोड"} />
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
              onChange={handleFileChangeGHarBato}
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
            <text>
              १. निवेदन (बाटोको नाम, टोल समेत खुलाउने), नागरिकता प्रमाणपत्रको
              प्रतिलिपि
            </text>
            <text>२. जग्गाधनी प्रमाण पुर्जाको प्रमाणित प्रतिलिपि</text>
            <text>३. जग्गा रहेको क्षेत्रको प्रमाणित सक्कल नापी नक्सा</text>
            <text>4. चालु आ. व. सम्मको सम्पत्ति कर तिरेको रसिद</text>
            <text>
              5. लिने दिने दुवै व्यक्ति नागरिकताका प्रमाणपत्रको प्रमाणपत्र
              प्रमाणित प्रतिलिपी सहित उपस्थित हुनु पर्ने वा निजहरुले दिएको
              अधिकृत वारेसको प्रमाणित प्रतिलिपी
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
