
using Infra.Data;
using Infra.Repository.Interface;
using Task = Infra.Model.Task;

namespace Infra.Repository
{
    internal class TaskRepository(DataBaseContext dbContext) : Repository<Task>(dbContext), ITaskRepository
    {
    }
}
