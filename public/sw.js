self.addEventListener('push',event=>{
  let data={title:'TOKIYO STORE',body:'You have a new update.'};
  try{data=event.data.json()}catch{}
  event.waitUntil(self.registration.showNotification(data.title||'TOKIYO STORE',{
    body:data.body||'',
    icon:'/icon-192.png',
    badge:'/icon-192.png',
    data:data.data||{}
  }));
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data?.url||'/account/notifications'));
});
