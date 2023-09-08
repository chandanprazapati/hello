import React, { useCallback, useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { englishToNepali } from "../../../utils/utility";
import LoadingSpinner from "../../../components/reusableDesign/Loading";
import ListHeader from "../../../components/reusableDesign/ListHeader";
import MuiTable from "../../../components/reusableDesign/muiTableDesign/MuiTable";
import ListViewPageDesign from "../../../components/reusableDesign/ListViewPageDesign";
import ListButton from "../../../components/reusableDesign/ListButton";
import { indexCaseType } from "../../../services/apiServices/legalCase/indexCaseType/indexCaseTypeService";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";
import { yenKanunApi } from "../../../services/apiServices/legalCase/legalCaseService";

export default function YenKanun() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = async () => {
      yenKanunApi().then(({ status, data, message }) => {
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
      router.push(`/legalCase/yenKanun/createYenKanun/${id}`);
    },
    [router]
  );

  const locale = (
    <MuiTable tableHead={tableHeadData}>
        <SeoOptimization title="येन कानुन " />
      <TableBody>
        {apiData.map((row, index) => {
          return (
            <TableRow key={index} className="hover:bg-[#a0cae7fd]">
              <TableCell>{englishToNepali(index + 1)}</TableCell>
              <TableCell> {row.name}</TableCell>

                <TableCell> {row.code}</TableCell>
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
      <ListHeader title="येन कानुन  सूची" />
      <ListButton url={`/legalCase/yenKanun/createYenKanun`} />

      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "क्रम संख्या" },
  { id: "name", name: "नाम" },
  { id: "code", name: "कोड" },
  { id: "action", name: "कार्य" },
];

