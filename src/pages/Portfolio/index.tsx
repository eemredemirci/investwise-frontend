import { Box, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Fund } from '../../types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface ChartData {
  name: string;
  value: number;
}

export default function Portfolio() {
  const { funds, loading } = useSelector((state: RootState) => state.portfolio);

  const chartData: ChartData[] = funds.map((fund: Fund) => ({
    name: fund.name,
    value: fund.value
  }));

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Portfolio
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Portfolio Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry: ChartData, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `₺${value.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Portfolio Summary
            </Typography>
            <Box>
              {funds.map((fund: Fund, index: number) => (
                <Box
                  key={fund.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    p: 1,
                    borderRadius: 1,
                    bgcolor: `${COLORS[index % COLORS.length]}22`
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1">{fund.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {fund.type}
                    </Typography>
                  </Box>
                  <Typography variant="h6">
                    ₺{fund.value.toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 