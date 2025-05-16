import { TestGeneration } from "./TestGeneration";
import { GenerateButton } from "./GenerateButton";
import { Profile } from "./ProfileSection";
import { useState } from "react";
import axios from "axios";

export function MainBar() {
  const [subject, setSubject] = useState("");
  const [title, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleGenerateQuiz = async () => {
    if (!subject || !title || !difficulty) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/test/insertTest", {
        subject,
        title,
        difficulty,
      });

      console.log("Quiz generated", response.data);
    } catch (error) {
      console.log("error generating quiz", error);
      alert("Failed to generate quiz");
    }
  };

  return (
    <>
      <div className="p-10 pt-20 bg-brown-100 w-full">
        <div className="absolute top-5 right-6">
          <Profile />
        </div>
        <div>
          <h1 className="text-5xl font-bold text-black/75">Welcome Use</h1>
          <h1 className="text-3xl font-bold text-black/75">What do you want to test yourself on ?</h1>
          <br></br>
        </div>
        <TestGeneration
          subject={subject}
          setSubject={setSubject}
          title={title}
          setTopic={setTopic}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
        <GenerateButton onClick={handleGenerateQuiz} />
      </div>
    </>
  );
}
