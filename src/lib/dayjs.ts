import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc'

export function transformUtc(utcTime:string):string{
    dayjs.extend(utc)
    return dayjs(utcTime).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
}

export function formate(timestamp:string):string{
    return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
}