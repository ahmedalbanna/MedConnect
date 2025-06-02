"use client";

import AppointmentCard from '@/components/medconnect/appointment-card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, ListFilter } from 'lucide-react';
import React, { useState } from 'react';

const mockAppointments = [
  {
    id: 'apt1',
    otherPartyName: 'مندوب شركة النيل للأدوية',
    otherPartyRole: 'medical_rep' as 'medical_rep',
    date: new Date().toISOString(),
    time: '10:00 ص',
    status: 'confirmed' as 'confirmed',
    otherPartyAvatarUrl: 'https://placehold.co/40x40.png?text=N',
  },
  {
    id: 'apt2',
    otherPartyName: 'صيدلية الرحمة',
    otherPartyRole: 'pharmacy' as 'pharmacy',
    date: new Date(Date.now() + 86400000 * 2).toISOString(), // In 2 days
    time: '02:30 م',
    status: 'pending' as 'pending',
    otherPartyAvatarUrl: 'https://placehold.co/40x40.png?text=R',
  },
  {
    id: 'apt3',
    otherPartyName: 'مندوب شركة الشفاء للصناعات الدوائية',
    otherPartyRole: 'medical_rep' as 'medical_rep',
    date: new Date(Date.now() - 86400000 * 1).toISOString(), // Yesterday
    time: '11:15 ص',
    status: 'completed' as 'completed',
  },
];

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const userRole: 'pharmacy' | 'medical_rep' = 'pharmacy'; // This would come from auth

  const filteredAppointments = mockAppointments.filter(apt => 
    selectedDate && new Date(apt.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-headline text-primary">التقويم والمواعيد</h1>
          <p className="text-muted-foreground">نظّم جدولك وتابع مواعيدك بسهولة.</p>
        </div>
        {userRole === 'pharmacy' && (
          <Button className="mt-4 sm:mt-0 bg-accent hover:bg-accent/90 text-accent-foreground">
            <PlusCircle className="ml-2 h-5 w-5" />
            طلب موعد جديد
          </Button>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 shadow-lg">
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md w-full"
              dir="rtl"
              locale={{ code: 'ar-EG' } as any} // For Arabic day/month names
            />
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold">
                  مواعيد {selectedDate ? new Date(selectedDate).toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' }) : 'اليوم'}
                </CardTitle>
                <Button variant="outline" size="sm">
                  <ListFilter className="ml-2 h-4 w-4"/>
                  تصفية الحالة
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {userRole === 'medical_rep' && (
                <div className="mb-6 p-4 bg-primary/5 rounded-lg">
                  <h3 className="text-md font-semibold text-primary mb-2">طلبات المواعيد المعلقة</h3>
                  {/* Placeholder for pending requests for reps */}
                  <p className="text-sm text-muted-foreground">لا توجد طلبات معلقة حالياً.</p>
                </div>
              )}
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((apt) => (
                  <AppointmentCard key={apt.id} appointment={apt} userRole={userRole} />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  لا توجد مواعيد مجدولة لهذا اليوم.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
