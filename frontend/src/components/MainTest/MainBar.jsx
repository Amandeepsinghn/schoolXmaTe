import { TestGeneration } from "./TestGeneration";
import { GenerateButton } from "./GenerateButton";
import { Profile } from "./ProfileSection";
export function MainBar() {
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
        <TestGeneration />
        <GenerateButton />
      </div>
    </>
  );
}
