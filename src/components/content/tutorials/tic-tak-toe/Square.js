import React from "react";
// import PropTypes from "prop-types";

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick(this.props.index);
  }
  render() {
      const class_name = this.props.showHistory ? "game__board__square show-history" : "game__board__square";
    return (
      <button
        className={class_name}
        onClick={this.handleClick}
        style={{ color: this.props.squareStyle }}
      >
        {this.props.value}
      </button>
    );
  }
}

// Square.PropTypes = {
//   index: PropTypes.number,
//   value: PropTypes.string,
//   style: PropTypes.string,
//   onClick: PropTypes.func
// };
