export const selectAllBoards = (state) => state.boards.items;

export const selectLoading = (state) => state.boards.loading;

export const selectError = (state) => state.boards.error;

export const selectBoard = (state) => state.boards.currentBoard;
