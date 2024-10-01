"use client";
import * as React from "react";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function Lalin() {
  const [alignment, setAlignment] = React.useState("tunai");
  const [dateFilter, setDateFilter] = React.useState("2023-11-01");
  const [lalins, setLalins] = React.useState([]);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  React.useEffect(() => {
    getLalins();
  }, []);

  const getLalins = () => {
    axios({
      method: "GET",
      url: "http://localhost:8080/api/lalins",
      params: {
        tanggal: dateFilter,
      },
    })
      .then((res) => {
        setLalins(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onClickFilter = () => {
    getLalins();
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="tunai">Total Tunai</ToggleButton>
          <ToggleButton value="etoll">Total E-Toll</ToggleButton>
          <ToggleButton value="flo">Total Flo</ToggleButton>
          <ToggleButton value="ktp">Total KTP</ToggleButton>
          <ToggleButton value="all">Total Keseluruhan</ToggleButton>
          <ToggleButton value="etf">Total E-Toll+Tunai+Flo</ToggleButton>
        </ToggleButtonGroup>
        <Box sx={{ flexGrow: 1 }} />
        <GridToolbarExport
          slotProps={{
            tooltip: { title: "Export data" },
            button: { variant: "outlined" },
          }}
        />
      </GridToolbarContainer>
    );
  }
  const columns = [
    {
      field: "id",
      headerName: "No. ",
      width: 70,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    {
      field: "IdCabang",
      headerName: "Ruas",
      width: 130,
      valueGetter: (value, row) => `Ruas ${row.IdCabang || ""}`,
    },
    {
      field: "IdGerbang",
      headerName: "Gerbang",
      width: 130,
      valueGetter: (value, row) => `Ruas ${row.IdGerbang || ""}`,
    },
    {
      field: "IdGardu",
      headerName: "Gardu",
      type: "number",
      width: 90,
    },
    {
      field: "Tanggal",
      headerName: "Tanggal",
      width: 150,
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: { sm: "100%", md: "1700px" },
          mx: 2,
          pr: 3,
        }}
      >
        <Typography component="h2" variant="strong" sx={{ my: 2 }}>
          Laporan Lalin Per Hari
        </Typography>

        <Paper elevation={2}>
          <Grid container spacing={2} columns={12} sx={{ my: 2, px: 3, pt: 3 }}>
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="Search"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="YYYY-MM-DD"
                  onChange={(e) => setDateFilter(e.format("YYYY-MM-DD"))}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Grid container columns={12} sx={{ px: 3, pb: 3 }}>
            <Grid size={{ xs: 12, sm: 1 }}>
              <Button variant="outlined" onClick={onClickFilter}>
                Filter
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 1 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setDateFilter("")}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Box sx={{ width: "100%", mx: 2, pr: 3 }}>
        <Paper elevation={2} sx={{ width: "100%" }}>
          <Grid container spacing={2} columns={12} sx={{ my: 2, px: 3, pt: 3 }}>
            <Grid size={{ xs: 12 }}>
              <DataGrid
                rows={lalins?.rows?.rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 25, 50]}
                sx={{ border: 0, display: "grid" }}
                slots={{
                  toolbar: CustomToolbar,
                }}
                autoHeight={true}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}
