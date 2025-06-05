import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ManufacturersState {
  selectedManufacturer: string;
  gridCards: Array<{
    id: string;
    manufacturerId: string;
    image: number;
    logo: number;
    title: string;
  }>;
  cardsData: Array<{
    id: string;
    manufacturerId: string;
    image: number;
  }>;
  products: Array<{
    id: string;
    brandId: string;
    name: string;
    image: number[];
    description: string;
    previousCost: number;
    newCost: number;
    promotionType: string;
  }>;
  favorites: { [productId: string]: boolean };
}

const initialState: ManufacturersState = {
  selectedManufacturer: '',

  cardsData: [
    {
      id: '1',
      manufacturerId: '1',
      image: require('../assets/images/card1.png'),
    },
    {
      id: '2',
      manufacturerId: '2',
      image: require('../assets/images/card2.png'),
    },
  ],

  gridCards: [
    {
      id: '7',
      manufacturerId: '1',
      image: require('../assets/images/card7.png'),
      logo: require('../assets/images/logo7.png'),
      title: 'AXE',
    },
    {
      id: '8',
      manufacturerId: '1',
      image: require('../assets/images/card8.png'),
      logo: require('../assets/images/logo8.png'),
      title: 'Marmite',
    },
    {
      id: '9',
      manufacturerId: '1',
      image: require('../assets/images/card9.png'),
      logo: require('../assets/images/logo9.png'),
      title: 'Vasline',
    },
    {
      id: '10',
      manufacturerId: '1',
      image: require('../assets/images/card10.png'),
      logo: require('../assets/images/logo10.png'),
      title: 'Lux',
    },
    {
      id: '3',
      manufacturerId: '2',
      image: require('../assets/images/card3.png'),
      logo: require('../assets/images/logo3.png'),
      title: 'Baby Cheramy',
    },
    {
      id: '4',
      manufacturerId: '2',
      image: require('../assets/images/card4.png'),
      logo: require('../assets/images/logo4.png'),
      title: 'Atlas Axillia',
    },
    {
      id: '5',
      manufacturerId: '2',
      image: require('../assets/images/card5.png'),
      logo: require('../assets/images/logo5.png'),
      title: 'Morisons',
    },
    {
      id: '6',
      manufacturerId: '2',
      image: require('../assets/images/card6.png'),
      logo: require('../assets/images/logo6.png'),
      title: 'Clogard',
    },
  ],
  products: [
    {
      id: 'p1',
      brandId: '3',
      name: 'Baby cheramy peach range 300g baby soap',
      image: [
        require('../assets/images/bc1.png'),
        require('../assets/images/bc11.png'),
        require('../assets/images/bc12.png'),
        require('../assets/images/bc13.png'),
      ],
      description:
        'Buy any large Baby cheramy peach range 300g baby cream and get 100g Soap',
      previousCost: 300,
      newCost: 200,
      promotionType:'b1g1',
    },
    {
      id: 'p2',
      brandId: '3',
      name: 'Product 2',
      image: [require('../assets/images/bc2.png')],
      description:
        'Buy any large Baby cheramy Colonge 300ml baby cream and get 75ml Colonge.',
      previousCost: 600,
      newCost: 300,
      promotionType:'b1g1'
    },
    {
      id: 'p3',
      brandId: '3',
      name: 'Product 3',
      image: [require('../assets/images/bc3.png')],
      description:
        'Buy 3  Baby cheramy herbal range 250g  baby soap and get 20% discount',
      previousCost: 1200,
      newCost: 950,
      promotionType:'discount3'
    },
  ],
  favorites: {},
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
});

export const {setSelectedManufacturer, toggleFavorite} = manufacturersSlice.actions;
export default manufacturersSlice.reducer;
