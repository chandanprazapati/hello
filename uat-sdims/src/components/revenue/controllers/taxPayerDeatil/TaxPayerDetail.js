import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { taxPayerDetail } from "../../../../services/apiServices/revenue/taxPayerDetail/taxPayerDetailService";
import MuiTable from "../../../reusableDesign/muiTableDesign/MuiTable";
import ListViewPageDesign from "../../../reusableDesign/ListViewPageDesign";
import ListHeader from "../../../reusableDesign/ListHeader";
import ListButton from "../../../reusableDesign/ListButton";
import LoadingSpinner from "../../../reusableDesign/Loading";

export default function TaxPayerDetail() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let taxPayerDetailApiData = () => {
      taxPayerDetail().then((response) => {
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
    taxPayerDetailApiData();
  }, [setApiData]);

  const handleEdit = (id) => {
    router.push(`/revenue/taxpayerdetail/createtaxpayerdetail/${id}`);
  };
  const handlePayTax = (id) => {
    router.push(`/revenue/taxpayerdetail/paytax/${id}`);
  };

  const locale = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => (
          <TableRow key={index} className="hover:bg-[#a0cae7fd]">
            <TableCell>{index + 1}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell component="th" scope="row">
              {row.code}
            </TableCell>

            <TableCell>{row.fatherName}</TableCell>

            <TableCell>{row.grandFatherName}</TableCell>
            <TableCell>{row.citizenshipNo}</TableCell>

            <TableCell className="pl-7 cursor-pointer ">
              <div className="flex gap-10 ">
                <div
                  className=" cursor-pointer hover:text-blue-900 "
                  onClick={() => {
                    handleEdit(row.id);
                  }}
                >
                  <FaEdit size={20} />
                </div>

                <div
                  className="bg-green-500 p-2 text-white border-2 rounded-lg border-green-900 "
                  onClick={() => {
                    handlePayTax(row.id);
                  }}
                >
                  Pay Tax
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </MuiTable>
  );

  return (
    <ListViewPageDesign>
      <ListHeader title="करदाता विवरण  सूची" />
      <ListButton url={`/revenue/taxpayerdetail/createtaxpayerdetail`} />
      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "सि.नं." },
  { id: "name", name: "नाम" },
  { id: "code", name: "कोड" },
  { id: "fatherName", name: "बुबाको नाम" },
  { id: "grandFatherName", name: "हजुरबुबाको नाम" },
  { id: "citizenshipNo", name: "नागरिकता नं." },
  { id: "action", name: "कार्य" },
];
