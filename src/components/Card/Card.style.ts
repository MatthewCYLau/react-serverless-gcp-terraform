import { createStyles, makeStyles } from "@material-ui/core/styles";

export default makeStyles(
  () =>
    createStyles({
      card: {
        margin: "5px 0",
        width: "300px",
      },
      button: {
        marginTop: "5px",
      },
    }),
  { name: "Card" }
);
