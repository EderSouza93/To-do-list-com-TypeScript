(() => {
    enum NotificationPlatform {
        SMS = 'SMS',
        EMAIL = 'EMAIL',
        PUSH_NOTIFICATION = 'PUSH_NOTIFICATION',
    }

    const UUID = (): string => {
        return Math.random().toString(32).substr(2, 9);
    };

    const DateUtils = {
        formatDate(date: Date): string {
            return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
        }
    }

    interface Task {
        id: string;
        dateCreated: Date;
        dateUpdated: Date;
        description: string;
        render(): string;
    }

    class Reminder implements Task {
        id: string = UUID();
        dateCreated: Date = new Date();
        dateUpdated: Date = new Date();
        description: string = '';

        date: Date = new Date();
        notifications: Array<NotificationPlatform> = [NotificationPlatform.EMAIL];

        constructor(description: string, date: Date, notifications: Array<NotificationPlatform>) {
            this.description = description;
            this.date = date;
            this.notifications = notifications
        }

        render(): string {
            return `
            ---> Reminder <---
            description: ${this.description}
            date: ${DateUtils.}
            platform: ${this.notifications.join(',')}
            `;
        }
    }

    class Todo implements Task {
        id: string = UUID();
        dateCreated: Date = new Date();
        dateUpdated: Date = new Date();
        description: string = '';

        done: boolean = false;

        constructor(description: string){
            this.description = description;
        }

        render(): string {
            return JSON.stringify(this);
        }
    }
    const todo = new Todo('Todo criado com a classe');

    const remind = new Reminder('Reminder criado com a classe', new Date(), [NotificationPlatform.EMAIL,
    ]);

    const taskView = {
        render(tasks: Array<Task>) {
            const tasksList = document.getElementById('tasksList');
            while (tasksList?.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }

            tasks.forEach((task) => {
                const li = document.createElement('LI');
                const textNode = document.createTextNode(task.render());
                li.appendChild(textNode);
                tasksList?.appendChild(li);
            });
        },      
    };

    const TaskController = (view: typeof taskView) => {
        const tasks: Array<Task> = [todo, remind];

        const handleEvent = (event:Event) => {
            event.preventDefault();
            view.render(tasks);
        }
        
        document.getElementById('taskForm')
        ?.addEventListener('submit', handleEvent);
    };

    TaskController(taskView);
})();