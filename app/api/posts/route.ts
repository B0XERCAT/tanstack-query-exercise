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
  const newId = postList.length ? Math.max(...postList.map((p) => p.id)) + 1 : 1;
  const newPost: Post = {
    ...data,
    id: newId,
    title: `New Post ${newId}`,
    body: `This is a new post ${newId}.`
  };
  postList.unshift(newPost);
  return NextResponse.json(newPost, { status: 201 });
} 