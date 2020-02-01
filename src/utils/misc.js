import { Dimensions, AsyncStorage } from 'react-native';

export const getOrientation = (value) => {
    console.log("Dimension height: ", Dimensions.get('window').height)
    return Dimensions.get("window").height > value ? 'portrait' : 'landspace'
}

export const setOrientationListener = (cb) => {
    return Dimensions.addEventListener("change", cb)
}

export const removeOrientationListener = () => {
    return Dimensions.removeEventListener("change")
}

export const getToken = (cb) => {
    AsyncStorage.multiGet([
        '@sellitApp@token',
        '@sellitApp@refreshToken',
        '@sellitApp@expireToken',
        '@sellitApp@uid',
    ]).then(value => {
        cb(value)
    })
}
export const setTokens = (values, cb) => {
    console.log("Values", values)
    const dateNow = new Date();
    const expiration = dateNow.getTime() + (3600 * 1000);

    AsyncStorage.multiSet([
        ['@sellitApp@token', values.token],
        ['@sellitApp@refreshToken', values.refToken],
        ['@sellitApp@expireToken', expiration.toString()],
        ['@sellitApp@uid', values.uid],
    ]).then(res => {
        cb();
    })

}

export const gridTwoColumns = (list) => {

    let newArticles = [];
    let count = 1;
    let vessel = {};
    let articles = list;

    if (articles) {
        articles.forEach(element => {
            if (count == 1) {
                vessel["blockOne"] = element;
                count++;

            } else {
                vessel["blockTwo"] = element;
                newArticles.push(vessel);
                count = 1;
                vessel = {};
            }
        })
    }
    return newArticles;
}