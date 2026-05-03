import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";
import * as XLSX from "xlsx";

interface ProcessedFileData {
  columns: string[];
  rows: any[];
  rowCount: number;
  columnCount: number;
  preview: any[];
}

class FileProcessor {
  /**
   * Process a CSV file
   */
  async processCSV(filePath: string): Promise<ProcessedFileData> {
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const rows = parse(content, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      });

      const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
      const preview = rows.slice(0, 10);

      return {
        columns,
        rows,
        rowCount: rows.length,
        columnCount: columns.length,
        preview,
      };
    } catch (error) {
      console.error("[FileProcessor] CSV processing failed:", error);
      throw new Error("Failed to process CSV file");
    }
  }

  /**
   * Process an Excel file
   */
  async processExcel(filePath: string): Promise<ProcessedFileData> {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const rows = XLSX.utils.sheet_to_json(sheet);
      const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
      const preview = rows.slice(0, 10);

      return {
        columns,
        rows,
        rowCount: rows.length,
        columnCount: columns.length,
        preview,
      };
    } catch (error) {
      console.error("[FileProcessor] Excel processing failed:", error);
      throw new Error("Failed to process Excel file");
    }
  }

  /**
   * Process any supported file type
   */
  async processFile(filePath: string, fileType: string): Promise<ProcessedFileData> {
    const ext = path.extname(filePath).toLowerCase();

    if (fileType === "csv" || ext === ".csv") {
      return await this.processCSV(filePath);
    } else if (fileType === "xlsx" || fileType === "xls" || ext === ".xlsx" || ext === ".xls") {
      return await this.processExcel(filePath);
    } else {
      throw new Error(`Unsupported file type: ${fileType}`);
    }
  }

  /**
   * Format data for analysis
   */
  formatDataForAnalysis(data: ProcessedFileData): string {
    const { columns, rows, preview } = data;

    // Create a formatted string representation of the data
    let formatted = `البيانات: ${data.rowCount} صف، ${data.columnCount} عمود\n\n`;
    formatted += `الأعمدة: ${columns.join(", ")}\n\n`;
    formatted += `عينة من البيانات:\n`;
    formatted += "---\n";

    for (const row of preview) {
      for (const col of columns) {
        formatted += `${col}: ${row[col]}\n`;
      }
      formatted += "---\n";
    }

    return formatted;
  }

  /**
   * Generate statistics from data
   */
  generateStatistics(data: ProcessedFileData): Record<string, any> {
    const { columns, rows } = data;
    const stats: Record<string, any> = {
      totalRows: rows.length,
      totalColumns: columns.length,
      columns: {},
    };

    for (const col of columns) {
      const values = rows.map((row) => row[col]).filter((v) => v !== null && v !== undefined);
      const numericValues = values
        .map((v) => parseFloat(v))
        .filter((v) => !isNaN(v));

      stats.columns[col] = {
        type: numericValues.length > 0 ? "numeric" : "text",
        nonNullCount: values.length,
        nullCount: rows.length - values.length,
      };

      if (numericValues.length > 0) {
        stats.columns[col].min = Math.min(...numericValues);
        stats.columns[col].max = Math.max(...numericValues);
        stats.columns[col].avg =
          numericValues.reduce((a, b) => a + b, 0) / numericValues.length;
      }
    }

    return stats;
  }

  /**
   * Clean and normalize data
   */
  cleanData(data: ProcessedFileData): ProcessedFileData {
    const cleanedRows = data.rows.map((row) => {
      const cleanedRow: Record<string, any> = {};

      for (const [key, value] of Object.entries(row)) {
        // Trim strings
        if (typeof value === "string") {
          cleanedRow[key] = value.trim();
        }
        // Convert numeric strings to numbers
        else if (!isNaN(Number(value)) && value !== "") {
          cleanedRow[key] = Number(value);
        } else {
          cleanedRow[key] = value;
        }
      }

      return cleanedRow;
    });

    return {
      ...data,
      rows: cleanedRows,
      preview: cleanedRows.slice(0, 10),
    };
  }

  /**
   * Validate data structure
   */
  validateData(data: ProcessedFileData): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (data.rowCount === 0) {
      errors.push("الملف فارغ - لا توجد صفوف");
    }

    if (data.columnCount === 0) {
      errors.push("الملف لا يحتوي على أعمدة");
    }

    // Check for duplicate column names
    const columnSet = new Set(data.columns);
    if (columnSet.size !== data.columns.length) {
      errors.push("توجد أسماء أعمدة مكررة");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

// Create a singleton instance
const fileProcessor = new FileProcessor();

export function getFileProcessor(): FileProcessor {
  return fileProcessor;
}

export { FileProcessor, ProcessedFileData };
