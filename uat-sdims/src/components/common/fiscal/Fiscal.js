import React, { useCallback, useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { fiscal } from "../../../services/apiServices/common/fiscal/fiscalService";
import { englishToNepali } from "../../../utils/utility";
import LoadingSpinner from "../../reusableDesign/Loading";
import ListHeader from "../../reusableDesign/ListHeader";
import MuiTable from "../../reusableDesign/muiTableDesign/MuiTable";
import ListViewPageDesign from "../../reusableDesign/ListViewPageDesign";
import ListButton from "../../reusableDesign/ListButton";

export default function Fiscal() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = async () => {
      fiscal().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiData(data);
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
  }, [setApiData]);

  const handleEdit = useCallback(
    (id) => {
      router.push(`/common/fiscal/createFiscal/${id}`);
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
              <TableCell>{englishToNepali(row.dateFrom)}</TableCell>
              <TableCell>{englishToNepali(row.dateTo)}</TableCell>
              <TableCell>
                <span
                  className={`font-bold ${
                    row.isActive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {row.isActive ? "ACTIVE" : "DEACTIVE"}
                </span>
              </TableCell>
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
      <ListHeader title="आर्थिक वर्ष सूची" />
      <ListButton url={`/common/fiscal/createFiscal`} />

      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "क्रम संख्या" },
  { id: "name_En", name: "आर्थिक वर्ष" },
  { id: "dateFrom", name: "सुरू मिति" },
  { id: "dateTo", name: "अन्तिम मिति" },
  { id: "isActive", name: "	स्थिति" },
  { id: "action", name: "कार्य" },
];
