import { Button } from "../ui/button";

export default function Discarding({isCurrent, currentUsername}: {isCurrent: boolean, currentUsername: string | null}) {

  return (
    <div>
      {isCurrent && (
        <>
        <p className="text-white sm:text-lg md:text-xl pb-2">Choose three cards to discard</p>
        <Button>Play</Button>
        </>
      )}

      {!isCurrent && (
        <p className="text-white sm:text-lg md:text-xl pb-2">Waiting for {currentUsername} to discard...</p>
      )}
    </div>
  )
}