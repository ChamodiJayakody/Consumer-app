import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import {COLORS} from '../theme/colors';
import {FONTS} from '../theme/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedManufacturer } from '../redux/manufacturersSlice';
import { RootState } from '../redux/store';

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const FilterModal = ({isVisible, onClose}: FilterModalProps) => {
  const dispatch = useDispatch();
  const selectedManufacturer = useSelector(
    (state: RootState) => state.manufacturers.selectedManufacturer
  );

  const handleManufacturerSelect = (manufacturerId: string) => {
    dispatch(setSelectedManufacturer(manufacturerId));
    onClose();
  };

  const [searchQuery, setSearchQuery] = React.useState('');

  const manufacturers = [
    {
      id: '1',
      name: 'Unilever',
      logo: require('../assets/images/unilever.png'),
    },
    {
      id: '2',
      name: 'Hemas',
      logo: require('../assets/images/hemas.png'),
    },
  ];

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      style={styles.modal}
      propagateSwipe={true}>
      <View style={styles.filterContainer}>
        <View style={styles.filterHeader}>
          <View style={styles.filterIndicator} />
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onClose} style={styles.headerButton}>
              <Icon name="arrow-left" size={24} color={COLORS.text.primary} />
            </TouchableOpacity>
            <Text style={styles.filterTitle}>Filter</Text>
            <TouchableOpacity onPress={onClose} style={styles.headerButton}>
              <Icon name="x" size={24} color={COLORS.text.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={28}
            color={COLORS.navbaricons}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for Manufacture"
            placeholderTextColor={COLORS.navbaricons}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.manufacturerContainer}>
          <Text style={styles.sectionTitle}>SELECT MANUFACTURER</Text>
          {manufacturers.map((manufacturer, index) => (
            <React.Fragment key={manufacturer.id}>
              <TouchableOpacity
                style={styles.manufacturerOption}
                onPress={() => handleManufacturerSelect(manufacturer.id)}>
                <Image
                  source={manufacturer.logo}
                  style={styles.brandLogo}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.manufacturerText,
                    selectedManufacturer === manufacturer.id &&
                      styles.selectedText,
                  ]}>
                  {manufacturer.name}
                </Text>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  brandLogo: {
    width: 28,
    height: 28,
    marginRight: 12,
    marginLeft: 30,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
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
  manufacturerContainer: {
    marginTop: 10,
    backgroundColor: COLORS.filtercard,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontFamily: FONTS.title,
    fontSize: 16,
    color: COLORS.text.primary,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  manufacturerOption: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  manufacturerText: {
    fontFamily: FONTS.name,
    fontSize: 14,
    color: COLORS.text.primary,
  },
  selectedText: {
    fontFamily: FONTS.nameBold,
    color: COLORS.background.primary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.navbaricons,
    marginVertical: 20,
    width: '100%',
  },
});

export default FilterModal;
