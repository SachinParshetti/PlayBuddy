import React from "react";
import { Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Button, FormControl, CardContent, Box } from "@mui/material";
import TextField from '@mui/material/TextField'
import * as yup from "yup"
import { Formik } from "formik"
import axios from 'axios'
import { Field } from "formik";
import { Form } from "formik";
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

const BASE_URL = import.meta.env.VITE_BASE_URL
function UserRegister() {

    const navigate = useNavigate();
    interface userSchema {
        username: String
        email: String
        password: String
        mobile: String
    }

  const validationSchema = yup.object({
    username:yup.string().required("User name is required"),
    email:yup.string().email("Please enter email in correct format").required("Email is required"),
    password:yup.string().matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{6,}$/, "password much match (ex.Example@123) this format").required('Password is required '),
    mobile:yup.string().matches(/^\d{10}$/,"Mobile number must be in (ex: +91 7019390002) format").required("Mobile number is reqired")

  })

  async function handleRegister( values: userSchema, { setSubmitting}:any){

    const userData:userSchema ={
        username:values.username,
        email:values.email,
        password:values.password,
        mobile:values.mobile
    }

    try
    {
        const response = await axios.post(`${BASE_URL}/users`,userData);
        if(response.status === 200 || response.status === 201)
        {
            toast.success("User Registered Successfully");
            setSubmitting(false);
            navigate("/user");

        }
        else
        {
            toast.error("Failed to Register User");
            setSubmitting(false);
            navigate("/user-register");
        }

    }
    catch(error)
    {
        toast.error("Something went wrong.");
        console.error("User Registration Error:", error);
        setSubmitting(false);
        navigate("/user-register");
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
                        <Link to="/">
                            <button className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-1 px-4 rounded-full overflow-hidden group">
                                <span className="absolute inset-0 bg-gradient-to-r from-pink-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span className="relative"> <Home/> </span>
                                <span className="relative"> Home</span>
                            </button>
                        </Link>
                    </div>
                </header>


                <Card
                    variant="outlined"
                    className="max-w-md mx-auto mt-10 p-4 rounded-lg shadow-2xl open"
                    sx={{ borderRadius: 3 }}
                >
                    <Typography variant="h4" className="text-center mb-4 font-poppins">
                        User Register
                    </Typography>

                    <CardContent>
                        <Formik
                            initialValues={{ username: '', email: '',password:'',mobile:'' }}
                            validationSchema={validationSchema}
                            onSubmit={handleRegister}
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
                                                label="Email"
                                                variant="outlined"
                                                name="email"
                                                type="email"
                                                error={touched.email && !!errors.email}
                                                helperText={touched.email && errors.email}
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
                                    

                                     <div className="my-3">
                                        <FormControl fullWidth>
                                            <Field
                                                as={TextField}
                                                label="Mobile Number"
                                                variant="outlined"
                                                name="mobile"
                                                type="text"
                                                error={touched.mobile && !!errors.mobile}
                                                helperText={touched.mobile && errors.mobile}
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

                       

                        <div className="flex justify-center items-center mt-4">

                            <Link to="/user" className="text-blue-700 mx-2">Already Registerd?</Link>

                        </div>

                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default UserRegister;
