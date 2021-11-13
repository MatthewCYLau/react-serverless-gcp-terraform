import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import { useActions } from "../../hooks/useActions";
import registrationImage from "../../assets/register.png";
import useStyles from "./RegistrationPage.style";

interface RegistrationFormValues {
  username: string;
  password: string;
}

const RegistrationPage: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const styles = useStyles();
  const { register } = useActions();

  const initialValues: RegistrationFormValues = { username: "", password: "" };

  const formik = useFormik({
    initialValues,
    onSubmit: (values, actions) => {
      register();
      actions.setSubmitting(false);
      history.push("/dashboard");
    },
  });

  return (
    <Container component="main" maxWidth="lg" className={styles.root}>
      <div className={styles.content}>
        <img className={styles.image} src={registrationImage} alt="key" />
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h4" component="h2" paragraph>
            Registration
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

export default RegistrationPage;
