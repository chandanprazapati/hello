import React, { useCallback, useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/reusableDesign/Loading";
import MuiTable from "../../components/reusableDesign/muiTableDesign/MuiTable";
import ListButton from "../../components/reusableDesign/ListButton";
import SeoOptimization from "../../components/reusableDesign/SeoOptimzation";
import { englishToNepali } from "../../utils/utility";
import ListViewPageDesign from "../reusableDesign/ListViewPageDesign";
import { indexCaseWardMelMilap } from "../../services/apiServices/legalCase/legalCaseService";

export default function ChaluCase() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = async () => {
      indexCaseWardMelMilap().then(({ status, data, message }) => {
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
      router.push(`/legalCase/caseDetail/createCaseDetail/${id}`);
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
                <span className="text-base font-bold  text-red-600 ">
                  वादीको नाम:
                </span>{" "}
                {row.petitionerDetailViewModelList.map((items) => {
                  return <>{items.fullName}</>;
                })}
                <br />
                <br />
                <span className="text-base font-bold text-red-600 ">
                  प्रतिवादीको नाम:
                </span>{" "}
                {row.respondentDetailViewModelList.map((items) => {
                  return <>{items.fullName}</>;
                })}
              </TableCell>
              <TableCell> {row.caseTypeId}</TableCell>
              <TableCell>{englishToNepali(row.firstHearingDate)}</TableCell>

              <TableCell className="pl-7 cursor-pointer  ">
                <div
                  className=" cursor-pointer hover:text-blue-900 "
                  onClick={() => {
                    handleEdit(row.id);
                  }}
                >
                  <div className="flex border-2 p-2 border-black bg-gray-300 gap-2">
                    <text>सच्याउनुहोस</text>
                    <FaEdit size={16} />
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
      <SeoOptimization title={" Ward Mel Milap"} />
      <ListButton url={`/legalCase/caseDetail/createCaseDetail`} />

      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "क्रम संख्या" },
  { id: "name", name: "सेवाग्राही र मामिलाको विवरण" },

  { id: "wadi", name: "मामिला" },
  { id: "wadi", name: "अर्को तारिक " },
  { id: "action", name: "कार्य" },
];
