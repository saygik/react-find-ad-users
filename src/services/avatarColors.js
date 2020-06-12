function avatarColors (presence) {
    switch (presence) {
        case 'В сети':
            return '#17b506'
        case 'Не в сети':
            return '#e1e1e1'
        case 'Занят':
            return '#cc120d'
        case 'Неактивен':
            return '#ecce27'
        case 'Нет на месте':
            return '#bea522'
        case 'Не беспокоить':
            return '#770907'
        default:
            return '#ffffff'
    }
}
export default avatarColors
// 'В сети'
// 'Неактивен'
// 'Занят'
// 'Не беспокоить'
// 'Скоро вернусь'
// 'Нет на месте'
// 'Не в сети'
// 'не определено'
