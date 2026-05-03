import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle, Zap } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AskData() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "مرحباً! أنا مساعدك الذكي. يمكنك طرح أي أسئلة حول بياناتك وسأحاول الإجابة عليها بناءً على التحليل الذكي.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // محاكاة الرد من الذكاء الاصطناعي
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `تم تحليل سؤالك: "${input}". هذه محاكاة للرد الذكي من نموذج Egytronic_1.0. في الإصدار الكامل، سيتم توصيل Ollama للحصول على إجابات حقيقية مستندة إلى بياناتك.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const suggestedQuestions = [
    "ما هي أعلى قيمة مبيعات في البيانات؟",
    "ما هو متوسط الأداء خلال الفترة؟",
    "هل هناك اتجاهات صعودية أم هبوطية؟",
    "من هم أفضل العملاء؟",
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 h-screen flex flex-col">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">اسأل عن بياناتك</h1>
          <p className="text-slate-600 mt-2">محلل ذكي يجيب على أسئلتك باستخدام الذكاء الاصطناعي المحلي</p>
        </div>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-amber-500" />
              محادثة ذكية
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === "user"
                      ? "bg-amber-500 text-white rounded-br-none"
                      : "bg-slate-100 text-slate-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString("ar-SA", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                أسئلة مقترحة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {suggestedQuestions.map((question, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="justify-start text-left h-auto py-2"
                    onClick={() => {
                      setInput(question);
                    }}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            placeholder="اسأل عن بياناتك..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
