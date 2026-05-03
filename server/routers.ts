import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Projects routes
  projects: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserProjects(ctx.user.id);
    }),

    create: protectedProcedure
      .input(z.object({
        name: z.string().min(1),
        description: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createProject(ctx.user.id, input.name, input.description);
      }),
  }),

  // Data files routes
  dataFiles: router({
    listByProject: protectedProcedure
      .input(z.object({
        projectId: z.number(),
      }))
      .query(async ({ input }) => {
        return await db.getProjectDataFiles(input.projectId);
      }),

    create: protectedProcedure
      .input(z.object({
        projectId: z.number(),
        fileName: z.string(),
        fileType: z.string(),
        fileSize: z.number(),
        storageKey: z.string(),
      }))
      .mutation(async ({ input }) => {
        return await db.createDataFile(
          input.projectId,
          input.fileName,
          input.fileType,
          input.fileSize,
          input.storageKey
        );
      }),
  }),

  // AI Models routes
  aiModels: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserAIModels(ctx.user.id);
    }),

    getDefault: protectedProcedure.query(async ({ ctx }) => {
      const model = await db.getDefaultAIModel(ctx.user.id);
      
      // If no default model, return Egytronic_1.0 as default
      if (!model) {
        return {
          id: 0,
          modelName: "Egytronic_1.0",
          provider: "Egytronic Co.",
          modelId: "egytronic_1.0",
          isDefault: true,
          isActive: true,
        };
      }
      
      return model;
    }),

    create: protectedProcedure
      .input(z.object({
        modelName: z.string(),
        provider: z.string(),
        modelId: z.string(),
        isDefault: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createAIModel(
          ctx.user.id,
          input.modelName,
          input.provider,
          input.modelId,
          input.isDefault || false
        );
      }),
  }),

  // Analysis results routes
  analysisResults: router({
    listByProject: protectedProcedure
      .input(z.object({
        projectId: z.number(),
      }))
      .query(async ({ input }) => {
        return await db.getProjectAnalysisResults(input.projectId);
      }),

    create: protectedProcedure
      .input(z.object({
        projectId: z.number(),
        dataFileId: z.number(),
        modelId: z.number(),
        analysisType: z.string(),
        result: z.any(),
        summary: z.string().optional(),
        insights: z.any().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createAnalysisResult(
          input.projectId,
          input.dataFileId,
          input.modelId,
          input.analysisType,
          input.result,
          input.summary,
          input.insights
        );
      }),
  }),

  // Conversations routes
  conversations: router({
    listByProject: protectedProcedure
      .input(z.object({
        projectId: z.number(),
      }))
      .query(async ({ input }) => {
        return await db.getProjectConversations(input.projectId);
      }),

    create: protectedProcedure
      .input(z.object({
        projectId: z.number(),
        title: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createConversation(input.projectId, ctx.user.id, input.title);
      }),
  }),

  // Chat messages routes
  chatMessages: router({
    listByConversation: protectedProcedure
      .input(z.object({
        conversationId: z.number(),
      }))
      .query(async ({ input }) => {
        return await db.getConversationMessages(input.conversationId);
      }),

    add: protectedProcedure
      .input(z.object({
        conversationId: z.number(),
        role: z.enum(["user", "assistant"]),
        content: z.string(),
        modelId: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.addChatMessage(
          input.conversationId,
          input.role,
          input.content,
          input.modelId
        );
      }),
  }),

  // Settings routes
  settings: router({
    getSetting: protectedProcedure
      .input(z.object({
        key: z.string(),
      }))
      .query(async ({ ctx, input }) => {
        return await db.getUserSettings(ctx.user.id, input.key);
      }),

    saveSetting: protectedProcedure
      .input(z.object({
        key: z.string(),
        value: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.saveUserSetting(ctx.user.id, input.key, input.value);
      }),
  }),

  // Dashboard widgets routes
  dashboardWidgets: router({
    listByProject: protectedProcedure
      .input(z.object({
        projectId: z.number(),
      }))
      .query(async ({ input }) => {
        return await db.getProjectDashboardWidgets(input.projectId);
      }),

    create: protectedProcedure
      .input(z.object({
        projectId: z.number(),
        widgetType: z.string(),
        title: z.string(),
        dataSource: z.any(),
        configuration: z.any().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createDashboardWidget(
          input.projectId,
          input.widgetType,
          input.title,
          input.dataSource,
          input.configuration
        );
      }),
  }),
});

export type AppRouter = typeof appRouter;
