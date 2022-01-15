import { Card, ListGroup } from 'react-bootstrap';

export function MainPageOldWinners({ oldWinners }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Общий список победителей: {oldWinners.length}</Card.Title>

        <ListGroup>
          {oldWinners.map(winner => {
            return <ListGroup.Item key={winner.id}>{winner.name}</ListGroup.Item>;
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
