export const selectUser = (state) => state.auth.user;
export const selectIsLoggin = (state) => state.auth.isLoggedIn;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectTransactions = (state) => state.transactions.items;
