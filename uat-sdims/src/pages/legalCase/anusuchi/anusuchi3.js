import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import { getIndexCase, getLegalAanusuchi } from "../../../services/apiServices/legalCase/legalCaseService";
import { office } from "../../../services/apiServices/common/office/officeService";
import { useReactToPrint } from "react-to-print";

export default function Anusuchithree() {

     // to get the caseList
  const [apiDataCase, setApiDataCase] = useState([]);
  const [caseId, setCaseId] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(caseId, "apiDataCase");

  useEffect(() => {
    const fetchedData = async () => {
      getIndexCase().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiDataCase(data);
            setLoading(false);
          } else status === false;
          {
            setLoading(false);
          }
        } catch (error) {
          toast.error(message, {
            autoClose: 1000,
          });
        }
      });
    };
    fetchedData();
  }, []);

  const handleCase = (e) => {
    setCaseId(e.target.value);
  };

  const caseOptions = apiDataCase.map((item) => {
    return (
      <option value={item.id} key={item.id}>
        {item.caseTypeName}
      </option>
    );
  });

  // to set the office data
  const [apiDataOffice, setApiDataOffice] = useState([]);

  useEffect(() => {
    const fetchedData = () => {
      office().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiDataOffice(data);
          }
        } catch (error) {
          toast.error(message, {
            autoClose: 1000,
          });
        }
      });
    };
    fetchedData();
  }, [setApiDataOffice]);

  //   fetching api for aanusuchi
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    let fetchedData =  () => {

        getLegalAanusuchi(caseId).then((response) => {
          try {
            response.status === true;
            {
              setApiData(response.data);
              setLoading(false);
            }
          } catch (error) {
            toast.success("Fetched Data", {
              icon: "🚀",
              autoClose: 1000,
            });
          }
        });
      };
      fetchedData();
      
  }, [caseId, setApiData, setLoading]);

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

  return (
    <div>

<form>
        <SeoOptimization title="अनुसूची –२" />
        <div className="pt-4" >
        <div className="grid lg:grid-cols-3  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="font-bold text-lg text-red-600">
            विवाद / उजुरीको अनुसूची –२का रिपोर्ट सिर्जना गर्न विवाद / उजुरी
            अनिवार्य छान्नुहोस् ||
          </div>

          <div className="relative z-0 w-full  group">
            <select
              onChange={handleCase}
              value={caseId}
              className="peer requiredField"
            >
              <option value="">---विवाद / उजुरी छान्नुहोस् ---</option>

              {caseOptions}
            </select>
            <label className="label">
              विवाद / उजुरी
              <span className="requiredField">*</span>
            </label>
          </div>
        </div>
        </div>

      </form>

      <div className="flex justify-end py-4 ">
        <button
          className="flex justify-end items-center bg-gray-200 rounded-xl p-3 px-5 gap-2"
          onClick={handlePrint}
        >
          <AiOutlineDownload size={20} />
          Print
        </button>
      </div>

      <div ref={componentRef} >
        <div className="border-2 border-b py-20">
          <div className="text-center">
            <p className=" leading-10 text-lg font-bold">
              अनुसूची–३
              <br /> दफा १४ सँग सम्बन्धित
            </p>
            <p className="py-6">सपथग्रहण</p>
          </div>
          <p className="leading-6 px-10 text-justify text-sm">
            म
            ............................................................................
            यो सपथ लिन्छु कि म देश र सम्पूर्ण नेपाली जनताको हितलाई सर्वो पारी
            रखी लोकतन्त्र र राष्ट्रियता को सम्वद्र धन र संरक्षणको साथै यस नगरका
            नागरिक हरुको हित र न्यायिक अधिकार का लागि सदा सर्वदा लागिरहने छु। म
            नगरपालिकाको ऐन, नियम, उद्देश्य र कार्यक्रम प्रती प्रतिबद्ध रही
            न्यायिक समितिको काम मा सधैं द्रिढतापुर्वक उभिनेछु। न्यायिक मान्य
            सिद्दान्त तथा आचरण को कडाइका साथ पालना गर्नेछु र आवश्यक गोपनियता को
            संरक्षण गर्नेछु।
          </p>
          <div className="flex justify-end">
            <p className="px-10 py-5 leading-10 text-sm">
              नाम, थरः .................................... <br /> ठेगानाः
              ................................... <br /> पदः
              ..................................... <br /> दस्तखतः
              .................................. <br /> मितिः
              ......................................
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

