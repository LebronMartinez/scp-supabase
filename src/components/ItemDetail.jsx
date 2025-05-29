import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

function ItemDetail() {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      const { data } = await supabase.from('scp').select('*').eq('id', id).single();
      setItemData(data);
    };
    fetchItem();
  }, [id]);

  return (
    <div>
      {itemData ? (
        <>
          <h2>{itemData.item} - {itemData.class}</h2>
          <img src={itemData.image} alt={itemData.item} style={{ width: '1000px' }} />
          <p><strong>Containment:</strong> {itemData.containment}</p>
          <p><strong>Description:</strong> {itemData.description}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ItemDetail;
