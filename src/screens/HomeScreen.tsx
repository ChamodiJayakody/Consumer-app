import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
//import * as React from 'react';
import {Avatar, Provider as PaperProvider} from 'react-native-paper';
import {Searchbar} from 'react-native-paper';
import {IconButton, MD3Colors} from 'react-native-paper';
import {Card} from 'react-native-paper';
import {FlatList} from 'react-native';
import {BottomNavigation} from 'react-native-paper';
import { COLORS } from '../theme/colors';

const HomeScreen = ({route, navigation}) => {
  const userName = route.params?.userName || 'User Name';
  const [searchQuery, setSearchQuery] = React.useState('');
  const cardsData = [
    {id: '1', image: require('../card1.png')},
    {id: '2', image: require('../card2.png')},
  ];
  const gridCardsData = [
    {id: '7', image: require('../card7.png'), title: 'AXE'},
    {id: '8', image: require('../card8.png'), title: 'Marmite'},
    {id: '9', image: require('../card9.png'), title: 'Vasline'},
    {id: '10', image: require('../card10.png'), title: 'Lux'},
    {id: '3', image: require('../card3.png'), title: 'Baby Cheramy'},
    {id: '4', image: require('../card4.png'), title: 'Atlas Axillia'},
    {id: '5', image: require('../card5.png'), title: 'Morisons'},
    {id: '6', image: require('../card6.png'), title: 'Clogard'},
  ];

  const MusicRoute = () => <Text>Music</Text>;

  const AlbumsRoute = () => <Text>Albums</Text>;

  const RecentsRoute = () => <Text>Recents</Text>;

  const NotificationsRoute = () => <Text>Notifications</Text>;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'music',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline',
    },
    {key: 'albums', focusedIcon: 'album'},
    {key: 'recents', focusedIcon: 'history'},
    {
      key: 'notifications',
      focusedIcon: 'bell',
      unfocusedIcon: 'bell-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
  });

  const getInitials = name => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View
          style={{
            flex: 0.08,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={[styles.description, {textAlign: 'left'}]}>
              Hello!
            </Text>
            <Text style={styles.title}>{userName}</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Avatar.Text
              size={44}
              label={getInitials(userName)}
              color="COLORS.white"
              style={{backgroundColor: COLORS.background.primary}}
            />
          </View>
        </View>

        <View
          style={{
            flex: 0.08,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 0.9, justifyContent: 'center'}}>
            <Searchbar
              style={[styles.searchbar, {height: 40}]}
              placeholder="Search..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              icon={'magnify'}
            />
          </View>
          <View style={{ justifyContent: 'center'}}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.border,
                borderRadius: 100,
                padding: 8,
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                width: 40,
              }}
              onPress={() => console.log('Pressed')}>
              <Image
                source={require('../filter.png')} 
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.white, 
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 0.3}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={cardsData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Card style={styles.card}>
                <Card.Cover source={item.image} />
              </Card>
            )}
          />
        </View>

        <View style={{flex: 0.09, justifyContent: 'center'}}>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              textAlign: 'left',
              fontSize: 16,
              fontWeight: 'bold',
              color: COLORS.text.primary,
            }}>
            Ongoing Promotions in Unilever Brands
          </Text>
        </View>

        <View style={{flex: 0.45}}>
          <FlatList
            data={gridCardsData}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            columnWrapperStyle={styles.gridRow}
            renderItem={({item}) => (
              <Card style={styles.gridCard}>
                <Card.Cover source={item.image} style={styles.gridCardImage} />
                <View style={styles.gridCardContent}>
                  <Text style={styles.gridCardTitle}>{item.title}</Text>
                  <TouchableOpacity
                    style={styles.subtitleContainer}
                    onPress={() =>
                      console.log(`Clicked ${item.title} promotion`)
                    }>
                    <Text style={styles.gridCardSubtitle}>
                      Ongoing Promotions in {item.title} brand
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            )}
          />
        </View>
      </View>

      <View style={{flex: 0.1}}>
        <BottomNavigation
          style={{backgroundColor: 'COLORS.white'}}
          navigationState={{index, routes}}
          onIndexChange={setIndex}
          renderScene={renderScene}
          activeColor={COLORS.background.primary}
          inactiveColor={COLORS.text.secondary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 0.9,
    padding: 32,
    //justifyContent: 'flex-end',
    //alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    lineHeight: 30,
  },
  description: {
    fontFamily: 'inter',
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 300,
  },

  searchbar: {
    borderRadius: 100,
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderWidth: 1,
  },

  card: {
    marginVertical: 28,
    marginRight: 15,
    width: 345,
    borderRadius: 15,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridCard: {
    width: '48%',
    borderRadius: 10,
    //marginBottom: 16,
    backgroundColor: COLORS.white,
  },
  gridCardImage: {
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  gridCardContent: {
    padding: 12,
  },
  gridCardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  gridCardSubtitle: {
    fontFamily: 'inter',
    fontSize: 8,
    color:COLORS.background.primary,
    lineHeight: 8,
  },
  subtitleContainer: {
    backgroundColor: COLORS.background.secondary,
    padding: 4,
    borderRadius: 4,
    alignSelf: 'flex-start', // contains width to content
  },
});

export default HomeScreen;
