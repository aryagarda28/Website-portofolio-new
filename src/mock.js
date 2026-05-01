import kuphiScreenshot from './asset/kuphi-screenshot.png';
import kuphiMenuPrice from './asset/kuphi-menu-price.jpg';
import kuphiSweetBliss from './asset/kuphi-sweet-bliss.jpg';

export const portfolioData = {
  profile: {
    name: "Arya Garda Perwira",
    title: "UI/UX Designer",
    tagline: "Membuat tampilan web jadi lebih hidup, nyaman dipakai, dan sesuai kebutuhan pengguna",
    description: "Saya percaya bahwa desain yang baik itu gak cuma soal visual, tapi juga soal pengalaman dan fungsi. Gaya kerja saya fleksibel, kreatif, on-time, dan selalu terbuka untuk diskusi. Biasa dipanggil Arya atau Garda.",
    education: "Lulusan Informatika UPN \"Veteran\" Yogyakarta",
    profileImage: "https://customer-assets.emergentagent.com/job_4f313231-434d-4985-b248-2e626b8dd268/artifacts/339usdd4_WhatsApp%20Image%202024-11-23%20at%2012.19.39_44a1abd2.jpg"
  },
  
  services: [
    {
      id: 1,
      title: "Website E-Commerce",
      description: "Pembuatan toko online yang user-friendly dengan fitur lengkap untuk meningkatkan penjualan",
      icon: "ShoppingCart"
    },
    {
      id: 2,
      title: "Website Company Profile",
      description: "Desain website perusahaan yang professional untuk membangun kredibilitas dan trust",
      icon: "Building2"
    },
    {
      id: 3,
      title: "Website Portfolio", 
      description: "Showcase karya yang menarik untuk personal branding dan professional presence",
      icon: "Briefcase"
    },
    {
      id: 4,
      title: "Custom Web Design",
      description: "Berbagai macam website lainnya sesuai kebutuhan spesifik klien",
      icon: "Palette"
    }
  ],

  portfolio: [
    {
      id: 1,
      title: "Website Kampus 1 UPNYK",
      type: "Sistem Informasi Akademik",
      duration: "6 bulan",
      description: "Terlibat dalam tim pengembangan website Kampus 1 UPN \"Veteran\" Yogyakarta. Bertanggung jawab atas UI/UX design untuk sistem manajemen akademik yang terintegrasi.",
      technologies: ["UI/UX Design", "Web Development", "Academic System"],
      status: "Live - dapat dilihat di Semar.com",
      githubUrl: "https://github.com/aryagarda28",
      rating: 4,
      ratingCount: 15,
      image: "https://customer-assets.emergentagent.com/job_4f313231-434d-4985-b248-2e626b8dd268/artifacts/8esekblx_Screenshot%202025-08-12%20170812.png",
      images: [
        "https://customer-assets.emergentagent.com/job_4f313231-434d-4985-b248-2e626b8dd268/artifacts/8esekblx_Screenshot%202025-08-12%20170812.png",
        "https://customer-assets.emergentagent.com/job_4f313231-434d-4985-b248-2e626b8dd268/artifacts/5thufae5_Screenshot%202025-08-12%20170840.png"
      ]
    },
    {
      id: 2,
      title: "Web Manajemen Personel Pushidrosal TNI AL",
      type: "Sistem Manajemen Internal",
      duration: "3 bulan",
      description: "Menganalisis dan merancang sistem manajemen personel untuk Pushidrosal TNI AL yang juga dijadikan sebagai bahan skripsi. Fokus pada user experience untuk environment militer.",
      technologies: ["UI/UX Research", "System Analysis", "Internal Dashboard"],
      status: "Internal System (LAN Access Only)",
      githubUrl: "https://github.com/aryagarda28",
      rating: 4,
      ratingCount: 8,
      image: "https://customer-assets.emergentagent.com/job_4f313231-434d-4985-b248-2e626b8dd268/artifacts/vwbff1ga_Screenshot%202025-08-12%20170601.png",
      images: [
        "https://customer-assets.emergentagent.com/job_4f313231-434d-4985-b248-2e626b8dd268/artifacts/vwbff1ga_Screenshot%202025-08-12%20170601.png",
        "https://customer-assets.emergentagent.com/job_4f313231-434d-4985-b248-2e626b8dd268/artifacts/g4264uix_Screenshot%202025-08-12%20170635.png"
      ]
    },
    {
      id: 3,
      title: "Website E-Commerce Kopi Kuphi",
      type: "Website E-Commerce UMKM",
      duration: "2 minggu",
      description: "Saya baru-baru ini membuat projek web e-commerce. Kebetulan saudara saya mempunyai usaha kopi dan saya tawarkan untuk membuatkan website. Website ini masih sederhana, fiturnya belum tersedia stok otomatis, jadi jika ingin merubah harga, stok, dan pembelian masih dilakukan secara manual. Rencananya ke depan akan saya buat website dinamis agar pembeli dapat transaksi otomatis, tidak manual lagi. Website dapat diakses di https://www.kuphi.my.id/.",
      technologies: ["ReactJS", "TailwindCSS", "Manual Stock Management"],
      status: "Live - www.kuphi.my.id",
      githubUrl: "https://github.com/aryagarda28/kuphi-ecommerce", // ganti jika ada repo khusus
      rating: 5,
      ratingCount: 10,
      image: kuphiScreenshot,
      images: [
        kuphiScreenshot,
        kuphiMenuPrice,
        kuphiSweetBliss
      ]
    }
  ],

  testimonials: [
    {
      id: 1,
      name: "Tim Pengembangan UPNYK",
      role: "Project Manager",
      company: "UPN Veteran Yogyakarta",
      rating: 5,
      text: "Arya sangat profesional dalam menangani UI/UX design untuk sistem akademik kami. Hasil kerjanya selalu on-time dan sesuai ekspektasi."
    },
    {
      id: 2,
      name: "KADISPERS PUSHIDROSAL",
      role: "System Administrator", 
      company: "TNI Angkatan Laut",
      rating: 4,
      text: "Analisis sistem yang dilakukan sangat detail dan user-friendly. Approach yang digunakan sangat cocok untuk environment militer."
    },
    {
      id: 3,
      name: "Klien E-Commerce",
      role: "Business Owner",
      company: "Local UMKM",
      rating: 5,
      text: "Website e-commerce yang dibuat sangat membantu meningkatkan penjualan online. Design-nya modern dan mudah digunakan customer."
    }
  ],

  contact: {
    email: "aryagarda11@gmail.com",
    whatsapp: "081298358128",
    facebook: "https://web.facebook.com/profile/Aryagarda",
    github: "https://github.com/aryagarda28", 
    instagram: "https://instagram.com/gardaarya",
    cvUrl: "https://customer-assets.emergentagent.com/job_arya-digital-cv/artifacts/ec54u3fd_CV%20Aryagardaperwira.pdf"
  },

  collaboration: {
    title: "Terbuka untuk Kerja Sama",
    description: "Saat ini saya terbuka untuk kerja sama dengan:",
    targets: [
      "UMKM & bisnis yang butuh website profesional",
      "Startup yang ingin tampilan digital yang fresh", 
      "Instansi atau organisasi yang butuh tampilan modern & rapi"
    ]
  }
};