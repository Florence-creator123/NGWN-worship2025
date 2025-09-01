import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function EntryCard({ entry, onDelete }) {
  // entry.created_at may be a Firestore Timestamp or a string
  let dateText = '';
  if (!entry.created_at) dateText = '';
  else if (entry.created_at.toDate) dateText = entry.created_at.toDate().toLocaleString();
  else dateText = new Date(entry.created_at).toLocaleString();

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Text style={styles.title}>{entry.title || 'Untitled'}</Text>
        <Text style={styles.date}>{dateText}</Text>
      </View>
      <Text style={styles.content}>{entry.content}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onDelete}><Text style={styles.delete}>Delete</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding:12, borderRadius:8, borderWidth:1, borderColor:'#eee', marginBottom:8 },
  top: { flexDirection:'row', justifyContent:'space-between', marginBottom:8 },
  title: { fontWeight:'600' },
  date: { color:'#666', fontSize:12 },
  content: { color:'#333' },
  actions: { marginTop:8, alignItems:'flex-end' },
  delete: { color:'#cc3333' }
});