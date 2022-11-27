import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Game extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="game" style={{ fontSize: "5vmin" }}>
          Chuanhai's APEX product will be here.. soon testing
        </div>
        {/*<div className="game" style={{ fontSize: "3vmin" }}>
          Time Remaining: 5
        </div>
        <div className="game">
          3
        </div>
        <div className="game">
          <button onClick={() => {

          }} style={{ fontSize: "5vmin" }}>Start New Game</button>
        </div>*/}
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
