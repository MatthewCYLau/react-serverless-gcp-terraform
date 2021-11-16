import React from "react";
import { Redirect } from "react-router-dom";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import keyImage from "../../assets/key.png";
import useStyles from "./LoginPage.style";

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginPage: React.FunctionComponent = () => {
  const styles = useStyles();
  const { login } = useActions();
  const { isAuthenticated } = useTypedSelector((state) => state.authState);

  const initialValues: LoginFormValues = { username: "", password: "" };

  const formik = useFormik({
    initialValues,
    onSubmit: (values, actions) => {
      login(values);
      actions.setSubmitting(false);
    },
  });

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container component="main" maxWidth="lg" className={styles.root}>
      <div className={styles.content}>
        <img className={styles.image} src={keyImage} alt="key" />
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h4" component="h2" paragraph>
            Login
          </Typography>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            className={styles.textField}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className={styles.textField}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
