export const timerHelps=(seconds:number)=>{
    let minute = Math.floor(seconds / 60)
    seconds -= (minute * 60)

    let secondString = `${seconds < 10 ? '0'+seconds : seconds}`
    let minutsString = `${minute < 10 ? '0'+minute : minute}`

    return `${minutsString}:${secondString}`;
}