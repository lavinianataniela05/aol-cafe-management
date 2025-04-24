// app/api/menu/route.ts
// import { NextResponse } from 'next/server';
// import { prisma } from '../../../lib/prisma';

// export async function GET() {
//   const menu = await prisma.menu.findMany();
//   return NextResponse.json(menu);
// }
// app/api/menu/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const menu = await prisma.menu.findMany();
    return NextResponse.json(menu);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}

