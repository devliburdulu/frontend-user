import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import Image from 'next/image';

function kriteriaLevel(kriteria, target) {
  return { kriteria, target };
}

function extras(title, desc) {
  return { title, desc };
}

const explorer = {
  extra: [
    extras(
      'Cara mengunakan POIN:',
      `1. Selesaikan transaksi untuk mendapatkan Poin <br/>
2. Gunakan poinmu untuk membayar transaksi di halaman pembayaran atau checkout, atau tukarkan dengan Deals.<br/>
3. Saat membayar transaksi menggunakan poin, pastikan memiliki saldo diatas 4.000 poin.<br/>
4. Untuk menukarkan poin dengan Deals, bisa memilih Deals yang tersedia di halaman Promo.<br/>
5. Akan diminta melakukan verifikasi OTP saat menggunakan poin untuk membayar transaksi.`
    ),
    extras(
      'Syarat & Ketentuan POIN:',
      `1. Poin dapat digunakan di semua transaksi.<br/>
2. Jumlah Poin yang diperoleh dari tiap transaksi akan bervariasi.<br/>
3. Poin akan aktif dan diberikan 1 (satu) hari setelah pesanan atau perjalananmu selesai.<br/>
4. PT. Liburnesia Digital Nusantara memiliki hak secara penuh untuk mengubah benefit serta syarat dan ketentuan tanpa pemberitahuan lebih dulu.<br/>
5. Apabila terdapat indikasi kecurangan atau pelanggaran terhadap syarat dan ketentuan, Perusahaan memiliki hak secara penuh untuk melakukan pembatalan penukaran poin, seperti: pembatalan pesanan, pembatalan pemberian poin, voucher, dan/atau hadiah tanpa pemberitahuan lebih dulu.`
    ),
    extras(
      'Cara mengumpulan POIN:',
      `1. Registrasi pertama mendapatkan 4.000 poin.<br/>
2. Lengkapi data diri / detail akun dapat 2.000 poin.<br/>
3. Verifikasi Email dapat 1.000 poin.<br/>
4. Verifikasi No. HP dapat 1.000 poin.<br/>
5. Check-in harian dapat 50 Poin/hari (7 hari berturut-turut Check-in dapat 500 Poin di Hari ke-7).<br/>
6. Share refferal code untuk mengajak orang lain mendaftar akun dapat 2.000 Poin.<br/>
7. Tulis ulasan / review dapat 1.000 poin.<br/>
8. Cashback produk tertentu dapat 15.000 - 50.000 poin (seasonal event).<br/>
9. Cashback poin transaction weekday (Minggu-Kamis) 2,5% dari transaksi.<br/>
10. Cashback poin transaction weekend (Jumat-Sabtu), public Holiday dan Black Out Date 1,5% dari transaksi.<br/>
11. Masa berlaku poin untuk selamatnya atau tidak ada batasan kadaluarsa.`
    ),
    extras(
      'Cara menggunakan KUPON/VOUCHER:',
      `1. Buka email yang berisi informasi kupon atau masuk ke halaman profile user.<br/>
2. Baca syarat dan ketentuan kupon dengan teliti dan pastikan menggunakan sebelum hangus.<br/>
3. Gunakan kupon di halaman Checkout/pembayaran`
    ),
    extras(
      'Syarat & Ketentuan KUPON/VOUCHER:',
      `1. Kupon akan dikirim 3 hari sebelum programnya dimulai.<br/>
2. Nilai kupon/voucher dapat berbeda untuk setiap programnya.<br/>
3. Liburdulu.id memiliki hak secara penuh untuk mengubah syarat dan ketentuan tanpa pemberitahuan lebih dulu.<br/>
4. Liburdulu.id memiliki hak secara penuh untuk melarang keikutsertaan dan menindaklanjuti pengguna yang menunjukkan indikasi kecurangan, pelanggaran, atau penyalahgunaan.<br/>
5. Jika ada pertanyaan, silahkan hubungi Customer Care.`
    ),
    extras(
      'Syarat & Ketentuan ALL DAY CASHBACK POIN:',
      `1. Cari produk yang diinginkan<br/>
2. Untuk transaksi minimal IDR 50.000 (Berlaku kelipatan) mendapatkan Poin cashback mulai dari 1.000 Poin (2,5% dari nilai transaksi untuk weekdays dan 1,5% dari nilai transaksi untuk weekend)<br/>
3. Minimum transaksi adalah jumlah pembelian setelah diskon, tidak termasuk biaya admin dan lainnya.<br/>
4. User dapat menggabungkan beberapa produk dalam 1 transaksi untuk mencapai minimum transaksi.<br/>
5. Tidak berlaku untuk produk promo campaign lainnya yang sedang berjalan.<br/>
6. Sudah terverifikasi E-Mail & No. Hp<br/>
7. Liburdulu.id memiliki hak secara penuh untuk mengubah syarat dan ketentuan tanpa pemberitahuan lebih dulu.<br/>
8. Liburdulu.id memiliki hak secara penuh untuk melarang keikutasertaan dan menindaklanjuti pengguna yang menunjukkan indikasi kecurangan,p pelanggaran, atau penyalahgunaan.<br/>
9. Jika ada pertanyaan, silahkan hubungi Customer Care.`
    ),
  ],
};

