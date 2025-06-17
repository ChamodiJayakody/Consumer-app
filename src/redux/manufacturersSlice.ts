import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from './store';

interface ProductRespose {
  id: string;
  name: string;
  sku: string;
  image?: string[];
  description?: string;
  previousCost?: number;
  newCost?: number;
  promotionType?: string;
}

interface ManufacturersState {
  selectedManufacturer: string;
  products: ProductRespose[];
  favorites: {[productId: string]: boolean};
  loading: boolean;
  error: string | null;
}

const MANUFACTURER_CODES = {
  UN: '1', // Unilever
  HM: '2', // Hemas
};

export const BRAND_NAMES = {
  DOV: 'Dove',
  GLO: 'Glow',
  SUN: 'Sunlight',
  AXE: 'AXE',
  CLO: 'Clogard',
  SIG: 'Signal',
  COM: 'Comfort',
  GOY: 'Goya',
  VEL: 'Velvet',
  DAN: 'Dandex',
  KUM: 'Kumarika',
  DIV: 'Diva',
  RIN: 'RIN',
  BAB: 'Baby Cheramy',
  LUX: 'Lux',
};

const defaultProductImage = require('../assets/images/default-product.png');
const defaultBrandLogo = require('../assets/images/default-brand.png');

// Create async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'manufacturers/fetchProducts',
  async (_, {rejectWithValue, getState}) => {
    try {
      const state = getState() as RootState;
      const token = state.user.token;
      const response = await fetch(
        'https://uatmanufacture.caprconuat.xyz/api/Promotion_product_list',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.success && Array.isArray(data.products)) {
        return data.products.map((product: ProductResponse) => {
          const [brandCode, manufacturerCode] = (product.sku || '').split('/');
          return {
            id: product.id.toString(),
            name: product.name,
            sku: product.sku,
            image: [defaultProductImage], // Use default image since API doesn't provide images
            description: product.description || product.name,
            previousCost: product.previousCost || 0,
            newCost: product.newCost || 0,
            promotionType: product.promotionType || 'b1g1',
            manufacturerId: MANUFACTURER_CODES[manufacturerCode] || '',
            brandCode,
          };
        });
      }
      throw new Error('Invalid data format received from API');
    } catch (error) {
      // if (__DEV__) {
      //   // Return mock data in development
      //   return mockProducts;
      // }
      return rejectWithValue((error as Error).message);
    }
  },
);

// const mockProducts = [
//   {
//     id: '11',
//     brandId: '1',
//     name: 'Dove Body Wash',
//     image: [defaultProductImage],
//     description: 'SKU: DOV/UN/BW002',
//     previousCost: 850,
//     newCost: 750,
//     promotionType: 'b1g1',
//     sku: 'DOV/UN/BW002',
//   },
//   {
//     id: '12',
//     brandId: '1',
//     name: 'Lux Soap',
//     image: [defaultProductImage],
//     description: 'SKU: LUX/UN/SP001',
//     previousCost: 120,
//     newCost: 100,
//     promotionType: 'discount3',
//     sku: 'LUX/UN/SP001',
//   },
// ];

const initialState: ManufacturersState = {
  selectedManufacturer: '',
  products: [],
  favorites: {},
  loading: false,
  error: null,
};

const manufacturersSlice = createSlice({
  name: 'manufacturers',
  initialState,
  reducers: {
    setSelectedManufacturer: (state, action: PayloadAction<string>) => {
      state.selectedManufacturer = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.favorites[id] = !state.favorites[id];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch products';
        if (__DEV__) {
          console.warn('Using mock data due to API failure');
          state.products = mockProducts;
          state.error = null;
        } else {
          state.products = [];
        }
      });
  },
});

// Selector to get products by manufacturer
export const selectProducts = (state: {manufacturers: ManufacturersState}) =>
  state.manufacturers.products;

export const selectProductsByManufacturer = (
  state: {manufacturers: ManufacturersState},
  manufacturerId: string,
) => {
  return state.manufacturers.products.filter(product => {
    const [, mfgId] = product.sku.split('/');
    return mfgId === manufacturerId;
  });
};

export const selectFilteredProducts = (state: RootState) => {
  const {selectedManufacturer, products} = state.manufacturers;

  if (!products) return [];

  return selectedManufacturer
    ? products.filter(product => {
        const [, manufacturerCode] = product.sku.split('/');
        return manufacturerCode === selectedManufacturer;
      })
    : products;
};

// Selector to get products by brand
export const selectProductsByBrand = (
  state: {manufacturers: ManufacturersState},
  brandCode: string,
) => {
  return state.manufacturers.products.filter(product => {
    const [brand] = product.sku.split('/');
    return brand === brandCode;
  });
};

export const {setSelectedManufacturer, toggleFavorite} =
  manufacturersSlice.actions;
export default manufacturersSlice.reducer;
