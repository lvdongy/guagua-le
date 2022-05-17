（推荐使用vscode右键打开预览查看本文档）
# Toast

已经默认挂在Vue的原型上，全局可使用。

如该活动不需要用到toast，则可在`/main.js`里面将引入注册toast的代码注释掉。

# 使用

### 常规
```javascript
this.$toast('message');
```

### 传入配置项
```javascript
this.$toast({
    message: 'message',
    type: 'success',
    // ...
});

this.$toast('message', {
    type: 'success',
    animation: 'fade'
    // ...
});
```

### 快捷写法
```javascript
// 成功提示，出现成功icon
// 等同于 this.$toast('message', { type: 'success' });
this.$toast.success('message'); 

// 失败提示，出现失败icon
this.$toast.error('message'); 
```

# 配置项

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|----|----|----|----|----|
| message | 显示的文本 | string | - | - |
| type | toast类型 | string | success/error/空 | - |
| hiddenIcon | 是否隐藏掉icon | boolean | - | false |
| animation | 显示隐藏的动画类型 | string | bounce/fade | bounce |







