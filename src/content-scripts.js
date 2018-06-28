chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { id, data } = message
  console.log(message)
  if (id === 'select') {
    document.querySelector('#new_comment_field').value += data;
  }
});
