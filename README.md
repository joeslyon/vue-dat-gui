# vue-dat-gui

> Vuejs dat.gui

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Usage

> refer to *index.html*

``` html
<dat-gui closeText="OpenControl" openText="Close">
    <dat-button @click="func">button1</dat-button>
    <dat-string v-model="stringTxt">string</dat-string>
    <dat-number :max="max" :min="min" :step="step" v-model="num">number</dat-number>
    <dat-folder title="color-folder">
        <dat-color v-model="color1">color1</dat-color>
        <dat-color v-model="color2">color2</dat-color>
        <dat-color v-model="color3">color3</dat-color>
        <dat-color v-model="color4">color4</dat-color>
    </dat-folder>
    <dat-folder title="another-folder" closed>
        <dat-boolean v-model="show">checkbox test1</dat-boolean>
        <dat-select v-model="selected" :items="items">list2</dat-select>
        <dat-folder title="child-folder">
        <dat-button @click="func">button2</dat-button>
        <dat-string v-model="stringTxt">string2</dat-string>
        <dat-number :max="max" :min="min" :step="step" v-model="num">number2</dat-number>
        </dat-folder>
    </dat-folder>
    <dat-boolean v-model="show">checkbox test2</dat-boolean>
    <dat-select v-model="selected" :items="items">list3</dat-select>
</dat-gui>
```

``` js
    let vm = new Vue({
      el: '#app',
      template: '#demo',
      data() {
        return {
          stringTxt: "vue-dat-gui",
          show: true,
          num: 12,
          max: 15,
          min: 1,
          step: 3,
          color1: "#ff0",
          color2: "rgb(123,123,216)",
          color3: [0, 128, 255, 0.3],
          color4: { h: 350, s: 0.9, v: 0.3 },
          selected: "2333333",
          items: ["1", "2", "2333333", "1433223"],
          consoleTxt: "clicked"
        };
      },
      computed: {
        color4String() {
          return JSON.stringify(this.color4);
        }
      },
      methods: {
        func() {
          alert(this.consoleTxt);
        }
      }
    })
```


## Reference

- [Dat.gui](https://github.com/dataarts/dat.gui)
- [React-dat-gui](https://github.com/claus/react-dat-gui)
