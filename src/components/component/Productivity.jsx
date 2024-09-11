import {ImgAnalyzer} from "./ImgAnalyzer";
import {StateVerify} from "./StateVerify";
import { useState } from "react";
import { TasksVerify } from './TasksVerify'

export default function Productivity() {
    const [analysisResult, setAnalysisResult] = useState(undefined);
    
  return (
    <div className="grid gap-6">
      <ImgAnalyzer setAnalysisResult={setAnalysisResult} />
      {/* {analysisResult && <StateVerify analysisResult={analysisResult} />} */}
      {analysisResult && (
        analysisResult.type === "pomos" ? (
          <StateVerify analysisResult={analysisResult.res} />
        ) : (
          <TasksVerify analysisResult={analysisResult.res} />
        )
      )}
    </div>
  );
}