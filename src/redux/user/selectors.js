export const selectUser = state => state.user.user;

export const selectAvatarUrl = state => state.user.avatarUrl;

export const selectIsLoading = state => state.user.loading;

export const selectIsError = state => state.user.error;
