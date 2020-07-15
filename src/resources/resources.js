import peoples from './peoples'
import structure from './structure'
import find from './find'
import meetings from './meetings'
import soft from './soft'
import zals from './meetingsZals'
import activezals from './activezals'


export default [
    { name:'peoples', label:'Главная', path:'/' ,...peoples,  hasRoute: true },
    { name:'find',label:'Поиск' , ...find, submenu: true, open:true },
    { name:'peoples1', label:'Люди', path:'peoples' ,...peoples, owner: 'find', hasRoute: true},
    { name:'structure', label:'Структура НОД-2', path:'structure' ,...structure, owner: 'find', hasRoute: true},
    { name:'peoples2', label:'Сервисы ИВЦ', path:'soft' ,...soft, owner: 'find', hasRoute: true},
    { name:'meetings',label:'Собрания Skype', ...meetings, submenu: true },
    { name:'zals',label:'Залы совещаний', path:'zals' ,...zals, owner: 'meetings', hasRoute: true},
    { name:'activezals',label:'Текущие собрания', path:'activezals' ,...activezals, owner: 'meetings', hasRoute: true},
]
