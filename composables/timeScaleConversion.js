export default (entry) => {
    let hours = entry.substr(0,2)
    let mins = entry.substr(3,2)

    let newTime, newMins

    const formula = (x, oldMin, oldMax, newMin, newMax) => {
        let oldRange = oldMax-oldMin
        let newRange = newMax-newMin

        return (((x - oldMin) * newRange) / oldRange) + newMin
    }

    if (mins !== '00') {
        newMins = formula(Number(mins), 0, 60, 0, 100)
        newMins = newMins < 10 ? "0" + String(newMins) : String(newMins)
    } else {
        newMins = mins
    }

    newTime = hours + newMins

    newTime = newTime.substr(0,4)
    newTime = formula(Number(newTime), 800, 2400, 0, 94.25)

    return String(newTime.toFixed(2))
}

// function test (entry) {
//     let hours = entry.substr(0,2)
//     let mins = entry.substr(3,2)
//     console.log( mins)
//
//     let newTime, newMins
//
//     const formula = (x, oldMin, oldMax, newMin, newMax) => {
//         let oldRange = oldMax-oldMin
//         let newRange = newMax-newMin
//
//         return (((x - oldMin) * newRange) / oldRange) + newMin
//     }
//
//     if (mins !== '00') {
//         newMins = formula(Number(mins), 0, 60, 0, 100)
//         newMins = newMins < 10 ? "0" + String(newMins) : String(newMins)
//     } else {
//         newMins = mins
//     }
//
//     newTime = hours + newMins
//
//     newTime = newTime.substr(0,4)
//     newTime = formula(Number(newTime), 800, 2400, 0, 93.75)
//
//     return String(newTime.toFixed(2))
// }
//
// console.log(test('13:00'))