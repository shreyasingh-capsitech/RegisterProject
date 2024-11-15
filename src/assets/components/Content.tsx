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
import { deleteRegister, getList } from "./Api";
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
        id: item.id || '',
        candidateImage: item.candidateImage || '',  // Assuming 'c_img' holds image URL
        employeeName: item.employeeName || '',
        permanentAddress: {
          house: item.permanentAddress.house || '',
          street: item.permanentAddress.street || '',
          city: item.permanentAddress.city || '',
          district: item.permanentAddress.district || '',
          state: item.permanentAddress.state || '',
          pincode: item.permanentAddress.pincode || 0,
        },
        mobileNumber: item.mobileNumber?.toString() || '',
        email: item.email || '',
        actions: 'View/Edit',  // Replace with action links/buttons if needed
      }));
      setItems(mappedItems);
    };
    fetchData();
  }, [trigger]);

  const handleDelete = async (id: string) => {
    if(confirm ("Are you sure you want to delete this record?")){
      await deleteRegister(id);
      console.log("Deleted Successfully: ");
      setTrigger((prev) => !prev);
    }
  }

    const handleEditClick = (id: string) => {
      setitemId(id); 
      setOpenPanel(true);
  };
 
  
console.log("itemId",itemId);

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
      onRender:((itm)=> `${itm?.permanentAddress?.house},${itm?.permanentAddress?.street}`),
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
            onClick={() => {setOpenPanel(true)}}
          />
          <SearchBox
            placeholder="Search"
            style={searchStyles}
            onSearch={(newValue) => setSearch(newValue)}
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
      itemId={itemId}
      setitemId={setitemId}
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