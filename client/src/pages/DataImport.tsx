import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function DataImport() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "text/csv" || file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        handleFile(file);
      }
    }
  };

  const handleFile = (file: File) => {
    setUploadedFile(file);
    // محاكاة معاينة البيانات
    const mockData = [
      { id: 1, name: "المنتج أ", sales: 1500, date: "2026-01-01" },
      { id: 2, name: "المنتج ب", sales: 2300, date: "2026-01-02" },
      { id: 3, name: "المنتج ج", sales: 1800, date: "2026-01-03" },
    ];
    setPreview(mockData);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">استيراد البيانات</h1>
          <p className="text-slate-600 mt-2">رفع ملفات CSV أو Excel للتحليل الذكي</p>
        </div>

        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle>رفع الملف</CardTitle>
            <CardDescription>اسحب الملف أو انقر لاختيار ملف CSV أو Excel</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                dragActive ? "border-amber-500 bg-amber-50" : "border-slate-300"
              }`}
            >
              <FileUp className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-900 font-medium mb-2">اسحب الملف هنا أو انقر للاختيار</p>
              <p className="text-slate-500 text-sm mb-4">ملفات CSV أو Excel مدعومة</p>
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                className="hidden"
                id="file-input"
              />
              <Button asChild>
                <label htmlFor="file-input">اختر الملف</label>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* File Info */}
        {uploadedFile && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              تم تحميل الملف: <strong>{uploadedFile.name}</strong> ({(uploadedFile.size / 1024).toFixed(2)} KB)
            </AlertDescription>
          </Alert>
        )}

        {/* Data Preview */}
        {preview.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>معاينة البيانات</CardTitle>
              <CardDescription>أول 3 صفوف من البيانات المستوردة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      {Object.keys(preview[0]).map((key) => (
                        <th key={key} className="text-left py-2 px-4 font-semibold text-slate-900">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                        {Object.values(row).map((value, vidx) => (
                          <td key={vidx} className="py-2 px-4 text-slate-600">
                            {String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex gap-4">
                <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900">
                  تحليل البيانات
                </Button>
                <Button variant="outline">إلغاء</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Alert */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            بياناتك محفوظة محلياً بشكل آمن. لن يتم إرسالها إلى أي خادم خارجي.
          </AlertDescription>
        </Alert>
      </div>
    </DashboardLayout>
  );
}
