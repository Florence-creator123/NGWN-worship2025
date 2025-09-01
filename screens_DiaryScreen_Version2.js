import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, StyleSheet, Text, Alert } from 'react-native';
import EntryCard from '../components/EntryCard';
import { db } from '../firebase/config';
import { collection, query, where, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../auth/AuthProvider';

export default function DiaryScreen({ navigation }) {
  const [entries, setEntries] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'entries'),
      where('uid', '==', user.uid),
      orderBy('created_at', 'desc')
    );
    const unsubscribe = onSnapshot(q, snapshot => {
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setEntries(list);
    }, err => {
      console.warn('Firestore listen error', err);
      Alert.alert('Error', 'Failed to load entries.');
    });
    return unsubscribe;
  }, [user]);

  async function deleteEntry(id) {
    try {
      await deleteDoc(doc(db, 'entries', id));
    } catch (e) {
      console.warn('Delete failed', e);
      Alert.alert('Delete failed', e.message || String(e));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="New" onPress={() => navigation.navigate('NewEntry')} />
      </View>
      {entries.length === 0 ? (
        <View style={styles.empty}><Text>No entries yet. Tap New to add one.</Text></View>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item)=>item.id}
          renderItem={({item})=>(
            <EntryCard entry={item} onDelete={()=>deleteEntry(item.id)} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:12 },
  header: { marginBottom:8, alignItems:'flex-end' },
  empty: { flex:1, alignItems:'center', justifyContent:'center', paddingTop:40 }
});