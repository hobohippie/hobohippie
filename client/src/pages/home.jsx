import React from 'react';
import { Carousel, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/home.css'; // Optional: Create a CSS file for custom styles

const HomePage = () => {
  return (
    <div className="homepage">
      
      

      <Row className="mb-4">
        <Col md={4}>
          <Link to="/products" className="card-link">
            <Card className="clickable-card">
              <Card.Img variant="top" src="https://via.placeholder.com/400x250?text=Other+stuff." /> {/* Temporary image */}
              <Card.Body>
                <Card.Title>other stuff</Card.Title>
                <Card.Text>
                  text for other stuff
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        <Col md={4}>
          <Link to="/products" className="card-link">
            <Card className="clickable-card">
              <Card.Img variant="top" src="https://via.placeholder.com/400x250?text=Other+stuff." /> {/* Temporary image */}
              <Card.Body>
                <Card.Title>other stuff</Card.Title>
                <Card.Text>
                  text for other stuff
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        <Col md={4}>
          <Link to="/products" className="card-link">
            <Card className="clickable-card">
              <Card.Img variant="top" src="https://via.placeholder.com/400x250?text=Other+stuff." /> {/* Temporary image */}
              <Card.Body>
                <Card.Title>other stuff</Card.Title>
                <Card.Text>
                  text for other stuff
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>

      <hr />

      <Row className="mb-4">
        <Col md={6}>
          <Link to="/products" className="card-link">
            <Card className="clickable-card">
              <Card.Img variant="top" src="https://via.placeholder.com/400x250?text=Incense+and+Essential+Oils" /> {/* Temporary image */}
              <Card.Body>
                <Card.Title>Incense & Essential Oils</Card.Title>
                <Card.Text>
                  Discover our range of calming incense and essential oils.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        
        <Col md={6}>
          <Link to="/products" className="card-link">
            <Card className="clickable-card">
              <Card.Img variant="top" src="https://via.placeholder.com/400x250?text=Apparel" /> {/* Temporary image */}
              <Card.Body>
                <Card.Title>Apparel</Card.Title>
                <Card.Text>
                  Check out our unique and comfortable apparel collection.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        
        </Col>
      </Row>

      <hr />

      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Welcome+to+Hobo+Hippie" // Temporary image
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome to Hobo Hippie</h3>
            <p>Discover our range of holistic healing products.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Explore+Herbal+Remedies" // Temporary image
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Explore Herbal Remedies</h3>
            <p>Find the perfect herbal solution for your needs.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Shop+Now!" // Temporary image
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Shop Now!</h3>
            <p>Join the Hobo Hippie community today.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomePage;
