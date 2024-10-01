"use client";
import * as React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ModalData from "./ModalData";

export default function Master() {
  const [modal, setModal] = React.useState(false);
  const [modalType, setModalType] = React.useState("");
  const [selectedRow, setSelectedRow] = React.useState({});
  const [gerbangs, setGerbangs] = React.useState([]);
  const [cabangFilter, setCabangFilter] = React.useState("");
  const [gerbangFilter, setGerbangFilter] = React.useState("");

  React.useEffect(() => {
    getGerbangs();
  }, []);

  const getGerbangs = () => {
    axios({
      method: "GET",
      url: "http://localhost:8080/api/gerbangs",
      params: {
        NamaCabang: cabangFilter,
        NamaGerbang: gerbangFilter,
      },
    })
      .then((res) => {
        setGerbangs(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onClickFilter = () => {
    getGerbangs();
  };

  const onButtonClick = (e, value, type) => {
    e.preventDefault();
    setModalType(type);
    setSelectedRow(value);
    setModal(true);
  };

  const columns = [
    {
      field: "id",
      headerName: "No.",
      width: 70,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    {
      field: "NamaCabang",
      headerName: "Ruas",
      width: 150
    },
    {
      field: "NamaGerbang",
      headerName: "Gerbang",
      width: 150
    },
    {
      field: "actions",
      headerName: "Aksi",
      width: 100,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <>
            <EditIcon
              onClick={(e) => onButtonClick(e, params.row, "edit")}
              sx={{ cursor: "pointer" }}
            />
            <VisibilityIcon
              onClick={(e) => onButtonClick(e, params.row, "view")}
              sx={{ cursor: "pointer" }}
            />
            <DeleteIcon
              onClick={(e) => onButtonClick(e, params.row, "delete")}
              sx={{ cursor: "pointer" }}
            />
          </>
        );
      },
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
          Master Data Gerbang
        </Typography>

        <Paper elevation={2}>
          <Grid
            container
            spacing={2}
            columns={12}
            sx={{ my: 2, px: 3, py: 3, justifyContent: "space-between" }}
          >
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="Search Cabang"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={(e) => setCabangFilter(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="Search Gerbang"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={(e) => setGerbangFilter(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <Button variant="contained" onClick={onClickFilter} sx={{ py: 2 }}>
                Filter
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }} sx={{ textAlign: "end" }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ py: 2 }}
              >
                Tambah
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
                rows={gerbangs?.rows?.rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 25, 50]}
                sx={{ border: 0, display: "grid" }}
                autoHeight={true}
                autosizeOnMount={true}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <ModalData
        modalStatus={modal}
        selectedRow={selectedRow}
        setModal={setModal}
        type={modalType}
      />
    </>
  );
}
