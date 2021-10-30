import React from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import oddImage from "../../assets/one.png";
import evenImage from "../../assets/two.png";
import warningImage from "../../assets/warning.png";
import useStyles from "./ResultsPage.style";

const RoutingPage = () => {
  const styles = useStyles();
  const { isEven, error, inputs } = useTypedSelector(
    (state) => state.isEvenState
  );

  const returnImage = (isEven: boolean, error: string | null) => {
    if (error) {
      return warningImage;
    } else if (isEven) {
      return evenImage;
    } else {
      return oddImage;
    }
  };

  return (
    <Container component="main" maxWidth="lg" className={styles.root}>
      <div className={styles.content}>
        <img
          className={styles.image}
          src={returnImage(isEven, error)}
          alt="Routing"
        />
        {error ? (
          <div>
            <Typography variant="h4" component="h2" paragraph>
              Input must be an interger!
            </Typography>
            <Button
              component={Link}
              variant="contained"
              color="primary"
              disableElevation
              to="/"
            >
              Back
            </Button>
          </div>
        ) : (
          <div>
            <Typography variant="h4" component="h2" paragraph>
              {inputs[inputs.length - 1]} is
            </Typography>
            <Typography component="p" paragraph>
              {isEven ? "Even!" : "Odd!"}
            </Typography>
            <Button
              component={Link}
              variant="contained"
              color="primary"
              disableElevation
              to="/"
            >
              Back
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default RoutingPage;
