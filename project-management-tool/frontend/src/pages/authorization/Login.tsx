import React, { useState } from "react";
import { useAppDispatch } from "../../redux/store/store";
import { loginUser } from "../../redux/slices/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

const PageWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #2c3e50, #3498db);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const AnimatedShape = styled(motion.div)`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
`;

const FormContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  z-index: 1;
`;

const Title = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledInput = styled(motion.input)`
  padding: 12px;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const StyledButton = styled(motion.button)`
  padding: 12px;
  border: none;
  border-radius: 25px;
  background: #e74c3c;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #c0392b;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-align: center;
  text-decoration: none;
  margin-top: 20px;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handlesubmit for login clicked");
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      console.log("login user fulfilled");
      navigate("/dashboard");
    }
  };

  const shapes = Array.from({ length: 15 }, () => ({
    size: Math.random() * 80 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <PageWrapper>
      {shapes.map((shape, index) => (
        <AnimatedShape
          key={index}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{
            x: ["0%", "100%", "0%"],
            y: ["0%", "100%", "0%"],
            rotate: [0, 360],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      <FormContainer
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <Title>Login to Task Ninja</Title>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            whileFocus={{ scale: 1.05 }}
          />
          <StyledInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            whileFocus={{ scale: 1.05 }}
          />
          <StyledButton
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            Login
          </StyledButton>
        </StyledForm>
        <StyledLink to="/register">
          Don't have an account? Register here
        </StyledLink>
      </FormContainer>
    </PageWrapper>
  );
};

export default Login;
