
namespace Infra.Model
{
    public class Task : BaseModel
    {
        public String Title { get; set; } = string.Empty;
        public String Description { get; set; } = string.Empty;
        public Boolean Completed { get; set; } = false;
        public DateTime Creation { get; set; }
        public DateTime? Conclusion { get; set; }
    }
}
