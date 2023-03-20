import {openDB} from 'idb';
const DB_NAME = "todo_notes_db";
// :wconst DB_SECTIONS_TABLE = "todo_notes_sections";
let db = null;

// get database
// get transaction
// get cursor


// get all notes
// get delete one note
// upgrade one note

// get all by something.
// sort all by something
// default sorting is by id
// add new table / section
// get all from section
// find somethinng in section
/*'
 note = {
    id: 0,
    text: '',
    createdAt: Number,
    modified: Array<Number>(),
    active: true,
 }
    */

// Must have special table sections where all sections are saved
// get all sections sorted by creation time
// When db opened for the first time it must create section all 'All'
// when section all is chosen get all notes method shall return sum of all
// arrays from methods get all from section and sort result by date, most
// recent first.


// add section.
// Need window to manage all sections. Add / Delete, Rename (objectStore.put).
// This is inner API changes global db.
// async function getDb() {
//     console.log(` get db is called`);
//     if (db) {
//         console.log(` db is not null`);
//         return db;
//     } else {
//         console.log(` db is null in get db`);
//         const openRequest = window.indexedDB.open(DB_NAME);
//         openRequest.addEventListener('error', () => {
//             console.error('Database failed to open')
//             throw new Error(`Error during opening ${DB_NAME}`);
//         });
//         openRequest.addEventListener('success', () => {
//             const db = openRequest.result;
//             return db;
//         });
//         openRequest.onupgradeneeded = (event) => {
//             const db = openRequest.result;
//             const tables = db.objectStoreNames;
//             console.log(` upgrade event is happened version: ${db.version}`);
//             // TODO: Must return new db? Call recursive.
//             // all updates are going to happen in table create update db function.
//             if (tables.length == 0) {return} 
//             console.log(`On upgrade needed is called while simple getDb.`);}
//     }
// }
// 
// change database use upgrade callback to run in upgradeneeded event.
// This is inner API changes global db.
async function upgradeDb(upgrade) {

    const version = await getVersion();
    console.log(` got to version: ${version}`);

    // re-open db to with new version to trigger upgrade
    const openUpgradeRequest = window.indexedDB.open(DB_NAME, version);
    console.log(`openUpgradeRequest ${openUpgradeRequest.readyState}`);

    openUpgradeRequest.addEventListener('upgradeneeded', async (e) => {

        const db = e.target.result;
        console.log(` run upgradeneeded, db.version:  ${db.version}`);
        await upgrade(db);
        return db;
    }

    );

    openUpgradeRequest.addEventListener('error', () => {
        throw new Error(`Error during opening ${DB_NAME}`);
    });

    openUpgradeRequest.addEventListener('success', () => {
        return openUpgradeRequest.result;
    });
}


async function getVersion(){
    // open db
    let res = 0;
    try{
    const db = await openDB(DB_NAME);
    res = db.version;
    } catch (e) {
        throw new Error(`Error while getting current version. Error: ${e}`)
    }
    return res;
        // get version or db
    // promise
    //return new Promise((resolve) => {
    //const openRequest = window.indexedDB.open(DB_NAME);
    //// not sure if event is available onerror.
    //openRequest.onerorr = (event) => {throw new Error(`Error while current version.`) };
    //openRequest.onsuccess = (event) => {
    //const db = openRequest.result;
    //let version = db.version;
    //version = (version === undefined || version === '') ? 0 : version + 1;
    //    // console.log(` version in getVersion: ${version}`);
    //resolve(version);
    //};
    //openRequest.onupgradeneeded = (event) => {
    //    throw new Error(`Error getting version, onupgradeneeded has been called.`);};

    //})}
    }


