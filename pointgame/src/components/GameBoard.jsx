import Point from "./Point";

export default function GameBoard({ points, onClick }) {
  return (
    <div className="board">
      {points.map((p) =>
        p.visible ? (
          <Point key={p.id} point={p} onClick={onClick} />
        ) : null
      )}
    </div>
  );
}