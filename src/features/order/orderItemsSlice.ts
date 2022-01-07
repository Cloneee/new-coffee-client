import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { OrderItem } from 'models';

export interface OrderItemsState {
  listItem: OrderItem[];
  totalPrice: number;
}

const initialState: OrderItemsState = {
  listItem: [],
  totalPrice: 0,
};
const handleSate = (state: OrderItemsState): OrderItemsState => {
  state.totalPrice = 0;
  state.listItem.forEach((item, index) => {
    item._id = index + 1;
    state.totalPrice += item.product.price * item.quantity;
  });
  return state;
};
const orderItemsSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    addNewOrderItemToOrder(state, action: PayloadAction<OrderItem>) {
      const length: number = state.listItem.length;
      let isDupplicateOrderItem: number = -1;
      state.totalPrice = 0;
      if (length === 0) {
        state.listItem.push(action.payload);
        state.listItem[0]._id = 1;
        state.totalPrice = action.payload.product.price;
      } else {
        state.listItem.forEach((item, index) => {
          if (item.product._id === action.payload.product._id) {
            isDupplicateOrderItem = index + 1;
          }
        });

        if (isDupplicateOrderItem === -1) {
          state.listItem.push(action.payload);
        }

        state.listItem.forEach((item, index) => {
          if (item._id === isDupplicateOrderItem) {
            item.quantity += action.payload.quantity;
          }
          state.totalPrice += item.product.price * item.quantity;
          item._id = index + 1;
        });
      }
    },
    deleteOrderItem(state, action: PayloadAction<OrderItem>) {
      state.listItem = state.listItem.filter(
        (item) => item.product._id !== action.payload.product._id
      );
      state = handleSate(state);
    },
    minusQuantityOrderItem(state, action: PayloadAction<OrderItem>) {
      let index: number = -1;
      if (action.payload._id) index = action.payload._id;

      if (index !== -1) {
        state.listItem[index - 1].quantity -= 1;
        console.log(state.listItem[0].quantity);
      }
      state = handleSate(state);
    },
    plusQuantityOrderItem(state, action: PayloadAction<OrderItem>) {
      let index: number = -1;
      if (action.payload._id) {
        index = action.payload._id;
        state.listItem[index - 1].quantity += 1;
      }
      state = handleSate(state);
    },
    destroyOrderItems(state) {
      state.listItem = [];
      state.totalPrice = 0;
    },
  },
});
export const orderItemsActions = orderItemsSlice.actions;
export const selectProductList = (state: RootState) => state.orderItems.listItem;
const orderItemsReducer = orderItemsSlice.reducer;
export default orderItemsReducer;
