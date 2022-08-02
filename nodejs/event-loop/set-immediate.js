const TIMEOUT_MS = 0
const TIMEOUT_MS_2 = 100

console.log('* BEGIN *')

setTimeout(() => { console.log('Timeout 1') }, TIMEOUT_MS)
setImmediate(() => { console.log('Immediate 1') })

setTimeout(() => {
    setTimeout(() => { console.log('Timeout 3') }, TIMEOUT_MS)
    setImmediate(() => { console.log('Immediate 2') })
    console.log('Timeout 2')
}, TIMEOUT_MS)

setTimeout(() => {
    setTimeout(() => { console.log('Timeout 5') }, TIMEOUT_MS)
    setImmediate(() => { console.log('Immediate 3') })
    console.log('Timeout 4')
}, TIMEOUT_MS_2)

console.log('* END *')