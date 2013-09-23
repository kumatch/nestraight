var isArray = require('util').isArray;

exports.get = get;
exports.set = set;

function get (object, key) {
    var keys = createKeyParts(key);
    var value = object;

    for (var i = 0, len = keys.length; i < len; i++) {
        value = value[ keys[i] ];
    }

    return value;
};

function set (object, key, value) {
    var keys = createKeyParts(key);
    var last = keys.pop();
    var base = object;
    var part, next;

    for (var i = 0, len = keys.length; i < len; i++) {
        part = normalizeKey(keys[i]);

        if (i === (len - 1)) {
            next = normalizeKey(last);
        } else {
            next = normalizeKey(keys[i + 1]);
        }

        if (typeof next === 'number') {
            if (!isArray(base[part])) {
                base[part] = [];
            }
        } else {
            if (typeof base[part] !== 'object') {
                base[part] = {};
            }
        }

        base = base[part];
    }

    base[last] = value;
}


function createKeyParts(key) {
    var string_key = (typeof key === 'string') ? String(key).trim() : "";

    return string_key.replace(/\[[\s]*["']?[\s]*([\w]+)[\s]*["']?[\s]*\]/g, '.$1')
        .replace(/^[\.]*/, '')
        .replace(/[\.]*$/, '')
        .split('.');
}

function normalizeKey (key) {
    if ((key + '').match(/^[0-9]+$/)) {
        return Number(key);
    } else {
        return key;
    }
}