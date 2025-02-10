/**
 * Fon Satın Alma Sayfası
 * 
 * Bu sayfa, kullanıcıların yatırım fonu satın alma sürecini yönetir.
 * Özellikler:
 * - Banka seçimi
 * - Fon detayları gösterimi
 * - Satın alma talimatları
 * - Banka entegrasyonu
 * - Animasyonlu UI elemanları
 * 
 * İşlem adımları:
 * 1. Fon bilgilerini görüntüleme
 * 2. Banka seçimi
 * 3. Satın alma talimatlarını görüntüleme
 * 4. Banka girişine yönlendirme
 * 
 * @component
 */

import { Box, Typography, Card, CardContent, Button, Grid, useTheme, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { AccountBalance, Info } from '@mui/icons-material';
import { useState } from 'react';

/**
 * Banka bilgilerini tanımlayan arayüz
 */
interface Bank {
  id: string;        // Banka kimliği
  name: string;      // Banka adı
  logo: string;      // Banka logosu URL'i
  loginUrl: string;  // Banka giriş sayfası URL'i
  instructions: string; // Satın alma talimatları
}

/**
 * Desteklenen bankalar listesi
 */
const banks: Bank[] = [
  { 
    id: 'ing', 
    name: 'ING Bank', 
    logo: '/bank-logos/ing.png',
    loginUrl: 'https://internetsubesi.ing.com.tr/banking/login',
    instructions: 'ING Bank internet şubesine giriş yaptıktan sonra, "Yatırım" menüsünden "Fon İşlemleri"ni seçin. Açılan sayfada "Fon Alış" butonuna tıklayarak HEH kodlu fonu aratıp satın alabilirsiniz.',
  },
  { 
    id: 'akbank', 
    name: 'Akbank', 
    logo: '/bank-logos/akbank.png',
    loginUrl: 'https://internetsubesi.akbank.com/WebApplication.UI/entrypoint.aspx',
    instructions: 'Akbank internet şubesine giriş yaptıktan sonra, sol menüden "Yatırım" sekmesine tıklayın. "Yatırım Fonları" altında "Fon Alış" işlemini seçerek HEH kodlu fonu aratıp satın alabilirsiniz.',
  },
  { 
    id: 'garanti', 
    name: 'Garanti BBVA Yatırım', 
    logo: '/bank-logos/garantiyatirim.png',
    loginUrl: 'https://www.garantibbvayatirim.com.tr/uyelik/uye-giris',
    instructions: 'Garanti BBVA Yatırım hesabınıza giriş yaptıktan sonra, "Yatırım İşlemleri" menüsünden "Fon İşlemleri"ni seçin. "Fon Alış" ekranında HEH kodlu fonu aratarak satın alma işleminizi gerçekleştirebilirsiniz.',
  },
];

/**
 * Seçili fon detayları
 */
const fundDetails = {
  code: 'HEH',
  name: 'TCA Ziraat Portföy Altın Katılım Fonu',
  description: 'Bu fon, altın ve altına dayalı sermaye piyasası araçlarına yatırım yaparak, altın fiyatlarındaki değişimleri yatırımcılara yansıtmayı hedefleyen bir katılım fonudur. Fon portföyünün en az %80\'i devamlı olarak altın ve altına dayalı sermaye piyasası araçlarından oluşmaktadır.',
};

/**
 * FundPurchase bileşeni
 * Fon satın alma sürecini yöneten ana bileşen
 * 
 * @returns {JSX.Element} FundPurchase bileşeni
 */
export default function FundPurchase() {
  const theme = useTheme();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const handleBankClick = (bank: Bank) => {
    setSelectedBank(bank);
    setShowDetails(true);
  };

  const handleProceed = () => {
    if (selectedBank) {
      window.open(selectedBank.loginUrl, '_blank');
      setShowDetails(false);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Fon Satın Al
        </Typography>
        <Card sx={{ mb: 3 }} className="highlighted">
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AccountBalance sx={{ fontSize: 40, color: theme.palette.primary.main }} />
              <Box>
                <Typography variant="h6" gutterBottom>
                  {fundDetails.name} ({fundDetails.code})
                </Typography>
                <Typography variant="body2">
                  {fundDetails.description}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Grid container spacing={3}>
        {banks.map((bank) => (
          <Grid item xs={12} key={bank.id}>
            <Card 
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                },
              }}
              onClick={() => handleBankClick(bank)}
            >
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  py: 1,
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    flex: 1,
                  }}>
                    <Box 
                      component="img"
                      src={bank.logo}
                      alt={bank.name}
                      sx={{ 
                        height: 40,
                        objectFit: 'contain',
                      }}
                    />
                    <Typography variant="h6">
                      {bank.name}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    endIcon={<Info />}
                    className="success"
                    sx={{
                      minWidth: 120,
                    }}
                  >
                    Satın Al
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog 
        open={showDetails} 
        onClose={() => setShowDetails(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedBank?.name} ile Fon Alım Talimatları
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1">
              Seçilen Fon Bilgileri
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>{fundDetails.name}</strong> ({fundDetails.code})
            </Typography>
            <Typography variant="body2">
              {fundDetails.description}
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle1">
              Nasıl Satın Alınır?
            </Typography>
            <Typography variant="body2">
              {selectedBank?.instructions}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="outlined"
            onClick={() => setShowDetails(false)}
          >
            Vazgeç
          </Button>
          <Button 
            variant="contained"
            onClick={handleProceed}
            startIcon={<AccountBalance />}
            className="success"
          >
            Banka Girişine Git
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 