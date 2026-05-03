import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const lineData = [
  { month: "يناير", sales: 4000, revenue: 2400 },
  { month: "فبراير", sales: 3000, revenue: 1398 },
  { month: "مارس", sales: 2000, revenue: 9800 },
  { month: "أبريل", sales: 2780, revenue: 3908 },
  { month: "مايو", sales: 1890, revenue: 4800 },
  { month: "يونيو", sales: 2390, revenue: 3800 },
];

const barData = [
  { name: "المنتج أ", value: 4000 },
  { name: "المنتج ب", value: 3000 },
  { name: "المنتج ج", value: 2000 },
  { name: "المنتج د", value: 2780 },
  { name: "المنتج هـ", value: 1890 },
];

const pieData = [
  { name: "العملاء الجدد", value: 35 },
  { name: "العملاء المتكررين", value: 55 },
  { name: "العملاء الخاملين", value: 10 },
];

const COLORS = ["#f59e0b", "#d97706", "#b45309"];

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">لوحات المعلومات</h1>
          <p className="text-slate-600 mt-2">تصورات بيانية تفاعلية وتحليلات متقدمة</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: "إجمالي المبيعات", value: "$45,231", change: "+12.5%" },
            { label: "عدد العملاء", value: "1,234", change: "+8.2%" },
            { label: "متوسط الطلب", value: "$156", change: "-3.1%" },
            { label: "معدل التحويل", value: "3.24%", change: "+2.1%" },
          ].map((metric, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">{metric.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
                  <span className="text-xs text-green-600 font-semibold">{metric.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle>اتجاهات المبيعات</CardTitle>
              <CardDescription>المبيعات والإيرادات على مدار الأشهر</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="revenue" stroke="#d97706" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>أداء المنتجات</CardTitle>
              <CardDescription>مبيعات كل منتج</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>توزيع العملاء</CardTitle>
              <CardDescription>تصنيف العملاء حسب النشاط</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Stats Table */}
          <Card>
            <CardHeader>
              <CardTitle>الإحصائيات التفصيلية</CardTitle>
              <CardDescription>ملخص البيانات الرئيسية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "أعلى مبيعات", value: "$12,500" },
                  { label: "أقل مبيعات", value: "$1,200" },
                  { label: "متوسط المبيعات", value: "$6,850" },
                  { label: "الانحراف المعياري", value: "$2,340" },
                ].map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-center pb-2 border-b border-slate-200 last:border-0">
                    <span className="text-slate-600">{stat.label}</span>
                    <span className="font-semibold text-slate-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
