import { connect } from "react-redux";
import NotesGrid from "./NotesGrid.jsx";

const mapStateToProps = state => {
  const notes = state.filter
    ? state.notes.filter(n => n.Color === state.filter)
    : state.notes;
  return {
    notes,
    filterColor: state.filterColor,
    state
  };
};

export default connect(mapStateToProps)(NotesGrid);
