import './component.styl'

const hello = (name) => {
    var result = 'Hello, '+name+'!'
    return result;
}

const insertName = (name, element) => {
    element.innerHTML = name;
}

export { hello, insertName }
