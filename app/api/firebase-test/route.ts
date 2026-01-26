import { NextResponse } from "next/server";
import { app, db } from "@/lib/firebase";

export async function GET() {
  return NextResponse.json({
    ok: true,
    appName: app.name,
    projectId: app.options.projectId,
    hasDb: !!db,
  });
}
