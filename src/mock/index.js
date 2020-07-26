import { Server } from 'miragejs';
import tasks from './fixtures/tasks-mock';

export default function ({ environment = 'development' } = {}) {
  return new Server({
    environment,

    /**
     * Fill in the initial database.
     * 
     * @param {Server} server 
     */
    seeds(server) {
      server.db.loadData({
        tasks,
      })
    },

    routes() {
      /**
       * Set the prefix for all routes.
       * All routes will now have `api` as a prefix.
       */
      this.namespace = '/api'


      /**
       * Handle `GET /api/tasks`.
       * Return all tasks.
       */
      this.get('/tasks', ({db}) => db.tasks);

      /**
       * Handle `DELETE /api/tasks/{id}`.
       * Delete the task with a given `id`.
       */
      this.delete('/tasks/:id', ({db}, request) => db.tasks.remove(request.params.id));

      /**
       * Handle `POST /api/tasks`.
       * Create a new task.
       */
      this.post('/tasks', ({db}, request) => {
        const task = JSON.parse(request.requestBody).data

        return db.tasks.insert(task)
      })
    },
  });
}