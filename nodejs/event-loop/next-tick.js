const TIMEOUT_MS = 10
// const TIMEOUT_MS = 0

console.log('* BEGIN *')

setTimeout(() => { console.log('Timeout 1') }, TIMEOUT_MS)
setImmediate(() => { console.log('Immediate 1') })

setTimeout(() => {
    setTimeout(() => { console.log('Timeout 3') }, TIMEOUT_MS)
    setImmediate(() => { console.log('Immediate 2') })

    console.log('Timeout 2')
}, TIMEOUT_MS)

process.nextTick(() => {
    process.nextTick(() => { console.log('Next Tick 2') })
    console.log('Next Tick 1')
})

console.log('* END *')