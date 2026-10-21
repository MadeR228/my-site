import { useRef, useState } from 'react';
import abtmanager1 from '../img/abtmanager1.jpg';
import abtmanager2 from '../img/abtmanager2.jpg';
import abtmanager3 from '../img/abtmanager3.jpg';
import acti1 from '../img/acti1.webp';
import acti2 from '../img/acti2.webp';
import acti3 from '../img/acti3.webp';
import bcprof1 from '../img/bcprof1.png';
import bcprof2 from '../img/bcprof2.png';
import bcprof3 from '../img/bcprof3.png';

const projectImages = {
  abt: [abtmanager1, abtmanager2, abtmanager3],
  acti: [acti1, acti2, acti3],
  bc: [bcprof1, bcprof2, bcprof3],
};

export default function ProjectCarousel({ project, tone, slides }) {
  const [current, setCurrent] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const gesture = useRef(null);
  const change = (direction) => setCurrent((value) => (value + direction + slides.length) % slides.length);

  const startGesture = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    gesture.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startedAt: performance.now(),
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    setDragOffset(0);
  };

  const moveGesture = (event) => {
    if (gesture.current?.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - gesture.current.startX;
    const deltaY = event.clientY - gesture.current.startY;
    if (Math.abs(deltaY) > Math.abs(deltaX)) return;
    setDragOffset(Math.max(-140, Math.min(140, deltaX)));
  };

  const finishGesture = (event) => {
    if (gesture.current?.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - gesture.current.startX;
    const deltaY = event.clientY - gesture.current.startY;
    const elapsed = performance.now() - gesture.current.startedAt;
    const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
    const passedThreshold = Math.abs(deltaX) >= 50 || (elapsed < 300 && Math.abs(deltaX) >= 25);

    if (isHorizontal && passedThreshold) change(deltaX < 0 ? 1 : -1);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    gesture.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const cancelGesture = () => {
    gesture.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <div className={`project-carousel tone-${tone} ${isDragging ? 'is-dragging' : ''}`} tabIndex={0} onKeyDown={(event) => {
      if (event.key === 'ArrowLeft') change(-1);
      if (event.key === 'ArrowRight') change(1);
    }} aria-label={`${project} image carousel`}>
      <div
        className="carousel-stage"
        onPointerDown={startGesture}
        onPointerMove={moveGesture}
        onPointerUp={finishGesture}
        onPointerCancel={cancelGesture}
      >
        {slides.map((slide, index) => {
          const image = projectImages[tone]?.[index];
          let offset = index - current;
          if (offset > slides.length / 2) offset -= slides.length;
          if (offset < -slides.length / 2) offset += slides.length;
          const style = {
            '--slide-x': `${offset * 66}%`,
            '--drag-x': `${dragOffset}px`,
            '--slide-scale': offset === 0 ? 1 : .82,
            '--slide-rotate': `${offset * 2.5}deg`,
            zIndex: offset === 0 ? 3 : 2,
            opacity: Math.abs(offset) > 1 ? 0 : 1,
          };

          return (
            <div className={`carousel-slide ${offset === 0 ? 'is-active' : ''}`} style={style} key={slide} aria-hidden={offset !== 0}>
              {image ? (
                <img
                  className="carousel-image"
                  src={image}
                  alt={`${project} — ${slide}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  draggable="false"
                />
              ) : (
                <>
                  <div className="placeholder-meta"><span>{project}</span><span>0{index + 1}</span></div>
                  <div className="placeholder-mark"><span>IMAGE</span><strong>PLACEHOLDER</strong></div>
                  <div className="placeholder-ui"><i /><i /><i /></div>
                  <p>{slide}</p>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="carousel-controls">
        <button type="button" onClick={() => change(-1)} aria-label="Previous image">←</button>
        <div className="carousel-dots" aria-label={`Image ${current + 1} of ${slides.length}`}>
          {slides.map((slide, index) => <button type="button" aria-label={`Show ${slide}`} aria-current={index === current} className={index === current ? 'is-active' : ''} onClick={() => setCurrent(index)} key={slide} />)}
        </div>
        <button type="button" onClick={() => change(1)} aria-label="Next image">→</button>
      </div>
    </div>
  );
}
