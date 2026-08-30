create extension if not exists pgcrypto;

create table if not exists categories(
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  type text not null check(type in('physical','digital')),
  created_at timestamptz default now()
);

create table if not exists brands(
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  logo_url text,
  created_at timestamptz default now()
);

create table if not exists products(
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id),
  brand_id uuid references brands(id),
  name text not null,
  slug text unique not null,
  description text,
  product_type text not null check(product_type in('physical','digital')),
  price numeric(12,2) not null default 0,
  cost_price numeric(12,2) default 0,
  compare_at_price numeric(12,2),
  is_active boolean default true,
  is_featured boolean default false,
  created_at timestamptz default now()
);

create table if not exists product_variants(
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  sku text unique,
  variant_name text,
  price numeric(12,2),
  stock int default 0,
  attributes jsonb default '{}'::jsonb
);

create table if not exists api_providers(
  id uuid primary key default gen_random_uuid(),
  name text not null,
  provider_type text not null check(provider_type in('topup','merchant')),
  is_active boolean default true,
  priority int default 100,
  config jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists topup_packages(
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  provider_id uuid references api_providers(id),
  provider_product_code text,
  package_name text not null,
  cost numeric(12,2),
  price numeric(12,2) not null,
  is_active boolean default true
);

create table if not exists orders(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  order_number text unique not null,
  order_type text not null check(order_type in('physical','digital','mixed')),
  status text not null default 'pending',
  subtotal numeric(12,2) default 0,
  shipping numeric(12,2) default 0,
  discount numeric(12,2) default 0,
  total numeric(12,2) default 0,
  delivery_address jsonb,
  created_at timestamptz default now()
);

create table if not exists order_items(
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  variant_id uuid references product_variants(id),
  quantity int not null default 1,
  unit_price numeric(12,2) not null,
  player_data jsonb
);

create table if not exists payments(
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  provider_id uuid references api_providers(id),
  transaction_ref text unique,
  status text default 'pending',
  amount numeric(12,2) not null,
  raw_response jsonb,
  created_at timestamptz default now()
);

create table if not exists api_orders(
  id uuid primary key default gen_random_uuid(),
  order_item_id uuid references order_items(id),
  provider_id uuid references api_providers(id),
  provider_order_id text,
  status text default 'pending',
  request_payload jsonb,
  response_payload jsonb,
  attempts int default 0,
  created_at timestamptz default now()
);

create table if not exists coupons(
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  discount_type text not null check(discount_type in('fixed','percent')),
  discount_value numeric(12,2) not null,
  active boolean default true,
  expires_at timestamptz
);

create table if not exists audit_logs(
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id),
  action text not null,
  entity_type text,
  entity_id text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

alter table products enable row level security;
drop policy if exists "public read active products" on products;
create policy "public read active products" on products for select using (is_active=true);


create table if not exists profiles(
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'customer' check(role in('customer','staff','admin','super_admin')),
  created_at timestamptz default now()
);

create table if not exists addresses(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  label text,
  full_name text,
  phone text,
  city text,
  district text,
  address_line text,
  notes text,
  is_default boolean default false,
  created_at timestamptz default now()
);

create table if not exists wishlist_items(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id,product_id)
);

create index if not exists idx_products_category on products(category_id);
create index if not exists idx_products_brand on products(brand_id);
create index if not exists idx_orders_user on orders(user_id);
create index if not exists idx_orders_status on orders(status);
create index if not exists idx_payments_ref on payments(transaction_ref);
create index if not exists idx_api_orders_status on api_orders(status);

alter table profiles enable row level security;
alter table addresses enable row level security;
alter table wishlist_items enable row level security;
alter table orders enable row level security;

drop policy if exists "users read own profile" on profiles;
create policy "users read own profile" on profiles for select using (auth.uid()=id);

drop policy if exists "users update own profile" on profiles;
create policy "users update own profile" on profiles for update using (auth.uid()=id);

drop policy if exists "users manage own addresses" on addresses;
create policy "users manage own addresses" on addresses for all using (auth.uid()=user_id) with check (auth.uid()=user_id);

drop policy if exists "users manage own wishlist" on wishlist_items;
create policy "users manage own wishlist" on wishlist_items for all using (auth.uid()=user_id) with check (auth.uid()=user_id);

