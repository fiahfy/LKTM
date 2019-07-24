import browser from 'webextension-polyfill'

browser.runtime.onMessage.addListener((message) => {
  const { id, data } = message

  if (id === 'select') {
    document.querySelector('#new_comment_field').value += data
  }
})