// add new table - objectStore to IdB
// this method is inner API it's going to be called from inside wrapper funictions.
export async function addNewTable(name) {
    let version = 0;
    try{
    const db = await openDB(DB_NAME);
    version = db.version;
    } catch (e) {
        throw new Error(`Error while getting current version. Error: ${e}`)
    }

    if (version == 0) {
        throw new Error(`IndexedDb version error. It can not be ${version}`);
    }
    const new_version = version + 1;
    
        



    const newDb = await upgradeDb(async (cdb) => {
        let objectStore;
        try {
    objectStore = await cdb.createObjectStore(name,
    { keyPath: 'id', autoIncrement:true });
            console.log(`tried to create objectStore to add new section`);
        } catch (err) {
            // catch the same name error.
            if (err.message.toLowerCase().includes(`object store`)
                && err.message.includes(`already exists`)){
                alert(`Group name '${name}' is already in use.`);
                return;
            } else {
                console.error(`Error updateDb: ${err.message}`);
            }
        }
        // TODO:When error is caught app returns to the state as if it was success.
    

        if(objectStore) {
    objectStore.createIndex('text', 'text', { unique: false }); // main tex of note
            console.log(` index text done`);
    objectStore.createIndex('created', 'created', { unique: false }); // timestamp
            console.log(` index created done`);
    objectStore.createIndex('modified', 'modified', { unique: false }); // Array<timestamp>
            console.log(` index modified done`);
    objectStore.createIndex('active', 'active', { unique: false }); // boolean
            console.log(` index active done`);
     } else {
        console.log(`object Store is not ready yet.`);
    }

    });
    if (newDb) {
    console.log(` this must to be printed after all indexes`);
        console.log(` sections: ${newDb.objectStoreNames}`);
    db = newDb;
    }
    // return newDb;
}

// may be easyer solution is to add devault value each time  objectStoreNames are returning.
// add default section All.
// async function addDefaultSection(){}


// Api

// return list of objectStore / tables of Db.
export async function getTables(){
    const res = [];
    const db = await openDB(DB_NAME);
    if (db) {
    const tables = db.objectStoreNames;
    res.push(...tables);
}
    return res;
}

export async function getAllFromTable(table) {
    const res = [];
    const db = await openDB(DB_NAME);
  const transaction = db.transaction([table], 'readwrite');
  const objectStore = transaction.objectStore(table);
  const cursor = objectStore.openCursor();
    cursor.onsuccess = (event) => {
        // local cursor 
    const cursor = event.target.result;

    while (cursor) {
        const note = {
            text: cursor.value.text || '',
            created: cursor.value.created || 0,
            modified: cursor.value.modified || [],
            active: cursor.value.active || true,
        };
        res.push(note);
        cursor.continue();
    }
        return res;
    };

    cursor.onerror = (event) => {throw new Error(`Cursor error. Can not get notes. `)};
}


export async function getAllNotes(){
    const res = [];
    const db = await openDB(DB_NAME);
    if (db) {
    const tables = db.objectStoreNames;
    for (const table of tables) {
        const notes = getAllFromTable(table);
        res.push(notes);
    }
}
// there were plans to sort this result. for now return as it's.
    return res;
}

// add one note to specific section.
// note argument is object holding section and text values.
export async function addNote(note){
    const newNote = {
    text: note.text,
    createdAt: Date.now(),
    modified: [],
    active: true,
    }

    const db = await openDB(DB_NAME);
    const transaction = db.transaction([note.section], 'readwrite');
    const objectStore = transaction.objectStore(note.section);
    const addRequest = objectStore.add(newNote);

    addRequest.addEventListener('success', () => {
        return true;
    });

    transaction.addEventListener('complete', () => {
    console.log('Transaction completed: new note added.');
    });

    transaction.addEventListener('error', () => {
        console.log('Transaction not opened due to error');
        throw new Error("Error adding new note");
    });
}

// get transaction
// get cursor


// get all notes
// get delete one note
// upgrade one note

// get all by something.
// sort all by something
// default sorting is by id
// add new table / section
// get all from section
// find somethinng in section

