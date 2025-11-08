import 'vant/lib/index.css'
import './style.css'
import { createApp } from 'vue'
import {
  Col,
  Row,
  Collapse,
  CollapseItem,
  Field,
  Button,
  Icon,
  Checkbox,
  RadioGroup,
  Radio
} from 'vant'
import App from './App.vue'
import i18n from './i18n'

const app = createApp(App)
app.use(i18n)
app.use(Col)
app.use(Row)
app.use(Collapse)
app.use(CollapseItem)
app.use(Field)
app.use(Button)
app.use(Icon)
app.use(Checkbox)
app.use(RadioGroup)
app.use(Radio)
app.mount('#theme-builder-app')
