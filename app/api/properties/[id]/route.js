import connectDB from '@/config/database';
import Property from '@/models/Property';

export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const property = await Property.findById(params.id);
    if (!property) {
      return new Response('Property not found', {
        status: 404,
      });
    }
    return new Response(property, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
