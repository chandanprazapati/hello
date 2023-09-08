import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FaEdit, FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { indexTaxRate } from "../../../../services/apiServices/revenue/indextaxrate/indextaxrateservice";

const TaxRate = () => {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let taxRateApiData = () => {
      indexTaxRate().then((response) => {
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
    taxRateApiData();
  }, [setApiData]);

  const handleEdit = (id) => {
    router.push(`/revenue/indextaxrate/createindextaxrate/${id}`);
  };
  return (
                   <div className=" rounded-2xl shadow-2xl pb-4 pt-2 px-5 flex flex-col gap-1  divide-black  ">

      <div className="text-4xl font-bold items-center flex justify-center pt-5  ">
        कर दर सूची
      </div>

      <div className="flex justify-end gap-2 ">
        <div
          onClick={() => {
            router.push("/revenue/indextaxrate/createindextaxrate");
          }}
          className="flex gap-2 bg-[#89bde1fd]  py-3 shadow-lg rounded-md w-32 justify-center hover:bg-blue-300 cursor-pointer "
        >
          <div className="pt-1">
            <FaPlus />
          </div>
          <button type="submit" className="text-sm font-extralight ">
            कर दर थप्नुहोस्
          </button>
        </div>

        {/* <div
          onClick={() => {
            router.push("/revenue/indextaxrate/createindextaxrate");
          }}
                        className="flex gap-2 bg-[#89bde1fd]  py-3 shadow-lg rounded-md w-32 justify-center hover:bg-blue-300 cursor-pointer "


        >
          <div className="pt-1">
            <FaEdit />
          </div>
          <button type="submit" className="text-sm font-extralight ">
          कर सम्पादन गर्नुहोस्
          </button>
        </div> */}
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
                <TableCell sx={{ fontSize: "20px" }}>सि.न.</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>नाम</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>आर्थिक वर्ष</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>कर उप श्रेणी</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>कोड</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>दर</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>नयाँ दर</TableCell>
                <TableCell sx={{ fontSize: "20px" }}> कार्य </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {apiData.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.fiscalYearName}</TableCell>
                    <TableCell>{row.taxSubCategoryName}</TableCell>

                    <TableCell>{row.code}</TableCell>
                    <TableCell>{row.rate}</TableCell>
                    <TableCell>{row.newRate}</TableCell>
                    <TableCell
                      className="pl-7 cursor-pointer hover:text-blue-900 "
                      onClick={() => {
                        handleEdit(row.id);
                      }}
                    >
                      <FaEdit size={20} />
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

export default TaxRate;
