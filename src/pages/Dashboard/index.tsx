import { Box, Typography, Grid, Card, CardContent, IconButton, useTheme, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import {
  TrendingUp,
  AccountBalance,
  ShowChart,
  Assessment,
  PieChart as PieChartIcon,
  Timeline,
  Compare,
  AttachMoney,
  TrendingFlat,
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { useNavigate } from 'react-router-dom';

const dummyChartData = [
  { name: 'Oca', value: 100 },
  { name: 'Şub', value: 120 },
  { name: 'Mar', value: 115 },
  { name: 'Nis', value: 130 },
  { name: 'May', value: 125 },
  { name: 'Haz', value: 140 },
];

const dummyBarData = [
  { name: 'Borçlanma', value: 20 },
  { name: 'Fon Sepeti', value: 20 },
  { name: 'Hisse', value: 20 },
  { name: 'Karma', value: 20 },
  { name: 'Katılım', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function Dashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { totalValue } = useSelector((state: RootState) => state.portfolio);

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">
          Hoş Geldiniz
        </Typography>
        <Button
          variant="contained"
          startIcon={<AttachMoney />}
          onClick={() => navigate('/fund-purchase')}
          className="success"
          sx={{
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': {
                transform: 'scale(1)',
                boxShadow: '0 0 0 0 rgba(0, 102, 204, 0.4)',
              },
              '70%': {
                transform: 'scale(1.05)',
                boxShadow: '0 0 0 10px rgba(0, 102, 204, 0)',
              },
              '100%': {
                transform: 'scale(1)',
                boxShadow: '0 0 0 0 rgba(0, 102, 204, 0)',
              },
            },
            '&:hover': {
              animation: 'none',
              transform: 'scale(1.05)',
            },
          }}
        >
          Fon Al
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {/* Portföy Değeri Kartı */}
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Toplam Portföy Değeri
                  </Typography>
                  <Typography variant="h4" sx={{ my: 1 }}>
                    ₺{totalValue.toLocaleString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: theme.palette.success.main,
                    }}
                  >
                    <TrendingUp fontSize="small" />
                    +2.5% bu ay
                  </Typography>
                </Box>
                <IconButton>
                  <AccountBalance />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Günlük Değişim */}
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Günlük Değişim
                  </Typography>
                  <Typography variant="h4" sx={{ my: 1 }}>
                    %0.85
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: theme.palette.success.main,
                    }}
                  >
                    <TrendingUp fontSize="small" />
                    +₺1.523,65
                  </Typography>
                </Box>
                <IconButton>
                  <Timeline />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Toplam Kar/Zarar */}
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Toplam Kar/Zarar
                  </Typography>
                  <Typography variant="h4" sx={{ my: 1 }}>
                    ₺36.995,70
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: theme.palette.success.main,
                    }}
                  >
                    <TrendingUp fontSize="small" />
                    %27 Getiri
                  </Typography>
                </Box>
                <IconButton>
                  <Compare />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Risk Seviyesi */}
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Risk Seviyesi
                  </Typography>
                  <Typography variant="h4" sx={{ my: 1 }}>
                    3/6
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: theme.palette.warning.main,
                    }}
                  >
                    <TrendingFlat fontSize="small" />
                    Orta Risk
                  </Typography>
                </Box>
                <IconButton>
                  <Assessment />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Portföy Dağılımı Grafiği */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Portföy Dağılımı</Typography>
                <IconButton>
                  <PieChartIcon />
                </IconButton>
              </Box>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dummyBarData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      label
                    >
                      {dummyBarData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Kategori Bazlı Getiri */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Kategori Bazlı Getiri</Typography>
                <IconButton>
                  <ShowChart />
                </IconButton>
              </Box>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dummyBarData}>
                    <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.9)" tick={{ fill: 'rgba(255, 255, 255, 0.9)' }} />
                    <YAxis stroke="rgba(255, 255, 255, 0.9)" tick={{ fill: 'rgba(255, 255, 255, 0.9)' }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Portföy Performansı */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Portföy Performansı</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 20 }}
                  >
                    Günlük
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      borderRadius: 20,
                    }}
                  >
                    Haftalık
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 20 }}
                  >
                    Aylık
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 20 }}
                  >
                    Yıllık
                  </Button>
                </Box>
              </Box>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dummyChartData}>
                    <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.9)" tick={{ fill: 'rgba(255, 255, 255, 0.9)' }} />
                    <YAxis stroke="rgba(255, 255, 255, 0.9)" tick={{ fill: 'rgba(255, 255, 255, 0.9)' }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#0088FE"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#0088FE" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 