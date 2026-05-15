import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Plane, CalendarDays, PackageSearch, ShieldCheck,
  Phone, Mail, MapPin, Send, CreditCard, Database
} from "lucide-react";

export default function App() {
  const whatsappNumber = "213000000000";

  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    product: "",
    country: "",
    date: "",
    payment: "CCP",
    details: "",
  });

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("saoukaba_orders") || "[]");
    setOrders(savedOrders);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const buildWhatsAppMessage = (order) => {
    return encodeURIComponent(
      `Bonjour SK MIDEK, je souhaite faire une commande Saoukaba.\n\nNom: ${order.name}\nTéléphone: ${order.phone}\nProduit: ${order.product}\nPays/site d'origine: ${order.country || "Non précisé"}\nDate souhaitée: ${order.date}\nPaiement souhaité: ${order.payment}\nDétails: ${order.details || "Non précisé"}`
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = { ...form, id: Date.now(), status: "Nouvelle demande" };
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem("saoukaba_orders", JSON.stringify(updatedOrders));

    const message = buildWhatsAppMessage(newOrder);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="site">
      <header className="header">
        <div className="container nav">
          <div className="brand">
            <div className="logo">SK</div>
            <div>
              <h1>Saoukaba</h1>
              <p>midek</p>
            </div>
          </div>

          <nav className="menu">
            <a href="#accueil">Accueil</a>
            <a href="#concept">Concept</a>
            <a href="#commande">Commander</a>
            <a href="#paiement">Paiement</a>
          </nav>

          <a className="btn small" href="#commande">Commander</a>
        </div>
      </header>

      <main>
        <section id="accueil" className="hero">
          <div className="glow"></div>
          <div className="container heroGrid">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="badge">Importation sur commande depuis l’étranger</div>
              <h2>Le produit que vous cherchez.<span>Même s’il n’existe pas en Algérie.</span></h2>
              <p className="lead">Saoukaba permet aux clients en Algérie de demander des produits rares ou indisponibles localement. La demande est envoyée directement sur WhatsApp avec la date souhaitée et le mode de paiement préféré.</p>
              <div className="actions">
                <a className="btn" href="#commande">Faire une demande <ArrowRight size={20} /></a>
                <a className="btn outline" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp direct</a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="heroCard">
              <div className="premiumCard">
                <Plane size={56} />
                <h3>SK MIDEK</h3>
                <p>Commandes personnalisées, paiement CCP/BaridiMob et suivi des demandes.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="concept" className="section">
          <div className="container">
            <div className="centerTitle">
              <p>Notre concept</p>
              <h2>Comment fonctionne Saoukaba ?</h2>
            </div>
            <div className="cards">
              <InfoCard icon={<PackageSearch />} title="Demande client" text="Le client indique le produit, le lien, le pays, la quantité et la date souhaitée." />
              <InfoCard icon={<ShieldCheck />} title="Validation" text="SK MIDEK vérifie la disponibilité, le prix, le délai et confirme la faisabilité." />
              <InfoCard icon={<CalendarDays />} title="Commande" text="Après accord, le client choisit CCP ou BaridiMob et reçoit le suivi par WhatsApp." />
            </div>
          </div>
        </section>

        <section id="paiement" className="section">
          <div className="container payGrid">
            <InfoCard icon={<CreditCard />} title="Paiement CCP" text="Le client peut choisir le paiement par CCP après confirmation du prix final. Remplacez ici par votre numéro CCP officiel." />
            <InfoCard icon={<Phone />} title="Paiement BaridiMob" text="Le client peut choisir BaridiMob. La confirmation du paiement se fera par WhatsApp avec justificatif." />
          </div>
        </section>

        <section id="commande" className="section">
          <div className="container formBox">
            <div className="centerTitle">
              <p>Formulaire</p>
              <h2>Demandez votre produit</h2>
              <span>La demande sera sauvegardée localement et envoyée directement sur WhatsApp.</span>
            </div>

            <form onSubmit={handleSubmit} className="form">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Nom et prénom" required />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Téléphone" required />
              <input name="product" value={form.product} onChange={handleChange} placeholder="Produit recherché" className="full" required />
              <input name="country" value={form.country} onChange={handleChange} placeholder="Pays ou site d’origine" />
              <input type="date" name="date" value={form.date} onChange={handleChange} required />
              <select name="payment" value={form.payment} onChange={handleChange} className="full">
                <option>CCP</option>
                <option>BaridiMob</option>
                <option>À confirmer avec SK MIDEK</option>
              </select>
              <textarea name="details" value={form.details} onChange={handleChange} placeholder="Détails : taille, couleur, quantité, budget, lien du produit..." className="full" />
              <button type="submit" className="btn submit">Envoyer sur WhatsApp <Send size={20} /></button>
            </form>
          </div>
        </section>

        <section className="section last">
          <div className="container database">
            <h3><Database /> Base de données commandes — première version</h3>
            <p>Les commandes test sont sauvegardées dans le navigateur. Pour une vraie base en ligne, connectez Supabase/Firebase.</p>
            <div className="orders">
              {orders.length === 0 ? <p>Aucune commande enregistrée pour le moment.</p> : orders.slice(0, 5).map((order) => (
                <div key={order.id} className="order"><strong>{order.product}</strong> — {order.name} — {order.payment} — {order.date}</div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="container contactBox">
            <div>
              <h2>Contactez SK MIDEK</h2>
              <p>Pour toute commande urgente, contactez-nous directement sur WhatsApp.</p>
            </div>
            <div className="contactInfo">
              <p><Phone /> +213 000 00 00 00</p>
              <p><Mail /> contact@saoukaba.com</p>
              <p><MapPin /> Algérie</p>
            </div>
          </div>
        </section>
      </main>

      <footer>© 2026 Saoukaba — SK MIDEK — Algérie</footer>
    </div>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="card">
      <div className="cardIcon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
