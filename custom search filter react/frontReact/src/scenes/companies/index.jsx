import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import {mockDataCompany} from "../../data/mockData";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const Company = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "address",
      flex: 1,
      valueGetter: (params) =>
        `${params?.row?.address?.street} ${params?.row?.address?.suite}`,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "industry",
      headerName: "industry",
      flex: 1,
    },
  ];
  const [companies, setCompanies] = useState([]);
  const [setError] = useState(null);

  const getData = () => {
    const pageSize = 10;
    const response = axios.get(`http://localhost:5000/create-companies`);
    if (response) {
      console.log(response.data);
    }
  };
  useEffect(() => {}, []);

  return (
    <Box m="20px">
      <Header title="Companies" subtitle="Manage companies" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={companies}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Company;
