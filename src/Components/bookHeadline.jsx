import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';

function BookHeadline() {
    return (
        <div>
            <Container>
  <Row className="justify-content-md-center">
    <Col md="auto"><h2>Book Market Place ECS </h2></Col>
  </Row>
</Container>
        </div>
    )
}

export default BookHeadline
