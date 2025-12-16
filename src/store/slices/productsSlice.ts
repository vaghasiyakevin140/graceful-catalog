import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  categories: string[];
  selectedCategory: string;
  searchQuery: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  categories: [],
  selectedCategory: 'all',
  searchQuery: '',
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json() as Promise<Product[]>;
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json() as Promise<string[]>;
});

const filterProducts = (items: Product[], category: string, query: string) => {
  return items.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.filteredItems = filterProducts(state.items, action.payload, state.searchQuery);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredItems = filterProducts(state.items, state.selectedCategory, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = ['all', ...action.payload];
      });
  },
});

export const { setCategory, setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;
