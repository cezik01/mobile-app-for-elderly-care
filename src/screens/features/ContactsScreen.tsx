import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, Alert, Linking, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue, update, remove } from 'firebase/database';
import { ContactProps } from 'types/ContactProps';
import { setNameHandler } from 'helpers/validationSchemas/alphabeticalInputValidation';
import { ContactsScreenProps } from 'types/ContactsScreenProps';
import { MaterialIcons } from '@expo/vector-icons';
import i18n from 'common/i18n/i18n';

const ContactsScreen = ({ navigation }: ContactsScreenProps) => {
  const [contacts, setContacts] = useState<ContactProps[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isError, setIsError] = useState(false);

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

  const handleHelpPress = () => {
    navigation.navigate('Help Screen')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      <TextInput
        placeholder="İsim"
        value={name}
        onChangeText={(text) => setNameHandler(text, setIsError, setName)}
        style={styles.input}
      />
      {isError && <Text style={styles.errorText}>Lütfen geçerli bir İsim giriniz.</Text>}

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
      <TouchableOpacity onPress={handleHelpPress}
      >
        <View style={styles.questionMarkContainer}>
          <MaterialIcons name='help' style={styles.questionMarkIcon} size={25} />
          <Text style={styles.helpText}>
            {i18n.t('Help')}
          </Text>
        </View>
      </TouchableOpacity>
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
  errorText: {
    color: 'red',
    marginRight: 'auto',
    marginLeft: 40,
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
  },
  questionMarkIcon: {
    color: 'blue',
    marginRight: 5,
    marginBottom: 15,
  },
  questionMarkContainer: {
    flexDirection: 'row',
    marginTop: '20%',
    marginLeft: 5,
  },
  helpText: {
    fontSize: 20,
    color: 'blue',
  },
});

export default ContactsScreen;
