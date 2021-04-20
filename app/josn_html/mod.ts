import React, { ComponentType } from 'https://esm.sh/react@17.0.2'

function App({ Page, pageProps }: { Page: ComponentType<any>, pageProps: any }) {
  return (
    <main>
      <head>
        <meta name="viewport" content="width=device-width" />
      </head>
      <Page {...pageProps} />
    </main>
  )
}

function handleRequest(request) {
  const { pathname } = new URL(request.url);

  if (pathname.startsWith("/html")) {
    const html = `<html>
      <p><b>Message:</b> Hello from Deno Deploy.</p>
      </html>`;

    return new Response(html, {
      headers: {
        // The interpretation of the body of the response by the client depends
        // on the 'content-type' header.
        // The "text/html" part implies to the client that the content is HTML
        // and the "charset=UTF-8" part implies to the client that the content
        // is encoded using UTF-8.
        "content-type": "text/html; charset=UTF-8",
      },
    });
  }

  if (pathname.startsWith("/json")) {
    // Use stringify function to convert javascript object to JSON string.
    const json = JSON.stringify({
      message: "Hello from Deno Deploy",
    });

    return new Response(json, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
  }

  return new Response(
    <App/>,
    {
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    },
  );
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
