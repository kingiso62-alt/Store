const base=process.env.TEST_BASE_URL||'http://localhost:3000';

async function check(path,expect=200){
  const r=await fetch(base+path);
  if(r.status!==expect)throw new Error(`${path}: expected ${expect}, got ${r.status}`);
  console.log('OK',path,r.status);
}

await check('/');
await check('/shop');
await check('/topup');
await check('/search');
console.log('Basic public smoke tests passed.');
