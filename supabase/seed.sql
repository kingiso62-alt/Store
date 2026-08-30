-- TOKIYO STORE demo seed
insert into categories(name,slug,type) values
('Gaming Mouse','gaming-mouse','physical'),
('Mechanical Keyboards','mechanical-keyboards','physical'),
('Gaming Headsets','gaming-headsets','physical'),
('Controllers','controllers','physical'),
('PUBG Mobile','pubg-mobile','digital'),
('Free Fire','free-fire','digital')
on conflict(slug) do nothing;

insert into brands(name) values
('Logitech'),('Razer'),('HyperX'),('Redragon'),('SteelSeries')
on conflict(name) do nothing;

insert into products(name,slug,description,product_type,price,cost_price,compare_at_price,is_active,is_featured)
values
('Logitech G502 Hero','logitech-g502-hero','High-performance wired gaming mouse.','physical',49.99,32.00,62.49,true,true),
('Redragon K552','redragon-k552','Compact mechanical gaming keyboard.','physical',39.99,25.00,49.99,true,true),
('HyperX Cloud II','hyperx-cloud-ii','Gaming headset with virtual 7.1 surround.','physical',69.99,48.00,89.99,true,true),
('PUBG Mobile UC','pubg-mobile-uc','Instant PUBG Mobile UC top-up.','digital',0.99,0.75,null,true,true)
on conflict(slug) do nothing;

do $$
declare p uuid;
begin
 select id into p from products where slug='logitech-g502-hero';
 if p is not null and not exists(select 1 from product_variants where product_id=p) then
  insert into product_variants(product_id,sku,variant_name,price,stock,attributes)
  values(p,'LOG-G502-BLK','Black',49.99,12,'{"color":"Black"}');
 end if;
end $$;

insert into delivery_rules(city,district,fee,free_over)
values
('Mogadishu',null,5.00,50.00),
('Mogadishu','Hodan',3.00,40.00),
('Mogadishu','Wadajir',4.00,45.00);
