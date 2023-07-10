import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./voice.css";

const Voice = () => {
  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleCopyToClipboard = () => {
    setIsCopied(true);
    setTextToCopy(transcript);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <>
      <div>
        <br />
        <h2 className="voiceh2">Speech to Text Converter</h2>

        <div className="main-content" onClick={() => setTextToCopy(transcript)}>
          {transcript}
        </div>

        <div className="btn-style">
          <CopyToClipboard text={textToCopy} onCopy={handleCopyToClipboard}>
            <button className="voicebtn">
              {isCopied ? "Copied!" : "Copy to clipboard"}
            </button>
          </CopyToClipboard>
          <button className="voicebtn" onClick={startListening}>
            Start Listening
          </button>
          <button
            className="voicebtn"
            onClick={SpeechRecognition.stopListening}
          >
            Stop Listening
          </button>
          <button className="voicebtn" onClick={resetTranscript}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default Voice;
