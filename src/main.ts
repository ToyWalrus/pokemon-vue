import { createApp } from 'vue'
import Tutorial from './Tutorial/Tutorial.vue'
import TypeTag from './components/TypeTag.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import './main.css'

const app = createApp(Tutorial)

app.component('TypeTag', TypeTag)
app.component('LoadingSpinner', LoadingSpinner)

app.mount('#app')
