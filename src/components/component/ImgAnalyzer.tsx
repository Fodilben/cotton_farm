"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
interface ImgAnalyzerProps {
  setAnalysisResult: (newData: object) => void;
}
export function ImgAnalyzer({ setAnalysisResult }: ImgAnalyzerProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [userErr, setUserErr] = useState('');
  const [dataType, setDataType] = useState("pomos");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  const sendRequest = async (formData: FormData, url: string) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.result);
      const newData = {
        res: data.result as string,
        type: formData.get("type") as string,
      };
      setAnalysisResult(newData);
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
    formData.append("type", dataType.trim());
    if (prompt.trim()) {
      formData.append("prompt", prompt.trim());
    }
    if (userErr.trim()) {
      formData.append("userErr", userErr.trim());
    }

    const url = dataType === "task" ? "/api/img/tasks" : "/api/img/pomos";
    await sendRequest(formData, url);
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
            <Label>Type of Data</Label>
            <RadioGroup
              value={dataType}
              onValueChange={setDataType}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="task" id="task" />
                <Label htmlFor="task">Task</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pomos" id="pomos" />
                <Label htmlFor="pomos">Pomos</Label>
              </div>
            </RadioGroup>
          </div>
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
