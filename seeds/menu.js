const mongoose = require('mongoose');
const Menu = require('../models/menu');
//nconst hereMaps = require('../utils/hereMaps');

mongoose.connect('mongodb://127.0.0.1/rancaklaundry')
    .then((result) => {
        console.log('connected to mongodb')
    }).catch((err) => {
        console.log(err)
    });

async function seedMenus() {
    const menus = [
        {
            judul: 'Laundry Kiloan: Cuci Sterika',
            harga: '8000',
            waktu: '2-3hari',
            keterangan: 'Cuci Sterika',
            image: 'https://blokbojonegoro.com/upload/Image/image_36_img_20180523_210611.jpg',
        },
        {
            judul: 'Laundry Kiloan: Cuci Lipat',
            harga: '6000',
            waktu: '2-3hari',
            keterangan: 'Cuci Lipat',
            image: 'https://blokbojonegoro.com/upload/Image/image_36_img_20180523_210611.jpg',
        },
        {
            judul: 'Laundry Kiloan: Setrika',
            harga: '6000',
            waktu: '2-3hari',
            keterangan: 'Setrika',
            image: 'https://blokbojonegoro.com/upload/Image/image_36_img_20180523_210611.jpg',
        },
        {
            judul: 'Laundry Kiloan: Cuci Standar',
            harga: '20000',
            waktu: '2-3hari',
            keterangan: 'Cuci Standar',
            image: 'https://blokbojonegoro.com/upload/Image/image_36_img_20180523_210611.jpg',
        },
        {
            judul: 'Dry Clean Reguler: Jas Setelan',
            harga: '50000',
            waktu: '2-3hari',
            keterangan: 'Jas Setelan',
            image: 'https://vinscleanindonesia.com/wp-content/uploads/2023/07/laundry-kiloan.png'
        },
        {
            judul: 'Dry Clean Reguler: Jas',
            harga: '30000',
            waktu: '2-3hari',
            keterangan: 'Jas',
            image: 'https://vinscleanindonesia.com/wp-content/uploads/2023/07/laundry-kiloan.png'
        },
        {
            judul: 'Dry Clean Reguler: Celana Panjang',
            harga: '25000',
            waktu: '2-3hari',
            keterangan: 'Celana Panjang',
            image: 'https://vinscleanindonesia.com/wp-content/uploads/2023/07/laundry-kiloan.png'
        },
        {
            judul: 'Dry Clean Reguler: Blazer',
            harga: '30000',
            waktu: '2-3hari',
            keterangan: 'Blazer',
            image: 'https://vinscleanindonesia.com/wp-content/uploads/2023/07/laundry-kiloan.png'
        },
        {
            judul: 'Dry Clean Reguler: Kebaya',
            harga: '35000',
            waktu: '2-3hari',
            keterangan: 'Kebaya',
            image: 'https://vinscleanindonesia.com/wp-content/uploads/2023/07/laundry-kiloan.png'
        },
        {
            judul: 'Dry Clean Reguler: Blouse',
            harga: '10000',
            waktu: '2-3hari',
            keterangan: 'Blouse',
            image: 'https://vinscleanindonesia.com/wp-content/uploads/2023/07/laundry-kiloan.png'
        },
        {
            judul: 'Dry Clean Reguler: Dress Panjang',
            harga: '30000',
            waktu: '2-3hari',
            keterangan: 'Dress Panjang',
            image: 'https://vinscleanindonesia.com/wp-content/uploads/2023/07/laundry-kiloan.png'
        },

        {
            judul: 'Dry Clean Reguler: ress Pendek',
            harga: '20000',
            waktu: '2-3hari',
            keterangan: 'Dress Pendek',
            image: 'https://vinscleanindonesia.com/wp-content/uploads/2023/07/laundry-kiloan.png'
        },
        {
            judul: 'Dry Clean Reguler: Gamis',
            harga: '20000',
            waktu: '2-3hari',
            keterangan: 'Gamis',
            image: 'https://vinscleanindonesia.com/wp-content/uploads/2023/07/laundry-kiloan.png'
        },
        {
            judul: 'Dry Clean Reguler: Rok Panjang',
            harga: '20000',
            waktu: '2-3hari',
            keterangan: 'Rok Panjang',
            image: 'https://vinscleanindonesia.com/wp-content/uploads/2023/07/laundry-kiloan.png'
        },
        {
            judul: 'Dry Clean Reguler: Rok Pendek',
            harga: '10000',
            waktu: '2-3hari',
            keterangan: 'Rok Pendek',
            image: 'https://vinscleanindonesia.com/wp-content/uploads/2023/07/laundry-kiloan.png'
        },
        {
            judul: 'Dry Clean Express: Jas Setelan',
            harga: '75000',
            waktu: '24jam',
            keterangan: 'Jas Setelan',
            image: 'https://www.bahankain.com/storage/photos/shares/Artikel/Isi%20artikel/APRIL%202023/setrika%20uap.webp'
        },
        {
            judul: 'Dry Clean Express: Jas',
            harga: '40000',
            waktu: '24jam',
            keterangan: 'Jas',
            image: 'https://www.bahankain.com/storage/photos/shares/Artikel/Isi%20artikel/APRIL%202023/setrika%20uap.webp'
        },
        {
            judul: 'Dry Clean Express: Celana Panjang',
            harga: '35000',
            waktu: '24jam',
            keterangan: 'Celana Panjang',
            image: 'https://www.bahankain.com/storage/photos/shares/Artikel/Isi%20artikel/APRIL%202023/setrika%20uap.webp'
        },
        {
            judul: 'Dry Clean Express: Blaze',
            harga: '40000',
            waktu: '24jam',
            keterangan: 'Blazer',
            image: 'https://www.bahankain.com/storage/photos/shares/Artikel/Isi%20artikel/APRIL%202023/setrika%20uap.webp'
        },
        {
            judul: 'Dry Clean Express: Kebaya',
            harga: '45000',
            waktu: '24jam',
            keterangan: 'Kebaya',
            image: 'https://www.bahankain.com/storage/photos/shares/Artikel/Isi%20artikel/APRIL%202023/setrika%20uap.webp'
        },
        {
            judul: 'Dry Clean Express: Blouse',
            harga: '12000',
            waktu: '24jam',
            keterangan: 'Blouse',
            image: 'https://www.bahankain.com/storage/photos/shares/Artikel/Isi%20artikel/APRIL%202023/setrika%20uap.webp'
        },
        {
            judul: 'Dry Clean Express: Dress Panjang',
            harga: '40000',
            waktu: '24jam',
            keterangan: 'Dress Panjang',
            image: 'https://www.bahankain.com/storage/photos/shares/Artikel/Isi%20artikel/APRIL%202023/setrika%20uap.webp'
        },
        {
            judul: 'Dry Clean Express: Dress Pendek',
            harga: '30000',
            waktu: '24jam',
            keterangan: 'Dress Pendek',
            image: 'https://www.bahankain.com/storage/photos/shares/Artikel/Isi%20artikel/APRIL%202023/setrika%20uap.webp'
        },
        {
            judul: 'Dry Clean Express: Gamis',
            harga: '25000',
            waktu: '24jam',
            keterangan: 'Gamis',
            image: 'https://www.bahankain.com/storage/photos/shares/Artikel/Isi%20artikel/APRIL%202023/setrika%20uap.webp'
        },
        {
            judul: 'Dry Clean Express: Rok Panjang',
            harga: '25000',
            waktu: '24jam',
            keterangan: 'Rok Panjang',
            image: 'https://www.bahankain.com/storage/photos/shares/Artikel/Isi%20artikel/APRIL%202023/setrika%20uap.webp'
        },
        {
            judul: 'Dry Clean Express: Rok Pendek',
            harga: '25000',
            waktu: '24jam',
            keterangan: 'Rok Pendek',
            image: 'https://www.bahankain.com/storage/photos/shares/Artikel/Isi%20artikel/APRIL%202023/setrika%20uap.webp'
        }
        
    ]

    // const newPlace = await Promise.all(places.map(async (place) => {
    //     let geoData = await hereMaps.geometry(place.waktu);
    //     if (!geoData) {
    //         geoData = { type: 'Point', coordinates: [116.32883, -8.90952] }
    //     }
    //     return {
    //         ...place,
    //         author: '643d36579773b789e91ef660',
    //         images: {
    //             url: 'public\\images\\image-1681876521153-260851838.jpg',
    //             filename: 'image-1681876521153-260851838.jpg'
    //         },
    //         geometry: { ...geoData }
    //     }
    // }))

    try {
        await Menu.deleteMany({});
        await Menu.insertMany(menus);
        console.log('Data berhasil disimpan');
    } catch (err) {
        console.log('Terjadi kesalahan saat menyimpan data:', err);
    } finally {
        mongoose.disconnect();
    }
}

seedMenus();