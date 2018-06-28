import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './components/App'
import './assets/icon48.png'

Vue.use(Vuetify)

new Vue({ // eslint-disable-line no-new
  el: '#app',
  components: { App },
  template: '<App />'
})
