import { Box, Paper, Typography, useTheme, Tooltip } from '@mui/material';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { alpha } from '@mui/material/styles';

interface MarketData {
  symbol: string;
  name: string;
  value: number;
  change: number;
}

const initialData: MarketData[] = [
  { symbol: 'USD/TL', name: 'Dolar', value: 25.97, change: 0.22 },
  { symbol: 'EUR/TL', name: 'Euro', value: 37.18, change: -0.56 },
  { symbol: 'GBP/TL', name: 'Sterlin', value: 44.69, change: -0.67 },
  { symbol: 'XAU/USD', name: 'Altın', value: 38.09, change: 0.34 },
  { symbol: 'BIST100', name: 'BIST 100', value: 9993.65, change: 1.11 },
  { symbol: 'BRENT', name: 'Brent Petrol', value: 74.66, change: 0.50 },
];

export default function MarketTicker() {
  const theme = useTheme();
  const [marketData, setMarketData] = useState<MarketData[]>(initialData);
  const [isPaused, setIsPaused] = useState(false);

  // Simüle edilmiş canlı veri güncellemesi
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prevData =>
        prevData.map(item => ({
          ...item,
          value: item.value + (Math.random() - 0.5) * 0.1,
          change: item.change + (Math.random() - 0.5) * 0.02,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: theme.zIndex.appBar - 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          width: '100%',
          height: '48px',
          overflow: 'hidden',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {[1, 2].map((wrapper) => (
          <Box
            key={wrapper}
            sx={{
              display: 'flex',
              gap: 4,
              py: 1,
              px: 2,
              position: 'absolute',
              whiteSpace: 'nowrap',
              animation: `scroll 50s linear infinite ${wrapper === 2 ? '-25s' : '0s'}`,
              animationPlayState: isPaused ? 'paused' : 'running',
              '@keyframes scroll': {
                '0%': {
                  transform: 'translateX(100%)',
                },
                '100%': {
                  transform: 'translateX(-100%)',
                },
              },
            }}
          >
            {marketData.map((item, index) => (
              <Tooltip
                key={`${item.symbol}-${index}-${wrapper}`}
                title={`${item.name} - Son Güncelleme: ${new Date().toLocaleTimeString()}`}
                arrow
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    padding: '4px 8px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}
                  >
                    {item.symbol}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600 }}
                  >
                    {item.value.toLocaleString('tr-TR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: item.change >= 0
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                      backgroundColor: item.change >= 0
                        ? alpha(theme.palette.success.main, 0.1)
                        : alpha(theme.palette.error.main, 0.1),
                      borderRadius: '4px',
                      padding: '2px 4px',
                    }}
                  >
                    {item.change >= 0 ? <ArrowDropUp /> : <ArrowDropDown />}
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      %{Math.abs(item.change).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Tooltip>
            ))}
          </Box>
        ))}
      </Box>
    </Paper>
  );
} 