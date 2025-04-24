// import { Button } from "@/components/ui/button"



// export default function Home() {
//   return (
//     <div>
//     <h1 className="text-3xl font-bold underline">
//       Hello world!
//     </h1>
//     <Button>Click me</Button>
//   </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';

type Menu = {
  id: number;
  itemName: string;
  itemType: string;
  price: number;
};

export default function Home() {
  const [menuList, setMenuList] = useState<Menu[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/api/menu');
        const data = await res.json();
        setMenuList(data);
      } catch (error) {
        console.error('Gagal fetch data menu:', error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Menu Café</h1>
      <ul className="space-y-4">
        {menuList.map((menu) => (
          <li key={menu.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{menu.itemName}</h2>
            <p>Jenis: {menu.itemType}</p>
            <p>Harga: Rp {menu.price.toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
