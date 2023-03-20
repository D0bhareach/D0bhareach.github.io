import './Controllers.scss';
// toggleAddNew - toggles boolean flag in Todo for conditional rendering of elements
export default function Controllers({toggleAddNew, sections}) {
    const search_options = [
        "Text",
        "Exact creation date",
        "All created before",
        "All created after",
        "Exact editing date",
        "All edited before",
        "All edited after",

    ];
    const searchType = "text" || "date";
return (
<form className="controllers">
    <div className="labeled-input search-holder"> 
    <label htmlFor="srch">Search Notes</label>
    <input className="search-input" type={searchType} placeholder="" name="srch"></input>
    </div>

    <div className="labeled-input section-holder"> 
    <label htmlFor="sct">Select Note's Group</label>
    <select className="section-input" name="sct" defaultValue={sections[0]}>
        {
            sections.map((section, inx) => inx === 0 ?
                <option key={inx} value={section}>{section}</option> :
            <option  key={inx} value={section}>{section}</option>)
        }
    </select>
    </div>

    <div className="labeled-input search-options-holder"> 
    <label htmlFor="search-options">Search By:</label>
    <select className="search-options-input" defaultValue={search_options[0]}>
        {
            search_options.map((opt, inx) => inx === 0 ?
                <option key={inx} value={opt}>{opt}</option> :
            <option  key={inx} value={opt}>{opt}</option>)
        }
    </select>
    </div>

    <div className="button-holder">
    <button type="button" className="todo-btn">Reset</button>
    <button type="button" className="todo-btn" onClick={toggleAddNew}>Add Note</button>
    </div>
</form>
);
}
