const isObject = (val) => typeof val == 'object' && val != null
const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)
const hasChanged = (newValue, oldValue) => newValue !== oldValue

function createGetter() {
  return function get(target, key, reactive) {
    const res = Reflect.get(target, key, reactive)
    console.log('用户对这个对象取值了', target, key)
    if (isObject(res)) {
      return reactive(res)
    }
    return res
  }
}

function createSetter() {
  return function set(target, key, value, reactive) {
    const hadKey = hasOwn(target, key)
    const oldValue = target[key]
    const result = Reflect.set(target, key, value, reactive)
    if (!hadKey) {
      console.log('属性的新增操作', target, key)
    } else if (hasChanged(value, oldValue)) {
      console.log('修改操作', target, key)
    }
    return result
  }
}
const get = createGetter()
const set = createSetter()
const mutableHandler = {
  get,
  set
}

function reactive(target) {
  return createReactiveObject(target, mutableHandler)
}

function createReactiveObject(target, baseHandler) {
  if (!isObject(target)) {
    return target
  }
  const observed = new Proxy(target, baseHandler)
  return observed
}

const state = reactive({
  name: 'aaa',
  age: 11,
  arr: [1, 2, 3]
})

state.arr.push(1)