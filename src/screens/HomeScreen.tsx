import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {Card} from 'react-native-paper';
import {FlatList} from 'react-native';
import {COLORS} from '../theme/colors';
import {FONTS} from '../theme/fonts';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import FilterModal from '../components/FilterModal';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../redux/store';
import {setSelectedManufacturer} from '../redux/manufacturersSlice';

const HomeScreen = ({route}) => {
  const userName = route.params?.userName || 'User Name';
  const [searchQuery, setSearchQuery] = React.useState('');
  const [favorites, setFavorites] = React.useState({});
  const [isFilterVisible, setFilterVisible] = React.useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {selectedManufacturer, gridCards, cardsData} = useSelector(
    (state: RootState) => state.manufacturers,
  );

  const handleManufacturerSelect = (manufacturerId: string) => {
    dispatch(setSelectedManufacturer(manufacturerId));
    toggleFilter();
  };

  const filteredCardsData = useMemo(
    () =>
      selectedManufacturer
        ? cardsData.filter(card => card.manufacturerId === selectedManufacturer)
        : cardsData,
    [selectedManufacturer, cardsData],
  );

  const filteredGridCards = useMemo(
    () =>
      selectedManufacturer
        ? gridCards.filter(card => card.manufacturerId === selectedManufacturer)
        : gridCards,
    [selectedManufacturer, gridCards],
  );

  const toggleFilter = () => {
    setFilterVisible(!isFilterVisible);
  };

  const getInitials = name => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const toggleFavorite = id => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  //  useEffect(() => {
  //   // Add any side effects here
  //   console.log('test');
  // }, []);

  const userAvatar = require('../assets/images/avatar.png');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View
          style={{
            marginVertical: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={[styles.hello, {textAlign: 'left'}]}>Hello</Text>
            {/* <Text style={styles.name}>{userName}</Text> */}
            <Text style={styles.name}>Johan Doe</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            {userAvatar ? (
              <Avatar.Image
                size={50}
                source={userAvatar}
                style={{backgroundColor: COLORS.background.primary}}
              />
            ) : (
              <Avatar.Text
                size={50}
                label={getInitials('Johan Doe')}
                color={COLORS.white}
                style={{backgroundColor: COLORS.background.primary}}
              />
            )}
          </View>
        </View>

        <View
          style={{
            marginBottom: 24,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 0.925}}>
            <View style={styles.searchContainer}>
              <Icon
                name="search"
                size={28}
                color={COLORS.navbaricons}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor={COLORS.navbaricons}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          <View style={{justifyContent: 'center'}}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.filtericon,
                borderRadius: 100,
                padding: 8,
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                width: 40,
              }}
              onPress={toggleFilter}>
              <Image
                source={require('../assets/images/filter.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.white,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <FilterModal
              isVisible={isFilterVisible}
              onClose={toggleFilter}
              //onSelectManufacturer={handleManufacturerSelect}
            />
          </View>
        </View>

        <ScrollView fadingEdgeLength={20} showsVerticalScrollIndicator={false}>
          <View style={{}}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={filteredCardsData}
              keyExtractor={item => item.id}
              snapToInterval={370 + 2} // card width + marginRight
              decelerationRate="fast"
              //snapToAlignment="center"
              pagingEnabled={true}
              renderItem={({item}) => (
                <Card style={styles.card}>
                  <Card.Cover source={item.image} />
                </Card>
              )}
            />
          </View>

          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                fontFamily: FONTS.title,
                textAlign: 'left',
                fontSize: 16,
                marginVertical: 20,
                color: COLORS.text.primary,
              }}>
              Ongoing Promotions in{' '}
              {selectedManufacturer === '1'
                ? 'Unilever'
                : selectedManufacturer === '2'
                ? 'Hemas'
                : 'All'}{' '}
              Brands
            </Text>
          </View>

          <FlatList
            data={filteredGridCards}
            numColumns={2}
            contentContainerStyle={{marginHorizontal: 5}}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            columnWrapperStyle={styles.gridRow}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.gridCard}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('BrandPromotions', {
                    brandId: item.id,
                    brandTitle: item.title,
                  })
                }>
                <Card.Cover source={item.image} style={styles.gridCardImage} />

                <Card style={styles.gridCardContent}>
                  <View style={styles.titleContainer}>
                    <Image
                      source={item.logo}
                      style={styles.brandLogo}
                      resizeMode="contain"
                    />
                    <Text style={styles.gridCardTitle}>{item.title}</Text>
                  </View>

                  <View style={styles.subtitleContainer}>
                    <Text style={styles.gridCardSubtitle}>
                      Ongoing Promotions in {item.title} brand
                    </Text>
                  </View>
                </Card>

                <TouchableOpacity
                  style={styles.favoriteIcon}
                  onPress={() => toggleFavorite(item.id)}>
                  <Image
                    source={require('../assets/images/favourite.png')}
                    style={{
                      width: 14,
                      height: 14,
                      tintColor: favorites[item.id]
                        ? COLORS.favourite
                        : COLORS.text.secondary,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
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
    flex: 1,
    padding: 20,
    paddingBottom: 0,
    marginBottom: 55,
  },
  name: {
    fontFamily: FONTS.name,
    textAlign: 'center',
    fontSize: 24,
    color: COLORS.text.primary,
    lineHeight: 30,
  },
  hello: {
    fontFamily: FONTS.name,
    fontSize: 16,
    color: COLORS.navbaricons,
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 300,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.navbaricons,
    paddingHorizontal: 8,
    height: 40,
  },
  searchIcon: {
    width: 28,
    height: 28,
    tintColor: COLORS.navbaricons,
    marginHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.navbaricons,
    padding: 0,
    fontFamily: FONTS.placeholder,
  },
  card: {
    //marginVertical: 28,
    marginRight: 2,
    width: 370,
    borderRadius: 15,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridCard: {
    width: '48.5%',
    borderRadius: 10,
    marginBottom: 45,
    height: 120,
    position: 'relative',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  gridCardImage: {
    height: 120,
    borderRadius: 10,
  },
  gridCardContent: {
    padding: 8,
    position: 'absolute',
    width: '90%',
    bottom: -35,
    marginLeft: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    //alignItems: 'center',
    marginBottom: 4,
    width: '100%',
  },
  brandLogo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  gridCardTitle: {
    fontFamily: FONTS.name,
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  gridCardSubtitle: {
    fontFamily: 'inter',
    fontSize: 7,
    color: COLORS.text.promotions,
    lineHeight: 8,
  },
  subtitleContainer: {
    backgroundColor: COLORS.background.secondary,
    padding: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 4,
    zIndex: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  filterContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 300,
  },
  filterHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  filterIndicator: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 8,
  },
  headerButton: {
    padding: 8,
  },
  filterTitle: {
    fontFamily: FONTS.title,
    fontSize: 18,
    color: COLORS.text.primary,
    flex: 1,
    textAlign: 'center',
  },
});

export default HomeScreen;
