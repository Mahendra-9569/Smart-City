# Google Authentication setup

1. Install dependencies:
   - client: `@react-oauth/google`
   - backend: `google-auth-library`

2. Create a Google OAuth 2.0 **Web application** client ID in Google Cloud.
   - Add `http://localhost:5174` (or your frontend URL) to Authorized JavaScript origins.
   - Add your production frontend URL too.

3. Copy the env templates:
   - `client/.env.example` -> `client/.env`
   - `backend/.env.example` -> `backend/.env`

4. Start backend and frontend.

## Flow

- Frontend renders a Google Sign-In button.
- Google returns an ID token in `credential`.
- Frontend sends that credential to `POST /auth/google`.
- Backend verifies the token with Google using `google-auth-library` and creates/updates the user.
- Backend returns your app JWT and user profile.
- Frontend stores them and opens `/dashboard`.
