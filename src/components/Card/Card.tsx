import React from "react";
import { Typography, Card } from "@material-ui/core";
import CardContent from "@mui/material/CardContent";

type CardProps = {
  subject: string;
  body: string;
};

const CustomCard: React.FunctionComponent<CardProps> = ({ subject, body }) => {
  return (
    <Card>
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
