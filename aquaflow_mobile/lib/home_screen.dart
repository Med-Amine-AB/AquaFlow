import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:intl/intl.dart';
import 'package:firebase_auth/firebase_auth.dart'; // Import for user authentication

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance; // Initialize Firebase Auth

  // Get the current user's ID (or handle null if not logged in)
  String? _getCurrentUserId() {
    final User? user = _auth.currentUser;
    return user?.uid;
  }

  Stream<QuerySnapshot> _getUsageStream() {
    String? userId = _getCurrentUserId(); // Get the current user's ID
    if (userId == null) {
      // Handle the case where the user is not logged in.
      // You might return an empty stream or a stream with an error.
      print('User is not logged in.');
      return Stream.empty(); // Return an empty stream
    }

    print('Fetching data for user: $userId'); //for Debug
    return _firestore
        .collection('water_usage')
        .doc(userId) // Specify the user's document ID
        .collection('usage_data') // Add a subcollection for the user data
        .snapshots();
  }

  double _calculateDailyUsage(List<QueryDocumentSnapshot> docs) {
    double totalUsage = 0.0;
    String today = DateFormat('yyyy-MM-dd').format(DateTime.now());

    for (var doc in docs) {
      Timestamp timestamp = doc['timestamp'];
      String docDate = DateFormat('yyyy-MM-dd').format(timestamp.toDate());
      if (docDate == today) {
        totalUsage += doc['usage_liters'];
      }
    }
    return totalUsage;
  }

  @override
  Widget build(BuildContext context) {
    ColorScheme colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: StreamBuilder<QuerySnapshot>(
          stream: _getUsageStream(),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            } 

            if (snapshot.hasError) {
              return Center(child: Text('Error: ${snapshot.error}'));
            }

            if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
              return const Center(child: Text('No data available.'));
            }

            var docs = snapshot.data!.docs;
            double dailyUsage = _calculateDailyUsage(docs);
            var latestDoc = docs.isNotEmpty ? docs.last : null;
            String status = latestDoc != null ? latestDoc['status'] : 'normal';
            double usageLiters = latestDoc != null ? latestDoc['usage_liters'] : 0.0;
            bool isLeakDetected = status == 'leak_detected';

            return Column(
              children: [
                Card(
                  color: colorScheme.surface,
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      children: [
                        Text(
                          'Today\'s Usage',
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: colorScheme.onSurface,
                          ),
                        ),
                        const SizedBox(height: 10),
                        Text(
                          '${dailyUsage.toStringAsFixed(2)} Liters',
                          style: TextStyle(
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                            color: colorScheme.primary,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                Card(
                  color: isLeakDetected ? colorScheme.error : colorScheme.surface,
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      children: [
                        Text(
                          'Current Usage',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: colorScheme.onSurface,
                          ),
                        ),
                        const SizedBox(height: 10),
                        Text(
                          '${usageLiters.toStringAsFixed(2)} Liters',
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: isLeakDetected ? colorScheme.onError : colorScheme.primary,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: isLeakDetected ? () {
                    // Stop leaking logic
                  } : null,
                  child: const Text('Stop Leaking'),
                ),
                const SizedBox(height: 10),
                ElevatedButton(
                  onPressed: () {
                    // Stop water logic
                  },
                  child: const Text('Stop Water'),
                ),
                const Spacer(),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    TextButton(
                      onPressed: () {
                        // Navigate to Settings screen
                      },
                      child: const Text('Settings'),
                    ),
                    TextButton(
                      onPressed: () {
                        // Navigate to Analyze Dashboard screen
                      },
                      child: const Text('Analyze Dashboard'),
                    ),
                  ],
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
