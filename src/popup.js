import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './components/App'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  components: { App },
  template: '<App />',
  vuetify: new Vuetify()
})
