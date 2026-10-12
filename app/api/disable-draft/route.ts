import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// Turns draft mode off and goes back to the home page
export async function GET() {
  const draft = await draftMode();
  draft.disable();
  redirect("/");
}