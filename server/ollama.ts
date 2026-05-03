import axios, { AxiosInstance } from "axios";

interface OllamaMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface OllamaChatResponse {
  model: string;
  created_at: string;
  message: OllamaMessage;
  done: boolean;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
}

interface OllamaGenerateResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context: number[];
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
}

class OllamaClient {
  private client: AxiosInstance;
  private baseURL: string;
  private defaultModel: string = "egytronic_1.0";

  constructor(baseURL: string = "http://ollama:11434") {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL,
      timeout: 300000, // 5 minutes timeout for long operations
    });
  }

  /**
   * Check if Ollama server is available
   */
  async isAvailable(): Promise<boolean> {
    try {
      const response = await this.client.get("/api/tags");
      return response.status === 200;
    } catch (error) {
      console.error("[Ollama] Server not available:", error);
      return false;
    }
  }

  /**
   * Get list of available models
   */
  async getModels(): Promise<any[]> {
    try {
      const response = await this.client.get("/api/tags");
      return response.data.models || [];
    } catch (error) {
      console.error("[Ollama] Failed to get models:", error);
      return [];
    }
  }

  /**
   * Pull a model from Ollama registry
   */
  async pullModel(modelName: string): Promise<boolean> {
    try {
      const response = await this.client.post("/api/pull", {
        name: modelName,
        stream: false,
      });
      return response.status === 200;
    } catch (error) {
      console.error(`[Ollama] Failed to pull model ${modelName}:`, error);
      return false;
    }
  }

  /**
   * Chat with a model
   */
  async chat(
    messages: OllamaMessage[],
    model: string = this.defaultModel,
    temperature: number = 0.7
  ): Promise<string> {
    try {
      const response = await this.client.post<OllamaChatResponse>(
        "/api/chat",
        {
          model,
          messages,
          stream: false,
          options: {
            temperature,
            top_k: 40,
            top_p: 0.9,
          },
        }
      );

      return response.data.message.content;
    } catch (error) {
      console.error("[Ollama] Chat failed:", error);
      throw new Error(`Failed to chat with model ${model}`);
    }
  }

  /**
   * Generate text from a prompt
   */
  async generate(
    prompt: string,
    model: string = this.defaultModel,
    temperature: number = 0.7
  ): Promise<string> {
    try {
      const response = await this.client.post<OllamaGenerateResponse>(
        "/api/generate",
        {
          model,
          prompt,
          stream: false,
          options: {
            temperature,
            top_k: 40,
            top_p: 0.9,
          },
        }
      );

      return response.data.response;
    } catch (error) {
      console.error("[Ollama] Generate failed:", error);
      throw new Error(`Failed to generate text with model ${model}`);
    }
  }

  /**
   * Analyze data and generate insights
   */
  async analyzeData(
    data: string,
    analysisType: string = "summary",
    model: string = this.defaultModel
  ): Promise<string> {
    const prompts: Record<string, string> = {
      summary: `قم بتحليل البيانات التالية وقدم ملخصاً موجزاً ومفيداً:

${data}

الملخص:`,
      insights: `قم بتحليل البيانات التالية واستخرج الرؤى والأنماط المهمة:

${data}

الرؤى:`,
      trends: `قم بتحليل البيانات التالية وحدد الاتجاهات والأنماط:

${data}

الاتجاهات:`,
      anomalies: `قم بتحليل البيانات التالية وحدد أي قيم شاذة أو غير عادية:

${data}

القيم الشاذة:`,
    };

    const prompt = prompts[analysisType] || prompts.summary;

    return await this.generate(prompt, model, 0.5);
  }

  /**
   * Answer a question about data
   */
  async answerQuestion(
    question: string,
    data: string,
    model: string = this.defaultModel
  ): Promise<string> {
    const messages: OllamaMessage[] = [
      {
        role: "system",
        content: `أنت مساعد ذكي متخصص في تحليل البيانات. ستتم إعطاؤك بيانات وأسئلة حول تلك البيانات. قدم إجابات دقيقة وواضحة ومفيدة.

البيانات المتاحة:
${data}`,
      },
      {
        role: "user",
        content: question,
      },
    ];

    return await this.chat(messages, model, 0.7);
  }

  /**
   * Generate a summary of data
   */
  async summarizeData(
    data: string,
    model: string = this.defaultModel
  ): Promise<string> {
    return await this.analyzeData(data, "summary", model);
  }

  /**
   * Extract insights from data
   */
  async extractInsights(
    data: string,
    model: string = this.defaultModel
  ): Promise<string> {
    return await this.analyzeData(data, "insights", model);
  }

  /**
   * Set default model
   */
  setDefaultModel(model: string): void {
    this.defaultModel = model;
  }

  /**
   * Get default model
   */
  getDefaultModel(): string {
    return this.defaultModel;
  }
}

// Create a singleton instance
let ollamaClient: OllamaClient | null = null;

export function getOllamaClient(): OllamaClient {
  if (!ollamaClient) {
    const baseURL = process.env.OLLAMA_URL || "http://ollama:11434";
    ollamaClient = new OllamaClient(baseURL);
  }
  return ollamaClient;
}

export { OllamaClient, OllamaMessage, OllamaChatResponse, OllamaGenerateResponse };
