import React, { useEffect, useState } from "react";
import {} from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  deleteYojana,
  yojana,
} from "../../../services/apiServices/planning/yojana/yojanaService";
import DeleteModal from "../../reusableDesign/Modal";
const Yojana = () => {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let yojanaApiData = () => {
      yojana().then((response) => {
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
    yojanaApiData();
  }, [setApiData]);

  const handleEdit = (yojanaSetupId) => {
    router.push(`/planning/yojana/createyojana/${yojanaSetupId}`);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => {
    toast.error("Process Terminated", {
      autoClose: 1000,
    });
    setShow(false);
  };

  const handleOk = () => {
    deleteYojana(deleteId).then((response) => {
      try {
        response.status === true;
        {
          toast.success("Deleted Sucessfully", {
            autoClose: 1000,
          });
          yojana().then((response) => {
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
        योजना सूची
      </div>

      <div className="flex justify-end ">
        <div
          onClick={() => {
            router.push("/planning/yojana/createyojana");
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
                <TableCell sx={{ fontSize: "20px" }}>सि.नं</TableCell>
                <TableCell sx={{ fontSize: "20px" }}> योजनको नाम</TableCell>
                <TableCell sx={{ fontSize: "20px" }}> अनुमानित रकम</TableCell>
                <TableCell sx={{ fontSize: "20px" }}> बजेटको प्रकारको नाम</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>
                  {" "}
                  बजेट उपप्रकारको नाम
                </TableCell>
                <TableCell sx={{ fontSize: "20px" }}> वडा न.</TableCell>
                <TableCell sx={{ fontSize: "20px" }}> कार्य </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiData.map((row, index) => {
                return (
                                  <TableRow
                  key={index}
                  className="hover:bg-[#a0cae7fd]"
                >

                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{row.yojanaName}</TableCell>
                    <TableCell>{row.estimatedAmount}</TableCell>
                    <TableCell>{row.budgetTypeName}</TableCell>
                    <TableCell>{row.budgetSubTypeName}</TableCell>
                    <TableCell>{row.wardId}</TableCell>


                    <TableCell className="pl-7 cursor-pointer ">
                      <div className="flex gap-10 ">
                        <div
                          className=" cursor-pointer hover:text-blue-900 "
                          onClick={() => {
                            handleEdit(row.yojanaSetupId);
                          }}
                        >
                          <FaEdit size={20} />
                        </div>
                        <div
                          className="hover:text-red-700"
                          onClick={() => {
                            handleDelete(row.yojanaSetupId);
                          }}
                        >
                          <FaTrashAlt size={20} />
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
                            icons={<FaTrashAlt size={20} />}
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

export default Yojana;
