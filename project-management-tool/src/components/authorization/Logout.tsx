import React from "react";
import { useAppDispatch } from "../../redux/store/store";
import { logoutUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
