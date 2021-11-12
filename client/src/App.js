import AuthContainer from "./pages/auth/AuthContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import TablePage from "./pages/Table/TablePage";

function App() {
  return (
    <div className="App">
      <h1>Marketeer's Research Test</h1>
      <Router>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Switch>
          <Route path="/auth" exact component={AuthContainer} />
          <Route exact path="/table" component={TablePage} />
          <Route path="*" render={() => <h1>404 NOT FOUND</h1>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
