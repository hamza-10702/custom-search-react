import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import { GoVerified, GoUnverified } from 'react-icons/go';
import {ImUserMinus} from 'react-icons/im';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // noinspection JSUnusedGlobalSymbols
  const columns = [
    { field: "id", headerName: "ID", flex: 0.1 },
    { field: "username", headerName: "Username" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.3,
        renderCell: (params) => {
          const iconSize = 20;
          if (params?.row?.status === 'verified') {
              return (
                  <GoVerified title={'Verified'} size={iconSize} />
              );
          }
          if (params?.row?.status === 'lead') {
              return (
                  <ImUserMinus color={'red'} title={'Lead'} size={iconSize} />
              );
          }
          if (params?.row?.status === 'contact') {
              return (
                  <GoUnverified color={'gray'} title={'Contact'} size={iconSize} />
              );
          }
        }
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "website",
      headerName: "Website",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
        valueGetter: (params) => `${params?.row?.address?.street} ${params?.row?.address?.suite}`
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
        valueGetter: (params) => params?.row?.address?.city
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
        flex: 0.5,
        valueGetter: (params) => params?.row?.address?.zipcode
    },
  ];
    const [contacts, setContacts] = useState([]);
    const [setError] = useState(null);

    useEffect(() => {
        axios("/api/users?_limit=10")
            .then((response) => {
                setContacts(response.data);
                // setError(null);
            })
            .catch(setError);
    }, [setError]);

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={contacts}
          columns={columns}
          // getRowId={(row: any) =>  generateRandom()}
          getRowId={(row) => row.id + row.phone }
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
