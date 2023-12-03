"use strict";

require("./assets/style.css");
var _App = _interopRequireDefault(require("./App.vue"));
var _vue = require("vue");
var _pinia = require("pinia");
var _mitt = _interopRequireDefault(require("mitt"));
var _router = _interopRequireDefault(require("./router"));
var _bootstrapVue = _interopRequireDefault(require("bootstrap-vue-3"));
require("bootstrap/dist/css/bootstrap.min.css");
require("bootstrap/dist/js/bootstrap.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var app = (0, _vue.createApp)(_App.default);
var emitter = (0, _mitt.default)();
app.provide("emitter", emitter);
app.use((0, _pinia.createPinia)());
app.use(_router.default);
app.use(_bootstrapVue.default);
app.mount("#app");