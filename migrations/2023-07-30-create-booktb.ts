import { Db } from 'mongodb';

export const up = async (db: Db) => {
  await db.createCollection('booktb', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['title', 'author', 'publishedDate', 'ISBN'],
        properties: {
          title: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          author: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          publishedDate: {
            bsonType: 'date',
            description: 'must be a date and is required'
          },
          ISBN: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          coverImage: {
            bsonType: 'string',
            description: 'must be a string if the field is present'
          }
        }
      }
    }
  });
};

export const down = async (db: Db) => {
  await db.collection('booktb').drop();
};
