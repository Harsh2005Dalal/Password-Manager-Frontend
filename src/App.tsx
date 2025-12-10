import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';

type AuthView = 'login' | 'signup' | 'forgotPassword';

function App() {
  const { user, loading } = useAuth();
  const [authView, setAuthView] = useState<AuthView>('login');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Dashboard />;
  }

  return (
    <>
      {authView === 'login' && (
        <Login
          onSwitchToSignup={() => setAuthView('signup')}
          onSwitchToForgotPassword={() => setAuthView('forgotPassword')}
        />
      )}
      {authView === 'signup' && (
        <Signup onSwitchToLogin={() => setAuthView('login')} />
      )}
      {authView === 'forgotPassword' && (
        <ForgotPassword onSwitchToLogin={() => setAuthView('login')} />
      )}
    </>
  );
}

export default App;
