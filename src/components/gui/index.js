import DatGui from "./gui";

DatGui.install = function(Vue) {
  Vue.component(DatGui.name, DatGui);
};

export default DatGui;
