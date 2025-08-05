using Infra.Repository.Interface;
using Infra.Service.Interface;
using Task = Infra.Model.Task;
namespace Infra.Service
{
    internal class TaskService(ITaskRepository _repository) : ITaskService
    {
        public void Create(Task task)
        {
            task.Creation = DateTime.UtcNow;
            task.Conclusion = null;
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

        public void Update(Task newTask)
        {
            Task task = _repository.GetById(newTask.Id);
            task.Title = newTask.Title;
            task.Description = newTask.Description;
            _repository.Update(task);
        }
        public void TaksCompleted(long taskId)
        {
            Task task = _repository.GetById(taskId);
            task.Completed = true;
            task.Conclusion = DateTime.UtcNow;
            _repository.Update(task);
        }
    }
}