const voyager = {
  extra: [
    extras(
      'Cara mengunakan POIN:',
      `1. Selesaikan transaksi untuk mendapatkan Poin <br/>
2. Gunakan poinmu untuk membayar transaksi di halaman pembayaran atau checkout, atau tukarkan dengan Deals.<br/>
3. Saat membayar transaksi menggunakan poin, pastikan memiliki saldo diatas 4.000 poin.<br/>
4. Untuk menukarkan poin dengan Deals, bisa memilih Deals yang tersedia di halaman Promo.<br/>
5. Akan diminta melakukan verifikasi OTP saat menggunakan poin untuk membayar transaksi.`
    ),
    extras(
      'Syarat & Ketentuan POIN:',
      `1. Poin dapat digunakan di semua transaksi.<br/>
2. Jumlah Poin yang diperoleh dari tiap transaksi akan bervariasi.<br/>
3. Poin akan aktif dan diberikan 1 (satu) hari setelah pesanan atau perjalananmu selesai.<br/>
4. PT. Liburnesia Digital Nusantara memiliki hak secara penuh untuk mengubah benefit serta syarat dan ketentuan tanpa pemberitahuan lebih dulu.<br/>
5. Apabila terdapat indikasi kecurangan atau pelanggaran terhadap syarat dan ketentuan, Perusahaan memiliki hak secara penuh untuk melakukan pembatalan penukaran poin, seperti: pembatalan pesanan, pembatalan pemberian poin, voucher, dan/atau hadiah tanpa pemberitahuan lebih dulu.`
    ),
    extras(
      'Cara mengumpulan POIN:',
      `1. Registrasi pertama mendapatkan 4.000 poin.<br/>
2. Lengkapi data diri / detail akun dapat 2.000 poin.<br/>
3. Verifikasi Email dapat 1.000 poin.<br/>
4. Verifikasi No. HP dapat 1.000 poin.<br/>
5. Check-in harian dapat 50 Poin/hari (7 hari berturut-turut Check-in dapat 500 Poin di Hari ke-7).<br/>
6. Share refferal code untuk mengajak orang lain mendaftar akun dapat 2.000 Poin.<br/>
7. Tulis ulasan / review dapat 1.000 poin.<br/>
8. Cashback produk tertentu dapat 15.000 - 50.000 poin (seasonal event).<br/>
9. Cashback poin transaction weekday (Minggu-Kamis) 2,5% dari transaksi.<br/>
10. Cashback poin transaction weekend (Jumat-Sabtu), public Holiday dan Black Out Date 1,5% dari transaksi.<br/>
11. Masa berlaku poin untuk selamatnya atau tidak ada batasan kadaluarsa.`
    ),
    extras(
      'Cara menggunakan KUPON/VOUCHER:',
      `1. Buka email yang berisi informasi kupon atau masuk ke halaman profile user.<br/>
2. Baca syarat dan ketentuan kupon dengan teliti dan pastikan menggunakan sebelum hangus.<br/>
3. Gunakan kupon di halaman Checkout/pembayaran`
    ),
    extras(
      'Syarat & Ketentuan KUPON/VOUCHER:',
      `1. Kupon akan dikirim 3 hari sebelum programnya dimulai.<br/>
2. Nilai kupon/voucher dapat berbeda untuk setiap programnya.<br/>
3. Liburdulu.id memiliki hak secara penuh untuk mengubah syarat dan ketentuan tanpa pemberitahuan lebih dulu.<br/>
4. Liburdulu.id memiliki hak secara penuh untuk melarang keikutsertaan dan menindaklanjuti pengguna yang menunjukkan indikasi kecurangan, pelanggaran, atau penyalahgunaan.<br/>
5. Jika ada pertanyaan, silahkan hubungi Customer Care.`
    ),
    extras(
      'Syarat & Ketentuan ALL DAY CASHBACK POIN:',
      `1. Cari produk yang diinginkan<br/>
2. Untuk transaksi minimal IDR 50.000 (Berlaku kelipatan) mendapatkan Poin cashback mulai dari 1.000 Poin (2,5% dari nilai transaksi untuk weekdays dan 1,5% dari nilai transaksi untuk weekend)<br/>
3. Minimum transaksi adalah jumlah pembelian setelah diskon, tidak termasuk biaya admin dan lainnya.<br/>
4. User dapat menggabungkan beberapa produk dalam 1 transaksi untuk mencapai minimum transaksi.<br/>
5. Tidak berlaku untuk produk promo campaign lainnya yang sedang berjalan.<br/>
6. Sudah terverifikasi E-Mail & No. Hp<br/>
7. Liburdulu.id memiliki hak secara penuh untuk mengubah syarat dan ketentuan tanpa pemberitahuan lebih dulu.<br/>
8. Liburdulu.id memiliki hak secara penuh untuk melarang keikutasertaan dan menindaklanjuti pengguna yang menunjukkan indikasi kecurangan,p pelanggaran, atau penyalahgunaan.<br/>
9. Jika ada pertanyaan, silahkan hubungi Customer Care.`
    ),
    extras(
      'Cara menggunakan Claim EXTRA DISKON (%) Hotel & Marketplace Berlabel Exclusive Partner:',
      `1. Masukkan kode kupon / voucher yang di berikan melalui E-mail atau yang tersedia pada halaman profile saat melakukan transaksi item di Exclusive partner.`
    ),
    extras(
      'Syarat & Ketentuan Claim EXTRA DISKON (%) Hotel & Marketplace Berlabel Exclusive Partner:',
      `1. Diskon hanya berlaku untuk produk-produk di Exclusive partner<br/>
2. User telah melengkapi data diri / detail akun profile.<br/>
3. Terverifikasi E-Mail & No. Hp<br/>
4. Liburdulu.id memiliki hak secara penuh untuk mengubah syarat dan ketentuan tanpa pemberitahuan lebih dulu.<br/>
5. Liburdulu.id memiliki hak secara penuh untuk melarang keikutsertaan dan menindaklanjuti pengguna yang menunjukkan indikasi kecurangan, pelanggaran, atau penyalahgunaan.<br/>
6. Jika ada pertanyaan, silahkan hubungi Customer Care.`
    ),
    extras(
      'Syarat & Ketentuan Poin Birthday Surprise:',
      `1. Lengkapi data diri / detail akun profile dan sudah terverifikasi.<br/>
100.000 Poin akan di berikan otomatis di tanggal ulang tahun user.<br/>
Melakukan transaksi minimal sebesar Rp 500.000,- (tidak berlaku kelipatan) untuk mendapatkan Extra cashback berupa poin sebesar 50K yang akan di berikan di awal bulan berikutnya.<br/>
Sudah terverifikasi E-Mail & No. Hp melalui link verifikasi dan kode OTP.<br/>
Liburdulu.id memiliki hak secara penuh untuk mengubah syarat dan ketentuan tanpa pemberitahuan lebih dulu.<br/>
Liburdulu.id memiliki hak secara penuh untuk melarang keikutsertaan dan menindaklanjuti pengguna yang menunjukkan indikasi kecurangan, pelanggaran, atau penyalahgunaan.<br/>
Jika ada pertanyaan, silahkan hubungi Customer Care.`
    ),
  ],
};

