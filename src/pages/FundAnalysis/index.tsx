/**
 * Fon Analiz Sayfası
 * 
 * Bu sayfa, yatırım fonlarının detaylı analizini sunar.
 * Özellikler:
 * - Fon listesi tablosu
 * - Performans göstergeleri
 * - Risk seviyeleri
 * - Renk kodlu göstergeler
 * - Dinamik veri formatlaması
 * 
 * Tablo özellikleri:
 * - Fon adı
 * - Fon tipi
 * - Güncel değer
 * - Performans yüzdesi
 * - Risk seviyesi göstergesi
 * 
 * @component
 */

import { Box, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Fund } from '../../types';

/**
 * Örnek fon verileri
 * API entegrasyonu yapılana kadar kullanılacak
 */
const dummyFundData: Fund[] = [
  {
    id: '1',
    name: 'Tech Growth Fund',
    type: 'Equity',
    value: 150000,
    performance: 12.5,
    risk: 'high',
  },
  {
    id: '2',
    name: 'Government Bond Fund',
    type: 'Fixed Income',
    value: 200000,
    performance: 5.2,
    risk: 'low',
  },
  {
    id: '3',
    name: 'Balanced Fund',
    type: 'Mixed',
    value: 175000,
    performance: 8.7,
    risk: 'medium',
  },
];

/**
 * FundAnalysis bileşeni
 * Yatırım fonlarının analizini gösteren tablo
 * 
 * @returns {JSX.Element} FundAnalysis bileşeni
 */
export default function FundAnalysis() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Fund Analysis
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Fund Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">Value (₺)</TableCell>
                  <TableCell align="right">Performance (%)</TableCell>
                  <TableCell>Risk Level</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dummyFundData.map((fund: Fund) => (
                  <TableRow key={fund.id}>
                    <TableCell>{fund.name}</TableCell>
                    <TableCell>{fund.type}</TableCell>
                    <TableCell align="right">
                      {fund.value.toLocaleString()}
                    </TableCell>
                    <TableCell 
                      align="right"
                      sx={{ 
                        color: fund.performance >= 0 ? 'success.main' : 'error.main'
                      }}
                    >
                      {fund.performance > 0 ? '+' : ''}{fund.performance}%
                    </TableCell>
                    <TableCell
                      sx={{
                        color: 
                          fund.risk === 'high' 
                            ? 'error.main'
                            : fund.risk === 'medium'
                            ? 'warning.main'
                            : 'success.main',
                      }}
                    >
                      {fund.risk.charAt(0).toUpperCase() + fund.risk.slice(1)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
} 