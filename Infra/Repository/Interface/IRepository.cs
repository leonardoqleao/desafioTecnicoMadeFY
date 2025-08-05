using Infra.Model;
using System.Linq.Expressions;

namespace Infra.Repository.Interface
{
    public interface IRepository<TEntity> : IDisposable where TEntity : BaseModel
    {
        TEntity Add(TEntity obj);
        TEntity GetById(long id);
        IEnumerable<TEntity> GetAll();
        IEnumerable<TEntity> Where(Expression<Func<TEntity, bool>> filter);
        void Update(TEntity obj);
        bool Remove(long id);
    }
}