const jetsetter = {
  extra: [
    extras(
      'Cara mengunakan POIN:',
      `1. Selesaikan transaksi untuk mendapatkan Poin <br/>
2. Gunakan poinmu untuk membayar transaksi di halaman pembayaran atau checkout, atau tukarkan dengan Deals.<br/>
3. Saat membayar transaksi menggunakan poin, pastikan memiliki saldo diatas 4.000 poin.<br/>
4. Untuk menukarkan poin dengan Deals, bisa memilih Deals yang tersedia di halaman Promo.<br/>
5. Akan diminta melakukan verifikasi OTP saat menggunakan poin untuk membayar transaksi.`
    ),
    extras(
      'Syarat & Ketentuan POIN:',
      `1. Poin dapat digunakan di semua transaksi.<br/>
2. Jumlah Poin yang diperoleh dari tiap transaksi akan bervariasi.<br/>
3. Poin akan aktif dan diberikan 1 (satu) hari setelah pesanan atau perjalananmu selesai.<br/>
4. PT. Liburnesia Digital Nusantara memiliki hak secara penuh untuk mengubah benefit serta syarat dan ketentuan tanpa pemberitahuan lebih dulu.<br/>
5. Apabila terdapat indikasi kecurangan atau pelanggaran terhadap syarat dan ketentuan, Perusahaan memiliki hak secara penuh untuk melakukan pembatalan penukaran poin, seperti: pembatalan pesanan, pembatalan pemberian poin, voucher, dan/atau hadiah tanpa pemberitahuan lebih dulu.`
    ),
    extras(
      'Cara mengumpulan POIN:',
      `1. Registrasi pertama mendapatkan 4.000 poin.<br/>
2. Lengkapi data diri / detail akun dapat 2.000 poin.<br/>
3. Verifikasi Email dapat 1.000 poin.<br/>
4. Verifikasi No. HP dapat 1.000 poin.<br/>
5. Check-in harian dapat 50 Poin/hari (7 hari berturut-turut Check-in dapat 500 Poin di Hari ke-7).<br/>
6. Share refferal code untuk mengajak orang lain mendaftar akun dapat 2.000 Poin.<br/>
7. Tulis ulasan / review dapat 1.000 poin.<br/>
8. Cashback produk tertentu dapat 15.000 - 50.000 poin (seasonal event).<br/>
9. Cashback poin transaction weekday (Minggu-Kamis) 2,5% dari transaksi.<br/>
10. Cashback poin transaction weekend (Jumat-Sabtu), public Holiday dan Black Out Date 1,5% dari transaksi.<br/>
11. Masa berlaku poin untuk selamatnya atau tidak ada batasan kadaluarsa.`
    ),
    extras(
      'Cara menggunakan KUPON/VOUCHER:',
      `1. Buka email yang berisi informasi kupon atau masuk ke halaman profile user.<br/>
2. Baca syarat dan ketentuan kupon dengan teliti dan pastikan menggunakan sebelum hangus.<br/>
3. Gunakan kupon di halaman Checkout/pembayaran`
    ),
    extras(
      'Syarat & Ketentuan KUPON/VOUCHER:',
      `1. Kupon akan dikirim 3 hari sebelum programnya dimulai.<br/>
2. Nilai kupon/voucher dapat berbeda untuk setiap programnya.<br/>
3. Liburdulu.id memiliki hak secara penuh untuk mengubah syarat dan ketentuan tanpa pemberitahuan lebih dulu.<br/>
4. Liburdulu.id memiliki hak secara penuh untuk melarang keikutsertaan dan menindaklanjuti pengguna yang menunjukkan indikasi kecurangan, pelanggaran, atau penyalahgunaan.<br/>
5. Jika ada pertanyaan, silahkan hubungi Customer Care.`
    ),
    extras(
      'Syarat & Ketentuan ALL DAY CASHBACK POIN:',
      `1. Cari produk yang diinginkan<br/>
2. Untuk transaksi minimal IDR 50.000 (Berlaku kelipatan) mendapatkan Poin cashback mulai dari 1.000 Poin (2,5% dari nilai transaksi untuk weekdays dan 1,5% dari nilai transaksi untuk weekend)<br/>
3. Minimum transaksi adalah jumlah pembelian setelah diskon, tidak termasuk biaya admin dan lainnya.<br/>
4. User dapat menggabungkan beberapa produk dalam 1 transaksi untuk mencapai minimum transaksi.<br/>
5. Tidak berlaku untuk produk promo campaign lainnya yang sedang berjalan.<br/>
6. Sudah terverifikasi E-Mail & No. Hp<br/>
7. Liburdulu.id memiliki hak secara penuh untuk mengubah syarat dan ketentuan tanpa pemberitahuan lebih dulu.<br/>
8. Liburdulu.id memiliki hak secara penuh untuk melarang keikutasertaan dan menindaklanjuti pengguna yang menunjukkan indikasi kecurangan,p pelanggaran, atau penyalahgunaan.<br/>
9. Jika ada pertanyaan, silahkan hubungi Customer Care.`
    ),
    extras(
      'Syarat & Ketentuan I Love Monday Extra 30K Poin:',
      `1. Melakukan transaksi minimal Rp 500.000,- (tidak berlaku kelipatan) di setiap hari senin, langsung mendapatkan tambahan poin extra 30K poin.<br/>
2. Poin otomatis di berikan saat selesai melakukan perjalanan atau setelah check out dari penginapan<br/>
3. Sudah terverifikasi E-Mail & No. Hp<br/>
4. Liburdulu.id memiliki hak secara penuh untuk mengubah syarat dan ketentuan tanpa pemberitahuan lebih dulu.<br/>
5. Liburdulu.id memiliki hak secara penuh untuk melarang keikutsertaan dan menindaklanjuti pengguna yang menunjukkan indikasi kecurangan, pelanggaran, atau penyalahgunaan.<br/>
6. Jika ada pertanyaan, silahkan hubungi Customer Care.`
    ),
  ],
};

