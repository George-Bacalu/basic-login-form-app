import Button from "../ui/Button";
import Card from "../ui/Card";
import classes from "./Home.module.css";

const Home = props => {
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={props.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
