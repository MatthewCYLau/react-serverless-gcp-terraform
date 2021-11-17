import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import Alert from "@mui/material/Alert";

const CustomAlert: React.FunctionComponent = () => {
  const { alerts } = useTypedSelector((state) => state.alertState);
  const { removeAlert } = useActions();
  return (
    <React.Fragment>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <Alert
            onClose={() => removeAlert(alert.id)}
            key={alert.id}
            severity="error"
          >
            {alert.message}
          </Alert>
        ))}
    </React.Fragment>
  );
};

export default CustomAlert;
