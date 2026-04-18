import { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import "./App.css";

function App() {
  const [points, setPoints] = useState([]);
  const [current, setCurrent] = useState(1);
  const [status, setStatus] = useState("idle");
  const [time, setTime] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [totalPoints, setTotalPoints] = useState(5);

  // generate points
  const generatePoints = (n) => {
    const size = 400;
    return Array.from({ length: n }, (_, i) => ({
      id: i + 1,
      x: Math.random() * (size - 40),
      y: Math.random() * (size - 40),
      visible: true,
    }));
  };

  const handleStart = () => {
    setPoints(generatePoints(totalPoints));
    setCurrent(1);
    setStatus("playing");
    setTime(0);
  };

  const handleRestart = () => {
    handleStart();
  };

  const handleClick = (id) => {
    if (status !== "playing") return;

    if (id !== current) {
      setStatus("gameover");
      return;
    }

    setPoints((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, visible: false } : p
      )
    );

    setCurrent((c) => c + 1);
  };

  // check cleared
  useEffect(() => {
    if (status !== "playing") return;

    const allGone = points.length > 0 && points.every((p) => !p.visible);
    if (allGone) {
      setStatus("cleared");
    }
  }, [points, status]);

  // timer
  useEffect(() => {
    if (status !== "playing") return;

    const interval = setInterval(() => {
      setTime((t) => +(t + 0.1).toFixed(1));
    }, 100);

    return () => clearInterval(interval);
  }, [status]);

  // autoplay
  useEffect(() => {
    if (!autoPlay || status !== "playing") return;

    const next = points.find((p) => p.id === current && p.visible);

    if (next) {
      const t = setTimeout(() => {
        handleClick(next.id);
      }, 200);

      return () => clearTimeout(t);
    }
  }, [autoPlay, current, points, status]);

  return (
    <div className="app">
      <h2>LET'S PLAY</h2>

      <div>
        Points:{" "}
        <input
          type="number"
          value={totalPoints}
          onChange={(e) => setTotalPoints(+e.target.value)}
          // disabled={status === "playing"} // đang chơi thì không cho sửa
        />
      </div>

      <div>Time: {time}s</div>

      {/* 👉 Chỉ hiện PLAY khi chưa chơi */}
      {status === "idle" && (
        <button onClick={handleStart}>Play</button>
      )}

      {/* 👉 Sau khi bấm play thì hiện các nút này */}
      {status !== "idle" && (
        <>
          <button onClick={handleRestart}>Restart</button>

          {status === "playing" && (
            <button onClick={() => setAutoPlay((a) => !a)}>
              Auto Play {autoPlay ? "ON" : "OFF"}
            </button>
          )}
        </>
      )}

      {status === "gameover" && <h3>GAME OVER</h3>}
      {status === "cleared" && <h3>ALL CLEARED</h3>}

      <GameBoard points={points} onClick={handleClick} />

      {status === "playing" && <div>Next: {current}</div>}
    </div>
  );
}

export default App;