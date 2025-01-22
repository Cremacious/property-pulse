'use server';
import Property from '../models/property';
import { connectDB } from '../config/database';
import { convertToSerializedObject } from '../utils/convertToObject';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function updateProperty({ propertyID, formData }) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('You must be logged in to add a property');
  }
  const { userId } = sessionUser;
  const existingProperty = await Property.findById(propertyID);

  if (!existingProperty) {
    throw new Error('Property not found');
  }

  if (existingProperty.owner.toString() !== userId) {
    throw new Error('You do not have permission to edit this property');
  }

  const propertyData = {
    owner: userId,
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zip: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities,
    rates: {
      nightly: formData.get('rates.nightly'),
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
  };
  const updatedProperty = await Property.findByIdAndUpdate(
    propertyID,
    propertyData
  );
  revalidatePath('/', 'layout');
  redirect(`/properties/${updatedProperty._id}`);
}

export default updateProperty;
