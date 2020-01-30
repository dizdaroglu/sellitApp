import { Dimensions } from 'react-native';

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