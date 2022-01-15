import { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { MainPageCurrentWinners, MainPageOldWinners, MainPageVideo } from './components';
import { getMaxElementsForContinue, getRandomInt, isContinue } from '../../utils';
import peopleList from '../../people';
import { MAX_CURRENT_WINNERS, MAX_PEOPLE, TIME_CURRENT_WINNER } from '../../utils/constants';

function MainPage() {
  const [people, setPeople] = useState([]);
  const [currentWinners, setCurrentWinners] = useState([]);
  const [oldWinners, setOldWinners] = useState([]);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const timer = useRef(null);

  useEffect(() => {
    setPeople(peopleList);
  }, []);

  useEffect(() => {
    if (
      people &&
      people.length &&
      Array.isArray(people) &&
      isContinue(oldWinners.length, Math.ceil(MAX_PEOPLE / 3), MAX_CURRENT_WINNERS)
    ) {
      timer.current = setTimeout(() => {
        if (isContinue(oldWinners.length, Math.ceil(MAX_PEOPLE / 3), MAX_CURRENT_WINNERS)) {
          const winnersPeople = [];
          const copyAllPeople = [...people];
          const max = getMaxElementsForContinue(
            oldWinners.length,
            Math.ceil(MAX_PEOPLE / 3),
            MAX_CURRENT_WINNERS
          );
          for (let i = 0; i < max; i++) {
            const [winner] = copyAllPeople.splice(getRandomInt(0, copyAllPeople.length), 1);
            winnersPeople.push(winner);
          }
          setCurrentWinners(winnersPeople);
          setPeople(prev => {
            return prev.filter(p => !winnersPeople.some(w => w.id === p.id));
          });
          setIsPlayingVideo(true);
        }
      }, TIME_CURRENT_WINNER);
    } else {
      if (timer && timer.current) {
        clearTimeout(timer.current);
      }
    }

    return () => {
      if (timer && timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [people, oldWinners]);

  return (
    <Container className='mt-4'>
      <Row className='mb-2'>
        <Col>
          <MainPageVideo isPlayingVideo={isPlayingVideo} />
        </Col>
        <Col>
          <MainPageCurrentWinners
            currentWinners={currentWinners}
            setCurrentWinners={setCurrentWinners}
            setOldWinners={setOldWinners}
            setIsPlayingVideo={setIsPlayingVideo}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <MainPageOldWinners oldWinners={oldWinners} />
        </Col>
      </Row>
    </Container>
  );
}

export default MainPage;
