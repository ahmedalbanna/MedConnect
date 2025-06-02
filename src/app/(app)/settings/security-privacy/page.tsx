import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, FileText, Users } from 'lucide-react';

export default function SecurityPrivacyPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-3xl">
      <header className="mb-8 text-center">
        <ShieldCheck className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl font-headline text-primary">الأمان والخصوصية</h1>
        <p className="text-muted-foreground mt-2">نحن نهتم ببياناتك وأمانك.</p>
      </header>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">سياسة الخصوصية</CardTitle>
          <CardDescription>كيف نجمع ونستخدم ونحمي معلوماتك الشخصية.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <p>
            في MedConnect، نلتزم بحماية خصوصيتك وأمان معلوماتك. توضح هذه السياسة أنواع المعلومات التي قد نجمعها منك أو التي قد تقدمها عند زيارتك أو استخدامك لتطبيق MedConnect وكيفية استخدامنا وحمايتنا لتلك المعلومات.
          </p>
          <h4 className="font-semibold pt-2">المعلومات التي نجمعها:</h4>
          <ul className="list-disc list-inside space-y-1 mr-4">
            <li>المعلومات الشخصية التي تقدمها عند التسجيل (الاسم، البريد الإلكتروني، الدور، إلخ).</li>
            <li>بيانات الاستخدام، بما في ذلك معلومات حول كيفية تفاعلك مع التطبيق.</li>
            <li>المحتوى الذي تنشئه أو تشاركه (المنشورات، الرسائل، المرفقات).</li>
          </ul>
           <h4 className="font-semibold pt-2">كيف نستخدم معلوماتك:</h4>
           <ul className="list-disc list-inside space-y-1 mr-4">
            <li>لتقديم وتحسين خدماتنا.</li>
            <li>لتخصيص تجربتك داخل التطبيق.</li>
            <li>للتواصل معك بخصوص حسابك أو خدماتنا.</li>
            <li>لأغراض الأمان ومنع الاحتيال.</li>
          </ul>
          <p>
            نحن لا نشارك معلوماتك الشخصية مع أطراف ثالثة إلا وفقًا لما هو منصوص عليه في سياسة الخصوصية الكاملة أو بموافقتك.
          </p>
          <a href="#" className="text-primary hover:underline font-medium flex items-center">
            <FileText size={16} className="ml-2" /> اقرأ سياسة الخصوصية الكاملة
          </a>
        </CardContent>
      </Card>

      <Card className="mt-8 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">شروط الخدمة</CardTitle>
          <CardDescription>القواعد والإرشادات لاستخدام تطبيق MedConnect.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <p>
            باستخدامك لتطبيق MedConnect، فإنك توافق على الالتزام بشروط الخدمة هذه. يرجى قراءتها بعناية.
          </p>
          <h4 className="font-semibold pt-2">الاستخدام المقبول:</h4>
           <ul className="list-disc list-inside space-y-1 mr-4">
            <li>يجب استخدام التطبيق فقط للأغراض المشروعة المتعلقة بالتواصل المهني في القطاع الطبي.</li>
            <li>يمنع نشر أي محتوى غير قانوني أو مسيء أو ينتهك حقوق الملكية الفكرية.</li>
            <li>يجب عدم محاولة الوصول غير المصرح به إلى حسابات المستخدمين الآخرين أو أنظمة التطبيق.</li>
          </ul>
          <p>
            تحتفظ MedConnect بالحق في تعليق أو إنهاء حسابك إذا انتهكت هذه الشروط.
          </p>
           <a href="#" className="text-primary hover:underline font-medium flex items-center">
            <Users size={16} className="ml-2" /> اقرأ شروط الخدمة الكاملة
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
