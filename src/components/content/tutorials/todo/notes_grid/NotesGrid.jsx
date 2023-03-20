import React from "react";
import Note from "../note/Note.jsx";
import "./NotesGrid.scss";

export default function NotesGrid({notes}) {
    // when mounted must try to load notes from IndexDb
    // 

    return (
      <div className="NotesGrid">
          {notes.length > 0 ? notes.map(note => 
              <Note key={note.id} note={note}/>
          ) : <div>No notes added yet, change this to something more informative.</div>}
      </div>
    );
}
