import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
export default function MuiTable({ tableHead, children }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow className="bg-[#3e8dc1fd]">
            {tableHead.map((head, index) => (
              <TableCell key={index} sx={{ fontSize: "20px" }}>
                {head.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {children}
      </Table>
    </TableContainer>
  );
}
