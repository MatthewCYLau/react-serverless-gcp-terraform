import React from "react";
import Alert from "@mui/material/Alert";
import useStyles from "./Alert.style";

const CustomAlert: React.FunctionComponent = () => {
  const styles = useStyles();

  return (
    <Alert onClose={() => {}} severity="error">
      This is an error alert — check it out!
    </Alert>
  );
};

export default CustomAlert;
