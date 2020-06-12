import moment from 'moment'
import localization from 'moment/locale/ru';
moment.locale('ru', localization);

const presenceTimeFormat = (availability) => {
const date= moment(availability.lastpubtime).fromNow().replace('назад','')
    switch (availability.presence) {
        case 'В сети':
            return availability.presence
        case 'Не в сети':
            return availability.presence + ' ' + date
        case 'Занят':
            return availability.presence
        case 'Неактивен':
            return availability.presence + ' ' + date
        case 'Нет на месте':
            return availability.presence + ' ' + date
        case 'Не беспокоить':
            return availability.presence
        default:
            return availability.presence
    }
}

export default presenceTimeFormat
