import React from "react";
import { Container, Typography } from "@material-ui/core";
import monitorImage from "../../assets/monitor.png";
import useStyles from "./DashboardPage.style";

const DashboardPage = () => {
  const styles = useStyles();

  return (
    <Container component="main" maxWidth="lg" className={styles.root}>
      <div className={styles.content}>
        <img className={styles.image} src={monitorImage} alt="Monitor" />
        <Typography variant="h4" component="h2" paragraph>
          Dashboard
        </Typography>
      </div>
    </Container>
  );
};

export default DashboardPage;
