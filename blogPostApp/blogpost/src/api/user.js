import axios from "./axios";

export const getCurrentUser = async () => {
  try {
    const response = await axios.get("/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("response,: ", response);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Please login again");
    }
    throw error;
  }
};

export const getUserById = async (id) => {
  const response = await axios.get(`/user/${id}`);
  return response.data;
};
