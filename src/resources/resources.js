import deleted from './deleted-messages'
import messages from './messages'
import messageTemplates from './message-templates';
import logs from './logs';
import requests from './requests';
export default [
    { name:'messages', label:'Сообщения', path:'/' ,...messages,  hasRoute: true },
    { name:'requests', label:'Запросы',path:'requests' ,...requests,  hasRoute: true },
    { name:'templates', label:'Шаблоны',path:'messagestempl' ,...messageTemplates,  hasRoute: true },
    // { name:'logs', label:'События',path:'logs' ,...logs,  hasRoute: true },
    { name:'recycle', label:'Корзина',path:'deleted' ,...deleted,  hasRoute: true },
]
