import { useState } from "react";
import toast from 'react-hot-toast';
import FormElement from "../../components/FormElement/FormElement";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import auth from "./services/auth";
import { useHistory } from "react-router-dom";
const SignIn = () => {
  const history = useHistory()
  const [values, setValues] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [data, error] = await auth(values, "login")
    if(error){
        toast.error(error.error)
    } else {
        localStorage.setItem("user", JSON.stringify(data))
        history.push("/table")
    }
}


  return (
    <form onSubmit={handleSubmit}>
      <p className="head-line">Sign In</p>
      <FormElement>
        <label htmlFor="email">Email</label>
        <TextField
          id="email"
          name="email"
          onChange={handleChange}
          value={values.email}
          required
          type="email"
        />
      </FormElement>

      <FormElement>
        <label htmlFor="password">Password</label>
        <TextField
          id="password"
          name="password"
          onChange={handleChange}
          value={values.password}
          required
          type="password"
          minLength="6"
        />
      </FormElement>

      <FormElement>
        <Button type="submit">Login</Button>
      </FormElement>
    </form>
  );
};

export default SignIn;
