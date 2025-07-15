import { Post } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const postList: Post[] = global.postList!;
  const post = postList.find((p: Post) => p.id === Number(id));
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(post);
} 