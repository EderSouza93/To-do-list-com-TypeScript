(() => {
    const todo = {
        description: 'todo',
        done: false,
    };

    const remind = {
        description: 'reminder',
        date: '23.04.2023',
    };

    const taskView = {
        render(tasks: Array<Object>) {
            const tasksList = document.getElementById('tasksList');
            while (tasksList?.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }

            tasks.forEach((task) => {
                const li = document.createElement('LI');
                const textNode = document.createTextNode(JSON.stringify(task));
                li.appendChild(textNode);
                tasksList?.appendChild(li);
            });
        },      
    };

    const TaskController = (view: typeof taskView) => {
        const tasks: Array<Object> = [todo, remind];

        const handleEvent = (event:Event) => {
            event.preventDefault();
            view.render(tasks);
        }
        
        document.getElementById('taskForm')
        ?.addEventListener('submit', handleEvent);
    };

    TaskController(taskView);
})();