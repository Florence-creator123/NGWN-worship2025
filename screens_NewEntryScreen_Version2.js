import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../auth/AuthProvider';

export default function NewEntryScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth();

  async function save() {
    if (!user) {
      Alert.alert('Not signed in', 'Please sign in to save entries.');
      return;
    }
    if (!title.trim() && !content.trim()) {
      Alert.alert('Please add a title or content');
      return;
    }
    try {
      await addDoc(collection(db, 'entries'), {
        uid: user.uid,
        title: title.trim(),
        content: content.trim(),
        created_at: serverTimestamp()
      });
      navigation.goBack();
    } catch (e) {
      console.warn('Failed to save', e);
      Alert.alert('Save failed', e.message || String(e));
    }
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title (optional)" value={title} onChangeText={setTitle} style={styles.title} />
      <TextInput placeholder="Write your devotional / prayer / note..." value={content} onChangeText={setContent} style={styles.content} multiline />
      <View style={styles.actions}>
        <Button title="Save" onPress={save} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:12 },
  title: { borderColor:'#ccc', borderWidth:1, borderRadius:6, padding:8, marginBottom:12 },
  content: { flex:1, borderColor:'#ccc', borderWidth:1, borderRadius:6, padding:8, textAlignVertical: 'top' },
  actions: { marginTop:12 }
});