# Btn

由于活动页存在大量以图片作为可点击元素（按钮）的使用情况，故封装此组件。

该组件已默认全局注册，可在任意页面中使用。

# 使用

- 添加一个图片按钮
```HTML
<a-btn src="./images/logo.png"></a-btn>
```
组件内部会根据传入的`src`属性去判断该路径是否需要使用`require()`处理（判断依旧是根据图片文件名是否加上了哈希标识）。

如果需要处理的，组件内部会使用`require()`在`@/assets/images/..`路径下找到该图片并引入（所以这里的图片需要统一放在@/assets/images/下）

如不需要处理的，组件会直接利用传入`src`字段作为图片路径使用

最终，组件会引入该图片并加载计算图片的原始宽高，并转换为`rem`初始化图片的css宽高。


- 一般情况下你不必自己设置宽高，但如果想调节可传入对应的w，h属性，注意属性值与设计稿的px值一致即可，组件内部会自动处理为rem单位

```HTML
<!-- 80px * 50px -->
<a-btn w="80" h="50" src="./images/logo.png"></a-btn>
```

- 当作为链接按钮时，可直接添加`href`属性，如同a标签
```HTML
<a-btn href="http://xxx.com" src="./images/logo.png"></a-btn>
```

- 也可以直接绑定点击事件，和添加类名
<a-btn src="./images/logo.png" class="btn" @click="handleClick"></a-btn>