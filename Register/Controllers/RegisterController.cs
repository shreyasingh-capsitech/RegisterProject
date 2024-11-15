using Microsoft.AspNetCore.Mvc;
using Register.Models;
using Register.Services;

namespace Register.Controllers
{
        [ApiController]
        [Route("api/[controller]")]
    public class RegisterController: ControllerBase
    {
        private readonly RegisterServices _registerServices;

        public RegisterController(RegisterServices registerServices) =>
            _registerServices = registerServices;

        [HttpGet()]
        public async Task<List<RegisterRequestModel>> GetList(string search = "") =>
            await _registerServices.GetAsync(search);

        [HttpGet("get/{id:length(24)}")]
        public async Task<ActionResult<RegisterRequestModel>> Get(string id)
        {
            var record = await _registerServices.GetAsync(id,"");

            if (record is null)
            {
                return NotFound();
            }

            return record;
        }

        [HttpPost("update/{id:length(24)}")]
        public async Task<IActionResult> Update([FromForm] RegisterRequestModel newRegister, string id) => await SaveRegister(newRegister, id);

        [HttpPost()]
        public async Task<IActionResult> SaveRegister([FromForm] RegisterRequestModel newRegister, string? id)
        {
            if (id != null)
            {
                var record = await _registerServices.GetAsync(id,"");
                if (record is null)
                {
                    return NotFound();
                }

                newRegister.Id = record.Id;
                await _registerServices.CreateAsync(newRegister, id);
            }
            else
            {
                await _registerServices.CreateAsync(newRegister);
            }
            return NoContent();
        }

       /* [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Book updatedBook)
        {
            var book = await _booksService.GetAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            updatedBook.Id = book.Id;

            await _booksService.UpdateAsync(id, updatedBook);

            return NoContent();
        }*/

        [HttpPost("delete/{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {     
            await _registerServices.RemoveAsync(id);    
            return NoContent();
        }
    }
}
