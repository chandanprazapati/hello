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
import { postApi } from "../../../services/apiServices/legalCase/legalCaseService";
import SeoOptimization from "../../../components/reusableDesign/SeoOptimzation";

export default function Post() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = async () => {
      postApi().then(({ status, data, message }) => {
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
      router.push(`/legalCase/post/createPost/${id}`);
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

              <TableCell>
                <span
                  className={`font-bold ${
                    row.status ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {row.status ? "ACTIVE" : "DEACTIVE"}
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
      <SeoOptimization title="Post" />
      <ListHeader title="पद सूची" />
      <ListButton url={`/legalCase/post/createPost`} />

      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "क्रम संख्या" },
  { id: "name", name: "नाम" },
  { id: "isActive", name: "	स्थिति" },
  { id: "action", name: "कार्य" },
];
