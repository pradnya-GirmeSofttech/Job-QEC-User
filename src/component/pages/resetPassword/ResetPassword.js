import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Divider,
  Typography,
  Button,
  Toolbar,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import logo from "../../../utils/logo.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { changePassword } from "../../../actions/auth";
import { logout } from "../../../actions/auth";
import { Link } from "react-router-dom";
function ResetPassword() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [passwordReset, setPasswordReset] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showPassword: false,
  });

  const handleChangePasswordNow = () => {
    setPasswordReset(true);
  };

  const handleResetPasswordLater = () => {
    setPasswordReset(false);
    //    dispatch(setResetPasswordFlag());
    navigate("/dashboard");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if new password matches the confirmation password
    if (formData.newPassword !== formData.confirmPassword) {
      console.error("New password and confirmation password do not match.");
      return;
    }

    // Dispatch the changePassword action with the form data
    dispatch(
      changePassword({
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      })
    );
    console.log("pass", formData.currentPassword, formData.newPassword);
    navigate("/dashboard");
  };

  const handleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const logoutHandler = () => {
    dispatch(logout());
    // alert.success("Logged out successfully.");
  };
  return (
    <>
      <Toolbar sx={{ margin: 3 }}>
        <img src={logo} alt="logo" className="logo" />
      </Toolbar>

      <Divider />
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography m={3}>
          You have the option to change your password now or reset it later.
        </Typography>
        <Grid container spacing={2} m={5}>
          {/* Use Grid container */}
          <Grid item xs={6}>
            {/* Adjust the xs size as needed */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleChangePasswordNow}
              fullWidth
            >
              Change Now
            </Button>
          </Grid>
          <Grid item xs={6}>
            {" "}
            {/* Adjust the xs size as needed */}
            <Button
              variant="outlined"
              color="primary"
              onClick={handleResetPasswordLater}
              fullWidth
            >
              Reset Later
            </Button>
          </Grid>
        </Grid>
        {passwordReset && (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Current Password"
              variant="outlined"
              fullWidth
              margin="normal"
              name="currentPassword"
              type={formData.showPassword ? "text" : "password"}
              value={formData.currentPassword}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                    >
                      {formData.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="New Password"
              variant="outlined"
              fullWidth
              margin="normal"
              name="newPassword"
              type={formData.showPassword ? "text" : "password"}
              value={formData.newPassword}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                    >
                      {formData.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              margin="normal"
              name="confirmPassword"
              type={formData.showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                    >
                      {formData.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Change Password
            </Button>
          </form>
        )}
      </Container>
    </>
  );
}

export default ResetPassword;
