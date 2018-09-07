import DatBoolean from "./components/boolean";
import DatButton from "./components/button";
import DatColor from "./components/color";
import DatFolder from "./components/folder";
import DatNumber from "./components/number";
import DatSelect from "./components/select";
import DatString from "./components/string";
import DatGui from "./components/gui";

const components = [
  DatBoolean,
  DatButton,
  DatColor,
  DatFolder,
  DatNumber,
  DatSelect,
  DatString,
  DatGui
];

const install = function(Vue) {
  components.map(component => {
    component.install(Vue);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { install };
