import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import axios from "axios";
import { setLoading, setUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import { useDispatch } from "react-redux";
import { USER } from "../../constant";



const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" }); // Single object for form data
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${USER}/login`,
        { email: formData.email, password: formData.password },
        { withCredentials: true }
      );

      // Check if login is successful and navigate accordingly
      if (response.data && response.data.user) {
        dispatch(setUser(response.data.user))
        navigate("/home");
        toast.success("Welcome");
      } else {
        throw new Error("Invalid login response from the server.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Login failed. Please SignUp First.";
      toast.error(errorMessage);
      console.error("Login failed:", error);
    }
    finally {
      dispatch(setLoading(false));
    }

  };


  return (
    <Box
      sx={{
        width: "100vw",
        height: "80vh",

        backgroundSize: { xs: "cover", sm: "80%", md: "100%", lg: "100%", xl: "100%" },
        backgroundRepeat: "no-repeat",

        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "rgba(161, 100, 245,0.4)",

          padding: { xs: "20px", sm: "30px", md: "100px" },
          borderRadius: "8px",
          boxShadow: "0 4px 14px rgba(88, 12, 194,0.9)",
        }}
      >
        <Box
          component="form"

          onSubmit={handleLogin}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "black" }}
          >
            Login
          </Typography>

          <TextField
            label="Email"
            name="email" // Add name to identify the input
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            required
            InputLabelProps={{ style: { color: "black" } }}
            InputProps={{ style: { color: "black", borderColor: "white" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
            }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            required
            InputLabelProps={{ style: { color: "black" } }}
            InputProps={{ style: { color: "black", borderColor: "blue" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              color: "white",
              backgroundColor: "rgb(88, 12, 194)",
              border: "1px solid voilet",
              "&:hover": { backgroundColor: "rgb(88, 12, 194,0.7)" },
            }}
          >
            Login
          </Button>
          <Typography textAlign="center" sx={{ color: "black" }}>
            Don't have an account?{" "}
            <Button
              variant="text"
              onClick={() => navigate("/signup")}
              sx={{ color: "blue", textTransform: "none" }}
            >
              Sign up
            </Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
