import { schema } from 'normalizr';

const user = new schema.Entity('users');
const usersSchema = {
  users: [user],
};
const post = new schema.Entity('posts');
const postsSchema = {
  posts: [post],
};

export type Schema = Record<string, schema.Entity<any>[]>;
export { usersSchema, postsSchema };
