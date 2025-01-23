import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [cols, setCols] = useState(20);
  const [rows, setRows] = useState(15);
  const [waveWidth, setWaveWidth] = useState(5);
  const [wavePosition, setWavePosition] = useState(0);
  const [waveDirection, setWaveDirection] = useState(1);
  const [waveColors, setWaveColors] = useState([]);
  const [colorIndex, setColorIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(500);

  const baseColors = ["#00FF00", "#ADD8E6", "#0000FF", "#800080", "#A52A2A"];
  const waveHeight = rows;

  const generateGradient = (baseColor) => {
    const gradient = [];
    for (let i = 0; i < waveWidth; i++) {
      const opacity = (i + 1) / waveWidth;
      gradient.push(
        `${baseColor}${Math.floor(opacity * 255)
          .toString(16)
          .padStart(2, "0")}`
      );
    }
    return gradient;
  };

  useEffect(() => {
    setWaveColors(generateGradient(baseColors[colorIndex]));
  }, [colorIndex, waveWidth]);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % baseColors.length);
    }, 10000);

    return () => clearInterval(colorInterval);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const waveInterval = setInterval(() => {
      setWavePosition((prev) => {
        if (waveDirection === 1 && prev + waveWidth >= cols) {
          setWaveDirection(-1);
          return prev - 1;
        }
        if (waveDirection === -1 && prev <= 0) {
          setWaveDirection(1);
          return prev + 1;
        }
        return prev + waveDirection;
      });
    }, speed);

    return () => clearInterval(waveInterval);
  }, [waveDirection, waveWidth, cols, isPaused, speed]);

  const generateGrid = () => {
    return Array(rows)
      .fill(null)
      .map((_, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array(cols)
            .fill(null)
            .map((_, colIndex) => {
              const inWave =
                colIndex >= wavePosition &&
                colIndex < wavePosition + waveWidth &&
                rowIndex < waveHeight;
              const color = inWave
                ? waveColors[colIndex - wavePosition] || waveColors[0]
                : "#333";

              return (
                <div
                  key={colIndex}
                  className="cell"
                  style={{
                    backgroundColor: color,
                  }}
                ></div>
              );
            })}
        </div>
      ));
  };

  return (
    <div className="app-container">
      <div className="controls-container">
        <div>
          <h3>Wave Width</h3>
          <div className="controls">
            <button
              onClick={() => setWaveWidth((prev) => Math.max(1, prev - 1))}
              disabled={waveWidth <= 1}
            >
              -
            </button>
            <span>{waveWidth}</span>
            <button
              onClick={() => setWaveWidth((prev) => Math.min(cols, prev + 1))}
              disabled={waveWidth >= cols}
            >
              +
            </button>
          </div>
        </div>

        <div>
          <h3>Grid Rows</h3>
          <div className="controls">
            <button
              onClick={() => setRows((prev) => Math.max(1, prev - 1))}
              disabled={rows <= 1}
            >
              -
            </button>
            <span>{rows}</span>
            <button
              onClick={() => setRows((prev) => prev + 1)}
              disabled={rows >= 15}
            >
              +
            </button>
          </div>
        </div>

        <div>
          <h3>Grid Columns</h3>
          <div className="controls">
            <button
              onClick={() => setCols((prev) => Math.max(1, prev - 1))}
              disabled={cols <= 1}
            >
              -
            </button>
            <span>{cols}</span>
            <button
              onClick={() => setCols((prev) => prev + 1)}
              disabled={cols >= 20}
            >
              +
            </button>
          </div>
        </div>

        <div>
          <h3>Wave Speed</h3>
          <input
            type="range"
            min="100"
            max="1000"
            step="100"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
          />
          <span>{speed}ms</span>
        </div>

        <div>
          <h3>Animation Control</h3>
          <button onClick={() => setIsPaused((prev) => !prev)}>
            {isPaused ? "Play" : "Pause"}
          </button>
        </div>
      </div>
      <div className="container">{generateGrid()}</div>
    </div>
  );
};

export default App;
