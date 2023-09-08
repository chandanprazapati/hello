import React, { useCallback, useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaDownload, FaEdit, FaFilePdf, FaPrint } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { englishToNepali } from "../../../../utils/utility";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import ListHeader from "../../../../components/reusableDesign/ListHeader";
import MuiTable from "../../../../components/reusableDesign/muiTableDesign/MuiTable";
import ListViewPageDesign from "../../../../components/reusableDesign/ListViewPageDesign";
import ListButton from "../../../../components/reusableDesign/ListButton";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import { personDetailApi } from "../../../../services/apiServices/legalCase/legalCaseService";

export default function Index() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = async () => {
      personDetailApi().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiData(data);
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

  const handleEdit = useCallback(
    (id) => {
      router.push(`/legalCase/patra/niyuktiPatra/createNiyuktiPatra/${id}`);
    },
    [router]
  );

  const handlePrint = useCallback(
    (id) => {
        router.push(`/legalCase/patra/niyuktiPatra/report/${id}`);
    },
    [router]
    );

  const locale = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => {
          return (
            <TableRow key={index} className="hover:bg-[#a0cae7fd]">
              <TableCell>{englishToNepali(index + 1)}</TableCell>
              <TableCell>
                {" "}
                {`${row?.firstName} ${row?.middleName} ${row.lastName}`}
              </TableCell>
              <TableCell> {row.fatherName}</TableCell>
              <TableCell> {row.mobileNo}</TableCell>
              <TableCell> {row.mobileNo}</TableCell>
              <TableCell className="pl-7 cursor-pointer  ">
                <div className=" flex flex-wrap gap-1 ">
                  <div
                    className=" cursor-pointer hover:text-blue-900 "
                    onClick={() => {
                      handleEdit(row.id);
                    }}
                  >
                    <div className="flex border-2 p-2 border-black bg-gray-300 gap-2">
                    <text>सच्यानुहोस</text>
                      <FaEdit size={20} />
                    </div>
                  </div>

                  <div
                    className=" cursor-pointer hover:text-blue-900 "
                    onClick={() => {
                      handlePrint(row.id);
                    }}
                  >
                    <div className="flex border-2 p-2 border-black bg-gray-300 gap-2">
                    <text>प्रिन्ट</text>
                      <FaPrint size={20} />
                    </div>
                  </div>
                </div>
              </TableCell>
            
            </TableRow>
          );
        })}
      </TableBody>
    </MuiTable>
  );

  return (
    <ListViewPageDesign>
      <SeoOptimization title={"Niyukti Patra "} />
      <ListHeader title="नियुक्ति पत्र सूची" />
      <ListButton url={`/legalCase/patra/niyuktiPatra/createNiyuktiPatra`} />

      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "क्रम संख्या" },
  { id: "name", name: "Name1	" },
  { id: "mamilaName", name: "	Name2		" },
  { id: "mamilaType", name: "	Name3		" },
  { id: "mamilaType", name: "	WardId			" },
  { id: "action", name: "कार्य" },
];
