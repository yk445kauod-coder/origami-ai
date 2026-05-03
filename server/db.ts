import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, projects, dataFiles, aiModels, analysisResults, conversations, chatMessages, dashboardWidgets, systemSettings } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Projects queries
export async function getUserProjects(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(projects).where(eq(projects.userId, userId));
}

export async function createProject(userId: number, name: string, description?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(projects).values({
    userId,
    name,
    description,
  });

  return result;
}

// Data files queries
export async function getProjectDataFiles(projectId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(dataFiles).where(eq(dataFiles.projectId, projectId));
}

export async function createDataFile(projectId: number, fileName: string, fileType: string, fileSize: number, storageKey: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.insert(dataFiles).values({
    projectId,
    fileName,
    fileType,
    fileSize,
    storageKey,
  });
}

// AI Models queries
export async function getUserAIModels(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(aiModels).where(eq(aiModels.userId, userId));
}

export async function getDefaultAIModel(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(aiModels).where(
    and(
      eq(aiModels.userId, userId),
      eq(aiModels.isDefault, true),
      eq(aiModels.isActive, true)
    )
  ).limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function createAIModel(userId: number, modelName: string, provider: string, modelId: string, isDefault: boolean = false) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.insert(aiModels).values({
    userId,
    modelName,
    provider,
    modelId,
    isDefault,
  });
}

// Analysis results queries
export async function getProjectAnalysisResults(projectId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(analysisResults).where(eq(analysisResults.projectId, projectId));
}

export async function createAnalysisResult(projectId: number, dataFileId: number, modelId: number, analysisType: string, result: any, summary?: string, insights?: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.insert(analysisResults).values({
    projectId,
    dataFileId,
    modelId,
    analysisType,
    result,
    summary,
    insights,
  });
}

// Conversations queries
export async function getProjectConversations(projectId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(conversations).where(eq(conversations.projectId, projectId));
}

export async function createConversation(projectId: number, userId: number, title: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.insert(conversations).values({
    projectId,
    userId,
    title,
  });
}

// Chat messages queries
export async function getConversationMessages(conversationId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(chatMessages).where(eq(chatMessages.conversationId, conversationId));
}

export async function addChatMessage(conversationId: number, role: "user" | "assistant", content: string, modelId?: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.insert(chatMessages).values({
    conversationId,
    role,
    content,
    modelId,
  });
}

// System settings queries
export async function getUserSettings(userId: number, settingKey: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(systemSettings).where(
    and(
      eq(systemSettings.userId, userId),
      eq(systemSettings.settingKey, settingKey)
    )
  ).limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function saveUserSetting(userId: number, settingKey: string, settingValue: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await getUserSettings(userId, settingKey);

  if (existing) {
    return await db.update(systemSettings).set({ settingValue }).where(
      and(
        eq(systemSettings.userId, userId),
        eq(systemSettings.settingKey, settingKey)
      )
    );
  } else {
    return await db.insert(systemSettings).values({
      userId,
      settingKey,
      settingValue,
    });
  }
}

// Dashboard widgets queries
export async function getProjectDashboardWidgets(projectId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(dashboardWidgets).where(eq(dashboardWidgets.projectId, projectId));
}

export async function createDashboardWidget(projectId: number, widgetType: string, title: string, dataSource: any, configuration?: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.insert(dashboardWidgets).values({
    projectId,
    widgetType,
    title,
    dataSource,
    configuration,
  });
}
