# BütçeDefterim

BütçeDefterim, kullanıcıların kişisel gelir ve giderlerini takip edebilmeleri, borç durumlarını görüntüleyebilmeleri ve finansal hesaplamalar gerçekleştirebilmeleri amacıyla geliştirilmiş bir web uygulamasıdır.

Proje, React ve JavaScript kullanılarak geliştirilmiştir.

## Projenin Özellikleri

- Yerel profil oluşturma, giriş yapma ve çıkış yapma
- E-posta adresine göre yerel profil yönetimi
- Gelir ve gider işlemleri ekleme ve silme
- İşlem geçmişini görüntüleme
- Toplam gelir, toplam gider ve kalan bakiyeyi hesaplama
- Borç, ödeme yüzdesi ve son ödeme tarihi takibi
- Profillere özel finansal kayıtlar
- Borç hesaplama
- Birikim hedefi hesaplama
- Harcama limiti hesaplama
- Faizsiz taksit hesaplama
- Yüzde ve indirim hesaplama
- LocalStorage ile verilerin tarayıcıda saklanması

## Kullanılan Teknolojiler

- React
- JavaScript (JSX)
- Vite
- HTML ve CSS
- LocalStorage
- Visual Studio Code

## Kurulum ve Çalıştırma

Projeyi bilgisayarınıza indirdikten sonra proje klasörünü Visual Studio Code ile açınız.

Terminalde gerekli paketleri yükleyiniz:

```bash
npm install
```

Ardından geliştirme sunucusunu başlatınız:

```bash
npm run dev
```

Terminalde gösterilen yerel adresi tarayıcıda açarak uygulamayı kullanabilirsiniz.

Windows PowerShell üzerinde npm komutları engelleniyorsa `npm.cmd install` ve `npm.cmd run dev` komutları kullanılabilir.

## Yapay Zekâ Kullanımı

Bu projenin geliştirilmesinde ChatGPT'den yardımcı araç olarak yararlanılmıştır.

Yapay zekâ desteği aşağıdaki aşamalarda kullanılmıştır:

- Proje fikrinin ve ekran yapısının planlanması
- React bileşenlerinin ve form yapılarının hazırlanması
- Gelir–gider ve finansal hesaplama mantığının geliştirilmesi
- LocalStorage ile veri saklama işlemlerinin hazırlanması
- CSS tasarımının geliştirilmesi
- Kod hatalarının incelenmesi ve düzeltilmesi
- Uygulama test senaryolarının hazırlanması

Kodlar Visual Studio Code ortamında uygulanmış, geliştirilen özellikler aşamalı olarak test edilmiş ve gerekli düzenlemeler gerçekleştirilmiştir.

Uygulamanın içerisinde doğrudan çalışan bir yapay zekâ modeli veya yapay zekâ API hizmeti bulunmamaktadır.

## Veri Saklama ve Profil Sistemi

BütçeDefterim, kullanıcı verilerini tarayıcının LocalStorage alanında saklamaktadır.

Aynı tarayıcıda oluşturulan yerel profillerin işlem geçmişleri ve borç bilgileri ayrı tutulmaktadır. Kullanıcı, çıkış yaptıktan sonra aynı yerel profile tekrar giriş yaparak kayıtlarına ulaşabilir.

Bu sistem gerçek kimlik doğrulama sağlamaz. E-posta sahipliği doğrulanmaz, veriler farklı cihazlar arasında eşitlenmez ve hassas finansal bilgilerin güvenli saklanması amacıyla tasarlanmamıştır.

## Ekran Görüntüleri


## Ekran Görüntüleri

BütçeDefterim web uygulamasının arayüzünü ve
özelliklerini gösteren 6 ekran görüntüsü,
`ekran_goruntuleri` klasöründe bulunmaktadır.


## Geliştirici

**Batuhan Bozkurt**

Bu web uygulaması, TNC Group Şirketleri bünyesindeki Software Persona Yapay Zekâ Stajyeri Mesleki Gelişim Programı kapsamında geliştirilmiştir.

**2026**