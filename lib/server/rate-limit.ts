type Bucket={count:number,resetAt:number};
const memory=new Map<string,Bucket>();

export function rateLimit(key:string,limit=30,windowMs=60_000){
 const now=Date.now();
 const b=memory.get(key);
 if(!b||b.resetAt<=now){
  const next={count:1,resetAt:now+windowMs};
  memory.set(key,next);
  return {ok:true,remaining:limit-1,resetAt:next.resetAt};
 }
 if(b.count>=limit)return {ok:false,remaining:0,resetAt:b.resetAt};
 b.count+=1;
 memory.set(key,b);
 return {ok:true,remaining:limit-b.count,resetAt:b.resetAt};
}

export function clientKey(req:Request,scope:string){
 const forwarded=req.headers.get('x-forwarded-for')||'unknown';
 const ip=forwarded.split(',')[0].trim();
 return `${scope}:${ip}`;
}
