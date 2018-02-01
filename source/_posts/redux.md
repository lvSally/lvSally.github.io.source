---
title: redux
date: 2018-02-01 10:53:41
categories: react
tags: redux
---
>redux一直没有总结,去看中间件的源码看得更是晕乎乎的，下面的总结是站在大牛的肩膀上看到的远方。

## [Redux](https://redux.js.org/)
  redux说白了就是一个保存全局变量的东西。当一个项目需要处理一个比较复杂的数据流的时候，可能就会出现各种状态管理工具，redux就是其中之一。
  可以将redux理解为保存一个可供外部读取和修改的私有变量，利用了闭包的特性。在闭包函数中提供了一些方法：`获取`，`修改`，`订阅更新`  

## [React-Redux](https://github.com/reactjs/react-redux)
  redux库是独立存在的，在不是react的项目也可以使用，在react使用redux需要引入React-Redux， React-Redux提供了两个重要的功能： <Provider/>, connect()
  `<Provider/>`接受一个 store 作为 props，它是整个 Redux 应用的顶层组件
  `connect()` 提供了在整个 React 应用的任意组件中获 取 store 中数据的功能。子组件通过HOC建立与顶层props.store的联系，进而获取数据、修改数据、更新UI。

## [HOC](https://reactjs.org/docs/higher-order-components.html)
  需要使用一些高级的功能，函数中会有高阶函数，react中也存在高阶组件。高阶组件的实现方式通常分成下面两种：
  `属性代理`（props proxy）。高阶组件通过被包裹的 React 组件来操作 props。（redux的connect的实现方式）
  `反向继承`（inheritance inversion）。高阶组件继承于被包裹的 React 组件。

## [Context](https://reactjs.org/docs/context.html)
  哈哈，把Context比作穿越空间的虫洞很有意思。[React中的“虫洞”](https://segmentfault.com/a/1190000004636213)
  Context就像javascript中的全局变量，只有真正全局的东西才适合放在context中。
  比如：`当前用户信息`、 `flux、redux的store` 、`session级别信息（语言，主题等）`

## redux使用场景
  1 不同组件之间期望不用通过组件代码通信
  2 复杂数据流存储
  3 ...(想作为全局数据保存的数据)

## 消息模块redux的使用
  >消息模块的使用场景
  由于消息是根据socket实时推送，需要对于下面的数据进行修改。
  [
    {name: '', log: '', readMum: ''},
    {name: '', log: '', readMum: ''},
    {name: '', log: '', readMum: ''}
  ]
  那么可能用到： 数据的获取，修改，渲染

  ### 定义action
    ```
    // 获取消息菜单
    let MESSAGES = [];
    export function getMsgMenu(menuData, type) {
      if (type === 0) {
        // 第一次请求接口加载数据
        MESSAGES = menuData;
      } else if (type === 1) {
        // websocket推送
        // 处理数据
        const newMsgType = menuData.type;
        const newMsgTypeUnReadNum = menuData.num;
        let breakForLoop = false;
        for (let i = 0; i < MESSAGES.length; i++) {
          for (let j = 0; j < MESSAGES[i].childList.length; j++) {
            if (MESSAGES[i].childList[j].type === newMsgType) {
              MESSAGES[i].childList[j].unReadNum = newMsgTypeUnReadNum;
              breakForLoop = true;
              break;
            }
          }
          if (breakForLoop) break;
        }
      } else if (type === 2) {
        // 点击某一类消息时，把未读消息数置 0
        // 此时第一个参数为消息类型
        let breakForLoop = false;
        for (let i = 0; i < MESSAGES.length; i++) {
          for (let j = 0; j < MESSAGES[i].childList.length; j++) {
            if (MESSAGES[i].childList[j].type === menuData) {
              MESSAGES[i].childList[j].unReadNum = '0';
              breakForLoop = true;
              break;
            }
          }
          if (breakForLoop) break;
        }
      }
      return {
        type: MSG_MENU,
        payload: MESSAGES
      };
    }
    ```
  ### 定义reducer
    ```
    const MSG_MENU = 'MSG_MENU';

    export default function (state = [], action) {
      switch (action.type) {
        case MSG_MENU:
          return action.payload;
        default:
          return state;
      }
    }
    ```
  ### combineReducers
    ```
    import { combineReducers } from 'redux';
    import appMenuReducer from './app-menu-reducer';
    import msgMenuReducer from './msg-menu-reducer';

    const rootReducer = combineReducers({
      appMenu: appMenuReducer,
      msgMenu: msgMenuReducer
    });

    export default rootReducer;
    ```
  ### 在根元素的位置引入Provider
    ```
    const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

    ReactDOM.render(
      <Provider store={createStoreWithMiddleware(reducers)}>
        <RouterMap />
      </Provider>,
      document.getElementById('root')
    );
    ```
  ### 在组件中使用redux
    ```
    import { connect } from 'react-redux';
    import { bindActionCreators } from 'redux';
    import { getMsgMenu } from '../actions/index'; // action

    componentDidMount() {
      // 修改和获取都是通过props完成
      if (this.props.msgMenu.length === 0) { // 获取store里的数值
        axios.get('/api/snp/CRH-SNP5103').then((res) => {
          this.props.getMsgMenu(res.resultList, 0); // dispatch 一个action
        });
      }
    }

    function mapStateToProps({ msgMenu }) {
      return {
        msgMenu
      };
    }

    function mapDispatchToProps(dispatch) {
      return bindActionCreators({ getMsgMenu }, dispatch);
    }
    // 通过HOC使SpecialMsg具有msgMenu, getMsgMenu(props);
    export default connect(mapStateToProps, mapDispatchToProps)(SpecialMsg);
    ```

## 写在最后
  1 使用redux
  2 了解redux原理
  3 了解各个知识点
  4 进阶了解中间件
  5 不禁感慨学无止境,,

## 参考资料
[参考1](https://zhuanlan.zhihu.com/p/26485702)
[参考2](https://segmentfault.com/a/1190000008648319)
