import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "./ProcessTable.css";

import ModeStandbyOutlinedIcon from "@mui/icons-material/ModeStandbyOutlined";
import { formattedDate } from "./formattedDate";

export const ViewProcessTable = ({
  data,

  containerIndex,

  selectedProcessName,
}) => {
  const processTableData = data || [];

  const millingTable = (
    <>
      <Table sx={{ minWidth: 2800, margin: 0.5 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#00416b" }}>
          <TableRow>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Sr.No
            </TableCell>

            <TableCell align="center" sx={{ color: "#ffff" }}>
              Process
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Description
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Machine Name
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Tooling Used
            </TableCell>

            <TableCell align="center" sx={{ color: "#ffff" }}>
              Length
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Width
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              DC
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              MR
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              NOP
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              FPP
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Feed
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              EST.HRS
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Estimated CT(min)
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Actual CT(min)
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Start Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Start Time
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              End Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              End Time
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Ideal Code
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Start Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Start Time
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              End Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              End Time
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              User Name
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {processTableData &&
            processTableData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                style={{
                  color: "#fff",
                  backgroundColor:
                    row.actualCT >= row.estimatedCT ? "#78cc9f" : "#c34266",
                }}
              >
                <TableCell align="center">{rowIndex + 1}</TableCell>

                <TableCell align="center">{row.process}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.machineName}</TableCell>
                <TableCell align="center">{row.toolingUsed}</TableCell>
                <TableCell align="center">{row.length}</TableCell>
                <TableCell align="center">{row.width}</TableCell>
                <TableCell align="center">{row.dc}</TableCell>
                <TableCell align="center">{row.mr}</TableCell>
                <TableCell align="center">{row.nop}</TableCell>
                <TableCell align="center">{row.fpp}</TableCell>
                <TableCell align="center">{row.feed}</TableCell>
                <TableCell align="center">{row.estimatedHrs}</TableCell>
                <TableCell align="center">{row.estimatedCT}</TableCell>
                <TableCell align="center">{row.actualCT}</TableCell>
                <TableCell align="center">
                  {formattedDate(row.startDate)}
                </TableCell>
                <TableCell align="center">{row.startTime}</TableCell>
                <TableCell align="center">
                  {formattedDate(row.endDate)}
                </TableCell>
                <TableCell align="center">{row.endTime}</TableCell>
                <TableCell align="center">{row.idleCode}</TableCell>
                <TableCell align="center">
                  {formattedDate(row.startDate1)}
                </TableCell>
                <TableCell align="center">{row.startTime1}</TableCell>
                <TableCell align="center">
                  {formattedDate(row.endDate1)}
                </TableCell>
                <TableCell align="center">{row.endTime1}</TableCell>
                <TableCell align="center">{row.userName}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );

  const boringTable = (
    <>
      <Table sx={{ minWidth: 2800, margin: 0.5 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#00416b" }}>
          <TableRow>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Sr.No
            </TableCell>

            <TableCell align="center" sx={{ color: "#ffff" }}>
              Process
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Description
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Machine Name
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Tooling Used
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Tooling Size
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              RPM
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Feed(MM/REV)
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Length
            </TableCell>

            <TableCell align="center" sx={{ color: "#ffff" }}>
              DC
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              MR
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              NOP
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              FPP
            </TableCell>

            <TableCell align="center" sx={{ color: "#ffff" }}>
              EST.HRS
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Estimated CT(min)
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Actual CT(min)
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Start Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Start Time
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              End Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              End Time
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Ideal Code
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Start Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Start Time
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              End Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              End Time
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              User Name
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {processTableData &&
            processTableData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                style={{
                  color: "#fff",
                  backgroundColor:
                    row.actualCT >= row.estimatedCT ? "#78cc9f" : "#c34266",
                }}
              >
                <TableCell align="center">{rowIndex + 1}</TableCell>

                <TableCell align="center">{row.process}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.machineName}</TableCell>
                <TableCell align="center">{row.toolingUsed}</TableCell>
                <TableCell align="center">{row.toolingSize}</TableCell>
                <TableCell align="center">{row.rpm}</TableCell>

                <TableCell align="center">{row.feed}</TableCell>
                <TableCell align="center">{row.length}</TableCell>
                <TableCell align="center">{row.dc}</TableCell>
                <TableCell align="center">{row.mr}</TableCell>
                <TableCell align="center">{row.nop}</TableCell>
                <TableCell align="center">{row.fpp}</TableCell>
                <TableCell align="center">{row.estimatedHrs}</TableCell>
                <TableCell align="center">{row.estimatedCT}</TableCell>
                <TableCell align="center">{row.actualCT}</TableCell>
                <TableCell align="center">
                  {formattedDate(row.startDate)}
                </TableCell>
                <TableCell align="center">{row.startTime}</TableCell>
                <TableCell align="center">
                  {formattedDate(row.endDate)}
                </TableCell>
                <TableCell align="center">{row.endTime}</TableCell>
                <TableCell align="center">{row.idleCode}</TableCell>
                <TableCell align="center">
                  {formattedDate(row.startDate1)}
                </TableCell>
                <TableCell align="center">{row.startTime1}</TableCell>
                <TableCell align="center">
                  {formattedDate(row.endDate1)}
                </TableCell>
                <TableCell align="center">{row.endTime1}</TableCell>
                <TableCell align="center">{row.userName}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );

  const drillingTable = (
    <>
      <Table sx={{ minWidth: 2800, margin: 0.5 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#00416b" }}>
          <TableRow>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Sr.No
            </TableCell>

            <TableCell align="center" sx={{ color: "#ffff" }}>
              Process
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Description
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Machine Name
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Tooling Used
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              DIA
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              RPM
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Length
            </TableCell>

            <TableCell align="center" sx={{ color: "#ffff" }}>
              Feed(MM/MIN)
            </TableCell>

            <TableCell align="center" sx={{ color: "#ffff" }}>
              NOH
            </TableCell>

            <TableCell align="center" sx={{ color: "#ffff" }}>
              EST.HRS
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Estimated CT(min)
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Actual CT(min)
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Start Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Start Time
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              End Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              End Time
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Ideal Code
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Start Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Start Time
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              End Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              End Time
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              User Name
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {processTableData &&
            processTableData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                style={{
                  color: "#fff",
                  backgroundColor:
                    row.actualCT >= row.estimatedCT ? "#78cc9f" : "#c34266",
                }}
              >
                <TableCell align="center">{rowIndex + 1}</TableCell>
                <TableCell align="center">{row.process}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.machineName}</TableCell>
                <TableCell align="center">{row.toolingUsed}</TableCell>
                <TableCell align="center">{row.dia}</TableCell>
                <TableCell align="center">{row.rpm}</TableCell>
                <TableCell align="center">{row.length}</TableCell>
                <TableCell align="center">{row.feed}</TableCell>
                <TableCell align="center">{row.noh}</TableCell>

                <TableCell align="center">{row.estimatedHrs}</TableCell>
                <TableCell align="center">{row.estimatedCT}</TableCell>
                <TableCell align="center">{row.actualCT}</TableCell>
                <TableCell align="center">
                  {formattedDate(row.startDate)}
                </TableCell>
                <TableCell align="center">{row.startTime}</TableCell>
                <TableCell align="center">
                  {formattedDate(row.endDate)}
                </TableCell>
                <TableCell align="center">{row.endTime}</TableCell>
                <TableCell align="center">{row.idleCode}</TableCell>
                <TableCell align="center">
                  {formattedDate(row.startDate1)}
                </TableCell>
                <TableCell align="center">{row.startTime1}</TableCell>
                <TableCell align="center">
                  {formattedDate(row.endDate1)}
                </TableCell>
                <TableCell align="center">{row.endTime1}</TableCell>
                <TableCell align="center">{row.userName}</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );

  const tappingTable = (
    <>
      <Table sx={{ minWidth: 2800, margin: 0.5 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#00416b" }}>
          <TableRow>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Sr.No
            </TableCell>

            <TableCell align="center" sx={{ color: "#ffff" }}>
              Process
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Description
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Machine Name
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Tooling Used
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              DIA
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              RPM
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Length
            </TableCell>

            <TableCell align="center" sx={{ color: "#ffff" }}>
              Feed(MM/MIN)
            </TableCell>

            <TableCell align="center" sx={{ color: "#ffff" }}>
              NOH
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              EST.HRS
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Estimated CT(min)
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Actual CT(min)
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Start Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Start Time
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              End Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              End Time
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Ideal Code
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Start Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              Start Time
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              End Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              End Time
            </TableCell>
            <TableCell align="center" sx={{ color: "#ffff" }}>
              User Name
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {processTableData &&
            processTableData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                style={{
                  color: "#fff",
                  backgroundColor:
                    row.actualCT >= row.estimatedCT ? "#78cc9f" : "#c34266",
                }}
              >
                <TableCell align="center">{rowIndex + 1}</TableCell>

                <TableCell align="center">{row.process}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.machineName}</TableCell>
                <TableCell align="center">{row.toolingUsed}</TableCell>
                <TableCell align="center">{row.dia}</TableCell>
                <TableCell align="center">{row.rpm}</TableCell>
                <TableCell align="center">{row.length}</TableCell>
                <TableCell align="center">{row.feed}</TableCell>
                <TableCell align="center">{row.noh}</TableCell>

                <TableCell align="center">{row.estimatedHrs}</TableCell>
                <TableCell align="center">{row.estimatedCT}</TableCell>
                <TableCell align="center">{row.actualCT}</TableCell>
                <TableCell align="center">
                  {formattedDate(row.startDate)}
                </TableCell>
                <TableCell align="center">{row.startTime}</TableCell>
                <TableCell align="center">
                  {formattedDate(row.endDate)}
                </TableCell>
                <TableCell align="center">{row.endTime}</TableCell>
                <TableCell align="center">{row.idleCode}</TableCell>
                <TableCell align="center">
                  {formattedDate(row.startDate1)}
                </TableCell>
                <TableCell align="center">{row.startTime1}</TableCell>
                <TableCell align="center">
                  {formattedDate(row.endDate1)}
                </TableCell>
                <TableCell align="center">{row.endTime1}</TableCell>
                <TableCell align="center">{row.userName}</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );

  return (
    <>
      {selectedProcessName === "Milling" && millingTable}
      {selectedProcessName === "Drilling" && drillingTable}
      {selectedProcessName === "Boring" && boringTable}
      {selectedProcessName === "Tapping" && tappingTable}
    </>
  );
};
