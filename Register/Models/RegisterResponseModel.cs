/*using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Register.Models
{
    public class RegisterResponseModel
    {

        [BsonElement("employeeName")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public string? EmployeeName { get; set; }

        [BsonElement("birthDate")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public DateTime? BirthDate { get; set; }

        [BsonElement("gender")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public Gender Gender { get; set; }

        [BsonElement("passportNumber")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public decimal? PassportNumber { get; set; }

        [BsonElement("mobileNumber")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public decimal? MobileNumber { get; set; }

        [BsonElement("adhaarNumber")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public decimal? AadhaarNumber { get; set; }

        [BsonElement("presentAddress")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public Address? PresentAddress { get; set; }

        [BsonElement("permanentAddress")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public Address? PermanentAddress { get; set; }

        [BsonElement("fatherName")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public string? FatherName { get; set; }

        [BsonElement("bloodGroup")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public string? BloodGroup { get; set; }

        [BsonElement("maritalStatus")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public MaritalStatus MaritalStatus { get; set; }

        [BsonElement("status")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public Status Status { get; set; }

        [BsonElement("cardNumber")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public decimal? CardNumber { get; set; }

        [BsonElement("role")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public Role Role { get; set; }

        [BsonElement("email")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public string? Email { get; set; }

        [BsonElement("c_img")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public string? CandidateImage { get; set; }

        [BsonElement("s_img")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public string? CandidateSignature { get; set; }

        [BsonElement("deletedStatus")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public DeletedStatus DeletedStatus { get; set; }

        [BsonElement("bankDetails")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public BankDetails? BankDetails { get; set; }
    }
}
*/