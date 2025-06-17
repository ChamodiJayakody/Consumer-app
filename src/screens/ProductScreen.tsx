import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../redux/store';
import {COLORS} from '../theme/colors';
import {FONTS} from '../theme/fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import ImageViewer from 'react-native-image-zoom-viewer';
import {toggleFavorite} from '../redux/manufacturersSlice';

const IMAGE_SIZE = 300;

const ProductScreen = ({route}) => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = React.useState('Shop');
  const [galleryVisible, setGalleryVisible] = React.useState(false);
  const [galleryIndex, setGalleryIndex] = React.useState(0);
  const {productId, brandId, brandTitle} = route.params;
  const [galleryCurrentIndex, setGalleryCurrentIndex] = React.useState(0);
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.manufacturers.favorites,
  );
  const product = useSelector((state: RootState) =>
    state.manufacturers.products.find(p => p.id === productId),
  );

  const defaultProductImage = require('../assets/images/default-product.png');

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Product not found.</Text>
      </View>
    );
  }
  const images = product.image;

  const viewerImages = images.map(img => ({
    url: '', // required, but empty for local images
    props: {source: img},
  }));

  return (
    <ScrollView fadingEdgeLength={20} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={28} color={COLORS.text.primary} />
          </TouchableOpacity>

          {/* Favourite Button */}
          <TouchableOpacity
            style={styles.favButton}
            onPress={() => dispatch(toggleFavorite(product.id))}>
            <FAIcon
              name={favorites[product.id] ? 'heart' : 'heart-o'}
              size={24}
              color={COLORS.favourite}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <FlatList
            data={images?.length ? images : [defaultProductImage]}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  setGalleryIndex(index);
                  setGalleryVisible(true);
                }}>
                <Image
                  source={typeof item === 'string' ? {uri: item} : item}
                  style={styles.image}
                  resizeMode="contain"
                  defaultSource={defaultProductImage}
                />
              </TouchableOpacity>
            )}
            onMomentumScrollEnd={e => {
              const index = Math.round(e.nativeEvent.contentOffset.x / 300);
              setGalleryIndex(index);
            }}
            style={{width: 300, height: 300}}
          />
          <View style={styles.indicatorContainer}>
            {images.map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.indicator,
                  idx === galleryIndex && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Modal Gallery */}
        <Modal
          visible={galleryVisible}
          transparent={true}
          onRequestClose={() => setGalleryVisible(false)}>
          <ImageViewer
            imageUrls={viewerImages}
            index={galleryIndex}
            enableSwipeDown
            onSwipeDown={() => setGalleryVisible(false)}
            onCancel={() => setGalleryVisible(false)}
            saveToLocalByLongPress={false}
            backgroundColor="#fff"
            onChange={idx => setGalleryCurrentIndex(idx ?? 0)}
            renderIndicator={() => (
              <View
                style={{
                  position: 'absolute',
                  bottom: 30,
                  alignSelf: 'center',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  borderRadius: 12,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                }}>
                <Text style={{color: '#fff', fontSize: 12}}>
                  {galleryCurrentIndex + 1} / {viewerImages.length}
                </Text>
              </View>
            )}
          />
        </Modal>

        <View style={styles.subcontainer}>
          <Text style={styles.title}>{brandTitle}</Text>
          <Text style={styles.subtitle}>{product.name}</Text>
          <Text style={[styles.subtitle, {fontSize: 14}]}>
            {product.description}
          </Text>

          <Text
            style={{
              fontFamily: FONTS.description,
              fontSize: 11,
              marginTop: 25,
              textDecorationLine: 'line-through',
              color: COLORS.text.secondary,
            }}>
            {product.previousCost ? `Rs. ${product.previousCost}` : ''}
          </Text>
          <Text
            style={{
              fontFamily: FONTS.buttontext,
              fontSize: 24,
              color: COLORS.favourite,
            }}>
            {product.newCost ? `Rs. ${product.newCost}` : ''}
          </Text>
        </View>

        <View style={styles.tabRow}>
          <TouchableOpacity onPress={() => setSelectedTab('Shop')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'Shop' && styles.tabTextSelected,
              ]}>
              Shop
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab('About')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'About' && styles.tabTextSelected,
              ]}>
              About
            </Text>
          </TouchableOpacity>
        </View>
        {selectedTab === 'Shop' ? (
          <View style={{padding: 16, width: '100%'}}>
            {/* Replace with your actual shop content */}
            <Text
              style={{
                fontFamily: FONTS.description,
                fontSize: 15,
                color: COLORS.text.primary,
              }}>
              Shop this product from our trusted partners or visit our store for
              more options.
            </Text>
            {/* Example: Add a button or list of shops here */}
            <TouchableOpacity
              style={{
                marginTop: 16,
                backgroundColor: COLORS.favourite,
                padding: 12,
                borderRadius: 8,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: FONTS.buttontext,
                  textAlign: 'center',
                }}>
                Buy Now
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{padding: 16, width: '100%'}}>
            {/* Replace with your actual about content */}
            <Text
              style={{
                fontFamily: FONTS.description,
                fontSize: 15,
                color: COLORS.text.primary,
              }}>
              {product.description}
            </Text>
            {/* Example: Add more details about the product, brand, or usage here */}
            <Text
              style={{
                marginTop: 12,
                color: COLORS.text.secondary,
                fontSize: 13,
              }}>
              Brand: {brandTitle}
            </Text>
            <Text
              style={{
                marginTop: 4,
                color: COLORS.text.secondary,
                fontSize: 13,
              }}>
              Product ID: {product.id}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 0,
  },
  title: {
    fontFamily: FONTS.title,
    fontSize: 20,
    color: COLORS.text.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: FONTS.description,
    fontSize: 13,
    color: COLORS.text.primary,
    marginBottom: 10,
  },
  subcontainer: {
    backgroundColor: COLORS.background.productcard,
    padding: 8,
    borderRadius: 10,
    width: 350,
  },
  imageContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  buttonRow: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  backButton: {
    top: 0,
    left: 0,
    borderRadius: 20,
    padding: 4,
  },
  favButton: {
    top: 0,
    right: 0,
    borderRadius: 100,
    padding: 4,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  tabText: {
    fontFamily: FONTS.buttontext,
    fontSize: 16,
    color: COLORS.text.primary,
    marginHorizontal: 24,
    paddingBottom: 4,
    borderBottomWidth: 0,
    borderBottomColor: COLORS.favourite,
  },
  tabTextSelected: {
    color: COLORS.favourite,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.favourite,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.text.secondary,
    marginHorizontal: 4,
    opacity: 0.5,
  },
  activeIndicator: {
    backgroundColor: COLORS.favourite,
    opacity: 1,
  },
  zoomIndicator: {
    position: 'absolute',
    top: 12,
    left: '45%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    zIndex: 20,
  },
  zoomIndicatorText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ProductScreen;
