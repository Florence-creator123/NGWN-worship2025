import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { useAuth } from '../auth/AuthProvider';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  async function onSignIn() {
    try {
      await signIn(email.trim(), password);
    } catch (e) {
      Alert.alert('Sign in failed', e.message || String(e));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WORSHIP DIARY</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Sign In" onPress={onSignIn} />
      <View style={{height:12}} />
      <Text style={styles.small}>If you don't have an account, go to Sign Up.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, justifyContent:'center' },
  title: { fontSize:24, fontWeight:'700', textAlign:'center', marginBottom:16 },
  input: { borderColor:'#ccc', borderWidth:1, borderRadius:6, padding:8, marginBottom:12 },
  small: { textAlign:'center', color:'#666' }
});