import { createApp } from 'vue'
import { Col, Row } from 'vant'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.use(Col)
app.use(Row)
app.mount('#app')
