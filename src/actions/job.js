import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/api";
import { url } from "../utils/api";

export const createJob = createAsyncThunk(
  "jobs/createJob",
  async ({
    soWo,
    prodOrderNo,
    woDate,
    jobName,
    poNo,
    estimatedtotalCT,
    actualtotalCT,
    dragNo,
    processTable,
  }) => {
    try {
      const response = await axios.post(`${url}/createjob`, {
        soWo,
        prodOrderNo,
        woDate,
        jobName,
        poNo,
        estimatedtotalCT,
        actualtotalCT,
        dragNo,
        processTable,
      });
      console.log("res", response.data);

      const job = response.data.jobs;

      return job;
    } catch (err) {
      console.error("Error", err.response.data);
      return err.response.data;
    }
  }
);

export const getAllJob = createAsyncThunk("jobs/getAllJob", async () => {
  try {
    const response = await axios.get(`${url}/jobs`);
    const job = response.data.jobs;

    return job;
  } catch (err) {
    console.error("Error", err.response.data);
    return err.response.data;
  }
});

export const getSingleJob = createAsyncThunk(
  "jobs/getSingleJob",
  async (id) => {
    try {
      const response = await axios.get(`${url}/viewjob/${id}`);
      const job = response.data.job;

      return job;
    } catch (err) {
      console.error("Error", err.response.data);
      return err.response.data;
    }
  }
);

export const deleteJob = createAsyncThunk("jobs/deleteJob", async (id) => {
  try {
    const response = await axios.delete(`${url}/deletejob/${id}`);
    console.log("res", response.data);
    return id;
  } catch (err) {
    console.error("Error", err.response.data);
    return err.response.data;
  }
});

export const editJob = createAsyncThunk(
  "jobs/editJob",
  async (editFormData) => {
    try {
      const response = await axios.put(
        `${url}/updatejob/${editFormData.id}`,
        editFormData.formData
      );
      console.log("res", response.data);

      const payload = {
        data: editFormData.formData,
        id: editFormData.id,
      };

      return payload;
    } catch (err) {
      console.error("Error", err.response.data);
      return err.response.data;
    }
  }
);

export const generatePDF = createAsyncThunk("jobs/generatePDF", (id) => {
  try {
    axios
      .get(`${url}/generatePdf/${id}`, {
        responseType: "blob",
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "job.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
      });
  } catch (err) {
    console.error("Error", err.response.data);
    return err.response.data;
  }
});
