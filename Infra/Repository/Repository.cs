using Infra.Data;
using Infra.Model;
using Infra.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infra.Repository
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : BaseModel
    {
        protected readonly DataBaseContext dbContext;
        protected readonly DbSet<TEntity> dbSet;
        protected Repository(DataBaseContext dbContext)
        {
            this.dbContext = dbContext;
            dbSet = this.dbContext.Set<TEntity>();
        }

        public void Dispose()
        {
            dbContext.Dispose();
            GC.SuppressFinalize(this);
        }

        public virtual TEntity Add(TEntity obj)
        {
            var r = dbSet.Add(obj);
            SaveChanges();
            return r.Entity;
        }

        public virtual TEntity GetById(long id)
        {
            return dbSet.Find(id);
        }

        public virtual bool Remove(long id)
        {
            TEntity entity = GetById(id);

            if (entity == null)
                return false;

            dbSet.Remove(entity);
            SaveChanges();
            return true;
        }

        public virtual void Update(TEntity entities)
        {
            dbSet.Update(entities);
            SaveChanges();
        }

        public virtual IEnumerable<TEntity> GetAll()
        {
            return dbSet;
        }

        public virtual IEnumerable<TEntity> Where(Expression<Func<TEntity, bool>> filter)
        {
            return dbSet.Where(filter);
        }

        private void SaveChanges() => dbContext.SaveChanges();
    }
}
