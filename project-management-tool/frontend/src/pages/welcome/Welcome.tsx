import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #2c3e50, #3498db);
  overflow: hidden;
`;

const AnimatedShape = styled(motion.div)`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: white;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-family: "Noto Sans JP", sans-serif; /* Ninja-style font */
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const Button = styled(Link)`
  padding: 12px 24px;
  background-color: #e74c3c;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  transition: all 0.3s;
  margin: 0 10px;

  &:hover {
    background-color: #c0392b;
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const FeaturesWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 2rem;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  width: 200px;
  text-align: center;
`;

const FeatureIcon = styled.i`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const Welcome: React.FC = () => {
  const shapes = Array.from({ length: 15 }, (_, i) => ({
    size: Math.random() * 80 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <StyledBackground>
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
      <ContentWrapper>
        <Title>Task Ninja</Title>
        <Subtitle>Master your projects with ninja-like precision</Subtitle>
        <FeaturesWrapper>
          <FeatureCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <FeatureIcon className="fas fa-tasks" />
            <h3>Task Management</h3>
            <p>Organize and prioritize your tasks effortlessly</p>
          </FeatureCard>
          <FeatureCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <FeatureIcon className="fas fa-users" />
            <h3>Team Collaboration</h3>
            <p>Work seamlessly with your team members</p>
          </FeatureCard>
          <FeatureCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <FeatureIcon className="fas fa-chart-line" />
            <h3>Progress Tracking</h3>
            <p>Monitor project progress in real-time</p>
          </FeatureCard>
        </FeaturesWrapper>
        <div>
          <Button to="/register">Get Started</Button>
          <Button
            to="/login"
            style={{ background: "transparent", border: "2px solid white" }}>
            Login
          </Button>
        </div>
      </ContentWrapper>
    </StyledBackground>
  );
};

export default Welcome;
