const BACKEND_PRODUCTS_API_URL =
  process.env.BACKEND_PRODUCTS_API_URL ||
  "http://inova-alb-1159271538.eu-north-1.elb.amazonaws.com/api/products/";

function buildTargetUrl(req) {
  const incomingUrl = new URL(req.url, "http://localhost");
  const baseUrl = BACKEND_PRODUCTS_API_URL.endsWith("/")
    ? BACKEND_PRODUCTS_API_URL
    : `${BACKEND_PRODUCTS_API_URL}/`;
  const pathAfterProducts = incomingUrl.pathname.replace(/^\/api\/products\/?/, "");
  const targetUrl = new URL(pathAfterProducts, baseUrl);

  incomingUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.append(key, value);
  });

  return targetUrl.toString();
}

async function readJsonBody(req) {
  if (req.method === "GET" || req.method === "HEAD") {
    return undefined;
  }

  if (typeof req.body === "object" && req.body !== null) {
    return JSON.stringify(req.body);
  }

  if (typeof req.body === "string") {
    return req.body;
  }

  return undefined;
}

export default async function handler(req, res) {
  try {
    const targetUrl = buildTargetUrl(req);
    const body = await readJsonBody(req);

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const text = await response.text();

    res.status(response.status);

    const responseContentType = response.headers.get("content-type");
    if (responseContentType) {
      res.setHeader("content-type", responseContentType);
    }

    res.send(text);
  } catch (error) {
    res.status(502).json({
      error: "Unable to reach product service",
      message: error.message,
    });
  }
}
