export const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('failed to fetch posts');
    }
    return response.json();
  }
  
  export const fetchPostById = async (id: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
      throw new Error('failed to fetch post by id');
    }
    return response.json();
  }

  export const createPost = async (newPost: { title: string; body: string; userId: number }) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });
  
    if(!response.ok) {
      throw new Error('failed to create post');
    }
    return response.json();
  };