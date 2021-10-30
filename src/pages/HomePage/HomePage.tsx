import { RouteComponentProps } from "react-router-dom";
import React from "react";
import {
  Container,
  Grid,
  Link,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useActions } from "../../hooks/useActions";
import sampleImage from "../../assets/calculator.png";
import useStyles from "./HomePage.style";

type Section = {
  key: string;
  html: React.ReactNode;
};

interface FormValues {
  input: string;
}

const HomePage: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const styles = useStyles();
  const { calculateIsEven } = useActions();

  const initialValues: FormValues = { input: "" };

  const formik = useFormik({
    initialValues,
    onSubmit: (values, actions) => {
      calculateIsEven(values.input);
      actions.setSubmitting(false);
      history.push("/results");
    },
  });

  const sections: Section[] = [
    {
      key: "welcome",
      html: (
        <Typography>
          {"Is-Even As A Service - because "}
          <Link
            color="secondary"
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder"
            target="_blank"
            rel="noopener noreferrer"
          >
            Remainder operator
          </Link>
          {" is difficult to comprehend "}
        </Typography>
      ),
    },
    {
      key: "form",
      html: (
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="input"
            name="input"
            label="Is this an even number?"
            value={formik.values.input}
            onChange={formik.handleChange}
            className={styles.textField}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      ),
    },
  ];

  return (
    <Container component="main" maxWidth="lg" className={styles.root}>
      <div className={styles.content}>
        <img className={styles.image} src={sampleImage} alt="Sample" />
        <Grid container spacing={3}>
          {sections.map(({ html, key }) => (
            <Grid
              key={key}
              item
              xs={12}
              sm={6}
              md={12}
              className={styles.paragraph}
            >
              {html}
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default HomePage;
