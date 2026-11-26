const C='sw-v12';
const FILES=['./','index.html','firebase-config.js','manifest.webmanifest','icon-192.png','icon-512.png',...['push','pull','legs','core'].flatMap(b=>Array.from({length:9},(_,i)=>[b+(i+1)+'.webp','img/'+b+(i+1)+'.webp']).flat())];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.allSettled(FILES.map(f=>c.add(f)))));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!='GET'||new URL(e.request.url).origin!=location.origin)return;
e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request)))});
