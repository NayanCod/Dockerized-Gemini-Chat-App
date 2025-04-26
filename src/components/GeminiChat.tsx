"use client";

import React, { useState } from "react";

const GeminiChat = () => {
  const [text, settext] = useState("");
  const [response, setResponse] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_KEY}`;

  interface GeminiResponse {
    candidates?: [
      {
        content?: {
          parts?: [
            {
              text?: string;
            }
          ];
        };
      }
    ];
  }

  interface GeminiRequest {
    contents: [
      {
        parts: [
          {
            text: string;
          }
        ];
      }
    ];
  }

  const handleASk = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(GEMINI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: text }],
            },
          ],
        } as GeminiRequest),
      });
      console.log("res : ", res);
      if (!res.ok) {
        throw new Error("Error: " + res.statusText);
      }

      const data: GeminiResponse = await res.json();
      setResponse((prev) => [
        ...prev,
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response",
      ]);
      settext("");
    } catch (error: unknown) {
      console.log("error : ", error);
      setError(
        "Error: " + (error instanceof Error ? error.message : String(error))
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-center text-4xl font-bold text-teal-300">
        Chat with me
      </h1>
      <form
        className="flex flex-row items-center gap-4 w-full md:w-1/2"
        onSubmit={handleASk}
      >
        <input
          type="text"
          className="border-2 border-gray-300 rounded-md p-2 w-full"
          placeholder="Lets talk..."
          value={text}
          onChange={(e) => settext(e.target.value)}
        />
        <button type="submit" className="border-2 border-gray-300 rounded-md p-2 cursor-pointer">
          Ask
        </button>
      </form>
      <p className={`${error ? "block" : "hidden"} text-reed-500`}>{error}</p>
      <div className="md:w-1/2 h-[500px] max-h-[500px] overflow-y-auto border border-gray-300 p-8 rounded-2xl">
        {response.length > 0 &&
          response.map((chat, idx) => {
            return (
              <div key={idx + chat} className="flex flex-col gap-2 mb-4">
                {chat}
              </div>
            );
          })}
        {loading && (
          <p className={`${loading ? "block" : "hidden"}`}>
            {loading ? "thinking..." : ""}
          </p>
        )}
      </div>
    </div>
  );
};

export default GeminiChat;
