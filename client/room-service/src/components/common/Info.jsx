import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Info = () => {
    return (
        <Container  className="mt-5 info ">
            <Row className="infocol main-color ">
                <Col >
                    <h5 >Address</h5>
                    <p>123 Main Street, City, Country</p>
                </Col>
                <Col>
                    <h5 >Opening Hours</h5>
                    <p>Monday - Saturday:<br></br> 11:00 AM - 23:00 PM</p>
                    <p>Sunday: Closed</p>
                </Col>
                <Col>
                    <h5 >Contact</h5>
                    <p>Phone: +123 456 789</p>
                    <p>Email: info@example.com</p>
                </Col>
            </Row>
        </Container>
    );
};

export default Info;
