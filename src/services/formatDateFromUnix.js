import moment from "moment"
import 'moment/locale/ru';

export function formatDateFromUnix (unixDate) {
    if (!unixDate) return ''
    return moment(unixDate*1000).format('DD.MM.YYYY h:mm:ss')
}
