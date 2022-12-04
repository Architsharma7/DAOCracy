import {
  CreateReactClient,
  studioProvider,
  LivepeerConfig,
  createReactClient,
} from '@livepeer/react';

const client = createReactClient({
  provider: studioProvider({
    apiKey: 'dccba7dc-6095-48f0-b803-77e9ce9006a5',
  }),
});
