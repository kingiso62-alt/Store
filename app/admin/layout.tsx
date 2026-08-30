import AdminGuard from '../../components/admin/AdminGuard';
import {requireAdminPage} from '../../lib/server/require-admin-page';

export default async function AdminLayout({children}:{children:React.ReactNode}){
  const serverSession=await requireAdminPage();
  if(serverSession)return <>{children}</>;
  return <AdminGuard>{children}</AdminGuard>;
}
