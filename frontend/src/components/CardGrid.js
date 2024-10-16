import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const CardGrid = () => {
  const items = Array(12).fill({ title: 'Title', date: 'Updated 2 days ago' });

  return (
    <Row xs={1} md={3} className="g-4">
      {items.map((item, index) => (
        <Col key={index}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.date}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardGrid;
