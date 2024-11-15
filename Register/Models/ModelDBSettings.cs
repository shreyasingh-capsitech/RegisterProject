namespace Register.Models
{
    public class ModelDBSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string RegisterCollectionName { get; set; } = null!;
    }
}
