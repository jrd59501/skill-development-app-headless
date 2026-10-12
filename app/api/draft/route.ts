import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// Turns on draft mode so Contentful's "Open preview" can show unpublished changes
export async function GET(request: Request) {
  // Read the ?secret= and ?slug= parts of the URL
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const slug = url.searchParams.get("slug");

  // Only people with the right secret can turn on draft mode
  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  // We need a slug to know which post to show
  if (!slug) {
    return new Response("Missing slug", { status: 400 });
  }

  // Turn on draft mode (Next.js 16 needs "await" here)
  const draft = await draftMode();
  draft.enable();

  // Send them to that post's page
  redirect("/posts/" + slug);
}