import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store/store";
import { logoutUser } from "../../redux/slices/userSlice";
import { motion } from "framer-motion";
import styled from "styled-components";

const LogoutButton = styled(motion.button)`
  padding: 8px 16px;
  background-color: #e74c3c;
  style= {
     {
      background: "linear-gradient(45deg, #2c3e50, #3498db)";
    }
  }
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <LogoutButton
      onClick={handleLogout}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}>
      Logout
    </LogoutButton>
  );
};

export default Logout;
