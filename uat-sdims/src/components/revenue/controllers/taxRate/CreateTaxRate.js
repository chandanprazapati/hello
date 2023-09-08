import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../../reusableDesign/CommonHeaderDesign";
import { taxRateVlidationResolver } from "../../../../utils/validateField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "nepali-datepicker-reactjs/dist/index.css";
import { TextField } from "@mui/material";
import { taxSubCategory } from "../../../../services/apiServices/revenue/taxSubCategory/taxSubCategoryServices";
import { createIndexTaxRate } from "../../../../services/apiServices/revenue/indextaxrate/indextaxrateservice";
import AddButton from "../../../reusableDesign/AddButton";

const CreateTaxRate = ({ clickedIdData }) => {
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ resolver: taxRateVlidationResolver });

  const router = useRouter();

  // to set the incoming value to the respective fields
  // useEffect(() => {
  //   setValue("id", clickedIdData?.id);
  //   setValue("name", clickedIdData?.name);
  //   setValue("taxSubCategoryId", clickedIdData?.taxSubCategoryId);
  //   setValue("code", clickedIdData?.code);
  //   setValue("rate", clickedIdData?.rate);
  //   setValue("newRate", clickedIdData?.newRate);
  //   setTaxSubCategoryValue(clickedIdData?.taxSubCategoryId);
  // }, []);

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        data = {
          taxRates: [
            {
              ...data,
              taxSubCategoryId: taxSubCategoryValue,
            },
          ],
        };

        try {
          createIndexTaxRate(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push("/revenue/indextaxrate");
              return;
            } else response.status === false;
            {
              toast.error(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
            }
            return;
          });
        } catch (error) {}
        resolve();
      }, 2000);
    });
  };
  //   for subcategory
  const [taxSubCategoryId, setTaxSubCategoryId] = useState([]);
  const [taxSubCategoryValue, setTaxSubCategoryValue] = useState("");

  const handleTaxSubCategory = (e) => {
    setTaxSubCategoryValue(e.target.value);
  };
  useEffect(() => {
    let taxSubCategoryIdData = () => {
      taxSubCategory().then((response) => {
        try {
          response.status === true;
          {
            setTaxSubCategoryId(response.data);
            setLoading(false);
          }
        } catch (error) {}
      });
    };

    taxSubCategoryIdData();
  }, []);

  return (
    <>
      <CommonHeaderDesign title={"कर दर राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  <TableCell sx={{ fontSize: "20px" }}>कर उप श्रेणी</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>नाम</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>कोड</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>दर</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    नयाँ दर (optional)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className="hover:bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90%">
                  <TableCell>
                    <select
                      onChange={handleTaxSubCategory}
                      value={taxSubCategoryValue}
                      className="py-3 border-2 border-gray-300"
                      required
                    >
                      <option value={""} selected disabled>
                        ---- कर उप श्रेणी छान्नुहोस् ----
                      </option>

                      {taxSubCategoryId.map((items, index) => {
                        return (
                          <option key={index} value={items?.id} >
                            {items.name}
                          </option>
                        );
                      })}
                    </select>
                  </TableCell>

                  <TableCell>
                    <TextField {...register("name")} />
                    <p> {errors?.name?.message}</p>
                  </TableCell>
                  <TableCell>
                    <TextField {...register("code")} />
                    <p> {errors?.code?.message}</p>
                  </TableCell>
                  <TableCell>
                    <TextField {...register("rate")} />
                    <p> {errors?.rate?.message}</p>
                  </TableCell>
                  <TableCell>
                    <TextField {...register("newRate")} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </>
  );
};
export default CreateTaxRate;
