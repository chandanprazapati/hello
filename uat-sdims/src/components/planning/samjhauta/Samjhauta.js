import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  FaBook,
  FaDollarSign,
  FaEdit,
  FaFilePdf,
  FaPlus,
  FaTrashAlt,
} from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import DeleteModal from "../../reusableDesign/Modal";
import {
  deletePlanningSamjhauta,
  planningSamjhauta,
} from "../../../services/apiServices/planning/planningSamjhauta/planningSamjhautaService";
const Samjhauta = () => {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let samjhautaApiData = () => {
      planningSamjhauta().then((response) => {
        try {
          response.status === true;
          {
            setApiData(response.data);
            setLoading(false);
          }
        } catch (error) {
          toast.error(response.message, {
            autoClose: 1000,
          });
        }
      });
    };
    samjhautaApiData();
  }, [setApiData]);

  const handleEdit = (id) => {
    router.push(`/planning/samjhauta/createsamjhauta/${id}`);
  };

  const handleFarFarak = (id) => {
    router.push(`/planning/samjhauta/farfarak/${id}`);
  };

  const handleBiwaran = (id) => {
    router.push(`/planning/samjhauta/completeReport/${id}`);
  };

  const handleBhuktani = (id) => {

    router.push(`/planning/samjhauta/bhuktani/${id}`);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    toast.error("Process Terminated", {
      autoClose: 1000,
    });
    setShow(false);
  };

  const handleOk = () => {
    deletePlanningSamjhauta(deleteId).then((response) => {
      try {
        response.status === true;
        {
          toast.success("Deleted Sucessfully", {
            autoClose: 1000,
          });
          planningSamjhauta().then((response) => {
            try {
              response.status === true;
              {
                setApiData(response.data);
                setLoading(false);
              }
            } catch (error) {
              toast.error(response.message, {
                autoClose: 1000,
              });
            }
          });
        }
      } catch (error) {
        toast.error(response.message, {
          autoClose: 1000,
        });
      }
      setShow(false);
    });
  };

  const [deleteId, setDeleteId] = useState("");
  const handleDelete = (id) => {
    setShow(!show);
    setDeleteId(id);
  };

  return (
    <div className=" rounded-2xl shadow-2xl pb-4 pt-2 px-5 flex flex-col gap-1  divide-black  ">
      <div className="text-4xl font-bold items-center flex justify-center pt-5  ">
        नगरपालिका / गाउँपालिका र उपभोक्ता समिति बीचको सम्झौता सूची
      </div>

      <div className="flex justify-end ">
        <div
          onClick={() => {
            router.push("/planning/samjhauta/createsamjhauta");
          }}
          className="flex gap-2 bg-[#89bde1fd]  py-3 shadow-lg rounded-md w-32 justify-center hover:bg-blue-300 cursor-pointer "
        >
          <div className="pt-1">
            <FaPlus />
          </div>
          <button type="submit" className="text-sm font-extralight ">
            नयाँ थप्नुहोस्
          </button>
        </div>
      </div>

      <hr />
      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          {/* loading text */}
          <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
            Loading...
          </div>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow className="bg-[#3e8dc1fd]">
                <TableCell sx={{ fontSize: "16px" }}>सि.नं</TableCell>
                <TableCell sx={{ fontSize: "16px" }}>आर्थिक वर्ष</TableCell>
                <TableCell sx={{ fontSize: "16px" }}>दर्ता नं.</TableCell>
                <TableCell sx={{ fontSize: "16px" }}>आयोजनाको नाम</TableCell>
                <TableCell sx={{ fontSize: "16px" }}>
                  सम्झौता गर्ने संस्थाको नाम
                </TableCell>
                <TableCell sx={{ fontSize: "16px" }}>शुरु हुने मिति </TableCell>
                <TableCell sx={{ fontSize: "16px" }}>
                  समाप्त हुने मिति
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  कार्य
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiData.map((row, index) => {
                return (
                  <TableRow key={index} className="hover:bg-[#a0cae7fd]">
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{row.fiscalYearName}</TableCell>
                    <TableCell>{row.serialNo}</TableCell>
                    <TableCell>{row.project_Name}</TableCell>
                    <TableCell>{row.samjhauta_Org_Name}</TableCell>
                    <TableCell>{row.project_Start_Date}</TableCell>
                    <TableCell>{row.project_End_Date}</TableCell>

                    <TableCell className="pl-7 cursor-pointer  ">
                      <div className=" flex flex-wrap gap-1 ">
                      


                        <div
                          className=" cursor-pointer hover:text-blue-900 "
                          onClick={() => {
                            handleBiwaran(row.planningSamjhautaId);
                          }}
                        >
                          <div className="flex border-2 p-2 border-black bg-gray-300 gap-2">
                            <text>विवरण</text>
                            <FaFilePdf size={16} />
                          </div>
                        </div>

                        <div
                          className=" cursor-pointer hover:text-blue-900 "
                          onClick={() => {
                            handleFarFarak(row.planningSamjhautaId);
                          }}
                        >
                          <div className="flex border-2 p-2 border-black bg-gray-300 gap-2">
                            <text>फरफारक</text>
                            <FaFilePdf size={16} />
                          </div>
                        </div>

                        <div
                          className=" cursor-pointer bg-blue-500 "
                          onClick={() => {
                            handleBhuktani(row.planningSamjhautaId);
                          }}
                        >
                          <div className="flex border-2 p-2 border-black  gap-2">
                            <text>भुक्तानी</text>
                            <FaDollarSign size={16} />
                          </div>
                        </div>

                        <div
                          className=" cursor-pointer  "
                          onClick={() => {
                            handleBhuktani(row.planningSamjhautaId);
                          }}
                        >
                          <div className="flex border-2 p-2 border-black  gap-2">
                            <text>अनुगमन</text>
                            <FaBook size={16} />
                          </div>
                        </div>

                        {/* <div
                          className=" cursor-pointer hover:text-blue-900 "
                          onClick={() => {
                            handleEdit(row.planningSamjhautaId);
                          }}
                        >
                          <div className="flex border-2 p-2 border-black bg-gray-300 gap-2">
                            <text>सच्यानुहोस </text>
                            <FaEdit size={16} />
                          </div>
                        </div> */}

                        <div
                          className=" cursor-pointer bg-green-300 "
                          onClick={() => {
                            handleEdit(row.planningSamjhautaId);
                          }}
                        >
                          <div className="flex border-2 p-2 border-black  gap-2">
                            <text>म्याद थप</text>
                            <FaPlus size={16} />
                          </div>
                        </div>

                        <div
                          className=" cursor-pointer bg-orange-300 "
                          onClick={() => {
                            handleEdit(row.planningSamjhautaId);
                          }}
                        >
                          <div className="flex border-2 p-2 border-black gap-2">
                            <text className="px-3">सम्पन्न</text>
                          </div>
                        </div>

                        <div
                          className=" cursor-pointer bg-sky-300 "
                          onClick={() => {
                            handleEdit(row.planningSamjhautaId);
                          }}
                        >
                          <div className="flex border-2 p-2 border-black gap-2">
                            <text>कागजातहरु</text>
                            <FaPlus size={16} />
                          </div>
                        </div>

                        <div
                          className="cursor-pointer bg-red-500"
                          onClick={() => {
                            handleDelete(row.planningSamjhautaId);
                          }}
                        >
                          <div className="flex border-2 p-2 border-black  gap-2">
                            <text>हटाउनु</text>
                            <FaTrashAlt size={16} />
                          </div>
                          <DeleteModal
                            visible={show}
                            onClose={handleClose}
                            onOk={handleOk}
                            leftButton={"cancel"}
                            rightButton={"Delete"}
                            heading={"Alert!!! You are going to delete."}
                            title={
                              "Note If You once delete the data it cannot be reversed back be sure and conform to proceed the action"
                            }
                            icons={<FaTrashAlt size={16} />}
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Samjhauta;
