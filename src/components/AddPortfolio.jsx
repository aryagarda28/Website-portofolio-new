import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

const AddPortfolio = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Konversi file gambar ke base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!title || !description) {
      setError("Judul dan deskripsi wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      let imageData = null;
      if (image) imageData = await fileToBase64(image);

      const res = await fetch("http://localhost:5000/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, image: imageData, link }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menambahkan portfolio");
      setSuccess("Portfolio berhasil ditambahkan!");
      setTitle("");
      setDescription("");
      setImage(null);
      setLink("");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
        <div className="bg-slate-800 border border-red-500/40 rounded-2xl p-10 flex flex-col items-center gap-4 max-w-sm w-full">
          <Lock className="w-14 h-14 text-red-400" />
          <h2 className="text-2xl font-bold text-white">Akses Ditolak</h2>
          <p className="text-slate-400 text-center">
            Halaman ini hanya dapat diakses oleh <span className="text-emerald-400 font-semibold">admin</span>.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full font-semibold transition-all"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 py-12 px-4">
      <div className="bg-slate-800 rounded-2xl shadow-lg p-8 w-full max-w-lg border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Tambah Portofolio</h2>
        {error && <div className="text-red-400 bg-red-500/10 border border-red-500/30 rounded px-3 py-2 mb-4">{error}</div>}
        {success && <div className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded px-3 py-2 mb-4">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Judul"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-slate-600 bg-slate-700 text-white p-2 rounded focus:outline-none focus:border-emerald-500"
            required
          />
          <textarea
            placeholder="Deskripsi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-slate-600 bg-slate-700 text-white p-2 rounded focus:outline-none focus:border-emerald-500"
            rows={4}
            required
          />
          <div>
            <label className="text-slate-400 text-sm mb-1 block">Gambar (opsional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full text-slate-300"
            />
          </div>
          <input
            type="text"
            placeholder="Link (opsional)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full border border-slate-600 bg-slate-700 text-white p-2 rounded focus:outline-none focus:border-emerald-500"
          />
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 border border-slate-500 text-slate-300 py-2 rounded-full hover:bg-slate-700 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white py-2 rounded-full font-semibold transition-all"
            >
              {loading ? "Menyimpan..." : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPortfolio;
