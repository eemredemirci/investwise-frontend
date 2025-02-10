import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { AccountBalance, LockOpen, Info, CheckCircleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (acceptedTerms && acceptedPrivacy) {
      navigate('/');
    }
  };

  return (
    <Box
      className="gradient-background"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Card
        className="highlighted"
        sx={{
          maxWidth: 800,
          width: '100%',
          borderRadius: 3,
          position: 'relative',
          overflow: 'visible',
        }}
      >
        <Box
          className="floating-icon"
          sx={{
            position: 'absolute',
            top: -40,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 80,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
          }}
        >
          <AccountBalance sx={{ fontSize: 40, color: 'white' }} />
        </Box>

        <CardContent sx={{ pt: 6 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ mt: 2 }}>
            InvestWise'a Hoş Geldiniz
          </Typography>
          
          <Alert 
            severity="info" 
            icon={<Info />}
            className="glass-card"
            sx={{ mb: 3, mt: 2 }}
          >
            Banka bilgilerinizi paylaşmanıza gerek yok.
          </Alert>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom align="center">
              Ücretsiz Deneme Avantajları
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              {[
                'Gerçek zamanlı fon takibi ve analizi',
                'Kişiselleştirilmiş portföy önerileri',
                'Detaylı fon karşılaştırma araçları',
                'Risk analizi ve getiri tahminleri',
                'Banka bağlantısı olmadan kullanım',
              ].map((feature, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleOutline sx={{ color: 'success.main' }} />
                  <Typography variant="body1">{feature}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="E-posta"
              type="email"
              required
              className="glass-card"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Şifre"
              type="password"
              required
              className="glass-card"
              sx={{ mb: 3 }}
            />

            <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    required
                  />
                }
                label={
                  <Typography variant="body2">
                    <Link 
                      component="button"
                      onClick={(e) => { e.preventDefault(); setShowTerms(true); }}
                    >
                      Kullanım Koşullarını
                    </Link>
                    {' '}okudum ve kabul ediyorum
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={acceptedPrivacy}
                    onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                    required
                  />
                }
                label={
                  <Typography variant="body2">
                    <Link 
                      component="button"
                      onClick={(e) => { e.preventDefault(); setShowPrivacy(true); }}
                    >
                      Gizlilik Politikasını
                    </Link>
                    {' '}okudum ve kabul ediyorum
                  </Typography>
                }
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              startIcon={<LockOpen />}
              disabled={!acceptedTerms || !acceptedPrivacy}
              className="success"
              sx={{ py: 1.5, fontSize: '1.1rem' }}
            >
              Giriş Yap
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={showTerms}
        onClose={() => setShowTerms(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Kullanım Koşulları</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph>
            InvestWise platformunu kullanarak aşağıdaki koşulları kabul etmiş olursunuz:
          </Typography>
          <Typography variant="body2" paragraph>
            1. Platform sadece bilgilendirme amaçlıdır ve yatırım tavsiyesi niteliği taşımaz.
          </Typography>
          <Typography variant="body2" paragraph>
            2. Sunulan veriler ve analizler güvenilir kaynaklardan derlenmiştir, ancak doğruluğu garanti edilemez.
          </Typography>
          <Typography variant="body2" paragraph>
            3. Yatırım kararları kullanıcının kendi sorumluluğundadır.
          </Typography>
          <Typography variant="body2" paragraph>
            4. Platform üzerinden yapılan analizler ve değerlendirmeler genel niteliklidir.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTerms(false)} variant="outlined">Kapat</Button>
          <Button onClick={() => { setAcceptedTerms(true); setShowTerms(false); }} variant="contained">
            Kabul Ediyorum
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Gizlilik Politikası</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph>
            Kişisel verilerinizin güvenliği bizim için önemlidir:
          </Typography>
          <Typography variant="body2" paragraph>
            1. E-posta adresiniz sadece giriş ve bilgilendirme amaçlı kullanılacaktır.
          </Typography>
          <Typography variant="body2" paragraph>
            2. Banka bilgileriniz veya finansal verileriniz talep edilmez ve saklanmaz.
          </Typography>
          <Typography variant="body2" paragraph>
            3. Kullanım verileri anonim olarak, hizmet kalitesini artırmak için kullanılır.
          </Typography>
          <Typography variant="body2" paragraph>
            4. Verileriniz üçüncü taraflarla paylaşılmaz.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPrivacy(false)} variant="outlined">Kapat</Button>
          <Button onClick={() => { setAcceptedPrivacy(true); setShowPrivacy(false); }} variant="contained">
            Kabul Ediyorum
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 