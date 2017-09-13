**На русском**
* [Установка](#install)
* [Подключение](#сonnectivity)
* [Использование](#use)
    * [Просто блок](#block)
    * [Элемент блока](#element)
    * [Модификатор блока](#block-mode)
    * [Модификатор элемента](#element-mode)
* [Использование внутри Pug](#pug)
___
**In English**
___

# На русском

Минималистичный плагин, позволяющий прописывать bem-классы элементам компонентов через диррективу `v-bem`.

## Установка

* С помощью yarn: `yarn add v-bem`
* С помощю npm: `npm install v-bem`

## Подключение

```javascript
    import Vue from "vue";
    import vBEM from "v-bem";
    Vue.use(vBEM, {/*config*/});
```

#### config
Необязательный объект с параметрами, часть из которых соответствует списку [Alternative BEM syntax в b_](https://www.npmjs.com/package/b_) (В квадратных скобках указаны дефолтные значения).

* `elementSeparator`: разделитель между блоком и элементом [`"__"`].
* `modSeparator`: разделитель между элементом|блоком и модификатором [`"_"`].
* `modValueSeparator`: разделитель между именем модификатора и его значением [`"_"`].
* `blockPrefix`: префикс перед именеим блока [`""`].
* `elementKey`: ключ значения в объекте модификаторов, используемого как имя блока [`"__"`].
* `directiveName`: имя диррективы (без префикса `v-`) [`"bem"`].

## Использование

Исключительно внутри компонентов, посредством диррективы, указавнной в настройках (по умолчанию `v-bem`).

**Замечание**: во всех примерах ниже в качестве компонента используется `popup`, отсюда и имя блока `popup`.

### Просто блок

```vue
<template>
    <div v-bem></div>
</template>
```

```html
<div class="popup"></div>
```


### Элемент блока

#### Простейший случай

Указывается в качестве модификатора диррективы (в примере ниже это `element`). 

```vue
<template>
    <div v-bem.element></div>
</template>
```

```html
<div class="popup__element"></div>
```

#### Вычисляемое имя элемента

Имя переинной указывается в качестве аргумента диррективы. 

```vue
<template>
    <div v-bem:elem></div>
</template>
<script>
    module.exports = {
        computed: {
            elem(){
                return 'element-2';
            }
        },
    }
</script>
```

```html
<div class="popup__element-2"></div>
```

#### Через значение диррективы

Предусмотрен как резервный вариант. Имя блока нужно указать в объекте модификаторы с ключём, указанном в `elementKey` настроек (по умолчанию `__`).

```vue
<template>
    <div v-bem="{'__': 'element', active: true}"></div>
</template>
```

```html
<div class="popup__element popup__element_active"></div>
```

### Модификатор блока

Указывается в виде строки или объекта в значении диррективы.

```vue
<template>
    <div v-bem="'active'"></div>
</template>
```

```html
<div class="popup popup_active"></div>
```

Пример с объектом:

```vue
<template>
    <div v-bem="{theme: 'big', active: true}"></div>
</template>
```

```html
<div class="popup popup_theme_big popup_active"></div>
```

В значении диррективы можно укзать любое выражение, например объект, содержажий вычисляемые свойства.

```vue
<template>
    <div v-bem="{theme}"></div>
</template>
<script>
    module.exports = {
        computed: {
            theme(){
                return 'small';
            }
        },
    }
</script>
```

```html
<div class="popup popup_theme_small"></div>
```

### Модификатор элемента

Полностью аналогичен модификатору блока, только в модификаторе диррективы передается имя блока.

```vue
<template>
    <div v-bem.button="'active'"></div>
</template>
```

```html
<div class="popup__button popup__button_active"></div>
```

## Использование внутри Pug

В базовом варианте pug не позволяет указывать атрибуты без значения: парсит в запись вида `атрибут="атрибут"`, что собственно не верно. Для формировани класса блока (или элемента) без модификаторов нужно указывать пустой объект модификаторов.

```vue
<template lang="pug">
	<div v-bem="{}"></div>
</template>
```

```html
<div class="popup"></div>
```

# In English
