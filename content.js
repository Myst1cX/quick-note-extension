chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getSelection') {
    var selection = window.getSelection().toString();
    sendResponse({ selection: selection });
  }
});
