import { useLivepeerProvider } from '@livepeer/react';
import { useCreateStream } from '@livepeer/react';
import { useState } from 'react';
import { Player } from '@livepeer/react';
export default function Home() {
  const provider = useLivepeerProvider();
  const [streamName, setStreamName] = useState();
  const { mutate: createStream, data: stream } = useCreateStream({
    name: streamName,
  });
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {' '}
      <input
        onChange={(e) => setStreamName(e.target.value)}
        className="p-2 border border-gray-200 rounded-md mt-4 w-1/3"
        placeholder="Stream Name"
      />{' '}
      <button
        onClick={() => createStream?.()}
        className="mt-4 p-2 bg-blue-500 text-white rounded-md"
      >
        {' '}
        Create Stream{' '}
      </button>{' '}
      {stream && (
        <>
          {' '}
          <p className="mt-4">Stream Key: {stream.streamKey}</p>{' '}
          <p className="mt-4">Stream Name: {stream.name}</p>{' '}
          <p className="mt-4">Playback Id: {stream.playbackId}</p>{' '}
          <div className="mt-4 w-1/2">
            {' '}
            <Player
              title={stream.name}
              playbackId={stream.playbackId}
              showPipButton
            />{' '}
          </div>{' '}
        </>
      )}{' '}
    </div>
  );
}
