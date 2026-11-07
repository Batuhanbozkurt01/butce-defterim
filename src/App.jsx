import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [menuAcik, setMenuAcik] = useState(false)
  const [sayfa, setSayfa] = useState('anasayfa')
  
  const [toplamBorc, setToplamBorc] = useState(() => {
    const email = localStorage.getItem('aktifEmail')
    return email
      ? localStorage.getItem('toplamBorc_' + email) || ''
      : ''
  })

  const [odenenBorc, setOdenenBorc] = useState(() => {
    const email = localStorage.getItem('aktifEmail')
    return email
      ? localStorage.getItem('odenenBorc_' + email) || ''
      : ''
  })

  const [sonOdeme, setSonOdeme] = useState(() => {
    const email = localStorage.getItem('aktifEmail')
    return email
      ? localStorage.getItem('sonOdeme_' + email) || ''
      : ''
  })

  const [islemTuru, setIslemTuru] = useState('gider')
  const [aciklama, setAciklama] = useState('')
  const [tutar, setTutar] = useState('')

  
  const [islemler, setIslemler] = useState(() => {
    const kayitliEmail = localStorage.getItem('aktifEmail')

    const kayitliIslemler = kayitliEmail
      ? localStorage.getItem('islemler_' + kayitliEmail)
      : null

    return kayitliIslemler ? JSON.parse(kayitliIslemler) : []
  })

  const [profilMenuAcik, setProfilMenuAcik] = useState(false)
  const [profilSekmesi, setProfilSekmesi] = useState('')
  const [hedefTutar, setHedefTutar] = useState('')
  const [mevcutBirikim, setMevcutBirikim] = useState('')
  const [aylikBirikim, setAylikBirikim] = useState('')
  const [hesapBorc, setHesapBorc] = useState('')
  const [hesapOdeme, setHesapOdeme] = useState('')
  const [hesapFaiz, setHesapFaiz] = useState('')
  const [harcamaLimiti, setHarcamaLimiti] = useState('')
  const [harcananTutar, setHarcananTutar] = useState('')
  const [taksitTutari, setTaksitTutari] = useState('')
  const [taksitSayisi, setTaksitSayisi] = useState('')
  const [urunFiyati, setUrunFiyati] = useState('')
  const [indirimOrani, setIndirimOrani] = useState('')
  
  const [kayitAdi, setKayitAdi] = useState('')
  const [kayitEmail, setKayitEmail] = useState('')
  const [kayitMesaji, setKayitMesaji] = useState('')

  const [girisEmail, setGirisEmail] = useState('')
  const [girisMesaji, setGirisMesaji] = useState('')

  const [aktifEmail, setAktifEmail] = useState(
    localStorage.getItem('aktifEmail') || ''
  )

  const [profiller, setProfiller] = useState(() => {
    const kayitliProfiller = localStorage.getItem('profiller')
    return kayitliProfiller ? JSON.parse(kayitliProfiller) : []
  })

  useEffect(() => {
    localStorage.setItem('profiller', JSON.stringify(profiller))
  }, [profiller])

  const hesapGecerli =
    hesapBorc !== '' &&
    hesapOdeme !== '' &&
    hesapFaiz !== '' &&
    Number(hesapBorc) > 0 &&
    Number(hesapOdeme) >= 0 &&
    Number(hesapOdeme) <= Number(hesapBorc) &&
    Number(hesapFaiz) >= 0

  const odemeSonrasiBorc =
    Number(hesapBorc) - Number(hesapOdeme)

  const gelecekAyBorc =
    odemeSonrasiBorc * (1 + Number(hesapFaiz) / 100)

  const birikimGecerli =
    hedefTutar !== '' &&
    mevcutBirikim !== '' &&
    aylikBirikim !== '' &&
    Number(hedefTutar) > 0 &&
    Number(mevcutBirikim) >= 0 &&
    Number(aylikBirikim) > 0

  const kalanHedef = Number(hedefTutar) - Number(mevcutBirikim)

  const gerekenAy =
    kalanHedef <= 0 ? 0 : Math.ceil(kalanHedef / Number(aylikBirikim))

  const limitGecerli =
    harcamaLimiti !== '' &&
    harcananTutar !== '' &&
    Number(harcamaLimiti) > 0 &&
    Number(harcananTutar) >= 0

  const kalanLimit =
    Number(harcamaLimiti) - Number(harcananTutar)

    function islemEkle() {
      if (aciklama.trim() === '' || tutar === '' || Number(tutar) <= 0) {
        alert('Lütfen geçerli bilgiler giriniz.')
        return
      }

      const yeniIslem = {
        id: Date.now(),
        tur: islemTuru,
        aciklama: aciklama,
        tutar: Number(tutar)
      }
      const yeniListe = [...islemler, yeniIslem]
      setIslemler(yeniListe)
      localStorage.setItem(
        'islemler_' + aktifEmail,
        JSON.stringify(yeniListe)
      )
      setAciklama('')
      setTutar('')
    }

  const taksitGecerli =
    taksitTutari !== '' &&
    taksitSayisi !== '' &&
    Number(taksitTutari) > 0 &&
    Number(taksitSayisi) > 0 &&
    Number(taksitSayisi) % 1 === 0

  const aylikTaksit =
    Number(taksitTutari) / Number(taksitSayisi)


  const indirimGecerli =
    urunFiyati !== '' &&
    indirimOrani !== '' &&
    Number(urunFiyati) > 0 &&
    Number(indirimOrani) >= 0 &&
    Number(indirimOrani) <= 100

  const indirimTutari =
    Number(urunFiyati) * Number(indirimOrani) / 100

  const indirimliFiyat =
    Number(urunFiyati) - indirimTutari


  function profilKaydet(e) {
    e.preventDefault()

    const ad = kayitAdi.trim()
    const email = kayitEmail.trim().toLowerCase()

    if (ad === '' || email === '') {
      setKayitMesaji('Lütfen tüm alanları doldurunuz.')
      return
    }

    const ayniKayit = profiller.filter(
      (profil) => profil.email === email
    )

    if (ayniKayit.length > 0) {
      setKayitMesaji('Bu e-posta adresi zaten kayıtlı!')
      return
    }

    const yeniProfil = {
      ad: ad,
      email: email
    }

    setProfiller([...profiller, yeniProfil])
    setKayitAdi('')
    setKayitEmail('')
    setKayitMesaji('Profil başarıyla oluşturuldu!')
  }

  useEffect(() => {
    localStorage.setItem('aktifEmail', aktifEmail)
  }, [aktifEmail])

  const aktifProfil = profiller.filter(
    (profil) => profil.email === aktifEmail
  )[0]

  
  function islemSil(id) {
    const yeniListe = islemler.filter(
      (islem) => islem.id !== id
    )

    setIslemler(yeniListe)

    localStorage.setItem(
      'islemler_' + aktifEmail,
      JSON.stringify(yeniListe)
    )
  }


  
  let toplamGelir = 0
  let toplamGider = 0

  for (let i = 0; i < islemler.length; i++) {
    if (islemler[i].tur === 'gelir') {
      toplamGelir += islemler[i].tutar
    } else if (islemler[i].tur === 'gider') {
      toplamGider += islemler[i].tutar
    }
  }

  const kalanBakiye = toplamGelir - toplamGider

  useEffect(() => {
    if (aktifEmail === '') {
      return
    }

    localStorage.setItem(
      'toplamBorc_' + aktifEmail,
      toplamBorc
    )

    localStorage.setItem(
      'odenenBorc_' + aktifEmail,
      odenenBorc
    )

    localStorage.setItem(
      'sonOdeme_' + aktifEmail,
      sonOdeme
    )
  }, [toplamBorc, odenenBorc, sonOdeme, aktifEmail])

  const borcGecerli =
    toplamBorc !== '' &&
    odenenBorc !== '' &&
    Number(toplamBorc) > 0 &&
    Number(odenenBorc) >= 0 &&
    Number(odenenBorc) <= Number(toplamBorc)

  const kalanBorc = Number(toplamBorc) - Number(odenenBorc)

  const odenenYuzde =
    (Number(odenenBorc) / Number(toplamBorc)) * 100


  function sayfaDegistir(yeniSayfa) {
    setSayfa(yeniSayfa)
    setMenuAcik(false)
  }



  function profilGiris(e) {
    e.preventDefault()

    const email = girisEmail.trim().toLowerCase()

    const bulunanProfil = profiller.filter(
      (profil) => profil.email === email
    )

    if (bulunanProfil.length === 0) {
      setGirisMesaji('Bu e-posta adresiyle kayıt bulunamadı!')
      return
    }

    setAktifEmail(email)
    
    setToplamBorc(
      localStorage.getItem('toplamBorc_' + email) || ''
    )

    setOdenenBorc(
      localStorage.getItem('odenenBorc_' + email) || ''
    )

    setSonOdeme(
      localStorage.getItem('sonOdeme_' + email) || ''
    )

    const kayitliIslemler = localStorage.getItem(
      'islemler_' + email
    )

    setIslemler(
      kayitliIslemler ? JSON.parse(kayitliIslemler) : []
    )
    setGirisEmail('')
    setGirisMesaji('Giriş başarılı!')
  }

  
  function profilCikis() {
    setAktifEmail('')
    setIslemler([])
    
    setToplamBorc('')
    setOdenenBorc('')
    setSonOdeme('')

    setProfilSekmesi('')
    setProfilMenuAcik(false)
    setGirisMesaji('')
  }

  return (
    <>
      <main>
        <header>
          <aside className="sol-serit">
            <button
              type="button"
              onClick={() => setMenuAcik(!menuAcik)}
            >
              ☰
            </button>
          </aside>

          <strong>BütçeDefterim</strong>
          <div className="profil-kapsayici">
            
            <span className="profil-selamlama">
              Merhaba, {aktifProfil ? aktifProfil.ad : 'Misafir'}
            </span>

            <button
              type="button"
              className="profil-simge"
              onClick={() => setProfilMenuAcik(!profilMenuAcik)}
            >
              👤
            </button>

            
  {profilMenuAcik && (
    <div className="profil-acilir-menu">
      {aktifProfil ? (
        <>
          <h3>Profilim</h3>

          <p>{aktifProfil.ad}</p>
          <p>{aktifProfil.email}</p>
          <button type="button" onClick={profilCikis}>
            Çıkış Yap
          </button>
        </>
      ) : (
        <>
            <h3>Hesap İşlemleri</h3>

            <button
              type="button"
              onClick={() => setProfilSekmesi('kayit')}
            >
              Kayıt Ol
            </button>

            <button
              type="button"
              onClick={() => setProfilSekmesi('giris')}
            >
              Giriş Yap
            </button>

            {profilSekmesi === 'kayit' && (
              <form onSubmit={profilKaydet}>
                <h3>Yeni Profil Oluştur</h3>

                <label>Adınız</label>
                <input
                  type="text"
                  required
                  placeholder="Adınızı giriniz"
                  value={kayitAdi}
                  onChange={(e) => setKayitAdi(e.target.value)}
                />

                <label>E-posta Adresiniz</label>
                <input
                  type="email"
                  required
                  placeholder="ornek@eposta.com"
                  value={kayitEmail}
                  onChange={(e) => setKayitEmail(e.target.value)}
                />

                <button type="submit">
                  Profil Oluştur
                </button>

                <p>{kayitMesaji}</p>
              </form>
            )}

                  {profilSekmesi === 'giris' && (
                    <form onSubmit={profilGiris}>
                      <h3>Giriş Yap</h3>

                      <label htmlFor="girisEmail">
                        E-posta Adresiniz
                      </label>

                      <input
                        id="girisEmail"
                        type="email"
                        required
                        placeholder="ornek@eposta.com"
                        value={girisEmail}
                        onChange={(e) => setGirisEmail(e.target.value)}
                      />

                      <button type="submit">
                        Giriş Yap
                      </button>

                      <p>{girisMesaji}</p>
                    </form>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </header>

        <nav className={menuAcik ? 'acilir-menu acik' : 'acilir-menu'}>
          <button onClick={() => sayfaDegistir('anasayfa')}>
            Ana Sayfa
          </button>

          <button onClick={() => sayfaDegistir('islemler')}>
            İşlem Geçmişi
          </button>

          <button onClick={() => sayfaDegistir('hesaplama')}>
            Hesaplama Araçları
          </button>
        </nav>

        {!aktifProfil && (
          <section>
            <h1>BütçeDefterim'e Hoş Geldiniz!</h1>
            <p>
              Finansal bilgilerinizi görüntülemek için
              sağ üstteki profil simgesinden giriş yapınız.
            </p>
          </section>
        )}

        {aktifProfil && sayfa === 'anasayfa' && (

          <section>
            <h1>Finansal Durumum</h1>
            <p>Gelir, gider ve borçlarınızı buradan takip edebilirsiniz.</p>

            <div className="borc-kartlari">

              <div className="borc-daire">
                <strong>
                  {borcGecerli ? `%${odenenYuzde.toFixed(1)}` : '—'}
                </strong>
                <span>Ödenen Borç (%)</span>
              </div>

              <div className="borc-daire">
                <strong>{sonOdeme || '—'}</strong>
                <span>Son Ödeme Tarihi</span>
              </div>

              <div className="borc-daire">
                <strong>
                  {borcGecerli ? `${kalanBorc.toLocaleString('tr-TR')} TL` : '—'}
                </strong>
                <span>Kalan Borç (₺)</span>
              </div>

            </div>


            <div className="borc-formu">
              <h2>Borç Bilgilerim</h2>

              <label>Toplam Borç (₺)</label>
              <input
                type="number"
                min="0"
                value={toplamBorc}
                onChange={(e) => setToplamBorc(e.target.value)}
              />

              <label>Ödenen Borç (₺)</label>
              <input
                type="number"
                min="0"
                value={odenenBorc}
                onChange={(e) => setOdenenBorc(e.target.value)}
              />

              <label>Son Ödeme Tarihi</label>
              <input
                type="date"
                value={sonOdeme}
                onChange={(e) => setSonOdeme(e.target.value)}
              />
            </div>
            
            


            

            <div className="butce-ozeti">
              <h2>Bütçe Özeti</h2>

              <div className="butce-kartlari">
                <div className="butce-kart">
                  <h3>Toplam Gelir</h3>
                  <strong>{toplamGelir.toLocaleString('tr-TR')} TL</strong>
                </div>

                <div className="butce-kart">
                  <h3>Toplam Gider</h3>
                  <strong>{toplamGider.toLocaleString('tr-TR')} TL</strong>
                </div>

                <div className="butce-kart">
                  <h3>Kalan Bakiye</h3>
                  <strong>{kalanBakiye.toLocaleString('tr-TR')} TL</strong>
                </div>
              </div>
            </div>

            <div className="islem-formu">
              <h2>Yeni İşlem Ekle</h2>

              <label>İşlem Türü</label>
              <select
                value={islemTuru}
                onChange={(e) => setIslemTuru(e.target.value)}
              >
                <option value="gelir">Gelir</option>
                <option value="gider">Gider</option>
              </select>

              <label>Açıklama</label>
              <input
                type="text"
                placeholder="Örneğin: Market alışverişi"
                value={aciklama}
                onChange={(e) => setAciklama(e.target.value)}
              />

              <label>Tutar (₺)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Örneğin: 500"
                value={tutar}
                onChange={(e) => setTutar(e.target.value)}
              />

              <button type="button" onClick={islemEkle}>
                İşlemi Kaydet
              </button>

            </div>

          </section>
        )}

        {aktifProfil && sayfa === 'islemler' && (
          <section>
            <h1>İşlem Geçmişi</h1>

            {islemler.length === 0 ? (
              <p>Henüz bir işlem eklenmedi.</p>
            ) : (
              <div className="islem-listesi">
                {islemler.map((islem) => (
                  <div
                    key={islem.id}
                    className={islem.tur === 'gelir' ? 'islem-karti gelir' : 'islem-karti gider'}
                  >
                    <h3>{islem.aciklama}</h3>
                    <p>İşlem Türü: {islem.tur}</p>
                    <strong>{islem.tutar} ₺</strong>
                    <button
                      type="button"
                      onClick={() => islemSil(islem.id)}
                    >
                      Sil
                    </button>

                  </div>
                ))}
              </div>
            )}
          </section>
        )}


        
        {aktifProfil && sayfa === 'hesaplama' && (
          <section>
            <h1>Hesaplama Araçları</h1>

            <div className="borc-formu">
              <h2>Borç Hesaplama</h2>

              <label>Mevcut Borç (₺)</label>
              <input
                type="number"
                min="0"
                value={hesapBorc}
                onChange={(e) => setHesapBorc(e.target.value)}
              />

              <label>Yapılacak Ödeme (₺)</label>
              <input
                type="number"
                min="0"
                value={hesapOdeme}
                onChange={(e) => setHesapOdeme(e.target.value)}
              />

              <label>Aylık Faiz Oranı (%)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={hesapFaiz}
                onChange={(e) => setHesapFaiz(e.target.value)}
              />

              {hesapGecerli ? (
                <div>
                  <h3>Hesaplama Sonucu</h3>
                  <p>
                    Ödeme Sonrası Borç:
                    {' '}{odemeSonrasiBorc.toLocaleString('tr-TR')} TL
                  </p>
                  <strong>
                    Gelecek Ay Tahmini Borç:
                    {' '}{gelecekAyBorc.toLocaleString('tr-TR')} TL
                  </strong>
                </div>
              ) : (
                <p>Hesaplama için geçerli bilgiler giriniz.</p>
              )}
            </div>
          
      <div className="borc-formu">
              <h2>Birikim Hedefi Hesaplama</h2>

              <label>Hedeflenen Tutar (₺)</label>
              <input
                type="number"
                min="0"
                value={hedefTutar}
                onChange={(e) => setHedefTutar(e.target.value)}
              />

              <label>Mevcut Birikim (₺)</label>
              <input
                type="number"
                min="0"
                value={mevcutBirikim}
                onChange={(e) => setMevcutBirikim(e.target.value)}
              />

              <label>Aylık Birikim (TL)</label>
              <input
                type="number"
                min="0"
                value={aylikBirikim}
                onChange={(e) => setAylikBirikim(e.target.value)}
              />

              {birikimGecerli ? (
                <div>
                  <h3>Hesaplama Sonucu</h3>
                  <p>Hedefe ulaşmak için gereken süre:</p>
                  <strong>{gerekenAy} ay</strong>
                </div>
              ) : (
                <p>Lütfen geçerli bilgiler giriniz.</p>
              )}
        </div>
        <div className="borc-formu">
              <h2>Harcama Limiti Hesaplama</h2>

              <label>Harcama Limiti (₺)</label>
              <input
                type="number"
                min="0"
                value={harcamaLimiti}
                onChange={(e) => setHarcamaLimiti(e.target.value)}
              />

              <label>Harcanan Tutar (₺)</label>
              <input
                type="number"
                min="0"
                value={harcananTutar}
                onChange={(e) => setHarcananTutar(e.target.value)}
              />

              {limitGecerli ? (
                <div>
                  <h3>Hesaplama Sonucu</h3>

                  {kalanLimit >= 0 ? (
                    <p>
                      Kalan Bütçe:
                      {' '}{kalanLimit.toLocaleString('tr-TR')} TL
                    </p>
                  ) : (
                    <p>
                      Limit Aşıldı!
                      {' '}{(-kalanLimit).toLocaleString('tr-TR')} TL
                    </p>
                  )}
                </div>
              ) : (
                <p>Lütfen geçerli bilgiler giriniz.</p>
              )}
        </div>
        <div className="borc-formu">
          <h2>Faizsiz Taksit Hesaplama</h2>

          <label>Toplam Tutar (₺)</label>
          <input
            type="number"
            min="0"
            value={taksitTutari}
            onChange={(e) => setTaksitTutari(e.target.value)}
          />

          <label>Taksit Sayısı</label>
          <input
            type="number"
            min="1"
            step="1"
            value={taksitSayisi}
            onChange={(e) => setTaksitSayisi(e.target.value)}
          />

          {taksitGecerli ? (
            <div>
              <h3>Hesaplama Sonucu</h3>

              <p>Aylık Ödenecek Tutar:</p>

              <strong>
                {aylikTaksit.toLocaleString('tr-TR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })} ₺
              </strong>
            </div>
          ) : (
            <p>Lütfen geçerli bilgiler giriniz.</p>
          )}
        </div>

        <div className="borc-formu">
          <h2>Yüzde ve İndirim Hesaplama</h2>

          <label>Ürünün Normal Fiyatı (₺)</label>
          <input
            type="number"
            min="0"
            value={urunFiyati}
            onChange={(e) => setUrunFiyati(e.target.value)}
          />

          <label>İndirim Oranı (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={indirimOrani}
            onChange={(e) => setIndirimOrani(e.target.value)}
          />

          {indirimGecerli ? (
            <div>
                <h3>Hesaplama Sonucu</h3>

                <p>
                  İndirim Tutarı:
                  {' '}{indirimTutari.toLocaleString('tr-TR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })} TL
                </p>

                <strong>
                  İndirimli Fiyat:
                  {' '}{indirimliFiyat.toLocaleString('tr-TR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })} ₺
                </strong>
              </div>
            ) : (
              <p>Lütfen geçerli bilgiler giriniz.</p>
            )}
          </div>
        </section>
        )}
        

      </main>
      <footer className="site-footer">
          <h3>BütçeDefterim</h3>

          <p>
            Bu web uygulaması, TNC Group Şirketleri
            bünyesindeki Software Persona Yapay Zekâ
            Stajyeri Mesleki Gelişim Programı kapsamında
            Batuhan Bozkurt tarafından geliştirilmiştir.
          </p>

          <p>2026</p>
        </footer>
      </>
    )
}

export default App
