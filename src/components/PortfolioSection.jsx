import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Calendar, Eye, Lock, Github, MessageCircle, Trash2, Send, ChevronDown, ChevronUp } from 'lucide-react';

// ─── Sub-komponen: kartu project dengan komentar inline ───────────────────────
function ProjectCard({ project, onOpenModal, isAdmin, isLoggedIn }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState('');
  const [fetched, setFetched] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/portfolio/${project.id}/comments`);
      const data = await res.json();
      setComments(Array.isArray(data) ? data : []);
    } catch {
      setComments([]);
    }
  }, [project.id]);

  const toggleComments = () => {
    if (!fetched) {
      fetchComments();
      setFetched(true);
    }
    setShowComments((prev) => !prev);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentLoading(true);
    setCommentError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/portfolio/${project.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content: commentText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal mengirim komentar');
      setCommentText('');
      fetchComments();
    } catch (err) {
      setCommentError(err.message);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Hapus komentar ini?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComments();
    } catch {
      alert('Gagal menghapus komentar.');
    }
  };

  return (
    <div className="group bg-slate-800/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-emerald-500/70 transition-all duration-500 flex flex-col shadow-lg">
      {/* Gambar */}
      <div className="relative h-56 sm:h-64 overflow-hidden cursor-pointer" onClick={() => onOpenModal(project)}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4">
          {project.status && project.status.includes('Live') ? (
            <div className="flex items-center gap-2 bg-emerald-500/90 text-white px-3 py-1 rounded-full text-xs font-medium shadow">
              <Eye className="w-4 h-4" /> Live
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-amber-500/90 text-white px-3 py-1 rounded-full text-xs font-medium shadow">
              <Lock className="w-4 h-4" /> Internal
            </div>
          )}
        </div>
      </div>

      {/* Konten kartu */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {project.technologies && project.technologies.map((tech, i) => (
            <span key={i} className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-xs font-medium border border-emerald-500/20">{tech}</span>
          ))}
        </div>
        <p className="text-slate-300 text-sm mb-4 flex-1">{project.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Calendar className="w-4 h-4" />
            {project.duration}
          </div>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-emerald-400 hover:underline text-xs">
              <Github className="w-4 h-4" /> Github
            </a>
          )}
        </div>
        <button
          onClick={() => onOpenModal(project)}
          className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full font-semibold transition-all w-full"
        >
          Lihat Detail
        </button>

        {/* Toggle komentar */}
        <button
          onClick={toggleComments}
          className="mt-3 flex items-center justify-center gap-2 w-full text-slate-400 hover:text-emerald-400 transition-colors text-sm py-2 border border-slate-700 hover:border-emerald-500/40 rounded-full"
        >
          <MessageCircle className="w-4 h-4" />
          {fetched ? `Komentar (${comments.length})` : 'Lihat Komentar'}
          {showComments ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* ── Kolom Komentar (collapsible) ── */}
      {showComments && (
        <div className="border-t border-slate-700/60 px-6 pb-6 pt-4 bg-slate-800/60">
          {isLoggedIn ? (
            <form onSubmit={handleAddComment} className="flex gap-2 mb-4">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Tulis komentar..."
                className="flex-1 bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={commentLoading || !commentText.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-3 py-2 rounded-lg transition-all"
                title="Kirim komentar"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <p className="text-slate-500 text-sm mb-4">
              <a href="/login" className="text-emerald-400 hover:underline">Login</a> untuk menambahkan komentar.
            </p>
          )}
          {commentError && <p className="text-red-400 text-xs mb-3">{commentError}</p>}
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {comments.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-2">Belum ada komentar. Jadilah yang pertama!</p>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="bg-slate-700/50 rounded-lg px-3 py-2.5 flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-emerald-400 font-semibold text-xs">{c.username}</span>
                      <span className="text-slate-500 text-xs">
                        {new Date(c.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm break-words">{c.content}</p>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => handleDeleteComment(c.id)}
                      className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0 mt-0.5"
                      title="Hapus komentar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Komponen utama PortfolioSection ─────────────────────────────────────────
const PortfolioSection = ({ portfolio }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('role') === 'admin';
  const isLoggedIn = !!localStorage.getItem('token');

  // ── State komentar di modal ──
  const [modalComments, setModalComments] = useState([]);
  const [modalCommentText, setModalCommentText] = useState('');
  const [modalCommentLoading, setModalCommentLoading] = useState(false);
  const [modalCommentError, setModalCommentError] = useState('');

  const fetchModalComments = useCallback(async (portfolioId) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/portfolio/${portfolioId}/comments`);
      const data = await res.json();
      setModalComments(Array.isArray(data) ? data : []);
    } catch {
      setModalComments([]);
    }
  }, []);

  useEffect(() => {
    if (selectedProject) {
      setModalComments([]);
      setModalCommentText('');
      setModalCommentError('');
      fetchModalComments(selectedProject.id);
    }
  }, [selectedProject, fetchModalComments]);

  const handleModalAddComment = async (e) => {
    e.preventDefault();
    if (!modalCommentText.trim()) return;
    setModalCommentLoading(true);
    setModalCommentError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/portfolio/${selectedProject.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content: modalCommentText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal mengirim komentar');
      setModalCommentText('');
      fetchModalComments(selectedProject.id);
    } catch (err) {
      setModalCommentError(err.message);
    } finally {
      setModalCommentLoading(false);
    }
  };

  const handleModalDeleteComment = async (commentId) => {
    if (!window.confirm('Hapus komentar ini?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchModalComments(selectedProject.id);
    } catch {
      alert('Gagal menghapus komentar.');
    }
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setSelectedImageIndex(0);
  };
  const closeModal = () => {
    setSelectedProject(null);
    setSelectedImageIndex(0);
  };
  const nextImage = () => {
    if (selectedProject?.images) {
      setSelectedImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };
  const prevImage = () => {
    if (selectedProject?.images) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      <section id="portfolio" className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Portfolio <span className="text-emerald-400">Saya</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Beberapa project yang pernah saya kerjakan dengan fokus pada user experience dan desain yang fungsional. Salah satunya adalah website e-commerce untuk usaha kopi keluarga, yang masih dikembangkan agar ke depannya bisa transaksi otomatis.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-6" />
          </div>

          {/* Tombol tambah: selalu tampil, forbidden cursor untuk non-admin */}
          <div className="flex justify-center mb-10">
            <div className="relative group">
              <button
                onClick={isAdmin ? () => navigate('/tambah-portfolio') : undefined}
                className={`px-6 py-3 rounded-full font-semibold shadow-lg transition-all text-white flex items-center gap-2
                  ${isAdmin
                    ? 'bg-emerald-600 hover:bg-emerald-700 cursor-pointer'
                    : 'bg-slate-600 opacity-70 cursor-not-allowed'
                  }`}
              >
                {!isAdmin && <Lock className="w-4 h-4" />}
                Tambah Portofolio
              </button>
              {!isAdmin && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-600 text-slate-300 text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  Hanya admin yang dapat menambahkan portofolio
                </div>
              )}
            </div>
          </div>

          {/* Grid project — tiap kartu punya komentar inline */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {portfolio.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenModal={openModal}
                isAdmin={isAdmin}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Modal detail ── */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header modal */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
                  <p className="text-emerald-400 font-medium">{selectedProject.type}</p>
                </div>
                <button onClick={closeModal} className="text-slate-400 hover:text-white transition-colors">
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>

            {/* Konten modal */}
            <div className="p-6">
              {/* Gallery */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="mb-6">
                  <div className="relative h-80 mb-4">
                    <img
                      src={selectedProject.images[selectedImageIndex]}
                      alt={`${selectedProject.title} - ${selectedImageIndex + 1}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        >‹</button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        >›</button>
                      </>
                    )}
                  </div>
                  {selectedProject.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {selectedProject.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                            index === selectedImageIndex ? 'border-emerald-500' : 'border-slate-600 hover:border-slate-500'
                          }`}
                        >
                          <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Detail */}
              <div className="space-y-4">
                <p className="text-slate-300 text-lg leading-relaxed">{selectedProject.description}</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Durasi Project</h4>
                    <p className="text-slate-300">{selectedProject.duration}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Status & GitHub</h4>
                    <p className="text-slate-300 mb-2">{selectedProject.status}</p>
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        <Github className="w-5 h-5" /> Lihat di GitHub <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-3">Technologies & Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, i) => (
                      <span key={i} className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm border border-emerald-500/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Komentar di modal */}
                <div className="mt-8 border-t border-slate-700 pt-6">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-emerald-400" />
                    Komentar ({modalComments.length})
                  </h4>
                  {isLoggedIn ? (
                    <form onSubmit={handleModalAddComment} className="flex gap-2 mb-5">
                      <input
                        type="text"
                        value={modalCommentText}
                        onChange={(e) => setModalCommentText(e.target.value)}
                        placeholder="Tulis komentar..."
                        className="flex-1 bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="submit"
                        disabled={modalCommentLoading || !modalCommentText.trim()}
                        className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-all"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  ) : (
                    <p className="text-slate-500 text-sm mb-5">
                      <a href="/login" className="text-emerald-400 hover:underline">Login</a> untuk menambahkan komentar.
                    </p>
                  )}
                  {modalCommentError && <p className="text-red-400 text-sm mb-3">{modalCommentError}</p>}
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {modalComments.length === 0 ? (
                      <p className="text-slate-500 text-sm">Belum ada komentar.</p>
                    ) : (
                      modalComments.map((c) => (
                        <div key={c.id} className="bg-slate-700/60 rounded-lg px-4 py-3 flex justify-between items-start gap-3">
                          <div className="flex-1">
                            <span className="text-emerald-400 font-semibold text-sm">{c.username}</span>
                            <span className="text-slate-500 text-xs ml-2">
                              {new Date(c.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </span>
                            <p className="text-slate-300 text-sm mt-1 break-words">{c.content}</p>
                          </div>
                          {isAdmin && (
                            <button
                              onClick={() => handleModalDeleteComment(c.id)}
                              className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0 mt-0.5"
                              title="Hapus komentar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioSection;