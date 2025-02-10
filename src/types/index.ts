/**
 * Uygulama genelinde kullanılan tip tanımlamaları
 * Bu dosya, TypeScript tip tanımlamalarını içerir ve
 * uygulamanın type-safety özelliğini sağlar.
 */

/**
 * Fon tipi
 * Bir yatırım fonunun temel özelliklerini tanımlar
 */
export interface Fund {
  id: string;          // Fonun benzersiz kimliği
  name: string;        // Fon adı
  type: string;        // Fon tipi (Hisse, Tahvil, Karma vb.)
  value: number;       // Fon değeri
  performance: number; // Performans yüzdesi
  risk: 'low' | 'medium' | 'high'; // Risk seviyesi
}

/**
 * Haber tipi
 * Uygulama içi haber ve duyuruların yapısını tanımlar
 */
export interface News {
  id: string;        // Haber kimliği
  title: string;     // Haber başlığı
  content: string;   // Haber içeriği
  date: string;      // Yayın tarihi
  isRead: boolean;   // Okunma durumu
  category: 'market' | 'fund' | 'economy' | 'company'; // Haber kategorisi
  importance: 'high' | 'medium' | 'low';              // Önem seviyesi
}

/**
 * Haber state tipi
 * Redux store'da haberlerin durumunu tanımlar
 */
export interface NewsState {
  items: News[];      // Haber listesi
  unreadCount: number; // Okunmamış haber sayısı
}

/**
 * Portföy state tipi
 * Redux store'da portföy durumunu tanımlar
 */
export interface PortfolioState {
  funds: Fund[];           // Portföydeki fonlar
  totalValue: number;      // Toplam portföy değeri
  loading: boolean;        // Yükleme durumu
  error: string | null;    // Hata mesajı
}

/**
 * Kimlik doğrulama state tipi
 * Redux store'da kullanıcı oturum durumunu tanımlar
 */
export interface AuthState {
  isAuthenticated: boolean;  // Oturum durumu
  user: {                    // Kullanıcı bilgileri
    id?: string;
    email?: string;
    name?: string;
  } | null;
  token: string | null;      // JWT token
}

/**
 * Root state tipi
 * Tüm Redux store'un yapısını tanımlar
 */
export interface RootState {
  auth: AuthState;           // Kimlik doğrulama state'i
  portfolio: PortfolioState; // Portföy state'i
  news: NewsState;           // Haber state'i
} 