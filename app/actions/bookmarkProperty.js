'use server';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function bookmarkProperty(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('You must be logged in to bookmark a property');
  }

  const { userId } = sessionUser;
  const user = await User.findById(userId);

  const isBookmarked = user.bookmarks.includes(propertyId);

  let message;

  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    message = 'Property removed from bookmarks';
    isBookmarked = false;
  } else {
    user.bookmarks.push(propertyId);
    message = 'Property added to bookmarks';
    isBookmarked = true;
  }
  await user.save();
  revalidatePath('/properties/saved', 'page');
  return { message, isBookmarked };
}

export default bookmarkProperty;
