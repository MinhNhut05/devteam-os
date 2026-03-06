const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * GoogleLoginButton — redirects to backend Google OAuth endpoint.
 * Backend handles OAuth flow and redirects back with auth cookie.
 */
export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    // Backend will redirect to Google → callback → redirect back to FE with cookie
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <button type="button" className="mt-4 w-full btn-secondary" onClick={handleGoogleLogin}>
      <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
      Đăng nhập với Google
    </button>
  );
}
