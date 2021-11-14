import React from "react";
import { Typography, Card } from "@material-ui/core";
import CardContent from "@mui/material/CardContent";
import useStyles from "./Card.style";

type CardProps = {
  subject: string;
  body: string;
};

const CustomCard: React.FunctionComponent<CardProps> = ({ subject, body }) => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardContent>
        <Typography variant="h5" component="div">
          {subject}
        </Typography>
        <Typography variant="body2">{body}</Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
