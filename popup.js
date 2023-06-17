document.addEventListener('DOMContentLoaded', function () {
  const noteTitle = document.getElementById('note-title');
  const noteContent = document.getElementById('note-content');
  const noteTags = document.getElementById('note-tags');
  const saveButton = document.getElementById('save-button');
  const clearButton = document.getElementById('clear-button');

  let isEditing = false; // Flag to track whether a note is being edited
  let editedNoteIndex = -1; // Index of the note being edited

  // Load the note data
  chrome.storage.local.get(['notes'], function (result) {
    const notes = result.notes || [];
    renderNotes(notes);
  });

// Render the notes
function renderNotes(notes) {
  const noteList = document.getElementById('note-list');
  noteList.innerHTML = '';

  if (notes.length === 0) {
    const noNotesMessage = document.createElement('p');
    noNotesMessage.textContent = 'No notes available';
    noteList.appendChild(noNotesMessage);
  } else {
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];

      const listItem = document.createElement('li');
      listItem.classList.add('note-item');

      const noteTitle = document.createElement('span');
      noteTitle.classList.add('font-bold', 'mr-2');
      noteTitle.textContent = note.title;
      listItem.appendChild(noteTitle);

      const noteContentWrapper = document.createElement('div');
      noteContentWrapper.classList.add('note-content-wrapper');
      listItem.appendChild(noteContentWrapper);

      const noteContent = document.createElement('span');
      noteContent.classList.add('text-gray-600');
      noteContent.textContent = note.content;
      noteContent.style.display = 'none';
      noteContentWrapper.appendChild(noteContent);

      if (note.tags.length > 0) {
        const noteTags = document.createElement('div');
        noteTags.classList.add('flex', 'flex-wrap', 'mb-2');
        listItem.appendChild(noteTags);

        for (let j = 0; j < note.tags.length; j++) {
          const tag = note.tags[j];
          const tagSpan = document.createElement('span');
          tagSpan.classList.add(
            'bg-blue-200',
            'text-blue-800',
            'px-2',
            'py-1',
            'rounded',
            'mr-1',
            'mb-1'
          );
          tagSpan.textContent = tag;
          noteTags.appendChild(tagSpan);
        }
      } else {
        const noteTags = document.createElement('div');
        noteTags.classList.add('mb-2');
        listItem.appendChild(noteTags);
      }

      // Handle the click event to toggle note content display
      listItem.addEventListener('click', function () {
        toggleNoteContent(listItem);
      });

      const editButton = document.createElement('button');
      editButton.classList.add(
        'ml-2',
        'py-1',
        'px-2',
        'bg-yellow-500',
        'text-white',
        'rounded'
      );
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', function () {
        editNoteForm(note, i);
      });
      listItem.appendChild(editButton);

      const deleteButton = document.createElement('button');
      deleteButton.classList.add(
        'ml-2',
        'py-1',
        'px-2',
        'bg-red-500',
        'text-white',
        'rounded'
      );
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function () {
        deleteNoteForm(i);
      });
      listItem.appendChild(deleteButton);

      noteList.appendChild(listItem);
    }
  }
}


  function toggleNoteContent(listItem) {
    const noteContent = listItem.querySelector('span:not(.font-bold)');

    if (noteContent) {
      if (!isTextSelected()) {
        if (noteContent.style.display === 'none') {
          noteContent.style.display = 'inline';
        } else {
          noteContent.style.display = 'none';
        }
      }
    }
  }

  function isTextSelected() {
    const selectedText = window.getSelection().toString();
    return selectedText.length > 0;
  }

  saveButton.addEventListener('click', function () {
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();
    const tags = noteTags.value.trim().split(',');

    if (!title && !content && !tags.length) {
      return;
    }

    chrome.storage.local.get(['notes'], function (result) {
      const notes = result.notes || [];

      if (isEditing && editedNoteIndex >= 0) {
        // If in editing mode, update the existing note
        if (editedNoteIndex < notes.length) {
          const editedNote = {
            title: title,
            content: content,
            tags: tags,
          };
          notes[editedNoteIndex] = editedNote;
        }
        isEditing = false;
        editedNoteIndex = -1;
      } else {
        // Otherwise, create a new note
        const newNote = {
          title: title,
          content: content,
          tags: tags,
        };
        notes.push(newNote);
      }

      // Save the updated notes
      chrome.storage.local.set({ notes: notes }, function () {
        // Clear the note form
        noteTitle.value = '';
        noteContent.value = '';
        noteTags.value = '';

        // Render the updated notes
        renderNotes(notes);
      });
    });
  });

  clearButton.addEventListener('click', function () {
    noteTitle.value = '';
    noteContent.value = '';
    noteTags.value = '';
  });

  function editNoteForm(note, index) {
    noteTitle.value = note.title;
    noteContent.value = note.content;
    noteTags.value = note.tags.join(',');

    isEditing = true;
    editedNoteIndex = index;
  }

  function deleteNoteForm(index) {
    chrome.storage.local.get(['notes'], function (result) {
      const notes = result.notes || [];

      if (index >= 0 && index < notes.length) {
        notes.splice(index, 1);
      }

      // Save the updated notes
      chrome.storage.local.set({ notes: notes }, function () {
        // Render the updated notes
        renderNotes(notes);
      });
    });
  }
});
