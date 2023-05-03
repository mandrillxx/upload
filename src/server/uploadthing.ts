import { useUser } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/app-beta";
import { getAuth } from "@clerk/nextjs/server";
import { createFilething, type FileRouter } from "uploadthing/server";
const f = createFilething<"pages">();

export const ourFileRouter = {
  imageUploader: f
    .fileTypes(["image", "video"])
    .maxSize("1GB")
    .middleware(async (req, res) => {
      const user = getAuth(req);

      if (!user) throw new Error("Unauthorized");

      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata }) => {
      console.log("Upload complete for userId:", metadata.userId);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
