import React from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import { useActions } from "../../hooks/useActions";
import taskImage from "../../assets/task.png";
import useStyles from "./CreateTodoPage.style";
import { RouteComponentProps } from "react-router";

interface CreateTodoFormValues {
  subject: string;
  body: string;
  owner: string;
}

const CreateTodoPage: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const styles = useStyles();
  const { createTodo } = useActions();

  const initialValues: CreateTodoFormValues = {
    subject: "",
    body: "",
    owner: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values, actions) => {
      createTodo({ ...values, owner: "Jon Doe" });
      actions.setSubmitting(false);
      history.push("/dashboard");
    },
  });

  return (
    <Container component="main" maxWidth="lg" className={styles.root}>
      <div className={styles.content}>
        <img className={styles.image} src={taskImage} alt="key" />
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h4" component="h2" paragraph>
            Create Todo
          </Typography>
          <TextField
            fullWidth
            id="subject"
            name="subject"
            label="Subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
            className={styles.textField}
          />
          <TextField
            fullWidth
            id="body"
            name="body"
            label="Body"
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
