import mongoose, { Schema } from 'mongoose';

const PropertySchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede tener más de 100 caracteres'],
  },
  value: {
    type: Number,
    required: [true, 'El valor es requerido'],
  },
  img: {
    type: String,
    default: '',
  },
});

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);
