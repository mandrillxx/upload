import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/app-beta";
import { createFilething, type FileRouter } from "uploadthing/server";
const f = createFilething();

const auth = (req: Request) => ({ id: "fakeId" });

export const ourFileRouter = {
  imageUploader: f
    .fileTypes(["image", "video"])
    .maxSize("1GB")
    .middleware(async (req: Request) => {
      const user = await auth(req);

      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      console.log("Upload complete for userId:", metadata.userId);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
