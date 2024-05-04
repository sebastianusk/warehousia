export interface AdminModel {
  username: string;
  role: 'ADMIN' | 'SUPER_ADMIN' | 'ADMIN_MANAGER';
  warehouses: string[];
  active: boolean;
}
