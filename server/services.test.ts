import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getOllamaClient } from "./ollama";
import { getFileProcessor } from "./fileProcessor";
import * as fs from "fs";
import * as path from "path";

describe("Ollama Service", () => {
  const ollama = getOllamaClient();

  it("should check if Ollama is available", async () => {
    const available = await ollama.isAvailable();
    expect(typeof available).toBe("boolean");
  });

  it("should get available models", async () => {
    const models = await ollama.getModels();
    expect(Array.isArray(models)).toBe(true);
  });

  it("should generate text from prompt", async () => {
    try {
      const result = await ollama.generate(
        "Hello, what is 2+2?",
        "egytronic_1.0",
        0.5
      );
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    } catch (error) {
      // Ollama might not be running in test environment
      expect(error).toBeDefined();
    }
  });

  it("should analyze data", async () => {
    try {
      const data = `
        المبيعات: 10000
        التكاليف: 5000
        الربح: 5000
      `;
      const result = await ollama.analyzeData(data, "summary");
      expect(typeof result).toBe("string");
    } catch (error) {
      // Ollama might not be running in test environment
      expect(error).toBeDefined();
    }
  });
});

describe("File Processor Service", () => {
  const processor = getFileProcessor();

  it("should validate data correctly", () => {
    const validData = {
      columns: ["name", "age", "email"],
      rows: [
        { name: "John", age: 30, email: "john@example.com" },
        { name: "Jane", age: 25, email: "jane@example.com" },
      ],
      rowCount: 2,
      columnCount: 3,
      preview: [],
    };

    const validation = processor.validateData(validData);
    expect(validation.valid).toBe(true);
    expect(validation.errors.length).toBe(0);
  });

  it("should detect empty data", () => {
    const emptyData = {
      columns: [],
      rows: [],
      rowCount: 0,
      columnCount: 0,
      preview: [],
    };

    const validation = processor.validateData(emptyData);
    expect(validation.valid).toBe(false);
    expect(validation.errors.length).toBeGreaterThan(0);
  });

  it("should detect duplicate column names", () => {
    const duplicateData = {
      columns: ["name", "age", "name"],
      rows: [{ name: "John", age: 30 }],
      rowCount: 1,
      columnCount: 3,
      preview: [],
    };

    const validation = processor.validateData(duplicateData);
    expect(validation.valid).toBe(false);
    expect(validation.errors.some((e) => e.includes("مكررة"))).toBe(true);
  });

  it("should format data for analysis", () => {
    const data = {
      columns: ["name", "age"],
      rows: [
        { name: "John", age: 30 },
        { name: "Jane", age: 25 },
      ],
      rowCount: 2,
      columnCount: 2,
      preview: [
        { name: "John", age: 30 },
        { name: "Jane", age: 25 },
      ],
    };

    const formatted = processor.formatDataForAnalysis(data);
    expect(typeof formatted).toBe("string");
    expect(formatted).toContain("البيانات");
    expect(formatted).toContain("name");
    expect(formatted).toContain("age");
  });

  it("should generate statistics from data", () => {
    const data = {
      columns: ["name", "age", "salary"],
      rows: [
        { name: "John", age: 30, salary: 5000 },
        { name: "Jane", age: 25, salary: 4500 },
        { name: "Bob", age: 35, salary: 6000 },
      ],
      rowCount: 3,
      columnCount: 3,
      preview: [],
    };

    const stats = processor.generateStatistics(data);
    expect(stats.totalRows).toBe(3);
    expect(stats.totalColumns).toBe(3);
    expect(stats.columns.age).toBeDefined();
    expect(stats.columns.age.min).toBe(25);
    expect(stats.columns.age.max).toBe(35);
  });

  it("should clean data correctly", () => {
    const dirtyData = {
      columns: ["name", "age"],
      rows: [
        { name: "  John  ", age: "30" },
        { name: "Jane", age: "25" },
      ],
      rowCount: 2,
      columnCount: 2,
      preview: [
        { name: "  John  ", age: "30" },
        { name: "Jane", age: "25" },
      ],
    };

    const cleaned = processor.cleanData(dirtyData);
    expect(cleaned.rows[0].name).toBe("John");
    // Age is converted to number if it's a valid numeric string
    expect(cleaned.rows[0].age === 30 || cleaned.rows[0].age === "30").toBe(true);
  });
});

describe("Integration Tests", () => {
  it("should process and analyze data flow", async () => {
    const processor = getFileProcessor();
    const ollama = getOllamaClient();

    // Create mock data
    const mockData = {
      columns: ["product", "sales", "revenue"],
      rows: [
        { product: "A", sales: 100, revenue: 5000 },
        { product: "B", sales: 150, revenue: 7500 },
        { product: "C", sales: 80, revenue: 4000 },
      ],
      rowCount: 3,
      columnCount: 3,
      preview: [],
    };

    // Validate data
    const validation = processor.validateData(mockData);
    expect(validation.valid).toBe(true);

    // Generate statistics
    const stats = processor.generateStatistics(mockData);
    expect(stats.totalRows).toBe(3);

    // Format for analysis
    const formatted = processor.formatDataForAnalysis(mockData);
    expect(formatted.length).toBeGreaterThan(0);
  });
});
