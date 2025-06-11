import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {COLORS} from '../theme/colors';
import {FONTS} from '../theme/fonts';
import {ScrollView} from 'react-native-gesture-handler';

const SettingsScreen = () => {
  const [getResult, setGetResult] = useState(null);
  const [postResult, setPostResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [userList, setUserList] = useState([]);
  const [listError, setListError] = useState('');

  const handleGet = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users/1',
      );
      const data = await response.json();
      setGetResult(data);
    } catch (error) {
      setGetResult({error: 'GET failed'});
    }
    setLoading(false);
  };

  const handlePost = async () => {
    setLoading2(true);
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            userId: 1,
            title: 'Profile Update',
            body: 'This is a test update.',
          }),
        },
      );
      const data = await response.json();
      setPostResult(data);
    } catch (error) {
      setPostResult({error: 'POST failed'});
    }
    setLoading2(false);
  };

  const handleGetList = async () => {
    setLoading3(true);
    setListError('');
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
      );
      const data = await response.json();
      setUserList(data);
    } catch (error) {
      setListError('Failed to fetch user list');
      setUserList([]);
    }
    setLoading3(false);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Settings</Text>
        <Button title="Try GET API" onPress={handleGet} />
        {loading && <ActivityIndicator />}
        {getResult && !getResult.error && (
          <View style={styles.card}>
            <Text style={styles.label}>User Name:</Text>
            <Text style={styles.value}>{getResult.name}</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{getResult.email}</Text>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{getResult.phone}</Text>
          </View>
        )}
        {getResult && getResult.error && (
          <Text style={styles.errorText}>{getResult.error}</Text>
        )}
        <Button title="Try POST API" onPress={handlePost} />
        {postResult && !postResult.error && (
          <View style={styles.card}>
            <Text style={styles.label}>Post ID:</Text>
            <Text style={styles.value}>{postResult.id}</Text>
            <Text style={styles.label}>Title:</Text>
            <Text style={styles.value}>{postResult.title}</Text>
            <Text style={styles.label}>Body:</Text>
            <Text style={styles.value}>{postResult.body}</Text>
          </View>
        )}
        {postResult && postResult.error && (
          <Text style={styles.errorText}>{postResult.error}</Text>
        )}
        <Button title="Show User List" onPress={handleGetList} />
        {loading3 && <ActivityIndicator />}
        {listError ? <Text style={styles.errorText}>{listError}</Text> : null}
        {userList.length > 0 && (
          <FlatList
            data={userList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.card}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{item.name}</Text>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{item.email}</Text>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{item.phone}</Text>
              </View>
            )}
            style={{width: '100%'}}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 20,
  },
  text: {
    fontFamily: FONTS.title,
    fontSize: 20,
    color: COLORS.text.primary,
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.background?.secondary || '#f0f0f0',
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
    width: 300,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontFamily: FONTS.description,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginTop: 8,
  },
  value: {
    fontFamily: FONTS.description,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  errorText: {
    color: COLORS.error || 'red',
    fontFamily: FONTS.description,
    marginVertical: 10,
  },
});

export default SettingsScreen;
