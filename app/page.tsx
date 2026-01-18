"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { LinkIcon } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/urls", { url });
      setShortUrl(response.data.short_full);
      toast.success("URL shortened successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error shortening URL");
    }
    setLoading(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <LinkIcon className="size-8 text-blue-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Shawty
            </h1>
          </div>
          <h2 className="text-lg font-semibold text-white">
            Shorten URLs in Seconds
          </h2>
          <p className="text-gray-400 text-sm max-w-xs mx-auto">
            Transform your long links into short, shareable URLs with just one
            click
          </p>
        </div>
        <div className="space-y-4">
          <Input
            placeholder="Enter your long URL here..."
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button
            onClick={onClick}
            disabled={!url || loading}
            className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </Button>
        </div>
        {shortUrl && (
          <div className="space-y-3">
            <p className="text-sm text-gray-300 text-center">
              Your shortened URL:
            </p>
            <div className="flex space-x-2">
              <Input
                value={shortUrl}
                readOnly
                className="bg-white/20 border-white/30 text-white rounded-lg flex-1"
              />
              <Button
                onClick={copyToClipboard}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 rounded-lg transition-colors duration-200"
              >
                Copy
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
