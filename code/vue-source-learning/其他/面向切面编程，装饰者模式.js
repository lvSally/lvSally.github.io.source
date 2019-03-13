Function.prototype.before = function (beforefn) {
    var _self = this;    //保存原函数引用
    return function () { //返回包含了原函数和新函数的"代理函数"
        debugger
        beforefn.apply(this, arguments); //执行新函数，修正this
        _self.apply(this, arguments); //执行原函数
    }
};

Function.prototype.after = function (afterfn) {
    var _self = this;
    return function () {
        debugger
        console.log(_self)
        _self.apply(this, arguments);
        afterfn.apply(this, arguments);
    }
};

var func = function () {
    console.log("2")
}
debugger
func = func.before(function () {
    console.log("1");
}).after(function () {
    console.log("3");
} )

func();
// 1 func.before.after,func被赋值为after，this指向before
// 2 执行after函数，此时的this为before，所以beforefn.apply(this, arguments);结果是before的函数1
// 3 执行下一句_self.apply(this, arguments); self是指func,所以打印2
// 4 继续执行after，打印3
