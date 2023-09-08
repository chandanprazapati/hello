import React, { useEffect, useState } from 'react'
import { transcationDetail } from '../../../../../services/apiServices/revenue/transactionDetail/transactionService';
import { useRouter } from 'next/router';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ViewPage from '../../../../../components/viewPage/ViewPage';
import SeoOptimization from '../../../../../components/reusableDesign/SeoOptimzation';
import { FaPrint } from 'react-icons/fa';
const FullTaxDetailsById = () => {
    const router = useRouter();
    const userId = router.query.id;
    // for transaction detail of owner
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePrint = (id) => {
    router.push(`/revenue/taxpayerdetail/paytax/landdetail/generatereceipt/${id}`);
  };

  useEffect(() => {
    if (userId) {
      let transcationDetailApiData = () => {
        transcationDetail(userId).then((response) => {
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
      transcationDetailApiData();
    }
  }, [userId]);
  return (
    <div>
         {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          {/* loading text */}
          <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
            Loading...
          </div>
        </div>
      ) : (
        <React.Fragment>
            
          <SeoOptimization title={"Full Tax Details"} />
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center text-2xl py-3 rounded-xl font-bold ">
            करदाता को व्यक्तिगत विवरण
          </div>
          <div className="flex gap-2 py-6 ">
            <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% shadow-xl rounded-xl w-2/3 flex justify-around text-base py-4 font-bold ">
              <div className="gap-2 flex flex-col">
                <div>करदाताको नाम : {apiData.name}</div>

                <div>सम्पर्क नम्बर :{apiData.contactNo}</div>
                <div>ई–मेल ठेगाना : {apiData.email}</div>
              </div>
              <div className="gap-2 flex flex-col">
                <div>करदाता संकेत नं. : {apiData.code}</div>
                <div>पत्राचार गर्ने ठेगाना : {apiData.address}</div>
                <div>नागरिकता नं. : {apiData.citizenshipNo}</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% shadow-xl rounded-xl w-1/3  text-base py-4 font-bold ">
              <div className="flex flex-col gap-1 pl-10">
                <div>
                  अन्तिम पटक कर तिरेको : {apiData.lastPayDetails?.lastPayeMiti}
                </div>
                <div>मिति : {apiData.lastPayDetails?.lastPayYear}</div>
                <div>
                  सम्पत्ति रकम : {apiData.lastPayDetails?.lastPayAmount}
                </div>
                <div>
                  सेवा शुल्क रकम : {apiData.lastPayDetails?.lastPaySewaAmount}
                </div>
                <div>
                  कुल रकम : {apiData.lastPayDetails?.lastPayTotalAmount}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center text-2xl py-3 rounded-xl font-bold ">
            {" "}
            {apiData.name} सम्पत्ति विवरण
          </div>
          <br />

          <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% pl-10 flex justify-between  py-3 rounded-xl  ">
            <div className="font-bold text-xl ">मालपोतको विवरण</div>
           
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                          <TableRow className="bg-[#3e8dc1fd]">
                  <TableCell sx={{ fontSize: "20px" }}>क्र.सं.</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}> नक्सा नं.</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}> आर्थिक बर्ष</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>कित्ता नं.</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>क्षेत्रफल</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>रकम</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>कार्य</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apiData.taxLandDetail.map((row, index) => {
                  return (
                    <TableRow
                      key={index}
                      className="hover:bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90%"
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{row.nakasaNo}</TableCell>

                      <TableCell>{row.fiscalYearName}</TableCell>

                      <TableCell>{row.kittaNo}</TableCell>
                      <TableCell>{row.area}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell
                      className="pl-7 cursor-pointer hover:text-blue-900 "
                      onClick={() => {
                        handlePrint(row.id);
                      }}
                    >
                      <FaPrint size={20} />
                    </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <br />

          <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% pl-10 flex justify-between  py-3 rounded-xl  ">
            <div className="font-bold text-xl ">घर/तलाको विवरण</div>
            
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                          <TableRow className="bg-[#3e8dc1fd]">
                  <TableCell sx={{ fontSize: "20px" }}>क्र.सं.</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}> वडा नं.</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}> आर्थिक बर्ष</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>घर प्रकार</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>रकम</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apiData.taxBuildingDetail.map((row, index) => {
                  return (
                    <TableRow
                      key={index}
                      className="hover:bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90%"
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{row.wardNo}</TableCell>

                      <TableCell>{row.fiscalYearName}</TableCell>

                      <TableCell>{row.gharPrakar}</TableCell>
                      <TableCell>{row.rate}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <br />

          <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% pl-10 flex justify-between  py-3 rounded-xl  ">
            <div className="font-bold text-xl ">घरबहाल कर विवरण</div>
            
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                          <TableRow className="bg-[#3e8dc1fd]">
                  <TableCell sx={{ fontSize: "20px" }}>क्र.सं.</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}> आ.ब.</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>जम्मा घर</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}> जम्मा कोठा</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    {" "}
                    जम्मा कोठा (भाडामा)
                  </TableCell>
                  <TableCell sx={{ fontSize: "20px" }}> भाडा रकम</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}> बक्यौता रकम</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apiData.houseRentList.map((row, index) => {
                  return (
                    <TableRow
                      key={index}
                      className="hover:bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90%"
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{row.fiscalYearName}</TableCell>

                      <TableCell>{row.totalBulding}</TableCell>
                      <TableCell>{row.totalRoom}</TableCell>

                      <TableCell>{row.totalRoomOnRent}</TableCell>
                      <TableCell>{row.yearlyRentAmount}</TableCell>
                      <TableCell>{row.outstandingAmount}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <br />

          <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% pl-10 flex justify-between  py-3 rounded-xl  ">
            <div className="font-bold text-xl ">सवारी साधनको विवरण</div>
            
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                          <TableRow className="bg-[#3e8dc1fd]">
                  <TableCell sx={{ fontSize: "20px" }}>क्र.सं.</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    {" "}
                    सवारी साधनको प्रकार
                  </TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    {" "}
                    सवारी साधनको नं.
                  </TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    मूल्यांकन सूचक
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apiData.vehicleDetailList.map((row, index) => {
                  return (
                    <TableRow
                      key={index}
                      className="hover:bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90%"
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{row.type}</TableCell>

                      <TableCell>{row.regNo}</TableCell>

                      <TableCell>{row.amount}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <br />

          <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% pl-10 flex justify-between  py-3 rounded-xl  ">
            <div className="font-bold text-xl ">व्यवसायको विवरण</div>
            
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                          <TableRow className="bg-[#3e8dc1fd]">
                  <TableCell sx={{ fontSize: "20px" }}>क्र.सं.</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}> आर्थिक बर्ष</TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    {" "}
                    व्यवसायको नाम
                  </TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    व्यवसायको किसिम
                  </TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    {" "}
                    व्यवसाय रहेको ठेगाना
                  </TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    मूल्यांकन सूचक
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody></TableBody>
            </Table>
          </TableContainer>
          </React.Fragment>
      )}
          
          
    </div>
  )
}

export default FullTaxDetailsById