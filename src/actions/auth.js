import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../utils/api";

// Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password, role }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await api.post(
        `/register`,
        {
          name,
          email,
          password,
          role,
        },
        config
      );

      const user = response.data;
      localStorage.setItem("authToken", user.token);

      return user;
    } catch (err) {
      console.error("Error", err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

// Create an async thunk for logging in a user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });

      // Assuming your API returns a token on successful login
      const token = response.data.token;
      const userData = response.data.user;
      // Save the token to local storage
      localStorage.setItem("Job_Qec_User", token);

      return { success: true, token: token, user: userData };
    } catch (error) {
      // Handle login failure
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      return {
        success: false,
        error: error.response ? error.response.data : error.message,
      };
    }
  }
);

// Logout user
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.get(`/logout`);
      localStorage.removeItem("Job_Qec_User");
      return null;
    } catch (error) {
      console.error("Logout error:", error);

      return rejectWithValue(error.response.data);
    }
  }
);

// Registration of new user
// export const loginNewUser = createAsyncThunk(
//   "auth/loginNewUser",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const config = { headers: { "Content-Type": "application/json" } };
//       const response = await api.post(
//         `/login`,
//         {
//           email,
//           password,
//         },
//         config
//       );

//       const user = response.data;
//       localStorage.setItem("authToken", user.token);

//       return user;
//     } catch (err) {
//       console.error("Error", err.response.data);
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// Delete user
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await api.delete(`/deleteuser/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get user with user roles
export const fetchUsersWithUserRole = createAsyncThunk(
  "auth/fetchUsersWithUserRole",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`/users`); // Adjust the API endpoint as needed
      if (!response.ok) {
        throw new Error("Request failed");
      }
      console.log("response", response);
      // Parse the JSON response
      const data = await response.json();
      return data.users;
    } catch (error) {
      // If an error occurs during the request, reject the promise with an error message
      return rejectWithValue("Failed to fetch user data");
    }
  }
);

// Edit user
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ editedUser }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/edituser/${editedUser.id}`, editedUser);
      // Log the response
      return response.data; // Return updated user data if successful
    } catch (error) {
      console.error("API Error:", error); // Log the error
      // Handle the error properly and return an error object
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: "An error occurred." });
      }
    }
  }
);
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ oldPassword, newPassword }) => {
    try {
      const headers = {
        Authorization: ` ${token}`, // Include the token in the "Authorization" header
      };
      const response = await api.put(
        `/updatepassword`,
        {
          oldPassword,
          newPassword,
        },
        { headers }
      );
      return response.data; // Return a success message or updated user data
    } catch (error) {
      console.error("API Error:", error);
      throw error; // Make sure to throw the error to be handled in the rejected case
    }
  }
);

// Profile of user
export const userProfile = createAsyncThunk("auth/userProfile", async () => {
  try {
    const response = await api.get(`/me`);

    console.log("response", response);
    const user = response.data;

    return user;
  } catch (err) {
    // Handle any errors, if necessary
    console.error("Error", err.response.data);
    throw err;
  }
});
