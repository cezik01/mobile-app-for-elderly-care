import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';
import { Contact } from 'types/ContactType';
import { Linking } from 'react-native';

const ContactsScreen = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addOrUpdateContact = () => {
    if (isEditing && editingIndex !== null) {
      const updatedContacts = contacts.map((contact, index) => {
        if (index === editingIndex) {
          return { name, phone };
        }
        return contact;
      });
      setContacts(updatedContacts);
      cancelEdit();
    } else if (contacts.length < 3) {
      setContacts([...contacts, { name, phone }]);
      setName('');
      setPhone('');
    } else {
      alert('Maksimum 3 kişi ekleyebilirsiniz.');
    }
  };

  const deleteContact = (index: number) => {
    const updatedContacts = contacts.filter((_, contactIndex) => contactIndex !== index);
    setContacts(updatedContacts);
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
      <Text>Contacts Screen</Text>
      <TextInput
        placeholder="İsim"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Telefon Numarası"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <Button title={isEditing ? "Güncelle" : "Kişi Ekle"} onPress={addOrUpdateContact} />
      {isEditing && <Button title="İptal" onPress={cancelEdit} />}

      <FlatList
        data={contacts}
        keyExtractor={(item, index) => index.toString()}
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
});

export default ContactsScreen;