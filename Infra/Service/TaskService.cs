using Infra.Repository.Interface;
using Infra.Service.Interface;
using Task = Infra.Model.Task;
namespace Infra.Service
{
    internal class TaskService(ITaskRepository _repository) : ITaskService
    {
        public void Create(Task task)
        {
            _repository.Add(task);
        }

        public Task Find(long taskId)
        {
            return _repository.GetById(taskId);
        }

        public IEnumerable<Task> GetAll()
        {
            return _repository.GetAll();
        }

        public void Remove(long taskId)
        {
            _repository.Remove(taskId);
        }

        public void Update(Task oldTask, Task newTask)
        {
            _repository.Update(newTask);
        }
    }
}
