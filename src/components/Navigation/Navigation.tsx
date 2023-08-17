import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { logout } from "../../services/auth.service";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {  useEffect, useState } from "react";
import "./Navigation.css";

interface NavigationProps {
  setShow: any;
}

export const Navigation: React.FC<NavigationProps> = ({ setShow }) => {
  const username: string | null = localStorage.getItem("username");
  const token: string | null = localStorage.getItem("token");
  const isGuest: string | null = localStorage.getItem("isGuest");
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    navigate("signin");
  };

  useEffect(() => {
    if (token && username) {
      setWelcomeMessage(`Signed in as ${username}`);
      setSignedIn(true);
    } else if (isGuest) {
      setWelcomeMessage("Signed in as guest");
    } else {
      setWelcomeMessage(`Please sign in`);
    }
  }, [location]);
  return (
    // to="/tasks/all"
    <Navbar variant="dark">
      <Container>
        <Link to="/tasks/all">Fancy Task Manager</Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {signedIn && welcomeMessage}
            {signedIn && (
              <Button variant="link" onClick={onLogout}>
                Sign out
              </Button>
            )}
            {!signedIn && !isGuest && (
              <Link to="/signin">{welcomeMessage}</Link>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
