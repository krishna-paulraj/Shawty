"use client";

import { useEffect, useState } from "react";

const Page = ({ params }: { params: Promise<{ short: string }> }) => {
  const [short, setShort] = useState<string>("");

  useEffect(() => {
    params.then((p) => setShort(p.short));
  }, [params]);

  useEffect(() => {
    if (short) {
      fetch(`/api/urls/${short}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.actualUrl) {
            window.location.href = data.actualUrl;
          } else {
            document.body.innerHTML = "<div>URL not found</div>";
          }
        })
        .catch(() => {
          document.body.innerHTML = "<div>Internal error</div>";
        });
    }
  }, [short]);

  return <div>Redirecting...</div>;
};

export default Page;
