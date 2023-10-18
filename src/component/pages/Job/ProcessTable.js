import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  IconButton,
  FormHelperText,
} from "@mui/material";
import "./ProcessTable.css";

import ModeStandbyOutlinedIcon from "@mui/icons-material/ModeStandbyOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { formattedEditDate } from "./formattedDate";
import { machineData, processList, toolList, userName } from "./Data";

export const ProcessTable = ({
  formData,
  handleTextFieldChange,
  processTableErrors,
}) => {
  const processTableData = formData.processTable || [];

  return (
    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Table sx={{ minWidth: 2800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Sr.No</TableCell>
            <TableCell align="center">No</TableCell>
            <TableCell align="center">Process</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Machine Name</TableCell>
            <TableCell align="center">Tooling Used</TableCell>
            <TableCell align="center">DC</TableCell>
            <TableCell align="center">Length</TableCell>
            <TableCell align="center">Width</TableCell>
            <TableCell align="center">Feed</TableCell>
            <TableCell align="center">Estimated CT(min)</TableCell>
            <TableCell align="center">Actual CT(min)</TableCell>
            <TableCell align="center">Start Date</TableCell>
            <TableCell align="center">Start Time</TableCell>
            <TableCell align="center">End Date</TableCell>
            <TableCell align="center">End Time</TableCell>
            <TableCell align="center">Ideal Code</TableCell>
            <TableCell align="center">Start Date</TableCell>
            <TableCell align="center">Start Time</TableCell>
            <TableCell align="center">End Date</TableCell>
            <TableCell align="center">End Time</TableCell>
            <TableCell align="center">User Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {processTableData &&
            processTableData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell align="center">{rowIndex + 1}</TableCell>
                <TableCell align="center">
                  <ModeStandbyOutlinedIcon
                    style={{
                      color:
                        row.actualCT > row.estimatedCT
                          ? "red" // Actual CT is more than Estimated CT + 10
                          : row.actualCT < row.estimatedCT
                          ? "green" // Actual CT is less than Estimated CT - 10
                          : "inherit", // Default background color
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Select
                    labelId={`process-label-${rowIndex}`}
                    size="small"
                    id={`process-${rowIndex}`}
                    value={row.process}
                    name={`process-${rowIndex}`}
                    className="fixed-width-input"
                    onChange={(e) =>
                      handleTextFieldChange(e, rowIndex, "process")
                    }
                    error={processTableErrors[rowIndex]?.process}
                    disabled
                  >
                    {processList.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error={processTableErrors[rowIndex]?.process}>
                    {processTableErrors[rowIndex]?.process
                      ? "This field is required"
                      : ""}
                  </FormHelperText>
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="Description"
                    className="fixed-width-input"
                    size="small"
                    name={`description-${rowIndex}`}
                    value={row.description}
                    onChange={(e) =>
                      handleTextFieldChange(e, rowIndex, "description")
                    }
                    error={processTableErrors[rowIndex]?.description}
                    helperText={
                      processTableErrors[rowIndex]?.description
                        ? "This field is required"
                        : ""
                    }
                    disabled
                  />
                </TableCell>
                <TableCell align="center">
                  <Select
                    labelId={`machineName-label-${rowIndex}`}
                    className="fixed-width-input"
                    size="small"
                    id={`machineName-${rowIndex}`}
                    value={row.machineName}
                    name={`machineName-${rowIndex}`}
                    onChange={(e) =>
                      handleTextFieldChange(e, rowIndex, "machineName")
                    }
                    error={processTableErrors[rowIndex]?.machineName}
                    disabled
                  >
                    {machineData.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText
                    error={processTableErrors[rowIndex]?.machineName}
                  >
                    {processTableErrors[rowIndex]?.machineName
                      ? "This field is required"
                      : ""}
                  </FormHelperText>
                </TableCell>

                <TableCell align="center">
                  <Select
                    labelId={`toolingUsed-label-${rowIndex}`}
                    className="fixed-width-input"
                    size="small"
                    id={`toolingUsed-${rowIndex}`}
                    value={row.toolingUsed || []} // Ensure that value is an array
                    multiple // Enable multiple selection
                    name={`toolingUsed-${rowIndex}`}
                    onChange={(e) =>
                      handleTextFieldChange(e, rowIndex, "toolingUsed")
                    }
                    error={processTableErrors[rowIndex]?.toolingUsed}
                    disabled
                  >
                    {toolList.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText
                    error={processTableErrors[rowIndex]?.toolingUsed}
                  >
                    {processTableErrors[rowIndex]?.toolingUsed
                      ? "This field is required"
                      : ""}
                  </FormHelperText>
                </TableCell>

                <TableCell align="center">
                  <TextField
                    label="dc"
                    className="fixed-width-input"
                    size="small"
                    name={`dc-${rowIndex}`}
                    value={row.dc}
                    onChange={(e) => handleTextFieldChange(e, rowIndex, "dc")}
                    error={processTableErrors[rowIndex]?.dc}
                    helperText={
                      processTableErrors[rowIndex]?.dc
                        ? "This field is required"
                        : ""
                    }
                    disabled
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="length"
                    className="fixed-width-input"
                    size="small"
                    name={`length-${rowIndex}`}
                    value={row.length}
                    onChange={(e) =>
                      handleTextFieldChange(e, rowIndex, "length")
                    }
                    error={processTableErrors[rowIndex]?.length}
                    helperText={
                      processTableErrors[rowIndex]?.length
                        ? "This field is required"
                        : ""
                    }
                    disabled
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="width"
                    className="fixed-width-input"
                    size="small"
                    name={`width-${rowIndex}`}
                    value={row.width}
                    onChange={(e) =>
                      handleTextFieldChange(e, rowIndex, "width")
                    }
                    error={processTableErrors[rowIndex]?.width}
                    helperText={
                      processTableErrors[rowIndex]?.width
                        ? "This field is required"
                        : ""
                    }
                    disabled
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="feed"
                    className="fixed-width-input"
                    size="small"
                    name={`feed-${rowIndex}`}
                    value={row.feed}
                    onChange={(e) => handleTextFieldChange(e, rowIndex, "feed")}
                    error={processTableErrors[rowIndex]?.feed}
                    helperText={
                      processTableErrors[rowIndex]?.feed
                        ? "This field is required"
                        : ""
                    }
                    disabled
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="estimatedCT"
                    className="fixed-width-input"
                    size="small"
                    name={`estimatedCT-${rowIndex}`}
                    value={row.estimatedCT}
                    onChange={(e) =>
                      handleTextFieldChange(e, rowIndex, "estimatedCT")
                    }
                    error={processTableErrors[rowIndex]?.estimatedCT}
                    helperText={
                      processTableErrors[rowIndex]?.estimatedCT
                        ? "This field is required"
                        : ""
                    }
                    disabled
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="actualCT"
                    className="fixed-width-input"
                    size="small"
                    name={`actualCT-${rowIndex}`}
                    value={row.actualCT}
                    onChange={(e) =>
                      handleTextFieldChange(e, rowIndex, "actualCT")
                    }
                    disabled
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="startDate"
                    className="fixed-width-input"
                    size="small"
                    type="date"
                    name={`startDate-${rowIndex}`}
                    value={row.startDate}
                    onChange={(e) =>
                      handleTextFieldChange(e, rowIndex, "startDate")
                    }
                    inputProps={{ min: new Date().toISOString().split("T")[0] }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="startTime"
                    size="small"
                    className="fixed-width-input"
                    type="time"
                    name={`startTime-${rowIndex}`}
                    value={row.startTime}
                    onChange={(e) =>
                      handleTextFieldChange(e, rowIndex, "startTime")
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="endDate"
                    size="small"
                    type="date"
                    name={`endDate-${rowIndex}`}
                    className="fixed-width-input"
                    value={row.endDate}
                    onChange={(e) =>
                      handleTextFieldChange(e, rowIndex, "endDate")
                    }
                    inputProps={{ min: new Date().toISOString().split("T")[0] }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="endTime"
                    size="small"
                    type="time"
                    name={`endTime-${rowIndex}`}
                    className="fixed-width-input"
                    value={row.endTime}
                    onChange={(e) =>
                      handleTextFieldChange(e, rowIndex, "endTime")
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="idleCode"
                    size="small"
                    className="fixed-width-input"
                    name={`idleCode-${rowIndex}`}
                    value={row.idleCode}
                    onChange={(e) =>
                      handleTextFieldChange(e, rowIndex, "idleCode")
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="startDate1"
                    size="small"
                    type="date"
                    name={`startDate1-${rowIndex}`}
                    value={formattedEditDate(row.startDate1)}
                    className="fixed-width-input"
                    onChange={(e) =>
                      handleTextFieldChange(e, rowIndex, "startDate1")
                    }
                    inputProps={{ min: new Date().toISOString().split("T")[0] }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="startTime1"
                    size="small"
                    type="time"
                    name={`startTime1-${rowIndex}`}
                    className="fixed-width-input"
                    value={row.startTime1}
                    onChange={(e) =>
                      handleTextFieldChange(e, rowIndex, "startTime1")
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="endDate1"
                    className="fixed-width-input"
                    size="small"
                    type="date"
                    name={`endDate1-${rowIndex}`}
                    value={formattedEditDate(row.endDate1)}
                    onChange={(e) =>
                      handleTextFieldChange(e, rowIndex, "endDate1")
                    }
                    inputProps={{ min: new Date().toISOString().split("T")[0] }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="endTime1"
                    className="fixed-width-input"
                    size="small"
                    type="time"
                    name={`endTime1-${rowIndex}`}
                    value={row.endTime1}
                    onChange={(e) =>
                      handleTextFieldChange(e, rowIndex, "endTime1")
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Select
                    labelId={`userName-label-${rowIndex}`}
                    className="fixed-width-input"
                    size="small"
                    id={`userName-${rowIndex}`}
                    value={row.userName}
                    name={`userName-${rowIndex}`}
                    onChange={(e) =>
                      handleTextFieldChange(e, rowIndex, "userName")
                    }
                  >
                    {userName.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
