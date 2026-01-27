import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
  "Vary": "Origin",
};

serve(async (req) => {
  // ✅ Handle CORS preflight safely (no JSON parsing)
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  // Only allow POST for this function
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  try {
    // Only parse JSON when it’s actually JSON
    // const contentType = req.headers.get("content-type") ?? "";
    // if (!contentType.includes("application/json")) {
    //   return new Response(JSON.stringify({ error: "Expected application/json body" }), {
    //     status: 400,
    //     headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    //   });
    // }

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const { query, ll, limit = 10 } = body;

    // const { query, ll, limit = 10 } = await req.json();

    if (!query || !ll) {
      return new Response(JSON.stringify({ error: "Missing required fields: query, ll" }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("FOURSQUARE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing FOURSQUARE_API_KEY secret" }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // Foursquare endpoint (search)
    const url = new URL("https://places-api.foursquare.com/places/search");
    url.searchParams.set("query", query);
    url.searchParams.set("ll", ll);
    url.searchParams.set("limit", String(limit));

    const fsqRes = await fetch(url.toString(), {
      headers: {
        "X-Places-Api-Version": "2025-06-17",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const text = await fsqRes.text();

    return new Response(text, {
      status: fsqRes.status,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Edge function error", details: String(err) }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }
});
