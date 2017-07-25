//ES6可以直接写入变量和函数，作为对象的属性和方法
var birth = '2000/01/01';

var Person = {

  name: '张三',

  //等同于birth: birth
  birth,

  // 等同于hello: function ()...
  hello() {
  	console.log('我的名字是', this.name);
  }

};



//使用表达式来作为属性名或者方法名
//作为属性名
var lastWord = 'last word';

var a = {
  'first word': 'hello',
  [lastWord]: 'world'
};

a['first word']; // "hello"
a[lastWord]; // "world"
a['last word']; // "world"

//作为方法名
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};

obj.hello() // hi


//函数拥有name属性，所以对象的方法也有name属性，返回方法名，与函数name属性一致;



//Object.is()  判断相等，与ES5中 === 运算符行为一致,只有以下两点不同：
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true

// ES5可以通过下面的代码，部署Object.is。

Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});


//Object.assign()  合并对象,第一个参数为目标对象,后面的参数都是源对象;

//若存在同名属性，则后面的属性会覆盖掉前面的属性，而不是添加;

// Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

var obj1 = {a: {b: 1}};
var obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj2.a.b // 2
// 上面代码中，源对象obj1的a属性的值是一个对象，Object.assign拷贝得到的是这个对象的引用。这个对象的任何变化，都会反映到目标对象上面。

// Object.assign可以用来处理数组，但是会把数组视为对象。

Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]


// Object.assign() 的常见用途
//1、为对象添加属性
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
//2、为对象添加方法
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {},
  anotherMethod() {}
});

// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {};
SomeClass.prototype.anotherMethod = function () {};

//3、克隆对象
//只克隆原始对象自身的值，不能克隆它继承的值
function clone(origin) {
  return Object.assign({}, origin);
}
//克隆原始对象自身的值，也能克隆它继承的值
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}

//4、合并多个对象
// 将多个对象合并到某个对象。

var merge =
  (target, ...sources) => Object.assign(target, ...sources);
// 如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。

var merge =
  (...sources) => Object.assign({}, ...sources);

//5、为属性指定默认值
const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
};

function processContent(options) {
  options = Object.assign({}, DEFAULTS, options);
  console.log(options);
  // DEFAULTS对象是默认值，options对象是用户提供的参数。DEFAULTS和options中有同名对象时，则options的值会覆盖DEFAULTS中的值
}


//遍历属性的5种方法
/*for...in

// for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

Object.keys(obj)

// Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）。

Object.getOwnPropertyNames(obj)

// Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）。

Object.getOwnPropertySymbols(obj)

// Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性。

Reflect.ownKeys(obj)

// Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管属性名是 Symbol 或字符串，也不管是否可枚举。*/