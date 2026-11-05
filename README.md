# Modern Portföy — Ayrı finans demo denemesi

Bu klasör, beğenilen JavaScript portföyünün ayrı bir kopyasıdır. Ana `sitedeneme-js` klasörü ve `modern-portfoy-js.html` değiştirilmemiştir. Deneme beğenilmezse ana sürümden devam edilebilir.

## Açma

`modern-portfoy-finans-demo.html` tek dosyadır ve internetten kütüphane yüklemez. İlk ekrandaki “Canlı finans demosu” bağlantısı demo alanına götürür. Kaynak sürümü için index.html, style.css, script.js, ring3d.js ve finance-demo.js aynı klasörde tutulur. İsteğe bağlı yerel sunucu: `python3 -m http.server 8000`.

## Demo kapsamı

Python/Flet finans projesinden esinlenmiş bağımsız bir tarayıcı gösterimidir. Gerçek uygulamaya, SQLite'a, banka hesabına veya herhangi bir uzak servise bağlı değildir.

- Örnek başlangıç: 12.500 TRY gelir, 3.090 TRY gider ve 9.410 TRY bakiye.
- Gelir/gider ekleme, silme, kategori dağılımı, canlı grafik ve örnek veriye dönme.
- Tutarlar tam sayı kuruş olarak hesaplanır. Ondalık ayırıcı virgül veya nokta olabilir; binlik ayırıcı kabul edilmez.
- Pozitif ve en fazla 1.000.000 TRY tutar; en fazla iki ondalık basamak, 2–60 karakter açıklama ve 50 işlem sınırı.
- Kullanıcı metinleri HTML olarak yorumlanmaz.
- İşlemler yalnızca bellekte tutulur. Kaydedilmez, gönderilmez; yenilemede örnekler geri gelir.
- Dil değişince örnek etiketler, grafik, para biçimi, hatalar ve bildirimler değişir; kullanıcının yazdığı açıklama korunur.
- Denemenin görünüm tercihleri ayrı localStorage anahtarı kullanır; ana sitenin tercihlerini değiştirmez.

## Doğrulama

Chromium'da kullanıcı arayüzü üzerinden doğrulandı:

1. Örnek toplamlar, gelir/gider, virgül/nokta, tam kuruş hesabı, silme, reset, negatif bakiye, sıfır işlem ve gelir-only grafik.
2. Sıfır/negatif/hatalı veya çok büyük tutar, boş açıklama, gerçek maksimum değer, 50 işlem sınırı ve metnin HTML olarak işlenmemesi.
3. Türkçe/İngilizce, para biçimi, kullanıcı metninin korunması, açık tema, 320–1920px yatay taşma kontrolü, yenilemede örnek veriler ve ayrı tercih kaydı.
4. Mobil menü kapanışı, proje filtreleri ve modalı, klavye odağı/Escape, gerçek pano kopyalama, okuma ilerlemesi ve başa dön, gerçek WebGL halka klavye/sıfırlama ve yazdırma.

Ana sürüm dosyaları kurulum öncesi/sonrası SHA-256 karşılaştırmasıyla korunmuştur. Site yayınlanmamıştır. Antivirüs taramasından geçtiği iddia edilmez.

## Önizleme uyumluluğu

Form gönderme izni bulunmayan sandbox çerçeveleri için İşlemi ekle artık type=button ile yerel tıklama olarak işlenir. Metin alanında Enter de doğrudan aynı doğrulanmış işlemi çağırır. Ekle/Sil/Sıfırla, bölüm düzeyindeki olay dinleyicisiyle çalışır. Form gönderimine ve çerçevenin allow-forms iznine ihtiyaç duymaz.

Sadece allow-scripts izni olan opak srcdoc iframe içinde TR/EN ekleme, silme, örneklere dönüş, Enter ve toplamlar test edildi. Form engelleme mesajı veya JavaScript hatası oluşmadı. Ardından normal tarayıcıdaki temel, doğrulama, dil ve diğer site etkileşim testleri tekrar geçti.
