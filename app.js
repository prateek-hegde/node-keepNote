const fs = require('fs');
const yargs = require('yargs');
const _ = require('lodash');

const notes = require('./notes.js');

const titleOptions = {
  describe : 'Title of note',
  demand : true,
  alias : 't'
};
const bodyOptions = {
  describe : 'Content of note',
  demand : true,
  alias : 'b'
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions,
  })
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .help()
  .argv;
var command  = argv._[0];

if(command === 'add'){
  var note = notes.addNote(argv.title, argv.body);
  if(note){
    console.log('Note created');
    notes.logNotes(note);
  } else {
    console.log('Title is already taken');
  }
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s)`);
  allNotes.forEach((note) => notes.logNotes(note));
} else if (command === 'read') {
  var note = notes.readNote(argv.title);
  if(note){
    console.log('Note found');
    notes.logNotes(note);
  } else {
    console.log('Note not found');
  }
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note removed' : 'Note not found';
  console.log(message);
} else {
  console.log('unknown command');
}
