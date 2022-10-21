// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Video, Comments } = initSchema(schema);

export {
  User,
  Video,
  Comments
};