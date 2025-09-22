import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Container } from "@mui/system";
import Iconify from "src/components/iconify";
import ProfileSidebar from "../profile-sidebar";
import { useState } from "react";
import { boolean } from "yup";
import { bool } from "prop-types";

function createData(kriteria, Explorer, Voyager, Jetsetter) {
    return { kriteria, Explorer, Voyager, Jetsetter };
}

const rows = [
    createData("Minimum Transaction", "Transaksi : 0", "5 Transaksi atau Rp 5.000.000,00", "15 Transaksi atau Rp 20.000.000,00"),
    createData("Mendapatkan Poin dari setiap transaksi dan misi", true, true, true),
    createData("Poin dapat digunakan untuk membayar transaksi berikutnya atau tukarkan dengan Deals.", true, true, true),
    createData("Redeem kupon untuk potongan harga eksklusif setiap bulan pada program spesial liburdulu.id", true, true, true),
    createData("Extra Diskon hingga 5% untuk Hotel & Marketplace berlabel Exclusive.", false, true, true),
    createData("Extra Diskon hingga 15% untuk Hotel & Marketplace berlabel Elite + dan Exclusive.", false, false, true),
    createData("Extra Poin pada hari ulang tahun user (Birthday Surprise gift)", "-", "100K", "150K"),
    createData("I Love Monday Extra 30K Points setiap hari senin", false, false, true),
    createData("Customer Support", "Reguler", "Premium", "Priority"),
];

export default function MyRewardListKeuntunganTableAtas() {
    return (
        <TableContainer component={Paper} className="border">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead
                    sx={{
                        "& th": {
                            color: "white",
                            backgroundColor: "#2C3A49",
                        },
                    }}
                >
                    <TableRow className="bg-liburdulu-black">
                        <TableCell>Benefit</TableCell>
                        <TableCell align="left">Explorer</TableCell>
                        <TableCell align="left">Voyager</TableCell>
                        <TableCell align="left">Jetsetter</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        // <div key={row.name}>
                            <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.kriteria}
                                </TableCell>
                                <TableCell align="left">
                                    {row.Explorer == false ? (
                                        <Iconify icon="material-symbols:cancel-outline-rounded" sx={{ fontSize: 13, color: "#ff2600" }} />
                                    ) : row.Explorer == true ? (
                                        <Iconify icon="material-symbols:check-rounded" sx={{ fontSize: 13, color: "#000000" }} />
                                    ) : (
                                        <>{row.Explorer}</>
                                    )}
                                </TableCell>
                                <TableCell align="left">
                                    {row.Voyager == false ? (
                                        <Iconify icon="material-symbols:cancel-outline-rounded" sx={{ fontSize: 13, color: "#ff2600" }} />
                                    ) : row.Voyager == true ? (
                                        <Iconify icon="material-symbols:check-rounded" sx={{ fontSize: 13, color: "#000000" }} />
                                    ) : (
                                        <>{row.Voyager}</>
                                    )}
                                </TableCell>
                                <TableCell align="left">
                                    {row.Jetsetter == false ? (
                                        <Iconify icon="material-symbols:cancel-outline-rounded" sx={{ fontSize: 13, color: "#ff2600" }} />
                                    ) : row.Jetsetter == true ? (
                                        <Iconify icon="material-symbols:check-rounded" sx={{ fontSize: 13, color: "#000000" }} />
                                    ) : (
                                        <>{row.Jetsetter}</>
                                    )}
                                </TableCell>
                            </TableRow>
                        // </div>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
