import React from "react";
import WebView from "react-native-webview";

export default function Profile({ route }) {
  const githubUsername = route.params.github_username;

  return (
    <WebView
      style={{ flex: 1 }}
      source={{
        uri: `https://github.com/${githubUsername}`,
      }}
    ></WebView>
  );
}
