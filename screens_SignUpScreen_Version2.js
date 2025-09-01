import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { useAuth } from '../auth/AuthProvider';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useAuth();

  async function onSignUp() {
    try {
      await signUp(email.trim(), password);
    } catch (e) {
      Alert.alert('Sign up failed', e.message || String(e));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Password (min 6 chars)" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Sign Up" onPress={onSignUp} />
      <View style={{height:12}} />
      <Text style={styles.small}>After signing up you'll be taken to the app.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, justifyContent:'center' },
  title: { fontSize:20, fontWeight:'700', textAlign:'center', marginBottom:16 },
  input: { borderColor:'#ccc', borderWidth:1, borderRadius:6, padding:8, marginBottom:12 },
  small: { textAlign:'center', color:'#666' }
});