import { useEffect, useState, useRef } from "react";
import "./App.css";

const API_URL = "http://localhost:4000";

const ICONS = {
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  ),
  seo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="13.5" cy="6.5" r="0.5"/><circle cx="17.5" cy="10.5" r="0.5"/>
      <circle cx="8.5" cy="7.5" r="0.5"/><circle cx="6.5" cy="12.5" r="0.5"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  client: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  order: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
};

const serviceIcons = { web: ICONS.web, mobile: ICONS.mobile, seo: ICONS.seo, cloud: ICONS.cloud, design: ICONS.design, analytics: ICONS.analytics };

const getServiceIcon = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("web") || n.includes("desarrollo")) return ICONS.web;
  if (n.includes("móvil") || n.includes("movil") || n.includes("app") || n.includes("mobile")) return ICONS.mobile;
  if (n.includes("seo") || n.includes("posicionamiento") || n.includes("búsqueda")) return ICONS.seo;
  if (n.includes("cloud") || n.includes("nube") || n.includes("hosting")) return ICONS.cloud;
  if (n.includes("diseño") || n.includes("design") || n.includes("ux") || n.includes("ui")) return ICONS.design;
  if (n.includes("analyt") || n.includes("datos") || n.includes("marketing")) return ICONS.analytics;
  return ICONS.web;
};

const TESTIMONIALS = [
  { name: "María Fernández", role: "CEO, TechStart Perú", text: "Transformaron nuestro negocio digital por completo. El equipo fue profesional y los resultados superaron nuestras expectativas.", rating: 5 },
  { name: "Carlos Rodríguez", role: "Fundador, EcommerceHub", text: "La plataforma de servicios más confiable que he encontrado. Proceso ágil, comunicación excelente y entrega puntual.", rating: 5 },
  { name: "Ana Torres", role: "Directora de Marketing, Innova Corp", text: "Incrementamos nuestra presencia online en un 300% gracias a su estrategia SEO. Resultados reales y medibles.", rating: 5 },
];

const STATS = [
  { label: "Clientes satisfechos", value: "500+", suffix: "" },
  { label: "Proyectos completados", value: "1,200+", suffix: "" },
  { label: "Años de experiencia", value: "8+", suffix: "" },
  { label: "Países atendidos", value: "15+", suffix: "" },
];

const STATUS_COLORS = { Pendiente: "#F59E0B", "En proceso": "#3B82F6", Completado: "#10B981", Cancelado: "#EF4444" };

const Toast = ({ message, type, onClose }) => (
  <div className={`toast toast--${type}`}>
    <span>{message}</span>
    <button onClick={onClose}>{ICONS.close}</button>
  </div>
);

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>{ICONS.close}</button>
        {children}
      </div>
    </div>
  );
};

