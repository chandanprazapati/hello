import React, { useCallback, useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { indexCaseType } from "../../services/apiServices/legalCase/indexCaseType/indexCaseTypeService";
import { englishToNepali } from "../../utils/utility";
import MuiTable from "../../components/reusableDesign/muiTableDesign/MuiTable";
import ListViewPageDesign from "../../components/reusableDesign/ListViewPageDesign";
import ListHeader from "../../components/reusableDesign/ListHeader";
import ListButton from "../../components/reusableDesign/ListButton";
import LoadingSpinner from "../../components/reusableDesign/Loading";
import SeoOptimization from "../../components/reusableDesign/SeoOptimzation";

export default function TotalVisitorDetails() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = async () => {
      indexCaseType().then(({ status, data, message }) => {
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
      router.push(`/legalCase/mamila/createMamila/${id}`);
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
              <TableCell> {row.name}</TableCell>
              <TableCell> {row.name}</TableCell>
              <TableCell> {row.name}</TableCell>
              <TableCell> {row.name}</TableCell>
              <TableCell> {row.name}</TableCell>
              <TableCell> {row.name}</TableCell>

              <TableCell
                className="pl-7 cursor-pointer hover:text-blue-900  "
                onClick={() => {
                  handleEdit(row.id);
                }}
              >
                <div>
                  <FaEdit size={20} />
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
      <SeoOptimization title="सम्पूर्ण भेटघाट " />
      <ListHeader title="सम्पूर्ण भेटघाटको विवरण सुची " />

      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "क्रम संख्या" },
  { id: "miti", name: "मिति" },
  { id: "name", name: "आगन्तुको नाम" },
  { id: "isActive", name: "	भेट्नु पर्ने व्यक्ति नाम" },
  { id: "isActive", name: "	मोबाइल नं. " },
  { id: "isActive", name: "	संस्था/ठाउँ " },
  { id: "isActive", name: "	भेट्ने समय " },
  { id: "action", name: "कार्य" },
];
