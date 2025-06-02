"use client";

import UserManagementCard from '@/components/admin/user-management-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card'; 

type User = {
  id: string;
  name: string;
  email: string;
  role: 'pharmacy' | 'medical_rep' | 'admin';
  avatarUrl?: string;
  region?: string;
  isApproved?: boolean;
  isActive: boolean;
  companyName?: string;
  pharmacyName?: string;
};

const mockUsers: User[] = [
  { id: '1', name: 'صيدلية النور', email: 'alnoor@example.com', role: 'pharmacy', pharmacyName: 'صيدلية النور', region: 'الرياض', isActive: true, avatarUrl: 'https://placehold.co/48x48.png?text=AN' },
  { id: '2', name: 'أحمد خالد (مندوب)', email: 'ahmed.k@rep.com', role: 'medical_rep', companyName: 'شركة الدواء الحديث', region: 'جدة', isApproved: true, isActive: true, avatarUrl: 'https://placehold.co/48x48.png?text=AK' },
  { id: '3', name: 'سارة علي (مندوب)', email: 'sara.a@rep.com', role: 'medical_rep', companyName: 'فارما جلوبال', region: 'الدمام', isApproved: false, isActive: true, avatarUrl: 'https://placehold.co/48x48.png?text=SA' },
  { id: '4', name: 'صيدلية الشفاء', email: 'alshifa@example.com', role: 'pharmacy', pharmacyName: 'صيدلية الشفاء', region: 'مكة', isActive: false, avatarUrl: 'https://placehold.co/48x48.png?text=ASh' },
  { id: '5', name: 'مدير النظام', email: 'admin@medconnect.com', role: 'admin', region: 'الرياض', isActive: true, avatarUrl: 'https://placehold.co/48x48.png?text=ADM' },
];

export default function ManageUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'inactive', 'approved', 'pending'

  const handleEdit = (userId: string) => console.log(`Edit user: ${userId}`);
  const handleToggleActive = (userId: string, currentStatus: boolean) => console.log(`Toggle active for ${userId}, currently ${currentStatus}`);
  const handleApprove = (userId: string) => console.log(`Approve user: ${userId}`);
  const handleReject = (userId: string) => console.log(`Reject user: ${userId}`);

  const filteredUsers = mockUsers.filter(user => {
    const nameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = roleFilter === 'all' || user.role === roleFilter;
    
    let statusMatch = true;
    if (statusFilter !== 'all') {
      if (statusFilter === 'active') statusMatch = user.isActive;
      else if (statusFilter === 'inactive') statusMatch = !user.isActive;
      else if (statusFilter === 'approved' && user.role === 'medical_rep') statusMatch = !!user.isApproved;
      else if (statusFilter === 'pending' && user.role === 'medical_rep') statusMatch = !user.isApproved;
      else if ( (statusFilter === 'approved' || statusFilter === 'pending') && user.role !== 'medical_rep' ) statusMatch = false; // don't show non-reps for these filters
    }
    
    return (nameMatch || emailMatch) && roleMatch && statusMatch;
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-headline text-primary">إدارة المستخدمين</h1>
          <p className="text-muted-foreground">عرض وتعديل حسابات المستخدمين.</p>
        </div>
        <Button className="mt-4 sm:mt-0 bg-accent hover:bg-accent/90 text-accent-foreground">
          <UserPlus className="ms-2 h-4 w-4" /> إضافة مستخدم جديد
        </Button>
      </header>

      <Card className="shadow-lg">
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Input 
                type="search" 
                placeholder="ابحث بالاسم أو البريد الإلكتروني..." 
                className="ps-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute end-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="الدور" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الأدوار</SelectItem>
                  <SelectItem value="pharmacy">صيدلية</SelectItem>
                  <SelectItem value="medical_rep">مندوب طبي</SelectItem>
                  <SelectItem value="admin">مسؤول</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الحالات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">معطل</SelectItem>
                  <SelectItem value="approved">معتمد (مندوب)</SelectItem>
                  <SelectItem value="pending">معلق (مندوب)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {filteredUsers.length > 0 ? (
        <div className="space-y-3">
          {filteredUsers.map(user => (
            <UserManagementCard 
              key={user.id} 
              user={user}
              onEdit={handleEdit}
              onToggleActive={handleToggleActive}
              onApprove={user.role === 'medical_rep' ? handleApprove : undefined}
              onReject={user.role === 'medical_rep' ? handleReject : undefined}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">لم يتم العثور على مستخدمين يطابقون معايير البحث.</p>
      )}
    </div>
  );
}
