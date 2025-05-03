import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"
import { USER } from "../../constant";

const SignUp = () => {
  const [input, setInput] = useState({
    fullname: "",
    country: "",
    email: "",
    password: "",


  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER}/signup`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } 
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth="xs"
        sx={{
          backgroundColor: "rgba(161, 100, 245,0.4)",

          padding: { xs: "20px", sm: "30px", md: "100px" },
          borderRadius: "8px",
          boxShadow: "0 4px 14px rgba(88, 12, 194,0.9)",
        }}


      >
        <Box
          component="form"
          onSubmit={submitHandler}
          sx={{

            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h4" textAlign="center" fontWeight="bold"  >
            Sign Up
          </Typography>

          <TextField
            label="fullname"
            name="fullname"
            fullWidth
            value={input.fullname}
            onChange={changeEventHandler}
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
            label="country"
            name="country"
            fullWidth
            value={input.country}
            onChange={changeEventHandler}
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
            label="email"
            name="email"
            type="email"
            fullWidth
            value={input.email}
            onChange={changeEventHandler}
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
            label="password"
            name="password"
            type="password"
            fullWidth
            value={input.password}
            onChange={changeEventHandler}
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

          <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "rgb(88, 12, 194)", fontWeight: "bold" }} >
              SignUp
            </Button>
            <Typography>
              Already have an account?{" "}
              <Link to="/" style={{ color: "#1976d2", fontWeight: "bold" }}>
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;
