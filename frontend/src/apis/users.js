import { API_URL } from "../config";

const USER_API_URL = `${API_URL}/users`;

const registerUser = async (data) => {
  const res = await fetch(`${USER_API_URL}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create user profile");
};

const getUser = async () => {
  const res = await fetch(`${USER_API_URL}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to get user profile");
  return res.json();
};

const loginUser = async (data) => {
  const res = await fetch(`${USER_API_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to login user profile");
};

const updateUser = async (data) => {
  const res = await fetch(`${USER_API_URL}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update user profile");
};

const deleteUser = async () => {
  const res = await fetch(`${USER_API_URL}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete user profile");
};

const logoutUser = async () => {
  const res = await fetch(`${USER_API_URL}/logout`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to logout user profile");
};

export { registerUser, getUser, loginUser, logoutUser, updateUser, deleteUser };
