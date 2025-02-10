import { createTheme, alpha } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Components {
    MuiBox?: {
      styleOverrides?: {
        root?: React.CSSProperties | any;
      };
    };
    MuiChart?: {
      styleOverrides?: {
        root?: React.CSSProperties | any;
      };
    };
  }
}

// Ana tema renkleri
const themeColors = {
  // Ana renkler
  primary: {
    lighter: '#4d8bff',
    light: '#0055ff',
    main: '#0044cc',
    dark: '#003399',
    darker: '#0c121e',
  },
  // Arka plan renkleri
  background: {
    light: 'rgba(243, 244, 246, 0.7)',
    main: 'rgba(59, 60, 63, 0.7)',
    dark: 'rgba(12, 18, 30, 0.85)',
    card: 'rgba(255, 255, 255, 0.1)',
  },
  // Gradient tanımları
  gradients: {
    primary: 'linear-gradient(135deg, #0055ff, #0044cc)',
    background: 'linear-gradient(-45deg, #e3f2fd, #bbdefb, #90caf9, #64b5f6)',
    card: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
  },
  // Saydamlık değerleri
  alpha: {
    light: 0.8,
    medium: 0.6,
    low: 0.4,
    veryLow: 0.1,
  },
  // Gölge efektleri
  shadows: {
    card: '0 8px 32px rgba(0, 85, 255, 0.2)',
    button: '0 4px 12px rgba(0, 85, 255, 0.3)',
    floating: '0 8px 32px rgba(0, 0, 0, 0.2)',
  },
};