export default function App() {
  const [servicios, setServicios] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [modalServicio, setModalServicio] = useState(null);
  const [payModal, setPayModal] = useState(null);
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("pedidos");
  const heroRef = useRef(null);

  const [formData, setFormData] = useState({
    nombreCliente: "", correo: "", medioContacto: "Email", pais: "",
    idServicio: "", descripcionRequerimiento: "", fechaPedido: "", observaciones: ""
  });

  const [payData, setPayData] = useState({
    metodoPago: "Tarjeta de crédito", referenciaPago: "", moneda: "USD"
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchData = async () => {
    try {
      const [sRes, pRes, pagRes] = await Promise.all([
        fetch(`${API_URL}/servicios`),
        fetch(`${API_URL}/pedidos`),
        fetch(`${API_URL}/pagos`),
      ]);
      if (sRes.ok) setServicios(await sRes.json());
      if (pRes.ok) setPedidos(await pRes.json());
      if (pagRes.ok) setPagos(await pagRes.json());
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const clienteRes = await fetch(`${API_URL}/clientes`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombreCliente: formData.nombreCliente, correo: formData.correo,
          medioContacto: formData.medioContacto, pais: formData.pais,
          fechaRegistro: new Date().toISOString().split("T")[0],
        }),
      });
      const clienteData = await clienteRes.json();
      if (!clienteRes.ok) { showToast(clienteData.mensaje || "Error al registrar cliente", "error"); return; }

      const servicioSel = servicios.find((s) => String(s.id_servicio) === String(formData.idServicio));
      if (!servicioSel) { showToast("Selecciona un servicio válido", "error"); return; }

      const pedidoRes = await fetch(`${API_URL}/pedidos`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idCliente: clienteData.id_cliente, idServicio: Number(formData.idServicio),
          descripcionRequerimiento: formData.descripcionRequerimiento,
          fechaPedido: formData.fechaPedido, estadoPedido: "Pendiente",
          montoTotal: servicioSel.precio, observaciones: formData.observaciones,
        }),
      });
      const pedidoData = await pedidoRes.json();
      if (!pedidoRes.ok) { showToast(pedidoData.mensaje || "Error al crear pedido", "error"); return; }

      showToast("¡Servicio solicitado exitosamente! Nos contactaremos pronto.", "success");
      setFormData({ nombreCliente: "", correo: "", medioContacto: "Email", pais: "", idServicio: "", descripcionRequerimiento: "", fechaPedido: "", observaciones: "" });
      fetchData();
      setActiveSection("dashboard");
    } catch (err) {
      showToast("No se pudo conectar con el servidor", "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePago = async (pedido) => {
    setPayModal(pedido);
  };

  const submitPago = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/pagos`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idPedido: payModal.id_pedido, metodoPago: payData.metodoPago,
          estadoPago: "Completado", referenciaPago: payData.referenciaPago || `REF-${Date.now()}`,
          fechaPago: new Date().toISOString().split("T")[0],
          montoPagado: payModal.monto_total, moneda: payData.moneda,
        }),
      });
      if (res.ok) {
        showToast("¡Pago registrado correctamente!", "success");
        setPayModal(null);
        fetchData();
      } else { showToast("Error al registrar pago", "error"); }
    } catch (err) {
      showToast("Error de conexión", "error");
    } finally {
      setLoading(false);
    }
  };

  const filteredPedidos = pedidos.filter((p) => {
    const matchStatus = filterStatus === "Todos" || p.estado_pedido === filterStatus;
    const matchSearch = p.nombre_cliente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nombre_servicio?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalRevenue = pagos.reduce((sum, p) => sum + parseFloat(p.monto_pagado || 0), 0);
  const pendingOrders = pedidos.filter((p) => p.estado_pedido === "Pendiente").length;
  const completedOrders = pedidos.filter((p) => p.estado_pedido === "Completado").length;

  const scrollToSection = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* NAV */}
      <nav className="nav">
        <div className="nav__inner">
          <div className="nav__logo" onClick={() => scrollToSection("home")}>
            <div className="nav__logo-mark">
              <span>N</span>
            </div>
            <span className="nav__logo-text">NexusDigital</span>
          </div>

          <ul className={`nav__links ${mobileMenuOpen ? "nav__links--open" : ""}`}>
            {["home", "servicios", "nosotros", "contacto"].map((s) => (
              <li key={s}>
                <button className={`nav__link ${activeSection === s ? "nav__link--active" : ""}`} onClick={() => scrollToSection(s)}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              </li>
            ))}
          </ul>

          <div className="nav__actions">
            <button className="btn btn--ghost btn--sm" onClick={() => scrollToSection("dashboard")}>Panel</button>
            <button className="btn btn--primary btn--sm" onClick={() => scrollToSection("contacto")}>Comenzar</button>
            <button className="nav__mobile-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? ICONS.close : ICONS.menu}
            </button>
          </div>
        </div>
      </nav>

      {/* ── HOME ── */}
      {activeSection === "home" && (
        <main>
          {/* HERO */}
          <section className="hero" ref={heroRef}>
            <div className="hero__bg">
              <div className="hero__orb hero__orb--1" />
              <div className="hero__orb hero__orb--2" />
              <div className="hero__orb hero__orb--3" />
              <div className="hero__grid" />
            </div>
            <div className="hero__content">
              <div className="hero__badge">
                <span className="badge__dot" />
                Agencia Digital Premium · Lima, Perú
              </div>
              <h1 className="hero__title">
                Transformamos tu<br />
                <span className="gradient-text">visión digital</span><br />
                en realidad
              </h1>
              <p className="hero__subtitle">
                Diseño, desarrollo y estrategia para negocios que quieren destacar en el mundo digital. Soluciones a medida, resultados medibles.
              </p>
              <div className="hero__cta">
                <button className="btn btn--primary btn--lg" onClick={() => scrollToSection("contacto")}>
                  Solicitar propuesta {ICONS.arrow}
                </button>
                <button className="btn btn--outline btn--lg" onClick={() => scrollToSection("servicios")}>
                  Ver servicios
                </button>
              </div>
              <div className="hero__stats">
                {STATS.map((s) => (
                  <div key={s.label} className="hero__stat">
                    <span className="hero__stat-value">{s.value}</span>
                    <span className="hero__stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero__visual">
              <div className="hero__card hero__card--main">
                <div className="card__header">
                  <div className="card__dots"><span/><span/><span/></div>
                  <span>dashboard.nexus</span>
                </div>
                <div className="card__metrics">
                  <div className="metric"><span className="metric__label">Tráfico</span><span className="metric__value">↑ 284%</span></div>
                  <div className="metric"><span className="metric__label">Conversión</span><span className="metric__value">↑ 67%</span></div>
                  <div className="metric"><span className="metric__label">Revenue</span><span className="metric__value">↑ 142%</span></div>
                </div>
                <div className="card__chart">
                  {[40, 65, 50, 80, 60, 90, 75, 95].map((h, i) => (
                    <div key={i} className="chart__bar" style={{ "--h": `${h}%`, "--delay": `${i * 0.1}s` }} />
                  ))}
                </div>
              </div>
              <div className="hero__card hero__card--floating hero__card--f1">
                <div className="f-card__icon">{ICONS.check}</div>
                <span>Proyecto entregado</span>
              </div>
              <div className="hero__card hero__card--floating hero__card--f2">
                <div className="f-card__stars">{[1,2,3,4,5].map(i => <span key={i}>{ICONS.star}</span>)}</div>
                <span>5.0 Rating</span>
              </div>
            </div>
          </section>

          {/* SERVICES PREVIEW */}
          <section className="section">
            <div className="section__header">
              <div className="section__tag">Nuestros Servicios</div>
              <h2 className="section__title">Soluciones digitales<br />para tu negocio</h2>
              <p className="section__subtitle">Ofrecemos un ecosistema completo de servicios digitales diseñados para escalar tu negocio.</p>
            </div>
            <div className="services-grid">
              {servicios.length === 0 ? (
                <div className="empty-state">
                  <p>Cargando servicios...</p>
                </div>
              ) : (
                servicios.map((s, i) => (
                  <div key={s.id_servicio} className="service-card" style={{ "--delay": `${i * 0.1}s` }}>
                    <div className="service-card__icon">{getServiceIcon(s.nombre_servicio)}</div>
                    <h3 className="service-card__title">{s.nombre_servicio}</h3>
                    <p className="service-card__desc">{s.descripcion}</p>
                    <div className="service-card__footer">
                      <span className="service-card__price">
                        {typeof s.precio === "number" ? `$${s.precio.toLocaleString()}` : s.precio}
                      </span>
                      <button className="btn btn--sm btn--primary" onClick={() => { setModalServicio(s); }}>
                        Ver detalles
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="section__cta">
              <button className="btn btn--primary btn--lg" onClick={() => scrollToSection("contacto")}>
                Solicitar un servicio {ICONS.arrow}
              </button>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="section section--dark">
            <div className="section__header">
              <div className="section__tag">Testimonios</div>
              <h2 className="section__title">Lo que dicen<br />nuestros clientes</h2>
            </div>
            <div className="testimonials-grid">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="testimonial-card">
                  <div className="testimonial-card__stars">
                    {[...Array(t.rating)].map((_, j) => <span key={j} className="star">{ICONS.star}</span>)}
                  </div>
                  <p className="testimonial-card__text">"{t.text}"</p>
                  <div className="testimonial-card__author">
                    <div className="author__avatar">{t.name[0]}</div>
                    <div>
                      <div className="author__name">{t.name}</div>
                      <div className="author__role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA BANNER */}
          <section className="cta-banner">
            <div className="cta-banner__bg" />
            <div className="cta-banner__content">
              <h2>¿Listo para transformar tu negocio?</h2>
              <p>Agenda una consulta gratuita y descubre cómo podemos ayudarte a crecer.</p>
              <button className="btn btn--white btn--lg" onClick={() => scrollToSection("contacto")}>
                Agenda tu consulta gratis {ICONS.arrow}
              </button>
            </div>
          </section>
        </main>
      )}

      {/* ── SERVICIOS ── */}
      {activeSection === "servicios" && (
        <main className="page">
          <div className="page__header">
            <div className="section__tag">Catálogo completo</div>
            <h1 className="page__title">Nuestros Servicios</h1>
            <p className="page__subtitle">Explora todo lo que podemos hacer por tu negocio digital</p>
          </div>
          <div className="services-grid services-grid--full">
            {servicios.map((s, i) => (
              <div key={s.id_servicio} className="service-card service-card--full" style={{ "--delay": `${i * 0.08}s` }}>
                <div className="service-card__icon">{getServiceIcon(s.nombre_servicio)}</div>
                <div className="service-card__body">
                  <h3>{s.nombre_servicio}</h3>
                  <p>{s.descripcion}</p>
                  <ul className="service-card__features">
                    <li>{ICONS.check} Consultoría inicial gratuita</li>
                    <li>{ICONS.check} Soporte post-entrega 30 días</li>
                    <li>{ICONS.check} Revisiones ilimitadas</li>
                  </ul>
                </div>
                <div className="service-card__footer">
                  <div>
                    <span className="price-label">Desde</span>
                    <span className="service-card__price">
                      {typeof s.precio === "number" ? `$${s.precio.toLocaleString()}` : s.precio}
                    </span>
                  </div>
                  <button className="btn btn--primary" onClick={() => { setFormData({ ...formData, idServicio: String(s.id_servicio) }); scrollToSection("contacto"); }}>
                    Contratar {ICONS.arrow}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ── NOSOTROS ── */}
      {activeSection === "nosotros" && (
        <main className="page">
          <div className="page__header">
            <div className="section__tag">Sobre Nosotros</div>
            <h1 className="page__title">Somos NexusDigital</h1>
            <p className="page__subtitle">Una agencia digital comprometida con el crecimiento de tu negocio</p>
          </div>
          <div className="about-grid">
            <div className="about-text">
              <h2>Nuestra misión</h2>
              <p>En NexusDigital creemos que cada empresa merece una presencia digital poderosa. Combinamos estrategia, diseño y tecnología para crear soluciones que generan resultados reales y sostenibles.</p>
              <p>Fundados en Lima, Perú, trabajamos con empresas de toda Latinoamérica y el mundo. Nuestro equipo multidisciplinario de más de 30 especialistas está dedicado a transformar tu visión en realidad digital.</p>
              <div className="about-values">
                {[
                  { title: "Innovación", desc: "Adoptamos las últimas tecnologías para mantenerte a la vanguardia." },
                  { title: "Transparencia", desc: "Comunicación clara y honesta en cada etapa del proyecto." },
                  { title: "Resultados", desc: "Nos enfocamos en métricas reales que impactan tu negocio." },
                ].map((v) => (
                  <div key={v.title} className="value-card">
                    <div className="value-card__dot" />
                    <div>
                      <h4>{v.title}</h4>
                      <p>{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-stats">
              {STATS.map((s) => (
                <div key={s.label} className="about-stat-card">
                  <span className="about-stat-card__value">{s.value}</span>
                  <span className="about-stat-card__label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ── CONTACTO ── */}
      {activeSection === "contacto" && (
        <main className="page">
          <div className="page__header">
            <div className="section__tag">Trabaja con nosotros</div>
            <h1 className="page__title">Solicita tu servicio</h1>
            <p className="page__subtitle">Completa el formulario y nos pondremos en contacto en menos de 24 horas</p>
          </div>
          <div className="contact-layout">
            <div className="contact-info">
              <h3>¿Por qué elegirnos?</h3>
              <ul className="contact-benefits">
                {["Consulta inicial gratuita", "Equipo certificado y con experiencia", "Metodología ágil y transparente", "Soporte dedicado post-entrega", "Garantía de satisfacción", "Precios competitivos y justos"].map((b) => (
                  <li key={b}><span className="benefit__icon">{ICONS.check}</span>{b}</li>
                ))}
              </ul>
              <div className="contact-card">
                <h4>¿Tienes preguntas?</h4>
                <p>Escríbenos a <strong>hola@nexusdigital.pe</strong></p>
                <p>O llámanos al <strong>+51 999 888 777</strong></p>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre completo *</label>
                  <input type="text" name="nombreCliente" value={formData.nombreCliente} onChange={handleChange} placeholder="Tu nombre" required />
                </div>
                <div className="form-group">
                  <label>Correo electrónico *</label>
                  <input type="email" name="correo" value={formData.correo} onChange={handleChange} placeholder="tu@email.com" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>País *</label>
                  <input type="text" name="pais" value={formData.pais} onChange={handleChange} placeholder="Perú, Colombia, México..." required />
                </div>
                <div className="form-group">
                  <label>Medio de contacto preferido</label>
                  <select name="medioContacto" value={formData.medioContacto} onChange={handleChange}>
                    {["Email", "WhatsApp", "Llamada telefónica", "Videollamada", "LinkedIn"].map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Servicio de interés *</label>
                <select name="idServicio" value={formData.idServicio} onChange={handleChange} required>
                  <option value="">Selecciona un servicio</option>
                  {servicios.map((s) => (
                    <option key={s.id_servicio} value={s.id_servicio}>{s.nombre_servicio}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Describe tu proyecto *</label>
                <textarea name="descripcionRequerimiento" value={formData.descripcionRequerimiento} onChange={handleChange} placeholder="Cuéntanos sobre tu proyecto, objetivos, plazos y cualquier detalle relevante..." rows={4} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Fecha estimada de inicio</label>
                  <input type="date" name="fechaPedido" value={formData.fechaPedido} onChange={handleChange} required min={new Date().toISOString().split("T")[0]} />
                </div>
                <div className="form-group">
                  <label>Información adicional</label>
                  <input type="text" name="observaciones" value={formData.observaciones} onChange={handleChange} placeholder="Presupuesto, referencias, etc." />
                </div>
              </div>
              <button type="submit" className="btn btn--primary btn--lg btn--full" disabled={loading}>
                {loading ? <span className="spinner" /> : <>Enviar solicitud {ICONS.arrow}</>}
              </button>
            </form>
          </div>
        </main>
      )}

      {/* ── DASHBOARD ── */}
      {activeSection === "dashboard" && (
        <main className="page dashboard">
          <div className="page__header">
            <div className="section__tag">Panel de control</div>
            <h1 className="page__title">Dashboard</h1>
            <p className="page__subtitle">Gestiona tus pedidos y pagos en tiempo real</p>
          </div>

          <div className="dashboard-metrics">
            {[
              { label: "Ingresos totales", value: `$${totalRevenue.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`, icon: ICONS.analytics, color: "#10B981" },
              { label: "Total pedidos", value: pedidos.length, icon: ICONS.order, color: "#3B82F6" },
              { label: "Pendientes", value: pendingOrders, icon: ICONS.client, color: "#F59E0B" },
              { label: "Completados", value: completedOrders, icon: ICONS.check, color: "#8B5CF6" },
            ].map((m) => (
              <div key={m.label} className="metric-card">
                <div className="metric-card__icon" style={{ "--color": m.color }}>{m.icon}</div>
                <div>
                  <div className="metric-card__value">{m.value}</div>
                  <div className="metric-card__label">{m.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-tabs">
            {["pedidos", "pagos"].map((t) => (
              <button key={t} className={`tab ${activeTab === t ? "tab--active" : ""}`} onClick={() => setActiveTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
                <span className="tab__badge">{t === "pedidos" ? pedidos.length : pagos.length}</span>
              </button>
            ))}
          </div>

          {activeTab === "pedidos" && (
            <>
              <div className="dashboard-filters">
                <input className="filter-search" type="text" placeholder="Buscar pedido..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <div className="filter-status">
                  {["Todos", "Pendiente", "En proceso", "Completado", "Cancelado"].map((s) => (
                    <button key={s} className={`filter-btn ${filterStatus === s ? "filter-btn--active" : ""}`} onClick={() => setFilterStatus(s)}>{s}</button>
                  ))}
                </div>
              </div>
              <div className="orders-table-wrap">
                {filteredPedidos.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state__icon">{ICONS.order}</div>
                    <h3>No hay pedidos</h3>
                    <p>Aún no tienes pedidos registrados o no coinciden con tu búsqueda.</p>
                    <button className="btn btn--primary" onClick={() => scrollToSection("contacto")}>Crear primer pedido</button>
                  </div>
                ) : (
                  <table className="orders-table">
                    <thead>
                      <tr>
                        <th>#</th><th>Cliente</th><th>Servicio</th><th>Fecha</th><th>Estado</th><th>Monto</th><th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPedidos.map((p, i) => (
                        <tr key={p.id_pedido || i}>
                          <td className="td--id">#{p.id_pedido || i + 1}</td>
                          <td>
                            <div className="td-client">
                              <div className="td-client__avatar">{(p.nombre_cliente || "?")[0]}</div>
                              <div>
                                <div className="td-client__name">{p.nombre_cliente}</div>
                                <div className="td-client__sub">{p.descripcion_requerimiento?.slice(0, 35)}...</div>
                              </div>
                            </div>
                          </td>
                          <td>{p.nombre_servicio}</td>
                          <td>{p.fecha_pedido?.split("T")[0]}</td>
                          <td>
                            <span className="status-badge" style={{ "--color": STATUS_COLORS[p.estado_pedido] || "#6B7280" }}>
                              {p.estado_pedido}
                            </span>
                          </td>
                          <td className="td--amount">
                            {typeof p.monto_total === "number" ? `$${p.monto_total.toLocaleString()}` : `$${p.monto_total}`}
                          </td>
                          <td>
                            <button className="btn btn--sm btn--primary" onClick={() => handlePago(p)}>
                              Registrar pago
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {activeTab === "pagos" && (
            <div className="orders-table-wrap">
              {pagos.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state__icon">{ICONS.analytics}</div>
                  <h3>Sin pagos registrados</h3>
                  <p>Los pagos aparecerán aquí una vez registrados desde un pedido.</p>
                </div>
              ) : (
                <table className="orders-table">
                  <thead>
                    <tr><th>#</th><th>Pedido</th><th>Método</th><th>Estado</th><th>Fecha</th><th>Monto</th><th>Moneda</th></tr>
                  </thead>
                  <tbody>
                    {pagos.map((p, i) => (
                      <tr key={p.id_pago || i}>
                        <td className="td--id">#{p.id_pago || i + 1}</td>
                        <td>Pedido #{p.id_pedido}</td>
                        <td>{p.metodo_pago}</td>
                        <td><span className="status-badge" style={{ "--color": p.estado_pago === "Completado" ? "#10B981" : "#F59E0B" }}>{p.estado_pago}</span></td>
                        <td>{p.fecha_pago?.split("T")[0]}</td>
                        <td className="td--amount">${parseFloat(p.monto_pagado).toLocaleString()}</td>
                        <td>{p.moneda}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </main>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="nav__logo">
              <div className="nav__logo-mark"><span>N</span></div>
              <span className="nav__logo-text">NexusDigital</span>
            </div>
            <p>Transformando negocios a través de soluciones digitales de alto impacto.</p>
          </div>
          <div className="footer__links">
            <div className="footer__col">
              <h4>Servicios</h4>
              <ul>{["Desarrollo Web", "Apps Móviles", "SEO & Marketing", "Cloud & Hosting"].map((l) => <li key={l}><button onClick={() => scrollToSection("servicios")}>{l}</button></li>)}</ul>
            </div>
            <div className="footer__col">
              <h4>Empresa</h4>
              <ul>{["Nosotros", "Casos de éxito", "Blog", "Carreras"].map((l) => <li key={l}><button onClick={() => scrollToSection("nosotros")}>{l}</button></li>)}</ul>
            </div>
            <div className="footer__col">
              <h4>Contacto</h4>
              <ul>
                <li>hola@nexusdigital.pe</li>
                <li>+51 999 888 777</li>
                <li>Lima, Perú</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2025 NexusDigital. Todos los derechos reservados.</span>
          <span>Hecho con ♥ en Lima, Perú</span>
        </div>
      </footer>

      {/* SERVICE DETAIL MODAL */}
      <Modal isOpen={!!modalServicio} onClose={() => setModalServicio(null)}>
        {modalServicio && (
          <div className="modal-service">
            <div className="modal-service__icon">{getServiceIcon(modalServicio.nombre_servicio)}</div>
            <h2>{modalServicio.nombre_servicio}</h2>
            <p>{modalServicio.descripcion}</p>
            <div className="modal-service__price">
              <span>Precio desde</span>
              <strong>{typeof modalServicio.precio === "number" ? `$${modalServicio.precio.toLocaleString()}` : modalServicio.precio}</strong>
            </div>
            <ul className="modal-service__features">
              {["Consultoría inicial gratuita", "Entregables claros y acordados", "Revisiones ilimitadas durante el proceso", "Soporte técnico 30 días post-entrega", "Garantía de satisfacción"].map((f) => (
                <li key={f}>{ICONS.check}{f}</li>
              ))}
            </ul>
            <button className="btn btn--primary btn--lg btn--full" onClick={() => { setFormData({ ...formData, idServicio: String(modalServicio.id_servicio) }); setModalServicio(null); scrollToSection("contacto"); }}>
              Contratar ahora {ICONS.arrow}
            </button>
          </div>
        )}
      </Modal>

      {/* PAYMENT MODAL */}
      <Modal isOpen={!!payModal} onClose={() => setPayModal(null)}>
        {payModal && (
          <div className="modal-payment">
            <h2>Registrar Pago</h2>
            <p className="modal-payment__subtitle">Pedido: <strong>{payModal.nombre_servicio}</strong></p>
            <div className="modal-payment__amount">
              <span>Total a pagar</span>
              <strong>${parseFloat(payModal.monto_total).toLocaleString()}</strong>
            </div>
            <form onSubmit={submitPago}>
              <div className="form-group">
                <label>Método de pago</label>
                <select value={payData.metodoPago} onChange={(e) => setPayData({ ...payData, metodoPago: e.target.value })}>
                  {["Tarjeta de crédito", "Tarjeta de débito", "Transferencia bancaria", "PayPal", "Yape", "Plin", "Efectivo"].map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Referencia / Número de operación</label>
                <input type="text" value={payData.referenciaPago} onChange={(e) => setPayData({ ...payData, referenciaPago: e.target.value })} placeholder="Ej: OP-2025-001234" />
              </div>
              <div className="form-group">
                <label>Moneda</label>
                <select value={payData.moneda} onChange={(e) => setPayData({ ...payData, moneda: e.target.value })}>
                  {["USD", "PEN", "EUR", "COP", "MXN"].map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
              <button type="submit" className="btn btn--primary btn--lg btn--full" disabled={loading}>
                {loading ? <span className="spinner" /> : "Confirmar pago"}
              </button>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;