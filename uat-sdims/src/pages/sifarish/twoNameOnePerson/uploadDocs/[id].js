import React, { useEffect, useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  getDocsTwoNameOnePerson,
  insertDocsTwonameOnePerson,
} from "../../../../services/apiServices/sifarish/twoNameOnePerson/twoNameOnePersonService";
import { toast } from "react-toastify";
import Image from "next/image";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { FaPlus } from "react-icons/fa";

export default function TwoNameOnePersonDocs() {
  const router = useRouter();
  const { query } = useRouter();
  const { register, handleSubmit, isSubmitting } = useForm();

  // image for petitioner
  const [loading, setLoading] = useState(true);
  const [imagePreviews, setImagePreviews] = useState([]);
  const handleFileChangeOnePersonTwoName = (e) => {
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
    try {
      const formData = new FormData();
      formData.append("Files", data.imagePreviews);
      formData.append("DuiNaamEkByaktiId", query.id);
      //append Image
      for (let i = 0; i < imagePreviews.length; i++) {
        const file = data.Files[i];
        formData.append("Files", file);
      }
      const response = await insertDocsTwonameOnePerson(formData);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/sifarish/twoNameOnePerson");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // To get the image from the API

  const [apiData, setApiData] = useState();
  useEffect(() => {
    if (query?.id) {
      let receiptApiData = () => {
        getDocsTwoNameOnePerson(query?.id).then((response) => {
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
      <CommonHeaderDesign title={"दुई नाम ब्यक्ति कागजात अपलोड"} />
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
              onChange={handleFileChangeOnePersonTwoName}
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
            <text>१. नागरिकता प्रमाणपत्रको प्रतिलिपि र निवेदन पत्र</text>
            <text>२. नाम फरक परेको पुष्टि गर्ने प्रमाणित कागजातहरु</text>
            <text>३. चालु आ.व. सम्मको सम्पत्ति कर तिरेको रसिद</text>
            <text>
              ३. सम्बन्धित व्यक्ति वा हकवाला उपस्थित भई सनाखत गर्नु पर्ने
            </text>
            <text>
              ३. आवश्यकता अनुसार स्थानीय प्रहरी को सर्जमिन मुचुल्काको प्रतिवेदन
              माग गर्न सक्ने
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
