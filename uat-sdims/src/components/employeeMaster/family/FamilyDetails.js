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
import { employee } from "../../../services/apiServices/employee/employeesetup/employeeService";

const FamilyDetails = () => {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let employeeApiData = () => {
      employee().then((response) => {
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
    employeeApiData();
  }, [setApiData]);

  // const handleEdit = (id) => {
  //   router.push(`/employee/createemployee/${id}`);
  // };

  return (
    <div className=" rounded-2xl shadow-2xl pb-4 pt-2 px-5 flex flex-col gap-1  divide-black  ">
      <div className="text-4xl font-bold items-center flex justify-center pt-5  ">
      परिवार विवरण सूची
      </div>

      <div className="flex justify-end ">
        <div
          onClick={() => {
            router.push("/employeesetup/familydetails/createfamilydetails");
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
                <TableCell sx={{ fontSize: "20px" }}>Emp_Code</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>Name</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>Citizen No</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>Contact</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>Action</TableCell>
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
                      {row.empCode}
                    </TableCell>
                    <TableCell>
                      {row.firstName} {row.middleName} {row.lastName}
                    </TableCell>

                    <TableCell>{row.citizenNo}</TableCell>
                    <TableCell>{row.mobileNo}</TableCell>

                    <TableCell
                      className="pl-7 cursor-pointer hover:text-blue-900  "
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


export default FamilyDetails