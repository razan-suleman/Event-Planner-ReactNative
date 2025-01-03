import { AuthProvider } from '../../app/(tabs)/services/AuthService';
import TabLayout from '../../app/(tabs)/_layout';

export default function App() {
  return (
    <AuthProvider>
      <TabLayout />
    </AuthProvider>
  );
}