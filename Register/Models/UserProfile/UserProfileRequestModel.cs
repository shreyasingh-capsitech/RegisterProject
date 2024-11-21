using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Register.Models.UserProfile
{
    [BsonIgnoreExtraElements]
    public class UserProfileRequestModel
    {

        [BsonIgnoreIfDefault]
        public string? FirstName { get; set; }

        [BsonIgnoreIfDefault]
        public string? LastName { get; set; }

        [BsonIgnoreIfDefault]
        public string? Username { get; set; }

        [BsonIgnoreIfDefault]
        public string? Password { get; set; }

        [BsonIgnoreIfDefault]
        public string? Role { get; set; }

    }
}
