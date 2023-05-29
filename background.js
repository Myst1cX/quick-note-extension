chrome.commands.onCommand.addListener(function(command) {
  if (command === 'save-note') {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getSelection' }, function(response) {
        if (response && response.selection) {
          var noteContent = response.selection.trim();
          if (noteContent) {
            chrome.storage.local.get(['notes'], function(result) {
              var notes = result.notes || [];

              var note = {
                title: 'Quick Note',
                content: noteContent,
                tags: [],
                timestamp: new Date().getTime()
              };

              notes.push(note);

              chrome.storage.local.set({ notes: notes }, function() {
                // Optional: You can show a success message or provide feedback to the user here.
              });
            });
          }
        }
      });
    });
  }
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: 'contextMenu',
    title: 'Save selected text as note',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === 'contextMenu') {
    var noteContent = info.selectionText.trim();
    if (noteContent) {
      chrome.storage.local.get(['notes'], function(result) {
        var notes = result.notes || [];

        var note = {
          title: 'Quick Note',
          content: noteContent,
          tags: [],
          timestamp: new Date().getTime()
        };

        notes.push(note);

        chrome.storage.local.set({ notes: notes }, function() {
          // Optional: You can show a success message or provide feedback to the user here.
        });
      });
    }
  }
});
