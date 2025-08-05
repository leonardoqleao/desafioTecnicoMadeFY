using Task = Infra.Model.Task;

namespace Infra.Service.Interface
{
    public interface ITaskService
    {
        void Create(Task task);
        void Remove(long taskId);
        void Update(Task newTask);
        void TaksCompleted(long taskId);
        Task Find(long taskId);
        IEnumerable<Task> GetAll();
    }
}
