namespace Register.Services
{
    public class MongoDBSettings
    {
        public string? ConnectionString { get; set; }
        public string? DatabaseName { get; set; }
        public string? RegisterCollectionName { get; set; }
        public string? UserProfileRequestCollectionName { get; set; }
        public string? UserProfileResponseCollectionName { get; set; }
    }
}
