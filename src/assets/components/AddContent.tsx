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
  ActionButton,
  values,
} from "@fluentui/react";
import React, { useEffect } from "react";
import { Gender, get, MaritalStatus, Role, saveRegister, Status, updateRegister } from "./Api";
import {
  FieldArray,
  Formik,
  FormikHelpers,
  FormikValues,
  useFormik,
} from "formik";
import * as Yup from "yup";

const AddContent = ({ openPanel, setOpenPanel, setTrigger, itemId, setitemId }: any) => {
  const [dismissPanel, setDismissPanel] = React.useState<boolean>(false);
  const [initialValues, setInitialValues] = React.useState<any>({
    //id: "",
    employeeName: "",
    birthDate: new Date(),
    gender: 0,
    passportNumber: '',
    mobileNumber: '',
    aadhaarNumber: '',
    presentAddress: {
      house: '',
      street: '',
      city: '',
      district: '',
      state: '',
      pincode: 0
    },
    permanentAddress: {
      house: '',
      street: '',
      city: '',
      district: '',
      state: '',
      pincode: 0
    },
    fatherName: "",
    bloodGroup: '',
    maritalStatus: 0,
    status: 0,
    cardNumber: '',
    role: 0,
    email: "",
    candidateImage: "",
    candidateSignature: "",
    deletedStatus: 0,
    bankDetails: {
      accountNumber: '',
      accountHolderName: "",
      panNumber: '',
      bankName: "",
      ifscCode: '',
      bankAddress: "",
    },
  });

  const inputStyle = {
    root: {
      width: 300,
    },
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

  // const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
  //   initialValues: initialValues,
  //   validationSchema: validationSchema,
  //   onSubmit: (values) => console.log(values),
  // });

  // const onRenderFooterContent = React.useCallback(
  //   () => (

  //   ),
  //   [dismissPanel]
  // );

  const genderOptions: IDropdownOption[] = [
    { key: 0, text: Gender[0] },
    { key: 1, text: Gender[1] },
  ];
 
  

  const bloodGroupOptions: IDropdownOption[] = [
    { key: 0, text: "O+" },
    { key: 1, text: "O-" },
    { key: 2, text: "A+" },
    { key: 3, text: "A-" },
    { key: 4, text: "B+" },
    { key: 5, text: "B-" },
    { key: 6, text: "AB+" },
    { key: 7, text: "AB-" },
  ];

  const maritalStatusOptions: IDropdownOption[] = [
    { key: MaritalStatus.Married, text: MaritalStatus[0] },
    { key: MaritalStatus.Unmarried, text: MaritalStatus[1] },
    { key: MaritalStatus.Single, text: MaritalStatus[2] },
  ];

  const statusOptions: IDropdownOption[] = [
    { key: Status.Active, text: Status[0] },
    { key: Status.Inactive, text: Status[1] },
  ];

  const roleOptions: IDropdownOption[] = [
    { key: Role.Employee, text: Role[0] },
    { key: Role.Student, text: Role[1] },
  ];

  const buttonStyles = { root: { marginRight: 8 } };

  const handleSave = async (DetailsList: any) => {
    if(itemId !== ""){
      await updateRegister(DetailsList,itemId);
      console.log("Updated  Successfully", );
      setitemId("");
    }
    else{
      await saveRegister({...DetailsList, birthDate: new Date()});
      console.log("Saved Successfully");
    }
    setTrigger((prev: boolean) => !prev);
    setOpenPanel(false);
  };

  useEffect(() => {
  if(itemId !== ""){
    console.log("editId",itemId);
 
    const setData = async () => {
      if (itemId !== "") { // Only fetch data if `itemId` is set
        const data = await get(itemId); // Fetch data from API
        setInitialValues({
          //id: data.id,
          employeeName: data.employeeName || "",
          birthDate: new Date(data.birthDate) || new Date(),
          gender: data.gender || 0,
          passportNumber: data.passportNumber || "",
          mobileNumber: data.mobileNumber || "",
          aadhaarNumber: data.aadhaarNumber || "",
          presentAddress: {
            house: data.presentAddress.house || '',
            street: data.presentAddress.street || '',
            city: data.presentAddress.city || '',
            district: data.presentAddress.district || '',
            state: data.presentAddress.state || '',
            pincode: data.presentAddress.pincode || 0,
          },
          permanentAddress: {
            house: data.permanentAddress.house || '',
            street: data.permanentAddress.street || '',
            city: data.permanentAddress.city || '',
            district: data.permanentAddress.district || '',
            state: data.permanentAddress.state || '',
            pincode: data.permanentAddress.pincode || 0,
          },
          fatherName: data.fatherName || "",
          bloodGroup: data.bloodGroup || 0,
          maritalStatus: data.maritalStatus || 0,
          status: data.status || 0,
          cardNumber: data.cardNumber || "",
          role: data.role || 0,
          email: data.email || "",
          candidateImage: data.candidateImage || "",
          candidateSignature: data.candidateSignature || "",
          deletedStatus: data.deletedStatus || 0,
          bankDetails: {
            accountNumber: data.bankDetails?.accountNumber || "",
            accountHolderName: data.bankDetails?.accountHolderName || "",
            panNumber: data.bankDetails?.panNumber || "",
            bankName: data.bankDetails?.bankName || "",
            ifscCode: data.bankDetails?.ifscCode || "",
            bankAddress: data.bankDetails?.bankAddress || "",
          },
        });
      } 
    };
  setData();
}
}, [itemId])

  
// const handleEdit = async (DetailsList: any, itemId: string) => {
    
//     await updateRegister(DetailsList,itemId);
//     console.log("Updated  Successfully", );
//     setTrigger((prev: boolean) => !prev);
//   };
  

  return (
    <div className="RegisterPanel">
      <Panel
        isOpen={openPanel}
        //onDismiss={() => dismissPanel}
        //closeButtonAriaLabel="Close"
        hasCloseButton={false}
        //onRenderFooterContent={onRenderFooterContent}
        type={PanelType.large}
        isFooterAtBottom={true}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
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
                          setDismissPanel(!dismissPanel), setOpenPanel(false)
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
                          value={values.date}
                          //errorMessage={errors.birthDate}
                          id="date"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onSelectDate={(date) =>
                            setInitialValues({
                              ...initialValues,
                              birthDate: date,
                            })
                          }
                        />
                      </Stack>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>Gender</Label>
                        <Dropdown
                          placeholder="Select an option"
                          options={genderOptions}
                          // selectedKey={values.gender}
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

                        <TextField
                          prefix="Choose file"
                          placeholder="No file Chosen"
                          value={values.c_img}
                          name="c_img"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          styles={inputStyle}
                        />
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
                          //selectedKey={values.bloodGroup}
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
                          //selectedKey={values.maritalStatus}
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
                            //selectedKey={values.status}
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
                            //selectedKey={values.role}
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
                          />
                        </Stack>
                      </Stack>
                      <Stack horizontal>
                        <Label styles={{ root: { width: 200 } }}>
                          Candidate's Signature
                        </Label>

                        <TextField
                          prefix="Choose file"
                          placeholder="No file Chosen"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="candidateSignature"
                          value={values.candidateSignature}
                          styles={inputStyle}
                        />
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
                  <Stack horizontal styles={{root: {paddingTop: 200}}}>
                    <PrimaryButton
                      text={itemId !== "" ? "Edit" : "Submit" }
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
