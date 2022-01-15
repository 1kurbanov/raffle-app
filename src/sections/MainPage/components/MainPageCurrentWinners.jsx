import { useEffect, useRef, useState } from 'react';
import { ListGroup, Card } from 'react-bootstrap';
import { TIME_OLD_WINNER, TIME_VISIBLE_WINNER } from '../../../utils/constants';

export function MainPageCurrentWinners({
  currentWinners,
  setCurrentWinners,
  setOldWinners,
  setIsPlayingVideo
}) {
  const [visibleCurrentWinners, setVisibleCurrentWinners] = useState([]);
  const timer = useRef(null);
  const visibleTimer = useRef(null);

  useEffect(() => {
    if (currentWinners && currentWinners.length && Array.isArray(currentWinners)) {
      const [firstWinner] = currentWinners;
      setVisibleCurrentWinners([firstWinner]);
    }
  }, [currentWinners]);

  useEffect(() => {
    if (
      currentWinners &&
      currentWinners.length &&
      Array.isArray(currentWinners) &&
      visibleCurrentWinners.length < currentWinners.length
    ) {
      const copyCurrentWinners = [...currentWinners];
      visibleTimer.current = setTimeout(() => {
        if (copyCurrentWinners && copyCurrentWinners.length) {
          setVisibleCurrentWinners(prev => {
            return [...prev, copyCurrentWinners.splice(1, 1)?.[0]];
          });
        }
      }, TIME_VISIBLE_WINNER);
    } else {
      if (visibleTimer && visibleTimer.current) {
        clearTimeout(visibleTimer.current);
      }
    }

    if (
      currentWinners &&
      currentWinners.length &&
      Array.isArray(currentWinners) &&
      visibleCurrentWinners.length === currentWinners.length
    ) {
      timer.current = setTimeout(() => {
        setOldWinners(prev => {
          return [...prev, ...currentWinners];
        });
        setCurrentWinners([]);
        setVisibleCurrentWinners([]);
        setIsPlayingVideo(false);
      }, TIME_OLD_WINNER);
    } else {
      if (timer && timer.current) {
        clearTimeout(timer.current);
      }
    }

    return () => {
      if (visibleTimer && visibleTimer.current) {
        clearTimeout(visibleTimer.current);
      }
    };
  }, [visibleCurrentWinners]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Текущие победители</Card.Title>
        <ListGroup>
          {visibleCurrentWinners.map(winner => {
            return <ListGroup.Item key={winner.id}>{winner.name}</ListGroup.Item>;
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
