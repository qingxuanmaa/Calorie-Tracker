import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./RecordExercise.css";
// https://mui.com/material-ui/react-table/
// https://codesandbox.io/s/qf07wj?file=/demo.tsx:0-2007


export default function DenseTable({
     calorie 
}) {
  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow >
            <TableCell>Exercise </TableCell>
            <TableCell align="right">KCal consumed(1min)</TableCell>
 
          </TableRow>
        </TableHead>
        <TableBody>
          {calorie.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.item_name}
              </TableCell>
              <TableCell align="right">{row.kcal_per_min}</TableCell>
          
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