drop policy if exists "users read own orders" on orders;
create policy "users read own orders" on orders for select using (auth.uid()=user_id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path=public as $$
begin
 insert into public.profiles(id,full_name,role)
 values(new.id,coalesce(new.raw_user_meta_data->>'full_name',''),'customer')
 on conflict(id) do nothing;
 return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

create table if not exists inventory_movements(
 id uuid primary key default gen_random_uuid(),
 variant_id uuid references product_variants(id),
 order_id uuid references orders(id),
 movement_type text not null check(movement_type in('sale','restock','return','adjustment','reservation','release')),
 quantity int not null,
 note text,
 created_at timestamptz default now()
);
create index if not exists idx_inventory_variant on inventory_movements(variant_id);

create table if not exists product_images(
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  url text not null,
  alt_text text,
  sort_order int default 0,
  is_primary boolean default false,
  created_at timestamptz default now()
);
create index if not exists idx_product_images_product on product_images(product_id);

create or replace function public.decrement_variant_stock(p_variant_id uuid,p_qty int,p_order_id uuid)
returns void language plpgsql security definer set search_path=public as $$
declare current_stock int;
begin
  select stock into current_stock from product_variants where id=p_variant_id for update;
  if current_stock is null then raise exception 'Variant not found'; end if;
  if current_stock < p_qty then raise exception 'Insufficient stock'; end if;
  update product_variants set stock=stock-p_qty where id=p_variant_id;
  insert into inventory_movements(variant_id,order_id,movement_type,quantity,note)
  values(p_variant_id,p_order_id,'sale',-p_qty,'Order stock deduction');
end; $$;

create or replace function public.reserve_variant_stock(p_variant_id uuid,p_qty int,p_order_id uuid)
returns void language plpgsql security definer set search_path=public as $$
declare current_stock int;
begin
  select stock into current_stock from product_variants where id=p_variant_id for update;
  if current_stock is null then raise exception 'Variant not found'; end if;
  if current_stock < p_qty then raise exception 'Insufficient stock'; end if;
  update product_variants set stock=stock-p_qty where id=p_variant_id;
  insert into inventory_movements(variant_id,order_id,movement_type,quantity,note)
  values(p_variant_id,p_order_id,'reservation',-p_qty,'Checkout reservation');
end; $$;

create or replace function public.release_order_reservations(p_order_id uuid)
returns void language plpgsql security definer set search_path=public as $$
declare r record;
begin
  for r in select variant_id,abs(quantity) qty from inventory_movements
           where order_id=p_order_id and movement_type='reservation'
  loop
    update product_variants set stock=stock+r.qty where id=r.variant_id;
    insert into inventory_movements(variant_id,order_id,movement_type,quantity,note)
    values(r.variant_id,p_order_id,'release',r.qty,'Released reservation');
  end loop;
end; $$;

create table if not exists return_requests(
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  reason text not null,
  details text,
  status text not null default 'requested' check(status in('requested','approved','rejected','received','refunded')),
  admin_note text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists warranties(
  id uuid primary key default gen_random_uuid(),
  order_item_id uuid references order_items(id) on delete cascade,
  serial_number text,
  starts_at timestamptz default now(),
  expires_at timestamptz,
  status text not null default 'active' check(status in('active','expired','void')),
  notes text
);

create table if not exists payment_events(
  id uuid primary key default gen_random_uuid(),
  payment_id uuid references payments(id) on delete cascade,
  event_type text not null,
  payload jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists delivery_rules(
  id uuid primary key default gen_random_uuid(),
  city text not null,
  district text,
  fee numeric(12,2) not null default 0,
  free_over numeric(12,2),
  is_active boolean default true,
  created_at timestamptz default now()
);
create index if not exists idx_delivery_rules_city on delivery_rules(city,district);

-- Run in Supabase with storage enabled. Public product image bucket:
insert into storage.buckets(id,name,public)
values('product-images','product-images',true)
on conflict(id) do update set public=excluded.public;

create table if not exists order_events(
 id uuid primary key default gen_random_uuid(),
 order_id uuid references orders(id) on delete cascade,
 event_type text not null,
 title text not null,
 description text,
 metadata jsonb default '{}'::jsonb,
 created_at timestamptz default now()
);
create index if not exists idx_order_events_order on order_events(order_id,created_at);

create table if not exists notifications(
 id uuid primary key default gen_random_uuid(),
 user_id uuid references auth.users(id) on delete cascade,
 order_id uuid references orders(id) on delete cascade,
 title text not null,
 body text not null,
 type text not null default 'general',
 read boolean default false,
 created_at timestamptz default now()
);
create index if not exists idx_notifications_user on notifications(user_id,created_at desc);
alter table notifications enable row level security;
drop policy if exists "users read own notifications" on notifications;
create policy "users read own notifications" on notifications for select using(auth.uid()=user_id);

alter table api_orders add column if not exists next_retry_at timestamptz;
alter table api_orders add column if not exists last_error text;

create table if not exists push_subscriptions(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  endpoint text not null unique,
  p256dh text,
  auth text,
  user_agent text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table push_subscriptions enable row level security;
drop policy if exists "users manage own push subscriptions" on push_subscriptions;
create policy "users manage own push subscriptions"
on push_subscriptions for all
using(auth.uid()=user_id)
with check(auth.uid()=user_id);

create index if not exists idx_push_subscriptions_user on push_subscriptions(user_id);

create table if not exists provider_health(
  id uuid primary key default gen_random_uuid(),
  provider_id uuid references api_providers(id) on delete cascade,
  status text not null check(status in('up','degraded','down','unknown')),
  latency_ms int,
  http_status int,
  error text,
  created_at timestamptz default now()
);
create index if not exists idx_provider_health_provider on provider_health(provider_id,created_at desc);

create table if not exists payment_methods(
 id uuid primary key default gen_random_uuid(),
 code text not null unique,
 name text not null,
 is_active boolean default true,
 sort_order int default 0,
 config jsonb default '{}'::jsonb,
 created_at timestamptz default now()
);

insert into payment_methods(code,name,is_active,sort_order) values
('evc','EVC Plus',true,1),
('zaad','Zaad',true,2),
('edahab','eDahab',true,3),
('card','Visa / Mastercard',true,4)
on conflict(code) do nothing;

create table if not exists banners(
 id uuid primary key default gen_random_uuid(),
 title text not null,
 subtitle text,
 image_url text,
 link_url text,
 is_active boolean default true,
 sort_order int default 0,
 created_at timestamptz default now()
);

create table if not exists idempotency_keys(
 id uuid primary key default gen_random_uuid(),
 key text not null,
 scope text not null,
 payload jsonb default '{}'::jsonb,
 response jsonb,
 status text not null default 'processing',
 created_at timestamptz default now(),
 completed_at timestamptz,
 unique(key,scope)
);
create index if not exists idx_idempotency_scope_key on idempotency_keys(scope,key);

create table if not exists error_logs(
 id uuid primary key default gen_random_uuid(),
 source text not null,
 message text not null,
 stack text,
 route text,
 severity text not null default 'error',
 metadata jsonb default '{}'::jsonb,
 created_at timestamptz default now()
);
create index if not exists idx_error_logs_created on error_logs(created_at desc);

create index if not exists idx_products_active_type on products(is_active,product_type);
create index if not exists idx_products_featured on products(is_featured) where is_active=true;
create index if not exists idx_orders_created_at on orders(created_at desc);
create index if not exists idx_payments_order on payments(order_id);
create index if not exists idx_api_orders_order_item on api_orders(order_item_id);
create index if not exists idx_return_requests_order on return_requests(order_id);

create unique index if not exists uq_topup_provider_code
on topup_packages(provider_id,provider_product_code)
where provider_product_code is not null;
create index if not exists idx_topup_packages_product on topup_packages(product_id,is_active);

create table if not exists provider_balances(
  id uuid primary key default gen_random_uuid(),
  provider_id uuid references api_providers(id) on delete cascade,
  balance numeric(14,2) not null default 0,
  currency text not null default 'USD',
  source text default 'manual',
  created_at timestamptz default now()
);
create index if not exists idx_provider_balances_provider on provider_balances(provider_id,created_at desc);

create table if not exists cost_change_alerts(
  id uuid primary key default gen_random_uuid(),
  topup_package_id uuid references topup_packages(id) on delete cascade,
  provider_id uuid references api_providers(id) on delete cascade,
  old_cost numeric(12,2) not null,
  new_cost numeric(12,2) not null,
  change_percent numeric(8,2) not null,
  acknowledged boolean default false,
  created_at timestamptz default now()
);
create index if not exists idx_cost_alerts_created on cost_change_alerts(created_at desc);

create table if not exists role_permissions(
  id uuid primary key default gen_random_uuid(),
  role text not null,
  permission text not null,
  allowed boolean default false,
  unique(role,permission)
);

create table if not exists topup_field_schemas(
  id uuid primary key default gen_random_uuid(),
  product_id uuid unique references products(id) on delete cascade,
  fields jsonb not null default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists provider_alerts(
  id uuid primary key default gen_random_uuid(),
  provider_id uuid references api_providers(id) on delete cascade,
  alert_type text not null,
  message text not null,
  severity text not null default 'warning',
  acknowledged boolean default false,
  created_at timestamptz default now()
);
create index if not exists idx_provider_alerts_created on provider_alerts(created_at desc);

create table if not exists user_permissions(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  permission text not null,
  allowed boolean not null,
  created_at timestamptz default now(),
  unique(user_id,permission)
);

create table if not exists sandbox_test_runs(
  id uuid primary key default gen_random_uuid(),
  test_type text not null,
  status text not null check(status in('passed','failed','pending')),
  provider text,
  reference text,
  notes text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
create index if not exists idx_sandbox_tests_created on sandbox_test_runs(created_at desc);

create table if not exists launch_checks(
 id uuid primary key default gen_random_uuid(),
 label text not null unique,
 category text not null,
 required boolean default true,
 completed boolean default false,
 completed_at timestamptz,
 notes text,
 sort_order integer default 0
);

insert into launch_checks(label,category,required,sort_order) values
('Production environment variables configured','Infrastructure',true,10),
('Supabase schema deployed','Database',true,20),
('Super Admin account verified','Security',true,30),
('Merchant sandbox payment passed','Payments',true,40),
('Merchant failed-payment test passed','Payments',true,50),
('Duplicate webhook test passed','Payments',true,60),
('Top-up sandbox success passed','Top-Up',true,70),
('Top-up provider failure test passed','Top-Up',true,80),
('Fallback provider test passed','Top-Up',true,90),
('Refund sandbox test passed','Refunds',true,100),
('Provider balance sync verified','Providers',true,110),
('Mobile checkout verified','UX',true,120),
('SEO domain and sitemap verified','SEO',false,130)
on conflict(label) do nothing;

create table if not exists wishlists(
 id uuid primary key default gen_random_uuid(),
 user_id uuid references auth.users(id) on delete cascade,
 product_id uuid references products(id) on delete cascade,
 created_at timestamptz default now(),
 unique(user_id,product_id)
);
create table if not exists product_reviews(
 id uuid primary key default gen_random_uuid(),
 product_id uuid references products(id) on delete cascade,
 user_id uuid references auth.users(id) on delete cascade,
 rating integer not null check(rating between 1 and 5),
 title text,
 body text,
 status text not null default 'pending' check(status in('pending','approved','rejected')),
 created_at timestamptz default now(),
 updated_at timestamptz default now(),
 unique(product_id,user_id)
);
create index if not exists idx_product_reviews_product on product_reviews(product_id,status);

create table if not exists abandoned_carts(
 id uuid primary key default gen_random_uuid(),
 user_id uuid references auth.users(id) on delete cascade,
 session_key text,
 items jsonb not null default '[]'::jsonb,
 item_count integer not null default 0,
 cart_value numeric(12,2) not null default 0,
 recovery_sent_at timestamptz,
 recovered boolean default false,
 created_at timestamptz default now(),
 updated_at timestamptz default now()
);
create index if not exists idx_abandoned_carts_updated on abandoned_carts(updated_at desc);

create table if not exists recently_viewed(
 id uuid primary key default gen_random_uuid(),
 user_id uuid references auth.users(id) on delete cascade,
 product_id uuid references products(id) on delete cascade,
 viewed_at timestamptz default now()
);
create index if not exists idx_recently_viewed_user on recently_viewed(user_id,viewed_at desc);

create table if not exists system_health_snapshots(
 id uuid primary key default gen_random_uuid(),
 active_providers integer default 0,
 total_providers integer default 0,
 open_alerts integer default 0,
 topup_jobs_1h integer default 0,
 topup_failures_1h integer default 0,
 created_at timestamptz default now()
);
create index if not exists idx_health_snapshots_created on system_health_snapshots(created_at desc);

create table if not exists security_events(
 id uuid primary key default gen_random_uuid(),
 user_id uuid references auth.users(id) on delete cascade,
 event_type text not null,
 metadata jsonb default '{}'::jsonb,
 created_at timestamptz default now()
);
create index if not exists idx_security_events_user on security_events(user_id,created_at desc);

create table if not exists support_tickets(
 id uuid primary key default gen_random_uuid(),
 user_id uuid references auth.users(id) on delete cascade,
 order_id uuid references orders(id) on delete set null,
 category text not null default 'general',
 subject text not null,
 message text not null,
 priority text not null default 'normal' check(priority in('low','normal','high','urgent')),
 status text not null default 'open' check(status in('open','in_progress','resolved','closed')),
 admin_note text,
 created_at timestamptz default now(),
 updated_at timestamptz default now()
);
create index if not exists idx_support_user on support_tickets(user_id,created_at desc);
create index if not exists idx_support_status on support_tickets(status,created_at desc);

create table if not exists coupons(
 id uuid primary key default gen_random_uuid(),
 code text not null unique,
 discount_type text not null check(discount_type in('percent','fixed')),
 discount_value numeric(12,2) not null check(discount_value>0),
 min_order numeric(12,2) default 0,
 max_uses integer,
 used_count integer default 0,
 starts_at timestamptz default now(),
 expires_at timestamptz,
 is_active boolean default true,
 created_at timestamptz default now()
);
create table if not exists refund_requests(
 id uuid primary key default gen_random_uuid(),
 user_id uuid references auth.users(id) on delete cascade,
 order_id uuid references orders(id) on delete cascade,
 amount numeric(12,2) not null,
 reason text not null,
 status text not null default 'requested' check(status in('requested','approved','rejected','processing','refunded')),
 admin_note text,
 created_at timestamptz default now(),
 updated_at timestamptz default now()
);
create index if not exists idx_refunds_status on refund_requests(status,created_at desc);

create table if not exists fraud_flags(
 id uuid primary key default gen_random_uuid(),
 user_id uuid references auth.users(id) on delete cascade,
 reason text not null,
 risk_score integer not null default 0,
 status text not null default 'open' check(status in('open','cleared','confirmed')),
 metadata jsonb default '{}'::jsonb,
 review_note text,
 reviewed_at timestamptz,
 created_at timestamptz default now()
);
create index if not exists idx_fraud_flags_status on fraud_flags(status,created_at desc);

alter table products add column if not exists low_stock_threshold integer default 5;

create table if not exists operations_alerts(
 id uuid primary key default gen_random_uuid(),
 source text not null,
 title text not null,
 message text not null,
 severity text not null default 'info',
 dedupe_key text,
 resolved boolean default false,
 created_at timestamptz default now()
);
create index if not exists idx_operations_alerts_open on operations_alerts(resolved,created_at desc);

create table if not exists customer_addresses(
 id uuid primary key default gen_random_uuid(),
 user_id uuid references auth.users(id) on delete cascade,
 label text default 'Address',
 full_name text not null,
 phone text not null,
 city text not null,
 district text,
 address_line text not null,
 notes text,
 is_default boolean default false,
 created_at timestamptz default now()
);
create index if not exists idx_addresses_user on customer_addresses(user_id);

create table if not exists shipping_zones(
 id uuid primary key default gen_random_uuid(),
 name text not null,
 city text not null,
 district text,
 fee numeric(12,2) not null default 0,
 free_over numeric(12,2),
 eta_min_days integer default 0,
 eta_max_days integer default 1,
 is_active boolean default true,
 created_at timestamptz default now()
);

create table if not exists backup_snapshots(
 id uuid primary key default gen_random_uuid(),
 status text not null,
 table_counts jsonb default '{}'::jsonb,
 notes text,
 created_at timestamptz default now()
);

alter table orders add column if not exists address_id uuid references customer_addresses(id) on delete set null;
alter table orders add column if not exists delivery_status text default 'pending';
alter table orders add column if not exists delivery_fee numeric(12,2) default 0;
alter table orders add column if not exists courier_name text;
alter table orders add column if not exists tracking_code text;
alter table orders add column if not exists delivery_note text;
alter table orders add column if not exists delivered_at timestamptz;
alter table order_items add column if not exists cost_price numeric(12,2) default 0;

create table if not exists return_requests(
 id uuid primary key default gen_random_uuid(),
 user_id uuid references auth.users(id) on delete cascade,
 order_id uuid references orders(id) on delete cascade,
 reason text not null,
 details text,
 status text not null default 'requested' check(status in('requested','approved','rejected','received','completed')),
 admin_note text,
 created_at timestamptz default now(),
 updated_at timestamptz default now()
);
create index if not exists idx_returns_status on return_requests(status,created_at desc);

create table if not exists stock_movements(
 id uuid primary key default gen_random_uuid(),
 product_id uuid references products(id) on delete cascade,
 movement_type text not null,
 quantity integer not null,
 balance_after integer not null,
 note text,
 created_at timestamptz default now()
);
create index if not exists idx_stock_movements_product on stock_movements(product_id,created_at desc);
