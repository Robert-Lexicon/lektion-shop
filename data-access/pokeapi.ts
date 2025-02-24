"use server";

export const fetchFromAPI = async <T>(endpoint: string) => {
  const res = await fetch(endpoint, {
    headers: {
      "User-Agent": "TestNextjsApp/1.0",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    return {
      message:
        "There was an error fetching data from the API, please try again later",
    };
  }
  const data: T = await res.json();
  return data;
};
