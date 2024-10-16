import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import '../styles/about.css'

const About = () => {
  return (
    <Container fluid className="about-page">
      <h1 className="text-center my-5">About Hobo Hippie</h1>

      <Row className="mb-4">
        <Col md={6} className="text-center">
          <Card>
            <Card.Body>
              <Card.Title>Our Story</Card.Title>
              <Card.Text>
                At Hobo Hippie, we believe in the power of nature. Founded by Free and Rob, we were inspired by our own journeys into the world of holistic health. Our passion for herbal remedies began with a desire to explore alternative healing methods and connect with nature's gifts. We strive to create a space where anyone can discover the healing potential of herbs and natural ingredients.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="text-center">
          <Card>
            <Card.Body>
              <Card.Title>Our Philosophy</Card.Title>
              <Card.Text>
                We are committed to using ethically sourced, organic ingredients in our products. Each herbal tincture, essential oil blend, and homemade apple cider vinegar is crafted with care, ensuring that you receive the highest quality and effectiveness. We value sustainability and strive to minimize our environmental impact by using eco-friendly packaging and practices.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6} className="text-center">
          <Card>
            <Card.Body>
              <Card.Title>Our Offerings</Card.Title>
              <Card.Text>
                Explore our diverse range of products, including herbal tinctures, essential oil blends, herbal teas, and DIY kits. Whether you are seeking to support your immune system, find relaxation, or enhance your overall well-being, Hobo Hippie has something for everyone.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="text-center">
          <Card>
            <Card.Body>
              <Card.Title>Join Our Community</Card.Title>
              <Card.Text>
                At Hobo Hippie, we believe in the power of community and knowledge sharing. We invite you to join us on this journey towards holistic health. Follow us on social media and subscribe to our newsletter for tips, recipes, and exclusive offers!
              </Card.Text>
              <Button variant="primary">Subscribe Now</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <footer className="text-center my-5">
        <p>Thank you for choosing Hobo Hippie as your partner in wellness. Together, let's embrace the natural path to healing.</p>
      </footer>
    </Container>
  );
};

export default About;
