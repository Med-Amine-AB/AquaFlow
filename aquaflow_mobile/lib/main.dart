import 'package:aquaflow_mobile/login_screen.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized(); // Ensures Flutter is ready
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      showSemanticsDebugger: false,
      theme: ThemeData.dark().copyWith(
        primaryColor: const Color(0xFF5BE7C4),
        scaffoldBackgroundColor: const Color(0xFF1E1E1E),
        colorScheme: ColorScheme.dark(
          primary: const Color(0xFF5BE7C4),
          secondary: const Color(0xFF7A56D0),
          surface: const Color(0xFF5BE7C4),
          onPrimary: const Color(0xFF4FC0E8),
          onSecondary: const Color(0xFFF6F7FB),
          onSurface: const Color(0xFFF6F7FB),
          onError: const Color(0xFFD32F2F),
        ),
        textTheme: const TextTheme(
        ),
      ),
      home: const Scaffold(body: LoginScreen()),
    );
  }
}
