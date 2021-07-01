import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function transformUtc(utcTime:string):string{
    return dayjs.utc(utcTime).format('YYYY-MM-DD HH:mm:ss')
}

