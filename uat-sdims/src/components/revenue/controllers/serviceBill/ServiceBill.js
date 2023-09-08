import React, { useEffect, useState } from "react";
import {} from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { searchServiceBillValidationResolver } from "../../../../utils/validateField";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FaBan, FaPlus, FaPrint, FaSearch, FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  searchServiceBill,
  serviceBill,
} from "../../../../services/apiServices/revenue/service/serviceBill";
import { useForm } from "react-hook-form";
import DeleteModal from "../../../../components/reusableDesign/Modal"
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");

export default function ServiceBillList  () {
  const aa = new BikramSambat(new Date()).toBS();

  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let serviceBillApiData = () => {
      serviceBill().then((response) => {
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
    serviceBillApiData();
  }, [setApiData]);

  const handlePrint = (id) => {
    router.push(`/revenue/servicebill/createservicebill/generatereceipt/${id}`);
  };

  // to store data for search string
  const [searchedData, setSearchedData] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    searchServiceBill(data.name, data.rashidNo).then((res) => {
      if (res.status === true) {
        setSearchedData(res.data);
      } else {
        toast.error(res.message, { autoClose: 1000 });
      }
    });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    toast.error("Process Terminated", {
      autoClose: 1000,
    });
    setShow(false);
  };

  const [deleteId, setDeleteId] = useState("");
  const handleDelete = (id) => {
    setShow(!show);
    setDeleteId(id);
  };

  const handleOk = () => {
  }

  return (
    <div className=" rounded-2xl shadow-2xl pb-4 pt-2 px-5 flex flex-col gap-1  divide-black  ">
      <div className="text-4xl font-bold items-center flex justify-center pt-5  ">
        आम्दानी रसिद सूची
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center gap-5 pt-5 ">
          <div>
            <label className="flex justify-center py-2 text-xl font-bold  ">
              करदाता नाम
            </label>

            <input
              placeholder="Enter The Tax Payer Name Here ........"
              className="bg-gray-100 py-4 px-1 w-80 border-2 border-zinc-400 border-double	 rounded-md  "
              {...register("name")}
            ></input>
            <p> {errors?.name?.message}</p>
          </div>
          <div>
            <label className="flex justify-center py-2 text-xl font-bold  ">
              रसिद नं
            </label>
            <input
              // ref={search}
              placeholder="Enter The Invoice No Here ........"
              className="bg-gray-100 py-4 px-1 w-80 border-2 border-zinc-400 border-double	 rounded-md  "
              {...register("rashidNo")}
            ></input>
            <p> {errors?.rashidNo?.message}</p>
          </div>

          <button type={"submit"} className="cursor-pointer pt-10 ">
            <FaSearch size={30} className="hover:text-blue-700" />
          </button>
        </div>
      </form>

      <div className="flex justify-end ">
        <div
          onClick={() => {
            router.push("/revenue/servicebill/createservicebill");
          }}
          className="flex gap-2 bg-[#89bde1fd]  py-3 shadow-lg rounded-md w-32 justify-center hover:bg-blue-300 cursor-pointer "
        >
          <div className="pt-1">
            <FaPlus />
          </div>
          <button type="submit" className="text-sm font-extralight ">
            नयाँ रसिद थप्नुहोस्
          </button>
        </div>
      </div>

      <hr />

      {searchedData.length >= 1 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow className="bg-[#3e8dc1fd]">
                <TableCell sx={{ fontSize: "20px" }}>सि.न. </TableCell>
                <TableCell sx={{ fontSize: "20px" }}>करदाता नाम</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>रसिद नं </TableCell>
                <TableCell sx={{ fontSize: "20px" }}>ठेगाना</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>भ्याट/प्यान नं </TableCell>
                <TableCell sx={{ fontSize: "20px" }}>रसिद मिति </TableCell>
                <TableCell sx={{ fontSize: "20px" }}> कार्य </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchedData.map((row, index) => {
                return (
                  <TableRow key={index} className="hover:bg-[#a0cae7fd]">
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{row.taxPayerName}</TableCell>

                    <TableCell>{row.invoiceNo}</TableCell>
                    <TableCell>{row.address}</TableCell>

                    <TableCell>{row.invoiceMiti}</TableCell>

                    {/* <TableCell
                      className="pl-7 cursor-pointer hover:text-blue-900 "
                      onClick={() => {
                        handlePrint(row.id);
                      }}
                    >
                      <FaPrint size={20} />
                    </TableCell> */}

                    <TableCell>
                      <div></div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow className="bg-[#3e8dc1fd]">
                <TableCell sx={{ fontSize: "20px" }}>सि.न. </TableCell>
                <TableCell sx={{ fontSize: "20px" }}>करदाता नाम</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>रसिद नं </TableCell>
                <TableCell sx={{ fontSize: "20px" }}>ठेगाना</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>रसिद मिति </TableCell>
                <TableCell sx={{ fontSize: "20px" }}> कार्य </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiData.map((row, index) => {
                return (
                  <TableRow key={index} className="hover:bg-[#a0cae7fd]">
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{row.taxPayerName}</TableCell>

                    <TableCell>{row.invoiceNo}</TableCell>
                    <TableCell>{row.address}</TableCell>

                    <TableCell>{row.invoiceMiti}</TableCell>

                    {/* <TableCell
                      className="pl-7 cursor-pointer hover:text-blue-900 "
                      onClick={() => {
                        handlePrint(row.id);
                      }}
                    >
                      <FaPrint size={20} />
                    </TableCell> */}

                    <TableCell>
                      <div className="flex gap-4 cursor-pointer ">
                        <div
                          className="hover:text-blue-900"
                          onClick={() => {
                            handlePrint(row.id);
                          }}
                        >
                          <FaPrint size={20} />
                        </div>

                        {row.invoiceMiti === aa ? (
                          <div
                            className="hover:text-red-500"
                            onClick={() => {
                              handleDelete(row.id);
                            }}
                          >
                            <FaBan size={20} />

                            <DeleteModal
                            visible={show}
                            onClose={handleClose}
                            onOk={handleOk}
                            leftButton={"cancel"}
                            rightButton={"Ok Procced"}
                            heading={"सावधान!!! You are going to delete."}
                            title={
                              "बिना कारण बिल बदर गर्न पाइदैन ! के तपाई बिल बदर गर्न चाहनुहुन्छ ?"
                            }
                            icons={<FaTrashAlt size={20} />}
                          />


                          </div>
                        ) : null}
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

