import { seedAllData } from '@/lib/seedData';

export async function POST() {
  try {
    await seedAllData();
    return Response.json({ message: 'Data seeded successfully' });
  } catch (error) {
    console.error('Error seeding data:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
