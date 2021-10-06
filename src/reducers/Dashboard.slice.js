import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, fetchFavoriteProducts, fetchOrders, fetchProducts, fetchSales, fetchViewedProducts } from "../infra";

const initialState = {
  products: [],
  cart: [],
  numberOfItems: {},
  alert: "",
  sales: [],
  itemToBeSearch: "",
  orders: [],
  favoriteProducts: [],
  filters: {
    page: 1,
    limit: 8
  },
  viewedProducts: []
};

export const DashboardSlice = createSlice({
  name: "Dashboard",
  initialState,
  reducers: {
    setPaginationFilters(s, a) {
      s.filters = a.payload || initialState.filters;
    },
    setSearchItem(s, a) {
      s.itemToBeSearch = a.payload || initialState.itemToBeSearch;
    },
    countOfItems(s, a) {
      s.numberOfItems = a.payload
        ? { ...s.numberOfItems, ...a.payload }
        : initialState.numberOfItems;
    },
    removeCountOfItems(s, a) {
      delete s.numberOfItems[a.payload];
    },
    setAlert(s, a) {
      s.alert = a.payload || initialState.alert;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (s, a) => {
      s.products = a.payload; 
    });
    builder.addCase(fetchSales.fulfilled, (s, a) => {
      s.sales = a.payload;
    });
    builder.addCase(fetchCart.fulfilled, (s, a) => {
      s.cart = a.payload;
    });
    builder.addCase(fetchOrders.fulfilled, (s, a) => {
      s.orders = a.payload;
    });
    builder.addCase(fetchFavoriteProducts.fulfilled, (s, a) => {
      s.favoriteProducts = a.payload;
    });
    builder.addCase(fetchViewedProducts.fulfilled, (s, a) => {
      s.viewedProducts = a.payload;
    });
  }
});

export const {
  setPaginationFilters,
  countOfItems,
  removeCountOfItems,
  setAlert,
  setSearchItem
} = DashboardSlice.actions;
