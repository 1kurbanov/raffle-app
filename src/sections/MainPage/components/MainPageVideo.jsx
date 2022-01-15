import { useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';

export function MainPageVideo({ isPlayingVideo }) {
  const videoElement = useRef(null);
  useEffect(() => {
    if (isPlayingVideo) {
      videoElement.current.play();
    } else {
      videoElement.current.currentTime = 0;
      videoElement.current.pause();
    }
  }, [isPlayingVideo]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Видео {isPlayingVideo ? 'Play' : 'Stop'}</Card.Title>
        <video src='/video/videoplayback.mp4' ref={videoElement} autoPlay muted />
      </Card.Body>
    </Card>
  );
}
