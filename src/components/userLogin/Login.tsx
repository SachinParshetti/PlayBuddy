import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Button, FormControl, CardContent,Box } from "@mui/material";
import TextField from '@mui/material/TextField'
import * as yup from "yup"
import { Formik } from "formik"
import axios from 'axios'
import { Field } from "formik";
import { Form } from "formik";
import {toast} from "react-toastify"
import { Link } from "react-router-dom"
import LoginIcon from '@mui/icons-material/Login';


const UserLogin = () => {
  const navigate = useNavigate()
  const { loginWithRedirect } = useAuth0();
  const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  async function handleLogin(values: {username: string, password: string}) {
    try {
      console.log(values)
      const res = await axios.post("http://localhost:4000/users/login", values)
      
      if(res.status===200 && res.data.token) {
        localStorage.setItem("token", res.data.token)
         localStorage.setItem("LoginType","manual")
        toast.success("Login successful")
        navigate("/user-dashboard")
      } else {
        toast.error("Invalid credentials")
        navigate("/user")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Something went wrong. Please try again.")
      navigate("/user")
    }
  }

  return (
    <>
      

        <div className="h-screen w-screen p-4 bg-gradient-to-r from-[#DFF6FF] to-[#E4F9FF] bg-hero-gradient">
                  <header className="sticky top-0 w-full flex justify-between items-center p-2 text-white border rounded-lg font-inter shadow-lg">
                            <div>
                                <div className='text-3xl font-bold '>
                                    <Link to="/">
                                        <img src="/images/brand-logo.png" alt="logo" className="h-15" />
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <Link to="/user-register">
                                    <button className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-1 px-4 rounded-full overflow-hidden group">
                                        <span className="absolute inset-0 bg-gradient-to-r from-pink-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                        <span className="relative"> <LoginIcon/> </span>
                                        <span className="relative">Sign In</span>
                                    </button>
                                </Link>
                            </div>
             </header>
     <Card
        variant="outlined"
        className="max-w-md mx-auto mt-10 p-4 rounded-lg shadow-2xl open"
         sx={{borderRadius:3}}
      >
        <Typography variant="h4" className="text-center mb-4 font-poppins">
          User Login
        </Typography>
       
        <CardContent>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="my-2">
                  <FormControl fullWidth>
                    <Field
                      as={TextField}
                      label="User ID"
                      variant="outlined"
                      name="username"
                      autoFocus
                      className="mb-3"
                      error={touched.username && !!errors.username}
                      helperText={touched.username && errors.username}
                    />
                  </FormControl>
                </div>

                <div className="my-3">
                  <FormControl fullWidth>
                    <Field
                      as={TextField}
                      label="Password"
                      variant="outlined"
                      name="password"
                      type="password"
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                    />
                  </FormControl>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition w-full my-4"
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-500">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="justify-center items-center mt-6">
            {/* Google Login Button */}
            <button
              onClick={() => loginWithRedirect({ connection: "google-oauth2" } as any)}
              className="flex items-center gap-2 justify-center bg-white border border-gray-300 text-gray-700 px-5 py-2 my-4 rounded-lg shadow-md hover:shadow-lg transition w-full"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="font-medium">Sign in with Google</span>
            </button>
          </div>

           <div className="flex justify-center items-center mt-4">
               
            <Link to="/user-register" className="text-blue-700 mx-2">New User Register?</Link>
                  
           </div>

        </CardContent>
      </Card>
                </div>
        
    </>
  );
};

export default UserLogin;
