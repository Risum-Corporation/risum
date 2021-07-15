/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Feed: {
            screens: {
              Feed: "one",
            },
          },
          HypeTrain: {
            screens: {
              HypeTrain: "two",
            },
            WolfPack: {
              screens: {
                WolfPack: "three",
              },
            },
            AddMeme: {
              screens: {
                AddMeme: "four",
              },
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
