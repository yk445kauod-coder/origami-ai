import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Brain, Plus, Trash2, Settings as SettingsIcon } from "lucide-react";

interface AIModel {
  id: string;
  name: string;
  provider: string;
  status: "active" | "inactive";
  isDefault: boolean;
}

export default function Settings() {
  const [models, setModels] = useState<AIModel[]>([
    {
      id: "1",
      name: "Egytronic_1.0",
      provider: "Egytronic Co.",
      status: "active",
      isDefault: true,
    },
    {
      id: "2",
      name: "Mistral 7B",
      provider: "Ollama",
      status: "inactive",
      isDefault: false,
    },
    {
      id: "3",
      name: "Neural Chat 7B",
      provider: "Ollama",
      status: "inactive",
      isDefault: false,
    },
  ]);

  const [newModelName, setNewModelName] = useState("");
  const [newModelProvider, setNewModelProvider] = useState("");

  const handleAddModel = () => {
    if (newModelName && newModelProvider) {
      const newModel: AIModel = {
        id: Date.now().toString(),
        name: newModelName,
        provider: newModelProvider,
        status: "inactive",
        isDefault: false,
      };
      setModels([...models, newModel]);
      setNewModelName("");
      setNewModelProvider("");
    }
  };

  const handleDeleteModel = (id: string) => {
    setModels(models.filter((m) => m.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setModels(
      models.map((m) => ({
        ...m,
        isDefault: m.id === id,
      }))
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">الإعدادات</h1>
          <p className="text-slate-600 mt-2">إدارة النماذج والإعدادات العامة</p>
        </div>

        {/* Models Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-amber-500" />
              إدارة نماذج الذكاء الاصطناعي
            </CardTitle>
            <CardDescription>أضف أو أزل نماذج Ollama المحلية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Models */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">النماذج المتاحة</h3>
              <div className="space-y-3">
                {models.map((model) => (
                  <div
                    key={model.id}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-amber-300 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-slate-900">{model.name}</h4>
                        {model.isDefault && (
                          <Badge className="bg-amber-100 text-amber-800">النموذج الافتراضي</Badge>
                        )}
                        <Badge
                          variant={model.status === "active" ? "default" : "secondary"}
                          className={
                            model.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-slate-100 text-slate-600"
                          }
                        >
                          {model.status === "active" ? "نشط" : "غير نشط"}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{model.provider}</p>
                    </div>
                    <div className="flex gap-2">
                      {!model.isDefault && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSetDefault(model.id)}
                        >
                          اجعله افتراضياً
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteModel(model.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Model */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="font-semibold text-slate-900 mb-4">إضافة نموذج جديد</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-slate-700">اسم النموذج</label>
                  <Input
                    placeholder="مثال: Llama 2 7B"
                    value={newModelName}
                    onChange={(e) => setNewModelName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">مزود الخدمة</label>
                  <Input
                    placeholder="مثال: Ollama"
                    value={newModelProvider}
                    onChange={(e) => setNewModelProvider(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button
                  onClick={handleAddModel}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة النموذج
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-amber-500" />
              الإعدادات العامة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">اسم المشروع</label>
              <Input placeholder="Origami" defaultValue="Origami" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">اللغة</label>
              <select className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md">
                <option>العربية</option>
                <option>الإنجليزية</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">المنطقة الزمنية</label>
              <select className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md">
                <option>Asia/Riyadh</option>
                <option>Asia/Dubai</option>
                <option>Europe/London</option>
              </select>
            </div>
            <div className="pt-4">
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900">
                حفظ الإعدادات
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle>حول Origami</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-slate-600">
              <p>
                <strong>الإصدار:</strong> 1.0.0
              </p>
              <p>
                <strong>المطور:</strong> يوسف خميس
              </p>
              <p>
                <strong>الترخيص:</strong> MIT
              </p>
              <p className="pt-2">
                Origami هي منصة تحليل بيانات ذكية محلية بالكامل مع دعم نماذج الذكاء الاصطناعي المحسّنة.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
