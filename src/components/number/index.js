import DatNumber from "./number";

DatNumber.install = function(Vue) {
  Vue.component(DatNumber.name, DatNumber);
};

export default DatNumber;
