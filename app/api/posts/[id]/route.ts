import { Post } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { getPostList } from "@/lib/stores/postList";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const postList = getPostList();
  const post = postList.find((p: Post) => p.id === Number(id));
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(post);
} 