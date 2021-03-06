import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType, DispatchType} from "../../redux/store/store";
import {useFormik} from "formik";
import {login} from "../../redux/reducers/auth-reducer/auth-reducer";
import {ErrorSnackbar} from "../common/ErrorSnackbar/ErrorSnackbar";
import {LoginParamsType} from "../../api";


export const Login = React.memo(() => {
    const dispatch = useDispatch<DispatchType>()

    const isDarkTheme = useSelector((state: GlobalStateType) => state.theme.isDarkTheme)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: Partial<Omit<LoginParamsType, "captcha">> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'The password cannot be shorter than 3 characters';
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(login(values))
            formik.resetForm()
        },
    })

    return (
        <Grid container
              display={"flex"}
              alignItems={"center"}
              justifyContent={'center'}
              style={{minHeight: "100vh", backgroundColor: isDarkTheme ? "#484e50" : "rgba(96,151,225,0.37)"}}
        >
            <Grid item justifyContent={'center'}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>

                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps("email")}
                            />
                            {formik.touched.email && formik.errors.email &&
                                <div>{formik.errors.email}</div>}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password &&
                                <div>{formik.errors.password}</div>}
                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox {...formik.getFieldProps("rememberMe")}/>}
                            />
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                disabled={!formik.isValid || !formik.dirty}
                            >
                                Login
                            </Button>
                        </FormGroup>
                    </form>
                    <ErrorSnackbar/>
                </FormControl>
            </Grid>
        </Grid>
    )
})
