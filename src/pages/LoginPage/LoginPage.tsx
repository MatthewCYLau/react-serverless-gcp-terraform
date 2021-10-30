import React from "react";
import { Container, Typography } from "@material-ui/core";
import keyImage from "../../assets/key.png";
import useStyles from "./LoginPage.style";

const LoginPage = () => {
  const styles = useStyles();

  return (
    <Container component="main" maxWidth="lg" className={styles.root}>
      <div className={styles.content}>
        <img className={styles.image} src={keyImage} alt="key" />
        <Typography variant="h4" component="h2" paragraph>
          Login
        </Typography>
      </div>
    </Container>
  );
};

export default LoginPage;
