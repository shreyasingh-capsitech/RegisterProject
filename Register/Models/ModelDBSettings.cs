namespace Register.Models
{
    public class ModelDBSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string RegisterCollectionName { get; set; } = null!;
        public string UserProfileRequestCollectionName { get; set;} = null!;
        public string UserProfileResponseCollectionName { get;set; } = null!;
    }
}
