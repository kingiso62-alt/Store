export default function AdminProducts(){
 const rows=[['Logitech G502 Hero','Mouse','$49.99','12','Active'],['Redragon K552','Keyboard','$39.99','8','Active'],['HyperX Cloud II','Headset','$69.99','4','Low Stock']];
 return <main className="adminStandalone"><div className="pageHead"><div><small>ADMIN / PRODUCTS</small><h1>Products</h1></div><button className="btnBlue">+ ADD PRODUCT</button></div><div className="tableCard"><table><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th></tr></thead><tbody>{rows.map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i}>{c}</td>)}</tr>)}</tbody></table></div></main>
}
