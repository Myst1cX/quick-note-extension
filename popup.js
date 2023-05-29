document.addEventListener('DOMContentLoaded', function () {
  const noteTitle = document.getElementById('note-title');
  const noteContent = document.getElementById('note-content');
  const noteTags = document.getElementById('note-tags');
  const saveButton = document.getElementById('save-button');
  const clearButton = document.getElementById('clear-button');
  const noteList = document.getElementById('note-list');
  const searchInput = document.getElementById('search-input');

  let editIndex = -1;

  // Retrieve the saved window width from storage
  chrome.storage.local.get(['windowWidth'], function (result) {
    const windowWidth = result.windowWidth;
    if (windowWidth) {
      // Apply the saved width to the extension window
      document.documentElement.style.width = windowWidth + 'px';
    }
  });

  // Handle the click event of the "Save Note" button
  saveButton.addEventListener('click', function () {
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();
    const tags = noteTags.value.trim().split(',');

    if (title && content) {
      chrome.storage.local.get(['notes'], function (result) {
        const notes = result.notes || [];

        const note = {
          title: title,
          content: content,
          tags: tags,
          timestamp: new Date().getTime(),
        };

        if (editIndex >= 0) {
          // Edit existing note
          notes[editIndex] = note;
          editIndex = -1;
        } else {
          // Add new note
          notes.push(note);
        }

        chrome.storage.local.set({ notes: notes }, function () {
          renderNotes(notes);
          noteTitle.value = '';
          noteContent.value = '';
          noteTags.value = '';
        });
      });
    }
  });

// Handle the click event of the "Clear Note" button
clearButton.addEventListener('click', function () {
  noteTitle.value = '';
  noteContent.value = '';
  noteTags.value = '';
});

  function renderNotes(notes) {
  noteList.innerHTML = '';

  if (notes.length === 0) {
    noteList.innerHTML = '<li>No notes available</li>';
  } else {
    notes.sort((a, b) => b.timestamp - a.timestamp);

    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      const listItem = document.createElement('li');
      listItem.classList.add(
        'border',
        'border-gray-300',
        'p-4',
        'mb-4',
        'flex',
        'flex-col',
        'rounded-lg'
      );

      const noteTitle = document.createElement('span');
      noteTitle.classList.add('font-bold', 'mr-2');
      noteTitle.textContent = note.title;
      listItem.appendChild(noteTitle);

      const noteContent = document.createElement('span');
      noteContent.classList.add('text-gray-600');
      noteContent.textContent = note.content;
      noteContent.style.display = 'none';
      listItem.appendChild(noteContent);

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
        editNote(note);
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
  deleteNote(note);
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
        noteContent.style.display = 'block';
      } else {
        noteContent.style.display = 'none';
      }
    }
  }
}



   function editNote(note) {
    noteTitle.value = note.title;
    noteContent.value = note.content;
    noteTags.value = note.tags.join(',');
  }


  function deleteNote(note) {
  chrome.storage.local.get(['notes'], function (result) {
    const notes = result.notes || [];

    const index = notes.findIndex((n) => n.timestamp === note.timestamp);

    if (index >= 0) {
      notes.splice(index, 1);

      chrome.storage.local.set({ notes: notes }, function () {
        renderNotes(notes);
      });
    }
  });
}


  // Handle window resize event
  window.addEventListener('resize', function () {
    // Save the current window width to storage
    const windowWidth = document.documentElement.offsetWidth;
    chrome.storage.local.set({ windowWidth: windowWidth });
  });

  function isTextSelected() {
    const selection = window.getSelection();
    return selection && selection.toString().length > 0;
  }

  // Handle search input change event
  searchInput.addEventListener('input', function (event) {
    const searchQuery = event.target.value.toLowerCase();
    chrome.storage.local.get(['notes'], function (result) {
      const notes = result.notes || [];
      const filteredNotes = notes.filter(function (note) {
        // Check if the search query matches the note title, content, or tags
        return (
          note.title.toLowerCase().includes(searchQuery) ||
          note.content.toLowerCase().includes(searchQuery) ||
          note.tags.some(function (tag) {
            return tag.toLowerCase().includes(searchQuery);
          })
        );
      });
      renderNotes(filteredNotes);
    });
  });

  chrome.storage.local.get(['notes'], function (result) {
    const notes = result.notes || [];
    renderNotes(notes);
  });
});
