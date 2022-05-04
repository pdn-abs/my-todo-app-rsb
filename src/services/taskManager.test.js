import TaskManager from './taskManager';
describe('taskManager', () => {
	const { getTask, removeTask, AddTask } = TaskManager;

	test('getTask', () => {
		const context = {
			config: { idLength: 4 },
			data: 'Test the code',
		};
		const result = getTask(context);

		expect(result).toEqual({ id: expect.any(String),
			todo: 'Test the code' });
	});
	test('removeTask', () => {
		const context = {
			state: { taskList: [{ id: 'MFMULLYR', todo: 'Debug the code' },
				{ id: 'LFMUHLYR', todo: 'Test the code' }] },
			data: { id: 'LFMUHLYR' },
		};
		const result = removeTask(context);

		expect(result).toEqual([{ id: 'MFMULLYR', todo: 'Debug the code' }]);
	});
	describe('Addtask ', () => {
		test('AddTask -TaskList length is less than MaxTaskListLength', () => {
			const context = {
				config: { idLength: 8, maxTaskListLength: 5 },
				data: 'Test the code',
				state: {
					taskList: [{ id: 'MFMULLYR', todo: 'Debug the code' }],
				},
			};
			const result = AddTask(context);

			expect(result).toEqual([{ id: 'MFMULLYR', todo: 'Debug the code' },
				{ id: expect.any(String), todo: 'Test the code' }]);
		});
		test('AddTask -TaskList length exceeds MaxTaskListLength', () => {
			const context = {
				config: { idLength: 8, maxTaskListLength: 5 },
				data: 'Test the code',
				state: {
					taskList: [{ id: 'MFMULLYR' },
						{ id: 'DEMULLYR' },
						{ id: 'DFAULLYR' },
						{ id: 'AFMULLYR' },
						{ id: 'DAMULLYR' },
						{ id: 'DFAULLYR' }],
				},
			};
			const result = AddTask(context);

			expect(result).toEqual([{ id: 'MFMULLYR' },
				{ id: 'DEMULLYR' },
				{ id: 'DFAULLYR' },
				{ id: 'AFMULLYR' },
				{ id: 'DAMULLYR' },
				{ id: 'DFAULLYR' }]);
		});
	});
});