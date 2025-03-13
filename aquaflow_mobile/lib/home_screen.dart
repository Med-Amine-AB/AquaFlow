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

  bool isLeakDetected = false;
  bool isWaterStopped = false;

  @override
  void initState() {
    super.initState();
  }

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
        .collection('users')
        .doc(userId)
        .collection('water_usage')
        .orderBy('timestamp', descending: true) // Ensure the latest document is fetched first
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

  Future<void> _updateAction(String action, bool active) async {
    String? userId = _getCurrentUserId();
    if (userId == null) {
      print('User is not logged in.');
      return;
    }

    try {
      await _firestore
          .collection('users')
          .doc(userId)
          .collection('actions')
          .doc(action)
          .set({'active': active});
      print('Action $action updated to $active');
    } catch (e) {
      print('Error updating action $action: $e');
    }
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
              print('Error: ${snapshot.error}');
              return Center(child: Text('Error: ${snapshot.error}'));
            }

            if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
              print('No data available.');
              return const Center(child: Text('No data available.'));
            }

            var docs = snapshot.data!.docs;
            print('Fetched ${docs.length} documents.');
            double dailyUsage = _calculateDailyUsage(docs);
            var latestDoc = docs.isNotEmpty ? docs.first : null; // Fetch the latest document
            String status = latestDoc != null ? latestDoc['status'] : 'normal';
            double usageLiters = latestDoc != null ? latestDoc['usage_liters'] : 0.0;
            isLeakDetected = status == 'leak_detected';
            isWaterStopped = latestDoc != null ? latestDoc['auto_block'] : false;

            print('Daily Usage: $dailyUsage');
            print('Current Usage: $usageLiters');
            print('Status: $status');

            return Column(
              children: [
                Card(
                  color: colorScheme.secondary,
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Today\'s Usage',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.w700,
                            color: colorScheme.onSurface,
                          ),
                        ),
                        const SizedBox(height: 10),
                        Text(
                          '${dailyUsage.toStringAsFixed(2)} Liters',
                          style: TextStyle(
                            fontSize: 28,
                            fontWeight: FontWeight.bold,
                            color: colorScheme.primary,
                          ),
                        ),
                        const Divider(height: 30, thickness: 1),
                        Text(
                          'Current Usage',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                            color: colorScheme.onSurface,
                          ),
                        ),
                        const SizedBox(height: 10),
                        Text(
                          '${usageLiters.toStringAsFixed(2)} Liters',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: isLeakDetected ? colorScheme.onError : colorScheme.primary,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    onPressed: isLeakDetected && usageLiters > 0 ? () {
                      _updateAction('stop_leak', true);
                    } : null,
                    child: Text(
                      'Warning: Leak Detected',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w500,
                        color: isLeakDetected && usageLiters > 0 ? Theme.of(context).scaffoldBackgroundColor : colorScheme.onSurface,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    onPressed: !isWaterStopped ? () {
                      _updateAction('stop_water', true);
                    } : null,
                    child: Text(
                      'Stop Water',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w500,
                        color: !isWaterStopped ? Theme.of(context).scaffoldBackgroundColor : colorScheme.onSurface,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    onPressed: isWaterStopped ? () {
                      _updateAction('stop_water', false);
                    } : null,
                    child: Text(
                      'Start Water',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w500,
                        color: isWaterStopped ? Theme.of(context).scaffoldBackgroundColor : colorScheme.onSurface,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    onPressed: isLeakDetected ? () {
                      _updateAction('stop_leak', false);
                    } : null,
                    child: Text(
                      'Leak Resolved',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w500,
                        color: isLeakDetected ? Theme.of(context).scaffoldBackgroundColor : colorScheme.onSurface,
                      ),
                    ),
                  ),
                ),
                const Spacer(),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8.0),
                  child: SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      onPressed: () {
                        // Navigate to Settings screen
                      },
                      child: Text(
                        'Settings',
                        style: TextStyle(
                          color: Theme.of(context).scaffoldBackgroundColor,
                          fontSize: 18,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
