using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Register.Models.UserProfile
{
    [BsonIgnoreExtraElements]
    public class UserProfileResponseModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string? Id { get; set; }

        [BsonIgnoreIfDefault]
        public string? FirstName { get; set; }

        [BsonIgnoreIfDefault]
        public string? Username { get; set; }

        [BsonIgnoreIfDefault]
        public string? Password { get; set; }

    }

}
