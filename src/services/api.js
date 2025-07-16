import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Log the actual API response structure
const logResponseStructure = (response) => {
  if (!response || !response.data) return;

  console.log("API Response Structure:");
  console.log("- Status:", response.status);
  console.log("- Headers:", response.headers);

  if (response.data.data && response.data.data.length > 0) {
    const firstItem = response.data.data[0];
    console.log("- First item keys:", Object.keys(firstItem));

    // Check for image-related properties
    Object.keys(firstItem).forEach((key) => {
      if (key.includes("image")) {
        console.log(`- ${key} type:`, typeof firstItem[key]);
        console.log(`- ${key} value:`, firstItem[key]);
      }
    });
  }
};

export const fetchIdeas = async (params) => {
  try {
    // Format parameters exactly as required by the API
    const queryParams = {
      "page[number]": params["page[number]"],
      "page[size]": params["page[size]"],
      sort: params.sort,
      "append[]": params["append[]"],
    };

    console.log("API Request params:", queryParams);

    // Make the request with the properly formatted parameters
    const response = await api.get("/ideas", { params: queryParams });

    // Log the complete response structure
    logResponseStructure(response);

    return response.data;
  } catch (error) {
    console.error("Error fetching ideas:", error);
    console.error("Error details:", error.response?.data || error.message);
    throw error;
  }
};

export default api;
