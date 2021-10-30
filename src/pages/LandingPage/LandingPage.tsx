import { RouteComponentProps } from "react-router-dom";
import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import helloImage from "../../assets/hello.png";
import useStyles from "./LandingPage.style";

type Section = {
  key: string;
  html: React.ReactNode;
};

const LandingPage: React.FunctionComponent<RouteComponentProps> = () => {
  const styles = useStyles();

  const sections: Section[] = [
    {
      key: "welcome",
      html: <Typography>Landing Page</Typography>,
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
