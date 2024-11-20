import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  IconButton,
  PrimaryButton,
  SearchBox,
  SelectionMode,
  Stack,
} from "@fluentui/react";
import React, { useEffect } from "react";
import { deleteRegister, get, getList } from "./Api";
import AddContent from "./AddContent";
import ViewDetailsModal from "./ViewDetailsModal";

interface IDetailsListBasicExampleItem {
  key: number;
  sno: number;
  id: string;
  candidateImage: string;
  employeeName: string;
  presentAddress: {
    house: string;
    street: string;
    city: string;
    district: string;
    state: string;
    pincode: number; 
  };
  mobileNumber: number;
  email: string;
  actions: string;
}

// const buttonStyles = { root: { marginRight: 8 } };

const Content = () => {
  const [items, setItems] = React.useState<IDetailsListBasicExampleItem[]>([]);
  const [search,setSearch] = React.useState<string>("");
  const [openPanel,setOpenPanel] = React.useState<boolean>(false);
  const [isModalOpen,setIsModalOpen] = React.useState<boolean>(false);
  const [itemId,setitemId] = React.useState<string>("");
  const [recordId,setRecordId] = React.useState<string>("");
  const [trigger,setTrigger] = React.useState<boolean>(false);
  // const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
  //   useBoolean(false);
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
      pincode: '',
    },
    permanentAddress: {
      house: '',
      street: '',
      city: '',
      district: '',
      state: '',
      pincode: '',
    },
    fatherName: "",
    bloodGroup: 0,
    maritalStatus: 0,
    status: 0,
    cardNumber: '',
    role: 0,
    email: "",
    candidateImage: "",
    //https://www.elections.ab.ca/uploads/Candidate.png
    candidateSignature: "",
    // https://static.vecteezy.com/system/resources/previews/025/866/349/non_2x/fake-autograph-samples-hand-drawn-signatures-examples-of-documents-certificates-and-contracts-with-inked-and-handwritten-lettering-vector.jpg
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


  const searchStyles: React.CSSProperties = {
    borderRadius: 10,
    borderColor: "grey",
  };

  useEffect(() => {
    // Fetch data and set items
    const fetchData = async () => {
      const data = await getList(search);
      const mappedItems = data.map((item: any, index: number) => ({
        key: index,
        sno: index + 1,
        id: item.id ?? '',
        candidateImage: item.candidateImage ?? '',
        employeeName: item.employeeName ?? '',
        presentAddress: {
          house: item?.presentAddress?.house ?? '',
          street: item?.presentAddress?.street ?? '',
          city: item?.presentAddress?.city ?? '',
          district: item?.presentAddress?.district ?? '',
          state: item?.presentAddress?.state ?? '',
          pincode: item?.presentAddress?.pincode ?? 0,
        },
        mobileNumber: item.mobileNumber?.toString() ?? '',
        email: item.email ?? '',
        actions: 'View/Edit',
      }));
      setItems(mappedItems);
    };
    fetchData();
  }, [search, trigger]);

  const handleDelete = async (id: string) => {
    if(confirm ("Are you sure you want to delete this record?")){
      await deleteRegister(id);
      console.log("Deleted Successfully: ");
      setTrigger((prev) => !prev);
    }
  }

  const handleEditClick = async (id: string) => {
    
    const data = await get(id);
  
    setitemId(id);
    setOpenPanel(true); 
    setRecordId(id);   
  
    setInitialValues({
      id: data.id ?? "",
      employeeName: data.employeeName ?? "",
      birthDate: new Date(data.birthDate) ?? new Date(),
      gender: data.gender ?? 0,
      passportNumber: data.passportNumber ?? "",
      mobileNumber: data.mobileNumber ?? "",
      aadhaarNumber: data.aadhaarNumber ?? "",
      presentAddress: {
        house: data.presentAddress?.house ?? '',
        street: data.presentAddress?.street ?? '',
        city: data.presentAddress?.city ?? '',
        district: data.presentAddress?.district ?? '',
        state: data.presentAddress?.state ?? '',
        pincode: data.presentAddress?.pincode ?? 0,
      },
      permanentAddress: {
        house: data.permanentAddress?.house ?? '',
        street: data.permanentAddress?.street ?? '',
        city: data.permanentAddress?.city ?? '',
        district: data.permanentAddress?.district ?? '',
        state: data.permanentAddress?.state ?? '',
        pincode: data.permanentAddress?.pincode ?? 0,
      },
      fatherName: data.fatherName ?? "",
      bloodGroup: data.bloodGroup ?? 0,
      maritalStatus: data.maritalStatus ?? 0,
      status: data.status ?? 0,
      cardNumber: data.cardNumber ?? "",
      role: data.role ?? 0,
      email: data.email ?? "",
      candidateImage: data.candidateImage ?? "",
      candidateSignature: data.candidateSignature ?? "",
      deletedStatus: data.deletedStatus ?? 0,
      bankDetails: {
        accountNumber: data.bankDetails?.accountNumber ?? "",
        accountHolderName: data.bankDetails?.accountHolderName ?? "",
        panNumber: data.bankDetails?.panNumber ?? "",
        bankName: data.bankDetails?.bankName ?? "",
        ifscCode: data.bankDetails?.ifscCode ?? "",
        bankAddress: data.bankDetails?.bankAddress ?? "",
      },
    });
  };

  const handleAddClick = () => {

    setitemId("");
    setOpenPanel(true);    
    setTrigger((prev) => !prev); 
  
    setInitialValues({
      employeeName: "",
      birthDate: new Date(),
      gender: 0,
      passportNumber: "",
      mobileNumber: "",
      aadhaarNumber: "",
      presentAddress: {
        house: '',
        street: '',
        city: '',
        district: '',
        state: '',
        pincode: 0,
      },
      permanentAddress: {
        house: '',
        street: '',
        city: '',
        district: '',
        state: '',
        pincode: 0,
      },
      fatherName: "",
      bloodGroup: 0,
      maritalStatus: 0,
      status: 0,
      cardNumber: "",
      role: 0,
      email: "",
      candidateImage: "",
      candidateSignature: "",
      deletedStatus: 0,
      bankDetails: {
        accountNumber: "",
        accountHolderName: "",
        panNumber: "",
        bankName: "",
        ifscCode: "",
        bankAddress: "",
      },
    });
  };

  const column: IColumn[] = [
    {
      key: "column1",
      name: "S No.",
      fieldName: "sno",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Profile",
      fieldName: "candidateImage",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      onRender: (item: IDetailsListBasicExampleItem) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Render image if `candidateImage` exists, otherwise show a placeholder */}
          {item?.candidateImage ? (
            <img
              src={item.candidateImage}
              alt="Candidate"
              style={{
                width: 50, // Adjust size as needed
                height: 50, // Adjust size as needed
                objectFit: "cover",
                borderRadius: "50%", // Makes the image circular
              }}
            />
          ) : (
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                backgroundColor: "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              No Image
            </div>
          )}
        </div>
      ),
    },
    {
      key: "column3",
      name: "Name",
      fieldName: "employeeName",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column4",
      name: "Address",
      onRender:((itm)=> `${itm?.presentAddress?.house}, ${itm?.presentAddress?.street}, ${itm?.presentAddress?.city}, ${itm?.presentAddress?.district}, ${itm?.presentAddress?.state} - ${itm?.presentAddress?.pincode}`),
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column5",
      name: "Mobile No",
      fieldName: "mobileNumber",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column6",
      name: "Email",
      fieldName: "email",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column7",
      name: "Actions",
      fieldName: "actions",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      onRender: (item: IDetailsListBasicExampleItem) => (
        <div style={{ display: "flex", gap: 8 }}>
          <IconButton
            iconProps={{ iconName: "Edit" }}
            title="Edit"
            ariaLabel="Edit"
            onClick={() => handleEditClick(item?.id)}
          />
          <IconButton
            iconProps={{ iconName: "RedEye" }}
            title="Preview"
            ariaLabel="Preview"
            onClick={() => {setRecordId(item?.id), setIsModalOpen(true)}}
          />
          <IconButton
            iconProps={{ iconName: "Delete" }}
            title="Delete"
            ariaLabel="Delete"
            onClick={() => handleDelete(item?.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="Subheading" style={{ padding: 10 }}>
        <Stack horizontal horizontalAlign="space-between">
          <PrimaryButton
            style={{ borderRadius: 5, backgroundColor: "#006BFF" }}
            iconProps={{iconName: 'Add'}}
            text="Add"
            onClick={() => handleAddClick()}
          />
          <SearchBox
            placeholder="Search"
            style={searchStyles}
            onChange={(e: any) => setSearch(e?.target?.value)}
          />
        </Stack>
      </div>
      <div className="table">
        <DetailsList
          items={items}
          columns={column}
          setKey="set"
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
        />
      </div>
      <AddContent 
  openPanel={openPanel} 
  setOpenPanel={setOpenPanel} 
  setTrigger={setTrigger}
  initialValues={initialValues}   // Pass initial values here
  itemId={itemId}                 // Pass itemId (ID of the record being edited)
/>
      <ViewDetailsModal
  isOpen={isModalOpen}
  onDismiss={() => setIsModalOpen(false)}
  recordId={recordId}
/>
    </>
  );
};

export default Content;