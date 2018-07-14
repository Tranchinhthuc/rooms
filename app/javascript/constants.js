// @flow
export const timeShotHeight = 45

const arr = []
for (let i = 0; i <= 95; i++) {
  arr.push({
    timeStr: `${parseInt(i / 4) < 10 ? '0' : ''}${parseInt(i / 4)}:${i % 4 === 0 ? '0' : ''}${15*(i%4)}`,
    height: i * timeShotHeight,
  })
}
export const dateTimeStamp = arr
