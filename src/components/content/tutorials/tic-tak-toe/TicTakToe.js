import React from "react";
import Board from "./Board";
import "./tic_tak_toe.scss";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

const defaultState = {
  history: [].concat([Array(9).fill(null)]),
  xIsNext: true,
  styled: Array(9).fill(null),
  showHistory: false,
};

class TicTakToe extends React.Component {
  constructor() {
    super();
    this.state = defaultState;

    this.handleClick = this.handleClick.bind(this);
    this.handleRestartButton = this.handleRestartButton.bind(this);
    this.handleHistoryButton = this.handleHistoryButton.bind(this);
    this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
    this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
      this.handleHistoryUpdates = this.handleHistoryUpdates.bind(this);
  }


  handleClick(i) {
    const history = this.state.history;
    const squares = history[history.length - 1].slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([squares]),
      xIsNext: !this.state.xIsNext,
      styled: []
    });
  }

  jumpTo(step) {
    this.setState({
      xIsNext: step % 2,
      history: this.state.history.slice(0, step)
    });
    this.handleHistoryUpdates();
  }

  handleHistoryButton() {
    this.setState({
      showHistory: !this.state.showHistory && this.state.history.length > 1
    });
  }
 // util method to handle when all history is cleaned, but history holder div is still on
    // the screen.
    handleHistoryUpdates(){
        if(this.state.history.length === 2){
            this.setState({
                showHistory: false,
            });
        }
    }

  handleRestartButton() {
    this.setState(defaultState);
  }

  handleOnMouseOver(move) {
    const ind = this.state.styled;
    const history = this.state.history;
    const atPresent = history[history.length - 1];
    const before = history[move - 1];
    for (let i = 0; i < before.length; i++) {
      if (atPresent[i] !== before[i]) {
        ind[i] = 1;
      }
    }
    if (ind.length > 0) {
      this.setState({
        styled: ind
      });
    }
  }

  handleOnMouseOut() {
    this.setState({
      styled: []
    });
  }
  render() {
    const history = this.state.history;
    const round = history.length - 1;
    const current = history[round];

    const winner = calculateWinner(current);
    const styledArray = this.state.styled;
    const optionalText = <span className='text__optional'>move</span>;
    let status = winner ? `Winer is:  ${winner}` : (round === 9) ? `Draw` : 
        <span>Next {optionalText}: {`${this.state.xIsNext ? "X" : "O"}`}</span>;


      // history is array of nulls
    const moves = history.map((step, move) => {
        if (move) {
            return (<button
                key={step}
                className="game__history__button"
                onClick={() => this.jumpTo(move)}
                onMouseOver={() => this.handleOnMouseOver(move)}
                onMouseOut={this.handleOnMouseOut}>
              {`#${move} `}
            </button>);
      } else {
      return null;
      }
    });


    const game_status_class_name = this.state.showHistory ? "game__status show-history" : "game__status";
    const game_class_name = this.state.showHistory ? "game show-history" : "game";
    const history_button_text = this.state.showHistory ? "Hide History" : "Show History";

    // change visibility of history bock on the fly with style
    const gameHistoryStyle = {
        display: this.state.showHistory ? 'block' : 'none',
    }

    return (
      <div className={game_class_name}>
        <div className={game_status_class_name}>

            <p className="game__status__text">{status}</p>
            <button onClick={this.handleRestartButton}
                className="game__status__button button_new">
              New Game
            </button>

            <button onClick={this.handleHistoryButton}
                className="game__status__button button_show">
                {history_button_text}
            </button>

        </div>


            <Board
              squares={current}
              onClick={this.handleClick}
              showHistory = {this.state.showHistory}
              styled={styledArray}
            />

        <div className="game__history" style={gameHistoryStyle}>
          {/*<span className="game__history__legend">Game History:</span>*/}
            <div className="game__history__list">
                {moves}
            </div>
        </div>

      </div>
    );
  }
}
export default TicTakToe;
