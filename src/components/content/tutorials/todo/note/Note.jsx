import React, {useState} from "react";
import "./Note.scss";

export default function  Note(props) {
    // props: object holding NoteObject, handling functions, delete, 
    // change status, edit, open to read. Might need lesteners again
    // to close dropdow menu same as in navigation. Once clicked on
    // dropdow shall close. Note header is dropdow button.
    // const date = new Date();
    // const offset = date.getTimezoneOffset();
    const [showInfo, setShowInfo] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const toggleInfo = ()=> setShowInfo(!showInfo);
    const toggleMenu = ()=> setShowMenu(!showMenu);
    const formatDateTime = (milliseconds) => {
        const d = new Date(milliseconds);
        let day = d.getDate();
        day = day < 10 ? `0${day}` : day;
        let month = d.getMonth();
        month = month < 10 ? `0${month}` : month;
        let year = d.getFullYear();
        let hour = d.getHours();
        hour = hour < 10 ? `0${hour}` : hour;
        let minute = d.getMinutes();
        minute = minute < 10 ? `0${minute}` : minute;
        return `${day}.${month}.${year} ${hour}:${minute}`;
    }

    const noteInfoStyle = {
        display: showInfo ? "block" : "none",
    }
    return (
      <div className="Note">
        <div className="note__header" onClick={toggleInfo}>
        <span className="Note__title">Title {props.note.title}</span>
        <span className="Note__menu-button material-icons" onClick={toggleMenu}>
          more_vert
        </span>
        </div>
        
        <div className="note__info" style={noteInfoStyle}>
        <div className="Note__text">Info {props.note.info}</div>
            <div className="note__creation">Created at: {formatDateTime(props.note.created)}
            </div>
            <details className="note__modified"><summary>Modified at:</summary>
            {props.note.modified.map((time, idx)=><span key={idx} className="note__modified-time">
                {formatDateTime(time)}
            </span>)}
            </details>
        </div>
      </div>
    );
}

/*
 * Note must have a title, main text with information, two rows one for time of creation
 * one with dates of modification.
 * It shall have hidden buttons for edit(brings Note Component with loaded NoteObject),
 * delete. It must have a button to toggle status of note: done/active. Times when it
 * status is changing are times of modification too.
 * Note Object:
 * {
 *  id: Number,
 *  title: "string",
 *  info: string || null,
 *  status: default active || done,
 *  created: timestamp,
 *  modified: Array<timestamp>
 * }
 * */
