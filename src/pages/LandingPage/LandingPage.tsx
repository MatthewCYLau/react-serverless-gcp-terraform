import { Link } from "react-router-dom";
import React from "react";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import helloImage from "../../assets/hello.png";
import useStyles from "./LandingPage.style";

type Section = {
  key: string;
  html: React.ReactNode;
};

const LandingPage: React.FunctionComponent = () => {
  const styles = useStyles();

  const sections: Section[] = [
    {
      key: "welcome",
      html: (
        <Typography variant="h4" component="h2" paragraph>
          GCP Serverless To-Do App Blue Berries
        </Typography>
      ),
    },
    {
      key: "login",
      html: (
        <Container>
          <Button
            component={Link}
            variant="contained"
            color="primary"
            disableElevation
            to="/login"
            className={styles.button}
          >
            Login
          </Button>
          <Button
            component={Link}
            variant="contained"
            color="secondary"
            disableElevation
            to="/registration"
            className={styles.button}
          >
            Register
          </Button>
        </Container>
      ),
    },
  ];

  return (
    <Container component="main" maxWidth="lg" className={styles.root}>
      <div className={styles.content}>
        <img className={styles.image} src={helloImage} alt="Hello" />
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
