using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Register.Models
{
    public class RegisterRequestModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public string? Id { get; set; }

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

    public enum DeletedStatus
    {
        Active,
        Deleted
    }

    public enum Gender
    {
        Male,
        Female
    }

    public enum MaritalStatus
    {
        Married,
        Unmarried,
        Single
    }

    public enum Status
    {
        Active,
        Inactive
    }

    public enum Role
    {
        Employee,
        Student
    }

    [BsonIgnoreExtraElements]
    public class BankDetails
    {
        [BsonElement("accountNumber")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public decimal? AccountNumber { get; set; }

        [BsonElement("accountHolderName")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public string? AccountHolderName { get; set; }

        [BsonElement("panNumber")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public decimal? PanNumber { get; set; }

        [BsonElement("bankName")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public string? BankName { get; set; }

        [BsonElement("ifscCode")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public decimal? IfscCode { get; set; }

        [BsonElement("bankAddress")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public string? BankAddress { get; set; }
    }

    [BsonIgnoreExtraElements]

    public class Address
    {

        [BsonElement("house")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public string? House { get; set; }

        [BsonElement("street")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public string? Street { get; set; }

        [BsonElement("city")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public string? City { get; set; }

        [BsonElement("district")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public string? District { get; set; }

        [BsonElement("state")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public string? State { get; set; }

        [BsonElement("pincode")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public decimal? Pincode { get; set; }

    }

}
