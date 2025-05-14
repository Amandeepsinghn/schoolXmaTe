export function TestGeneration() {
  return (
    <div className="flex flex-col bg-grey-400 p-4 rounded-3xl mr-96 gap-1 ">
      <div>Give a Subject for the quiz</div>
      <div className="bg-grey-200 p-4 mr-96 rounded-2xl">
        <input type="text" placeholder="Enter a subject" />
      </div>
      <div>Give a topic for the quiz</div>
      <div className="bg-grey-200 p-4 mr-96 rounded-2xl">
        <input type="text" placeholder="Enter a topic" />
      </div>
      <div>Select difficulty level</div>
      <div className="flex gap-4">
        <button className="bg-grey-200 text-black rounded-2xl hover:bg-gray-300 transition px-6 py-2">Easy</button>
        <button className="bg-grey-200 text-black rounded-2xl hover:bg-gray-300 transition px-6 py-2">Medium</button>
        <button className="bg-grey-200 text-black rounded-2xl hover:bg-gray-300 transition px-6 py-2">Hard</button>
      </div>
    </div>
  );
}
