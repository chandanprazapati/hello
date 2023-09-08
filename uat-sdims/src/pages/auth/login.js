import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../../../public/assets/Emblem_of_Nepal.png";
import { loginUser } from "@/services/apiServices/auth/loginService";
import { setUserDetail } from "@/redux/userDetail";
import { useDispatch } from "react-redux";
import SeoOptimization from "../../components/reusableDesign/SeoOptimzation";

export default function Login() {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const router = useRouter();
  const onSubmit = async (data) => {
    loginUser(data).then((response) => {
      if (response.status === true) {
        dispatch(setUserDetail(response));
        toast.success(`${response.data.name} Loggedin Successfully`, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/dashboard");
      } else {
        toast.error(response.message, {
          autoClose: 1000,
        });
      }
    });
  };

  return (
    <>
      <SeoOptimization title={"Credentials"} />
      <div className="grid grid-cols-1 xl:grid-cols-2 pt-4 xl:pt-16 pb-10 xl:pb-0 ">
        <div className="col-span-1 flex justify-center pt-0 xl:pt-20 px-20 xl:pl-20 ">
          <Image src={logo} alt="nagarpalikaLogo" />
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Container component="main" maxWidth="xs">
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Addresponses"
                    autoComplete="email"
                    autoFocus
                    {...register("username")}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    {...register("password")}
                  />
                  <FormControlLabel
                    onChange={handleCheckbox}
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    // disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Sign In"}
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{  mb: 2 }}
                    // disabled={isSubmitting}
                    onClick = {()=>router.push("/")}
                  >
                    {"Return to Home page (landing page ) "}
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </form>
        </div>
      </div>
    </>
  );
}
