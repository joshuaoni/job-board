import axios from "axios";

export interface JobSearchParams {
  search_term: string;
  job_type: string;
  location: string;
  skills: string[];
}

export async function getJobs({
  search_term = "",
  job_type = "full_time",
  location = "",
  skills = [],
}: JobSearchParams) {
  console.log("ran");
  try {
    // Create request body
    const requestBody = {
      search_term,
      job_type,
      location,
      skills,
    };

    // Determine if we're running on the server or client
    const isServer = typeof window === "undefined";
    const baseUrl = isServer
      ? process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"
      : "";

    const response = await fetch(`${baseUrl}/api/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}
