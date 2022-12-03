import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// https://mui.com/material-ui/react-table/
// https://codesandbox.io/s/qf07wj?file=/demo.tsx:0-2007
import "./RecordExercise.css";

export default function DenseTable({
     recordingTable,
     title,
     unit,
     ratio
     
}) {
  return (
   
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>{title}</TableCell>
            <TableCell align="right">{unit}</TableCell>
            <TableCell align="right">KCal</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recordingTable.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.item_name}
              </TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right" component="th" scope="row">
                {Math.round(row.calories/ratio)}
              </TableCell>
              <TableCell align="right" component="th" scope="row">
                {row.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
