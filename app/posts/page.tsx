"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { createPost } from "@/lib/apis/posts";
import { Button } from "@/components/ui/button";
import { postQueries } from "@/lib/queries/post";
import { Post } from "@/lib/types";

export default function PostList() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery(postQueries.list());

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Post created successfully");
    },
  });

  const handleAddPost = () => {
    const newPost = {
      title: "New Post",
      body: "This is a new post.",
      userId: 1,
    };
    mutation.mutate(newPost);
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <p className="text-2xl font-bold mb-6 text-center">Post List</p>
        <div className="grid gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-6 w-1/2 mb-2" />
            </Card>
          ))}
        </div>
      </div>
    );
  }
  if (error instanceof Error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }
  if (!data) return null;

  return (
    <div className="max-w-2xl mx-auto py-8 flex flex-col gap-4">
      <p className="text-2xl font-bold text-center">Post List</p>
      <Button onClick={handleAddPost} className="w-fit mx-auto">
        Add Post
      </Button>
      <div className="grid gap-4">
        {data.slice(0, 10).map((post: Post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <Card>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
