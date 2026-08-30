const items=[
'Home loads',
'Shop loads',
'Top-up catalog loads',
'Customer registration/login works',
'Physical product adds to cart',
'Digital top-up adds to cart',
'Checkout creates idempotent order',
'Payment adapter initializes',
'Failed payment releases stock',
'Paid payment converts stock reservation',
'Top-up dispatch creates API order',
'Top-up worker completes/retries/fallbacks',
'Refund adapter works in sandbox',
'Provider low-balance guard works',
'Admin permissions block unauthorized actions'
];
console.log('\nTOKIYO E2E checklist:\n');
items.forEach((x,i)=>console.log(`${i+1}. [ ] ${x}`));
