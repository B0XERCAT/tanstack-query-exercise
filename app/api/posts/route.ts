import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/lib/types";

declare global {
  var postList: Post[] | undefined;
}

if (!global.postList) {
  global.postList = [
    {
      userId: 1,
      id: 1,
      title: "Hello World",
      body: "This is the first post.",
    },
    {
      userId: 2,
      id: 2,
      title: "Second Post",
      body: "This is another post.",
    },
  ];
}

export async function GET() {
  const postList: Post[] = global.postList!;
  return NextResponse.json(postList);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const postList: Post[] = global.postList!;
  const newPost: Post = {
    ...data,
    id: postList.length ? Math.max(...postList.map((p) => p.id)) + 1 : 1,
  };
  postList.unshift(newPost);
  return NextResponse.json(newPost, { status: 201 });
} 