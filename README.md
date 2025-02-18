![image](https://github.com/user-attachments/assets/ee702678-12a4-4572-b6ff-51924e0ef9db)# InvestWise - Modern Yatırım Platformu

InvestWise, yatırımcılara fon yönetimi ve analizi konusunda yardımcı olan modern bir web platformudur.
![image](https://github.com/user-attachments/assets/c8295efe-f1af-4478-baba-ae0e96a049c7)

## 🚀 Özellikler

- 📊 Gerçek zamanlı piyasa verileri
- 💼 Portföy yönetimi ve analizi
- 📈 Fon performans takibi
- 🔔 Anlık piyasa haberleri
- 🏦 Çoklu banka entegrasyonu
- 📱 Responsive tasarım

## 🛠️ Teknolojiler

- React 18
- TypeScript
- Material-UI (MUI)
- Redux Toolkit
- Recharts
- Vite
- Axios

## 🏗️ Kurulum

1. Repoyu klonlayın:
```bash
git clone https://github.com/yourusername/investwise.git
cd investwise/frontend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcıda açın:
```
http://localhost:3000
```

## 🌐 API Yapılandırması

`.env` dosyasında API URL'sini yapılandırın:
```env
VITE_API_URL=http://localhost:5000/api
```

## 📦 Production Build

```bash
npm run build
```

Build dosyaları `dist` klasöründe oluşturulacaktır.

## 🚀 Deploy

Bu proje aşağıdaki platformlara deploy edilebilir:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## 📁 Proje Yapısı

```
src/
├── components/     # Yeniden kullanılabilir bileşenler
├── pages/         # Sayfa bileşenleri
├── services/      # API servisleri
├── store/         # Redux store ve slice'lar
├── types/         # TypeScript tipleri
└── theme.ts       # MUI tema yapılandırması
```

## 🔒 Güvenlik

- JWT tabanlı kimlik doğrulama
- Güvenli API istekleri
- Hassas verilerin şifrelenmesi

## 📄 Lisans

MIT
