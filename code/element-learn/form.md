## 组件中通讯

1 父 —》子 props
2 子 -》父 $emit 回调函数方式
  3 非父子组件
  在简单的场景下，使用一个空的 Vue 实例作为中央事件总线：
  var bus = new Vue()
  // 触发组件 A 中的事件
  bus.$emit('id-selected', 1)
// 在组件 B 创建的钩子中监听事件
bus.\$on('id-selected', function (id) {
// ...
})

### element-ui: radio & radioGroup

```js
  // 定义dispatch
  dispatch(componentName, eventName, params) {
    var parent = this.$parent || this.$root
    var name = parent.$options.componentName

    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent

      if (parent) {
        name = parent.$options.componentName
      }
    }
    if (parent) {
      parent.$emit.apply(parent, [eventName].concat(params))
    }
  }

  // radio
  this.dispatch("RadioGroup", "changeHandle", this.value);

  // radio-group
  this.$on("changeHandle", res => {
    console.log(res);
  });
```

## 基础 radio 与自定义比较

通过 `checked` 检测表单选中
<input name="test1" type="radio" value="first" checked/>

element, 检测数据，展示自定义状态样式

```html
<template>
  <label
    class="el-radio"
    :class="[
      { 'is-checked': model === label }
    ]"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <span
      class="el-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    >
      <span class="el-radio__inner"></span>
      <input
        class="el-radio__original"
        :value="label"
        type="radio"
        aria-hidden="true"
        v-model="model"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
      />
    </span>
    <span class="el-radio__label" @keydown.stop>
      <slot></slot>
      <template v-if="!$slots.default"
        >{{label}}</template
      >
    </span>
  </label>
</template>
```

## css &BEM(块（block）,元素（element）,修饰符（modifier）)

[CSS BEM 书写规范](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%9B-%5B%E8%A7%84%E8%8C%83%5D--CSS-BEM-%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83)

```
-   中划线 ：仅作为连字符使用，表示某个块或者某个子元素的多单词之间的连接记号。
__  双下划线：双下划线用来连接块和块的子元素
_   单下划线：单下划线用来描述一个块或者块的子元素的一种状态

type-block__element_modifier
```

### demo

.xxx{}  
.xxx**item{}  
.xxx**item_hightlight{}  
.xxx**product-name{}  
.xxx**link{}  
.xxx**ming-zi-ke-yi-hen-chang{}  
// 嵌套写法  
.xxx**item_current{ .xxx\_\_link{} }

```html
<ul class="xxx">
  <li class="xxx__item">
    第一项
    <div class="xxx__product-name">我是名称</div>
    <span class="xxx__ming-zi-ke-yi-hen-chang">看类名</span>
    <a href="#" class="xxx__link">我是link</a>
  </li>

  <li></li>
  <li class="xxx__item xxx__item_current">
    第二项 且 当前选择项
    <div class="xxx__product-name">我是名称</div>
    <a href="#" class="xxx__item-link">我是link</a>
  </li>

  <li></li>
  <li class="xxx__item xxx__item_hightlight">
    第三项 且 特殊高亮
    <div class="xxx__product-name">我是名称</div>
    <a href="#" class="xxx__item-link">我是link</a>
  </li>

  <li></li>
</ul>
```

```css
/* BEM
 -------------------------- */
@mixin b($block) {
  $B: $namespace + "-" + $block !global; // !global全局可用

  .#{$B} {
    // 操作符 + #{} 插值
    @content; // 传递内容块到混入
  }
}

@mixin e($element) {
  $E: $element !global;
  $selector: &;
  $currentSelector: "";
  @each $unit in $element {
    $currentSelector: #{$currentSelector +
      "." +
      $B +
      $element-separator +
      $unit +
      ","};
  }

  @if hitAllSpecialNestRule($selector) {
    // hitAllSpecialNestRule fn, 返回Boolean
    @at-root {
      #{$selector} {
        #{$currentSelector} {
          @content;
        }
      }
    }
  } @else {
    @at-root {
      #{$currentSelector} {
        @content;
      }
    }
  }
}

@mixin m($modifier) {
  $selector: &;
  $currentSelector: "";
  @each $unit in $modifier {
    $currentSelector: #{$currentSelector +
      & +
      $modifier-separator +
      $unit +
      ","};
  }

  @at-root {
    #{$currentSelector} {
      @content;
    }
  }
}

// 使用
@include b(radio) {
  color: $--radio-color;
  font-weight: $--radio-font-weight;
  line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;
  font-size: $--font-size-base;
  @include utils-user-select(none);

  @include m(medium) {
    &.is-bordered {
      padding: $--radio-bordered-medium-padding;
      border-radius: $--button-medium-border-radius;
      height: $--radio-bordered-medium-height;
      .el-radio__label {
        font-size: $--button-medium-font-size;
      }
      .el-radio__inner {
        height: $--radio-bordered-medium-input-height;
        width: $--radio-bordered-medium-input-width;
      }
    }
  }
  @include m(small) {
    &.is-bordered {
      padding: $--radio-bordered-small-padding;
      border-radius: $--button-small-border-radius;
      height: $--radio-bordered-small-height;
      .el-radio__label {
        font-size: $--button-small-font-size;
      }
      .el-radio__inner {
        height: $--radio-bordered-small-input-height;
        width: $--radio-bordered-small-input-width;
      }
    }
  }
  @include m(mini) {
    &.is-bordered {
      padding: $--radio-bordered-mini-padding;
      border-radius: $--button-mini-border-radius;
      height: $--radio-bordered-mini-height;
      .el-radio__label {
        font-size: $--button-mini-font-size;
      }
      .el-radio__inner {
        height: $--radio-bordered-mini-input-height;
        width: $--radio-bordered-mini-input-width;
      }
    }
  }

  & + .el-radio {
    margin-left: 30px;
  }

  @include e(input) {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
  }
}
```
