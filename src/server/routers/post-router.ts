import { z } from "zod";
import { router } from "../__internals/router";
import { publicProcedure } from "../procedures";

export const postRouter = router({
  recent: publicProcedure.query(async ({ c, ctx }) => {
    const { db } = ctx;
    
    const recentPost = await db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return c.superjson(recentPost);
  }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, c, input }) => {
      const { name } = input;
      const { db } = ctx;

      const post = await db.post.create({
        data: { name },
      });

      return c.superjson({ ...post });
    }),
});
