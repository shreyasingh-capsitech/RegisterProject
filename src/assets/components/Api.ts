import axios from "axios";

const baseUrl = "https://localhost:7267/api";

/////// Register List Api

export const getList = async (search: string) => {
    try {
      const response = await axios.get(`${baseUrl}/Register`, {params: {search}});
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const get = async (id: string) => {
    try {
      const response = await axios.get(`${baseUrl}/Register/get/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const saveRegister = async (detailList: any) => {
    try {
      const response = await axios.post(`${baseUrl}/Register`, detailList,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const updateRegister = async (detailList: any, id: string) => {
    try {
      const response = await axios.post(`${baseUrl}/Register/update/${id}`, detailList,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const deleteRegister = async (id: string) => {
    try {
      const response = await axios.post(`${baseUrl}/Register/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

/////// User Profile Api

// export const getUserProfile = async () => {
//   try {
//     const response = await axios.get(`${baseUrl}/UserProfile`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const getUserProfileById = async (id: string) => {
//   try {
//     const response = await axios.get(`${baseUrl}/UserProfile/get/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const saveUserProfile = async (userDetailList: any) => {
  try {
    const response = await axios.post(`${baseUrl}/UserProfile/authenticate`, userDetailList,);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// export const updateUserProfile = async (userDetailList: any, id: string) => {
//   try {
//     const response = await axios.post(`${baseUrl}/UserProfile/update/${id}`, userDetailList,{
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };


export enum Gender
{
    Male,
    Female
}

export enum MaritalStatus
{
    Married,
    Unmarried,
    Single
}

export enum Status
{
    Active,
    Inactive
}

export enum Role
{
    Employee,
    Student
}

export enum BloodGroup {
  UNKNOWN = 'Unknown', // Optional value in case you need to handle missing or unknown data
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-',
}