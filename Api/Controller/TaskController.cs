using Infra.Service.Interface;
using Microsoft.AspNetCore.Mvc;
using Task = Infra.Model.Task;

namespace Api.Controllers
{
    [Route("api/task/")]
    [ApiController]
    public class TaskController(ITaskService _taskService) : ControllerBase
    {
        [HttpGet("{taskid}")]
        [ProducesResponseType((200), Type = typeof(Task))]
        public IActionResult Get(long taskid)
        {
            return Ok(_taskService.Find(taskid));
        }

        [HttpPost]
        [ProducesResponseType((200))]
        public IActionResult Create([FromBody] Task task)
        {
            _taskService.Create(task);
            return Ok();
        }

        [HttpDelete("{taskid}")]
        [ProducesResponseType((200))]
        public IActionResult Delete(long taskid)
        {
            _taskService.Remove(taskid);
            return Ok();
        }

        [HttpPut]
        [ProducesResponseType((200))]
        public IActionResult Update([FromBody] Task newTask)
        {
            _taskService.Update(newTask, newTask);
            return Ok();
        }

        [HttpGet("all")]
        [ProducesResponseType((200), Type = typeof(IEnumerable<Task>))]
        public IActionResult GetAll()
        {
            return Ok(_taskService.GetAll());
        }
    }
}
