import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const GoogleSheetData = () => {
    const [data, setData] = useState([]);
    const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const RANGE = "Sheet1!A1:Z100"; // Adjust based on your sheet data

    useEffect(() => {
        const fetchData = async () => {
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
            try {
                const response = await axios.get(url);
                setData(response.data.values);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <TableContainer component={Paper} style={{ maxWidth: "1200px", margin: "20px auto", boxShadow: "0 4px 10px rgba(0,0,0,0.2)", borderRadius: "10px" }}>
            <Table>
                <TableHead>
                    <TableRow style={{ backgroundColor: "#ff9800" }}>
                        {data.length > 0 &&
                            data[0].map((header, index) => (
                                <TableCell key={index} style={{ color: "#fff", fontWeight: "bold", fontSize: "16px" }}>
                                    {header}
                                </TableCell>
                            ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(1).map((row, rowIndex) => (
                        <TableRow key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? "#fffbe6" : "#fff" }}>
                            {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex} style={{ fontSize: "14px", padding: "12px" }}>
                                    {cell}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GoogleSheetData;