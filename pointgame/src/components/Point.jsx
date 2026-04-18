import { memo } from "react";

function Point({ point, onClick }) {
  return (
    <div
      className="point"
      style={{
        transform: `translate(${point.x}px, ${point.y}px)`,
      }}
      onClick={() => onClick(point.id)}
    >
      {point.id}
    </div>
  );
}

export default memo(Point);