export default function MyRewardListKeuntunganTabKeuntungan() {
  const [level, setLevel] = useState('explorer');
  const { user } = useAuthContext();

  // Leveling or Tiering User with group_id
  const getLevelName = (groupId) => {
    if (groupId === 1) {
      return 'Explorer';
    } else if (groupId === 2) {
      return 'Voyager';
    } else if (groupId === 3) {
      return 'Jetsetter';
    } else {
      return 'Explorer';
    }
  };

  //   const level = getLevelName(user?.group_id);

  const handleClick = (tab) => {
    setLevel(tab);
  };

  return (
    <div className='flex flex-col gap-3 mt-3'>
      <div className='flex flex-row gap-2'>
        <Button onClick={() => handleClick('explorer')}>
          {level == 'explorer' ? (
            <Image
              src='/RankUserExplorer-color.png'
              height={180}
              width={200}
              quality={100}
              priority={true}
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <Image
              src='/RankUserExplorer.png'
              height={180}
              width={200}
              quality={100}
              priority={true}
              style={{ objectFit: 'contain' }}
            />
          )}
        </Button>
        <Button onClick={() => handleClick('voyager')}>
          {level == 'voyager' ? (
            <Image
              src='/RankUserVoyager-color.png'
              height={180}
              width={200}
              quality={100}
              priority={true}
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <Image
              src='/RankUserVoyager.png'
              height={180}
              width={200}
              quality={100}
              priority={true}
              style={{ objectFit: 'contain' }}
            />
          )}
        </Button>
        <Button onClick={() => handleClick('jetsetter')}>
          {level == 'jetsetter' ? (
            <Image
              src='/RankUserJetsetter-color.png'
              height={180}
              width={200}
              quality={100}
              priority={true}
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <Image
              src='/RankUserJetsetter.png'
              height={180}
              width={200}
              quality={100}
              priority={true}
              style={{ objectFit: 'contain' }}
            />
          )}
        </Button>
      </div>
      <div className='mt-3 mb-5'>
        <p className='text-[25px] leading-8 font-semibold'>
          Overview Benefit & Term Condition
        </p>
      </div>
      <div className='flex flex-col gap-3'>
        {level == 'explorer' &&
          explorer.extra.map((row) => (
            <div className='flex flex-col my-1' key={row.title}>
              <Typography
                component='div'
                fontSize={20}
                sx={{ lineHeight: '24px', mb: '8px' }}
                dangerouslySetInnerHTML={{ __html: row.title }}
                className='text-liburdulu-blue text-xl font-semibold'
              />
              <Typography
                component='div'
                fontSize={14}
                sx={{ lineHeight: '20px' }}
                dangerouslySetInnerHTML={{ __html: row.desc }}
                className='text-[13px] font-normal'
              />
              {/* <span className="text-liburdulu-blue text-xl font-semibold">{row.title}</span>
                        <span className="text-[13px] font-normal">{row.desc}</span> */}
            </div>
          ))}
        {level == 'voyager' &&
          voyager.extra.map((row) => (
            <div className='flex flex-col my-1' key={row.title}>
              <Typography
                component='div'
                fontSize={20}
                sx={{ lineHeight: '24px', mb: '8px' }}
                dangerouslySetInnerHTML={{ __html: row.title }}
                className='text-liburdulu-blue text-xl font-semibold'></Typography>
              <Typography
                component='div'
                fontSize={14}
                sx={{ lineHeight: '20px' }}
                dangerouslySetInnerHTML={{ __html: row.desc }}
                className='text-[13px] font-normal'></Typography>
            </div>
          ))}
        {level == 'jetsetter' &&
          jetsetter.extra.map((row) => (
            <div className='flex flex-col my-1' key={row.title}>
              <Typography
                component='div'
                fontSize={20}
                sx={{ lineHeight: '24px', mb: '8px' }}
                dangerouslySetInnerHTML={{ __html: row.title }}
                className='text-liburdulu-blue text-xl font-semibold'></Typography>
              <Typography
                component='div'
                fontSize={14}
                sx={{ lineHeight: '20px' }}
                dangerouslySetInnerHTML={{ __html: row.desc }}
                className='text-[13px] font-normal'></Typography>
            </div>
          ))}
      </div>
    </div>
  );
}
