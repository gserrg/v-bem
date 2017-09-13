import {B} from "b_";

let elementKey;

export default {
    install(Vue, config = {}) {
        let b = B(config);
        const blockPrefix = config.blockPrefix !== void 0 ? config.blockPrefix : '';
        elementKey = config.elementKey !== void 0 ? config.elementKey : '__';
        const classSeparator = config.classSeparator !== void 0 ? config.classSeparator : ' ';
        const directiveName = config.directiveName !== void 0 ? config.directiveName : 'bem';
        Vue.directive(directiveName, function (dom, binding, vNode) {
            const block = blockPrefix + vNode.context.$options._componentTag;
            let element = detectElement(binding, vNode.context);
            let mods = correctMods(binding.value);

            let oldClasses = dom.vBem === void 0 ? [] : dom.vBem.split(classSeparator);
            const classes = b(block, element, mods);

            oldClasses.forEach(className => dom.classList.remove(className));
            classes.split(classSeparator).forEach(className => dom.classList.add(className));
            dom.vBem = classes;
        });
    },
};

function correctMods(value = {}) {
    let mods = value;
    if (typeof value === 'string') {
        mods = {};
        mods[value] = true;
    }
    if (mods[elementKey] !== void 0) {
        delete(mods[elementKey]);
    }
    return mods;
}

function detectElement(binding, context) {
    let element = void 0;
    const modifiers = Object.keys(binding.modifiers);
    if (binding.arg !== void 0) {
        element = context[binding.arg];
    } else if (modifiers.length === 1) {
        element = modifiers[0];
    } else if (binding.value !== void 0 && typeof binding.value === 'object' && binding.value[elementKey] !== void 0) {
        element = binding.value[elementKey];
    }
    return element;
}
