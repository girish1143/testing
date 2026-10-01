import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Wine, 
  Sparkles, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  Check, 
  Clock, 
  Send,
  Coffee,
  Compass
} from 'lucide-react';
import { DINING_MENU } from '../data/hotelData';
import './DiningConcierge.css';

export default function DiningConcierge({
  rooms = [],
  onAddRoomServiceOrder
}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [targetRoomNum, setTargetRoomNum] = useState(
    rooms.find(r => r.status === 'occupied')?.number || (rooms[0] ? rooms[0].number : '101')
  );
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const categories = [
    'All',
    'Breakfast & Brunch',
    'Fine Dining',
    'Mixology & Cellar',
    'Spa & Wellness',
    'Excursions'
  ];

  const filteredItems = activeCategory === 'All'
    ? DINING_MENU
    : DINING_MENU.filter(item => item.category === activeCategory);

  const occupiedRooms = rooms.filter(r => r.status === 'occupied');

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) => {
      return prev
        .map(i => {
          if (i.id === id) {
            const newQty = i.qty + delta;
            return newQty > 0 ? { ...i, qty: newQty } : null;
          }
          return i;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(i => i.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    onAddRoomServiceOrder({
      roomNumber: targetRoomNum,
      items: cart,
      totalAmount: cartTotal,
      notes: deliveryNotes,
      time: new Date().toISOString().replace('T', ' ').substring(0, 16)
    });

    setCart([]);
    setDeliveryNotes('');
  };

  return (
    <section className="dining-section" id="dining">
      <div className="dining-container">
        {/* Header */}
        <div className="dining-header">
          <div className="section-sub-tag">Haute Cuisine & Bespoke Leisure</div>
          <h2 className="dining-title">
            In-Room Dining & <span className="gold-text">Concierge Experiences</span>
          </h2>
          <p className="dining-desc">
            Curated Michelin-star culinary creations, rare vintage champagnes, and private yacht excursions delivered directly to your suite.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="dining-cat-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`dining-cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Grid: Menu Items + Floating Order Cart */}
        <div className="dining-workspace-grid">
          {/* Menu Items */}
          <div className="menu-items-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="menu-item-card">
                <div className="menu-item-media">
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <span className="item-price-tag">${item.price}</span>
                </div>

                <div className="menu-item-body">
                  <div className="item-tags-row">
                    <span className="item-cat-label">{item.category}</span>
                    {item.dietary.map((d, idx) => (
                      <span key={idx} className="diet-tag">{d}</span>
                    ))}
                  </div>

                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-description">{item.description}</p>

                  <button 
                    className="btn-add-cart"
                    onClick={() => addToCart(item)}
                  >
                    <Plus size={15} />
                    <span>Add to Suite Order</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Room Service Cart Desk */}
          <div className="dining-cart-card">
            <div className="cart-card-header">
              <ShoppingBag size={20} className="gold-icon" />
              <h3>Suite Room Service Folio</h3>
            </div>

            <form onSubmit={handlePlaceOrder} className="cart-form">
              {/* Room Selector */}
              <div className="cart-room-select">
                <label>Deliver to Suite #</label>
                <select 
                  value={targetRoomNum} 
                  onChange={(e) => setTargetRoomNum(e.target.value)}
                >
                  {occupiedRooms.length > 0 ? (
                    occupiedRooms.map(r => (
                      <option key={r.id} value={r.number}>
                        Suite #{r.number} ({r.currentGuest?.name || 'In-House Guest'})
                      </option>
                    ))
                  ) : (
                    rooms.map(r => (
                      <option key={r.id} value={r.number}>
                        Suite #{r.number} - {r.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Items List */}
              <div className="cart-items-container">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.id} className="cart-item-row">
                      <div className="cart-item-details">
                        <span className="cart-item-title">{item.name}</span>
                        <span className="cart-item-rate">${item.price} each</span>
                      </div>

                      <div className="cart-qty-controls">
                        <button 
                          type="button" 
                          className="qty-btn"
                          onClick={() => updateQty(item.id, -1)}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-num">{item.qty}</span>
                        <button 
                          type="button" 
                          className="qty-btn"
                          onClick={() => updateQty(item.id, 1)}
                        >
                          <Plus size={12} />
                        </button>
                        <button 
                          type="button" 
                          className="cart-remove-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-cart-view">
                    <ShoppingBag size={32} className="empty-bag-icon" />
                    <p>Your room service cart is empty.</p>
                    <small>Select culinary delicacies or experiences to bill directly to the suite.</small>
                  </div>
                )}
              </div>

              {/* Special Delivery Instructions */}
              <div className="cart-notes-field">
                <label>Special Delivery Instructions</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Serve at 20:30, bring two vintage crystal champagne flutes..."
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                />
              </div>

              {/* Cart Footer */}
              <div className="cart-footer-block">
                <div className="cart-subtotal-row">
                  <span>Cart Total (Pre-tax)</span>
                  <strong className="cart-total-amount">${cartTotal.toLocaleString()}</strong>
                </div>

                <button 
                  type="submit" 
                  className="btn-book-primary w-full send-order-btn"
                  disabled={cart.length === 0}
                >
                  <Send size={15} />
                  <span>Dispatch & Charge to Room #{targetRoomNum}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
