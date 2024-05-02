export type SortKey = 'id' | 'userId' | 'title' | 'body';

export type SortDirection = 'up' | 'down';

export interface IPost {
  userId: number,
  id: number,
  title: string,
  body: string,
}
