
export const TodoSchema = {
	name: 'Todo',
	properties: {
	  _id: 'objectId',
	  title: 'string',
	  description:'string?',
	  completed: 'bool',
	},
	primaryKey: '_id',
  };
  