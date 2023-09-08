import React, { useCallback, useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FaEdit, FaFilePdf, FaTrash } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import MuiTable from "../../../../components/reusableDesign/muiTableDesign/MuiTable";
import ListViewPageDesign from "../../../../components/reusableDesign/ListViewPageDesign";
import ListHeader from "../../../../components/reusableDesign/ListHeader";
import ListButton from "../../../../components/reusableDesign/ListButton";
import LoadingSpinner from "../../../../components/reusableDesign/Loading";
import { englishToNepali } from "../../../../utils/utility";
import { bhuktaniListBySamjhautaId } from "../../../../services/apiServices/planning/planningSamjhauta/planningSamjhautaService";

export default function Fiscal() {
  const router = useRouter();
  const userId = router.query.id;
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const fetchedData = () => {
        bhuktaniListBySamjhautaId(userId).then(({ status, data, message }) => {
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
    }
  }, [setApiData, userId]);

  const handleEdit = useCallback(
    (id) => {
      router.push(`/common/fiscal/createFiscal/${id}`);
    },
    [router]
  );
  const handleBiwaran = (id) => {
    router.push(`/planning/samjhauta/completeReport/${id}`);
  };

  const handleDelete = (id) => {};

  const locale = (
    <MuiTable tableHead={tableHeadData}>
      <TableBody>
        {apiData.map((row, index) => {
          return (
            <TableRow key={index} className="hover:bg-[#a0cae7fd]">
              <TableCell>{index + 1}</TableCell>
              <TableCell> {row.aayojana_Karyakram}</TableCell>
              <TableCell>{row.nirman_Upabhokta}</TableCell>
              <TableCell>{row.bhuktaniTypeId}</TableCell>
              <TableCell>{(row.remaining_Bhuktani_Amount)}</TableCell>
              <TableCell className="pl-7 cursor-pointer hover:text-blue-900  ">
                <div className=" flex flex-wrap gap-1 ">
                  <div
                    className=" cursor-pointer hover:text-blue-900 "
                    onClick={() => {
                      handleBiwaran(row.planningSamjhautaId);
                    }}
                  >
                    <div className="flex border-2 p-2 border-black bg-gray-300 gap-2">
                      <text>विवरण</text>
                      <FaFilePdf size={16} />
                    </div>
                  </div>

                  <div
                    className=" cursor-pointer hover:text-blue-900 "
                    onClick={() => {
                      handleDelete(row.planningSamjhautaId);
                    }}
                  >
                    <div className="flex border-2 p-2 border-black bg-red-300 hover:bg-red-500 gap-2">
                      <text>हटाउनु</text>
                      <FaTrash size={16} />
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
      <ListHeader title="उपभोक्ता समिति बीचको सम्झौता भएको भुक्तानी सूची" />
      <ListButton url={`/planning/samjhauta/bhuktani/createBhuktani/${userId}`} />

      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}

const tableHeadData = [
  { id: "id", name: "क्रम संख्या" },
  { id: "name_En", name: "आयोजना / कार्यक्रम	" },
  { id: "dateFrom", name: "निर्माण उपभोक्ता	" },
  { id: "dateTo", name: "भुक्तानी प्रकार	" },
  { id: "isActive", name: "	भुक्तानी रकम	" },
  { id: "action", name: "कार्य" },
];
