import ProductEditor from '../../../../components/admin/ProductEditor';
export default async function EditProduct({params}:{params:Promise<{id:string}>}){const {id}=await params;return <main className="adminStandalone"><div className="pageHead"><div><small>ADMIN / PRODUCTS</small><h1>Edit Product</h1></div></div><ProductEditor productId={id}/></main>}
