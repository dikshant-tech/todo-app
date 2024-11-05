import {Realm,useRealm,useQuery}from "realm";
import { TodoSchema } from "../models/Todo";



const realm = new Realm({
	schema: [TodoSchema],
	schemaVersion: 2, // Increment the schema version
	migration: (oldRealm, newRealm) => {
	  const oldObjects = oldRealm.objects('Todo');
	  const newObjects = newRealm.objects('Todo');
  
	  // Handle schema migration
	  for (let i = 0; i < oldObjects.length; i++) {
		const oldObject = oldObjects[i];
		const newObject = newObjects[i];
  
		// Set default value for new property if it doesn’t exist
		newObject.description = oldObject.description || ''; // Set default value
	  }
	}
  });
  

//const realm = useRealm()

export const getTodos = ()=>{
	//return useQuery(TodoSchema)
	console.log('realm instance',realm)
	return realm.objects('Todo');

}

export const addTodo =(title,description)=>{
	realm.write(()=>{
		realm.create('Todo',{
			_id:new Realm.BSON.ObjectID(),
			title:title,
			description:description,
			completed:false,
		})
	})
}

export const toggleTodo = (id) => {
	const todo = realm.objectForPrimaryKey('Todo', id);
	realm.write(() => {
	  todo.completed = !todo.completed;
	});
  };

  export const deleteTodo =(id) =>{
	const todo = realm.objectForPrimaryKey('Todo',id)
    realm.write(()=>{
		realm.delete(todo);
	});
  };

  export const updateTodo = (id, updatedTodo) => {
	const todo = realm.objectForPrimaryKey('Todo', id);
	if (todo) {
	  realm.write(() => {
		todo.title = updatedTodo.title;
		todo.description = updatedTodo.description;
		// No need to update the `id` since it's the primary key and shouldn't change
	  });
	}
  };
  

  export default realm;
  