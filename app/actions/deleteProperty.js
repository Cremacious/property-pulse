'use server';
import connectDB from '@/config/database';
import cloudinary from '@/config/cloudinary';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('You must be logged in to delete a property');
  }
  const { userId } = sessionUser;
  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Error('Property not found');
  }
  if (property.owner.toString() !== userId) {
    throw new Error('You do not have permission to delete this property');
  }
  const publicIds = property.images.map((image) => {
    const parts = image.split('/');
    return parts.at(-1).split('.')[0];
  });

  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy('propertypulse/' + publicId);
    }
  }
  await property.deleteOne();
  revalidatePath('/', 'layout');
}

export default deleteProperty;
