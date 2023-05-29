import { createApp } from 'vue';
import Tutorial from './Tutorial/Tutorial.vue';
import TypeTag from './components/TypeTag.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import Icon from './components/Icon.vue';
import 'vue-material-design-icons/styles.css';
import './main.css';

const app = createApp(Tutorial);

app.component('TypeTag', TypeTag);
app.component('LoadingSpinner', LoadingSpinner);
app.component('Icon', Icon);

app.mount('#app');
