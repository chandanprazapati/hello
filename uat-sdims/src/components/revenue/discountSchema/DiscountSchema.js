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
import { discountSchema } from "../../../services/apiServices/revenue/discountSchema/discountSchemaService";

const DiscountSchema = () => {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let discountSchemaApiData = () => {
      discountSchema().then((response) => {
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
    discountSchemaApiData();
  }, [setApiData]);

  const handleEdit = (id) => {
    router.push(`/revenue/discountschema/creatediscountschema/${id}`);
  };

  return (
                   <div className=" rounded-2xl shadow-2xl pb-4 pt-2 px-5 flex flex-col gap-1  divide-black  ">

      <div className="text-4xl font-bold items-center flex justify-center pt-5  ">
        छुट-योजना सूची
      </div>

      <div className="flex justify-end ">
        <div
          onClick={() => {
            router.push("/revenue/discountschema/creatediscountschema");
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
                <TableCell sx={{ fontSize: "20px" }}> सि.न. </TableCell>
                <TableCell sx={{ fontSize: "20px" }}>नाम</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>कोड</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>छुट दर (%) </TableCell>
                <TableCell sx={{ fontSize: "20px" }}>कर मोड्युल नाम </TableCell>
                <TableCell sx={{ fontSize: "20px" }}>कार्य</TableCell>
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
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.code}</TableCell>
                    <TableCell>{row.discountPercent}</TableCell>
                    <TableCell>{row.taxModuleName}</TableCell>

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

export default DiscountSchema;
