import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Card } from 'react-bootstrap';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) return <p>Please log in to see the profile.</p>;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={user.picture} alt={user.name} />
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Text>Email: {user.email}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Profile;
