"use client";
import * as React from "react";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChartPie from "./ChartPie";
import PageViewsBarChart from "./PageViewsBarChart";

const Dashboard = () => {
  const [dateFilter, setDateFilter] = React.useState('');
  const [paymentData, setPaymentData] = React.useState([]);
  const [gateData, setGateData] = React.useState([]);
  const [shiftChartData, setShiftChartData] = React.useState([{}]);
  const [shiftLinearData, setShiftLinearData] = React.useState([{}]);
  const [branchChartData, setBranchChartData] = React.useState([{}]);
  const [branchLinearData, setBranchLinearData] = React.useState([{}]);
  const paymentType = ["BCA", "BRI", "BNI", "DKI", "Mandiri", "Flo", "KTP"];
  const gateType = [
    "Gerbang 1",
    "Gerbang 2",
    "Gerbang 3",
    "Gerbang 4",
    "Gerbang 5",
  ];

  React.useEffect(() => {
    getLalins();
  }, []);

  const getLalins = () => {
    let paymentType = {
      bca: 0,
      bri: 0,
      bni: 0,
      dki: 0,
      mandiri: 0,
      flo: 0,
      ktp: 0,
    };

    let gateType = {
      gerbang1: 0,
      gerbang2: 0,
      gerbang3: 0,
      gerbang4: 0,
      gerbang5: 0,
    };

    let shiftChartData = [
      { label: "Shift 1", value: 0 },
      { label: "Shift 2", value: 0 },
      { label: "Shift 3", value: 0 },
    ];

    let shiftLinearData = [
      {
        name: "Shift 1",
        value: 0,
        color: "hsl(220, 25%, 65%)",
      },
      {
        name: "Shift 2",
        value: 0,
        color: "hsl(220, 25%, 45%)",
      },
      {
        name: "Shift 3",
        value: 0,
        color: "hsl(220, 25%, 30%)",
      },
    ];

    let branchChartData = [
      { label: "Ruas 1", value: 0 },
      { label: "Ruas 2", value: 0 },
      { label: "Ruas 16", value: 0 },
    ];

    let branchLinearData = [
      {
        name: "Ruas 1",
        value: 0,
        color: "hsl(220, 25%, 65%)",
      },
      {
        name: "Ruas 2",
        value: 0,
        color: "hsl(220, 25%, 45%)",
      },
      {
        name: "Ruas 16",
        value: 0,
        color: "hsl(220, 25%, 30%)",
      },
    ];

    axios({
      method: "GET",
      url: "http://localhost:8080/api/lalins",
    })
      .then((res) => {
        res.data.data.rows.rows.forEach((lalin) => {
          paymentType["bca"] += lalin.eBca;
          paymentType["bri"] += lalin.eBri;
          paymentType["bni"] += lalin.eBni;
          paymentType["dki"] += lalin.eDKI;
          paymentType["mandiri"] += lalin.eMandiri;
          paymentType["flo"] += lalin.eFlo;
          paymentType["ktp"] +=
            lalin.DinasOpr + lalin.DinasMitra + lalin.DinasKary;
          if (lalin.IdGerbang == 1) gateType["gerbang1"] += 1;
          if (lalin.IdGerbang == 2) gateType["gerbang2"] += 1;
          if (lalin.IdGerbang == 3) gateType["gerbang3"] += 1;
          if (lalin.IdGerbang == 4) gateType["gerbang4"] += 1;
          if (lalin.IdGerbang == 5) gateType["gerbang5"] += 1;
          if (lalin.Shift == 1) {
            shiftChartData[0].value += 1;
            shiftLinearData[0].value += 1;
          }
          if (lalin.Shift == 2) {
            shiftChartData[1].value += 1;
            shiftLinearData[1].value += 1;
          }
          if (lalin.Shift == 3) {
            shiftChartData[2].value += 1;
            shiftLinearData[2].value += 1;
          }
          if (lalin.IdCabang == 1) {
            branchChartData[0].value += 1;
            branchLinearData[0].value += 1;
          }
          if (lalin.IdCabang == 2) {
            branchChartData[1].value += 1;
            branchLinearData[1].value += 1;
          }
          if (lalin.IdCabang == 16) {
            branchChartData[2].value += 1;
            branchLinearData[2].value += 1;
          }
        });

        setPaymentData(Object.values(paymentType));
        setGateData(Object.values(gateType));
        setShiftChartData(shiftChartData);
        setShiftLinearData(shiftLinearData);
        setBranchChartData(branchChartData);
        setBranchLinearData(branchLinearData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onClickFilter = () => {
    let paymentType = {
      bca: 0,
      bri: 0,
      bni: 0,
      dki: 0,
      mandiri: 0,
      flo: 0,
      ktp: 0,
    };

    let gateType = {
      gerbang1: 0,
      gerbang2: 0,
      gerbang3: 0,
      gerbang4: 0,
      gerbang5: 0,
    };

    let shiftChartData = [
      { label: "Shift 1", value: 0 },
      { label: "Shift 2", value: 0 },
      { label: "Shift 3", value: 0 },
    ];

    let shiftLinearData = [
      {
        name: "Shift 1",
        value: 0,
        color: "hsl(220, 25%, 65%)",
      },
      {
        name: "Shift 2",
        value: 0,
        color: "hsl(220, 25%, 45%)",
      },
      {
        name: "Shift 3",
        value: 0,
        color: "hsl(220, 25%, 30%)",
      },
    ];

    let branchChartData = [
      { label: "Ruas 1", value: 0 },
      { label: "Ruas 2", value: 0 },
      { label: "Ruas 16", value: 0 },
    ];

    let branchLinearData = [
      {
        name: "Ruas 1",
        value: 0,
        color: "hsl(220, 25%, 65%)",
      },
      {
        name: "Ruas 2",
        value: 0,
        color: "hsl(220, 25%, 45%)",
      },
      {
        name: "Ruas 16",
        value: 0,
        color: "hsl(220, 25%, 30%)",
      },
    ];
    axios({
      method: "GET",
      url: "http://localhost:8080/api/lalins",
      params: {
        tanggal: dateFilter,
      },
    })
      .then((res) => {
        res.data.data.rows.rows.forEach((lalin) => {
          paymentType["bca"] += lalin.eBca;
          paymentType["bri"] += lalin.eBri;
          paymentType["bni"] += lalin.eBni;
          paymentType["dki"] += lalin.eDKI;
          paymentType["mandiri"] += lalin.eMandiri;
          paymentType["flo"] += lalin.eFlo;
          paymentType["ktp"] +=
            lalin.DinasOpr + lalin.DinasMitra + lalin.DinasKary;
          if (lalin.IdGerbang == 1) gateType["gerbang1"] += 1;
          if (lalin.IdGerbang == 2) gateType["gerbang2"] += 1;
          if (lalin.IdGerbang == 3) gateType["gerbang3"] += 1;
          if (lalin.IdGerbang == 4) gateType["gerbang4"] += 1;
          if (lalin.IdGerbang == 5) gateType["gerbang5"] += 1;
          if (lalin.Shift == 1) {
            shiftChartData[0].value += 1;
            shiftLinearData[0].value += 1;
          }
          if (lalin.Shift == 2) {
            shiftChartData[1].value += 1;
            shiftLinearData[1].value += 1;
          }
          if (lalin.Shift == 3) {
            shiftChartData[2].value += 1;
            shiftLinearData[2].value += 1;
          }
          if (lalin.IdCabang == 1) {
            branchChartData[0].value += 1;
            branchLinearData[0].value += 1;
          }
          if (lalin.IdCabang == 2) {
            branchChartData[1].value += 1;
            branchLinearData[1].value += 1;
          }
          if (lalin.IdCabang == 16) {
            branchChartData[2].value += 1;
            branchLinearData[2].value += 1;
          }
        });

        setPaymentData(Object.values(paymentType));
        setGateData(Object.values(gateType));
        setShiftChartData(shiftChartData);
        setShiftLinearData(shiftLinearData);
        setBranchChartData(branchChartData);
        setBranchLinearData(branchLinearData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
        ml: 2,
        pr: 3,
      }}
    >
      <Typography component="h2" variant="strong" sx={{ my: 2 }}>
        Dashboard
      </Typography>

      <Grid container spacing={2} columns={12} sx={{ my: 2 }}>
        <Grid size={{ xs: 12, sm: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="YYYY-MM-DD"
              onChange={(e) =>
                setDateFilter(e.format('YYYY-MM-DD'))
              }
            />
          </LocalizationProvider>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <Button variant="contained" sx={{ py: 1.8 }} onClick={onClickFilter}>
            Filter
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12} sx={{ my: 2 }}>
        <Grid size={{ sm: 12, md: 6 }}>
          <PageViewsBarChart
            data={paymentData}
            type={paymentType}
            chartName="Tipe Pembayaran"
          />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <ChartPie dataChart={shiftChartData} dataLinear={shiftLinearData} />
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12} sx={{ my: 2 }}>
        <Grid size={{ sm: 12, md: 6 }}>
          <PageViewsBarChart
            data={gateData}
            type={gateType}
            chartName="Nama Gerbang"
          />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <ChartPie dataChart={branchChartData} dataLinear={branchLinearData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