// Define the addData() function form on submit handler.
/*
function addData(e) {
  // prevent default - we don't want the form to submit in the conventional way
  e.preventDefault();

  // grab the values entered int  the form fields and store them in an object ready for being inserted into the DB
  const newItem = { title: titleInput.value, body: bodyInput.value };

  // open a read/write db transaction, ready for adding the data
  const transaction = db.transaction(['notes_os'], 'readwrite');

  // call an object store that's already been added to the database
  const objectStore = transaction.objectStore('notes_os');

  // Make a request to add our newItem object to the object store
  const addRequest = objectStore.add(newItem);

  addRequest.addEventListener('success', () => {
    // Clear the form, ready for adding the next entry
    titleInput.value = '';
    bodyInput.value = '';
  });

  // Report on the success of the transaction completing, when everything is done
  transaction.addEventListener('complete', () => {
    console.log('Transaction completed: database modification finished.');

    // update the display of data to show the newly added item, by running displayData() again.
    displayData();
  });

  transaction.addEventListener('error', () => console.log('Transaction not opened due to error'));
}

// Define the displayData() function
function displayData() {
  // Here we empty the contents of the list element each time the display is updated
  // If you didn't do this, you'd get duplicates listed each time a new note is added
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  // Open our object store and then get a cursor - which iterates through all the
  // different data items in the store
  const objectStore = db.transaction('notes_os').objectStore('notes_os');
  objectStore.openCursor().addEventListener('success', (e) => {
    // Get a reference to the cursor
    const cursor = e.target.result;

    // If there is still another data item to iterate through, keep running this code
    if (cursor) {
      // Create a list item, h3, and p to put each data item inside when displaying it
      // structure the HTML fragment, and append it inside the list
      const listItem = document.createElement('li');
      const h3 = document.createElement('h3');
      const para = document.createElement('p');

      listItem.appendChild(h3);
      listItem.appendChild(para);
      list.appendChild(listItem);

      // Put the data from the cursor inside the h3 and para
      h3.textContent = cursor.value.title;
      para.textContent = cursor.value.body;

      // Store the ID of the data item inside an attribute on the listItem, so we know
      // which item it corresponds to. This will be useful later when we want to delete items
      listItem.setAttribute('data-note-id', cursor.value.id);

      // Create a button and place it inside each listItem
      const deleteBtn = document.createElement('button');
      listItem.appendChild(deleteBtn);
      deleteBtn.textContent = 'Delete';

      // Set an event handler so that when the button is clicked, the deleteItem()
      // function is run
      deleteBtn.addEventListener('click', deleteItem);

      // Iterate to the next item in the cursor
      cursor.continue();
    } else {
      // Again, if list item is empty, display a 'No notes stored' message
      if (!list.firstChild) {
        const listItem = document.createElement('li');
        listItem.textContent = 'No notes stored.'
        list.appendChild(listItem);
      }
      // if there are no more cursor items to iterate through, say so
      console.log('Notes all displayed');
    }
  });
}

// Define the deleteItem() function
function deleteItem(e) {
  // retrieve the name of the task we want to delete. We need
  // to convert it to a number before trying to use it with IDB; IDB key
  // values are type-sensitive.
  const noteId = Number(e.target.parentNode.getAttribute('data-note-id'));

  // open a database transaction and delete the task, finding it using the id we retrieved above
  const transaction = db.transaction(['notes_os'], 'readwrite');
  const objectStore = transaction.objectStore('notes_os');
  const deleteRequest = objectStore.delete(noteId);

  // report that the data item has been deleted
  transaction.addEventListener('complete', () => {
    // delete the parent of the button
    // which is the list item, so it is no longer displayed
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    console.log(`Note ${noteId} deleted.`);

    // Again, if list item is empty, display a 'No notes stored' message
    if (!list.firstChild) {
      const listItem = document.createElement('li');
      listItem.textContent = 'No notes stored.';
      list.appendChild(listItem);
    }
  });
}
*/


