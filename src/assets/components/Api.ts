import axios from "axios";

const baseUrl = "https://localhost:7267/api/Register";

export const getList = async (search?: string) => {
    try {
      const response = await axios.get(`${baseUrl}`, {params: {search}});
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const get = async (id: string) => {
    try {
      const response = await axios.get(`${baseUrl}/get/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const saveRegister = async (detailList: any) => {
    try {
      const response = await axios.post(`${baseUrl}`, detailList,{
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
      const response = await axios.post(`${baseUrl}/update/${id}`, detailList);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const deleteRegister = async (id: string) => {
    try {
      const response = await axios.post(`${baseUrl}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

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