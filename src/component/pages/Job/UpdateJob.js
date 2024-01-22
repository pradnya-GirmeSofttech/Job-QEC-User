import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import Dashboard from "../../dashboard/Dashboard";
import { useNavigate, useParams } from "react-router-dom";
import { ProcessTable } from "./ProcessTable";
import { useDispatch, useSelector } from "react-redux";
import { editJob, getSingleJob } from "../../../actions/job";
import { ArrowBack } from "../../../common/BackArrow";
import { formattedEditDate } from "../../../common/formattedDate";
import Loader from "../../loader/Loader";

function UpdateJob() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading } = useSelector((state) => state.job);
  const navigate = useNavigate();
  const [containers, setContainers] = useState([
    {
      processName: "", // Add any initial values you need
      processTableData: [],
    },
  ]);
  const [formData, setFormData] = useState({
    soWo: "",
    prodOrderNo: "",
    woDate: new Date().toISOString().split("T")[0],
    jobName: "",
    poNo: "",
    estimatedtotalCT: "",
    actualtotalCT: "",
    dragNo: "",
    processTable: [...containers],
  });
  const [errors, setErrors] = useState({
    soWo: false,
    prodOrderNo: false,
    jobName: false,
    poNo: false,
    estimatedtotalCT: false,

    dragNo: false,
  });

  const [processTableErrors, setProcessTableErrors] = useState(
    formData?.processTable?.map(() => ({
      process: false,
      description: false,
      machineName: false,
      toolingUsed: false,
      dc: false,
      length: false,
      width: false,
      feed: false,
      estimatedCT: false,
    })) || []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getSingleJob(id));
        setFormData(response.payload);
        setContainers(response.payload.processTable);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      processTable: containers,
    }));
  }, [containers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.processTable.length === 0) {
      alert("At least one row in the process table is required.");
      return;
    }
    const editFormData = {
      formData,
      id,
    };

    dispatch(editJob(editFormData));
    navigate(-1);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false,
      }));
    }
  };

  const calculateTotalCT = () => {
    // Calculate the totalEstimatedCT as you did before
    const totalEstimatedCT = containers.reduce((total, container) => {
      const containerEstimatedCT = container.processTableData.reduce(
        (containerTotal, data) => {
          if (!isNaN(data.estimatedCT)) {
            return containerTotal + data.estimatedCT;
          }
          return containerTotal;
        },
        0
      );
      return total + containerEstimatedCT;
    }, 0);
    console.log("totalEstimatedCT", totalEstimatedCT);
    // Update the formData with the new totalEstimatedCT value
    setFormData((prevData) => ({
      ...prevData,
      actualtotalCT: totalEstimatedCT, // Update the actualtotalCT here
    }));
  };

  const calculateCT = (updatedData) => {
    if (updatedData.idleCode.length === 0) {
      console.log(updatedData.startTime);
      const startDate = new Date(updatedData.startDate);
      const endDate = new Date(updatedData.endDate);
      const startTime = new Date(`1970-01-01T${updatedData.startTime}`);
      const endTime = new Date(`1970-01-01T${updatedData.endTime}`);
      const start =
        startDate.getTime() +
        startTime.getTime() -
        startDate.getTimezoneOffset() * 60 * 1000;
      const end =
        endDate.getTime() +
        endTime.getTime() -
        endDate.getTimezoneOffset() * 60 * 1000;
      const diff = (end - start) / (1000 * 60);
      console.log("diff", diff); // difference in hours
      return diff;
      // updatedData.estimatedCT = diff;
    } else {
      const startDate = new Date(updatedData.startDate);
      const endDate = new Date(updatedData.endDate);
      const startTime = new Date(`1970-01-01T${updatedData.startTime}`);
      const endTime = new Date(`1970-01-01T${updatedData.endTime}`);
      const start =
        startDate.getTime() +
        startTime.getTime() -
        startDate.getTimezoneOffset() * 60 * 1000;
      const end =
        endDate.getTime() +
        endTime.getTime() -
        endDate.getTimezoneOffset() * 60 * 1000;
      const diff1 = (end - start) / (1000 * 60);
      const startDate1 = new Date(updatedData.startDate1);
      const endDate1 = new Date(updatedData.endDate1);
      const startTime1 = new Date(`1970-01-01T${updatedData.startTime1}`);
      const endTime1 = new Date(`1970-01-01T${updatedData.endTime1}`);
      const start1 =
        startDate1.getTime() +
        startTime1.getTime() -
        startDate1.getTimezoneOffset() * 60 * 1000;
      const end1 =
        endDate1.getTime() +
        endTime1.getTime() -
        endDate1.getTimezoneOffset() * 60 * 1000;
      const diff2 = (end1 - start1) / (1000 * 60); // difference in hours
      const diff = diff1 + diff2;
      console.log(diff);
      return diff;
    }
  };

  const handleTextFieldChange = (
    event,
    rowIndex,
    fieldName,
    containerIndex,
    processName
  ) => {
    // Make a copy of the containers state
    setContainers((prevContainers) => {
      return prevContainers.map((element, index1) => {
        if (containerIndex === index1) {
          return {
            ...element,
            processTableData: element.processTableData.map((data, index) => {
              const updatedData = { ...data };
              const prevValue = updatedData[fieldName];
              updatedData[fieldName] = event.target.value;

              if (processName === "Milling" && index === rowIndex) {
                // Create a new object to represent the updated data
                const updatedData = { ...data };

                // Store the previous value
                console.log(fieldName);
                const prevValue = updatedData[fieldName];

                // Update the field with the new value
                updatedData[fieldName] = event.target.value;

                // Update other fields based on the previous value
                if (
                  fieldName === "toolingSize" ||
                  fieldName === "dia" ||
                  fieldName === "width" ||
                  fieldName === "length" ||
                  fieldName === "feed" ||
                  fieldName === "nop" ||
                  fieldName === "fpp" ||
                  fieldName === "mr" ||
                  fieldName === "dc"
                ) {
                  updatedData.toolingSize = event.target.value;
                  updatedData.dia = updatedData.toolingSize * 0.9;

                  updatedData.nop = parseFloat(
                    (updatedData.width / updatedData.dia).toFixed(2)
                  );

                  updatedData.fpp = parseFloat(
                    (updatedData.length / updatedData.feed).toFixed(2)
                  );

                  updatedData.actualCT = parseFloat(
                    (
                      updatedData.nop *
                      updatedData.fpp *
                      (updatedData.mr / updatedData.dc) *
                      1.25
                    ).toFixed(2)
                  );
                  updatedData.estimatedHrs = parseFloat(
                    (updatedData.actualCT / 60).toFixed(2)
                  );
                } else if (
                  fieldName === "startTime" ||
                  fieldName === "endTime" ||
                  fieldName === "startTime1" ||
                  fieldName === "endTime1" ||
                  fieldName === "idleCode" ||
                  fieldName === "estimatedCT"
                ) {
                  const diff = calculateCT(updatedData);
                  updatedData.estimatedCT = diff;
                  // calculateTotal();
                }

                // Update the state with the modified data
                return updatedData;
              } else if (processName === "Boring" && index === rowIndex) {
                // Create a new object to represent the updated data
                const updatedData = { ...data };

                // Store the previous value
                const prevValue = updatedData[fieldName];

                // Update the field with the new value
                updatedData[fieldName] = event.target.value;

                // Update other fields based on the previous value
                if (
                  fieldName === "mr" ||
                  fieldName === "dc" ||
                  fieldName === "length" ||
                  fieldName === "feed" ||
                  fieldName === "rpm"
                ) {
                  updatedData.nop = parseFloat(
                    (updatedData.mr / updatedData.dc).toFixed(2)
                  );

                  updatedData.fpp = parseFloat(
                    updatedData.length /
                      (updatedData.rpm * updatedData.feed).toFixed(2)
                  );
                  updatedData.actualCT = parseFloat(
                    updatedData.nop * updatedData.fpp * (1.25).toFixed(2)
                  );
                } else if (
                  fieldName === "startTime" ||
                  fieldName === "endTime" ||
                  fieldName === "startTime1" ||
                  fieldName === "endTime1" ||
                  fieldName === "idleCode"
                ) {
                  const diff = calculateCT(updatedData);
                  updatedData.estimatedCT = diff;
                }
                // Update the state with the modified data
                return updatedData;
              } else if (processName === "Drilling" && index === rowIndex) {
                // Create a new object to represent the updated data
                const updatedData = { ...data };

                // Store the previous value
                const prevValue = updatedData[fieldName];

                // Update the field with the new value
                updatedData[fieldName] = event.target.value;

                // Update other fields based on the previous value
                if (
                  fieldName === "noh" ||
                  fieldName === "legnth" ||
                  fieldName === "feed"
                ) {
                  updatedData.actualCT = parseFloat(
                    (
                      ((updatedData.length * 1.05) / updatedData.feed) *
                      updatedData.noh
                    ).toFixed(2)
                  );
                  updatedData.estimatedHrs = parseFloat(
                    (updatedData.actualCT / 60).toFixed(2)
                  );
                } else if (
                  fieldName === "startTime" ||
                  fieldName === "endTime" ||
                  fieldName === "startTime1" ||
                  fieldName === "endTime1" ||
                  fieldName === "idleCode"
                ) {
                  const diff = calculateCT(updatedData);
                  updatedData.estimatedCT = diff;
                }

                // Update the state with the modified data
                return updatedData;
              } else if (processName === "Tapping" && index === rowIndex) {
                // Create a new object to represent the updated data
                const updatedData = { ...data };

                // Store the previous value
                const prevValue = updatedData[fieldName];

                // Update the field with the new value
                updatedData[fieldName] = event.target.value;

                // Update other fields based on the previous value
                if (
                  fieldName === "noh" ||
                  fieldName === "legnth" ||
                  fieldName === "rpm"
                ) {
                  updatedData.actualCT = parseFloat(
                    (updatedData.length / (updatedData.rpm * 1.5)) *
                      updatedData.noh *
                      (1.3).toFixed(2)
                  );
                  updatedData.estimatedHrs =
                    parseInt(updatedData.actualCT) / 60;
                } else if (
                  fieldName === "startTime" ||
                  fieldName === "endTime" ||
                  fieldName === "startTime1" ||
                  fieldName === "endTime1" ||
                  fieldName === "idleCode" ||
                  fieldName === "estimatedCT"
                ) {
                  const diff = calculateCT(updatedData);
                  updatedData.estimatedCT = diff;
                  // const total = calculateTotal(updatedData);
                }
                return updatedData;
              }

              return data;
            }),
          };
        }
        return element;
      });
    });

    // ... (rest of your handleTextFieldChange function)
  };

  const handleDropdownChange = (e, containerIndex) => {
    const updatedContainers = [...containers];
    updatedContainers[containerIndex].processName = e.target.value;

    // Update the state with the selected process name
    setContainers(updatedContainers);
  };

  return (
    <Dashboard>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box display={"flex"}>
            <ArrowBack />
            <h2>Update Job</h2>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="spanning table">
              <TableBody>
                <TableRow>
                  <TableCell align="center">SO/Wo No</TableCell>
                  <TableCell align="center">
                    <TextField
                      label="So/Wo No"
                      id="outlined-size-small"
                      size="small"
                      variant="outlined"
                      name="soWo"
                      disabled
                      value={formData?.soWo}
                      onChange={handleChange}
                      error={errors.soWo} // Set error prop based on the error state
                      helperText={errors.soWo ? "This field is required" : ""}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">Prod.Order No</TableCell>
                  <TableCell align="center">
                    <TextField
                      label="Prod.Order No"
                      id="outlined-size-small"
                      size="small"
                      name="prodOrderNo"
                      value={formData?.prodOrderNo}
                      onChange={handleChange}
                      disabled
                      error={errors.prodOrderNo}
                      helperText={
                        errors.prodOrderNo ? "This field is required" : ""
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">WO Date</TableCell>
                  <TableCell align="center">
                    <TextField
                      id="date"
                      label="WO Date"
                      type="date"
                      size="small"
                      variant="outlined"
                      disabled
                      InputLabelProps={{
                        shrink: true,
                      }}
                      //   value={selectedDate.toISOString().split("T")[0]}
                      //   onChange={(e) => handleDateChange(new Date(e.target.value))}
                      name="woDate"
                      value={formattedEditDate(formData?.woDate)}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Job Name</TableCell>
                  <TableCell align="center">
                    <TextField
                      label="Job Name"
                      id="outlined-size-small"
                      size="small"
                      name="jobName"
                      value={formData?.jobName}
                      onChange={handleChange}
                      error={errors.jobName}
                      disabled
                      helperText={
                        errors.jobName ? "This field is required" : ""
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">PO No</TableCell>
                  <TableCell align="center">
                    <TextField
                      label="PO No"
                      id="outlined-size-small"
                      size="small"
                      name="poNo"
                      value={formData?.poNo}
                      onChange={handleChange}
                      error={errors.poNo}
                      disabled
                      helperText={errors.poNo ? "This field is required" : ""}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">Total CT</TableCell>
                  <TableCell align="center">
                    <TextField
                      label="Total CT"
                      id="outlined-size-small"
                      size="small"
                      name="estimatedtotalCT"
                      value={formData?.estimatedtotalCT}
                      onChange={handleChange}
                      error={errors.estimatedtotalCT}
                      disabled
                      helperText={
                        errors.estimatedtotalCT ? "This field is required" : ""
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Drawing No</TableCell>
                  <TableCell align="center">
                    <TextField
                      label="Drag No"
                      id="outlined-size-small"
                      size="small"
                      name="dragNo"
                      value={formData?.dragNo}
                      onChange={handleChange}
                      error={errors.dragNo}
                      helperText={errors.dragNo ? "This field is required" : ""}
                      disabled
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {containers?.map((container, containerIndex) => (
            <TableContainer
              key={containerIndex}
              component={Paper}
              sx={{ marginTop: 3 }}
            >
              <TableRow
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <TableCell>{containerIndex + 1}</TableCell>
                  <TableCell>
                    <Select
                      value={container.processName}
                      label="processName"
                      className="input"
                      size="small"
                      onChange={(e) => handleDropdownChange(e, containerIndex)}
                      selectedProcessName={container.processName}
                      disabled
                    >
                      <MenuItem value="Milling">MILLING</MenuItem>
                      <MenuItem value="Boring">BORING</MenuItem>
                      <MenuItem value="Drilling">DRILLING</MenuItem>
                      <MenuItem value="Tapping">TAPPING</MenuItem>
                    </Select>
                  </TableCell>
                </div>
              </TableRow>
              {/* Add ProcessTable component with appropriate props */}
              <ProcessTable
                key={containerIndex}
                data={container.processTableData}
                handleTextFieldChange={handleTextFieldChange}
                processTableErrors={processTableErrors}
                containerIndex={containerIndex}
                selectedProcessName={container.processName}
                // ... other props you may need
              />
            </TableContainer>
          ))}

          <Box display={"flex"} marginTop={5}>
            <div>
              <Button
                color="primary"
                sx={{
                  backgroundColor: "#1d5393",
                  color: "#fff",
                  marginRight: "10px",
                }}
                onClick={handleSubmit}
              >
                Update
              </Button>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <Button
                color="primary"
                sx={{
                  backgroundColor: "#1d5393",
                  color: "#fff",
                  marginRight: 2,
                }}
                onClick={calculateTotalCT}
              >
                CalculateTotal CT
              </Button>
              <TextField
                label="Actual Total CT"
                id="outlined-size-small"
                size="small"
                name="actualtotalCT"
                disabled
                value={formData?.actualtotalCT}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </Box>
        </>
      )}
    </Dashboard>
  );
}

export default UpdateJob;
