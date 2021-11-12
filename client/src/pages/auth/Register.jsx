import { useState } from "react";
import toast from 'react-hot-toast';
import FormElement from "../../components/FormElement/FormElement";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import auth from "./services/auth";

const Register = () => {
  const [values, setValues] = useState({name: "", email: "", password: "" });
  const handleChange = (e) => {
    setValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };


  const handleSubmit = async (e) => {
      e.preventDefault();
      const [data, error] = await auth(values, "register")
      if(error){
          toast.error(error.error)
      } else {
          toast.success("registered successfully, you can login now")
          setValues({name: "", email: "", password: "" })
          localStorage.setItem("user", JSON.stringify(data))
      }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="head-line">Register</p>

      <FormElement>
        <label htmlFor="name">Name</label>
        <TextField
          id="name"
          name="name"
          onChange={handleChange}
          value={values.name}
          type="text"
        />
      </FormElement>

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
        <Button type="submit">Register</Button>
      </FormElement>
    </form>
  );
};

export default Register;
