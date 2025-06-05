import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {COLORS} from '../theme/colors';
import {FONTS} from '../theme/fonts';
import FilterModal from '../components/FilterModal';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const filterOptions = [
  {key: 'all', label: 'All'},
  {key: 'b1g1', label: 'Buy 1 get 1'},
  {key: 'discount3', label: 'Discount for 3'},
];

const BrandPromotionsScreen = ({route}) => {
  const navigation = useNavigation();
  const {brandId, brandTitle} = route.params;
  const [favorites, setFavorites] = React.useState({});
  const [isFilterVisible, setFilterVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [expandedDesc, setExpandedDesc] = useState({});
  const [selectedFilter, setSelectedFilter] = useState('all');

  const toggleDesc = id => {
    setExpandedDesc(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleFilter = () => {
    setFilterVisible(!isFilterVisible);
  };
  const promotion = useSelector((state: RootState) =>
    state.manufacturers.gridCards.find(
      card => String(card.id) === String(brandId),
    ),
  );
  const products = useSelector(state =>
    state.manufacturers.products.filter(
      product => String(product.brandId) === String(brandId),
    ),
  );

  const toggleFavorite = id => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredProducts = products.filter(product => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'b1g1') return product.promotionType === 'b1g1';
    if (selectedFilter === 'discount3')
      return product.promotionType === 'discount3';
    return true;
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          marginVertical: 20,
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
        {promotion ? (
          <View style={styles.card}>
            <Image source={promotion.image} style={styles.image} />
            {/* <Text style={styles.cardTitle}>{promotion.title}</Text> */}
          </View>
        ) : (
          <Text>No promotion found for this brand.</Text>
        )}
        <Text style={styles.title}>{brandTitle}</Text>

        <View>
          <FlatList
            data={filterOptions}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedFilter === item.key && {
                    backgroundColor: COLORS.background.primary,
                  },
                ]}
                onPress={() => setSelectedFilter(item.key)}>
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedFilter === item.key && {color: COLORS.white},
                  ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.divider} />

        <View>
          <Text style={[styles.title, {fontSize: 16}]}>
            Main Promotions & Discounts
          </Text>
        </View>

        <View style={{flex: 1}}>
          <FlatList
            data={filteredProducts}
            numColumns={3}
            keyExtractor={item => item.id}
            contentContainerStyle={{paddingBottom: 20}}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.productCard}
                onPress={() =>
                  navigation.navigate('Product', {
                    productId: item.id,
                    brandTitle,
                  })
                }>
                {item.previousCost > item.newCost && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountBadgeText}>
                      {Math.round(
                        ((item.previousCost - item.newCost) /
                          item.previousCost) *
                          100,
                      )}
                      %
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.favoriteIcon}
                  onPress={() => toggleFavorite(item.id)}>
                  <Icon
                    name={favorites[item.id] ? 'heart' : 'heart-o'}
                    size={12}
                    color={
                      favorites[item.id] ? COLORS.favourite : COLORS.favourite
                    }
                  />
                </TouchableOpacity>

                <Image
                  source={
                    Array.isArray(item.image) ? item.image[0] : item.image
                  }
                  style={styles.productImage}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginBottom: 4,
                  }}>
                  <Text
                    style={{
                      color: COLORS.favourite,
                      fontSize: 10,
                      marginRight: 6,
                      fontFamily: FONTS.buttontext,
                    }}>
                    {item.newCost ? `Rs. ${item.newCost}` : ''}
                  </Text>
                  <Text
                    style={{
                      textDecorationLine: 'line-through',
                      color: COLORS.text.secondary,
                      fontSize: 10,

                      fontFamily: FONTS.buttontext,
                    }}>
                    {item.previousCost ? `Rs. ${item.previousCost}` : ''}
                  </Text>
                </View>

                <Text
                  style={styles.productDescription}
                  numberOfLines={expandedDesc[item.id] ? undefined : 2}
                  ellipsizeMode="tail">
                  {item.description}
                </Text>
                {item.description && item.description.length > 40 && (
                  <TouchableOpacity
                    onPress={() => toggleDesc(item.id)}
                    style={{
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                      alignSelf: 'flex-start',
                    }}
                    hitSlop={{top: 8, bottom: 8, left: 8, right: 8}} // Further increases touchable area
                  >
                    <Text
                      style={{
                        color: COLORS.favourite,
                        fontSize: 8,
                        marginTop: 2,
                      }}>
                      {expandedDesc[item.id] ? 'See less' : 'See more'}
                    </Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text>No products for this brand.</Text>}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white, padding: 16},
  title: {fontFamily: FONTS.title, fontSize: 20, marginBottom: 16},
  card: {
    marginBottom: 20,
    backgroundColor: COLORS.filtercard,
    borderRadius: 10,
  },
  image: {width: '100%', height: 200, borderRadius: 10},
  cardTitle: {fontFamily: FONTS.name, fontSize: 16, marginTop: 8},
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
  filterButton: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.background.primary,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: 'center',
    marginRight: 10,
  },
  filterButtonText: {
    fontSize: 14,
    color: COLORS.background.primary,
    padding: 0,
    fontFamily: FONTS.placeholder,
  },
  divider: {
    height: 2,
    backgroundColor: COLORS.background.primary,
    marginVertical: 20,
    width: '100%',
    opacity: 0.5,
  },
  productCard: {
    flex: 1,
    margin: 6,
    borderColor: COLORS.placeholder,
    borderWidth: 2,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: 'center',
    padding: 8,
    minWidth: 100, // Ensures proper sizing in grid
    maxWidth: '32%',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 6,
  },
  productDescription: {
    fontSize: 7,
    textAlign: 'left',
    color: COLORS.text.primary,
    marginTop: 2,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 1,
    padding: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  discountBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: COLORS.favourite,
    borderRadius: 6,
    paddingVertical: 1,
    paddingHorizontal: 4,
    zIndex: 2,
  },
  discountBadgeText: {
    color: COLORS.white,
    fontSize: 8,
    fontFamily: FONTS.buttontext,
    fontWeight: 'bold',
  },
});

export default BrandPromotionsScreen;
