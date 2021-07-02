import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function transformUtc(utcTime:string):string{
    return dayjs(utcTime).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
}

