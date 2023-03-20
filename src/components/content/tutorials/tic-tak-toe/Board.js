import Square from "./Square";

export default function Board(props) {
  const renderSquare = (index) => {
    const styled = props.styled;
    let style = "Black";
    if (styled.length > 0 && styled[index]) {
      style = "LightGrey";
    }

    return (
      <Square
        index={index}
        value={props.squares[index]}
        onClick={props.onClick}
        showHistory={props.showHistory}
        squareStyle={style}
      />
    );
  }

    const class_name = props.showHistory ? "game__board show-history " : "game__board";
    return (
    <div className={class_name}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
      </div>
    );
}
