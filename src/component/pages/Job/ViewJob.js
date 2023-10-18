import React, { useEffect } from "react";
import Dashboard from "../../dashboard/Dashboard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  MenuItem,
  IconButton,
  Button,
  Box,
  Tooltip,
} from "@mui/material";
import { getSingleJob } from "../../../actions/job";
import { formattedDate } from "./formattedDate";
import { ArrowBack } from "./BackArrow";

function ViewJob() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const job = useSelector((state) => state.job.jobs);

  useEffect(() => {
    dispatch(getSingleJob(id));
  }, [dispatch, id]);

  return (
    <Dashboard>
      <Box display={"flex"}>
        <ArrowBack />
        <h2>Job Details</h2>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell align="center">SO/Wo No</TableCell>
              <TableCell align="center">{job[0]?.soWo}</TableCell>
              <TableCell align="center">Prod.Order No</TableCell>
              <TableCell align="center">{job[0]?.productionOrderNo}</TableCell>
              <TableCell align="center">WO Date</TableCell>
              <TableCell align="center">
                {formattedDate(job[0]?.woDate)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Job Name</TableCell>
              <TableCell align="center">{job[0]?.jobName}</TableCell>
              <TableCell align="center">PO No</TableCell>
              <TableCell align="center">{job[0]?.poNo}</TableCell>
              <TableCell align="center">Total CT</TableCell>
              <TableCell align="center">{job[0]?.totalCT}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Drag No</TableCell>
              <TableCell align="center">{job[0]?.dragNo}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table sx={{ minWidth: 3200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr.No</TableCell>
              <TableCell>Process</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Machine Name</TableCell>
              <TableCell>Tooling Used</TableCell>
              <TableCell>DC</TableCell>
              <TableCell>Length</TableCell>
              <TableCell>Width</TableCell>
              <TableCell>Feed</TableCell>
              <TableCell>CT(min)</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Ideal Code</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>End Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {job[0]?.processTable &&
              job[0]?.processTable.map((row, rowIndex) => (
                <TableRow key={rowIndex} sx={{ fontSize: 12 }}>
                  <TableCell>{rowIndex + 1}</TableCell>
                  <TableCell>{row.process}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell width="200">
                    <Tooltip
                      title={row.machineName}
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <div
                        sx={{
                          width: 200,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {row.machineName}
                      </div>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      {row.toolingUsed.map((tool, index) => (
                        <Tooltip key={index} title={tool}>
                          <Typography component="li" sx={{ fontSize: 14 }}>
                            {tool}
                          </Typography>
                        </Tooltip>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>{row.length}</TableCell>
                  <TableCell>{row.width}</TableCell>
                  <TableCell>{row.dc}</TableCell>
                  <TableCell>{row.feed}</TableCell>
                  <TableCell>{row.ct}</TableCell>
                  <TableCell>{formattedDate(row.startDate)}</TableCell>
                  <TableCell align="center">
                    {formattedDate(row.endDate)}
                  </TableCell>
                  <TableCell>{row.startTime}</TableCell>
                  <TableCell>{row.endTime}</TableCell>
                  <TableCell>{row.process}</TableCell>
                  <TableCell>{row.process}</TableCell>
                  <TableCell>{row.process}</TableCell>
                  <TableCell>{row.process}</TableCell>
                  <TableCell>{row.process}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dashboard>
  );
}

export default ViewJob;
