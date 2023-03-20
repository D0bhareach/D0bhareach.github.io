import './create_new_note.scss';
import React, {useState, useRef} from 'react';

// toggleAddNew - toggles boolean flag in Todo for conditional rendering of elements
export default function CreateNewNote({toggleAddNew, sections, addNewSection}){


    const newSectionInput = useRef();
    const newSectionSelect = useRef();

    // this is boolean for showing either select or input text for sections.
    const [addSection, setAddSection] = useState(false);
    // what section is active
    const [defaultSectionIdx, setDefaultSectionIdx] = useState(0);
    const [sectionInputValue, setSectionInputValue] = useState("All");
    const groupBtnText = addSection ? 'Save Group': 'New Group';
    const groupLabelText =  addSection ? "Add new Note's Group": "Select Note's Group" ;

    const handleGroupBtn = () => {
        // add logic depending on the state save or toggle.
        // when section added load new sections and set defaut value
        if(!addSection){
            // run when open section to add 
        } else {
            // run while section is opened.
            // console.log(`${newSectionInput.current.value}`);
            if(sectionInputValue.length && sectionInputValue !== "All"){
               addNewSection(sectionInputValue);
                console.log(` called addNewSection in NewNote, value: ${sectionInputValue}`);
            // setDefaultSectionIdx(2);
            // search index of newly added section and set default.
            } else {
                setDefaultSectionIdx(0);

            }
        }
        setAddSection(!addSection);    
    }

    const handleSaveBtn = () => {
        // console.log(`${newSectionSelect.current.className}`);
        if(newSectionSelect.current.value == "All"){
            window.alert("Select Group or create new one.")
        }
    }

    const handleCancelAddGroup = () => {
        setAddSection(false);
        setDefaultSectionIdx(0);
    }

    const handleSectionInputChange = (e)=>{
        setSectionInputValue(e.target.value);
    }

    const groupDivClass = addSection ? "labeled-input note-group adding-group" :
        "labeled-input note-group";
        // add key listener for enter on enter save new group
    return (
        <div className="create-new-note note-title">
    <div className="labeled-input"> 
    <label htmlFor="titl">Note Title</label>
    <input className="create-new-note__title" type="text" placeholder="" name="titl"></input>
    </div>

    <div className={groupDivClass}> 
    <label htmlFor="sect">{groupLabelText}</label>
        {addSection ?
        (
            <>
            <input
            autoFocus={addSection}
            ref={newSectionInput}
            className="create-new-note__section"
            type="text" placeholder="" name="sect"
            onChange={handleSectionInputChange}></input>
            <button type="button" onClick={handleCancelAddGroup}>Cancel</button>
            </>
        ):
        (<select
            ref={newSectionSelect}
            className="create-new-note__section"
            id="group-section"
            name="sect" defaultValue={sections[defaultSectionIdx]}>
            
        {
            sections.map((section, inx) => inx === 0 ?
                <option key={inx} value={section}>{section}</option> :
            <option  key={inx} value={section}>{section}</option>)
        }
    </select>)}
    </div>

    
    <div className="labeled-input note-textarea"> 
    <label htmlFor="note-area">Note's Text</label>
    <textarea
        className="create-new-note__textarea"
        name="note-area"
        rows="4"
        maxLength="1000"
        wrap="hard"
        spellCheck="true"
        lang="en">

    </textarea>
    </div>

    <button
        type="button"
        className="todo-btn new-btn"
        onClick={handleGroupBtn}
        >{groupBtnText}</button>
    <button type="button" className="todo-btn save-btn" onClick={handleSaveBtn}>Save Note</button>
    <button type="button" className="todo-btn cancel-btn" onClick={toggleAddNew}>Cancel</button>
        </div>
    );
}
