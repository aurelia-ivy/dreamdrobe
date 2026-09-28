import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ensureAuthenticatedUser } from './src/services/auth';

export default function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleTestAuth = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const user = await ensureAuthenticatedUser();
      if (user) {
        setUserId(user.id);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dreamdrobe ✨</Text>
      <Text style={styles.subtitle}>Supabase Auth Connection Test</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#FF69B4" style={styles.spacer} />
      ) : userId ? (
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Success! Anonymous User ID:</Text>
          <Text style={styles.userIdText}>{userId}</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleTestAuth}>
          <Text style={styles.buttonText}>Test Anonymous Sign-In</Text>
        </TouchableOpacity>
      )}

      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5', // soft lavender blush
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#D81B60',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 32,
  },
  spacer: {
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#FF69B4',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 24,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFD1DC',
    alignItems: 'center',
    width: '100%',
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 8,
  },
  userIdText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  errorText: {
    marginTop: 16,
    color: '#D32F2F',
    fontSize: 13,
    textAlign: 'center',
  },
});