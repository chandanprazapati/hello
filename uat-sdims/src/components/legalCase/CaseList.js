import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  FaBook,
  FaDollarSign,
  FaEdit,
  FaPencilAlt,
  FaEye,
  FaFilePdf,
  FaCalendarAlt,
} from "react-icons/fa";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/reusableDesign/Loading";
import ListButton from "../../components/reusableDesign/ListButton";
import SeoOptimization from "../../components/reusableDesign/SeoOptimzation";
import { englishToNepali } from "../../utils/utility";
import ListViewPageDesign from "../reusableDesign/ListViewPageDesign";
import { getIndexCase } from "../../services/apiServices/legalCase/legalCaseService";

export default function CaseList() {
  const router = useRouter();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = async () => {
      getIndexCase().then(({ status, data, message }) => {
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

  const handleDetail = useCallback(
    (id) => {
      router.push(`/legalCase/caseDetail/${id}`);
    },
    [router]
  );

  const handleLikhitZawaf = useCallback(
    (id) => {
      router.push(`/legalCase/caseDetail/likhitZawaf/${id}`);
    },
    [router]
  );

  const handleArkoTarik = useCallback(
    (id) => {
      router.push(`/legalCase/caseDetail/arkoTarik/${id}`);
    },
    [router]
  );

  const handleMilaPatra = useCallback(
    (id) => {
      router.push(`/legalCase/caseDetail/milaPatra/${id}`);
    },
    [router]
  );

  const handleFirtaAadesh = useCallback(
    (id) => {
      router.push(`/legalCase/caseDetail/firtaAadesh/${id}`);
    },
    [router]
  );

  const handleCompleteCase = useCallback(
    (id) => {
      router.push(`/legalCase/caseDetail/completeCase/${id}`);
    },
    [router]
  );

  const handlePunarebedan = useCallback(
    (id) => {
      router.push(`/legalCase/caseDetail/punarabedan/${id}`);
    },
    [router]
  );

  const locale = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow className="bg-[#3e8dc1fd]">
            <TableCell sx={{ fontSize: "16px" }}>सि.नं</TableCell>
            <TableCell sx={{ fontSize: "16px" }}>
              सेवाग्राही र मामिलाको विवरण
            </TableCell>
            <TableCell sx={{ fontSize: "16px" }}>मामिला</TableCell>
            <TableCell sx={{ fontSize: "16px" }}>अर्को तारिक</TableCell>
            <TableCell sx={{ fontSize: "16px" }}>स्थिति</TableCell>
            <TableCell
              sx={{
                fontSize: "16px",
                justifyContent: "center",
                display: "flex",
              }}
            >
              कार्य
            </TableCell>
          </TableRow>
        </TableHead>
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
                <TableCell> {row.caseStagee}</TableCell>

                <TableCell className="pl-7 cursor-pointer  ">
                  <div className=" flex flex-wrap gap-1 ">
                    <div
                      className=" cursor-pointer hover:text-blue-900 "
                      onClick={() => {
                        handleDetail(row.id);
                      }}
                    >
                      <div className="flex border-2 p-2 border-black bg-gray-300 gap-2">
                        <text>विवरण</text>
                        <FaEye size={16} />
                      </div>
                    </div>

                    {row.isReplyForCase ? (
                      <>
                        <div
                          className=" cursor-pointer  "
                          onClick={() => {
                            handleMilaPatra(row.id);
                          }}
                        >
                          <div className="flex border-2 p-2 border-black  gap-2">
                            <text>मिलापत्र</text>
                            <FaBook size={16} />
                          </div>
                        </div>

                        <div
                          className=" cursor-pointer bg-orange-300 "
                          onClick={() => {
                            handleCompleteCase(row.id);
                          }}
                        >
                          <div className="flex border-2 p-2 border-black gap-2">
                            <text className="px-3"> निर्णय</text>
                          </div>
                        </div>

                        <div
                          className=" cursor-pointer hover:text-blue-900 "
                          onClick={() => {
                            handleFirtaAadesh(row.id);
                          }}
                        >
                          <div className="flex border-2 p-2 border-black bg-gray-300 gap-2">
                            <text> फिर्ता आदेश </text>
                            <FaEdit size={16} />
                          </div>
                        </div>

                        <div
                          className=" cursor-pointer bg-green-300 "
                          onClick={() => {
                            handleArkoTarik(row.id);
                          }}
                        >
                          <div className="flex border-2 p-2 border-black  gap-2">
                            <text>अर्को तारिक </text>
                            <FaCalendarAlt size={16} />
                          </div>
                        </div>

                        <div
                          className=" cursor-pointer bg-yellow-300 "
                          onClick={() => {
                            handlePunarebedan(row.id);
                          }}
                        >
                          <div className="flex border-2 p-2 border-black gap-2">
                            <text className="px-3"> पुनरावेदन</text>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className=" cursor-pointer bg-blue-300 "
                          onClick={() => {
                            handleLikhitZawaf(row.id);
                          }}
                        >
                          <div className="flex border-2 p-2 border-black  gap-2">
                            <text>लिखित जवाफ</text>
                            <FaPencilAlt size={16} />
                          </div>
                        </div>

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
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <ListViewPageDesign>
      <SeoOptimization title={"Case List"} />
      <ListButton url={`/legalCase/caseDetail/createCaseDetail`} />

      {loading ? <LoadingSpinner /> : locale}
    </ListViewPageDesign>
  );
}
