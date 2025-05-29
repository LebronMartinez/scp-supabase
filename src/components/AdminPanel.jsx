import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

function AdminPanel() {
  const [items, setItems] = useState([]);
  const [newRecord, setNewRecord] = useState({
    item: '', class: '', description: '', containment: '', image: ''
  });
  const [editRecord, setEditRecord] = useState(null);

  // Helper function to sort items by SCP number
  const sortByScpNumber = (data) => {
    return data.sort((a, b) => {
      const numA = parseInt(a.item.replace(/\D/g, ''));
      const numB = parseInt(b.item.replace(/\D/g, ''));
      return numA - numB;
    });
  };

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from('scp').select('*');
      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        setItems(sortByScpNumber(data));
      }
    };
    fetchItems();
  }, []);

  const addItem = async () => {
    await supabase.from('scp').insert([newRecord]);
    setNewRecord({ item: '', class: '', description: '', containment: '', image: '' });
    const { data } = await supabase.from('scp').select('*');
    setItems(sortByScpNumber(data));
  };

  const deleteItem = async (id) => {
    await supabase.from('scp').delete().eq('id', id);
    setItems(items.filter(i => i.id !== id));
  };

  const saveEdit = async () => {
    await supabase.from('scp').update(editRecord).eq('id', editRecord.id);
    setEditRecord(null);
    const { data } = await supabase.from('scp').select('*');
    setItems(sortByScpNumber(data));
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {items.map(item => (
          <li key={item.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #444', paddingBottom: '1rem' }}>
            {editRecord?.id === item.id ? (
              <>
                <input value={editRecord.item} onChange={e => setEditRecord({ ...editRecord, item: e.target.value })} placeholder="Item" />
                <input value={editRecord.class} onChange={e => setEditRecord({ ...editRecord, class: e.target.value })} placeholder="Class" />
                <input value={editRecord.description} onChange={e => setEditRecord({ ...editRecord, description: e.target.value })} placeholder="Description" />
                <input value={editRecord.containment} onChange={e => setEditRecord({ ...editRecord, containment: e.target.value })} placeholder="Containment" />
                <input
                  placeholder="Image URL"
                  value={editRecord.image}
                  onChange={e => setEditRecord({ ...editRecord, image: e.target.value })}
                />
                {editRecord.image && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <img src={editRecord.image} alt="Preview" style={{ width: '200px', borderRadius: '4px' }} />
                  </div>
                )}
                <div>
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={() => setEditRecord(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <strong>{item.item}</strong> - {item.class}
                <div>{item.description}</div>
                <div><em>{item.containment}</em></div>
                {item.image && (
                  <div style={{ margin: '0.5rem 0' }}>
                    <img src={item.image} alt={item.item} style={{ width: '200px', borderRadius: '4px' }} />
                  </div>
                )}
                <button onClick={() => setEditRecord(item)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h3>Add New SCP</h3>
      <input placeholder="Item" value={newRecord.item} onChange={e => setNewRecord({ ...newRecord, item: e.target.value })} />
      <input placeholder="Class" value={newRecord.class} onChange={e => setNewRecord({ ...newRecord, class: e.target.value })} />
      <input placeholder="Description" value={newRecord.description} onChange={e => setNewRecord({ ...newRecord, description: e.target.value })} />
      <input placeholder="Containment" value={newRecord.containment} onChange={e => setNewRecord({ ...newRecord, containment: e.target.value })} />
      <input
        placeholder="Image URL"
        value={newRecord.image}
        onChange={e => setNewRecord({ ...newRecord, image: e.target.value })}
      />
      {newRecord.image && (
        <div style={{ marginTop: '0.5rem' }}>
          <img src={newRecord.image} alt="Preview" style={{ width: '200px', borderRadius: '4px' }} />
        </div>
      )}
      <button onClick={addItem}>Add SCP</button>
    </div>
  );
}

export default AdminPanel;
