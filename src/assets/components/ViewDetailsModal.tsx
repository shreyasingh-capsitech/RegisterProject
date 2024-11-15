import { useEffect, useState } from "react";
import {
  Modal,
  Stack,
  Text,
  Label,
  DefaultButton,
  Separator,
} from "@fluentui/react";
import { get, MaritalStatus, Role, Status } from "./Api";
 
const ViewDetailsModal = ({ isOpen, onDismiss, recordId }: any) => {
  const [recordDetails, setRecordDetails] = useState<any>(null);
 
  useEffect(() => {
    const fetchDetails = async () => {
      if (recordId) {
        const data = await get(recordId); // Fetch data based on the id
        setRecordDetails({
          employeeName: data.employeeName || "",
          birthDate: new Date(data.birthDate) || new Date(),
          gender: data.gender || 0,
          passportNumber: data.passportNumber || "",
          mobileNumber: data.mobileNumber || "",
          aadhaarNumber: data.aadhaarNumber || "",
          // presentAddress: {
          //   house: data?.presentAddress?.house || '',
          //   street: data?.presentAddress?.street || '',
          //   city: data?.presentAddress?.city || '',
          //   district: data?.presentAddress?.district || '',
          //   state: data?.presentAddress?.state || '',
          //   pincode: data?.presentAddress?.pincode || 0,
          // },
          // permanentAddress: {
          //   house: data?.permanentAddress?.house || '',
          //   street: data?.permanentAddress?.street || '',
          //   city: data?.permanentAddress?.city || '',
          //   district: data?.permanentAddress?.district || '',
          //   state: data?.permanentAddress?.state || '',
          //   pincode: data?.permanentAddress?.pincode || 0,
          // },
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
 
    if (isOpen) {
      fetchDetails();
    }
  }, [recordId, isOpen]);
 
  if (!recordDetails) {
    return null; // Avoid rendering until data is fetched
  }
 
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} isBlocking={false} >
      <Stack tokens={{ childrenGap: 15 }} styles={{ root: { padding: 20, width: 750 } }}>
        <Text variant="large">Record Details</Text>
        <Separator />
        <Stack horizontal horizontalAlign="space-between">
        <Stack tokens={{ childrenGap: 10 }}>
        <Stack>
            <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>Employee Name</Label>
          <Text>{recordDetails.employeeName}</Text>
          </Stack>
        </Stack>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>Birth Date</Label>
          <Text>{recordDetails.birthDate.toLocaleDateString()}</Text>
          </Stack>
        </Stack>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>Gender</Label>
          <Text>{recordDetails.gender === 0 ? "Male" : "Female"}</Text>
          </Stack>
        </Stack>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>Passport Number</Label>
          <Text>{recordDetails.passportNumber}</Text>
          </Stack>
        </Stack>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>Mobile Number</Label>
          <Text>{recordDetails.mobileNumber}</Text>
          </Stack>
        </Stack>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>Present Address</Label>
          <Text>{recordDetails?.presentAddress?.house || ''}, {recordDetails?.presentAddress?.street || ''}, {recordDetails?.presentAddress?.city || ''}, {recordDetails?.presentAddress?.state || ''} - {recordDetails?.presentAddress?.pincode}</Text>
          </Stack>
        </Stack>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>Candidate Image</Label>
          <Text>{recordDetails.c_img}</Text>
          </Stack>
        </Stack>
        </Stack>
      <Stack tokens={{ childrenGap: 10 }}>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>Father's Name</Label>
          <Text>{recordDetails.fatherName}</Text>
          </Stack>
        </Stack>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>Blood Group</Label>
          <Text>{recordDetails.bloodGroup}</Text>
          </Stack>
        </Stack>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>Marital Status</Label>
          <Text>{MaritalStatus[recordDetails.maritalStatus]}</Text>
          </Stack>
        </Stack>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>Aadhaar Number</Label>
          <Text>{recordDetails.aadhaarNumber}</Text>
          </Stack>
        </Stack>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>Status</Label>
          <Text>{Status[recordDetails.status]}</Text>
          </Stack>
        </Stack>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>Card No</Label>
          <Text>{recordDetails.cardNumber}</Text>
          </Stack>
        </Stack>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>Role</Label>
          <Text>{Role[recordDetails.role]}</Text>
          </Stack>
        </Stack>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>Permanent Address</Label>
          <Text>{recordDetails?.permanentAddress?.house}, {recordDetails?.permanentAddress?.street}, {recordDetails?.permanentAddress?.city}, {recordDetails?.permanentAddress?.state} - {recordDetails?.permanentAddress?.pincode}</Text>
          </Stack>
        </Stack>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>Candidate Signature</Label>
          <Text>{recordDetails.permanentAddress}</Text>
          </Stack>
        </Stack>
        </Stack>
        </Stack>
        <Separator />
        <Text variant="large">Bank Details</Text>
        <Stack horizontal horizontalAlign="space-between">
        <Stack tokens={{ childrenGap: 10 }}>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>Account Number</Label>
          <Text>{recordDetails.bankDetails.accountNumber}</Text>
          </Stack>
        </Stack>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>Account Holder Name</Label>
          <Text>{recordDetails.bankDetails.accountHolderName}</Text>
          </Stack>
        </Stack>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>PAN Number</Label>
          <Text>{recordDetails.bankDetails.panNumber}</Text>
          </Stack>
        </Stack>
        </Stack>
        <Stack  tokens={{ childrenGap: 10 }}>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>Bank Name</Label>
          <Text>{recordDetails.bankDetails.bankName}</Text>
          </Stack>
        </Stack>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>IFSC Code</Label>
          <Text>{recordDetails.bankDetails.ifscCode}</Text>
          </Stack>
        </Stack>
        <Stack>
        <Stack horizontal tokens={{childrenGap: 15}}>
          <Label>Bank Address</Label>
          <Text>{recordDetails.bankDetails.bankAddress}</Text>
          </Stack>
        </Stack>
        </Stack>
        </Stack>
        <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }} styles={{root: {paddingTop: 10}}}>
          <DefaultButton text="Close" onClick={onDismiss} />
        </Stack>
      </Stack>
    </Modal>
  );
};
 
export default ViewDetailsModal;