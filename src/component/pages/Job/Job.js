import React, { useEffect, useState } from "react";
import Dashboard from "../../dashboard/Dashboard";
import {
  Box,
  Button,
  Container,
  TextField,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  IconButton,
  Menu,
  MenuItem,
  TableRow,
  TablePagination,
  InputBase,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteJob, generatePDF, getAllJob } from "../../../actions/job";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Loader from "../../loader/Loader";
import ClearIcon from "@mui/icons-material/Clear";

function Job() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.job);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null); // Anchor element for the menu
  const [openMenuId, setOpenMenuId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Function to handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0); // Reset page to the first page when rows per page changes
  };
  // Calculate the start and end indices for the current page
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleMenuOpen = (event, jobId) => {
    setAnchorEl(event.currentTarget); // Set the anchor element to the clicked IconButton
    setOpenMenuId(jobId); // Set the ID of the open menu to the clicked job's ID
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu by clearing the anchor element
    setOpenMenuId(null); // Clear the open menu ID
  };

  const handleView = (id) => {
    navigation(`/dashboard/job/viewjob/${id}`);
  };

  const handleEdit = (id) => {
    navigation(`/dashboard/job/updatejob/${id}`);
  };

  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleClose = () => {
    setSelectedId(null);
    setOpen(false);
  };

  const handleDelete = () => {
    if (selectedId) {
      // Check if a job ID is selected
      dispatch(deleteJob(selectedId)); // Dispatch the delete action with the selected job ID
      handleClose(); // Close the modal after deletion
    }
  };
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    // Only dispatch getAllJob if jobs data is not already in the Redux store
    dispatch(getAllJob());
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Update the search query state
  };

  const downloadPDF = (id) => {
    dispatch(generatePDF(id));
    console.log("id", id);
  };

  const handleClearSearch = () => {
    setSearchQuery(""); // Clear the searchQuery state
  };
  // Filter jobs based on job name or SO/WO number
  const filteredJobs = jobs
    ? jobs?.filter((job) => {
        // Check if the job object and its properties are defined
        if (job && job.jobName && job.soWo) {
          const jobNameMatch = job.jobName
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          const soWoMatch = job.soWo.toString().includes(searchQuery);
          return jobNameMatch || soWoMatch;
        }
        // Handle cases where job or its properties are undefined
        return false;
      })
    : [];

  const sortedJobs = [...filteredJobs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const noJobsAvailable = filteredJobs.length === 0;

  return (
    <Dashboard>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          <Container sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" gutterBottom>
              Jobs
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Paper
                component="form"
                sx={{
                  display: "flex",
                  height: "70%",
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search SO/WO NO or Job Name"
                  inputProps={{ "aria-label": "search google maps" }}
                  onChange={handleSearch}
                  value={searchQuery}
                  size="small"
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={handleClearSearch}
                >
                  <ClearIcon />
                </IconButton>
              </Paper>
            </Box>
          </Container>
          {noJobsAvailable ? (
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 2, // Add padding to create a card-like appearance
                boxShadow: 2,
                marginTop: 20, // Add a shadow for a raised effect
              }}
            >
              <Typography variant="body1">No jobs available</Typography>
            </Paper>
          ) : (
            <>
              <TableContainer component={Paper} sx={{ marginTop: 5 }}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#1D5393" }}>
                      <TableCell sx={{ color: "#fff" }}>SO/WO No</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Name</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Estimated CT</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Actual CT</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedJobs?.slice(startIndex, endIndex).map((job) => (
                      <TableRow
                        key={job._id}
                        style={{
                          color: "#fff",

                          backgroundColor:
                            job.estimatedtotalCT >= job?.actualtotalCT ||
                            job.estimatedtotalCT >= job?.actualtotalCT
                              ? "#a7f3d0"
                              : "#FE8A96",
                        }}
                      >
                        <TableCell>{job.soWo}</TableCell>
                        <TableCell>{job.jobName}</TableCell>
                        <TableCell>{job.estimatedtotalCT}</TableCell>
                        <TableCell>{job?.actualtotalCT}</TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="more"
                            aria-controls={`job-options-${job._id}`}
                            aria-haspopup="true"
                            onClick={(event) => handleMenuOpen(event, job._id)}
                          >
                            <MoreHorizIcon />
                          </IconButton>
                          <Menu
                            id={`job-options-${job._id}`}
                            anchorEl={anchorEl}
                            open={openMenuId === job._id}
                            onClose={handleMenuClose}
                          >
                            <MenuItem onClick={() => handleEdit(job._id)}>
                              Edit
                            </MenuItem>
                            <MenuItem onClick={() => handleView(job._id)}>
                              View
                            </MenuItem>

                            <MenuItem onClick={() => downloadPDF(job._id)}>
                              Download PDF
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {!searchQuery && (
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  component="div"
                  count={jobs.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              )}
            </>
          )}
        </Box>
      )}
    </Dashboard>
  );
}

export default Job;
