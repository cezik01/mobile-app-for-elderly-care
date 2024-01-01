import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, Alert, Linking } from 'react-native';
import { getDatabase, ref, onValue, update, remove } from 'firebase/database';
import { ContactProps } from 'types/ContactProps';

const ContactsScreen = () => {
  const [contacts, setContacts] = useState<ContactProps[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const db = getDatabase();
    const contactsRef = ref(db, 'contacts/');
    const unsubscribe = onValue(contactsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setContacts(Object.values(data));
    });

    return () => unsubscribe();
  }, []);

  const addOrUpdateContact = () => {
    if (name.trim() === '' || phone.trim() === '') {
      Alert.alert('Lütfen hem İsim hem Telefon Numarası giriniz.');
      return;
    }

    const db = getDatabase();
    const newContactRef = ref(db, `contacts/${editingIndex !== null ? editingIndex : contacts.length}`);

    if (isEditing && editingIndex !== null) {
      update(newContactRef, { name, phone }).then(() => {
        cancelEdit();
      });
    } else {
      update(newContactRef, { name, phone }).then(() => {
        setName('');
        setPhone('');
      });
    }
  };

  const deleteContact = (index: number) => {
    const db = getDatabase();
    const contactRef = ref(db, `contacts/${index}`);
    remove(contactRef);
  };

  const startEdit = (index: number) => {
    setName(contacts[index].name);
    setPhone(contacts[index].phone);
    setEditingIndex(index);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setName('');
    setPhone('');
    setIsEditing(false);
    setEditingIndex(null);
  };

  const callContact = (phone: string) => {
    const url = `tel:${phone}`;
    Linking.openURL(url).catch((err) => console.error('Arama başlatılamadı', err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      <TextInput
        placeholder="İsim"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Telefon Numarası"
        value={phone}
        keyboardType="phone-pad"
        onChangeText={setPhone}
        style={styles.input}
      />
      <Button title={isEditing ? "Güncelle" : "Kişi Ekle"} onPress={addOrUpdateContact} />
      {isEditing && <Button title="İptal" onPress={cancelEdit} />}

      <FlatList
        data={contacts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.contactItem}>
            <Text>{item.name} - {item.phone}</Text>
            <Button title="Düzenle" onPress={() => startEdit(index)} />
            <Button title="Ara" onPress={() => callContact(item.phone)} />
            <Button title="Sil" onPress={() => deleteContact(index)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%',
    padding: 10,
    marginVertical: 10,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 5,
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  }
});

export default ContactsScreen;
