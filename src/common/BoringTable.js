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
  FormHelperText,
  Checkbox,
  ListItemText,
  Autocomplete,
} from "@mui/material";
import "../component/pages/Job/ProcessTable.css";

import { idleCode, machineData, processList, toolListBoring, userName } from "./Data";
import { formattedEditDate } from "./formattedDate";

function BoringTable({
  processTableData,
  handleTextFieldChange,
  processTableErrors,
  containerIndex,
}) {
  return (
    <>
      <Table sx={{ minWidth: 2800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Sr.No</TableCell>

            <TableCell align="center">Process</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Machine Name</TableCell>
            <TableCell align="center">Tooling Used</TableCell>
            <TableCell align="center">Tooling Size</TableCell>
            <TableCell align="center">RPM</TableCell>
            <TableCell align="center">Feed(MM/REV)</TableCell>
            <TableCell align="center">Length</TableCell>

            <TableCell align="center">DC</TableCell>
            <TableCell align="center">MR</TableCell>
            <TableCell align="center">NOP</TableCell>
            <TableCell align="center">FPP</TableCell>

            <TableCell align="center">Estimated CT(min)</TableCell>

            <TableCell align="center">Start Date</TableCell>
            <TableCell align="center">Start Time</TableCell>
            <TableCell align="center">End Date</TableCell>
            <TableCell align="center">End Time</TableCell>
            <TableCell align="center">Idle Code</TableCell>
            <TableCell align="center">Start Date</TableCell>
            <TableCell align="center">Start Time</TableCell>
            <TableCell align="center">End Date</TableCell>
            <TableCell align="center">End Time</TableCell>
            <TableCell align="center">Actual CT(min)</TableCell>
            <TableCell align="center">User Name</TableCell>
            <TableCell align="center">Remark</TableCell>
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
                    !isNaN(row.estimatedCT) && row.estimatedCT !== 0
                      ? row.actualCT >= row.estimatedCT
                        ? "#a7f3d0"
                        : "#FE8A96"
                      : "inherit",
                }}
              >
                <TableCell align="center">{rowIndex + 1}</TableCell>

                <TableCell align="center">
                  <Select
                    labelId={`process-label-${rowIndex}`}
                    size="small"
                    id={`process-${rowIndex}`}
                    value={row.process}
                    name={`process-${rowIndex}`}
                    className="input"
                    disabled
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "process",
                        containerIndex,
                        "Boring"
                      )
                    }
                    error={processTableErrors[rowIndex]?.process}
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
                    className="input"
                    size="small"
                    name={`description-${rowIndex}`}
                    value={row.description}
                    disabled
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "description",
                        containerIndex,
                        "Boring"
                      )
                    }
                    error={processTableErrors[rowIndex]?.description}
                    helperText={
                      processTableErrors[rowIndex]?.description
                        ? "This field is required"
                        : ""
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <Select
                    labelId={`machineName-label-${rowIndex}`}
                    className="input"
                    size="small"
                    id={`machineName-${rowIndex}`}
                    value={row.machineName}
                    name={`machineName-${rowIndex}`}
                    disabled
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "machineName",
                        containerIndex,
                        "Boring"
                      )
                    }
                    error={processTableErrors[rowIndex]?.machineName}
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
                    className="input"
                    size="small"
                    id={`toolingUsed-${rowIndex}`}
                    value={row.toolingUsed} // Ensure that value is an array
                    // Enable multiple selection
                    name={`toolingUsed-${rowIndex}`}
                    disabled
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "toolingUsed",
                        containerIndex,
                        "Boring"
                      )
                    }
                    error={processTableErrors[rowIndex]?.toolingUsed}
                  >
                    {toolListBoring.map((name) => (
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
                    label="toolingSize"
                    className="fixed-width-input"
                    size="small"
                    name={`toolingSize-${rowIndex}`}
                    value={row.toolingSize}
                    disabled
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "toolingSize",
                        containerIndex,
                        "Boring"
                      )
                    }
                    error={processTableErrors[rowIndex]?.toolingSize}
                    helperText={
                      processTableErrors[rowIndex]?.toolingSize
                        ? "This field is required"
                        : ""
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="rpm"
                    className="fixed-width-input"
                    size="small"
                    name={`rpm-${rowIndex}`}
                    value={row.rpm}
                    disabled
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "rpm",
                        containerIndex,
                        "Boring"
                      )
                    }
                    error={processTableErrors[rowIndex]?.rpm}
                    helperText={
                      processTableErrors[rowIndex]?.rpm
                        ? "This field is required"
                        : ""
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="feed"
                    className="fixed-width-input"
                    size="small"
                    name={`feed-${rowIndex}`}
                    value={row.feed}
                    disabled
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "feed",
                        containerIndex,
                        "Boring"
                      )
                    }
                    error={processTableErrors[rowIndex]?.feed}
                    helperText={
                      processTableErrors[rowIndex]?.feed
                        ? "This field is required"
                        : ""
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="length"
                    className="fixed-width-input"
                    size="small"
                    name={`length-${rowIndex}`}
                    disabled
                    value={row.length}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "length",
                        containerIndex,
                        "Boring"
                      )
                    }
                    error={processTableErrors[rowIndex]?.length}
                    helperText={
                      processTableErrors[rowIndex]?.length
                        ? "This field is required"
                        : ""
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="dc"
                    className="fixed-width-input"
                    size="small"
                    name={`dc-${rowIndex}`}
                    value={row.dc}
                    disabled
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "dc",
                        containerIndex,
                        "Boring"
                      )
                    }
                    error={processTableErrors[rowIndex]?.dc}
                    helperText={
                      processTableErrors[rowIndex]?.dc
                        ? "This field is required"
                        : ""
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="mr"
                    className="fixed-width-input"
                    size="small"
                    name={`mr-${rowIndex}`}
                    value={row.mr}
                    disabled
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "mr",
                        containerIndex,
                        "Boring"
                      )
                    }
                    error={processTableErrors[rowIndex]?.mr}
                    helperText={
                      processTableErrors[rowIndex]?.mr
                        ? "This field is required"
                        : ""
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="nop"
                    className="fixed-width-input"
                    size="small"
                    name={`nop-${rowIndex}`}
                    value={row.nop}
                    disabled
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "nop",
                        containerIndex,
                        "Boring"
                      )
                    }
                    error={processTableErrors[rowIndex]?.nop}
                    helperText={
                      processTableErrors[rowIndex]?.nop
                        ? "This field is required"
                        : ""
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="fpp"
                    className="fixed-width-input"
                    size="small"
                    name={`fpp-${rowIndex}`}
                    disabled
                    value={row.fpp}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "fpp",
                        containerIndex,
                        "Boring"
                      )
                    }
                    error={processTableErrors[rowIndex]?.fpp}
                    helperText={
                      processTableErrors[rowIndex]?.fpp
                        ? "This field is required"
                        : ""
                    }
                  />
                </TableCell>

                <TableCell align="center">
                  <TextField
                    label="EstimatedCT"
                    className="fixed-width-input"
                    size="small"
                    name={`actualCT-${rowIndex}`}
                    value={row.actualCT}
                    disabled
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "actualCT",
                        containerIndex,
                        "Boring"
                      )
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="startDate"
                    className="fixed-width-input"
                    size="small"
                    type="date"
                    name={`startDate-${rowIndex}`}
                    value={formattedEditDate(row.startDate)}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "startDate",
                        containerIndex,
                        "Boring"
                      )
                    }
                    inputProps={{
                      min: new Date().toISOString().split("T")[0],
                    }}
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
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "startTime",
                        containerIndex,
                        "Boring"
                      )
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
                    value={formattedEditDate(row.endDate)}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "endDate",
                        containerIndex,
                        "Boring"
                      )
                    }
                    inputProps={{
                      min: new Date().toISOString().split("T")[0],
                    }}
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
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "endTime",
                        containerIndex,
                        "Boring"
                      )
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Autocomplete
                    disablePortal
                    id={`idleCode-${rowIndex}`}
                    options={idleCode}
                    getOptionLabel={(option) => option.name}
                    value={row.idleCode}
                    className="input"
                    multiple
                    onChange={(e, newValue) =>
                      handleTextFieldChange(
                        { target: { value: newValue } },
                        rowIndex,
                        "idleCode",
                        containerIndex,
                        "Boring"
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="idleCode"
                        size="small"
                        name={`idleCode-${rowIndex}`}
                        className="input"
                      />
                    )}
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
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "startDate1",
                        containerIndex,
                        "Boring"
                      )
                    }
                    inputProps={{
                      min: new Date().toISOString().split("T")[0],
                    }}
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
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "startTime1",
                        containerIndex,
                        "Boring"
                      )
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
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "endDate1",
                        containerIndex,
                        "Boring"
                      )
                    }
                    inputProps={{
                      min: new Date().toISOString().split("T")[0],
                    }}
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
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "endTime1",
                        containerIndex,
                        "Boring"
                      )
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="ActualCT"
                    className="fixed-width-input"
                    size="small"
                    name={`estimatedCT-${rowIndex}`}
                    value={row.estimatedCT}
                    disabled
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "estimatedCT",
                        containerIndex,
                        "Boring"
                      )
                    }
                    error={processTableErrors[rowIndex]?.estimatedCT}
                    helperText={
                      processTableErrors[rowIndex]?.estimatedCT
                        ? "This field is required"
                        : ""
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <Autocomplete
                    disablePortal
                    id={`userName-${rowIndex}`}
                    options={userName}
                    getOptionLabel={(option) => option}
                    value={row.userName}
                    className="input"
                    onChange={(e, newValue) =>
                      handleTextFieldChange(
                        { target: { value: newValue } },
                        rowIndex,
                        "userName",
                        containerIndex,
                        "Boring"
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="UserName"
                        size="small"
                        name={`userName-${rowIndex}`}
                        className="input"
                      />
                    )}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    id="outlined-textarea"
                    label="Remark"
                    className="input"
                    size="small"
                    name={`remark-${rowIndex}`}
                    value={row.remark}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "remark",
                        containerIndex,
                        "Boring"
                      )
                    }
                    placeholder="Enter Remark"
                    multiline
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}

export default BoringTable;
