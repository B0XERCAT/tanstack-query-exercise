import { Post } from "@/lib/types";

declare global {
  var postList: Post[] | undefined;
}

export function getPostList(): Post[] {
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
  return global.postList;
} 