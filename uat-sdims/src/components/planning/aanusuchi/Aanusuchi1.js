import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import AddButton from "../../reusableDesign/AddButton";
import { useReactToPrint } from "react-to-print";
import { FaPlus, FaPrint, FaTrashAlt } from "react-icons/fa";
import { AiOutlineDownload } from "react-icons/ai";
import { useForm } from "react-hook-form";
import DeleteModal from "../../reusableDesign/Modal";
const Aanusuchi1 = () => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const router = useRouter();
  const userId = router?.query?.id;

  const [upabhoktaSamiti, setUpabhoktaSamiti] = useState([
    {
      upabhoktaSamitiName: "",
      adakshya: "",
      upadakshya: "",
      kosadakshya: "",
      sachib: "",
      establishDate_Nep: "",
      bankName: "",
      bankAccountNo: "",
    },

  ]
  
  );


  const handleAddForm = () => {
    setUpabhoktaSamiti([
      ...upabhoktaSamiti,
      {
        upabhoktaSamitiName: "",
        adakshya: "",
        upadakshya: "",
        kosadakshya: "",
        sachib: "",
        establishDate_Nep: "",
        bankName: "",
        bankAccountNo: "",
      },
    ]);
  };

  const handleupabhoktaSamitiName = (e, index) => {
    const { name, value } = e.target;
    const list = [...upabhoktaSamiti];
    list[index][name] = value;
    setUpabhoktaSamiti(list);
  };

  const handleAdakshya = (e, index) => {
    const { name, value } = e.target;
    const list = [...upabhoktaSamiti];
    list[index][name] = value;
    setUpabhoktaSamiti(list);
  };

  const handleUpaAdakshya = (e, index) => {
    const { name, value } = e.target;
    const list = [...upabhoktaSamiti];
    list[index][name] = value;
    setUpabhoktaSamiti(list);
  };

  const handleKosaAdakshya = (e, index) => {
    const { name, value } = e.target;
    const list = [...upabhoktaSamiti];
    list[index][name] = value;
    setUpabhoktaSamiti(list);
  };

  const handleSachib = (e, index) => {
    const { name, value } = e.target;
    const list = [...upabhoktaSamiti];
    list[index][name] = value;
    setUpabhoktaSamiti(list);
  };

  const handleDate = (e, index) => {
    const { name, value } = e.target;
    const list = [...upabhoktaSamiti];
    list[index][name] = value;
    setUpabhoktaSamiti(list);
  };

  const handleBankName = (e, index) => {
    const { name, value } = e.target;
    const list = [...upabhoktaSamiti];
    list[index][name] = value;
    setUpabhoktaSamiti(list);
  };

  const handleAccounNumber = (index) => {
    const list = [...upabhoktaSamiti];
    list.splice(index, 1);
    setSamitiMembers(list);
  };

  const handleDeleteForm = (index) => {
    const list = [...upabhoktaSamiti];
    list.splice(index, 1);
    setUpabhoktaSamiti(list);
  };

  const onSubmit = (data) => {
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     data = {
    //       ...data,
    //       tolSamitiEstdDate: gathanMiti,
    //       upastithiDate: upasthitiMiti,
    //       nibedanMiti: nibedanMiti,
    //       tolBikashSansthaMemberList: tolBikashMembers,
    //     };
    //     try {
    //       createTolBikashSanstha(data).then((response) => {
    //         if (response.status === true) {
    //           toast.success(response.message, {
    //             icon: "🚀",
    //             autoClose: 1000,
    //           });
    //           router.push("/planning/tolbikashsanstha");
    //           return;
    //         } else response.status === false;
    //         {
    //           toast.error(response.message, {
    //             icon: "🚀",
    //             autoClose: 1000,
    //           });
    //         }
    //         return;
    //       });
    //     } catch (error) {
    //       toast.error(error.message);
    //     }
    //     resolve();
    //   }, 2000);
    // });
  };

  
 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" border-2 py-2 bg-[#1b71aafd] flex justify-between px-4">
        <text className="border-2 p-3 border-[#1b71aafd] bg-white font-bold text-lg ">
          अनुसूची १ / उपभोक्ता समितिको लागत
        </text>
        <div
          className="bg-red-500 px-2 py-3 rounded shadow-lg cursor-pointer text-white "
          onClick={handleAddForm}
        >
          Add New Form
        </div>
      </div>

      {upabhoktaSamiti.map((item, index) => (
        <div
          key={index}
          className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  "
        >
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              name="upabhoktaSamitiName"
              value={item.upabhoktaSamitiName}
              onChange={(e) => handleupabhoktaSamitiName(e, index)}
              placeholder="."
            />
            <label className="label">उपभोक्ता समितिको नाम र ठेगाना</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              name="adakshya"
              value={item.adakshya}
              onChange={(e) => handleAdakshya(e, index)}
              placeholder="."
            />
            <label className="label">अध्यक्ष</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              name="upadakshya"
              value={item.upadakshya}
              onChange={(e) => handleUpaAdakshya(e, index)}
              placeholder="."
            />
            <label className="label">उपाध्यक्ष</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              name="kosadakshya"
              value={item.kosadakshya}
              onChange={(e) => handleKosaAdakshya(e, index)}
              placeholder="."
            />
            <label className="label">कोषाध्यक्ष</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              name="sachib"
              value={item.sachib}
              onChange={(e) => handleSachib(e, index)}
              placeholder="."
            />
            <label className="label">सचिव</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              name="establishDate_Nep"
              value={item.establishDate_Nep}
              onChange={(e) => handleDate(e, index)}
              placeholder="."
            />
            <label className="label">गठन मिति</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              name="bankName"
              value={item.bankName}
              onChange={(e) => handleBankName(e, index)}
              placeholder="."
            />
            <label className="label">बैंकको नाम</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              name="accountNumber"
              value={item.accountNumber}
              onChange={(e) => handleAccounNumber(e, index)}
              placeholder="."
            />
            <label className="label">खाता नं.</label>
          </div>

          {upabhoktaSamiti.length > 1 && (
            <div className="flex justify-end p-2">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded "
                onClick={() => handleDeleteForm(index)}
              >
                Delete Form
              </button>
            </div>
          )}
        </div>
      ))}

 <div className="flex justify-end gap-4 " >
 <div>
    <AddButton
        icon={<FaPlus />}
        title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
        disabled={isSubmitting}
      />

    </div>
  
 </div>
    </form>
  );
};

export default Aanusuchi1;
