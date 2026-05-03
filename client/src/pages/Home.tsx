import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Shield, BarChart3, Brain, Lock } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded-sm transform rotate-45 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm transform -rotate-45"></div>
            </div>
            <span className="text-xl font-bold text-slate-900">Origami</span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Button asChild>
                <a href="/dashboard">الذهاب للوحة التحكم</a>
              </Button>
            ) : (
              <Button asChild>
                <a href={getLoginUrl()}>تسجيل الدخول</a>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            حول بياناتك إلى قرارات ذكية
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            منصة تحليل بيانات محلية بالكامل تعمل بقوة الذكاء الاصطناعي. بدون قيود سحابية، بدون تكاليف إضافية، بدون تنازلات على الخصوصية.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900" asChild>
              <a href={isAuthenticated ? "/dashboard" : getLoginUrl()}>
                ابدأ الآن
              </a>
            </Button>
            <Button size="lg" variant="outline">
              اعرف المزيد
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">الميزات الرئيسية</h2>
          <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto">
            كل ما تحتاجه لتحويل بياناتك إلى رؤى قابلة للتنفيذ
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "خصوصية كاملة",
                description: "بياناتك تبقى محلياً. لا توجد خوادم خارجية، لا مراقبة، لا بيانات مشاركة."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "سرعة فائقة",
                description: "معالجة فورية للبيانات بدون تأخير. نماذج ذكاء اصطناعي محسّنة للأداء."
              },
              {
                icon: <Lock className="w-8 h-8" />,
                title: "تحكم كامل",
                description: "تشغيل محلي بالكامل. لا تبعية لخدمات خارجية. أنت المسؤول الوحيد."
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: "ذكاء اصطناعي متقدم",
                description: "نماذج محسّنة محلياً مع دعم Egytronic_1.0 والنماذج الأخرى."
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "لوحات معلومات ديناميكية",
                description: "رسوم بيانية تفاعلية وتصورات بيانية متقدمة في الوقت الفعلي."
              },
              {
                icon: <Check className="w-8 h-8" />,
                title: "سهولة الاستخدام",
                description: "واجهة حدسية بدون الحاجة لمهارات تقنية. استيراد وتحليل بنقرة واحدة."
              }
            ].map((feature, idx) => (
              <Card key={idx} className="border-slate-200 hover:border-amber-300 transition-colors">
                <CardHeader>
                  <div className="text-amber-500 mb-2">{feature.icon}</div>
                  <CardTitle className="text-slate-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">حالات الاستخدام</h2>
          <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto">
            Origami تناسب الشركات والفرق التي تحتاج إلى تحليل بيانات سريع وآمن
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "الشركات الناشئة",
                description: "تحليل نمو المستخدمين والمبيعات بدون الحاجة لأدوات باهظة الثمن."
              },
              {
                title: "التجارة الإلكترونية",
                description: "تتبع سلوك العملاء والمبيعات وتحسين الاستراتيجيات بناءً على البيانات."
              },
              {
                title: "الفرق المالية",
                description: "إنشاء تقارير مالية متقدمة وتحليل الأداء بسرعة وأمان."
              },
              {
                title: "الذكاء التجاري",
                description: "تحليل البيانات الداخلية وتوليد رؤى استراتيجية دون الاعتماد على أطراف ثالثة."
              }
            ].map((useCase, idx) => (
              <Card key={idx} className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-slate-900">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">خطط الأسعار</h2>
          <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto">
            اختر الخطة التي تناسب احتياجاتك
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "البدء",
                price: "$0",
                period: "مجاني",
                features: [
                  "استيراد حتى 5 مشاريع",
                  "نموذج Egytronic_1.0",
                  "لوحات معلومات أساسية",
                  "دعم محدود"
                ]
              },
              {
                name: "احترافي",
                price: "$29",
                period: "شهرياً",
                popular: true,
                features: [
                  "مشاريع غير محدودة",
                  "جميع النماذج المتاحة",
                  "لوحات معلومات متقدمة",
                  "تحليل ذكي متقدم",
                  "دعم أولوي",
                  "تصدير البيانات"
                ]
              },
              {
                name: "مؤسسي",
                price: "$99",
                period: "شهرياً",
                features: [
                  "كل ميزات الاحترافي",
                  "نماذج مخصصة",
                  "دعم فني 24/7",
                  "تكامل API متقدم",
                  "استضافة محلية مخصصة",
                  "ضمان SLA"
                ]
              }
            ].map((plan, idx) => (
              <Card key={idx} className={`border-2 ${plan.popular ? 'border-amber-500 shadow-lg' : 'border-slate-200'}`}>
                <CardHeader>
                  <CardTitle className="text-slate-900">{plan.name}</CardTitle>
                  {plan.popular && <div className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded w-fit">الأكثر شهرة</div>}
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-slate-600 ml-2">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-slate-600">
                        <Check className="w-5 h-5 text-amber-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular ? 'bg-amber-500 hover:bg-amber-600 text-slate-900' : ''}`} variant={plan.popular ? 'default' : 'outline'}>
                    اختر الخطة
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-20 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">جاهز لتحويل بياناتك؟</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            ابدأ الآن مع Origami واستمتع بتحليل بيانات ذكي وآمن محلياً
          </p>
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900" asChild>
            <a href={isAuthenticated ? "/dashboard" : getLoginUrl()}>
              ابدأ مجاناً
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-amber-500 rounded-sm transform rotate-45"></div>
                <span className="font-bold text-white">Origami</span>
              </div>
              <p className="text-sm">منصة تحليل البيانات الذكية المحلية</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">المنتج</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">الميزات</a></li>
                <li><a href="#" className="hover:text-white transition">الأسعار</a></li>
                <li><a href="#" className="hover:text-white transition">التوثيق</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">الشركة</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">عن Origami</a></li>
                <li><a href="#" className="hover:text-white transition">المدونة</a></li>
                <li><a href="#" className="hover:text-white transition">الاتصال</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">قانوني</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">الخصوصية</a></li>
                <li><a href="#" className="hover:text-white transition">الشروط</a></li>
                <li><a href="#" className="hover:text-white transition">الأمان</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Origami. جميع الحقوق محفوظة. طورها يوسف خميس</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
