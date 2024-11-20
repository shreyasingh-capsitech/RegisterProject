using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Register.Models;

namespace Register.Services
{
    public class RegisterServices
    {
        private readonly IMongoCollection<RegisterRequestModel> _registerCollection;

        public RegisterServices
        (
            IOptions<MongoDBSettings> registerDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                registerDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                registerDatabaseSettings.Value.DatabaseName);

            _registerCollection = mongoDatabase.GetCollection<RegisterRequestModel>(
                registerDatabaseSettings.Value.RegisterCollectionName);
        }

        public async Task<List<RegisterRequestModel>> GetAsync(string search)
        {
            var filterBuilder = Builders<RegisterRequestModel>.Filter;
            var filters = filterBuilder.Ne(x => x.DeletedStatus, DeletedStatus.Deleted);

            if (!string.IsNullOrEmpty(search))
            {
                var searchFilter = filterBuilder.Or(
                    filterBuilder.Regex(x => x.EmployeeName, new MongoDB.Bson.BsonRegularExpression(search, "i")),
        filterBuilder.Regex(x => x.Email, new MongoDB.Bson.BsonRegularExpression(search, "i"))
                );
                filters = filterBuilder.And(filters, searchFilter);
            }

            return await _registerCollection.Find(filters).ToListAsync();
        }

        public async Task<RegisterRequestModel?> GetAsync(string RegId, string? search = null) =>
            await _registerCollection.Find(x => x.Id == RegId).FirstOrDefaultAsync();

        public async Task CreateAsync(RegisterRequestModel newRegister, string? RegId = null)
        {
            if (RegId != null)
            {
                await _registerCollection.ReplaceOneAsync(x => x.Id == RegId, newRegister);
            }
            else
            {
                await _registerCollection.InsertOneAsync(newRegister);
            }
        }

        /* public async Task UpdateAsync(string id, RegisterRequestModel updatedBook) =>
             await _registerCollection.ReplaceOneAsync(x => x.Id == id, updatedBook);*/

        public async Task RemoveAsync(string RegId)
        {
            var record = await _registerCollection.Find(x => x.Id == RegId).FirstOrDefaultAsync();
            if (record != null)
            {
                record.DeletedStatus = DeletedStatus.Deleted;
                await _registerCollection.ReplaceOneAsync(x => x.Id == RegId, record);
            }
        }

    }
}
