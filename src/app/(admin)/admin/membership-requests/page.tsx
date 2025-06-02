"use client";

import MembershipRequestCard from '@/components/admin/membership-request-card';
import { useState } from 'react';

const mockMembershipRequests = [
  {
    id: 'req1',
    repName: 'علي حسن',
    repAvatarUrl: 'https://placehold.co/40x40.png?text=AH',
    companyName: 'الشركة الطبية المتقدمة',
    licenseImageUrl: 'https://placehold.co/800x600.png',
    submissionDate: new Date().toISOString(),
    dataAiHint: "document business"
  },
  {
    id: 'req2',
    repName: 'نورة عبدالله',
    repAvatarUrl: 'https://placehold.co/40x40.png?text=NA',
    companyName: 'مؤسسة الرعاية الصحية',
    licenseImageUrl: 'https://placehold.co/800x600.png',
    submissionDate: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    dataAiHint: "document contract"
  },
  {
    id: 'req3',
    repName: 'يوسف محمد',
    companyName: 'الحلول الدوائية المتكاملة',
    licenseImageUrl: 'https://placehold.co/800x600.png',
    submissionDate: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    dataAiHint: "certificate paper"
  },
];

export default function MembershipRequestsPage() {
  // In a real app, these would be fetched and managed, likely removing approved/rejected from this list
  const [requests, setRequests] = useState(mockMembershipRequests);

  const handleApprove = (requestId: string) => {
    console.log(`Approve request: ${requestId}`);
    // Update state or refetch data
    setRequests(prev => prev.filter(r => r.id !== requestId)); 
  };

  const handleReject = (requestId: string) => {
    console.log(`Reject request: ${requestId}`);
    // Update state or refetch data
    setRequests(prev => prev.filter(r => r.id !== requestId));
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline text-primary">إدارة طلبات العضوية</h1>
        <p className="text-muted-foreground">مراجعة واعتماد أو رفض طلبات عضوية المندوبين الجدد.</p>
      </header>

      {/* Could add Tabs for Pending, Approved, Rejected if needed */}
      {/* <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">معلقة ({requests.length})</TabsTrigger>
          <TabsTrigger value="approved">مقبولة</TabsTrigger>
          <TabsTrigger value="rejected">مرفوضة</TabsTrigger>
        </TabsList>
        <TabsContent value="pending"> */}
          {requests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requests.map(request => (
                <MembershipRequestCard 
                  key={request.id} 
                  request={request}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-12 text-lg">
              لا توجد طلبات عضوية معلقة حالياً.
            </p>
          )}
        {/* </TabsContent>
      </Tabs> */}
    </div>
  );
}
