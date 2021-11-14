import React from "react";
import { Typography, Card, Button } from "@material-ui/core";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CardContent from "@mui/material/CardContent";
import useStyles from "./Card.style";

type CardProps = {
  subject: string;
  body: string;
  onClick: () => void;
};

const CustomCard: React.FunctionComponent<CardProps> = ({
  subject,
  body,
  onClick,
}) => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardContent>
        <Typography variant="h5" component="div">
          {subject}
        </Typography>
        <Typography variant="body2">{body}</Typography>
        <Button
          startIcon={<CheckCircleIcon />}
          onClick={onClick}
          color="primary"
          variant="contained"
          type="submit"
          className={styles.button}
        >
          Done
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
