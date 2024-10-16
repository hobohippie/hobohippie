import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import '../styles/contact.css'

const Contact = () => {
  return (
    <Container fluid className="contact-page">
      <h1 className="text-center my-5">Contact Us</h1>

      <Row className="mb-4">
        <Col md={6} className="text-center">
          <Card className="contact-card">
            <Card.Body>
              <Card.Title>Email Us</Card.Title>
              <Card.Text>
                For any inquiries, feel free to reach out to us via email:
              </Card.Text>
              <Card.Text>
                <a href="mailto:support@HoboHippie.com">support@HoboHippie.com</a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="text-center">
          <Card className="contact-card">
            <Card.Body>
              <Card.Title>Call Us</Card.Title>
              <Card.Text>
                Prefer to talk? Give us a call at:
              </Card.Text>
              <Card.Text>
                <a href="tel:+15012700810">(555) 555-5555</a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col className="text-center">
          <Card className="contact-card">
            <Card.Body>
              <Card.Title>Visit Us</Card.Title>
              <Card.Text>
                Stuff to say......
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <footer className="text-center my-5">
        <p>Thank you for reaching out to Hobo Hippie. We look forward to connecting with you!</p>
      </footer>
    </Container>
  );
};

export default Contact;