//서버 베이스 url
const url = import.meta.env.VITE_DB_BASE_URL;

export const getAllPosts = async () => {
  const response = await fetch(`${url}/posts`);
  return response.json();
};

export const createPost = async (num) => {
  const postData = {
    title: "제목이 들어갑니다" + num,
    content: "내용이 들어갑니다" + num,
    isRead: false,
  };

  const response = await fetch(`${url}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const updatePost = async (id) => {
  const response = await fetch(`${url}/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isRead: true }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
