using Amazon.Runtime.Internal;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Register.Models;
using Register.Models.UserProfile;

namespace Register.Services
{
    public class UserProfileService
    {
        private readonly IMongoCollection<UserProfileResponseModel> _userProfileResponseCollection;
        private readonly IMongoCollection<UserProfileRequestModel> _userProfileRequestCollection;

        public UserProfileService(IOptions<MongoDBSettings> mongodbSettings)
        {
            MongoClient client = new MongoClient(mongodbSettings.Value.ConnectionString);
            IMongoDatabase database = client.GetDatabase(mongodbSettings.Value.DatabaseName);
            _userProfileResponseCollection = database.GetCollection<UserProfileResponseModel>(mongodbSettings.Value.UserProfileResponseCollectionName);
            _userProfileRequestCollection = database.GetCollection<UserProfileRequestModel>(mongodbSettings.Value.UserProfileRequestCollectionName);
        }

        public async Task<List<UserProfileResponseModel>> GetUserProfile()
        {

            return await _userProfileResponseCollection.Find(_ => true).ToListAsync();
        }

        public async Task<UserProfileResponseModel> GetUserProfile(string id)
        {
            return await _userProfileResponseCollection.Find(userProfile => userProfile.Id == id).FirstOrDefaultAsync();
        }

        public async Task AddUserProfile(UserProfileRequestModel userProfile, string? RegId = null)
        {
            var user = new UserProfileResponseModel
            {
                FirstName = userProfile.FirstName,
                Username = userProfile.Username,
                // Hash the password before storing
                Password = BCrypt.Net.BCrypt.HashPassword(userProfile.Password)
            };

            if (RegId != null)
            {
                await _userProfileResponseCollection.ReplaceOneAsync(x => x.Id == RegId, user);
            }
            else
            {
                await _userProfileResponseCollection.InsertOneAsync(user);
            }

        }

        // Authenticate user
        public async Task<UserProfileResponseModel?> AuthenticateUser(string username, string password)
        {
            var userProfile = await _userProfileResponseCollection.Find(l => l.Username == username).FirstOrDefaultAsync();
            if (userProfile != null && BCrypt.Net.BCrypt.Verify(password, userProfile.Password))
            {
                return userProfile; // Password matches
            }
            return null; // Invalid credentials
        }

    }
}
