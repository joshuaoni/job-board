import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      search_term = "",
      job_type = "",
      location = "",
      skills = [],
    } = body;

    // Create request body for the external API
    const requestBody = {
      search_term,
      job_type,
      location,
      skills,
    };
    console.log({ requestBody });
    // console.log({ requestBody });

    const apiUrl = "https://api.candivet.com/job/get-jobs-open";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    // console.log({ data });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /api/jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
