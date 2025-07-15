"use client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { use } from "react";
import { postQueries } from "@/lib/queries/post";

interface PostDetailProps {
  params: Promise<{ postId: string }>;
}

export default function PostDetail({ params }: PostDetailProps) {
  const { postId } = use(params);

  const { data, isLoading, error } = useQuery(postQueries.detail(Number(postId)));

  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto py-8">
        <Card className="p-6">
          <Skeleton className="h-8 w-1/2 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </Card>
      </div>
    );
  }
  if (error instanceof Error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }
  if (!data) return null;

  return (
    <div className="max-w-xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground whitespace-pre-line">
            {data.body}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
