import React from "react";
import { Container, Typography } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "../../components/Card";
import monitorImage from "../../assets/monitor.png";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import useStyles from "./DashboardPage.style";

const DashboardPage: React.FunctionComponent = () => {
  const styles = useStyles();
  const { loading } = useTypedSelector((state) => state.authState);

  return (
    <Container component="main" maxWidth="lg" className={styles.root}>
      {loading ? (
        <CircularProgress className={styles.loader} />
      ) : (
        <div className={styles.content}>
          <img className={styles.image} src={monitorImage} alt="Monitor" />
          <Container component="main" maxWidth="lg">
            <Typography variant="h4" component="h2" paragraph>
              Dashboard
            </Typography>
            <Card subject="foo" body="bar" />
          </Container>
        </div>
      )}
    </Container>
  );
};

export default DashboardPage;
