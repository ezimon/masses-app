import "./App.css";
// import axios from "axios";
import { UserForm } from "./components/UserForm";
import { Toaster } from "react-hot-toast";
import { Terms } from "./components/Terms";
import { Route } from "wouter";

function App() {
  return (
    <div className="App">
      <Toaster position="bottom-center" />
      <Route path="/">
        <UserForm />
      </Route>
      <Route path="/terms">
        <Terms />
      </Route>
    </div>
  );
}

export default App;
