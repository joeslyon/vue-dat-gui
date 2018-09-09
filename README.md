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


## Reference

- [Dat.gui](https://github.com/dataarts/dat.gui)
- [React-dat-gui](https://github.com/claus/react-dat-gui)
