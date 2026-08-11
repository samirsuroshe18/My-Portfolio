import { asyncHandler } from '../middleware/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ContactMessage } from '../models/ContactMessage.js';
import { sendContactNotification } from '../utils/sendEmail.js';
import { paginate } from '../utils/paginate.js';

export const submitContactMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.create(req.body);

  const emailSent = await sendContactNotification(req.body);
  if (emailSent) {
    message.emailSent = true;
    await message.save();
  }

  res.status(201).json(new ApiResponse(201, 'Message sent successfully', message));
});

export const listContactMessages = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const { items, meta } = await paginate(ContactMessage, req, {
    searchableFields: ['name', 'email', 'subject'],
    baseFilter: filter,
  });
  res.json(new ApiResponse(200, 'Contact messages', items, meta));
});

export const getContactMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findById(req.params.id);
  if (!message) throw new ApiError(404, 'Message not found');

  if (message.status === 'new') {
    message.status = 'read';
    await message.save();
  }

  res.json(new ApiResponse(200, 'Message detail', message));
});

export const updateContactMessageStatus = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { $set: { status: req.body.status } },
    { new: true }
  );
  if (!message) throw new ApiError(404, 'Message not found');
  res.json(new ApiResponse(200, 'Message status updated', message));
});

export const deleteContactMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!message) throw new ApiError(404, 'Message not found');
  res.json(new ApiResponse(200, 'Message deleted', message));
});
