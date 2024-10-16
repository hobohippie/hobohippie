import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/user-profile.css'; // Add custom styles if needed

const UserProfile = () => {
  const { user, logout } = useAuth(); // Get user and logout function
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate('/'); // Redirect to home page after logout
  };

  // Check if user data is available
  if (!user) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="text-center border-light shadow-lg">
              <Card.Body>
                <h2>Please log in to view your profile.</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center border-light shadow-lg">
            <Card.Header className="bg-dark text-white">
              <h2>User Profile</h2>
            </Card.Header>
            <Card.Body>
              <Card.Title className="font-weight-bold">{user.account.username || 'John Doe'}</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {user.account.email || 'johndoe@example.com'} <br />
                <strong>Location:</strong> {user.account.location || 'Your Location'}
              </Card.Text>
              <Button variant="primary" className="mr-2" onClick={() => navigate('/edit-profile')}>Edit Profile</Button>
              <Button variant="secondary" onClick={handleLogout}>Log Out</Button> {/* Update to call handleLogout */}
            </Card.Body>
            <Card.Footer className="text-muted">
            Member since: {user.account.createdAt ? new Date(user.account.createdAt).toLocaleDateString() : 'Unknown'}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
