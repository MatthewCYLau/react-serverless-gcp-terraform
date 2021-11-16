import React from "react";
import Alert from "@mui/material/Alert";

const CustomAlert: React.FunctionComponent = () => {
  return (
    <Alert onClose={() => {}} severity="error">
      This is an error alert — check it out!
    </Alert>
  );
};

export default CustomAlert;
