export const postComment = async (comment: {
    postId: number;
    name: string;
    body: string;
  }) => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      }
    );
  
    if (!response.ok) {
      throw new Error("Failed to post comment");
    }
  
    return response.json();
  };