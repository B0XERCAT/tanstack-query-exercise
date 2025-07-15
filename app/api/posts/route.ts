import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/lib/types";
import { getPostList } from "@/lib/stores/postList";

export async function GET() {
  const postList = getPostList();
  return NextResponse.json(postList);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const postList = getPostList();
  const newPost: Post = {
    ...data,
    id: postList.length ? Math.max(...postList.map((p) => p.id)) + 1 : 1,
  };
  postList.unshift(newPost);
  return NextResponse.json(newPost, { status: 201 });
} 