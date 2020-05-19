function deepEqual(obj1, obj2) {
    const key1 = Object.keys(obj1),
        key2 = Object.keys(obj2);
    if (key1.length != key2.length)
        return false;
    for (var i = 0; i < key1.length; i++) {
        if (obj1[key1[i]] === "null" && obj2[key1[i]] != "null") {
            return false;
        } else if (typeof obj1[key1[i]] === "object" && typeof obj2[key1[i]] === "object") {
            if (!deepEqual(obj1[key1[i]], obj2[key1[i]]))
                return false;
        } else if (obj1[key1[i]] === obj2[key1[i]])
            continue;
        else {
            return false;
        }
    }
    return true;
}

var obj1 = {
    "Name": "geetu",
    "Array": ['a', 'c', ],
    "NestedObject": { 'ab': 'a', 'ba': 'b' }
};

var obj2 = {
    "Name": "geetu",
    "Array": ['a', 'b', ],
    "NestedObject": { 'ab': 'a', 'ba': 'b' }
};

console.log(deepEqual(obj1, obj2));