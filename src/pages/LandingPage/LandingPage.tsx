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
import useStyles from "./LandingPage.style";

type Section = {
  key: string;
  html: React.ReactNode;
};

interface FormValues {
  input: string;
}

const LandingPage: React.FunctionComponent<RouteComponentProps> = ({
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
      html: <Typography>Landing Page</Typography>,
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

export default LandingPage;
