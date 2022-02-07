function swapArray(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
}

function randomPassword(length, type) {
    length = Number(length || 8);
    type = Number(type || 4);
    //最小长度
    if (length <= 8) {
        length = 8;
    } else if (length > 20) {
        length = 20;
    }
    //密码类型
    if (type < 0) {
        type = 4;
    } else if (type > 4) {
        type = 4;
    }
    let passwordArray = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz", "1234567890", "!@#$%&*."];
    var password = [];

    for (let i = 0; i < length; i++) {
        if (password.length < length - 4) {
            // Get random passwordArray index
            let arrayRandom = Math.floor(Math.random() * type);
            // Get password array value
            let passwordItem = passwordArray[arrayRandom];
            // Get password array value random index
            // Get random real value
            let item = passwordItem[Math.floor(Math.random() * passwordItem.length)];
            password.push(item);
        } else {
            // Get the array values sequentially
            let newArrayRandom = Math.floor(Math.random() * type);
            let newItem = passwordArray[newArrayRandom];
            let lastItem = newItem[Math.floor(Math.random() * newItem.length)];
            // Get array splice index
            let spliceIndex = Math.floor(Math.random() * password.length);
            password.splice(spliceIndex, 0, lastItem);
        }
    }
    return password.join("");
}

function getNow() {
    return Math.round(new Date().getTime() / 1000).toString();
}

function getAllData(groupData, unGroupData) {
    let all = [];
    if (Object.keys(groupData).length > 0) {
        for (const key in groupData) {
            const element = groupData[key];
            if (element.length > 0) {
                for (const key1 in element) {
                    const element1 = element[key1];
                    element1.isPwd = true;
                    all.push(element1);
                }
            }
        }
    }
    if (unGroupData.length > 0) {
        for (const key2 in unGroupData) {
            const element2 = unGroupData[key2];
            element2.isPwd = true;
            all.push(element2);
        }
    }

    return all;
}

const common = {
    swapArray: swapArray,
    randomPassword: randomPassword,
    getNow: getNow,
    getAllData: getAllData,
};

export default common;
