// title: {
//   type: String,
//   required: true,
// },
// order: {
//   type: Number,
//   required: true,
// },
// description: {
//   type: String,
//   required: true,
// },
// userId: {
//   type: String,
//   required: true,
// },
// boardId: {
//   type: String,
//   required: true,
// },
// columnId: {
//   type: String,
//   required: true,
// },
// users: {
//   type: [String],
//   default: [],
// }

// title, order, description, userId, boardId, columnId, users;
export interface ITask {
  title: string;
  order: string;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  users: [];
  _id: string;
}
