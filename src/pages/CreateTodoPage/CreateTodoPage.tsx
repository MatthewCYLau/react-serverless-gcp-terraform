import React from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import { useActions } from "../../hooks/useActions";
import keyImage from "../../assets/key.png";
import useStyles from "./CreateTodoPage.style";

interface CreateTodoFormValues {
  subject: string;
  body: string;
}

const CreateTodoPage: React.FunctionComponent = () => {
  const styles = useStyles();
  const { getTodos } = useActions();

  const initialValues: CreateTodoFormValues = { subject: "", body: "" };

  const formik = useFormik({
    initialValues,
    onSubmit: (_values, actions) => {
      // login();
      actions.setSubmitting(false);
    },
  });

  return (
    <Container component="main" maxWidth="lg" className={styles.root}>
      <div className={styles.content}>
        <img className={styles.image} src={keyImage} alt="key" />
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h4" component="h2" paragraph>
            Create Todo
          </Typography>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.subject}
            onChange={formik.handleChange}
            className={styles.textField}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            value={formik.values.body}
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

export default CreateTodoPage;
