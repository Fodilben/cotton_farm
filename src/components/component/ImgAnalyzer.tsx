"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";
interface ImgAnalyzerProps {
  setAnalysisResult: (result: string) => void;
}
export function ImgAnalyzer({ setAnalysisResult }: ImgAnalyzerProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [prompt, setPrompt] = useState("");
  

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };
const toggleAdvanced = () => {
  setShowAdvanced(!showAdvanced);
};
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select an image file");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("/api/img", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.result);

      setAnalysisResult(data.result);
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
    setIsLoading(false);
  };
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-background border border-border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-2">Message Analyzer</h2>
      <p className="text-muted-foreground mb-6">
        Paste a message and I will analyze it for you
      </p>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">Message File</Label>
            <Input id="message" type="file" onChange={handleFileChange} />
          </div>

          {showAdvanced && (
            <>
              <div className="space-y-2">
                <Label htmlFor="prompt">Prompt</Label>
                <Input
                  id="prompt"
                  placeholder="Enter prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="error">Error</Label>
                <Input
                  id="error"
                  placeholder="Enter error"
                  value={error || ""}
                  onChange={(e) => setError(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <div className="mt-6 space-y-4">
          <Button disabled={!selectedFile} type="submit" className="w-full">
            {isLoading ? "processiong" : "analyze"}
          </Button>
          <Button
            variant="link"
            className="w-full text-sm"
            onClick={toggleAdvanced}
          >
            {showAdvanced ? (
              <>
                Hide Advanced Options <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Show Advanced Options <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
