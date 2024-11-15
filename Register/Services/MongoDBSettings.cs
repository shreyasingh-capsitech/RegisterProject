namespace Register.Services
{
    public class MongoDBSettings
    {
        public string? ConnectionString { get; set; }
        public string? DatabaseName { get; set; }
        public string? RegisterCollectionName { get; set; }
    }
}
