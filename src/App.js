import "./App.css";
// import axios from "axios";
import { UserForm } from "./components/UserForm";
import { Toaster } from "react-hot-toast";
import { Link, Route } from "wouter";

function App() {
  return (
    <div className="App">
      <Toaster position="bottom-center" />
      <UserForm />
    </div>
  );
}

export default App;
