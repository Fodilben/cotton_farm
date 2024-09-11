import {ImgAnalyzer} from "./ImgAnalyzer";
import {StateVerify} from "./StateVerify";
import { useState } from "react";
import {ReportModel} from "./ReportModel"

export default function Productivity() {
    const [analysisResult, setAnalysisResult] = useState(undefined);
    console.log(analysisResult);
  return (
    <div className="grid gap-6">
      <ImgAnalyzer setAnalysisResult={setAnalysisResult} />
      {analysisResult && <StateVerify analysisResult={analysisResult} />}
   
    </div>
  );
}