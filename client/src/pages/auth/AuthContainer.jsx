import Register from "./Register";
import SignIn from "./SignIn";

const AuthContainer = () => {

    return (
        <div className="auth-container">
            <SignIn />
            <Register />
        </div>
    )
}

export default AuthContainer;