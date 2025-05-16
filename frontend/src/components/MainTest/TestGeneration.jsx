export function TestGeneration({ subject, setSubject, title, setTopic, difficulty, setDifficulty }) {
  return (
    <div className="flex flex-col bg-grey-400 p-4 rounded-3xl mr-96 gap-1 ">
      <div>Give a Subject for the quiz</div>
      <div className="bg-grey-200 p-4 mr-96 rounded-2xl">
        <input type="text" placeholder="Enter a subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>
      <div>Give a topic for the quiz</div>
      <div className="bg-grey-200 p-4 mr-96 rounded-2xl">
        <input type="text" placeholder="Enter a topic" value={title} onChange={(e) => setTopic(e.target.value)} />
      </div>
      <div>Select difficulty level</div>
      <div className="flex gap-4">
        {["Easy", "Medium", "Hard"].map((level) => (
          <button
            key={level}
            className={`${
              difficulty === level ? "bg-gray-300" : "bg-gray-200"
            } text-black rounded-2xl hover:bg-gray-300 transition px-6 py-2`}
            onClick={() => setDifficulty(level)}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
}
