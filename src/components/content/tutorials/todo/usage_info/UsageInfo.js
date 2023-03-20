import './usage_info.scss';

export default function UsageInfo() {
return (
   <div className="usage-info">

    <section className="usage-info__section">
        <h3 className="usage-info__section__title">Begin to work.</h3>
        <p className="usage-info__section__text">
    At first when you start this application for the first time there is no
    data present, so press 'Add New' button and start to add data. Don't forget
    to add new data title. All notes must belong to some title.
    </p>
    </section>

    <section className="usage-info__section">
        <h3 className="usage-info__section__title">Creating a new Note.</h3>
        <p className="usage-info__section__text">
    When application is started for the firs time there are no titles for notes.
    First thing when creating a note check title, choose one available if it does
    suites your needs or create new title and choos it to use as a new title for
    group of notes. Then add small description title for the note, add note text
    and press 'Add' button.
        </p>
    </section>

    <section className="usage-info__section">
        <h3 className="usage-info__section__title">Notes Management.</h3>
        <p className="usage-info__section__text">
    You can create, edit or delete your notes. This functionality user can access
    by pressing button on the right hand side of section with note's title.
    I use choose to delete note it will be done without further ado, this app will
    not mimic some operating system which will ask you: "Are you sure?". Deletion
    is quick and irreversible.
        </p>
    </section>

    <section className="usage-info__section">
        <h3 className="usage-info__section__title">Search Note.</h3>
        <p className="usage-info__section__text">
    Notes can be found by text in it either in title or in main note text, by creation
    and modificatoin dates. Selection can be narrowed by choosing title of the group
    from dropdown list. When note is searched by date it's searching entering date and
    dates after. If you need to search more recent entries, simply enter the date which
    is further in the past.
        </p>
    </section>

    </div> 
);
}
/**
 * Usage info is shown if database is connected good but there are no
 * Notes to display. This component will brifly introduce user to app.
 * How to use it and how to operate with it.
 */
