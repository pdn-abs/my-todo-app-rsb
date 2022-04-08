import Todo from './todo';
import TodoManager from '../../services/todoManager';

const TodoList = (context) => {
	const { state } = context;
	const { filter } = state;
	const noTodos = TodoManager.hasNoTodos(state.todoList);

	const filteredTodo
	= TodoManager.filterTodos(state.todoList, filter);

	return noTodos
		? []
		: filteredTodo.map((todo) => Todo({ ...context, data: todo }));
};

export default TodoList;
