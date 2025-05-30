import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import '../style.css';

function NavMenu() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from('scp').select('id, item');

      if (error) {
        console.error('Error fetching items:', error);
        return;
      }
      const sorted = data.sort((a, b) => {
        const numA = parseInt(a.item.match(/\d+/));
        const numB = parseInt(b.item.match(/\d+/));
        return numA - numB;
      });

      setItems(sorted);
    };

    fetchItems();
  }, []);

  return (
    <nav>
      <div className="scp-list">
        <h2>SCP List</h2>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li> 
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/item/${item.id}`}>{item.item}</Link>
          </li>
        ))}
        <li><Link to="/admin">Admin Panel</Link></li>
      </ul>
    </nav>
  );
}

export default NavMenu;
