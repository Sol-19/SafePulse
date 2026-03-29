# SafePulse

SafePulse is a student-built hackathon project focused on secure, mobile-first identity verification using one-time passwords (OTP). The project combines a FastAPI backend with an Expo React Native frontend and Supabase as the data/auth backend.

## Tech Stack

- Backend: FastAPI, Supabase Python SDK, Pydantic v2, APScheduler, python-dotenv
- Frontend: Expo, React Native, TypeScript, Expo Router, NativeWind

## Implemented Features

- Request OTP for registration and login.
- Verify OTP with expiration and attempt-limit checks.
- Automatically clean up expired OTP records.
- Create user record after successful registration OTP.
- Mobile login screen scaffold (Expo app).

## API Endpoints

Base URL (local dev): `http://127.0.0.1:8000`

### `GET /`

Health-style root response.

### `POST /api/v1/requestOTP`

Requests an OTP for a mobile number and purpose.

Request body:

```json
{
	"mobile_number": "639XXXXXXXXX",
	"purpose": "registration"
}
```

Notes:

- `purpose` must be `registration` or `login`.
- Philippine mobile format is validated (`639...`, 12 chars).

### `POST /api/v1/authOTP`

Validates OTP and applies purpose-specific logic.

Request body:

```json
{
	"mobile_number": "639XXXXXXXXX",
	"purpose": "registration",
	"otp": "123456"
}
```

Validation rules:

- `mobile_number` must start with `639` and be 12 characters long.
- `purpose` must be `registration` or `login`.

## Environment Variables

Create a `.env` file at the project root (or ensure backend can load it):

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PHIL_SMS_API=your_philsms_token_optional
```

`PHIL_SMS_API` is optional in the current flow unless SMS sending is wired in and enabled.

## Local Development

### 1. Clone and install backend dependencies

```bash
pip install -r requirements.txt
```

### 2. Run backend

From project root:

```bash
uvicorn backend.apiserver:app --reload
```

### 3. Run frontend

```bash
cd frontend
npm install
npm run start
```

Then open the app in Expo Go, emulator, simulator, or web.

## Security and Demo Notes

- Current OTP request endpoint returns OTP in response for development/testing convenience.
- Before production, remove OTP exposure from API responses and route OTP exclusively through trusted delivery channels (SMS/email).

## Repository Structure

```text
SafePulse/
├─ backend/
│  ├─ apiserver.py
│  ├─ auth.py
│  ├─ database.py
│  ├─ payloadmodels.py
│  └─ utils.py
├─ frontend/
│  ├─ app/
│  ├─ components/
│  ├─ constants/
│  ├─ hooks/
│  └─ package.json
├─ requirements.txt
└─ README.md
```
