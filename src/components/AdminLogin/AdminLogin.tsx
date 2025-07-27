import React from "react";
import { Link } from "react-router-dom"
import { Card, Typography, Button, FormControl, CardContent, Box } from "@mui/material";
import TextField from '@mui/material/TextField'
import * as yup from "yup";
import { Formik } from "formik";
import axios from 'axios';
import { Field } from "formik";
import { Form } from "formik";
import { toast } from "react-toastify";
import { Login, Password } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const BASE_URL = import.meta.env.VITE_BASE_URL;
function AdminLogin() {
    
    const validationSchema = yup.object({
        admin_id: yup.string().required("Admin Id is required"),
        admin_password: yup.string().required("Password is required").matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{6,}$/, "password much match (ex.Example@123) this format")

    })

    const navigate = useNavigate()
    function handleLogin(
      values: { admin_id: string, admin_password: string },
      { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) {
           axios.post(`${BASE_URL}/admin/login`,values)
           .then((res)=>{
              
                  if(res.status === 200 && res.data.token)
             {
                localStorage.setItem("admin-Token",res.data.token);
                toast.success("Successfully logged in ")
                navigate("/admin-dashboard")
             }
             else
             {
                toast.error("Failed to login");
                navigate("/")
             }
              
             
           })
           . catch((error)=>{
             
                console.log("Login Error",error);
                toast.error("Somthing went wrong")
                navigate("/admin")
              
           })
          .finally(()=>{
              setSubmitting(false);
            
          })
          
             
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
                        <Link to="/">
                            <button className="relative bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-semibold py-2 px-5 rounded-full bg-[length:200%_auto] overflow-hidden group " >
                                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                              
                                <span className="relative">Home</span>
                                
                            </button>
                        </Link>
                    </div>
                </header>
                   <Card
                    variant="outlined"
                    className="max-w-md mx-auto mt-20 ms:mt-10 p-4 rounded-lg shadow-2xl open"
                    sx={{borderRadius:3}}
                >
                    <Typography variant="h4" className="text-center mb-4 font-poppins">
                        Admin Login
                    </Typography>


                    <CardContent>
                        <Formik
                            initialValues={{ admin_id: '', admin_password: '' }}
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
                                                name="admin_id"
                                                autoFocus
                                                className="mb-3"
                                                error={touched.admin_id && !!errors.admin_id}
                                                helperText={touched.admin_id && errors.admin_id}
                                            />
                                        </FormControl>
                                    </div>

                                    <div className="my-3">
                                        <FormControl fullWidth>
                                            <Field
                                                as={TextField}
                                                label="Password"
                                                variant="outlined"
                                                name="admin_password"
                                                type="password"
                                                error={touched.admin_password && !!errors.admin_password}
                                                helperText={touched.admin_password && errors.admin_password}
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

                    </CardContent>
                </Card>

            </div>
        </>
    )
}

export default AdminLogin;
