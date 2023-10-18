import React, { useEffect, useState } from "react";
import Dashboard from "../../dashboard/Dashboard";
import {
  Box,
  Button,
  Container,
  Typography,
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
  Modal,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  deleteJob,
  generatePDF,
  getAllJob,
  getSingleJob,
} from "../../../actions/job";
import { useDispatch, useSelector } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function Job() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.job.jobs);
  console.log(jobs);
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

  const token = localStorage.getItem("authToken");
  useEffect(() => {
    if (token && isAuthenticated) {
      // Only dispatch getAllJob if jobs data is not already in the Redux store
      dispatch(getAllJob(token));
    }
  }, [dispatch, token, isAuthenticated]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Update the search query state
  };

  // const downloadPDF = (id) => {
  //   dispatch(generatePDF(id));
  //   console.log("id", id);
  // };

  // Filter jobs based on job name or SO/WO number
  const filteredJobs = jobs?.filter((job) => {
    const jobNameMatch = job?.jobName?.toLowerCase().includes(searchQuery);
    const soWoMatch = job?.soWo.toString().includes(searchQuery);
    return jobNameMatch || soWoMatch;
  });

  return (
    <Dashboard>
      <Box>
        <Container sx={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Jobs</h3>
          <Box>
            <TextField
              label="Search"
              id="outlined-size-small"
              size="small"
              onChange={handleSearch}
            />
          </Box>
        </Container>
        <TableContainer component={Paper} sx={{ marginTop: 5 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>SO/WO No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Total CT</TableCell>
                <TableCell>Actual CT</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredJobs?.slice(startIndex, endIndex).map((job) => (
                <TableRow key={job._id}>
                  <TableCell>{job.soWo}</TableCell>
                  <TableCell>{job.jobName}</TableCell>
                  <TableCell>{job.estimatedtotalCT}</TableCell>
                  <TableCell>{job.actualtotalCT}</TableCell>

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
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={jobs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Dashboard>
  );
}

export default Job;
