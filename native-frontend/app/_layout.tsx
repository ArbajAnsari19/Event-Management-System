import { Stack } from "expo-router";
import { AuthProvider } from '../context/auth';
import { EventProvider } from '../context/event';
export default function RootLayout() {
  return (
    
    <AuthProvider>
      <EventProvider>
          <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
              <Stack.Screen
                name="event/[id]"
                options={{ headerTitle: 'Event Details' }} 
              />
            </Stack>
      </EventProvider>
    </AuthProvider>
  );
}