const theme = createTheme({
  palette: {
    primary: {
      light: themeColors.primary.light,
      main: themeColors.primary.main,
      dark: themeColors.primary.dark,
    },
    secondary: {
      light: '#93c5fd',
      main: '#3b82f6',
      dark: '#2563eb',
    },
    success: {
      light: '#86efac',
      main: '#22c55e',
      dark: '#16a34a',
    },
    error: {
      light: '#fca5a5',
      main: '#ef4444',
      dark: '#dc2626',
    },
    warning: {
      light: '#fcd34d',
      main: '#f59e0b',
      dark: '#d97706',
    },
    background: {
      default: themeColors.background.main,
      paper: themeColors.background.light,
    },
    text: {
      primary: themeColors.background.dark,
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiBox: {
      styleOverrides: {
        root: {
          '@keyframes gradient': {
            '0%': {
              backgroundPosition: '0% 50%',
            },
            '50%': {
              backgroundPosition: '100% 50%',
            },
            '100%': {
              backgroundPosition: '0% 50%',
            },
          },
          '&.gradient-background': {
            background: themeColors.gradients.background,
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
          },
          '&.glass-card': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
          '&.floating-icon': {
            background: themeColors.gradients.primary,
            boxShadow: themeColors.shadows.floating,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(20px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(12, 18, 30, 0.7)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${alpha('#0055ff', 0.1)}`,
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(12, 18, 30, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRight: `1px solid ${alpha('#0055ff', 0.1)}`,
          '& .MuiListItemIcon-root': {
            color: alpha('#fff', 0.8),
          },
          '& .MuiListItemText-primary': {
            color: '#fff',
          },
          '& .MuiListItem-root:hover': {
            backgroundColor: alpha('#0055ff', 0.1),
            backdropFilter: 'blur(15px)',
          },
          '& .MuiToolbar-root': {
            background: 'rgba(0, 85, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderBottom: `1px solid ${alpha('#0055ff', 0.2)}`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: 'none',
          boxShadow: 'none',
          '& .MuiTypography-h4': {
            color: '#ffffff'
          },
          '& .MuiTypography-h6': {
            color: '#ffffff'
          },
          '& .MuiTypography-subtitle2': {
            color: 'rgba(255, 255, 255, 0.7)'
          },
          '& .MuiIconButton-root': {
            color: '#ffffff'
          },
          '&.highlighted': {
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '& .MuiTypography-body2': {
              color: 'rgba(255, 255, 255, 0.9)'
            }
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '1rem',
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.875rem',
          padding: '0.5rem 1.5rem',
          minWidth: '4rem',
          height: '2.5rem',
          gap: '0.5rem',
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(10px)',
        },
        contained: {
          background: `linear-gradient(135deg, ${alpha('#0055ff', 0.9)}, ${alpha('#0044cc', 0.9)})`,
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 12px rgba(0, 85, 255, 0.3)',
          '&:hover': {
            background: `linear-gradient(135deg, ${alpha('#0066ff', 0.95)}, ${alpha('#0055ff', 0.95)})`,
            boxShadow: '0 6px 16px rgba(0, 85, 255, 0.4)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(1px)',
          },
          '&.error': {
            background: `linear-gradient(135deg, ${alpha('#ef4444', 0.9)}, ${alpha('#dc2626', 0.9)})`,
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
            '&:hover': {
              background: `linear-gradient(135deg, ${alpha('#f87171', 0.95)}, ${alpha('#ef4444', 0.95)})`,
              boxShadow: '0 6px 16px rgba(239, 68, 68, 0.4)',
            }
          },
          '&.success': {
            background: `linear-gradient(135deg, ${alpha('#22c55e', 0.9)}, ${alpha('#16a34a', 0.9)})`,
            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
            '&:hover': {
              background: `linear-gradient(135deg, ${alpha('#34d399', 0.95)}, ${alpha('#22c55e', 0.95)})`,
              boxShadow: '0 6px 16px rgba(34, 197, 94, 0.4)',
            }
          },
          '&.warning': {
            background: `linear-gradient(135deg, ${alpha('#f59e0b', 0.9)}, ${alpha('#d97706', 0.9)})`,
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
            '&:hover': {
              background: `linear-gradient(135deg, ${alpha('#fbbf24', 0.95)}, ${alpha('#f59e0b', 0.95)})`,
              boxShadow: '0 6px 16px rgba(245, 158, 11, 0.4)',
            }
          }
        },
        outlined: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(1px)',
          },
          '&.error': {
            borderColor: alpha('#ef4444', 0.5),
            color: '#ef4444',
            '&:hover': {
              borderColor: '#ef4444',
              backgroundColor: alpha('#ef4444', 0.1),
            }
          },
          '&.success': {
            borderColor: alpha('#22c55e', 0.5),
            color: '#22c55e',
            '&:hover': {
              borderColor: '#22c55e',
              backgroundColor: alpha('#22c55e', 0.1),
            }
          },
          '&.warning': {
            borderColor: alpha('#f59e0b', 0.5),
            color: '#f59e0b',
            '&:hover': {
              borderColor: '#f59e0b',
              backgroundColor: alpha('#f59e0b', 0.1),
            }
          }
        },
        text: {
          color: '#ffffff',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(1px)',
          },
          '&.error': {
            color: '#ef4444',
            '&:hover': {
              backgroundColor: alpha('#ef4444', 0.1),
            }
          },
          '&.success': {
            color: '#22c55e',
            '&:hover': {
              backgroundColor: alpha('#22c55e', 0.1),
            }
          },
          '&.warning': {
            color: '#f59e0b',
            '&:hover': {
              backgroundColor: alpha('#f59e0b', 0.1),
            }
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.95)',
          '&.text-tiny': {
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.9)',
          },
        },
        subtitle2: {
          color: 'rgba(255, 255, 255, 0.95)',
          fontWeight: 500,
        },
        h1: {
          color: '#ffffff',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        },
        h2: {
          color: '#ffffff',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        },
        h3: {
          color: '#ffffff',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        },
        h4: {
          color: '#ffffff',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        },
        h5: {
          color: '#ffffff',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        },
        h6: {
          color: '#ffffff',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0055ff',
          color: '#ffffff',
          fontWeight: 600,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          border: '2px solid rgba(255,255,255,0.2)',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: alpha(themeColors.background.light, themeColors.alpha.veryLow),
            transform: 'translateX(4px)',
            '& .MuiListItemIcon-root': {
              color: themeColors.background.light,
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          '.MuiBackdrop-root': {
            backdropFilter: 'blur(8px)',
            backgroundColor: alpha(themeColors.background.dark, themeColors.alpha.low),
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiChart: {
      styleOverrides: {
        root: {
          '& .recharts-text': {
            fill: 'rgba(255, 255, 255, 0.95)',
            fontSize: '0.75rem',
          },
          '& .recharts-cartesian-grid-horizontal line, & .recharts-cartesian-grid-vertical line': {
            stroke: 'rgba(255, 255, 255, 0.1)',
          },
          '& .recharts-tooltip': {
            backgroundColor: 'rgba(20, 20, 20, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
          '& .recharts-default-tooltip': {
            backgroundColor: 'rgba(20, 20, 20, 0.9)',
            border: 'none',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(10px)',
          border: 'none',
          boxShadow: 'none',
          '& .MuiMenuItem-root': {
            color: '#ffffff',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }
        }
      }
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          '& .MuiTable-root': {
            backgroundColor: 'transparent'
          },
          '& .MuiTableCell-root': {
            color: 'rgba(255, 255, 255, 0.9)',
            borderColor: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          fontSize: '1.25rem',
          fontWeight: 600,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '16px 24px',
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '& .MuiTypography-subtitle1': {
            color: '#ffffff',
            fontWeight: 600,
            marginBottom: '8px'
          },
          '& .MuiTypography-body2': {
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: 1.6
          }
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          gap: '12px'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '&.glass-card': {
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.light',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            '& .MuiOutlinedInput-input': {
              color: '#ffffff',
            },
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.7)',
          '&.Mui-checked': {
            color: 'primary.light',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          '&.glass-card': {
            backgroundColor: 'rgba(25, 118, 210, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(25, 118, 210, 0.2)',
            '& .MuiAlert-icon': {
              color: 'primary.light',
            },
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          '& .MuiTypography-root': {
            color: 'rgba(255, 255, 255, 0.9)',
          },
          '& .MuiLink-root': {
            color: 'primary.light',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        },
      },
    },
  },
});

export default theme; 