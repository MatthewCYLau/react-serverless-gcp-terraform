import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "../../components/Card";
import monitorImage from "../../assets/monitor.png";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import useStyles from "./DashboardPage.style";

const DashboardPage: React.FunctionComponent = () => {
  const styles = useStyles();
  const { getTodos } = useActions();
  const { loading } = useTypedSelector((state) => state.authState);
  const { todos } = useTypedSelector((state) => state.todoState);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

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
            <div className={styles.todos}>
              {todos.map((todo) => (
                <Card
                  subject={todo.subject}
                  body={todo.body}
                  key={todo.todo_id}
                />
              ))}
            </div>
            <Button
              component={Link}
              variant="contained"
              color="primary"
              disableElevation
              to="/create-todo"
            >
              Create Todo
            </Button>
          </Container>
        </div>
      )}
    </Container>
  );
};

export default DashboardPage;
