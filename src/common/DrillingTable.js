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
} from "@mui/material";
import "../component/pages/Job/ProcessTable.css";
import { formattedEditDate } from "../component/pages/Job/formattedDate";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  idleCode,
  machineData,
  processList,
  toolList,
  userName,
} from "../component/pages/Job/Data";

function DrillingTable({
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

            <TableCell align="center">DIA</TableCell>
            <TableCell align="center">RPM</TableCell>
            <TableCell align="center">Feed(MM/MIN)</TableCell>
            <TableCell align="center">Length</TableCell>

            <TableCell align="center">NOH</TableCell>

            {/* <TableCell align="center">EST.HRS</TableCell> */}

            <TableCell align="center">Estimated CT(min)</TableCell>
            <TableCell align="center">Start Date</TableCell>
            <TableCell align="center">Start Time</TableCell>
            <TableCell align="center">End Date</TableCell>
            <TableCell align="center">End Time</TableCell>
            <TableCell align="center">Ideal Code</TableCell>
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
                        ? "#78cc9f"
                        : "#c34266"
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
                        "Drilling"
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
                        "Drilling"
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
                        "Drilling"
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
                    value={row.toolingUsed}
                    disabled
                    name={`toolingUsed-${rowIndex}`}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "toolingUsed",
                        containerIndex,
                        "Drilling"
                      )
                    }
                    error={processTableErrors[rowIndex]?.toolingUsed}
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
                    label="dia"
                    className="fixed-width-input"
                    size="small"
                    name={`dia-${rowIndex}`}
                    value={row.dia}
                    disabled
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "dia",
                        containerIndex,
                        "Drilling"
                      )
                    }
                    error={processTableErrors[rowIndex]?.dia}
                    helperText={
                      processTableErrors[rowIndex]?.dia
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
                        "Drilling"
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
                        "Drilling"
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
                    value={row.length}
                    disabled
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "length",
                        containerIndex,
                        "Drilling"
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
                    label="noh"
                    className="fixed-width-input"
                    size="small"
                    name={`noh-${rowIndex}`}
                    value={row.noh}
                    disabled
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "noh",
                        containerIndex,
                        "Drilling"
                      )
                    }
                    error={processTableErrors[rowIndex]?.noh}
                    helperText={
                      processTableErrors[rowIndex]?.noh
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
                        "Drilling"
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
                        "Drilling"
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
                        "Drilling"
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
                        "Drilling"
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
                        "Drilling"
                      )
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Select
                    labelId={`idleCode-label-${rowIndex}`}
                    size="small"
                    id={`idleCode-${rowIndex}`}
                    value={row.idleCode || []}
                    name={`idleCode-${rowIndex}`}
                    className="fixed-width-input"
                    multiple
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "idleCode",
                        containerIndex,
                        "Drilling"
                      )
                    }
                    // input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) =>
                      selected.length > 0 ? selected.join(", ") : ""
                    }
                    // MenuProps={MenuProps}
                    error={processTableErrors[rowIndex]?.idleCode}
                  >
                    {idleCode.map((name) => (
                      <MenuItem key={name.no} value={name.no}>
                        <Checkbox
                          checked={
                            row.idleCode && row.idleCode.indexOf(name.no) > -1
                          }
                        />
                        <ListItemText primary={name.name} />
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText
                    error={processTableErrors[rowIndex]?.idleCode}
                  >
                    {processTableErrors[rowIndex]?.idleCode
                      ? "This field is required"
                      : ""}
                  </FormHelperText>
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
                        "Drilling"
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
                        "Drilling"
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
                        "Drilling"
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
                        "Drilling"
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
                        "Drilling"
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
                  <Select
                    labelId={`userName-label-${rowIndex}`}
                    className="fixed-width-input"
                    size="small"
                    id={`userName-${rowIndex}`}
                    value={row.userName}
                    name={`userName-${rowIndex}`}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "userName",
                        containerIndex,
                        "Drilling"
                      )
                    }
                  >
                    {userName.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
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
                        "Drilling"
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

export default DrillingTable;
