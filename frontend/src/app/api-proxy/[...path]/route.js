import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  return handleProxy(request, params);
}

export async function POST(request, { params }) {
  return handleProxy(request, params);
}

export async function PUT(request, { params }) {
  return handleProxy(request, params);
}

export async function PATCH(request, { params }) {
  return handleProxy(request, params);
}

export async function DELETE(request, { params }) {
  return handleProxy(request, params);
}

async function handleProxy(request, params) {
  try {
    const resolvedParams = await params;
    const pathSegments = resolvedParams?.path || [];
    const path = pathSegments.join("/");
    
    const { search } = new URL(request.url);
    
    const apiDest = process.env.NEXT_API_URL || "http://localhost:5000/api";
    const url = `${apiDest}/${path}${search}`;
    
    const headers = new Headers();
    
    // Copy incoming headers, skipping ones that interfere with proxying/routing
    for (const [key, value] of request.headers.entries()) {
      const lowerKey = key.toLowerCase();
      if (
        lowerKey !== "host" &&
        lowerKey !== "content-length" &&
        lowerKey !== "connection"
      ) {
        headers.set(key, value);
      }
    }
    
    const options = {
      method: request.method,
      headers,
    };
    
    // Read and forward body for state-changing requests
    if (["POST", "PUT", "PATCH", "DELETE"].includes(request.method)) {
      try {
        const contentType = request.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const body = await request.json();
          options.body = JSON.stringify(body);
        } else {
          const body = await request.text();
          options.body = body;
        }
      } catch (bodyError) {
        // Request has no body or reading failed
      }
    }
    
    const res = await fetch(url, options);
    
    // Copy response headers
    const responseHeaders = new Headers();
    for (const [key, value] of res.headers.entries()) {
      const lowerKey = key.toLowerCase();
      // Don't forward compression or length headers since fetch decompresses the body automatically
      if (
        lowerKey !== "transfer-encoding" &&
        lowerKey !== "content-encoding" &&
        lowerKey !== "content-length"
      ) {
        responseHeaders.set(key, value);
      }
    }
    
    const responseBody = await res.arrayBuffer();
    
    return new NextResponse(responseBody, {
      status: res.status,
      statusText: res.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Proxy handler error:", error);
    return NextResponse.json(
      { success: false, message: "Gateway connection failed" },
      { status: 502 }
    );
  }
}
