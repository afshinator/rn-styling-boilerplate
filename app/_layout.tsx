import {
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
 
import { usePreferences } from "@/hooks/use-preference";
import { ActivityIndicator, Platform, View } from "react-native";


const queryClient = new QueryClient();

export const unstable_settings = {
  anchor: "(tabs)",
};

const LoadingGuard = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

function RootLayoutContent() {
  const { data: prefs, isPending } = usePreferences();

  // Loading Guard - show loading screen while prefs are fetched from AsyncStorage
  if (isPending || !prefs) {
    return (
      <LoadingGuard />
    );
  }

  // const theme = prefs.resolvedColorScheme === "dark" ? DarkTheme : DefaultTheme;
  // const statusBarStyle =
  //   prefs.resolvedColorScheme === "dark" ? "light" : "dark";
console.log('what we got ', prefs)
const theme=DefaultTheme
const statusBarStyle = 'light'
  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>

      <StatusBar style={statusBarStyle} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayoutContent />
      
      {/* Conditionally render ReactQueryDevtools only on Web in development */}
      {Platform.OS === 'web' && process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={true} />
      )}
    </QueryClientProvider>
  );
}