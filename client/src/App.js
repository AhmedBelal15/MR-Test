import AuthContainer from "./pages/auth/AuthContainer";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="App">
      <h1>Marketeer's Research Test</h1>
      <Router>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Route
          path="/auth"
          render={() =>
            !currentUser ? <AuthContainer /> : <Redirect to="/" />
          }
        />
      </Router>
    </div>
  );
}

export default App;
