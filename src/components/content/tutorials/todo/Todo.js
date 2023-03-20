import React, {useState, useEffect, useCallback} from "react";


import NotesGrid from "./notes_grid/NotesGrid";
import UsageInfo from "./usage_info/UsageInfo";
import CreateNewNote from "./create_new_note/CreateNewNote";
import Controllers from "./controllers/Controllers";
import {addNewTable, getTables, getAllNotes, addNote} from "./lib/notes_db";
import "./Todo.scss";

// in the place of Notes grid can be any of controllers UsageInfo, ErrorMessage, CreateNewNote.
// the conditional and are comming from user interaction or from error connecting to db.
//
    // <NotesGrid /> <UsageInfo />

// Need special module with all db related opearations
// Need special module with all array searching and sorting operations.
// Need property to store notes.
const Todo = () => {
    // boolean flag for conditional rendering of elements.
    const [addNew, setAddNew] = useState(false);
    // TEST NOTES
    const [notes, setNotes] = useState([]);
    const [sections, setSections] = useState([]);
    const [activeSection, setActiveSection] = useState("All");
    // END TEST NOTESJK
    const [db, setDb] = useState(null);
    const toggleAddNew = () => {
        setAddNew(!addNew);
    }
    



// Db handlers. Don't forget they all are async functions!
// https://devtrium.com/posts/async-functions-useeffect

    // add new secton to dropdown and create new table in db.
    const handleAddNewTable = async(table) => {
        // add table
        // console.log(` Adding table: ${table}`);
        await addNewTable(table);
        await handleGetTables();
    }
    // used to display sections on select dropdown.
    // TODO do not forget to Add default "All".

    const handleGetTables = async() => {
        const res = ["All"];
        const tables = await getTables();
        if (tables.length > 0) {
            res.push(...tables);
        }
        setSections(res);
    }
    // get all notes from db.
    const handleGetAllNotes = async() => {
        // check what section is active
        // get all notes from that section
        // if no active section All get all
        // set state
    }
    const handleAddNote = async(note) => {
        // add note
        // get all notes
        // set state
    }


// Effects and states used to change state of the component.
    // I need to get tables and notes when started
    // TODO need handler to set active section.
const fetchNotes = useCallback(async () => {
  const notes = await getAllNotes();
  setNotes(notes);
}, [])

// the useEffect is only there to call `fetchData` at the right time
    // TODO console.error is beautiful, but maybe may do something better
useEffect(() => {
  fetchNotes()
    .catch(console.error);
}, [fetchNotes])

const fetchSections = useCallback(async () => {
    // I have a ready solution here in the component.
  await handleGetTables();
}, [])

// the useEffect is only there to call `fetchData` at the right time
useEffect(() => {
  fetchSections()
    .catch(console.error);
}, [fetchSections])








    return (
  <div className="App">
        {/*<h2 className="App__header">Todo List</h2>*/}
        {
        addNew ? <CreateNewNote 
                toggleAddNew={toggleAddNew}
                addNewNote={handleAddNote}
                addNewSection={handleAddNewTable}
                sections={sections} /> :

                <Controllers toggleAddNew={toggleAddNew} sections={sections} />
        }
        {!addNew && <NotesGrid  notes={notes}/>}
    
    
    { /*<NoteEditorContainer />
    <NotesGridContainer />*/ }
  </div>
);}
export default Todo;
/*
 * Todo list must have sections / themes (work, shop, note, etc). It must have top section
 * with controlls. Controlls: CRUD for notes, search and filter and sort, must have
 * selection for sections. Must have controlls to add sections.
 * Then todo must have a table of rows with notes.
 *
 * Note must have: indication is it active,
 * expired, done. Must have main text, date it was created, and array of date and times
 * when it was edited. Must have some title?
 *
 * Will need redux state holder for whole component. 
 * By default search will search in all sections by text. If some specific section is selected
 * it will search only this section. Will need options to set search input box behavior
 * [exact date, less than date (including), older than date (including)], dates are: date
 * creation, date of editing. Direction of sorting: asc, desc. All controls must have
 * default settings. Must have reset to default button. What if I will bring all this to drop
 * down menu?
 * When app is droped down it shall search for all sections and dispalay 10 last created
 * if no there is no notes it shall show small intro how to use app.
 * If there is a misstace or any problem with connecting to IndexedDb it shall show 
 * message to user that this functionality is unavailable.
 * Info
 * Error
 * Create New components.
 * */


/*
    [
 {
  id: 1,
  title: "First note",
  info: "long bla bla ",
  status: "active",
  created: 1660283981430,
  modified: [1662283981430, 1662283981430,1662283981430,1662283981430]
 },
 {
  id: 2,
  title: "Nice title for nice note",
  info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  status: "active",
  created: 1660283981430,
  modified: [1662283981430, 1662283981430,1662283981430,1662283981430]
 },
 {
  id: 3,
  title: "Do it.",
  info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  status: "active",
  created: 1660283981430,
  modified: [1662283981430, 1662283981430,1662283981430,1662283981430]
 },
 {
  id: 4,
  title: "Out of ideas for titles.",
  info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  status: "active",
  created: 1660283981430,
  modified: [1662283981430, 1662283981430,1662283981430,1662283981430, 1662283981430, 1662283981430,1662283981430,1662283981430, 1662283981430, 1662283981430,1662283981430,1662283981430]
 },
    ]
    */
