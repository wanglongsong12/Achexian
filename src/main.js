// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
Vue.prototype.$ajax = axios
import router from './router'
import store from './store'

// domain
import domain from './domain.js'
Vue.use(domain)
Vue.prototype.domain=domain
// domain
// mint-ui
// import { Indicator,Swipe, SwipeItem,Toast } from 'mint-ui';
// Vue.component(Indicator.name, Indicator);
// Vue.component(Toast.name, Toast);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
// mint-ui
// ydui
import {DateTime} from 'vue-ydui/dist/lib.rem/datetime'
Vue.component(DateTime.name, DateTime)
import {ActionSheet} from 'vue-ydui/dist/lib.rem/actionsheet';
Vue.component(ActionSheet.name, ActionSheet);
// ydui
// element-ui
import {
  Radio,Button,RadioGroup,RadioButton,
  Input,Checkbox,CheckboxGroup,
  CheckboxButton,Popover,Table,Dropdown,
  DropdownMenu,DropdownItem,
  Select,Option,Collapse,CollapseItem
}from 'element-ui'
// 单选按钮
Vue.component(Radio.name, Radio);
Vue.component(Button.name, Button);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(RadioButton.name, RadioButton);
Vue.component(Input.name, Input);
Vue.component(CheckboxGroup.name, CheckboxGroup);
Vue.component(CheckboxButton.name, CheckboxButton);
Vue.component(Popover.name, Popover);
Vue.component(Table.name, Table);
Vue.component(Dropdown.name, Dropdown);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Collapse.name, Collapse);
Vue.component(CollapseItem.name, CollapseItem);
// Vue.use(Radio)
// Vue.use(RadioGroup)
// Vue.use(RadioButton)
// Vue.use(Popover)
// Vue.use(Table)
// Vue.use(Button)
// Vue.use(Dropdown)
// Vue.use(DropdownMenu)
// Vue.use(DropdownItem)
// Vue.use(Collapse)
// Vue.use(CollapseItem)
// Vue.use(Select)
// Vue.use(Input)
// Vue.use(Option)
// Vue.use(Checkbox)
// Vue.use(CheckboxGroup)
// Vue.use(CheckboxButton)
// element-ui
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
