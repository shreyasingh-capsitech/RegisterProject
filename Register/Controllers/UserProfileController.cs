using DnsClient;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Register.Models;
using Register.Models.UserProfile;
using Register.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Register.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController: ControllerBase
    {
        private readonly UserProfileService _userProfileService;
        private readonly IConfiguration _configuration;

        public UserProfileController(UserProfileService userProfileService, IConfiguration configuration)
        {
            _userProfileService = userProfileService;
            _configuration = configuration;
        }

        [HttpGet()]
        [Authorize]
        public async Task<ActionResult<List<UserProfileResponseModel>>> GetUserProfile()
        {
            var userProfiles = await _userProfileService.GetUserProfile();
            return Ok(userProfiles);
        }

        [HttpGet("get/{id:length(24)}")]
        [Authorize]
        public async Task<ActionResult<UserProfileResponseModel>> GetUserProfile(string id)
        {
            var userProfile = await _userProfileService.GetUserProfile(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpPost("update/{id:length(24)}")]
        public async Task<IActionResult> UpdateUserProfile([FromBody] UserProfileRequestModel newUserProfile, string id) => await SaveUserProfile (newUserProfile, id);

        [HttpPost()]
        public async Task<IActionResult> SaveUserProfile([FromBody] UserProfileRequestModel newUserProfile, string? id)
        {
            if (id != null)
            {
                var record = await _userProfileService.GetUserProfile(id);
                if (record is null)
                {
                    return NotFound();
                }

                await _userProfileService.AddUserProfile(newUserProfile, id);
            }
            else
            {
                await _userProfileService.AddUserProfile(newUserProfile);
            }
            return NoContent();
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] UserProfileRequestModel login)
        {
            var authenticatedUser = await _userProfileService.AuthenticateUser(login.Username, login.Password);
            if (authenticatedUser == null)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            // Generate JWT Token
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);  // Use _configuration if injected
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.Name, authenticatedUser.Username)
                }),
                Expires = DateTime.UtcNow.AddHours(24), // Token expires in 24 hour
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                Token = tokenString,
                Username = authenticatedUser.Username,
                Name = authenticatedUser.FirstName
            });
        }
    }
}
