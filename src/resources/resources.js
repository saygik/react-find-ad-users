import peoples from './peoples'
import find from './find'
import meetings from './meetings'
import soft from './soft'
import zals from './meetingsZals'


export default [
    { name:'peoples', label:'Главная', path:'/' ,...peoples,  hasRoute: true },
    { name:'find',label:'Поиск' , ...find, submenu: true, open:true },
    { name:'peoples1', label:'Люди', path:'peoples' ,...peoples, owner: 'find', hasRoute: true},
    { name:'peoples2', label:'Сервисы ИВЦ', path:'soft' ,...soft, owner: 'find', hasRoute: true},
    { name:'meetings',label:'Собрания Skype', ...meetings, submenu: true },
    { name:'zals',label:'Залы совещаний', path:'zals' ,...zals, owner: 'meetings', hasRoute: true},
]
