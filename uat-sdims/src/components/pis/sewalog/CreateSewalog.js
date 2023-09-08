import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
const BS = require("bikram-sambat-js");
import BikramSambat from "bikram-sambat-js";
import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextareaAutosize,
} from "@mui/material";
import { employee } from "../../../services/apiServices/employee/employeesetup/employeeService";
import { sewaParimad } from "../../../services/apiServices/common/sewaParimad/sewaParimad";
import { group } from "../../../services/apiServices/common/group/groupService";
import { subGroup } from "../../../services/apiServices/common/subGroup/subGroupService";
import { shredi } from "../../../services/apiServices/common/shredi/shrediService";
import { sewa } from "../../../services/apiServices/common/sewa/sewaService";
import { createSewalog } from "../../../services/apiServices/pis/sewalog/sewalogService";
import { englishToNepali } from "../../../utils/utility";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
import { post } from "../../../services/apiServices/common/post/postService";
import { bodartha } from "../../../services/apiServices/common/bodartha/bodarthaService";
import "nepali-datepicker-reactjs/dist/index.css";

const aa = new BikramSambat(new Date()).toBS();

export default function CreateSewalog({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      id: clickedIdData?.id,
      previousOfficeName: clickedIdData?.previousOfficeName,
      employeeId: clickedIdData?.employeeId,
      postId: clickedIdData?.postId,
      sewaParimanId: clickedIdData?.sewaParimanId,
      groupId: clickedIdData?.groupId,
      subGroupId: clickedIdData?.subGroupId,
      shrediId: clickedIdData?.shrediId,
      sewaId: clickedIdData?.sewaId,
      remarks: clickedIdData?.remarks,
      bodarthaId: clickedIdData?.bodarthaId,
    },
  });

  // submit function
  const onSubmit = async (data) => {
    data = {
      ...data,
      nirnamyDate: new Date(BS.BSToAD(nirnamyMiti)),
      laguDate: new Date(BS.BSToAD(laguMiti)),
      jariDate: new Date(BS.BSToAD(jariMiti)),
      hajiriDate: new Date(BS.BSToAD(hajiriMiti)),
      nirnamyMiti: nirnamyMiti,
      laguMiti: laguMiti,
      jariMiti: jariMiti,
      hajiriMiti: hajiriMiti,
      bodarthaId: [selectedNames],
    };

    try {
      const response = await createSewalog(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/pis/sewalog");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const onSubmit = (data) => {

  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       if (employeeId === null) {
  //         setEmployeeMsg(<p>This field is required</p>);
  //       } else if (postId === null) {
  //         setPostMsg(<p>This field is required</p>);
  //       } else if (sewaParimanId === null) {
  //         setSewaParimadMsg(<p>This field is required</p>);
  //       } else if (groupId === null) {
  //         setGroupMsg(<p>This field is required</p>);
  //       } else if (subGroupId === null) {
  //         setSubGroupMsg(<p>This field is required</p>);
  //       } else if (shrediId === null) {
  //         setShrediMsg(<p>This field is required</p>);
  //       } else if (sewaId === null) {
  //         setSewaMsg(<p>This field is required</p>);
  //       } else if (selectedNames === null) {
  //         setBodarthaMsg(<p>This field is required</p>);
  //       } else {
  //         data = {
  //           ...data,
  //           employeeId: employeeId,
  //           postId: postId,
  //           sewaParimanId: sewaParimanId,
  //           groupId: groupId,
  //           subGroupId: subGroupId,
  //           shrediId: shrediId,
  //           sewaId: sewaId,
  //           nirnamyMiti: startNepDate,
  //           laguMiti: endNepDate,
  //           nirnamyDate: new Date(BS.BSToAD(startNepDate)),
  //           laguDate: new Date(BS.BSToAD(endNepDate)),
  //           jariMiti: jariMiti,
  //           jariDate: new Date(BS.BSToAD(jariMiti)),
  //           hajiriMiti: hajiriMiti,
  //           hajiriDate: new Date(BS.BSToAD(hajiriMiti)),
  //           bodarthaId: selectedNames,
  //         };
  //       }

  //       try {
  //         createSewalog(data).then((response) => {
  //           if (response.status === true) {
  //             toast.success(response.message, {
  //               icon: "🚀",
  //               autoClose: 1000,
  //             });
  //             router.push("/pis/sewalog");
  //             return;
  //           } else response.status === false;
  //           {
  //             toast.error(response.message, {
  //               icon: "🚀",
  //               autoClose: 1000,
  //             });
  //           }
  //           return;
  //         });
  //       } catch (error) {
  //         toast.error(error.message);
  //       }

  //       resolve();
  //     }, 2000);
  //   });
  // };

  // for employee option data fetching and displayed down side
  const [apiDataEmployee, setApiDataEmployee] = useState([]);

  //  for employee
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await employee();
        if (status) {
          setApiDataEmployee(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const employeeOtions = apiDataEmployee.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.employeeId}
      >
        {item.firstName} {item.middleName} {item.lastName} [
        {englishToNepali(item.empCode)}]
      </option>
    );
  });

  //  sewa pariman
  const [sewaParimanData, setSewaParimanData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sewaParimad();
        if (response.status === true) {
          setSewaParimanData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const sewaParimanOptions = sewaParimanData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.deactiveSewaparimanId}
      >
        {item.name}
      </option>
    );
  });

  // for post option data fetching and displayed down side
  const [apiDataPost, setApiDataPost] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await post();
        if (status) {
          setApiDataPost(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const postOptions = apiDataPost.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.postId}
      >
        {item.name}
      </option>
    );
  });

  // sewa
  const [apiDataSewa, setApiDataSewa] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await sewa();
        if (status) {
          setApiDataSewa(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const sewaOptions = apiDataSewa.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.sewaId}
      >
        {item.name}
      </option>
    );
  });

  // group
  const [apiDataGroup, setApiDataGroup] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await group();
        if (status) {
          setApiDataGroup(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const groupOptions = apiDataGroup.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.groupId}
      >
        {item.name}
      </option>
    );
  });

  // sub group
  const [apiDataSubGroup, setApiDataSubGroup] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await subGroup();
        if (status) {
          setApiDataSubGroup(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const subGroupOptions = apiDataSubGroup.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.subGroupId}
      >
        {item.name}
      </option>
    );
  });

  // for shredi
  const [apiDataShredi, setApiDataShredi] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await shredi();
        if (status) {
          setApiDataShredi(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const shrediOptions = apiDataShredi.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.shrediId}
      >
        {item.name}
      </option>
    );
  });

  const [apiDataBodartha, setApiDataBodartha] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);

  useEffect(() => {
    let bodarthaApiData = () => {
      bodartha().then((response) => {
        try {
          response.status === true;
          {
            setApiDataBodartha(response.data);
          }
        } catch (error) {}
      });
    };
    bodarthaApiData();
  }, [setApiDataBodartha]);

  <Select
    multiple
    value={selectedNames}
    onChange={(e) => setSelectedNames(e.target.value)}
    input={<OutlinedInput label="Multiple Select" />}
    renderValue={(selected) => (
      <Stack gap={1} direction="row" flexWrap="wrap">
        {selected.map((value) => (
          <Chip
            key={value}
            label={value}
            onDelete={() =>
              setSelectedNames(selectedNames.filter((item) => item !== value))
            }
            deleteIcon={
              <CancelIcon onMouseDown={(event) => event.stopPropagation()} />
            }
          />
        ))}
      </Stack>
    )}
  >
    {apiDataBodartha.map((items, index) => (
      <MenuItem
        key={index}
        value={items.id}
        sx={{ justifyContent: "space-between" }}
      >
        {items.name}
        {selectedNames.includes(items.id) ? <CheckIcon color="info" /> : null}
      </MenuItem>
    ))}
  </Select>;

  // for date
  const [nirnamyMiti, setNirnamyMiti] = useState(aa);
  const [laguMiti, setLaguMiti] = useState(aa);
  const [jariMiti, setJariMiti] = useState(aa);
  const [hajiriMiti, setHajiriMiti] = useState(aa);

  // for setting the date
  useEffect(() => {
    if (clickedIdData) {
      setNirnamyMiti(clickedIdData.nirnamyMiti || aa);
      setLaguMiti(clickedIdData.laguMiti || aa);
      setJariMiti(clickedIdData.jariMiti || aa);
      setHajiriMiti(clickedIdData.hajiriMiti || aa);
    }
  }, [clickedIdData]);

  return (
    <React.Fragment>
      <CommonHeaderDesign title={"सेवा लग राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 pb-2 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              कर्मचारी
              <span className="requiredField">*</span>
            </label>
            <select {...register("employeeId")} className="peer requiredField">
              <option value={""}>--- कर्मचारी छान्नुहोस् ---</option>
              {employeeOtions}
            </select>
            <p> {errors?.employeeId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("previousOfficeName")}
              placeholder="."
            />
            <label className="label">
              अघिल्लो कार्यालयको नाम
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.previousOfficeName?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              सेवा परिमाण
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("sewaParimanId")}
              className="peer requiredField"
            >
              <option value={""}>--- सेवा परिमाण छान्नुहोस् ---</option>
              {sewaParimanOptions}
            </select>
            <p> {errors?.sewaParimanId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              पद
              <span className="requiredField">*</span>
            </label>
            <select {...register("postId")} className="peer requiredField">
              <option value={""}>--- पद छान्नुहोस् ---</option>
              {postOptions}
            </select>
            <p> {errors?.postId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              सेवा
              <span className="requiredField">*</span>
            </label>
            <select {...register("sewaId")} className="peer requiredField">
              <option value={""}>--- सेवा छान्नुहोस् ---</option>
              {sewaOptions}
            </select>
            <p> {errors?.sewaId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              समूह
              <span className="requiredField">*</span>
            </label>
            <select {...register("groupId")} className="peer requiredField">
              <option value={""}>--- समूह छान्नुहोस् ---</option>
              {groupOptions}
            </select>
            <p> {errors?.groupId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              उपसमूह
              <span className="requiredField">*</span>
            </label>
            <select {...register("subGroupId")} className="peer requiredField">
              <option value={""}>--- उपसमूह छान्नुहोस् ---</option>
              {subGroupOptions}
            </select>
            <p> {errors?.subGroupId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              श्रेणी
              <span className="requiredField">*</span>
            </label>
            <select {...register("shrediId")} className="peer requiredField">
              <option value={""}>--- श्रेणी छान्नुहोस् ---</option>
              {shrediOptions}
            </select>
            <p> {errors?.shrediId?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              निर्णय मिति
            </label>

            <NepaliDatePicker
              value={nirnamyMiti}
              className="peer"
              onChange={(e) => setNirnamyMiti(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              लागू मिति
            </label>

            <NepaliDatePicker
              value={laguMiti}
              className="peer"
              onChange={(e) => setLaguMiti(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              कार्यालय हाजिरी मिति
            </label>

            <NepaliDatePicker
              value={hajiriMiti}
              className="peer"
              onChange={(e) => setHajiriMiti(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              चिठ्ठी जारी मिति
            </label>

            <NepaliDatePicker
              value={jariMiti}
              className="peer"
              onChange={(e) => setJariMiti(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>कैफियत</label>

            <TextareaAutosize
              type="string"
              className="border-2 w-full pb-6 border-black"
              {...register("remarks")}
              placeholder="write something here......"
            />
          </div>
          <div>
            <label className="pl-2">बोदार्थ</label>

            <FormControl sx={{ m: 1, width: 500 }}>
              <InputLabel>बहु बोदार्थ चयन गर्नुहोस्</InputLabel>
              <Select
                multiple
                value={selectedNames}
                onChange={(e) => setSelectedNames(e.target.value)}
                input={<OutlinedInput label="Multiple Select" />}
                renderValue={(selected) => (
                  <Stack gap={1} direction="row" flexWrap="wrap">
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        onDelete={() =>
                          setSelectedNames(
                            selectedNames.filter((item) => item !== value)
                          )
                        }
                        deleteIcon={
                          <CancelIcon
                            onMouseDown={(event) => event.stopPropagation()}
                          />
                        }
                      />
                    ))}
                  </Stack>
                )}
              >
                {apiDataBodartha.map((items, index) => (
                  <MenuItem
                    key={index}
                    value={items.id}
                    sx={{ justifyContent: "space-between" }}
                  >
                    {items.name}
                    {selectedNames.includes(items.id) ? (
                      <CheckIcon color="info" />
                    ) : null}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <AddButton
          icon={<FaPlus />}
          disabled={isSubmitting}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
        />
      </form>
    </React.Fragment>
  );
}
