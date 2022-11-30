import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Grid from "@mui/material/Unstable_Grid2";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { type } from "@testing-library/user-event/dist/type";
import Slider from "@mui/material/Slider";

const SearchCompany = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //   const columns = [
  //     { field: "id", headerName: "ID", flex: 0.1 },
  //     {
  //       field: "name",
  //       headerName: "Name",
  //       flex: 1,
  //       cellClassName: "name-column--cell",
  //     },
  //     {
  //       field: "email",
  //       headerName: "email",
  //       flex: 1,
  //     },
  //     {
  //       field: "address",
  //       headerName: "address",
  //       flex: 1,
  //     },
  //     {
  //       field: "phone",
  //       headerName: "Phone Number",
  //       flex: 1,
  //     },
  //     {
  //       field: "industry",
  //       headerName: "industry",
  //       flex: 1,
  //     },
  //   ];
  const [companies, setCompanies] = useState([]);
  const [filterCompany, setFilterCompany] = useState([]);
  const [tableColumn, setTableColumn] = useState([]);
  const [maxHeadCount, setMaxHeadCount] = useState(50);
  const [setError] = useState(null);

  const [searchTerms, setSearchTerms] = useState("");
  const [navigateTerms, setNavigateTerms] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [comapanyLocation, setcomapanyLocation] = useState("");
  const [headCount, setHeadCount] = useState(0);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/create-companies`
      );
      if (response) {
        // console.log(response.data.companies);
        setCompanies(response.data.companies);
        setFilterCompany(response.data.companies);

        let tableColumns = [];
        Object.keys(response.data?.companies[0]).forEach(function (key, index) {
          if (key === "id") {
            tableColumns.push({
              field: key,
              headerName: key.toUpperCase(),
              flex: 0.1,
            });
          } else if (key === "name") {
            tableColumns.push({
              field: key,
              headerName: key.toUpperCase(),
              flex: 1,
              cellClassName: "name-column--cell",
            });
          } else {
            tableColumns.push({
              field: key,
              headerName: key.toUpperCase(),
              flex: 1,
            });
          }
        });

        setTableColumn((prevState) => [...tableColumns]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();

    return () => setTableColumn("");
  }, []);

  const onSearch = () => {
    let data = {
      searchTerms,
      navigateTerms,
      companyName,
      comapanyLocation,
      headCount,
    };


    let temp = [];
    companies.map((companyData) => {
      if (
        searchTerms ||
        companyName ||
        navigateTerms ||
        navigateTerms ||
        headCount
      ) {
        if (
          (companyData.industry === companyName || !companyName) &&
          (companyData.name === searchTerms || !searchTerms) &&
          (companyData.status === navigateTerms || !navigateTerms) &&
          (companyData.country === comapanyLocation || !comapanyLocation) &&
          (companyData.headCount == headCount || headCount === 0)
        ) {
          temp.push(companyData);
        }
      }
    });


    setFilterCompany((prevState) => [...temp]);
  };

  const onClear = () => {
    setFilterCompany(companies);
  };
  return (
    <Box m="20px">
      <Header title="Search Companies" subtitle="Custom Search Filter" />

      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={6}>
            <div>
              <p style={{ fontWeight: "700" }}>Search Item</p>
            </div>
            <div>
              <TextField
                id="outlined-search-term"
                label="Search Terms"
                variant="outlined"
                value={searchTerms}
                onChange={(event) => {
                  setSearchTerms(event.target.value);
                }}
              />
            </div>
          </Grid>
          <Grid xs={6}>
            <div>
              <p style={{ fontWeight: "700" }}>Example Companies</p>
            </div>
            <div>
              <Autocomplete
                disablePortal
                freeSolo
                defaultValue={companies[0]?.industry}
                id="combo-box-demo"
                options={companies.map((option) => option.industry)}
                sx={{ width: 300 }}
                value={companyName}
                onChange={(event, newValue) => {
                  setcompanyName(newValue);
                }}
                renderInput={(params) => {
                  return <TextField key={maxHeadCount+1} {...params} label="Select Companies" />;
                }}
              />
            </div>
          </Grid>
          <Grid xs={6}>
            <div>
              <p style={{ fontWeight: "700" }}>Status</p>
            </div>
            <div>
              <TextField
                id="outlined-navigate-terms"
                label="Status"
                variant="outlined"
                value={navigateTerms}
                onChange={(event) => {
                  setNavigateTerms(event.target.value);
                }}
              />
            </div>
          </Grid>
          <Grid xs={6}>
            <div>
              <p style={{ fontWeight: "700" }}>Headquarters location</p>
            </div>
            <div>
              <Autocomplete
                disablePortal
                defaultValue={companies[0]?.country}
                freeSolo
                id="combo-box-demo"
                options={companies.map((option) => option.country)}
                sx={{ width: 300 }}
                renderInput={(params) => {
                  return (
                    <TextField key={maxHeadCount+1} {...params} label="Headquarters location" />
                  );
                }}
                value={comapanyLocation}
                onChange={(event, newValue) => {
                  setcomapanyLocation(newValue);
                }}
              />
            </div>
          </Grid>
          <Grid xs={6}>
            <div>
              <p style={{ fontWeight: "700" }}>Headcount range</p>
            </div>
            <div>
              <Slider
                size="small"
                max={maxHeadCount}
                defaultValue={0}
                aria-label="Small"
                valueLabelDisplay="auto"
                style={{ width: "50%" }}
                value={headCount}
                onChange={(event) => {
                  
                  setHeadCount(event.target.value);
                }}
              />
            </div>
          </Grid>
          <Grid xs={6}>
            <div>
              <Button variant="contained" onClick={onSearch}>
                Search
              </Button>
              <Button
                style={{ marginLeft: "10px" }}
                variant="outlined"
                onClick={onClear}
              >
                Clear
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>

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
        {tableColumn.length > 0 ? (
          <DataGrid
            checkboxSelection
            rows={filterCompany}
            columns={tableColumn}
            components={{ Toolbar: GridToolbar }}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default SearchCompany;
