import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./pages/welcome/Welcome";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/authorization/Login";
import Register from "./pages/authorization/Register";
import PrivateRoute from "./components/authorization/PrivateRoute";
import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
