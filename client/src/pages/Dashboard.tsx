import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, FileUp, Zap, Settings } from "lucide-react";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <p className="text-slate-600">جاري التحميل...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">مرحباً، {user?.name || "المستخدم"}</h1>
          <p className="text-slate-600 mt-2">أهلاً بك في Origami - منصة تحليل البيانات الذكية</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: "المشاريع", value: "0", icon: <BarChart3 className="w-5 h-5" /> },
            { label: "التحليلات", value: "0", icon: <Zap className="w-5 h-5" /> },
            { label: "الملفات", value: "0", icon: <FileUp className="w-5 h-5" /> },
            { label: "الرؤى", value: "0", icon: <Settings className="w-5 h-5" /> }
          ].map((stat, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-amber-500">{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 border-dashed border-slate-300 hover:border-amber-300 transition-colors cursor-pointer">
            <CardHeader>
              <FileUp className="w-8 h-8 text-amber-500 mb-2" />
              <CardTitle>استيراد البيانات</CardTitle>
              <CardDescription>رفع ملفات CSV أو Excel للتحليل</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">ابدأ الاستيراد</Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-dashed border-slate-300 hover:border-amber-300 transition-colors cursor-pointer">
            <CardHeader>
              <Zap className="w-8 h-8 text-amber-500 mb-2" />
              <CardTitle>مشروع جديد</CardTitle>
              <CardDescription>إنشاء مشروع جديد للتحليل</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">إنشاء مشروع</Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle>المشاريع الأخيرة</CardTitle>
            <CardDescription>لا توجد مشاريع حالياً</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-slate-500">
              <p>ابدأ بإنشاء مشروع جديد أو استيراد البيانات</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
