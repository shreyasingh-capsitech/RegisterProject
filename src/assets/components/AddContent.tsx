import {
  Dropdown,
  Label,
  PanelType,
  Stack,
  TextField,
  Panel,
  Separator,
  FontIcon,
  DatePicker,
  PrimaryButton,
  DefaultButton,
  IDropdownOption,
  defaultDatePickerStrings,
  Checkbox,
} from "@fluentui/react";
import React, { useRef } from "react";
import { BloodGroup, Gender, MaritalStatus, Role, saveRegister, Status, updateRegister } from "./Api";
import { 
  Formik,
  useFormikContext
} from "formik";
import * as Yup from "yup";

const AddContent = ({ openPanel, setOpenPanel, setTrigger, initialValues, itemId }: {openPanel: boolean, setOpenPanel: React.Dispatch<React.SetStateAction<boolean>>, setTrigger: React.Dispatch<React.SetStateAction<boolean>>, initialValues: any, itemId: string}) => {
  const [dismissPanel, setDismissPanel] = React.useState<boolean>(false);
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const [formValues, setFormValues] = React.useState(initialValues);
  //const formikRef = useRef<any>(null);
  const { setFieldValue } = useFormikContext();
  //const [imageUrl, setImageUrl] = React.useState<string>(values.candidateImage || "");
  const [imageUrl, setImageUrl] = React.useState<string>("");
  //const [signatureUrl, setSignatureUrl] = React.useState<string>(values.candidateSignature || "");
  const [signatureUrl, setSignatureUrl] = React.useState<string>("");


  const inputStyle = {
    root: {
      width: 300,
    },
  };

  const handleCheckboxChange = () => {
    setIsChecked((prev) => {
      const newChecked = !prev;
      if (newChecked) {
        // When checked, copy present address values to permanent address
        setFieldValue("permanentAddress.house", formValues.presentAddress.house);
        setFieldValue("permanentAddress.street", formValues.presentAddress.street);
        setFieldValue("permanentAddress.city", formValues.presentAddress.city);
        setFieldValue("permanentAddress.district", formValues.presentAddress.district);
        setFieldValue("permanentAddress.state", formValues.presentAddress.state);
        setFieldValue("permanentAddress.pincode", formValues.presentAddress.pincode);
      } else {
        // If unchecked, clear the permanent address values or retain empty fields
        setFieldValue("permanentAddress.house", "");
        setFieldValue("permanentAddress.street", "");
        setFieldValue("permanentAddress.city", "");
        setFieldValue("permanentAddress.district", "");
        setFieldValue("permanentAddress.state", "");
        setFieldValue("permanentAddress.pincode", 0);
      }
      return newChecked;
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFieldValue(field, fileUrl); // Update Formik state with the new file URL
      if (field === "candidateImage") {
        setImageUrl(fileUrl); // Set the image URL for preview
      } else if (field === "candidateSignature") {
        setSignatureUrl(fileUrl); // Set the signature URL for preview
      }
    }
  };

  // Validation Schema
  const validationSchema = Yup.object().shape({
    employeeName: Yup.string().required("Employee Name is required"),
    mobileNumber: Yup.string().matches(
      /^[0-9]{10}$/,
      "Mobile number must be 10 digits"
    ),
    aadhaarNumber: Yup.string().matches(
      /^[0-9]{12}$/,
      "Aadhaar number must be 12 digits"
     ),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const genderOptions: IDropdownOption[] = [
    { key: Gender.Male, text: Gender[0] },
    { key: Gender.Female, text: Gender[1] },
  ];
 
  const bloodGroupOptions: IDropdownOption[] = [
    { key: BloodGroup.UNKNOWN, text: "Select" },
    { key: BloodGroup.O_POSITIVE, text: "O+" },
    { key: BloodGroup.O_NEGATIVE, text: "O-" },
    { key: BloodGroup.A_POSITIVE, text: "A+" },
    { key: BloodGroup.A_NEGATIVE, text: "A-" },
    { key: BloodGroup.B_POSITIVE, text: "B+" },
    { key: BloodGroup.B_NEGATIVE, text: "B-" },
    { key: BloodGroup.AB_POSITIVE, text: "AB+" },
    { key: BloodGroup.AB_NEGATIVE, text: "AB-" },
  ];

  const maritalStatusOptions: IDropdownOption[] = [
    { key: MaritalStatus.Married, text: 'Married' },
    { key: MaritalStatus.Unmarried, text: 'Unmarried' },
    { key: MaritalStatus.Single, text: 'Single' },
  ];

  const statusOptions: IDropdownOption[] = [
    { key: Status.Active, text: 'Active' },
    { key: Status.Inactive, text: 'Inactive' },
  ];

  const roleOptions: IDropdownOption[] = [
    { key: Role.Employee, text: 'Employee' },
    { key: Role.Student, text: 'Student' },
  ];

  const buttonStyles = { root: { marginRight: 8 } };

  React.useEffect(() => {
    if (itemId && openPanel) {
      console.log("Editing Item ID:", itemId);
      setFormValues(initialValues); // Set form values when the panel is opened
    }
  }, [itemId, openPanel, initialValues]); // Trigger whenever itemId or initialValues change

  // Function to handle form submission
  const handleSave = async (values: any) => {
    console.log("Saving values:", values);
    console.log("Item Id:", itemId);
    if(itemId){
      await updateRegister(values, itemId);
    }
    else{
      await saveRegister(values);
    }
    setTrigger((prev: any) => !prev);  
    setOpenPanel(false);     
  };  

  return (
    <div className="RegisterPanel">
      <Panel
         isOpen={openPanel}
         hasCloseButton={false}
         type={PanelType.large}
         isFooterAtBottom={true}
      >
        <Formik
          enableReinitialize={true}  // This ensures form gets reinitialized when initialValues change
          initialValues={formValues}
          validationSchema={validationSchema}
          //innerRef={formikRef}
          onSubmit={(values) => handleSave(values)}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => {
            console.log("Form Values:", values);
            return (
              <form onSubmit={handleSubmit}>
                <Stack>
                  <Stack horizontalAlign="stretch" style={{ width: "100%" }}>
                    <Stack
                      horizontal
                      horizontalAlign="space-between"
                      verticalAlign="center"
                    >
                      <Separator
                        alignContent="start"
                        styles={{
                          root: { width: "100%" },
                          content: { fontSize: 15 },
                        }}
                      >
                        Basic Information
                      </Separator>
                      <FontIcon
                        iconName="Print"
                        aria-label="Print"
                        style={{
                          fontSize: 15,
                          color: "blue",
                          cursor: "pointer",
                          paddingRight: 8,
                        }}
                        onClick={() => window.print()}
                      />
                      <FontIcon
                        iconName="Cancel"
                        aria-label="Cancel"
                        style={{
                          fontSize: 15,
                          color: "red",
                          cursor: "pointer",
                          paddingRight: 8,
                        }}
                        onClick={() => {
                          setDismissPanel(!dismissPanel); setOpenPanel(false);
                        }}
                      />
                    </Stack>
                  </Stack>
                  <Stack
                    horizontal
                    horizontalAlign="space-between"
                    style={{ paddingBottom: 15, paddingTop: 15 }}
                  >
                    <Stack tokens={{ childrenGap: 10 }}>
                      <Stack horizontal>
                        <Label required styles={{ root: { width: 200 } }}>
                          Employee Name
                        </Label>
                        <TextField
                          name="employeeName"
                          errorMessage={errors.employeeName?.toString()}
                          value={values.employeeName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          styles={inputStyle}
                        />
                      </Stack>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>
                          Birth Date
                        </Label>
                        <DatePicker
                          placeholder="Select a date..."
                          ariaLabel="Select a date"
                          strings={defaultDatePickerStrings}
                          styles={inputStyle}
                          value={values.birthDate}
                          //errorMessage={errors.birthDate}
                          id="birthDate"
                          onChange={handleChange}
                          onBlur={handleBlur}       
                        />
                      </Stack>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>Gender</Label>
                        <Dropdown
                          placeholder="Select an option"
                          options={genderOptions}
                          selectedKey={values.gender}
                          id="gender"
                          onBlur={handleBlur}
                          // onChange={(e, option) => handleChange({ target: { name: option?.text, value: option?.key } })}
                          onChange={(e, o) => setFieldValue("gender", o?.key)}
                          styles={inputStyle}
                        />
                      </Stack>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>
                          Passport No.
                        </Label>

                        <TextField
                          onChange={handleChange}
                          name="passportNumber"
                          onBlur={handleBlur}
                          styles={inputStyle}
                          value={values.passportNumber}
                        />
                      </Stack>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>
                          Mobile No.
                        </Label>

                        <TextField
                          onChange={handleChange}
                          name="mobileNumber"
                          errorMessage={errors.mobileNumber?.toString()}
                          value={values.mobileNumber}
                          onBlur={handleBlur}
                          styles={inputStyle}
                        />
                      </Stack>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>
                          Present Address
                        </Label>
                          <Stack tokens={{childrenGap: 10}}>
                        <TextField placeholder="Building/House No. " value={values.presentAddress.house} name="presentAddress.house" onChange={handleChange} onBlur={handleBlur} styles={inputStyle} />
                        <TextField placeholder="Street " value={values.presentAddress.street} name="presentAddress.street" onChange={handleChange} onBlur={handleBlur} styles={inputStyle} />
                        <TextField placeholder="City " value={values.presentAddress.city} name="presentAddress.city" onChange={handleChange} onBlur={handleBlur} styles={inputStyle} />
                        <TextField placeholder="District " value={values.presentAddress.district} name="presentAddress.district" onChange={handleChange} onBlur={handleBlur} styles={inputStyle} />
                        <TextField placeholder="State " value={values.presentAddress.state} name="presentAddress.state" onChange={handleChange} onBlur={handleBlur} styles={inputStyle} />
                        <TextField placeholder="Pincode " value={values.presentAddress.pincode} name="presentAddress.pincode" onChange={handleChange} onBlur={handleBlur} styles={inputStyle} />
                        </Stack>
                      </Stack>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>
                          Candidate's Photo
                        </Label>

                        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Candidate's Photo"
            style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%' }}
          />
        ) : (
          <>
            <TextField
              prefix="Choose file"
              placeholder="No file Chosen"
              value={values.candidateImage}
              onBlur={handleBlur}
              styles={{ root: { width: 200 } }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "candidateImage")}
              style={{ display: "none" }} // Hide the default file input
              id="candidateImage"
            />
            <label htmlFor="candidateImage">
              <PrimaryButton text="Choose file" />
            </label>
          </>
        )}
                      </Stack>
                    </Stack>
                    <Stack tokens={{ childrenGap: 10 }}>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>
                          Father's Name
                        </Label>

                        <TextField
                          styles={inputStyle}
                          name="fatherName"
                          value={values.fatherName}
                          errorMessage={errors.fatherName?.toString()}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Stack>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>
                          Blood Group
                        </Label>
                        <Dropdown
                          placeholder="Select an option"
                          options={bloodGroupOptions}
                          selectedKey={values.bloodGroup}
                          id="bloodGroup"
                          onBlur={handleBlur}
                          //onChange={(e, option) => handleChange({ target: { name: option?.text, value: option?.key } })}
                          onChange={(e, o) =>
                            setFieldValue("bloodGroup", o?.key)
                          }
                          styles={inputStyle}
                        />
                      </Stack>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>
                          Marital Status
                        </Label>

                        <Dropdown
                          placeholder="Select an option"
                          options={maritalStatusOptions}
                          selectedKey={values.maritalStatus}
                          id="maritalStatus"
                          onBlur={handleBlur}
                          //onChange={(e, option) => handleChange({ target: { name: option?.text, value: option?.key } })}
                          onChange={(e, o) =>
                            setFieldValue("maritalStatus", o?.key)
                          }
                          styles={inputStyle}
                        />
                      </Stack>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>
                          Aadhaar Number
                        </Label>

                        <TextField
                          styles={inputStyle}
                          name="aadhaarNumber"
                          errorMessage={errors.aadhaarNumber?.toString()}
                          value={values.aadhaarNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Stack>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>
                          Card No/Role
                        </Label>
                        <Stack horizontal styles={inputStyle}>
                          <Dropdown
                            options={statusOptions}
                            onChange={(e, o) => setFieldValue("status", o?.key)}
                            id="status"
                            onBlur={handleBlur}
                            selectedKey={values.status}
                            styles={{ root: { width: 75 } }}
                          />
                          <TextField
                            value={values.cardNumber}
                            name="cardNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            styles={{ root: { width: 150 } }}
                          />
                          <Dropdown
                            options={roleOptions}
                            onBlur={handleBlur}
                            onChange={(e, o) => setFieldValue("role", o?.key)}
                            id="role"
                            selectedKey={values.role}
                            styles={{ root: { width: 75 } }}
                          />
                        </Stack>
                      </Stack>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>Email</Label>

                        <TextField
                          styles={inputStyle}
                          value={values.email}
                          errorMessage={errors.email?.toString()}
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Stack>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>
                          Permanent Address
                        </Label>
                        <Stack>
                        <Stack tokens={{childrenGap: 10}}>
                        <TextField placeholder="Building/House No. " value={values.permanentAddress.house} name="permanentAddress.house" onChange={handleChange} onBlur={handleBlur} styles={inputStyle} />
                        <TextField placeholder="Street " value={values.permanentAddress.street} name="permanentAddress.street" onChange={handleChange} onBlur={handleBlur} styles={inputStyle} />
                        <TextField placeholder="City " value={values.permanentAddress.city} name="permanentAddress.city" onChange={handleChange} onBlur={handleBlur} styles={inputStyle} />
                        <TextField placeholder="District " value={values.permanentAddress.district} name="permanentAddress.district" onChange={handleChange} onBlur={handleBlur} styles={inputStyle} />
                        <TextField placeholder="State " value={values.permanentAddress.state} name="permanentAddress.state" onChange={handleChange} onBlur={handleBlur} styles={inputStyle} />
                        <TextField placeholder="Pincode " value={values.permanentAddress.pincode} name="permanentAddress.pincode" onChange={handleChange} onBlur={handleBlur} styles={inputStyle} />
                        </Stack>
                          <Checkbox
                            label="Same as present address"
                            styles={{ root: { paddingTop: 10 } }}
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                          />
                        </Stack>
                      </Stack>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>
                          Candidate's Signature
                        </Label>

                        {signatureUrl ? (
          <img
            src={signatureUrl}
            alt="Candidate's Signature"
            style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%' }}
          />
        ) : (
          <>
            <TextField
              prefix="Choose file"
              placeholder="No file Chosen"
              value={values.candidateSignature}
              onBlur={handleBlur}
              styles={{ root: { width: 200 } }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "candidateSignature")}
              style={{ display: "none" }} // Hide the default file input
              id="candidateSignature"
            />
            <label htmlFor="candidateSignature">
              <PrimaryButton text="Choose file" />
            </label>
          </>
        )}
                      </Stack>
                    </Stack>
                  </Stack>
                  <Separator
                    alignContent="start"
                    styles={{ content: { fontSize: 15 } }}
                  >
                    Bank Details
                  </Separator>
                  <Stack
                    horizontal
                    horizontalAlign="space-between"
                    style={{ paddingBottom: 15, paddingTop: 15 }}
                  >
                    <Stack tokens={{ childrenGap: 10 }}>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>
                          Bank Account No
                        </Label>
                        <TextField
                          value={values.bankDetails.accountNumber}
                          name="bankDetails.accountNumber"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          styles={inputStyle}
                        />
                      </Stack>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>
                          Account Holder Name
                        </Label>
                        <TextField
                          value={values.bankDetails.accountHolderName}
                          name="bankDetails.accountHolderName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          styles={inputStyle}
                        />
                      </Stack>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>Pan No</Label>
                        <TextField
                          value={values.bankDetails.panNumber}
                          name="bankDetails.panNumber"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          styles={inputStyle}
                        />
                      </Stack>
                    </Stack>
                    <Stack tokens={{ childrenGap: 10 }}>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>
                          Bank Name / IFSC Code
                        </Label>
                        <Stack horizontal>
                          <TextField
                            styles={{ root: { width: 150 } }}
                            value={values.bankDetails.bankName}
                            name="bankDetails.bankName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Bank Name"
                          />
                          <TextField
                            styles={{ root: { width: 150 } }}
                            value={values.bankDetails.ifscCode}
                            onChange={handleChange}
                            name="bankDetails.ifscCode"
                            onBlur={handleBlur}
                            placeholder="IFSC Code"
                          />
                        </Stack>
                      </Stack>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>
                          Bank Address
                        </Label>

                        <TextField
                          multiline
                          rows={3}
                          onChange={handleChange}
                          name="bankDetails.bankAddress"
                          onBlur={handleBlur}
                          value={values.bankDetails.bankAddress}
                          styles={inputStyle}
                        />
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack horizontal styles={{root: {paddingTop: 50}}}>
                    <PrimaryButton
                      text={itemId ? "Edit" : "Submit" }
                      type="submit"
                      onClick={() => 
                      {
                      setDismissPanel(!dismissPanel),
                      setOpenPanel(false),
                      resetForm
                      }}
                      styles={buttonStyles}
                    />
                     
                    <DefaultButton
                    text="Cancel"
                     onClick={() => {
                        setDismissPanel(!dismissPanel), setOpenPanel(false), resetForm;
                      }}/>
                   
                  </Stack>
                </Stack>
              </form>
            );
          }}
        </Formik>
      </Panel>
    </div>
  );
};

export default AddContent;
