# Typing Trainer

A modern web application designed to help users improve their typing speed and accuracy through various interactive games and exercises.

## Features

- Multiple typing games (Word Race, etc.)
- Real-time performance tracking
- Progress badges and achievements
- Typing tips and best practices
- Mobile-friendly interface
- User feedback system

## Technologies Used

- React
- Firebase (Authentication, Firestore, Storage)
- Framer Motion (Animations)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
  ├── components/         # React components
  ├── firebase.js        # Firebase configuration
  ├── App.jsx           # Main application component
  └── main.jsx          # Entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
