import Register from "./Register";
import SignIn from "./SignIn";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const AuthContainer = () => {
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (currentUser) {
      history.push("/table");
    }
  }, [currentUser, history]);
  return (
    <div className="auth-container">
      <SignIn />
      <Register />
    </div>
  );
};

export default AuthContainer;
