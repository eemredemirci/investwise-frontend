import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  IconButton,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import {
  Close as CloseIcon,
  FiberNew as FiberNewIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types';
import { markAsRead, markAllAsRead } from '../../store/slices/newsSlice';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

interface NewsDialogProps {
  open: boolean;
  onClose: () => void;
}

const categoryColors = {
  market: '#3b82f6',
  fund: '#22c55e',
  economy: '#f59e0b',
  company: '#ef4444',
};

const importanceLabels = {
  high: 'Önemli',
  medium: 'Normal',
  low: 'Düşük',
};

export default function NewsDialog({ open, onClose }: NewsDialogProps) {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.news);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleNewsClick = (id: string) => {
    dispatch(markAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const categories = Array.from(new Set(items.map(item => item.category)));

  const filteredNews = selectedCategory
    ? items.filter(item => item.category === selectedCategory)
    : items;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(18, 24, 40, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#fff',
          '& .MuiDialogTitle-root': {
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          },
          '& .MuiDialogContent-root': {
            padding: 0,
          },
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>Haberler</Typography>
          <Box>
            <Button
              size="small"
              onClick={handleMarkAllAsRead}
              sx={{
                mr: 1,
                color: '#fff',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
              variant="outlined"
            >
              Tümünü Okundu İşaretle
            </Button>
            <IconButton onClick={onClose} size="small" sx={{ color: '#fff' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <Box sx={{ px: 3, pb: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Box sx={{ display: 'flex', gap: 1, mb: 2, mt: 2 }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category === 'market' ? 'Piyasa' :
                     category === 'fund' ? 'Fon' :
                     category === 'economy' ? 'Ekonomi' : 'Şirket'}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              sx={{
                backgroundColor: selectedCategory === category
                  ? categoryColors[category as keyof typeof categoryColors]
                  : 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                '&:hover': {
                  backgroundColor: selectedCategory === category
                    ? categoryColors[category as keyof typeof categoryColors]
                    : 'rgba(255, 255, 255, 0.2)',
                },
              }}
            />
          ))}
        </Box>
      </Box>

      <DialogContent sx={{ px: 2, py: 2, overflowX: 'hidden' }}>
        <List sx={{ width: '100%' }}>
          {filteredNews.map((news, index) => (
            <Box key={news.id} sx={{ width: '100%' }}>
              <ListItem
                onClick={() => handleNewsClick(news.id)}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: news.isRead ? 'transparent' : 'rgba(0, 85, 255, 0.1)',
                  borderRadius: 1,
                  mb: 1,
                  width: '100%',
                  '&:hover': {
                    backgroundColor: news.isRead
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 85, 255, 0.15)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                      {!news.isRead && (
                        <FiberNewIcon
                          sx={{
                            color: '#3b82f6',
                            animation: 'pulse 2s infinite',
                            flexShrink: 0,
                            '@keyframes pulse': {
                              '0%': {
                                transform: 'scale(1)',
                                opacity: 1,
                              },
                              '50%': {
                                transform: 'scale(1.1)',
                                opacity: 0.7,
                              },
                              '100%': {
                                transform: 'scale(1)',
                                opacity: 1,
                              },
                            },
                          }}
                        />
                      )}
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: news.isRead ? 400 : 600,
                          color: news.isRead ? 'rgba(255, 255, 255, 0.7)' : '#fff',
                          width: '100%',
                          pr: 2,
                        }}
                      >
                        {news.title}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1, width: '100%' }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          mb: 2,
                          width: '100%',
                          pr: 2,
                        }}
                      >
                        {news.content}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          label={importanceLabels[news.importance]}
                          size="small"
                          sx={{
                            backgroundColor: news.importance === 'high'
                              ? 'rgba(239, 68, 68, 0.2)'
                              : news.importance === 'medium'
                                ? 'rgba(245, 158, 11, 0.2)'
                                : 'rgba(34, 197, 94, 0.2)',
                            color: news.importance === 'high'
                              ? '#ef4444'
                              : news.importance === 'medium'
                                ? '#f59e0b'
                                : '#22c55e',
                            height: '24px',
                            flexShrink: 0,
                          }}
                        />
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: 'rgba(255, 255, 255, 0.5)',
                            flexShrink: 0,
                          }}
                        >
                          {formatDistanceToNow(new Date(news.date), { addSuffix: true, locale: tr })}
                        </Typography>
                        {news.isRead && (
                          <CheckCircleIcon sx={{ fontSize: 16, color: '#22c55e', flexShrink: 0 }} />
                        )}
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
              {index < filteredNews.length - 1 && (
                <Divider
                  sx={{
                    my: 1,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                />
              )}
            </Box>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
} 